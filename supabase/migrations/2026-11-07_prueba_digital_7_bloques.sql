-- Prueba Digital: los Bloques 7 y 8 se unieron en uno solo. El curso pasa de 8 a 7 bloques.
-- Sin esto, el servidor seguiría exigiendo 8 bloques y nadie podría recibir el certificado.
-- Correr completa en Supabase → SQL Editor (copiar todo con Cmd + A). Es idempotente.

create or replace function public.course_module_counts()
returns jsonb
language sql
immutable
as $$
  select '{
    "cybersecurity": 10, "cybercrime": 10, "cybercriminology": 5, "quantum_computing": 6,
    "forensic_auditing": 6, "artificial_intelligence": 9, "ia_ofensiva_insider": 6, "cert_csirt": 8,
    "auditoria_ciberriesgo": 11, "cti_basico": 11, "prueba_digital": 7,
    "cybercrime_intermedio": 7, "cybercrime_avanzado": 8,
    "forensic_intermedio": 7, "forensic_avanzado": 8,
    "csirt_intermedio": 7, "csirt_avanzado": 8,
    "cybersecurity_intermedio": 7, "cybersecurity_avanzado": 8,
    "cybercriminology_intermedio": 7, "cybercriminology_avanzado": 8
  }'::jsonb;
$$;

-- Comprobación: debe mostrar 7.
select public.course_module_counts() ->> 'prueba_digital' as bloques_prueba_digital;
