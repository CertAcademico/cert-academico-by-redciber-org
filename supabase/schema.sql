-- CERT Académico by RedCiber.org — esquema Supabase
-- Ejecutar una sola vez en: Supabase Dashboard → SQL Editor → New query → Run.
-- Seguro de re-ejecutar (usa IF NOT EXISTS / OR REPLACE / DROP POLICY IF EXISTS /
-- DROP CONSTRAINT IF EXISTS), incluso si ya corriste una versión anterior de este archivo.

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

-- Permite 'tutor' y 'admin' además de 'student'/'teacher' (ya sea tabla nueva o existente).
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check
  check (role in ('student', 'teacher', 'tutor', 'admin'));

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
-- 3. allowed_emails — lista cerrada de correos autorizados a registrarse
--    (cohorte de 16: 14 estudiantes + docente + tutor). Gestiónala desde el
--    Table Editor de Supabase — el cliente de la app nunca lee ni escribe
--    aquí directamente (sin policies = sin acceso vía anon/authenticated).
-- ─────────────────────────────────────────────────────────────
create table if not exists public.allowed_emails (
  email text primary key,
  role text not null default 'student' check (role in ('student', 'teacher', 'tutor', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.allowed_emails drop constraint if exists allowed_emails_role_check;
alter table public.allowed_emails add constraint allowed_emails_role_check
  check (role in ('student', 'teacher', 'tutor', 'admin'));

alter table public.allowed_emails enable row level security;

-- Ejemplo para cargar la cohorte (edita y descomenta, o hazlo desde el Table Editor):
-- insert into public.allowed_emails (email, role) values
--   ('docente@ejemplo.com', 'teacher'),
--   ('tutor@ejemplo.com', 'tutor'),
--   ('estudiante1@ejemplo.com', 'student')
-- on conflict (email) do update set role = excluded.role;

-- ─────────────────────────────────────────────────────────────
-- 4. is_teacher() / is_admin() — helpers security-definer, evitan
--    recursión en las policies (docente, tutor y admin ven el Panel
--    Docente por igual; admin además tiene permisos exclusivos)
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
    where id = auth.uid() and role in ('teacher', 'tutor', 'admin')
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ─────────────────────────────────────────────────────────────
-- 5. Trigger: crear profiles automáticamente al registrarse,
--    SOLO si el correo está en allowed_emails. Si no está, aborta
--    todo el registro (Supabase Auth devuelve el error al cliente).
-- ─────────────────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role text;
begin
  select role into v_role from public.allowed_emails where email = new.email;

  if v_role is null then
    raise exception 'EMAIL_NOT_ALLOWED';
  end if;

  insert into public.profiles (id, name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', new.email),
    new.email,
    v_role
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─────────────────────────────────────────────────────────────
-- 6. Policies — profiles
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
-- 7. Policies — course_progress
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

-- ─────────────────────────────────────────────────────────────
-- 8. Policies — allowed_emails (solo lectura, solo admin)
--    Las escrituras siguen sin policy de cliente a propósito: pasan
--    únicamente por las funciones serverless (service_role key), nunca
--    directo desde el navegador.
-- ─────────────────────────────────────────────────────────────
drop policy if exists "allowed_emails: admin reads all" on public.allowed_emails;
create policy "allowed_emails: admin reads all"
  on public.allowed_emails for select
  using (public.is_admin());
