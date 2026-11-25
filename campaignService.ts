import { supabase } from './supabaseClient';

// Reto Pionero (tabla campaign_challenge_entries, migración 2026-11-25): cada estudiante reporta
// una vez el enlace de la publicación de su badge. El administrador revisa el orden y otorga el badge.

export interface ChallengeEntry { postUrl: string; createdAt: string }

export async function getMyChallengeEntry(userId: string): Promise<ChallengeEntry | null> {
  const { data, error } = await supabase
    .from('campaign_challenge_entries')
    .select('post_url, created_at')
    .eq('user_id', userId)
    .maybeSingle();
  if (error || !data) return null;
  return { postUrl: data.post_url as string, createdAt: data.created_at as string };
}

export async function reportChallenge(userId: string, url: string): Promise<ChallengeEntry> {
  const clean = url.trim();
  if (!/^https:\/\/\S+$/i.test(clean) || clean.length > 500) {
    throw new Error('Pega el enlace completo de tu publicación (empieza por https://).');
  }
  const { data, error } = await supabase
    .from('campaign_challenge_entries')
    .insert({ user_id: userId, post_url: clean })
    .select('post_url, created_at')
    .single();
  if (error) {
    if ((error.code ?? '') === '23505') throw new Error('Ya reportaste tu publicación. ¡Suerte!');
    throw new Error('No se pudo guardar el enlace. Intenta de nuevo en un momento.');
  }
  return { postUrl: data.post_url as string, createdAt: data.created_at as string };
}
