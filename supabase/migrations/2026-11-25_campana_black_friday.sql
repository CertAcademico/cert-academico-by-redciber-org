-- 1) Campaña «Black Friday… pero gratis»: hasta el 31 de enero de 2027 (hora de Colombia).
create or replace function public.campaign_open()
returns boolean
language sql
stable
as $$
  select now() <= timestamptz '2027-01-31 23:59:59-05';
$$;

-- 2) Registro gratuito reabierto hasta el fin de la campaña (los códigos de eventos siguen igual).
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
    select e.role into v_role
    from (values
      ('8ed2624e40f638c57ef795c26c07eefc37a8ef4139daadb8e31c9aa80e3531b6', 'law_student',       timestamptz '2026-11-07 23:59:59-05'),
      ('2e8beea4005fdbe797e978919f86788ef626b5cbda91a6d78fb2c39a51665264', 'insurance_student', timestamptz '2026-12-15 23:59:59-05'),
      ('a89e6357778cbc234cd45d40563347a6e4310fa01fa8eebaa544939403b7ee4c', 'pharmacy_student',  timestamptz '2027-01-31 23:59:59-05')
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
    if not public.campaign_open() then
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

-- 3) Acceso «de cohorte»: la regla de siempre (rol, permisos individuales, ruta gratuita).
--    Sirve para lo que es propio de cada grupo: muro, grupos y entregas con archivos.
create or replace function public.can_access_course_cohort(p_path text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((
    select case
      when p.role in ('admin', 'teacher', 'tutor') then true
      when exists (
        select 1 from public.course_grants g
        where g.user_id = p.id
          and (g.path_id = p_path
               or (g.path_id = 'general' and p_path not in ('cert_csirt', 'auditoria_ciberriesgo', 'cti_basico', 'prueba_digital', 'antisuplantacion_seguros', 'ia_farmacias')))
      ) then true
      when p.role = 'cert_student'      then p_path = 'cert_csirt'
      when p.role = 'auditor'           then p_path = 'auditoria_ciberriesgo'
      when p.role = 'cti_student'       then p_path = 'cti_basico'
      when p.role = 'law_student'       then p_path = 'prueba_digital'
      when p.role = 'insurance_student' then p_path = 'antisuplantacion_seguros'
      when p.role = 'pharmacy_student'  then p_path = 'ia_farmacias'
      when p.role = 'free_student'      then p_path = any(public.free_route())
      when p.role = 'student'           then p_path not in ('cert_csirt', 'auditoria_ciberriesgo', 'cti_basico', 'prueba_digital', 'antisuplantacion_seguros', 'ia_farmacias')
      else false
    end
    from public.profiles p
    where p.id = auth.uid()
  ), false);
$$;

revoke execute on function public.can_access_course_cohort(text) from public, anon;
grant execute on function public.can_access_course_cohort(text) to authenticated;

-- 4) Acceso para estudiar: la regla de cohorte o, durante la campaña, cualquier curso abierto.
--    Quedan fuera solo los cursos de eventos (auditores, abogados, seguros, droguerías).
create or replace function public.can_access_course(p_path text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.can_access_course_cohort(p_path)
      or (auth.uid() is not null
          and public.campaign_open()
          and p_path not in ('auditoria_ciberriesgo', 'prueba_digital', 'antisuplantacion_seguros', 'ia_farmacias'));
$$;

revoke execute on function public.can_access_course(text) from public, anon;
grant execute on function public.can_access_course(text) to authenticated;

-- 5) Entregas con archivos y grupos: solo la cohorte (nadie se cuela a un grupo ajeno por la campaña).
create or replace function public.can_submit_course(p_path text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.can_access_course_cohort(p_path)
     and coalesce((select role <> 'free_student' from public.profiles where id = auth.uid()), false);
$$;

-- Muro: lo leen y escriben solo los integrantes de la cohorte del curso.
drop policy if exists "wall: read if course access" on public.course_wall_posts;
create policy "wall: read if course access"
  on public.course_wall_posts for select to authenticated
  using (public.can_access_course_cohort(path_id));

drop policy if exists "wall: post if course access" on public.course_wall_posts;
create policy "wall: post if course access"
  on public.course_wall_posts for insert to authenticated
  with check (public.can_access_course_cohort(path_id) and auth.uid() is not null);

-- 6) Niveles nuevos del mapa: CTI e IA aplicada a la ciberseguridad.
create or replace function public.course_module_counts()
returns jsonb
language sql
immutable
as $$
  select '{
    "cybersecurity": 10, "cybercrime": 10, "cybercriminology": 5, "quantum_computing": 6,
    "forensic_auditing": 6, "artificial_intelligence": 9, "ia_ofensiva_insider": 6, "cert_csirt": 8,
    "auditoria_ciberriesgo": 11, "cti_basico": 11, "prueba_digital": 7, "antisuplantacion_seguros": 7,
    "ia_farmacias": 5,
    "cybercrime_intermedio": 7, "cybercrime_avanzado": 8,
    "forensic_intermedio": 7, "forensic_avanzado": 8,
    "csirt_intermedio": 7, "csirt_avanzado": 8,
    "cybersecurity_intermedio": 7, "cybersecurity_avanzado": 8,
    "cybercriminology_intermedio": 7, "cybercriminology_avanzado": 8,
    "cti_intermedio": 7, "cti_avanzado": 8,
    "ia_intermedio": 7, "ia_avanzado": 8
  }'::jsonb;
