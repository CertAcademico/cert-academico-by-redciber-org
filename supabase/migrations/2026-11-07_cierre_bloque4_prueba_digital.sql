-- Cierre de las entregas del Bloque 4 (Prueba Digital) a las 15:20.
-- Requiere haber corrido antes 2026-11-07_cierre_entregas_prueba_digital.sql (crea la tabla de cierres).
-- Después de esa hora, los estudiantes ya no pueden subir archivos en el Bloque 4; el docente, el tutor y el admin sí.
-- Para reabrirlo: delete from public.deliverable_deadlines where module_id = 'pd_b4';

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
