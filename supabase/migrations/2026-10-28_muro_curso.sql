-- ═════════════════════════════════════════════════════════════
-- Migración 2026-10-28 — Muro del curso (presentaciones de los estudiantes)
-- Lo leen y escriben quienes tienen acceso al curso (can_access_course, migración 2026-10-27).
-- El autor y su nombre los pone la base de datos: nadie puede publicar a nombre de otro.
-- Cada quien edita o borra lo suyo; los administradores pueden borrar cualquier publicación.
-- Correr completa en Supabase → SQL Editor, DESPUÉS de 2026-10-27. Es idempotente.
-- ─────────────────────────────────────────────────────────────

create table if not exists public.course_wall_posts (
  id uuid primary key default gen_random_uuid(),
  path_id text not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  author_name text not null,
  body text not null check (char_length(btrim(body)) between 1 and 1200),
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create index if not exists course_wall_posts_path_idx on public.course_wall_posts (path_id, created_at desc);

-- Autor y nombre desde el perfil de quien publica (ignora lo que envíe el navegador).
create or replace function public.wall_set_author()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    new.user_id := auth.uid();
    new.author_name := coalesce((select name from public.profiles where id = auth.uid()), 'Participante');
    new.created_at := now();
    new.updated_at := null;
  else
    new.user_id := old.user_id;
    new.author_name := old.author_name;
    new.path_id := old.path_id;
    new.created_at := old.created_at;
    new.updated_at := now();
  end if;
  return new;
end;
$$;

drop trigger if exists course_wall_posts_author on public.course_wall_posts;
create trigger course_wall_posts_author
  before insert or update on public.course_wall_posts
  for each row execute function public.wall_set_author();

alter table public.course_wall_posts enable row level security;
revoke all on public.course_wall_posts from anon;

drop policy if exists "wall: read if course access" on public.course_wall_posts;
create policy "wall: read if course access"
  on public.course_wall_posts for select to authenticated
  using (public.can_access_course(path_id));

drop policy if exists "wall: post if course access" on public.course_wall_posts;
create policy "wall: post if course access"
  on public.course_wall_posts for insert to authenticated
  with check (public.can_access_course(path_id) and auth.uid() is not null);

drop policy if exists "wall: edit own" on public.course_wall_posts;
create policy "wall: edit own"
  on public.course_wall_posts for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "wall: delete own or admin" on public.course_wall_posts;
create policy "wall: delete own or admin"
  on public.course_wall_posts for delete to authenticated
  using (user_id = auth.uid() or public.is_admin());
