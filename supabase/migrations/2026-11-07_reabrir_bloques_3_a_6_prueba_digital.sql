-- Reabre las entregas de los Bloques 3 a 6 (Prueba Digital) hasta que los grupos terminen.
-- Quita cualquier hora de cierre de esos bloques (el Bloque 4 cerraba a las 15:20). Es idempotente.
-- El Bloque 1 sigue cerrado desde las 11:10.

do $$
begin
  if to_regclass('public.deliverable_deadlines') is not null then
    delete from public.deliverable_deadlines
    where path_id = 'prueba_digital' and module_id in ('pd_b3', 'pd_b4', 'pd_b5', 'pd_b6');
  end if;
end $$;

-- Comprobación: bloques que siguen con hora de cierre (solo debería aparecer pd_b1, o nada).
select module_id as bloque, to_char(closes_at at time zone 'America/Bogota', 'HH24:MI') as cierra
from public.deliverable_deadlines
where path_id = 'prueba_digital'
order by module_id;
