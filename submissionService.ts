import { supabase } from './supabaseClient';

// Entregables de las actividades grupales (tabla activity_submissions + bucket privado
// activity-submissions). La base de datos pone el autor y decide quién ve qué: cada estudiante
// ve lo suyo; docentes, tutores y administradores ven todo.

export interface Submission {
  id: string;
  userId: string;
  authorName: string;
  groupLabel: string | null;
  fileName: string;
  storagePath: string;
  sizeBytes: number;
  createdAt: string;
}

interface Row {
  id: string;
  user_id: string;
  author_name: string;
  group_label: string | null;
  file_name: string;
  storage_path: string;
  size_bytes: number;
  created_at: string;
}

const BUCKET = 'activity-submissions';
export const SUBMISSION_MAX_MB = 20;
export const SUBMISSION_MAX_FILES = 5;
export const SUBMISSION_ACCEPT = '.pdf,.docx,.pptx,.xlsx,.png,.jpg,.jpeg';
export const GROUP_LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];

/** El servidor aún no tiene la migración de entregables (tabla o función inexistente). */
export class NotEnabledError extends Error {
  constructor() { super('La entrega de archivos aún no está activada en el servidor. Avise al docente o al administrador.'); }
}
const isNotEnabled = (e: { code?: string; message?: string } | null) =>
  !!e && (['PGRST202', 'PGRST205', '42P01', '42883'].includes(e.code ?? '') || /schema cache|does not exist/i.test(e.message ?? ''));

const COLUMNS = 'id, user_id, author_name, group_label, file_name, storage_path, size_bytes, created_at';

const toSubmission = (r: Row): Submission => ({
  id: r.id,
  userId: r.user_id,
  authorName: r.author_name,
  groupLabel: r.group_label,
  fileName: r.file_name,
  storagePath: r.storage_path,
  sizeBytes: r.size_bytes,
  createdAt: r.created_at,
});

/** Entregables del módulo que el usuario puede ver (los suyos, o todos si es docente). */
export async function listSubmissions(pathId: string, moduleId: string): Promise<Submission[]> {
  const { data, error } = await supabase
    .from('activity_submissions')
    .select(COLUMNS)
    .eq('path_id', pathId)
    .eq('module_id', moduleId)
    .order('created_at', { ascending: false });
  if (isNotEnabled(error)) throw new NotEnabledError();
  if (error || !data) return [];
  return (data as Row[]).map(toSubmission);
}

export interface RosterEntry { groupLabel: string; memberName: string; isMe: boolean }

/** Integrantes: el estudiante ve su grupo; docentes, tutores y admins ven todos. */
export async function getRoster(pathId: string): Promise<RosterEntry[]> {
  const { data, error } = await supabase.rpc('group_roster', { p_path: pathId });
  if (error || !data) return [];
  return (data as { group_label: string; member_name: string; is_me: boolean }[])
    .map(r => ({ groupLabel: r.group_label, memberName: r.member_name, isMe: r.is_me }));
}

export async function setMyGroup(pathId: string, group: string): Promise<void> {
  const { error } = await supabase.rpc('set_my_group', { p_path: pathId, p_group: group });
  if (isNotEnabled(error)) throw new NotEnabledError();
  if (error) throw new Error(error.message.includes('NO_ACCESS')
    ? 'Su cuenta no puede entregar en este curso.'
    : 'No se pudo guardar su grupo. Intente de nuevo.');
}

/** Recalcula el XP de entregas del usuario (por si algo quedó desactualizado). */
export async function syncMyDeliverableXp(pathId: string): Promise<void> {
  await supabase.rpc('sync_my_deliverable_xp', { p_path: pathId });
}

export interface MilestoneStatus {
  group: string | null;
  modulesDone: number;
  modulesTotal: number;
  delivered: number;
  deliverablesTotal: number;
  eligible: boolean;
}

export async function getMilestoneStatus(milestoneId: string): Promise<MilestoneStatus | null> {
  const { data, error } = await supabase.rpc('milestone_status', { p_milestone: milestoneId });
  if (error || !data) return null;
  const d = data as Record<string, unknown>;
  return {
    group: (d.group as string) ?? null,
    modulesDone: Number(d.modules_done),
    modulesTotal: Number(d.modules_total),
    delivered: Number(d.delivered),
    deliverablesTotal: Number(d.deliverables_total),
    eligible: !!d.eligible,
  };
}

