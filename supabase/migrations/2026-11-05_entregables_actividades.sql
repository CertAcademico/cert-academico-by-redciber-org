-- ═════════════════════════════════════════════════════════════
-- Migración 2026-11-05 — Entregables de las actividades grupales
-- Los estudiantes suben el entregable de una actividad (por módulo); solo lo ven su autor y
-- los docentes, tutores y administradores. Los archivos van a un bucket privado y se abren
-- con enlaces firmados de corta duración. El registro gratuito (free_student) no sube archivos.
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
