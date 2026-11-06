// Badges de alcance y estrellas por sesión.
// Deben coincidir con milestone_rules(), deliverable_xp() y star_xp() en
// supabase/migrations/2026-11-08_curso_prueba_digital.sql.

export interface Milestone {
  pathId: string;
  title: string;
  /** Texto corto de la cinta del badge. */
  ribbon: string;
  /** Colores del badge [claro, oscuro]. */
  colors: [string, string];
  /** Módulos (ids) que debe completar el estudiante; su grupo debe entregar en todos. */
  modules: string[];
}

const session = (n: number, name: string, colors: [string, string]): Milestone => ({
  pathId: 'cert_csirt',
  title: `CERTs y CSIRTs — Sesión ${n}: ${name}`,
  ribbon: `SESIÓN ${n} SUPERADA`,
  colors,
  modules: [`cert_s${n}`],
});

// Prueba Digital para Abogados: un badge por cada bloque con entrega (1 a 7).
const block = (n: number, name: string, colors: [string, string]): Milestone => ({
  pathId: 'prueba_digital',
  title: `Prueba Digital — Bloque ${n}: ${name}`,
  ribbon: `BLOQUE ${n} SUPERADO`,
  colors,
  modules: [`pd_b${n}`],
});

export const MILESTONES: Record<string, Milestone> = {
  cert_csirt_s1: session(1, 'Ecosistema global de CSIRTs', ['#0ea5e9', '#0c4a6e']),
  cert_csirt_s2: session(2, 'Mandato y RFC 2350', ['#6366f1', '#312e81']),
  cert_csirt_s3: session(3, 'Portafolio de servicios FIRST', ['#8b5cf6', '#4c1d95']),
  cert_csirt_s4: session(4, 'Madurez SIM3 y ENISA', ['#f59e0b', '#78350f']),
  cert_csirt_s5: session(5, 'Respuesta a incidentes NIST', ['#ef4444', '#7f1d1d']),
  cert_csirt_s6: session(6, 'Cooperación y TLP', ['#22c55e', '#14532d']),
  cert_csirt_s7: session(7, 'Anteproyecto de un CSIRT', ['#ec4899', '#831843']),
  cert_csirt_fase1: {
    pathId: 'cert_csirt',
    title: 'CERTs y CSIRTs — Fase 1: Sesiones 1 a 3',
    ribbon: 'FASE 1 · SESIONES 1–3',
    colors: ['#14b8a6', '#0f766e'],
    modules: ['cert_s1', 'cert_s2', 'cert_s3'],
  },
  prueba_digital_b1: block(1, 'El caso y la evidencia', ['#0ea5e9', '#0c4a6e']),
  prueba_digital_b2: block(2, 'ABC técnico de la evidencia', ['#6366f1', '#312e81']),
  prueba_digital_b3: block(3, 'Marco internacional', ['#8b5cf6', '#4c1d95']),
  prueba_digital_b4: block(4, 'Marco colombiano', ['#eab308', '#713f12']),
  prueba_digital_b5: block(5, 'Cadena de custodia', ['#ef4444', '#7f1d1d']),
  prueba_digital_b6: block(6, 'Admisibilidad y valoración', ['#22c55e', '#14532d']),
  prueba_digital_b7: block(7, 'Audiencia simulada', ['#ec4899', '#831843']),
};

/** Badges que dependen de este módulo (el de la sesión y, si aplica, el de la fase). */
export const milestonesForModule = (pathId: string, moduleId: string): [string, Milestone][] =>
  Object.entries(MILESTONES).filter(([, m]) => m.pathId === pathId && m.modules.includes(moduleId));

/** Cursos con entregas en grupo y estrellas por sesión. */
export const STAR_COURSES = ['cert_csirt', 'prueba_digital'];

/** XP que recibe cada integrante del grupo por cada entrega (igual a deliverable_xp()). */
export const DELIVERABLE_XP = 30;
/** XP extra para cada integrante cuando el docente destaca la entrega (igual a star_xp()). */
export const STAR_XP = 20;
