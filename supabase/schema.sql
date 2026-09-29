-- CERT Académico by RedCiber.org — esquema Supabase
-- Ejecutar una sola vez en: Supabase Dashboard → SQL Editor → New query → Run.
-- Seguro de re-ejecutar (usa IF NOT EXISTS / OR REPLACE / DROP POLICY IF EXISTS).

-- ─────────────────────────────────────────────────────────────
-- 1. profiles — un perfil por usuario de auth.users
-- ─────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  email text not null,
  role text not null default 'student' check (role in ('student', 'teacher')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- ─────────────────────────────────────────────────────────────
-- 2. course_progress — una fila por (usuario, ruta de aprendizaje)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.course_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  path_id text not null,
  completed_modules int[] not null default '{}',
  scores jsonb not null default '{}',
  started_at timestamptz not null default now(),
  last_accessed_at timestamptz not null default now(),
  completed_at timestamptz,
  unique (user_id, path_id)
);

alter table public.course_progress enable row level security;

-- ─────────────────────────────────────────────────────────────
-- 3. is_teacher() — helper security-definer, evita recursión en las policies
-- ─────────────────────────────────────────────────────────────
create or replace function public.is_teacher()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'teacher'
  );
$$;

-- ─────────────────────────────────────────────────────────────
-- 4. Trigger: crear profiles automáticamente al registrarse
-- ─────────────────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', new.email),
    new.email,
    'student'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─────────────────────────────────────────────────────────────
-- 5. Policies — profiles
-- ─────────────────────────────────────────────────────────────
drop policy if exists "profiles: select own or teacher sees all" on public.profiles;
create policy "profiles: select own or teacher sees all"
  on public.profiles for select
  using (id = auth.uid() or public.is_teacher());

drop policy if exists "profiles: update own name only" on public.profiles;
create policy "profiles: update own name only"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

-- No se permite insert/delete desde el cliente: profiles se crea solo vía el trigger.

-- ─────────────────────────────────────────────────────────────
-- 6. Policies — course_progress
-- ─────────────────────────────────────────────────────────────
drop policy if exists "course_progress: select own or teacher sees all" on public.course_progress;
create policy "course_progress: select own or teacher sees all"
  on public.course_progress for select
  using (user_id = auth.uid() or public.is_teacher());

drop policy if exists "course_progress: insert own rows" on public.course_progress;
create policy "course_progress: insert own rows"
  on public.course_progress for insert
  with check (user_id = auth.uid());

drop policy if exists "course_progress: update own rows" on public.course_progress;
create policy "course_progress: update own rows"
  on public.course_progress for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "course_progress: delete own rows" on public.course_progress;
create policy "course_progress: delete own rows"
  on public.course_progress for delete
  using (user_id = auth.uid());
