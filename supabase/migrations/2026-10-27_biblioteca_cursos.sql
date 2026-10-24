-- ═════════════════════════════════════════════════════════════
-- Migración 2026-10-27 — Biblioteca de materiales por curso
-- Videos, documentos, presentaciones y enlaces indexados por curso y módulo. Solo los ve quien
-- tiene acceso al curso; solo los administradores agregan o eliminan. Los archivos van en un
-- bucket privado de Storage y se abren con enlaces firmados de corta duración.
-- Correr completa en Supabase → SQL Editor. Es idempotente. No modifica progreso ni certificados.
-- ─────────────────────────────────────────────────────────────

-- ¿Puede el usuario actual ver este curso? Refleja las reglas de acceso de la app (sin calendario).
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
      when p.role = 'cert_student' then p_path = 'cert_csirt'
      when p.role = 'auditor'      then p_path = 'auditoria_ciberriesgo'
      when p.role = 'cti_student'  then p_path = 'cti_basico'
      when p.role = 'free_student' then p_path = any(public.free_route())
      when p.role = 'student'      then p_path not in ('cert_csirt', 'auditoria_ciberriesgo', 'cti_basico')
      else false
    end
    from public.profiles p
    where p.id = auth.uid()
  ), false);
$$;

revoke execute on function public.can_access_course(text) from public, anon;
grant execute on function public.can_access_course(text) to authenticated;

create table if not exists public.course_resources (
  id uuid primary key default gen_random_uuid(),
  path_id text not null,
  kind text not null check (kind in ('video', 'document', 'presentation', 'link')),
  title text not null,
  description text not null default '',
  module_id text,                       -- módulo relacionado (opcional)
  tags text[] not null default '{}',
  source text not null default '',      -- autor, canal o institución
  url text,                             -- enlace externo o de YouTube
  storage_path text,                    -- archivo subido al bucket course-materials
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  check (url is not null or storage_path is not null)
);

create index if not exists course_resources_path_idx on public.course_resources (path_id);

alter table public.course_resources enable row level security;
revoke insert, update, delete on public.course_resources from anon;

drop policy if exists "course_resources: read if course access" on public.course_resources;
create policy "course_resources: read if course access"
  on public.course_resources for select
  to authenticated
  using (public.can_access_course(path_id));

drop policy if exists "course_resources: admin writes" on public.course_resources;
create policy "course_resources: admin writes"
  on public.course_resources for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ─────────────────────────────────────────────────────────────
-- Storage: bucket privado. Ruta de cada archivo: <path_id>/<nombre>.
-- ─────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'course-materials', 'course-materials', false, 52428800,
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

drop policy if exists "course-materials: read if course access" on storage.objects;
create policy "course-materials: read if course access"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'course-materials' and public.can_access_course((storage.foldername(name))[1]));

drop policy if exists "course-materials: admin insert" on storage.objects;
create policy "course-materials: admin insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'course-materials' and public.is_admin());

drop policy if exists "course-materials: admin delete" on storage.objects;
create policy "course-materials: admin delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'course-materials' and public.is_admin());

