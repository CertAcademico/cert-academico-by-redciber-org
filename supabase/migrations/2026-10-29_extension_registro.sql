-- ═════════════════════════════════════════════════════════════
-- Migración 2026-10-29 — Extensión del registro gratuito y del corte del ranking
-- Nuevo cierre: martes 3 de noviembre de 2026, 23:59 (hora de Colombia).
-- Reemplaza handle_new_user() (2026-10-22) y campaign_cutoff() (2026-10-24); el resto queda igual.
-- Correr completa en Supabase → SQL Editor ANTES del 31 de octubre 23:59. Es idempotente.
-- ─────────────────────────────────────────────────────────────

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role text;
  v_consent text := nullif(new.raw_user_meta_data ->> 'data_consent_version', '');
begin
  select role into v_role from public.allowed_emails where email = new.email;

  if v_role is null then
    if now() > timestamptz '2026-11-03 23:59:59-05' then
      raise exception 'REGISTRATION_CLOSED';
    end if;
    if v_consent is null then
      raise exception 'CONSENT_REQUIRED';
    end if;
    v_role := 'free_student';
  end if;

  insert into public.profiles (id, name, email, role, data_consent_at, data_consent_version)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', new.email),
    new.email,
    v_role,
    case when v_consent is not null then now() end,
    v_consent
  );
  return new;
end;
$$;

create or replace function public.campaign_cutoff()
returns timestamptz
language sql
immutable
as $$ select timestamptz '2026-11-03 23:59:59-05'; $$;

-- Comprobación: debe mostrar el 3 de noviembre 23:59:59 de Colombia (en UTC: 2026-11-04 04:59:59+00).
select public.campaign_cutoff() as nuevo_corte;