export interface GroupProgress { group: string | null; delivered: string[]; starred: string[] }

/** Sesiones que entregó el grupo del usuario y cuáles destacó el docente. */
export async function getGroupProgress(pathId: string): Promise<GroupProgress | null> {
  const { data, error } = await supabase.rpc('my_group_progress', { p_path: pathId });
  if (error || !data) return null;
  const d = data as { group: string | null; delivered: string[]; starred: string[] };
  return { group: d.group ?? null, delivered: d.delivered ?? [], starred: d.starred ?? [] };
}

/** Grupos destacados por el docente en una sesión (solo docentes). */
export async function listStarredGroups(pathId: string, moduleId: string): Promise<string[]> {
  const { data, error } = await supabase.from('group_stars').select('group_label').eq('path_id', pathId).eq('module_id', moduleId);
  if (error || !data) return [];
  return (data as { group_label: string }[]).map(r => r.group_label);
}

/** Docente: destaca o quita la estrella de la entrega de un grupo. Devuelve si quedó destacada. */
export async function toggleGroupStar(pathId: string, moduleId: string, group: string): Promise<boolean> {
  const { data, error } = await supabase.rpc('toggle_group_star', { p_path: pathId, p_module: moduleId, p_group: group });
  if (error) throw new Error(error.message.includes('NO_SUBMISSION')
    ? 'Ese grupo todavía no ha entregado en esta sesión.'
    : 'No se pudo guardar la estrella. Verifique que la migración de estrellas esté aplicada.');
  return !!data;
}

/** Sube un entregable. El grupo lo pone la base de datos (el grupo actual del estudiante). */
export async function uploadSubmission(
  pathId: string, moduleId: string, userId: string, file: File,
): Promise<Submission> {
  if (file.size > SUBMISSION_MAX_MB * 1024 * 1024) throw new Error(`El archivo supera los ${SUBMISSION_MAX_MB} MB.`);
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  if (!SUBMISSION_ACCEPT.split(',').includes(`.${ext}`)) throw new Error('Formato no permitido. Use PDF, Word, PowerPoint, Excel o una imagen PNG/JPG.');
  const safe = file.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z0-9._-]+/g, '-').slice(-120);
  const storagePath = `${pathId}/${userId}/${moduleId}/${Date.now()}-${safe}`;
  const { error: upErr } = await supabase.storage.from(BUCKET).upload(storagePath, file, { contentType: file.type });
  if (upErr) throw new Error('No se pudo subir el archivo. Verifique el formato y su conexión e intente de nuevo.');
  const { data, error } = await supabase
    .from('activity_submissions')
    .insert({ path_id: pathId, module_id: moduleId, file_name: file.name.slice(0, 200), storage_path: storagePath, size_bytes: file.size })
    .select(COLUMNS)
    .single();
  if (error || !data) {
    await supabase.storage.from(BUCKET).remove([storagePath]);
    const msg = error?.message ?? '';
    throw new Error(msg.includes('TOO_MANY_FILES')
      ? `Ya subió ${SUBMISSION_MAX_FILES} archivos en esta actividad. Elimine uno para subir otro.`
      : msg.includes('GROUP_REQUIRED')
        ? 'Primero elija su grupo.'
        : msg.includes('DELIVERABLE_CLOSED')
          ? 'Las entregas de este bloque ya cerraron. Hable con el docente.'
          : 'No se pudo registrar la entrega. Intente de nuevo.');
  }
  return toSubmission(data as Row);
}

/** Enlace firmado de 10 minutos para descargar un entregable. */
export async function submissionUrl(s: Submission): Promise<string> {
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(s.storagePath, 600, { download: s.fileName });
  if (error || !data) throw new Error('No se pudo abrir el archivo.');
  return data.signedUrl;
}

export async function deleteSubmission(s: Submission): Promise<void> {
  const { error } = await supabase.from('activity_submissions').delete().eq('id', s.id);
  if (error) throw new Error('No se pudo eliminar la entrega.');
  await supabase.storage.from(BUCKET).remove([s.storagePath]);
}
