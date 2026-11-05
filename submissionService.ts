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
  if (error || !data) return [];
  return (data as Row[]).map(toSubmission);
}

export async function uploadSubmission(
  pathId: string, moduleId: string, userId: string, file: File, groupLabel: string | null,
): Promise<Submission> {
  if (file.size > SUBMISSION_MAX_MB * 1024 * 1024) throw new Error(`El archivo supera los ${SUBMISSION_MAX_MB} MB.`);
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  if (!SUBMISSION_ACCEPT.split(',').includes(`.${ext}`)) throw new Error('Formato no permitido. Use PDF, Word, PowerPoint, Excel o una imagen PNG/JPG.');
  const safe = file.name.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9._-]+/g, '-').slice(-120);
  const storagePath = `${pathId}/${userId}/${moduleId}/${Date.now()}-${safe}`;
  const { error: upErr } = await supabase.storage.from(BUCKET).upload(storagePath, file, { contentType: file.type });
  if (upErr) throw new Error('No se pudo subir el archivo. Verifique el formato y su conexión e intente de nuevo.');
  const { data, error } = await supabase
    .from('activity_submissions')
    .insert({ path_id: pathId, module_id: moduleId, group_label: groupLabel, file_name: file.name.slice(0, 200), storage_path: storagePath, size_bytes: file.size })
    .select(COLUMNS)
    .single();
  if (error || !data) {
    await supabase.storage.from(BUCKET).remove([storagePath]);
    throw new Error(error?.message.includes('TOO_MANY_FILES')
      ? `Ya subió ${SUBMISSION_MAX_FILES} archivos en esta actividad. Elimine uno para subir otro.`
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
