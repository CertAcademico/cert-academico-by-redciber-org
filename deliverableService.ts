import { supabase } from './supabaseClient';

// Entregables escritos de los niveles del mapa (tabla level_deliverables, migración 2026-11-25).
// Cada estudiante guarda uno por entregable; lo puede corregir hasta que el curso le emita el badge.

export interface MyDeliverable {
  deliverableId: string;
  answers: Record<string, string>;
  submittedAt: string;
}

export async function getMyDeliverables(pathId: string): Promise<Record<string, MyDeliverable>> {
  const { data, error } = await supabase
    .from('level_deliverables')
    .select('deliverable_id, answers, submitted_at')
    .eq('path_id', pathId);
  if (error || !data) return {};
  return Object.fromEntries(
    (data as { deliverable_id: string; answers: Record<string, string>; submitted_at: string }[]).map(r => [
      r.deliverable_id,
      { deliverableId: r.deliverable_id, answers: r.answers ?? {}, submittedAt: r.submitted_at },
    ]),
  );
}

export async function submitDeliverable(
  pathId: string,
  moduleId: string,
  deliverableId: string,
  answers: Record<string, string>,
): Promise<string> {
  const { data, error } = await supabase.rpc('submit_level_deliverable', {
    p_path: pathId,
    p_module: moduleId,
    p_deliverable: deliverableId,
    p_answers: answers,
  });
  if (error) {
    const m = error.message || '';
    if (m.includes('NO_ACCESS')) throw new Error('No tiene acceso a este curso.');
    if (m.includes('TOO_SHORT')) throw new Error('El entregable está muy corto: desarrolle cada campo con más detalle.');
    if (m.includes('function') || m.includes('relation')) throw new Error('Los entregables aún no están habilitados en el servidor. Avísele al administrador.');
    throw new Error('No se pudo guardar el entregable. Intente de nuevo.');
  }
  return data as string;
}
