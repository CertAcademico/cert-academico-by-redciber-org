-- Prueba Digital: el Bloque 7 se valida solo con la evaluación final (sin acta del grupo).
-- El badge del Bloque 7 se emite al aprobar la evaluación, que es lo que completa el bloque.
-- Los badges de los Bloques 1 a 6 siguen igual: reto del bloque + entrega del grupo.
-- Correr completa en Supabase → SQL Editor (copiar todo con Cmd + A). Es idempotente.

create or replace function public.milestone_rules()
returns jsonb language sql immutable
as $$ select '{
  "cert_csirt_fase1": {"path": "cert_csirt", "modules": [0, 1, 2], "deliverables": ["cert_s1", "cert_s2", "cert_s3"]},
  "cert_csirt_s1": {"path": "cert_csirt", "modules": [0], "deliverables": ["cert_s1"]},
  "cert_csirt_s2": {"path": "cert_csirt", "modules": [1], "deliverables": ["cert_s2"]},
  "cert_csirt_s3": {"path": "cert_csirt", "modules": [2], "deliverables": ["cert_s3"]},
  "cert_csirt_s4": {"path": "cert_csirt", "modules": [3], "deliverables": ["cert_s4"]},
  "cert_csirt_s5": {"path": "cert_csirt", "modules": [4], "deliverables": ["cert_s5"]},
  "cert_csirt_s6": {"path": "cert_csirt", "modules": [5], "deliverables": ["cert_s6"]},
  "cert_csirt_s7": {"path": "cert_csirt", "modules": [6], "deliverables": ["cert_s7"]},
  "prueba_digital_b1": {"path": "prueba_digital", "modules": [0], "deliverables": ["pd_b1"]},
  "prueba_digital_b2": {"path": "prueba_digital", "modules": [1], "deliverables": ["pd_b2"]},
  "prueba_digital_b3": {"path": "prueba_digital", "modules": [2], "deliverables": ["pd_b3"]},
  "prueba_digital_b4": {"path": "prueba_digital", "modules": [3], "deliverables": ["pd_b4"]},
  "prueba_digital_b5": {"path": "prueba_digital", "modules": [4], "deliverables": ["pd_b5"]},
  "prueba_digital_b6": {"path": "prueba_digital", "modules": [5], "deliverables": ["pd_b6"]},
  "prueba_digital_b7": {"path": "prueba_digital", "modules": [6], "deliverables": []}
}'::jsonb; $$;

-- Comprobación: el Bloque 7 debe mostrar 0 entregas exigidas.
select key as badge, value -> 'modules' as bloques, jsonb_array_length(value -> 'deliverables') as entregas_exigidas
from jsonb_each(public.milestone_rules())
where key like 'prueba_digital_%'
order by key;
