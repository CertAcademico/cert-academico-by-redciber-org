// Badges de alcance y estrellas por sesión.
// Deben coincidir con milestone_rules(), deliverable_xp() y star_xp() en
// supabase/migrations/2026-11-06_estrellas_y_badges_por_sesion.sql.

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

export const MILESTONES: Record<string, Milestone> = {
  cert_csirt_s1: session(1, 'Ecosistema global de CSIRTs', ['#0ea5e9', '#0c4a6e']),
  cert_csirt_s2: session(2, 'Mandato y RFC 2350', ['#6366f1', '#312e81']),
  cert_csirt_s3: session(3, 'Portafolio de servicios FIRST', ['#8b5cf6', '#4c1d95']),
  cert_csirt_s4: session(4, 'Madurez SIM3 y ENISA', ['#f59e0b', '#78350f']),
  cert_csirt_s5: session(5, 'Respuesta a incidentes NIST', ['#ef4444', '#7f1d1d']),
  cert_csirt_fase1: {
    pathId: 'cert_csirt',
    title: 'CERTs y CSIRTs — Fase 1: Sesiones 1 a 3',
    ribbon: 'FASE 1 · SESIONES 1–3',
    colors: ['#14b8a6', '#0f766e'],
    modules: ['cert_s1', 'cert_s2', 'cert_s3'],
  },
};

/** Badges que dependen de este módulo (el de la sesión y, si aplica, el de la fase). */
export const milestonesForModule = (pathId: string, moduleId: string): [string, Milestone][] =>
  Object.entries(MILESTONES).filter(([, m]) => m.pathId === pathId && m.modules.includes(moduleId));

/** Cursos con entregas en grupo y estrellas por sesión. */
export const STAR_COURSES = ['cert_csirt'];

/** XP que recibe cada integrante del grupo por cada entrega (igual a deliverable_xp()). */
export const DELIVERABLE_XP = 30;
/** XP extra para cada integrante cuando el docente destaca la entrega (igual a star_xp()). */
export const STAR_XP = 20;