-- ─────────────────────────────────────────────────────────────
-- Material inicial del curso de CTI (verificado: los videos existen y permiten insertarse).
-- ─────────────────────────────────────────────────────────────
insert into public.course_resources (path_id, kind, title, description, module_id, tags, source, url)
select v.* from (values
  ('cti_basico', 'presentation', 'Presentación del curso: Fundamentos de CTI', '25 diapositivas con los conceptos clave y cifras 2025–2026 (IBM, Verizon DBIR, CrowdStrike, Mandiant, MITRE).', 'cti_intro', array['presentación','resumen','cifras'], 'CERT Académico', '/materiales/cti/presentacion-cti.html'),
  ('cti_basico', 'video', 'Conceptos de Ciberseguridad en un minuto: Cyber Threat Intelligence', 'Definición rápida de la inteligencia de amenazas. Ideal para empezar.', 'cti_intro', array['introducción','CTI'], 'Campus de Ciberseguridad', 'https://www.youtube.com/watch?v=fHm0GIhDeAU'),
  ('cti_basico', 'video', 'Inteligencia de Amenazas (Threat Intelligence) para Ciberseguridad', 'Actores, TTP, indicadores y cómo convertir datos externos en decisiones.', 'cti_intro', array['CTI','TTP','IoC'], 'Marcelo Felman', 'https://www.youtube.com/watch?v=DO9NkSr8B0o'),
  ('cti_basico', 'video', 'Threat Intelligence Essentials (TIE)', 'Conceptos básicos de inteligencia de amenazas cibernéticas.', 'cti_cycle', array['CTI','fundamentos'], 'ECC LATAM (EC-Council)', 'https://www.youtube.com/watch?v=ss3pSN9rKu0'),
  ('cti_basico', 'video', 'The Secret Origins of the Pyramid of Pain (en inglés)', 'El autor del modelo, David Bianco, explica su origen. Active los subtítulos en español.', 'cti_pyramid', array['Pirámide del Dolor','IoC','inglés'], 'BSidesAugusta', 'https://www.youtube.com/watch?v=3Xrl6ICxKxI'),
  ('cti_basico', 'video', 'Cyber Kill Chain: Anatomía de un Ciberataque', 'Las fases de un ataque según el modelo de Lockheed Martin.', 'cti_killchain', array['Kill Chain'], 'CANANO', 'https://www.youtube.com/watch?v=6KsxyskBORw'),
  ('cti_basico', 'video', 'MITRE: Comprendiendo las Tácticas de ATT&CK – Charla 165', 'Recorrido por las tácticas de la matriz. Nota: desde la versión 19 (abril de 2026) son 15 tácticas.', 'cti_attack', array['ATT&CK','tácticas'], 'DarFe', 'https://www.youtube.com/watch?v=mpT6eIprbTg'),
  ('cti_basico', 'video', 'MITRE: ATT&CK Navigator – uso (Charla 168)', 'Cómo usar el Navigator para mapear técnicas.', 'cti_attack', array['ATT&CK','Navigator','práctica'], 'DarFe', 'https://www.youtube.com/watch?v=S5Ad0JXdLHM'),
  ('cti_basico', 'video', 'Fundamentos de MITRE ATT&CK – Curso gratuito', 'Curso completo y opcional para profundizar.', 'cti_attack', array['ATT&CK','profundización'], 'Fundación Sochisi (Prof. Sebastián Vargas)', 'https://www.youtube.com/watch?v=0AWQXCNe63A'),
  ('cti_basico', 'link', 'MITRE ATT&CK Navigator', 'Herramienta oficial para colorear en la matriz las técnicas de un caso. Úsela en el laboratorio del módulo 10.', 'cti_attack', array['ATT&CK','herramienta'], 'MITRE', 'https://mitre-attack.github.io/attack-navigator/'),
  ('cti_basico', 'link', 'MITRE ATT&CK', 'Base de conocimiento oficial: busque cualquier técnica (por ejemplo T1566) y vea grupos y mitigaciones.', 'cti_attack', array['ATT&CK','referencia'], 'MITRE', 'https://attack.mitre.org/'),
  ('cti_basico', 'link', 'Catálogo KEV de CISA', 'Vulnerabilidades explotadas activamente, con buscador.', 'cti_sources', array['KEV','vulnerabilidades'], 'CISA', 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog'),
  ('cti_basico', 'link', 'Traffic Light Protocol (TLP) 2.0', 'Definición oficial de cada etiqueta TLP.', 'cti_sharing', array['TLP','compartir'], 'FIRST', 'https://www.first.org/tlp/'),
  ('cti_basico', 'link', 'Documentación de STIX y TAXII', 'Estándares para describir y transportar inteligencia de amenazas.', 'cti_sharing', array['STIX','TAXII'], 'OASIS', 'https://oasis-open.github.io/cti-documentation/'),
  ('cti_basico', 'link', 'CyberChef', 'Herramienta para decodificar datos de forma segura en el navegador (por ejemplo, comandos en Base64).', 'cti_report', array['herramienta','análisis'], 'GCHQ', 'https://gchq.github.io/CyberChef/')
) as v(path_id, kind, title, description, module_id, tags, source, url)
where not exists (
  select 1 from public.course_resources r where r.path_id = v.path_id and r.url = v.url
);
