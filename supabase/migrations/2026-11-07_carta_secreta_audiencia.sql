-- Audiencia simulada (Prueba Digital): carta secreta para cada grupo.
-- Cada estudiante ve solo la carta de SU grupo contra su rival, calculada con los retos y
-- entregas del rival, sin ver sus archivos ni sus puntajes. Es idempotente.
-- Correr completa en Supabase → SQL Editor (copiar todo con Cmd + A).

create or replace function public.my_hearing_card(p_path text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_group text;
  v_rival text;
  v_b4 numeric;
  v_b6 numeric;
  v_custodia boolean;
  v_carta text;
begin
  select group_label into v_group from public.course_groups where path_id = p_path and user_id = auth.uid();
  if v_group is null then
    return jsonb_build_object('group', null);
  end if;
  v_rival := case v_group when 'A' then 'B' when 'B' then 'A' when 'C' then 'D'
                          when 'D' then 'C' when 'E' then 'F' else 'E' end;

  select avg(100.0 * (cp.scores -> 'pd_b4' ->> 'score')::numeric / nullif((cp.scores -> 'pd_b4' ->> 'maxScore')::numeric, 0)),
         avg(100.0 * (cp.scores -> 'pd_b6' ->> 'score')::numeric / nullif((cp.scores -> 'pd_b6' ->> 'maxScore')::numeric, 0))
    into v_b4, v_b6
  from public.course_groups g
  join public.course_progress cp on cp.user_id = g.user_id and cp.path_id = g.path_id
  where g.path_id = p_path and g.group_label = v_rival;

  v_custodia := exists (select 1 from public.activity_submissions s
                        where s.path_id = p_path and s.module_id = 'pd_b5' and s.group_label = v_rival);

  v_carta := case
    when not v_custodia then 'Su rival no entregó el registro de cadena de custodia: ataque la continuidad y el registro (arts. 254 y 273).'
    when v_b4 is not null and v_b4 < 70 then 'Su rival flaquea en control judicial: pida la exclusión en la preparatoria (arts. 23, 359 y 360).'
    when v_b6 is not null and v_b6 < 70 then 'Su rival flaquea en licitud y valoración: ataque la licitud y el valor del pantallazo.'
    else 'Su rival va bien en los retos: vaya por el eslabón roto de su cadena de custodia y contrainterrogue al perito (arts. 393 y 403).'
  end;

  return jsonb_build_object('group', v_group, 'rival', v_rival, 'card', v_carta);
end;
$$;

revoke execute on function public.my_hearing_card(text) from public, anon;
grant execute on function public.my_hearing_card(text) to authenticated;

-- Comprobación: debe mostrar la función creada.
select proname from pg_proc where proname = 'my_hearing_card';
