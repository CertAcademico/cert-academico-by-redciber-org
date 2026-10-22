-- ═════════════════════════════════════════════════════════════
-- Migración 2026-10-23 — Niveles del mapa de expertise (Intermedio / Avanzado)
-- Correr completa en Supabase → SQL Editor, DESPUÉS de 2026-10-22_*.sql. Es idempotente.
-- No modifica progreso ni certificados existentes: solo agrega reglas para los cursos nuevos.
-- ─────────────────────────────────────────────────────────────

-- Módulos por curso (agrega los niveles nuevos). Si se agregan módulos en api.ts, actualizar aquí.
create or replace function public.course_module_counts()
returns jsonb
language sql
immutable
as $$
  select '{
    "cybersecurity": 10, "cybercrime": 10, "cybercriminology": 5, "quantum_computing": 6,
    "forensic_auditing": 6, "artificial_intelligence": 9, "ia_ofensiva_insider": 6, "cert_csirt": 8,
    "auditoria_ciberriesgo": 11, "cti_basico": 11,
    "cybercrime_intermedio": 7, "cybercrime_avanzado": 8,
    "forensic_intermedio": 7, "forensic_avanzado": 8
  }'::jsonb;
$$;

-- Nota mínima del examen de cada nivel (módulo del examen y proporción mínima del puntaje).
create or replace function public.course_requirements()
returns jsonb
language sql
immutable
as $$
  select '{
    "cybercrime_intermedio": { "exam_module": "cci_exam", "min_ratio": 0.7 },
    "cybercrime_avanzado":   { "exam_module": "cca_exam", "min_ratio": 0.8 },
    "forensic_intermedio":   { "exam_module": "fdi_exam", "min_ratio": 0.7 },
    "forensic_avanzado":     { "exam_module": "fda_exam", "min_ratio": 0.8 }
  }'::jsonb;
$$;

-- Nivel anterior que hay que tener completo para obtener el badge de un nivel.
create or replace function public.course_prerequisite()
returns jsonb
language sql
immutable
as $$
  select '{
    "cybercrime_intermedio": "cybercrime",
    "cybercrime_avanzado": "cybercrime_intermedio",
    "forensic_intermedio": "forensic_auditing",
    "forensic_avanzado": "forensic_intermedio"
  }'::jsonb;
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
      -- Niveles con examen: nota mínima aprobada.
      and (
        public.course_requirements() -> p_path is null
        or coalesce(
             (cp.scores -> (public.course_requirements() -> p_path ->> 'exam_module') ->> 'score')::numeric
             / nullif((cp.scores -> (public.course_requirements() -> p_path ->> 'exam_module') ->> 'maxScore')::numeric, 0),
             0
           ) >= (public.course_requirements() -> p_path ->> 'min_ratio')::numeric
      )
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
  v_prereq text;
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
    v_prereq := public.course_prerequisite() ->> p_path_id;
    if v_prereq is not null and not public.course_is_complete(v_uid, v_prereq) then
      raise exception 'PREREQUISITE_NOT_COMPLETED';
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

revoke execute on function public.issue_certificate(text) from public, anon;
grant execute on function public.issue_certificate(text) to authenticated;
revoke execute on function public.course_is_complete(uuid, text) from public, anon, authenticated;
