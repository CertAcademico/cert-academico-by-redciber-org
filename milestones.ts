// Badges de alcance: se obtienen al completar un tramo de un curso y entregar en grupo.
// Deben coincidir con milestone_rules() en supabase/migrations/2026-11-05_entregables_actividades.sql.

export interface Milestone {
  pathId: string;
  title: string;
  /** Texto corto de la cinta del badge. */
  ribbon: string;
  /** Módulos (ids) que debe completar el estudiante; su grupo debe entregar en todos. */
  modules: string[];
}

export const MILESTONES: Record<string, Milestone> = {
  cert_csirt_fase1: {
    pathId: 'cert_csirt',
    title: 'CERTs y CSIRTs — Fase 1: Sesiones 1 a 3',
    ribbon: 'FASE 1 · SESIONES 1–3',
    modules: ['cert_s1', 'cert_s2', 'cert_s3'],
  },
};

/** Badge de alcance que incluye este módulo, si lo hay. */
export const milestoneForModule = (pathId: string, moduleId: string): [string, Milestone] | null =>
  (Object.entries(MILESTONES).find(([, m]) => m.pathId === pathId && m.modules.includes(moduleId)) as [string, Milestone] | undefined) ?? null;

/** XP que recibe cada integrante del grupo por cada entrega (igual a deliverable_xp()). */
export const DELIVERABLE_XP = 30;
