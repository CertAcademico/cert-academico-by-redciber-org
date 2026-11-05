-- ═════════════════════════════════════════════════════════════
-- Migración 2026-11-05 — Entregables de las actividades grupales, XP por grupo y badge de Fase 1
-- Cada estudiante elige su grupo (A–F) en el curso. Cuando alguien del grupo sube el entregable
-- de una sesión, todos los integrantes reciben 30 XP. Quien completa las sesiones 1 a 3 y cuyo
-- grupo entregó las tres obtiene el badge verificable "CERTs y CSIRTs — Fase 1".
-- Los archivos solo los ven su autor y los docentes, tutores y administradores; van a un bucket
-- privado y se abren con enlaces firmados. El registro gratuito (free_student) no sube archivos.
-- Correr completa en Supabase → SQL Editor, DESPUÉS de 2026-10-27. Es idempotente.
-- ─────────────────────────────────────────────────────────────

-- ¿Puede el usuario actual entregar en este curso? Acceso al curso y rol distinto de free_student.
create or replace function public.can_submit_course(p_path text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.can_access_course(p_path)
     and coalesce((select role <> 'free_student' from public.profiles where id = auth.uid()), false);
$$;

revoke execute on function public.can_submit_course(text) from public, anon;
grant execute on function public.can_submit_course(text) to authenticated;

-- Grupo de cada estudiante en cada curso. Se elige con set_my_group().
create table if not exists public.course_groups (
  path_id text not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  group_label text not null check (group_label in ('A', 'B', 'C', 'D', 'E', 'F')),
  updated_at timestamptz not null default now(),
  primary key (path_id, user_id)
);

alter table public.course_groups enable row level security;
revoke all on public.course_groups from anon;
revoke insert, update, delete on public.course_groups from authenticated;

drop policy if exists "course_groups: read own or staff" on public.course_groups;
create policy "course_groups: read own or staff"
  on public.course_groups for select to authenticated
  using (user_id = auth.uid() or public.is_teacher());

create table if not exists public.activity_submissions (
  id uuid primary key default gen_random_uuid(),
  path_id text not null,
  module_id text not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  author_name text not null,
  group_label text check (group_label in ('A', 'B', 'C', 'D', 'E', 'F')),
  file_name text not null check (char_length(file_name) between 1 and 200),
  storage_path text not null unique,
  size_bytes bigint not null check (size_bytes > 0 and size_bytes <= 20971520),
  created_at timestamptz not null default now()
);

create index if not exists activity_submissions_module_idx on public.activity_submissions (path_id, module_id, created_at desc);

-- Autor y nombre desde el perfil; la ruta del archivo debe estar en la carpeta del autor.
create or replace function public.submission_set_author()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.user_id := auth.uid();
  new.author_name := coalesce((select name from public.profiles where id = auth.uid()), 'Participante');
  new.created_at := now();
  new.group_label := (select group_label from public.course_groups where path_id = new.path_id and user_id = auth.uid());
  if new.group_label is null then
    raise exception 'GROUP_REQUIRED';
  end if;
  if new.storage_path not like new.path_id || '/' || auth.uid()::text || '/' || new.module_id || '/%' then
    raise exception 'INVALID_STORAGE_PATH';
  end if;
  if (select count(*) from public.activity_submissions
      where user_id = auth.uid() and path_id = new.path_id and module_id = new.module_id) >= 5 then
    raise exception 'TOO_MANY_FILES';
  end if;
  return new;
end;
$$;

drop trigger if exists activity_submissions_author on public.activity_submissions;
create trigger activity_submissions_author
  before insert on public.activity_submissions
  for each row execute function public.submission_set_author();

alter table public.activity_submissions enable row level security;
revoke all on public.activity_submissions from anon;
revoke update on public.activity_submissions from authenticated;

drop policy if exists "submissions: read own or staff" on public.activity_submissions;
create policy "submissions: read own or staff"
  on public.activity_submissions for select to authenticated
  using (user_id = auth.uid() or public.is_teacher());

drop policy if exists "submissions: insert own" on public.activity_submissions;
create policy "submissions: insert own"
  on public.activity_submissions for insert to authenticated
  with check (public.can_submit_course(path_id));

drop policy if exists "submissions: delete own or admin" on public.activity_submissions;
create policy "submissions: delete own or admin"
  on public.activity_submissions for delete to authenticated
  using (user_id = auth.uid() or public.is_admin());

-- ─────────────────────────────────────────────────────────────
-- Storage: bucket privado. Ruta: <path_id>/<user_id>/<module_id>/<archivo>.
-- ─────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'activity-submissions', 'activity-submissions', false, 20971520,
  array[
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/png', 'image/jpeg'
  ]
)
on conflict (id) do update
  set public = false,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "activity-submissions: read own or staff" on storage.objects;
