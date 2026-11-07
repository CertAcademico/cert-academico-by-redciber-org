-- ═════════════════════════════════════════════════════════════
-- Migración 2026-11-07 — Cierre de entregas por bloque (Prueba Digital)
-- · Cada entrega puede tener hora de cierre. Después de esa hora el estudiante ya no puede
--   subir archivos en ese bloque; el docente, el tutor y el admin sí.
-- · Bloque 1 cerrado a las 11:10. Los grupos que entregaron a tiempo reciben la estrella
--   de entrega destacada (★ 3 del bloque) y el XP correspondiente.
-- Correr completa en Supabase → SQL Editor (copiar todo con Cmd + A). Es idempotente.
-- Para reabrir un bloque: delete from public.deliverable_deadlines where module_id = 'pd_b1';
-- ─────────────────────────────────────────────────────────────

-- 1. Horas de cierre
create table if not exists public.deliverable_deadlines (
  path_id text not null,
  module_id text not null,
  closes_at timestamptz not null,
  primary key (path_id, module_id)
);

alter table public.deliverable_deadlines enable row level security;
revoke all on public.deliverable_deadlines from anon;
revoke insert, update, delete on public.deliverable_deadlines from authenticated;

drop policy if exists "deliverable_deadlines: read" on public.deliverable_deadlines;
create policy "deliverable_deadlines: read"
  on public.deliverable_deadlines for select to authenticated
  using (true);

-- 2. Rechazar entregas fuera de tiempo (salvo personal docente)
create or replace function public.submission_deadline_check()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_teacher() and exists (
    select 1 from public.deliverable_deadlines d
    where d.path_id = new.path_id and d.module_id = new.module_id and now() > d.closes_at
  ) then
    raise exception 'DELIVERABLE_CLOSED';
  end if;
  return new;
end;
$$;

drop trigger if exists activity_submissions_deadline on public.activity_submissions;
create trigger activity_submissions_deadline
  before insert on public.activity_submissions
  for each row execute function public.submission_deadline_check();

-- 3. Bloque 1: cierra a las 11:10
insert into public.deliverable_deadlines (path_id, module_id, closes_at)
values ('prueba_digital', 'pd_b1', timestamptz '2026-11-07 11:10:00-05')
on conflict (path_id, module_id) do update set closes_at = excluded.closes_at;

-- 4. Estrella de entrega destacada para los grupos que entregaron a tiempo
insert into public.group_stars (path_id, module_id, group_label)
select distinct s.path_id, s.module_id, s.group_label
from public.activity_submissions s
where s.path_id = 'prueba_digital'
  and s.module_id = 'pd_b1'
  and s.group_label is not null
  and s.created_at <= timestamptz '2026-11-07 11:10:00-05'
on conflict (path_id, module_id, group_label) do nothing;

-- Comprobación: cada grupo, a qué hora entregó y si tiene la estrella.
select g.grupo,
       coalesce(to_char(min(s.created_at) at time zone 'America/Bogota', 'HH24:MI'), '—') as primera_entrega,
       case when min(s.created_at) is null then '❌ No entregó'
            when min(s.created_at) <= timestamptz '2026-11-07 11:10:00-05' then '✅ A tiempo'
            else '⏰ Tarde' end as estado,
       case when exists (select 1 from public.group_stars st
                         where st.path_id = 'prueba_digital' and st.module_id = 'pd_b1' and st.group_label = g.grupo)
            then '★' else '' end as estrella_destacada,
       (select count(*) from public.course_groups cg
         where cg.path_id = 'prueba_digital' and cg.group_label = g.grupo) as integrantes
from (values ('A'), ('B'), ('C'), ('D'), ('E'), ('F')) as g(grupo)
left join public.activity_submissions s
  on s.path_id = 'prueba_digital' and s.module_id = 'pd_b1' and s.group_label = g.grupo
group by g.grupo
order by g.grupo;