$$;

create or replace function public.course_requirements()
returns jsonb
language sql
immutable
as $$
  select '{
    "cybercrime_intermedio":       { "exam_module": "cci_exam", "min_ratio": 0.7 },
    "cybercrime_avanzado":         { "exam_module": "cca_exam", "min_ratio": 0.8 },
    "forensic_intermedio":         { "exam_module": "fdi_exam", "min_ratio": 0.7 },
    "forensic_avanzado":           { "exam_module": "fda_exam", "min_ratio": 0.8 },
    "csirt_intermedio":            { "exam_module": "gri_exam", "min_ratio": 0.7, "deliverables": ["gri_d1", "gri_d2", "gri_d3"] },
    "csirt_avanzado":              { "exam_module": "gra_exam", "min_ratio": 0.8, "deliverables": ["gra_d1", "gra_d2", "gra_d3"] },
    "cybersecurity_intermedio":    { "exam_module": "aci_exam", "min_ratio": 0.7 },
    "cybersecurity_avanzado":      { "exam_module": "aca_exam", "min_ratio": 0.8 },
    "cybercriminology_intermedio": { "exam_module": "cri_exam", "min_ratio": 0.7 },
    "cybercriminology_avanzado":   { "exam_module": "cra_exam", "min_ratio": 0.8 },
    "cti_intermedio":              { "exam_module": "ctii_exam", "min_ratio": 0.7, "deliverables": ["ctii_d1", "ctii_d2", "ctii_d3"] },
    "cti_avanzado":                { "exam_module": "ctia_exam", "min_ratio": 0.8, "deliverables": ["ctia_d1", "ctia_d2", "ctia_d3"] },
    "ia_intermedio":               { "exam_module": "iai_exam", "min_ratio": 0.7, "deliverables": ["iai_d1", "iai_d2"] },
    "ia_avanzado":                 { "exam_module": "iaa_exam", "min_ratio": 0.8, "deliverables": ["iaa_d1", "iaa_d2", "iaa_d3"] }
  }'::jsonb;
$$;

create or replace function public.course_prerequisite()
returns jsonb
language sql
immutable
as $$
  select '{
    "cybercrime_intermedio": "cybercrime",
    "cybercrime_avanzado": "cybercrime_intermedio",
    "forensic_intermedio": "forensic_auditing",
    "forensic_avanzado": "forensic_intermedio",
    "csirt_intermedio": "cert_csirt",
    "csirt_avanzado": "csirt_intermedio",
    "cybersecurity_intermedio": "cybersecurity",
    "cybersecurity_avanzado": "cybersecurity_intermedio",
    "cybercriminology_intermedio": "cybercriminology",
    "cybercriminology_avanzado": "cybercriminology_intermedio",
    "cti_intermedio": "cti_basico",
    "cti_avanzado": "cti_intermedio",
    "ia_intermedio": "artificial_intelligence",
    "ia_avanzado": "ia_intermedio"
  }'::jsonb;
$$;

-- 7) Entregables escritos de los niveles.
create table if not exists public.level_deliverables (
  user_id uuid not null references auth.users (id) on delete cascade,
  path_id text not null,
  module_id text not null,
  deliverable_id text not null,
  answers jsonb not null,
  submitted_at timestamptz not null default now(),
  primary key (user_id, path_id, deliverable_id)
);

alter table public.level_deliverables enable row level security;
revoke all on public.level_deliverables from anon;
revoke insert, update, delete on public.level_deliverables from authenticated;

drop policy if exists "level_deliverables: read own or staff" on public.level_deliverables;
create policy "level_deliverables: read own or staff"
  on public.level_deliverables for select to authenticated
  using (user_id = auth.uid() or public.is_teacher());

-- Guarda (o reemplaza) el entregable propio. Exige acceso al curso y un desarrollo mínimo.
create or replace function public.submit_level_deliverable(p_path text, p_module text, p_deliverable text, p_answers jsonb)
returns timestamptz
language plpgsql
security definer
set search_path = public
as $$
declare
  v_len int;
  v_at timestamptz := now();
