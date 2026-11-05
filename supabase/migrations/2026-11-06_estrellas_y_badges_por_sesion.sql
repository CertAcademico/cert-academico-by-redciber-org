-- ═════════════════════════════════════════════════════════════
-- Migración 2026-11-06 — Estrellas por sesión y badges por sesión (CERTs y CSIRTs)
-- Cada sesión da hasta 3 estrellas:
--   ⭐ completar la sesión (10 XP, como siempre)
--   ⭐ el grupo sube el entregable (+30 XP para cada integrante)
--   ⭐ el docente destaca la entrega del grupo (+20 XP para cada integrante)
-- Cada sesión superada (completada + entrega del grupo) da un badge verificable.
-- Las sesiones 4 y 5 también tienen entregable.
-- Todos los integrantes del grupo ven la entrega del grupo (archivos, estrellas y badges).
-- Correr completa en Supabase → SQL Editor, DESPUÉS de 2026-11-05. Es idempotente.
-- ─────────────────────────────────────────────────────────────

-- Sesiones con entregable (ahora de la 1 a la 5).
create or replace function public.deliverable_modules()
returns jsonb language sql immutable
as $$ select '{"cert_csirt": ["cert_s1", "cert_s2", "cert_s3", "cert_s4", "cert_s5"]}'::jsonb; $$;

create or replace function public.star_xp()
returns int language sql immutable
as $$ select 20; $$;

-- Badges: uno por sesión y el de la Fase 1 (sesiones 1 a 3).
create or replace function public.milestone_rules()
returns jsonb language sql immutable
as $$ select '{
  "cert_csirt_fase1": {"path": "cert_csirt", "modules": [0, 1, 2], "deliverables": ["cert_s1", "cert_s2", "cert_s3"]},
  "cert_csirt_s1": {"path": "cert_csirt", "modules": [0], "deliverables": ["cert_s1"]},
  "cert_csirt_s2": {"path": "cert_csirt", "modules": [1], "deliverables": ["cert_s2"]},
  "cert_csirt_s3": {"path": "cert_csirt", "modules": [2], "deliverables": ["cert_s3"]},
  "cert_csirt_s4": {"path": "cert_csirt", "modules": [3], "deliverables": ["cert_s4"]},
  "cert_csirt_s5": {"path": "cert_csirt", "modules": [4], "deliverables": ["cert_s5"]}
}'::jsonb; $$;

-- Entregas destacadas por el docente (una estrella por grupo y sesión).
create table if not exists public.group_stars (
  path_id text not null,
  module_id text not null,
  group_label text not null check (group_label in ('A', 'B', 'C', 'D', 'E', 'F')),
  awarded_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  primary key (path_id, module_id, group_label)
);

alter table public.group_stars enable row level security;
revoke all on public.group_stars from anon;
revoke insert, update, delete on public.group_stars from authenticated;

drop policy if exists "group_stars: staff read" on public.group_stars;
create policy "group_stars: staff read"
  on public.group_stars for select to authenticated
  using (public.is_teacher());

