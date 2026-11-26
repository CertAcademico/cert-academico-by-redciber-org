import { supabase } from './supabaseClient';

// Publicación de badges para avanzar de nivel (migración 2026-11-26): en LinkedIn o en el Muro de logros.

export type PublicationChannel = 'linkedin' | 'muro';

export interface MyPublication { pathId: string; channel: PublicationChannel; createdAt: string; revoked: boolean }

export interface WallEntry { authorName: string; pathId: string; message: string; certCode: string; createdAt: string }

export async function getMyPublications(userId: string): Promise<Record<string, MyPublication>> {
  const { data, error } = await supabase
    .from('badge_publications')
    .select('path_id, channel, created_at, revoked_at')
    .eq('user_id', userId);
  if (error || !data) return {};
  return Object.fromEntries(
    (data as { path_id: string; channel: PublicationChannel; created_at: string; revoked_at: string | null }[]).map(r => [
      r.path_id,
      { pathId: r.path_id, channel: r.channel, createdAt: r.created_at, revoked: !!r.revoked_at },
    ]),
  );
}

export async function publishBadge(pathId: string, channel: PublicationChannel, url?: string, message?: string): Promise<string> {
  const { data, error } = await supabase.rpc('publish_badge', {
    p_path: pathId,
    p_channel: channel,
    p_url: url?.trim() || null,
    p_message: message?.trim() || null,
  });
  if (error) {
    const m = error.message || '';
    if (m.includes('BADGE_NOT_EARNED')) throw new Error('Primero pide tu badge en «Mis logros»: sin badge no hay qué publicar.');
    if (m.includes('INVALID_LINKEDIN_URL')) throw new Error('Pega el enlace de tu publicación de LinkedIn (empieza por https://www.linkedin.com/…).');
    if (m.includes('MESSAGE_TOO_SHORT')) throw new Error('Escribe un mensaje de al menos 20 caracteres: cuéntale a la comunidad qué aprendiste.');
    if (m.includes('function') || m.includes('relation')) throw new Error('La publicación aún no está habilitada en el servidor. Avísale al administrador.');
    throw new Error('No se pudo publicar. Intenta de nuevo en un momento.');
  }
  return data as string;
}

export async function getAchievementWall(limit = 24): Promise<WallEntry[]> {
  const { data, error } = await supabase.rpc('achievement_wall', { p_limit: limit });
  if (error || !data) return [];
  return (data as { author_name: string; path_id: string; message: string; cert_code: string; created_at: string }[]).map(r => ({
    authorName: r.author_name, pathId: r.path_id, message: r.message, certCode: r.cert_code, createdAt: r.created_at,
  }));
}
