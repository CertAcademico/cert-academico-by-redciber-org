-- Consultas de seguimiento de registros (solo lectura). Ejecutar en Supabase → SQL Editor.
-- Ejecute cada bloque por separado: el SQL Editor muestra el resultado de la última consulta.

-- 1) RESUMEN: cuántas personas hay por tipo de usuario y cuántas se registraron en la campaña.
select
  case p.role
    when 'free_student' then 'Registro gratuito (campaña)'
    when 'student'      then 'Cohorte EAN – Hacking Ético'
    when 'cti_student'  then 'Cohorte CTI'
    when 'cert_student' then 'CERTs/CSIRTs (Hacienda y autorregistro previo)'
    when 'auditor'      then 'Auditores cooperativas'
    when 'teacher'      then 'Docentes'
    when 'tutor'        then 'Tutores'
    when 'admin'        then 'Administradores'
    else p.role
  end as tipo_de_usuario,
  count(*) as personas,
  count(*) filter (where p.created_at >= timestamptz '2026-10-22 00:00:00-05') as desde_inicio_campana,
  count(*) filter (where p.data_consent_at is not null) as con_consentimiento
from public.profiles p
group by p.role
order by personas desc;

-- 2) DETALLE de la campaña: cada persona del registro gratuito, su avance y sus badges.
select
  p.name as nombre,
  p.email as correo,
  to_char(p.created_at at time zone 'America/Bogota', 'YYYY-MM-DD HH24:MI') as registrado,
  count(distinct cp.path_id) as cursos_iniciados,
  count(distinct cp.path_id) filter (where cp.completed_at is not null) as cursos_completados,
  (select count(*) from public.certificates c where c.user_id = p.id) as badges,
  to_char(max(cp.last_accessed_at) at time zone 'America/Bogota', 'YYYY-MM-DD HH24:MI') as ultima_actividad
from public.profiles p
left join public.course_progress cp on cp.user_id = p.id
where p.role = 'free_student'
group by p.id, p.name, p.email, p.created_at
order by p.created_at desc;

-- 3) REGISTROS POR DÍA durante la campaña (útil para medir el efecto de cada publicación).
select
  to_char(p.created_at at time zone 'America/Bogota', 'YYYY-MM-DD') as dia,
  count(*) as nuevos_registros
from public.profiles p
where p.role = 'free_student'
group by 1
order by 1;