-- XP de entregas y estrellas de un estudiante, según su grupo actual.
-- Claves en course_progress.scores: "entrega:<módulo>" (30 XP) y "estrella:<módulo>" (20 XP).
create or replace function public.sync_deliverable_xp(p_user uuid, p_path text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_group text;
  v_mod text;
  v_key text;
  v_xp int;
  v_has boolean;
  v_kind text;
begin
  if not (public.deliverable_modules() ? p_path) then
    return;
  end if;
  select group_label into v_group from public.course_groups where path_id = p_path and user_id = p_user;
  for v_mod in select jsonb_array_elements_text(public.deliverable_modules() -> p_path) loop
    foreach v_kind in array array['entrega', 'estrella'] loop
      v_key := v_kind || ':' || v_mod;
      if v_kind = 'entrega' then
        v_xp := public.deliverable_xp();
        v_has := v_group is not null and exists (
          select 1 from public.activity_submissions s
          where s.path_id = p_path and s.module_id = v_mod and s.group_label = v_group);
      else
        v_xp := public.star_xp();
        v_has := v_group is not null and exists (
          select 1 from public.group_stars g
          where g.path_id = p_path and g.module_id = v_mod and g.group_label = v_group);
      end if;
      if v_has then
        insert into public.course_progress (user_id, path_id) values (p_user, p_path)
          on conflict (user_id, path_id) do nothing;
        update public.course_progress
          set scores = scores || jsonb_build_object(v_key, jsonb_build_object(
            'moduleId', v_key, 'score', v_xp, 'maxScore', v_xp, 'completedAt', now()))
          where user_id = p_user and path_id = p_path and not (scores ? v_key);
      else
        update public.course_progress
          set scores = scores - v_key
          where user_id = p_user and path_id = p_path and scores ? v_key;
      end if;
    end loop;
  end loop;
end;
$$;

revoke execute on function public.sync_deliverable_xp(uuid, text) from public, anon, authenticated;

-- Al destacar o quitar una estrella, se actualiza el XP de todo el grupo.
create or replace function public.group_stars_sync()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  r record;
  v_path text := coalesce(new.path_id, old.path_id);
  v_group text := coalesce(new.group_label, old.group_label);
begin
  for r in select user_id from public.course_groups where path_id = v_path and group_label = v_group loop
    perform public.sync_deliverable_xp(r.user_id, v_path);
  end loop;
  return null;
end;
$$;

drop trigger if exists group_stars_sync on public.group_stars;
create trigger group_stars_sync
  after insert or delete on public.group_stars
  for each row execute function public.group_stars_sync();

-- Docente, tutor o admin: destacar (o quitar) la entrega de un grupo en una sesión.
create or replace function public.toggle_group_star(p_path text, p_module text, p_group text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_teacher() then
    raise exception 'NOT_ALLOWED';
  end if;
  if exists (select 1 from public.group_stars where path_id = p_path and module_id = p_module and group_label = p_group) then
    delete from public.group_stars where path_id = p_path and module_id = p_module and group_label = p_group;
    return false;
  end if;
  if not exists (select 1 from public.activity_submissions where path_id = p_path and module_id = p_module and group_label = p_group) then
    raise exception 'NO_SUBMISSION';
  end if;
  insert into public.group_stars (path_id, module_id, group_label, awarded_by) values (p_path, p_module, p_group, auth.uid());
  return true;
end;
$$;

revoke execute on function public.toggle_group_star(text, text, text) from public, anon;
grant execute on function public.toggle_group_star(text, text, text) to authenticated;

-- Estado del grupo del usuario en el curso: qué sesiones entregó y cuáles fueron destacadas.
create or replace function public.my_group_progress(p_path text)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  with g as (select group_label from public.course_groups where path_id = p_path and user_id = auth.uid())
  select jsonb_build_object(
    'group', (select group_label from g),
    'delivered', coalesce((select jsonb_agg(distinct s.module_id) from public.activity_submissions s
                           where s.path_id = p_path and s.group_label = (select group_label from g)), '[]'::jsonb),
    'starred', coalesce((select jsonb_agg(st.module_id) from public.group_stars st
                         where st.path_id = p_path and st.group_label = (select group_label from g)), '[]'::jsonb)
  );
$$;

revoke execute on function public.my_group_progress(text) from public, anon;
grant execute on function public.my_group_progress(text) to authenticated;

-- ═════════════════════════════════════════════════════════════
-- Todo el grupo ve la entrega del grupo
-- Antes cada estudiante veía solo los archivos que él mismo subió, así que sus
-- compañeros no veían la entrega ni sus estrellas. Ahora los integrantes del
-- mismo grupo ven y descargan los archivos del grupo (borrar sigue siendo solo del autor).
-- ─────────────────────────────────────────────────────────────
create or replace function public.my_group_label(p_path text)
returns text
language sql
stable
security definer
set search_path = public
as $$ select group_label from public.course_groups where path_id = p_path and user_id = auth.uid(); $$;

revoke execute on function public.my_group_label(text) from public, anon;
grant execute on function public.my_group_label(text) to authenticated;

drop policy if exists "submissions: read own or staff" on public.activity_submissions;
drop policy if exists "submissions: read own, group or staff" on public.activity_submissions;
create policy "submissions: read own, group or staff"
  on public.activity_submissions for select to authenticated
  using (user_id = auth.uid()
         or public.is_teacher()
         or group_label = public.my_group_label(path_id));

drop policy if exists "activity-submissions: read own or staff" on storage.objects;
drop policy if exists "activity-submissions: read own, group or staff" on storage.objects;
create policy "activity-submissions: read own, group or staff"
  on storage.objects for select to authenticated
  using (bucket_id = 'activity-submissions'
         and ((storage.foldername(name))[2] = auth.uid()::text
              or public.is_teacher()
              or exists (select 1 from public.activity_submissions s
                         where s.storage_path = storage.objects.name
                           and s.group_label = public.my_group_label(s.path_id))));
