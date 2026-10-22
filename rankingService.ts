import { supabase } from './supabaseClient';

/** Corte del ranking (hora de Colombia). Debe coincidir con campaign_cutoff() en la migración 2026-10-24. */
export const CAMPAIGN_CUTOFF = '2026-10-31T23:59:59-05:00';
export const CAMPAIGN_TOP = 50;
export const CAMPAIGN_PRIZE = 'curso de creación de agentes defensivos y ofensivos en ciberseguridad';

export interface MyRank {
  position: number;
  total: number;
  badges: number;
  score: number;
}

export interface RankingRow {
  userId: string;
  name: string;
  email: string;
  badges: number;
  score: number;
  lastBadgeAt: string | null;
  startedAt: string | null;
  position: number;
}

export async function getMyCampaignRank(): Promise<MyRank | null> {
  const { data, error } = await supabase.rpc('my_campaign_rank');
  const row = (data as { rank_position: number; total: number; badges: number; score: number }[] | null)?.[0];
  if (error || !row) return null;
  return { position: Number(row.rank_position), total: Number(row.total), badges: row.badges, score: Number(row.score) };
}

/** Solo admin (la función valida el rol en el servidor). */
export async function getCampaignRanking(): Promise<RankingRow[]> {
  const { data, error } = await supabase.rpc('campaign_ranking');
  if (error || !data) return [];
  return (data as Record<string, unknown>[]).map(r => ({
    userId: r.user_id as string,
    name: r.name as string,
    email: r.email as string,
    badges: Number(r.badges),
    score: Number(r.score),
    lastBadgeAt: (r.last_badge_at as string) ?? null,
    startedAt: (r.started_at as string) ?? null,
    position: Number(r.rank_position),
  }));
}
