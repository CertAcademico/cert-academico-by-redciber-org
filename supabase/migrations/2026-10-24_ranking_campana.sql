-- ═════════════════════════════════════════════════════════════
-- Migración 2026-10-24 — Ranking de la campaña de registro gratuito + niveles de la ruta CSIRT
-- Los 50 primeros al 31 de octubre de 2026, 23:59 (hora de Colombia) acceden gratis al curso de
-- creación de agentes defensivos y ofensivos en ciberseguridad.
-- Correr completa en Supabase → SQL Editor. Es idempotente. No modifica progreso ni certificados.
-- ─────────────────────────────────────────────────────────────

create or replace function public.campaign_cutoff()
returns timestamptz
language sql
immutable
as $$ select timestamptz '2026-10-31 23:59:59-05'; $$;

-- Puntaje de cada participante del registro gratuito (rol free_student):
--   1) badges de los 7 cursos de la ruta gratuita emitidos hasta el corte (los valida el servidor);
--   2) suma de las notas (en %) de las evaluaciones de esos cursos registradas hasta el corte;
--   3) desempate: quien obtuvo su último badge antes.
create or replace function public.campaign_scores()
returns table (
  user_id uuid, name text, email text,
  badges int, score numeric, last_badge_at timestamptz, started_at timestamptz, position bigint
)
language sql
stable
security definer
set search_path = public
as $$
  with b as (
    select c.user_id, count(*)::int as badges, max(c.issued_at) as last_badge_at
    from public.certificates c
    where c.path_id = any(public.free_route()) and c.issued_at <= public.campaign_cutoff()
    group by c.user_id
  ),
  s as (
    select cp.user_id,
           sum((v ->> 'score')::numeric / nullif((v ->> 'maxScore')::numeric, 0)) * 100 as score
    from public.course_progress cp
    cross join lateral jsonb_each(cp.scores) as e(k, v)
    where cp.path_id = any(public.free_route())
      and (v ->> 'completedAt')::timestamptz <= public.campaign_cutoff()
    group by cp.user_id
  ),
  st as (
    select cp.user_id, min(cp.started_at) as started_at
    from public.course_progress cp
    where cp.path_id = any(public.free_route())
    group by cp.user_id
  )
  select p.id, p.name, p.email,
         coalesce(b.badges, 0), round(coalesce(s.score, 0), 1), b.last_badge_at, st.started_at,
         row_number() over (
           order by coalesce(b.badges, 0) desc, coalesce(s.score, 0) desc,
                    b.last_badge_at asc nulls last, p.id
         )
  from public.profiles p
  left join b on b.user_id = p.id
  left join s on s.user_id = p.id
  left join st on st.user_id = p.id
  where p.role = 'free_student';
$$;

-- Ranking completo: solo administradores.
drop function if exists public.campaign_ranking();
create or replace function public.campaign_ranking()
returns table (
  user_id uuid, name text, email text,
  badges int, score numeric, last_badge_at timestamptz, started_at timestamptz, position bigint
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'ADMIN_ONLY';
  end if;
  return query select * from public.campaign_scores() r order by r.position;
end;
$$;

-- Posición del usuario que consulta (sin datos de nadie más).
create or replace function public.my_campaign_rank()
returns table (position bigint, total bigint, badges int, score numeric)
language sql
stable
security definer
set search_path = public
as $$
  select r.position, (select count(*) from public.campaign_scores()), r.badges, r.score
  from public.campaign_scores() r
  where r.user_id = auth.uid();
$$;

revoke execute on function public.campaign_scores() from public, anon, authenticated;
revoke execute on function public.campaign_ranking() from public, anon;
grant execute on function public.campaign_ranking() to authenticated;
revoke execute on function public.my_campaign_rank() from public, anon;
grant execute on function public.my_campaign_rank() to authenticated;

-- ─────────────────────────────────────────────────────────────
-- Mapa de expertise: ruta Gestor de Respuesta a Incidentes (csirt_intermedio / csirt_avanzado).
-- Reemplaza las funciones de la migración 2026-10-23 con la lista completa de niveles.
-- ─────────────────────────────────────────────────────────────
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
    "forensic_intermedio": 7, "forensic_avanzado": 8,
    "csirt_intermedio": 7, "csirt_avanzado": 8
  }'::jsonb;
$$;

create or replace function public.course_requirements()
returns jsonb
language sql
immutable
as $$
  select '{
    "cybercrime_intermedio": { "exam_module": "cci_exam", "min_ratio": 0.7 },
    "cybercrime_avanzado":   { "exam_module": "cca_exam", "min_ratio": 0.8 },
    "forensic_intermedio":   { "exam_module": "fdi_exam", "min_ratio": 0.7 },
    "forensic_avanzado":     { "exam_module": "fda_exam", "min_ratio": 0.8 },
    "csirt_intermedio":      { "exam_module": "gri_exam", "min_ratio": 0.7 },
    "csirt_avanzado":        { "exam_module": "gra_exam", "min_ratio": 0.8 }
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
    "csirt_avanzado": "csirt_intermedio"
  }'::jsonb;
$$;
