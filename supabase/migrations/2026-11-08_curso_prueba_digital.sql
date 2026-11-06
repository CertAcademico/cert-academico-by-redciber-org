-- ═════════════════════════════════════════════════════════════
-- Migración 2026-11-08 — Curso «Prueba Digital para Abogados» (Universidad Libre)
-- · Rol law_student: solo ve el curso prueba_digital.
-- · Registro con el código del evento hasta el sábado 7 de noviembre, 23:59 (hora de Colombia).
--   El código no se guarda en el repositorio: solo su huella SHA-256.
-- · 8 bloques; entregas en grupo, estrellas y un badge por cada bloque 1 a 7.
-- Correr completa en Supabase → SQL Editor, DESPUÉS de 2026-11-07. Es idempotente.
-- ─────────────────────────────────────────────────────────────

-- 1. Rol nuevo
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check
  check (role in ('student', 'teacher', 'tutor', 'admin', 'cert_student', 'auditor', 'cti_student', 'free_student', 'law_student'));

alter table public.allowed_emails drop constraint if exists allowed_emails_role_check;
alter table public.allowed_emails add constraint allowed_emails_role_check
  check (role in ('student', 'teacher', 'tutor', 'admin', 'cert_student', 'auditor', 'cti_student', 'free_student', 'law_student'));

-- 2. Registro: igual que 2026-10-29, más el código del evento.
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
begin
  select role into v_role from public.allowed_emails where email = new.email;

  if v_role is null and v_code <> '' then
    if encode(sha256(convert_to(v_code, 'UTF8')), 'hex') <> '8ed2624e40f638c57ef795c26c07eefc37a8ef4139daadb8e31c9aa80e3531b6'
       or now() > timestamptz '2026-11-07 23:59:59-05' then
      raise exception 'INVALID_ACCESS_CODE';
    end if;
    if v_consent is null then
      raise exception 'CONSENT_REQUIRED';
    end if;
    v_role := 'law_student';
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

-- 3. Acceso al curso (biblioteca, entregas)
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
      when p.role = 'cert_student' then p_path = 'cert_csirt'
      when p.role = 'auditor'      then p_path = 'auditoria_ciberriesgo'
      when p.role = 'cti_student'  then p_path = 'cti_basico'
      when p.role = 'law_student'  then p_path = 'prueba_digital'
      when p.role = 'free_student' then p_path = any(public.free_route())
      when p.role = 'student'      then p_path not in ('cert_csirt', 'auditoria_ciberriesgo', 'cti_basico', 'prueba_digital')
      else false
    end
    from public.profiles p
    where p.id = auth.uid()
  ), false);
$$;

revoke execute on function public.can_access_course(text) from public, anon;
grant execute on function public.can_access_course(text) to authenticated;

-- 4. Número de módulos (certificado del curso al completarlo)
create or replace function public.course_module_counts()
returns jsonb
language sql
immutable
as $$
  select '{
    "cybersecurity": 10, "cybercrime": 10, "cybercriminology": 5, "quantum_computing": 6,
    "forensic_auditing": 6, "artificial_intelligence": 9, "ia_ofensiva_insider": 6, "cert_csirt": 8,
    "auditoria_ciberriesgo": 11, "cti_basico": 11, "prueba_digital": 8,
    "cybercrime_intermedio": 7, "cybercrime_avanzado": 8,
    "forensic_intermedio": 7, "forensic_avanzado": 8,
    "csirt_intermedio": 7, "csirt_avanzado": 8,
    "cybersecurity_intermedio": 7, "cybersecurity_avanzado": 8,
    "cybercriminology_intermedio": 7, "cybercriminology_avanzado": 8
  }'::jsonb;
$$;

-- 5. Entregas en grupo y badges por bloque (CERTs y CSIRTs queda igual que en 2026-11-07)
create or replace function public.deliverable_modules()
returns jsonb language sql immutable
as $$ select '{
  "cert_csirt": ["cert_s1", "cert_s2", "cert_s3", "cert_s4", "cert_s5", "cert_s6", "cert_s7"],
  "prueba_digital": ["pd_b1", "pd_b2", "pd_b3", "pd_b4", "pd_b5", "pd_b6", "pd_b7"]
}'::jsonb; $$;

create or replace function public.milestone_rules()
returns jsonb language sql immutable
as $$ select '{
  "cert_csirt_fase1": {"path": "cert_csirt", "modules": [0, 1, 2], "deliverables": ["cert_s1", "cert_s2", "cert_s3"]},
  "cert_csirt_s1": {"path": "cert_csirt", "modules": [0], "deliverables": ["cert_s1"]},
  "cert_csirt_s2": {"path": "cert_csirt", "modules": [1], "deliverables": ["cert_s2"]},
  "cert_csirt_s3": {"path": "cert_csirt", "modules": [2], "deliverables": ["cert_s3"]},
  "cert_csirt_s4": {"path": "cert_csirt", "modules": [3], "deliverables": ["cert_s4"]},
  "cert_csirt_s5": {"path": "cert_csirt", "modules": [4], "deliverables": ["cert_s5"]},
  "cert_csirt_s6": {"path": "cert_csirt", "modules": [5], "deliverables": ["cert_s6"]},
  "cert_csirt_s7": {"path": "cert_csirt", "modules": [6], "deliverables": ["cert_s7"]},
  "prueba_digital_b1": {"path": "prueba_digital", "modules": [0], "deliverables": ["pd_b1"]},
  "prueba_digital_b2": {"path": "prueba_digital", "modules": [1], "deliverables": ["pd_b2"]},
  "prueba_digital_b3": {"path": "prueba_digital", "modules": [2], "deliverables": ["pd_b3"]},
  "prueba_digital_b4": {"path": "prueba_digital", "modules": [3], "deliverables": ["pd_b4"]},
  "prueba_digital_b5": {"path": "prueba_digital", "modules": [4], "deliverables": ["pd_b5"]},
  "prueba_digital_b6": {"path": "prueba_digital", "modules": [5], "deliverables": ["pd_b6"]},
  "prueba_digital_b7": {"path": "prueba_digital", "modules": [6], "deliverables": ["pd_b7"]}
}'::jsonb; $$;

-- Comprobación: debe mostrar law_student · prueba_digital · 8 · 7 · 7
select 'law_student' as rol,
       'prueba_digital' as curso,
       public.course_module_counts() ->> 'prueba_digital' as bloques,
       jsonb_array_length(public.deliverable_modules() -> 'prueba_digital') as entregas,
       (select count(*) from jsonb_object_keys(public.milestone_rules()) k where k like 'prueba_digital_%') as badges;
