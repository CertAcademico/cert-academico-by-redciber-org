-- ═════════════════════════════════════════════════════════════
-- Migración 2026-10-25 — Mapa de expertise: ruta Analista de Ciberseguridad
-- (cybersecurity_intermedio / cybersecurity_avanzado). Reemplaza las listas de niveles con la
-- lista completa. Correr completa en Supabase → SQL Editor. Es idempotente.
-- ─────────────────────────────────────────────────────────────
create or replace function public.course_module_counts()
returns jsonb
language sql
immutable
as $$
  select '{
    "cybersecurity": 10, "cybercrime": 10, "cybercriminology": 5, "quantum_computing": 6,
    "forensic_auditing": 6, "artificial_intelligence": 9, "ia_ofensiva_insider": 6, "cert_csirt": 8,
    "auditoria_ciberriesgo": 11, "cti_basico": 11,
    "cybercrime_intermedio": 7, "cybercrime_avanzado": 8,
    "forensic_intermedio": 7, "forensic_avanzado": 8,
    "csirt_intermedio": 7, "csirt_avanzado": 8,
    "cybersecurity_intermedio": 7, "cybersecurity_avanzado": 8
  }'::jsonb;
$$;

create or replace function public.course_requirements()
returns jsonb
language sql
immutable
as $$
  select '{
    "cybercrime_intermedio":    { "exam_module": "cci_exam", "min_ratio": 0.7 },
    "cybercrime_avanzado":      { "exam_module": "cca_exam", "min_ratio": 0.8 },
    "forensic_intermedio":      { "exam_module": "fdi_exam", "min_ratio": 0.7 },
    "forensic_avanzado":        { "exam_module": "fda_exam", "min_ratio": 0.8 },
    "csirt_intermedio":         { "exam_module": "gri_exam", "min_ratio": 0.7 },
    "csirt_avanzado":           { "exam_module": "gra_exam", "min_ratio": 0.8 },
    "cybersecurity_intermedio": { "exam_module": "aci_exam", "min_ratio": 0.7 },
    "cybersecurity_avanzado":   { "exam_module": "aca_exam", "min_ratio": 0.8 }
  }'::jsonb;
$$;

create or replace function public.course_prerequisite()
returns jsonb
language sql
immutable
as $$
  select '{
    "cybercrime_intermedio": "cybercrime",
    "cybercrime_avanzado": "cybercrime_intermedio",
    "forensic_intermedio": "forensic_auditing",
    "forensic_avanzado": "forensic_intermedio",
    "csirt_intermedio": "cert_csirt",
    "csirt_avanzado": "csirt_intermedio",
    "cybersecurity_intermedio": "cybersecurity",
    "cybersecurity_avanzado": "cybersecurity_intermedio"
  }'::jsonb;
$$;