begin
  if auth.uid() is null or not public.can_access_course(p_path) then
    raise exception 'NO_ACCESS';
  end if;
  if p_answers is null or jsonb_typeof(p_answers) <> 'object' then
    raise exception 'TOO_SHORT';
  end if;
  select coalesce(sum(length(trim(v))), 0) into v_len from jsonb_each_text(p_answers) as t(k, v);
  if v_len < 300 or length(p_answers::text) > 40000 then
    raise exception 'TOO_SHORT';
  end if;
  insert into public.level_deliverables (user_id, path_id, module_id, deliverable_id, answers, submitted_at)
  values (auth.uid(), p_path, p_module, p_deliverable, p_answers, v_at)
  on conflict (user_id, path_id, deliverable_id)
  do update set answers = excluded.answers, module_id = excluded.module_id, submitted_at = excluded.submitted_at;
  return v_at;
end;
$$;

revoke execute on function public.submit_level_deliverable(text, text, text, jsonb) from public, anon;
grant execute on function public.submit_level_deliverable(text, text, text, jsonb) to authenticated;

-- 8) Curso completo: además del examen, todos los entregables exigidos por el nivel.
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
      and now() - cp.started_at >= interval '10 minutes'
      and (
        public.course_requirements() -> p_path is null
        or public.course_requirements() -> p_path -> 'exam_module' is null
        or coalesce(
             (cp.scores -> (public.course_requirements() -> p_path ->> 'exam_module') ->> 'score')::numeric
             / nullif((cp.scores -> (public.course_requirements() -> p_path ->> 'exam_module') ->> 'maxScore')::numeric, 0),
             0
           ) >= (public.course_requirements() -> p_path ->> 'min_ratio')::numeric
      )
      and not exists (
        select 1
        from jsonb_array_elements_text(coalesce(public.course_requirements() -> p_path -> 'deliverables', '[]'::jsonb)) as req(id)
        where not exists (
          select 1 from public.level_deliverables d
          where d.user_id = p_user and d.path_id = p_path and d.deliverable_id = req.id
        )
      )
  );
$$;

-- 9) Reto Pionero: el estudiante reporta el enlace de su publicación con el badge.
create table if not exists public.campaign_challenge_entries (
  user_id uuid primary key references auth.users (id) on delete cascade,
  post_url text not null check (post_url ~* '^https://' and length(post_url) <= 500),
  created_at timestamptz not null default now()
);

alter table public.campaign_challenge_entries enable row level security;
revoke all on public.campaign_challenge_entries from anon;
revoke update, delete on public.campaign_challenge_entries from authenticated;

drop policy if exists "challenge: read own or staff" on public.campaign_challenge_entries;
create policy "challenge: read own or staff"
  on public.campaign_challenge_entries for select to authenticated
  using (user_id = auth.uid() or public.is_teacher());

drop policy if exists "challenge: report own" on public.campaign_challenge_entries;
create policy "challenge: report own"
  on public.campaign_challenge_entries for insert to authenticated
  with check (user_id = auth.uid() and public.campaign_open());

select public.campaign_open() as campana_abierta,
       public.course_module_counts() ->> 'cti_intermedio' as cti_intermedio,
       public.course_module_counts() ->> 'ia_avanzado' as ia_avanzado,
       jsonb_array_length(public.course_requirements() -> 'csirt_intermedio' -> 'deliverables') as entregables_csirt_intermedio;

/* Migración 2026-11-25 — Campaña «Black Friday… pero gratis» (hasta el 31 de enero de 2027).
   · Reabre el registro gratuito hasta el 31/01/2027, 23:59 (hora de Colombia).
   · Durante la campaña cualquier usuario registrado puede estudiar todos los cursos abiertos,
     incluidos CERTs/CSIRTs, CTI básico y los niveles Intermedio y Avanzado del mapa
     (cada nivel sigue exigiendo el anterior). Los cursos de eventos siguen solo para su público.
   · El muro, los grupos y las entregas con archivos quedan solo para la cohorte de cada curso
     (can_access_course_cohort): la campaña no expone nombres ni archivos de los grupos.
   · Niveles nuevos: cti_intermedio, cti_avanzado, ia_intermedio, ia_avanzado.
   · Entregables escritos obligatorios (level_deliverables) en CSIRT, CTI e IA Intermedio y Avanzado.
   · Reto Pionero: tabla campaign_challenge_entries para reportar la publicación del badge.
   · El 1 de febrero de 2027 todo vuelve a la regla de cohorte sin correr nada: el avance y los badges se conservan.
   Correr completa en Supabase → SQL Editor (proyecto quzuorohzfxmgnvrqppb). Es idempotente.
   Debe mostrar: campana_abierta = true · 7 · 8 · 3 */
