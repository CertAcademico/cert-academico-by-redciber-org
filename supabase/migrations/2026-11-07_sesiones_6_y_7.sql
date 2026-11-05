-- ═════════════════════════════════════════════════════════════
-- Migración 2026-11-07 — Sesiones 6 y 7 de CERTs y CSIRTs
-- Las sesiones 6 (intercambio con TLP) y 7 (anteproyecto del CSIRT) tienen entregable:
-- dan estrellas, XP al grupo y su badge de sesión, igual que las sesiones 1 a 5.
-- Correr completa en Supabase → SQL Editor, DESPUÉS de 2026-11-06. Es idempotente.
-- ─────────────────────────────────────────────────────────────

create or replace function public.deliverable_modules()
returns jsonb language sql immutable
as $$ select '{"cert_csirt": ["cert_s1", "cert_s2", "cert_s3", "cert_s4", "cert_s5", "cert_s6", "cert_s7"]}'::jsonb; $$;

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
  "cert_csirt_s7": {"path": "cert_csirt", "modules": [6], "deliverables": ["cert_s7"]}
}'::jsonb; $$;