create policy "activity-submissions: read own or staff"
  on storage.objects for select to authenticated
  using (bucket_id = 'activity-submissions'
         and ((storage.foldername(name))[2] = auth.uid()::text or public.is_teacher()));

drop policy if exists "activity-submissions: insert own folder" on storage.objects;
create policy "activity-submissions: insert own folder"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'activity-submissions'
              and (storage.foldername(name))[2] = auth.uid()::text
              and public.can_submit_course((storage.foldername(name))[1]));

drop policy if exists "activity-submissions: delete own or admin" on storage.objects;
create policy "activity-submissions: delete own or admin"
  on storage.objects for delete to authenticated
  using (bucket_id = 'activity-submissions'
         and ((storage.foldername(name))[2] = auth.uid()::text or public.is_admin()));

-- ═════════════════════════════════════════════════════════════
-- XP por entregas del grupo y badge de Fase 1
-- ─────────────────────────────────────────────────────────────

-- Sesiones con entregable que dan XP al grupo. Si se agrega otra, sumarla aquí.
create or replace function public.deliverable_modules()
returns jsonb language sql immutable
as $$ select '{"cert_csirt": ["cert_s1", "cert_s2", "cert_s3"]}'::jsonb; $$;

create or replace function public.deliverable_xp()
returns int language sql immutable
as $$ select 30; $$;

-- Badges de alcance: módulos que el estudiante debe completar (índices) y entregas de su grupo.
create or replace function public.milestone_rules()
returns jsonb language sql immutable
as $$ select '{"cert_csirt_fase1": {"path": "cert_csirt", "modules": [0, 1, 2], "deliverables": ["cert_s1", "cert_s2", "cert_s3"]}}'::jsonb; $$;

-- Recalcula el XP de entregas de un estudiante según lo que entregó su grupo actual.
-- Se guarda en course_progress.scores con la clave "entrega:<módulo>", así lo suma el XP de la app.
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
begin
  if not (public.deliverable_modules() ? p_path) then
    return;
  end if;
  select group_label into v_group from public.course_groups where path_id = p_path and user_id = p_user;
  for v_mod in select jsonb_array_elements_text(public.deliverable_modules() -> p_path) loop
    v_key := 'entrega:' || v_mod;
    if v_group is not null and exists (
      select 1 from public.activity_submissions s
      where s.path_id = p_path and s.module_id = v_mod and s.group_label = v_group
    ) then
      insert into public.course_progress (user_id, path_id) values (p_user, p_path)
        on conflict (user_id, path_id) do nothing;
      update public.course_progress
        set scores = scores || jsonb_build_object(v_key, jsonb_build_object(
          'moduleId', v_key, 'score', public.deliverable_xp(), 'maxScore', public.deliverable_xp(), 'completedAt', now()))
        where user_id = p_user and path_id = p_path and not (scores ? v_key);
    else
      update public.course_progress
        set scores = scores - v_key
        where user_id = p_user and path_id = p_path and scores ? v_key;
    end if;
  end loop;
end;
$$;

revoke execute on function public.sync_deliverable_xp(uuid, text) from public, anon, authenticated;

-- El estudiante puede pedir que se recalcule su propio XP (la app lo hace al abrir la actividad).
create or replace function public.sync_my_deliverable_xp(p_path text)
returns void
language sql
security definer
set search_path = public
as $$ select public.sync_deliverable_xp(auth.uid(), p_path) where auth.uid() is not null; $$;

revoke execute on function public.sync_my_deliverable_xp(text) from public, anon;
grant execute on function public.sync_my_deliverable_xp(text) to authenticated;

