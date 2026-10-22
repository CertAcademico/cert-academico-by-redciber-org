-- ═════════════════════════════════════════════════════════════
-- Migración 2026-10-22 — Registro gratuito, consentimiento de datos y certificados
-- Correr completa en Supabase → SQL Editor. Es idempotente (se puede volver a correr).
-- ═════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────
-- 0. SEGURIDAD (CRÍTICO): un usuario solo puede cambiar su propio NOMBRE.
--    Antes, la policy de update permitía cambiar cualquier columna de la
--    propia fila, incluido `role` → cualquiera podía hacerse admin.
-- ─────────────────────────────────────────────────────────────
revoke update on public.profiles from anon, authenticated;
grant update (name) on public.profiles to authenticated;

-- course_progress: `started_at` lo pone siempre la base de datos (sirve para
-- validar un tiempo mínimo antes de emitir un certificado).
revoke insert, update on public.course_progress from anon, authenticated;
grant insert (user_id, path_id, completed_modules, scores, last_accessed_at, completed_at)
  on public.course_progress to authenticated;
grant update (completed_modules, scores, last_accessed_at, completed_at)
  on public.course_progress to authenticated;

-- ─────────────────────────────────────────────────────────────
-- 1. Rol free_student (registro gratuito) y registro del consentimiento
-- ─────────────────────────────────────────────────────────────
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check
  check (role in ('student', 'teacher', 'tutor', 'admin', 'cert_student', 'auditor', 'cti_student', 'free_student'));

alter table public.allowed_emails drop constraint if exists allowed_emails_role_check;
alter table public.allowed_emails add constraint allowed_emails_role_check
  check (role in ('student', 'teacher', 'tutor', 'admin', 'cert_student', 'auditor', 'cti_student', 'free_student'));

alter table public.profiles add column if not exists data_consent_at timestamptz;
alter table public.profiles add column if not exists data_consent_version text;

-- Registro público: abierto hasta el 31 de octubre de 2026, 23:59 (hora de Colombia),
-- y solo con aceptación de la Política de Tratamiento de Datos Personales.
-- Las cuentas creadas por un admin (correo en allowed_emails) no pasan por estas reglas.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role text;
  v_consent text := nullif(new.raw_user_meta_data ->> 'data_consent_version', '');
begin
  select role into v_role from public.allowed_emails where email = new.email;

  if v_role is null then
    if now() > timestamptz '2026-10-31 23:59:59-05' then
      raise exception 'REGISTRATION_CLOSED';
    end if;
    if v_consent is null then
      raise exception 'CONSENT_REQUIRED';
    end if;
    v_role := 'free_student';
  end if;

  insert into public.profiles (id, name, email, role, data_consent_at, data_consent_version)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', new.email),
    new.email,
    v_role,
    case when v_consent is not null then now() end,
    v_consent
  );
  return new;
end;
$$;

-- ─────────────────────────────────────────────────────────────
-- 2. Certificados y badges
--    Solo se emiten vía issue_certificate() (valida el progreso en el servidor);
--    se verifican públicamente vía verify_certificate() (sin exponer el correo).
-- ─────────────────────────────────────────────────────────────
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  code text not null unique default upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 12)),
  user_id uuid not null references auth.users (id) on delete cascade,
  path_id text not null,               -- id del curso, o 'ruta_completa'
  recipient_name text not null,
  issued_at timestamptz not null default now(),
  unique (user_id, path_id)
);

alter table public.certificates enable row level security;
revoke insert, update, delete on public.certificates from anon, authenticated;

drop policy if exists "certificates: select own or teacher" on public.certificates;
create policy "certificates: select own or teacher"
  on public.certificates for select
  using (user_id = auth.uid() or public.is_teacher());

-- Módulos por curso: si se agregan módulos a un curso en api.ts, actualizar aquí.
create or replace function public.course_module_counts()
returns jsonb
language sql
immutable
as $$
  select '{
    "cybersecurity": 10, "cybercrime": 10, "cybercriminology": 5, "quantum_computing": 6,
    "forensic_auditing": 6, "artificial_intelligence": 9, "ia_ofensiva_insider": 6, "cert_csirt": 8,
    "auditoria_ciberriesgo": 11, "cti_basico": 11
  }'::jsonb;
$$;

-- Ruta del registro gratuito, en orden (CERTs/CSIRTs al final).
create or replace function public.free_route()
returns text[]
language sql
immutable
as $$
  select array['cybersecurity', 'cybercrime', 'cybercriminology', 'quantum_computing',
               'forensic_auditing', 'artificial_intelligence', 'ia_ofensiva_insider', 'cert_csirt'];
$$;

create or replace function public.course_is_complete(p_user uuid, p_path text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.course_progress cp
    where cp.user_id = p_user
      and cp.path_id = p_path
      and cp.completed_at is not null
      and coalesce(array_length(cp.completed_modules, 1), 0) >= (public.course_module_counts() ->> p_path)::int
      -- Tiempo mínimo dedicado al curso (started_at lo pone la base de datos).
      and now() - cp.started_at >= interval '10 minutes'
  );
$$;

create or replace function public.issue_certificate(p_path_id text)
returns public.certificates
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_cert public.certificates;
  v_name text;
  v_path text;
begin
  if v_uid is null then
    raise exception 'NOT_AUTHENTICATED';
  end if;

  select * into v_cert from public.certificates where user_id = v_uid and path_id = p_path_id;
  if found then
    return v_cert;
  end if;

  if p_path_id = 'ruta_completa' then
    foreach v_path in array public.free_route() loop
      if not public.course_is_complete(v_uid, v_path) then
        raise exception 'ROUTE_NOT_COMPLETED';
      end if;
    end loop;
  elsif public.course_module_counts() ? p_path_id then
    if not public.course_is_complete(v_uid, p_path_id) then
      raise exception 'COURSE_NOT_COMPLETED';
    end if;
  else
    raise exception 'UNKNOWN_COURSE';
  end if;

  select name into v_name from public.profiles where id = v_uid;
  insert into public.certificates (user_id, path_id, recipient_name)
  values (v_uid, p_path_id, v_name)
  returning * into v_cert;
  return v_cert;
end;
$$;

-- Verificación pública: devuelve solo nombre, curso, fecha y código (nunca el correo).
create or replace function public.verify_certificate(p_code text)
returns table (code text, recipient_name text, path_id text, issued_at timestamptz)
language sql
stable
security definer
set search_path = public
as $$
  select c.code, c.recipient_name, c.path_id, c.issued_at
  from public.certificates c
  where c.code = upper(trim(p_code));
$$;

revoke execute on function public.issue_certificate(text) from public, anon;
grant execute on function public.issue_certificate(text) to authenticated;
revoke execute on function public.course_is_complete(uuid, text) from public, anon, authenticated;
grant execute on function public.verify_certificate(text) to anon, authenticated;
