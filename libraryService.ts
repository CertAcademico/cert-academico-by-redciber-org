import { supabase } from './supabaseClient';

// Biblioteca de materiales por curso (tabla course_resources + bucket privado course-materials).
// La base de datos decide quién ve qué (can_access_course) y solo un admin puede escribir.

export type ResourceKind = 'video' | 'document' | 'presentation' | 'link';

export interface CourseResource {
  id: string;
  pathId: string;
  kind: ResourceKind;
  title: string;
  description: string;
  moduleId: string | null;
  tags: string[];
  source: string;
  url: string | null;
  storagePath: string | null;
  createdAt: string;
}

interface Row {
  id: string;
  path_id: string;
  kind: ResourceKind;
  title: string;
  description: string;
  module_id: string | null;
  tags: string[];
  source: string;
  url: string | null;
  storage_path: string | null;
  created_at: string;
}

const BUCKET = 'course-materials';
export const MAX_FILE_MB = 50;
export const ACCEPTED_FILES = '.pdf,.docx,.pptx,.xlsx,.png,.jpg,.jpeg';

const toResource = (r: Row): CourseResource => ({
  id: r.id,
  pathId: r.path_id,
  kind: r.kind,
  title: r.title,
  description: r.description,
  moduleId: r.module_id,
  tags: r.tags ?? [],
  source: r.source,
  url: r.url,
  storagePath: r.storage_path,
  createdAt: r.created_at,
});

/** Id de un video de YouTube a partir de su enlace (watch?v=, youtu.be/, shorts/ o embed/). */
export const youtubeId = (url: string): string | null => {
  const m = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
};

export async function listResources(pathId: string): Promise<CourseResource[]> {
  const { data, error } = await supabase
    .from('course_resources')
    .select('*')
    .eq('path_id', pathId)
    .order('created_at', { ascending: true });
  if (error || !data) return [];
  return (data as Row[]).map(toResource);
}

/** Enlace firmado de 10 minutos para abrir un archivo privado (la base valida el acceso). */
export async function fileUrl(storagePath: string): Promise<string> {
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(storagePath, 600);
  if (error || !data) throw new Error('No se pudo abrir el archivo. Verifique que tiene acceso a este curso.');
  return data.signedUrl;
}

export interface NewResource {
  pathId: string;
  kind: ResourceKind;
  title: string;
  description: string;
  moduleId: string | null;
  tags: string[];
  source: string;
  url: string | null;
  file: File | null;
}

/** Solo admin. Sube el archivo (si hay) y crea el registro. */
export async function createResource(input: NewResource, userId: string): Promise<CourseResource> {
  let storagePath: string | null = null;
  if (input.file) {
    if (input.file.size > MAX_FILE_MB * 1024 * 1024) throw new Error(`El archivo supera los ${MAX_FILE_MB} MB.`);
    const safe = input.file.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z0-9._-]+/g, '-');
    storagePath = `${input.pathId}/${Date.now()}-${safe}`;
    const { error: upErr } = await supabase.storage.from(BUCKET).upload(storagePath, input.file, { contentType: input.file.type });
    if (upErr) throw new Error(`No se pudo subir el archivo: ${upErr.message}`);
  }
  const { data, error } = await supabase
    .from('course_resources')
    .insert({
      path_id: input.pathId,
      kind: input.kind,
      title: input.title.trim(),
      description: input.description.trim(),
      module_id: input.moduleId,
      tags: input.tags,
      source: input.source.trim(),
      url: input.url?.trim() || null,
      storage_path: storagePath,
      created_by: userId,
    })
    .select('*')
    .single();
  if (error || !data) {
    if (storagePath) await supabase.storage.from(BUCKET).remove([storagePath]);
    throw new Error(`No se pudo guardar el recurso: ${error?.message ?? 'error desconocido'}`);
  }
  return toResource(data as Row);
}

/** Solo admin. Borra el registro y, si tiene, su archivo. */
export async function deleteResource(r: CourseResource): Promise<void> {
  const { error } = await supabase.from('course_resources').delete().eq('id', r.id);
  if (error) throw new Error(`No se pudo eliminar: ${error.message}`);
  if (r.storagePath) await supabase.storage.from(BUCKET).remove([r.storagePath]);
}