-- Al subir o borrar una entrega, se actualiza el XP de todo el grupo.
create or replace function public.submissions_sync_group()
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

drop trigger if exists activity_submissions_sync on public.activity_submissions;
create trigger activity_submissions_sync
  after insert or delete on public.activity_submissions
  for each row execute function public.submissions_sync_group();

-- Al entrar o cambiar de grupo, el estudiante recibe el XP de lo que ya entregó ese grupo.
create or replace function public.course_groups_sync()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.sync_deliverable_xp(coalesce(new.user_id, old.user_id), coalesce(new.path_id, old.path_id));
  return null;
end;
$$;

drop trigger if exists course_groups_sync on public.course_groups;
create trigger course_groups_sync
  after insert or update or delete on public.course_groups
  for each row execute function public.course_groups_sync();

-- Elegir (o cambiar) el grupo propio en un curso.
create or replace function public.set_my_group(p_path text, p_group text)
returns text
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.can_submit_course(p_path) then
    raise exception 'NO_ACCESS';
  end if;
  if p_group is null or p_group not in ('A', 'B', 'C', 'D', 'E', 'F') then
    raise exception 'INVALID_GROUP';
  end if;
  insert into public.course_groups (path_id, user_id, group_label) values (p_path, auth.uid(), p_group)
    on conflict (path_id, user_id) do update set group_label = excluded.group_label, updated_at = now()
    where public.course_groups.group_label is distinct from excluded.group_label;
  return p_group;
end;
$$;

revoke execute on function public.set_my_group(text, text) from public, anon;
grant execute on function public.set_my_group(text, text) to authenticated;

-- Integrantes por grupo: el estudiante ve solo su grupo; docentes, tutores y admins ven todos.
create or replace function public.group_roster(p_path text)
returns table (group_label text, member_name text, is_me boolean)
language sql
stable
security definer
set search_path = public
as $$
  select g.group_label, coalesce(p.name, 'Participante'), g.user_id = auth.uid()
  from public.course_groups g
  left join public.profiles p on p.id = g.user_id
  where g.path_id = p_path
    and (public.is_teacher()
         or g.group_label = (select group_label from public.course_groups where path_id = p_path and user_id = auth.uid()))
  order by g.group_label, 2;
$$;

revoke execute on function public.group_roster(text) from public, anon;
grant execute on function public.group_roster(text) to authenticated;

-- Avance del estudiante actual hacia un badge de alcance.
create or replace function public.milestone_status(p_milestone text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  r jsonb := public.milestone_rules() -> p_milestone;
  v_path text;
  v_group text;
  v_mods int;
  v_deliv int;
begin
  if r is null then
    raise exception 'UNKNOWN_MILESTONE';
  end if;
  v_path := r ->> 'path';
  select group_label into v_group from public.course_groups where path_id = v_path and user_id = auth.uid();
  select count(*) into v_mods
  from jsonb_array_elements_text(r -> 'modules') m(i)
  where exists (
    select 1 from public.course_progress cp
    where cp.user_id = auth.uid() and cp.path_id = v_path and m.i::int = any (cp.completed_modules)
  );
  select count(*) into v_deliv
  from jsonb_array_elements_text(r -> 'deliverables') d(m)
  where v_group is not null and exists (
    select 1 from public.activity_submissions s
    where s.path_id = v_path and s.module_id = d.m and s.group_label = v_group
  );
  return jsonb_build_object(
    'group', v_group,
    'modules_done', v_mods,
    'modules_total', jsonb_array_length(r -> 'modules'),
    'delivered', v_deliv,
    'deliverables_total', jsonb_array_length(r -> 'deliverables'),
    'eligible', v_mods = jsonb_array_length(r -> 'modules') and v_deliv = jsonb_array_length(r -> 'deliverables')
  );
end;
$$;

revoke execute on function public.milestone_status(text) from public, anon;
grant execute on function public.milestone_status(text) to authenticated;

-- issue_certificate (de 2026-10-23) + badges de alcance.
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
  elsif public.milestone_rules() ? p_path_id then
    if not (public.milestone_status(p_path_id) ->> 'eligible')::boolean then
      raise exception 'MILESTONE_NOT_REACHED';
    end if;
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
