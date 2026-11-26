-- 1) Publicaciones de badges: en LinkedIn (enlace) o en el Muro de logros de la plataforma (mensaje).
create table if not exists public.badge_publications (
  user_id uuid not null references auth.users (id) on delete cascade,
  path_id text not null,
  channel text not null check (channel in ('linkedin', 'muro')),
  post_url text check (post_url is null or (post_url ~* '^https://([a-z0-9-]+\.)?linkedin\.com/' and length(post_url) <= 500)),
  message text check (message is null or length(message) between 20 and 500),
  author_name text not null,
  cert_code text not null,
  created_at timestamptz not null default now(),
  revoked_at timestamptz,
  revoked_reason text,
  primary key (user_id, path_id),
  check ((channel = 'linkedin' and post_url is not null) or (channel = 'muro' and message is not null))
);

alter table public.badge_publications enable row level security;
revoke all on public.badge_publications from anon;
revoke insert, update, delete on public.badge_publications from authenticated;

-- Cada quien ve las suyas; docentes y administradores ven todas (para revisar y anular).
drop policy if exists "badge_publications: read own or staff" on public.badge_publications;
create policy "badge_publications: read own or staff"
  on public.badge_publications for select to authenticated
  using (user_id = auth.uid() or public.is_teacher());

-- Publicar el badge propio. Exige haber ganado el badge (certificado emitido).
create or replace function public.publish_badge(p_path text, p_channel text, p_url text, p_message text)
returns timestamptz
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code text;
  v_name text;
  v_at timestamptz := now();
begin
  if auth.uid() is null then
    raise exception 'NOT_AUTHENTICATED';
  end if;
  select code, recipient_name into v_code, v_name from public.certificates where user_id = auth.uid() and path_id = p_path;
  if v_code is null then
    raise exception 'BADGE_NOT_EARNED';
  end if;
  if p_channel = 'linkedin' then
    if p_url is null or p_url !~* '^https://([a-z0-9-]+\.)?linkedin\.com/' then
      raise exception 'INVALID_LINKEDIN_URL';
    end if;
  elsif p_channel = 'muro' then
    if p_message is null or length(trim(p_message)) < 20 then
      raise exception 'MESSAGE_TOO_SHORT';
    end if;
  else
    raise exception 'INVALID_CHANNEL';
  end if;
  insert into public.badge_publications (user_id, path_id, channel, post_url, message, author_name, cert_code, created_at)
  values (auth.uid(), p_path, p_channel,
          case when p_channel = 'linkedin' then trim(p_url) end,
          case when p_channel = 'muro' then left(trim(p_message), 500) end,
          v_name, v_code, v_at)
  on conflict (user_id, path_id) do update
    set channel = excluded.channel, post_url = excluded.post_url, message = excluded.message,
        created_at = excluded.created_at, revoked_at = null, revoked_reason = null;
  return v_at;
end;
$$;

revoke execute on function public.publish_badge(text, text, text, text) from public, anon;
grant execute on function public.publish_badge(text, text, text, text) to authenticated;

-- Muro de logros: lo ven todos los usuarios registrados (solo lo que cada autor publicó en el muro).
create or replace function public.achievement_wall(p_limit int default 24)
returns table (author_name text, path_id text, message text, cert_code text, created_at timestamptz)
language sql
stable
security definer
set search_path = public
as $$
  select b.author_name, b.path_id, b.message, b.cert_code, b.created_at
  from public.badge_publications b
  where b.channel = 'muro' and b.revoked_at is null
  order by b.created_at desc
  limit least(greatest(coalesce(p_limit, 24), 1), 60);
$$;

revoke execute on function public.achievement_wall(int) from public, anon;
grant execute on function public.achievement_wall(int) to authenticated;

-- ¿Publicó (y no se anuló) el badge de este curso?
create or replace function public.badge_published(p_user uuid, p_path text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.badge_publications
                 where user_id = p_user and path_id = p_path and revoked_at is null);
$$;

-- 2) Badge de un nivel: además del nivel anterior completo, su badge publicado.
--    Quien ya había empezado el nivel antes de esta regla (26/11/2026) queda exento.
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
    if v_prereq is not null
       and not public.badge_published(v_uid, v_prereq)
       and not exists (select 1 from public.course_progress cp
                       where cp.user_id = v_uid and cp.path_id = p_path_id
                         and cp.started_at < timestamptz '2026-11-26 00:00:00-05') then
      raise exception 'PREREQUISITE_NOT_PUBLISHED';
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

select count(*) as publicaciones, public.course_prerequisite() ->> 'cti_avanzado' as prerequisito_cti_avanzado
from public.badge_publications;

/* Migración 2026-11-26 — Publicar el badge para avanzar de nivel en el mapa de expertise.
   · Para abrir el Intermedio hay que terminar el Básico y publicar su badge; para el Avanzado, igual con el Intermedio.
   · Dos formas de publicar: enlace de una publicación de LinkedIn (no se puede verificar automáticamente:
     el administrador puede revisarla y anularla) o un mensaje en el Muro de logros de la plataforma,
     que ven los usuarios registrados (nombre, badge, mensaje y código de verificación).
   · El servidor exige la publicación al emitir el badge del nivel siguiente. Quien ya había empezado
     un nivel antes del 26/11/2026 queda exento para ese nivel.
   · Requiere la migración 2026-11-25 (campaña) y 2026-11-05 (milestone_rules).
   Correr completa en Supabase → SQL Editor (proyecto quzuorohzfxmgnvrqppb). Es idempotente.
   Debe mostrar: publicaciones = 0 · cti_intermedio */
