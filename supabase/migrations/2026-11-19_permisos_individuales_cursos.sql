create table if not exists public.course_grants (
  user_id    uuid not null references auth.users (id) on delete cascade,
  path_id    text not null,
  granted_at timestamptz not null default now(),
  primary key (user_id, path_id)
);

alter table public.course_grants enable row level security;

drop policy if exists "course_grants_select_own" on public.course_grants;
create policy "course_grants_select_own" on public.course_grants
  for select to authenticated
  using (user_id = auth.uid());

revoke insert, update, delete on public.course_grants from anon, authenticated;

create or replace function public.can_access_course(p_path text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((
    select case
      when p.role in ('admin', 'teacher', 'tutor') then true
      when exists (
        select 1 from public.course_grants g
        where g.user_id = p.id
          and (g.path_id = p_path
               or (g.path_id = 'general'
                   and p_path not in ('cert_csirt', 'auditoria_ciberriesgo', 'cti_basico', 'prueba_digital', 'antisuplantacion_seguros')))
      ) then true
      when p.role = 'cert_student'      then p_path = 'cert_csirt'
      when p.role = 'auditor'           then p_path = 'auditoria_ciberriesgo'
      when p.role = 'cti_student'       then p_path = 'cti_basico'
      when p.role = 'law_student'       then p_path = 'prueba_digital'
      when p.role = 'insurance_student' then p_path = 'antisuplantacion_seguros'
      when p.role = 'free_student'      then p_path = any(public.free_route())
      when p.role = 'student'           then p_path not in ('cert_csirt', 'auditoria_ciberriesgo', 'cti_basico', 'prueba_digital', 'antisuplantacion_seguros')
      else false
    end
    from public.profiles p
    where p.id = auth.uid()
  ), false);
$$;

revoke execute on function public.can_access_course(text) from public, anon;
grant execute on function public.can_access_course(text) to authenticated;

/* Permisos individuales de cursos, además de los del rol.
   path_id = 'general'  → todos los cursos no exclusivos (los del pregrado y sus niveles).
   path_id = '<curso>'  → ese curso exclusivo (cert_csirt, prueba_digital, …).
   Los otorga solo un administrador desde el SQL Editor; cada usuario lee únicamente los suyos.
   La app (authService.fetchProfile) los carga al iniciar sesión y quita el calendario a esos cursos. */
