import { supabase } from './supabaseClient';

// Muro del curso (tabla course_wall_posts). La base de datos asigna el autor y su nombre,
// y solo deja leer/publicar a quien tiene acceso al curso.

/** Cursos con muro activado. Para habilitarlo en otro curso, agregar su id. */
export const WALL_COURSES = ['cti_basico'];

export const WALL_MAX_CHARS = 1200;

export interface WallPost {
  id: string;
  userId: string;
  authorName: string;
  body: string;
  createdAt: string;
  updatedAt: string | null;
}

interface Row {
  id: string;
  user_id: string;
  author_name: string;
  body: string;
  created_at: string;
  updated_at: string | null;
}

const toPost = (r: Row): WallPost => ({
  id: r.id,
  userId: r.user_id,
  authorName: r.author_name,
  body: r.body,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

export async function listPosts(pathId: string): Promise<WallPost[]> {
  const { data, error } = await supabase
    .from('course_wall_posts')
    .select('id, user_id, author_name, body, created_at, updated_at')
    .eq('path_id', pathId)
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return (data as Row[]).map(toPost);
}

export async function createPost(pathId: string, body: string): Promise<WallPost> {
  const { data, error } = await supabase
    .from('course_wall_posts')
    .insert({ path_id: pathId, body: body.trim() })
    .select('id, user_id, author_name, body, created_at, updated_at')
    .single();
  if (error || !data) throw new Error('No se pudo publicar. Intente de nuevo.');
  return toPost(data as Row);
}

export async function updatePost(id: string, body: string): Promise<WallPost> {
  const { data, error } = await supabase
    .from('course_wall_posts')
    .update({ body: body.trim() })
    .eq('id', id)
    .select('id, user_id, author_name, body, created_at, updated_at')
    .single();
  if (error || !data) throw new Error('No se pudo guardar el cambio.');
  return toPost(data as Row);
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await supabase.from('course_wall_posts').delete().eq('id', id);
  if (error) throw new Error('No se pudo eliminar la publicación.');
}
