// Mapa de expertise: cada ruta tiene tres niveles. El Básico es el curso que ya existía (su
// progreso y su badge no cambian); Intermedio y Avanzado son cursos nuevos que se desbloquean
// al terminar el nivel anterior. `null` = nivel aún no publicado ("Próximamente").
// Si se publica un nivel nuevo, agregarlo también a course_module_counts(), course_requirements()
// y course_prerequisite() en supabase/migrations/2026-10-23_niveles_expertise.sql.

export const LEVEL_NAMES = ['Básico', 'Intermedio', 'Avanzado'] as const;

export interface ExpertiseTrack {
  id: string;
  /** El título que se obtiene al completar los tres niveles. */
  title: string;
  /** Ids de curso por nivel: [Básico, Intermedio, Avanzado]. */
  levels: [string, string | null, string | null];
}

export const EXPERTISE_TRACKS: ExpertiseTrack[] = [
  { id: 'analista_ciberseguridad', title: 'Analista de Ciberseguridad', levels: ['cybersecurity', 'cybersecurity_intermedio', 'cybersecurity_avanzado'] },
  { id: 'investigador_cibercriminal', title: 'Investigador Cibercriminal', levels: ['cybercrime', 'cybercrime_intermedio', 'cybercrime_avanzado'] },
  { id: 'analista_cibercriminologia', title: 'Analista en Cibercriminología', levels: ['cybercriminology', 'cybercriminology_intermedio', 'cybercriminology_avanzado'] },
  { id: 'especialista_poscuantica', title: 'Especialista en Criptografía Poscuántica', levels: ['quantum_computing', null, null] },
  { id: 'perito_forense', title: 'Perito Forense Digital', levels: ['forensic_auditing', 'forensic_intermedio', 'forensic_avanzado'] },
  { id: 'especialista_ia', title: 'Especialista en IA Aplicada', levels: ['artificial_intelligence', null, null] },
  { id: 'gestor_csirt', title: 'Gestor de Respuesta a Incidentes', levels: ['cert_csirt', 'csirt_intermedio', 'csirt_avanzado'] },
];

/** Cursos de nivel Intermedio o Avanzado: no aparecen en el grid, solo en el mapa. */
export const LEVEL_PATHS: Record<string, { track: ExpertiseTrack; level: 1 | 2; prerequisite: string }> = {};
for (const track of EXPERTISE_TRACKS) {
  track.levels.forEach((pathId, i) => {
    if (i === 0 || !pathId) return;
    LEVEL_PATHS[pathId] = { track, level: i as 1 | 2, prerequisite: track.levels[i - 1]! };
  });
}
