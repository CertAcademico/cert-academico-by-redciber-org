-- ═════════════════════════════════════════════════════════════
-- Migración 2026-11-19 — Curso «Antisuplantación de Identidad en el Sector Asegurador» (con INIF)
-- · Rol insurance_student: solo ve el curso antisuplantacion_seguros.
-- · Registro con el código del evento hasta el 15 de diciembre de 2026, 23:59 (hora de Colombia),
--   o con un correo autorizado en allowed_emails. El código no se guarda: solo su huella SHA-256.
-- · 7 módulos; el certificado se emite al completar los 7 (el último, al aprobar la evaluación).
-- Correr completa en Supabase → SQL Editor (proyecto quzuorohzfxmgnvrqppb). Es idempotente.
-- ─────────────────────────────────────────────────────────────

-- 1. Rol nuevo
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check
  check (role in ('student', 'teacher', 'tutor', 'admin', 'cert_student', 'auditor', 'cti_student', 'free_student', 'law_student', 'insurance_student'));

alter table public.allowed_emails drop constraint if exists allowed_emails_role_check;
alter table public.allowed_emails add constraint allowed_emails_role_check
  check (role in ('student', 'teacher', 'tutor', 'admin', 'cert_student', 'auditor', 'cti_student', 'free_student', 'law_student', 'insurance_student'));

-- 2. Registro: correo autorizado, o código de un evento vigente.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role text;
  v_consent text := nullif(new.raw_user_meta_data ->> 'data_consent_version', '');
  v_code text := regexp_replace(upper(coalesce(new.raw_user_meta_data ->> 'access_code', '')), '[^A-Z0-9]', '', 'g');
  v_hash text;
begin
  select role into v_role from public.allowed_emails where email = new.email;

  if v_role is null and v_code <> '' then
    v_hash := encode(sha256(convert_to(v_code, 'UTF8')), 'hex');
    -- Cada evento: huella del código, rol que otorga y fecha límite.
    select e.role into v_role
    from (values
      ('8ed2624e40f638c57ef795c26c07eefc37a8ef4139daadb8e31c9aa80e3531b6', 'law_student',       timestamptz '2026-11-07 23:59:59-05'),
      ('2e8beea4005fdbe797e978919f86788ef626b5cbda91a6d78fb2c39a51665264', 'insurance_student', timestamptz '2026-12-15 23:59:59-05')
    ) as e(hash, role, deadline)
    where e.hash = v_hash and now() <= e.deadline;
    if v_role is null then
      raise exception 'INVALID_ACCESS_CODE';
    end if;
    if v_consent is null then
      raise exception 'CONSENT_REQUIRED';
    end if;
  end if;

  if v_role is null then
    if now() > timestamptz '2026-11-03 23:59:59-05' then
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

-- 3. Acceso al curso (muro, biblioteca)
create or replace function public.can_access_course(p_path text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((
    select case
      when p.role in ('admin', 'teacher', 'tutor') then true
      when p.role = 'cert_student'      then p_path = 'cert_csirt'
      when p.role = 'auditor'           then p_path = 'auditoria_ciberriesgo'
      when p.role = 'cti_student'       then p_path = 'cti_basico'
      when p.role = 'law_student'       then p_path = 'prueba_digital'
      when p.role = 'insurance_student' then p_path = 'antisuplantacion_seguros'
      when p.role = 'free_student'      then p_path = any(public.free_route())
      when p.role = 'student'           then p_path not in ('cert_csirt', 'auditoria_ciberriesgo', 'cti_basico', 'prueba_digital', 'antisuplantacion_seguros')
      else false
    end
    from public.profiles p
    where p.id = auth.uid()
  ), false);
$$;

revoke execute on function public.can_access_course(text) from public, anon;
grant execute on function public.can_access_course(text) to authenticated;

-- 4. Número de módulos (certificado del curso al completarlo). Igual que 2026-11-07, más el curso nuevo.
create or replace function public.course_module_counts()
returns jsonb
language sql
immutable
as $$
  select '{
    "cybersecurity": 10, "cybercrime": 10, "cybercriminology": 5, "quantum_computing": 6,
    "forensic_auditing": 6, "artificial_intelligence": 9, "ia_ofensiva_insider": 6, "cert_csirt": 8,
    "auditoria_ciberriesgo": 11, "cti_basico": 11, "prueba_digital": 7, "antisuplantacion_seguros": 7,
    "cybercrime_intermedio": 7, "cybercrime_avanzado": 8,
    "forensic_intermedio": 7, "forensic_avanzado": 8,
    "csirt_intermedio": 7, "csirt_avanzado": 8,
    "cybersecurity_intermedio": 7, "cybersecurity_avanzado": 8,
    "cybercriminology_intermedio": 7, "cybercriminology_avanzado": 8
  }'::jsonb;
$$;

-- Comprobación: debe mostrar insurance_student · antisuplantacion_seguros · 7 · prueba_digital 7
select 'insurance_student' as rol,
       'antisuplantacion_seguros' as curso,
       public.course_module_counts() ->> 'antisuplantacion_seguros' as modulos,
       public.course_module_counts() ->> 'prueba_digital' as modulos_prueba_digital;
