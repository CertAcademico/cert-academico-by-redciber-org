-- Cierre de las entregas del Bloque 4 (Prueba Digital) a las 15:20.
-- Se puede correr solo: crea la tabla de cierres y la regla si todavía no existen. Es idempotente.
-- Después de esa hora, los estudiantes ya no pueden subir archivos en el Bloque 4; el docente, el tutor y el admin sí.
-- Para reabrirlo: delete from public.deliverable_deadlines where module_id = 'pd_b4';

-- 1. Tabla de horas de cierre (igual que en 2026-11-07_cierre_entregas_prueba_digital.sql)
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

-- 3. Bloque 4: cierra a las 15:20
insert into public.deliverable_deadlines (path_id, module_id, closes_at)
values ('prueba_digital', 'pd_b4', timestamptz '2026-11-07 15:20:00-05')
on conflict (path_id, module_id) do update set closes_at = excluded.closes_at;

-- Comprobación: horas de cierre vigentes y qué grupos han entregado en cada bloque cerrado.
select d.module_id as bloque,
       to_char(d.closes_at at time zone 'America/Bogota', 'HH24:MI') as cierra,
       coalesce((select string_agg(distinct s.group_label, ', ') from public.activity_submissions s
                 where s.path_id = d.path_id and s.module_id = d.module_id), 'ninguno') as grupos_que_entregaron
from public.deliverable_deadlines d
where d.path_id = 'prueba_digital'
order by d.module_id;
