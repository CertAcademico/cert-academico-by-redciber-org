import { supabase } from './supabaseClient';
import type { CourseProgress, ModuleScore, UserProgressMap } from './types';

export interface UserStats {
  totalXP: number;
  coursesCompleted: number;
  totalModulesCompleted: number;
}

export interface StudentSummary {
  id: string;
  name: string;
  email: string;
  progress: UserProgressMap;
  stats: UserStats;
}

type Row = {
  user_id: string;
  path_id: string;
  completed_modules: number[];
  scores: Record<string, ModuleScore>;
  started_at: string;
  last_accessed_at: string;
  completed_at: string | null;
};

function rowToProgress(row: Row): CourseProgress {
  return {
    pathId: row.path_id,
    completedModules: row.completed_modules,
    scores: row.scores ?? {},
    startedAt: row.started_at,
    lastAccessedAt: row.last_accessed_at,
    completedAt: row.completed_at ?? undefined,
  };
}

function statsFromProgress(progress: UserProgressMap): UserStats {
  let totalXP = 0;
  let coursesCompleted = 0;
  let totalModulesCompleted = 0;
  for (const course of Object.values(progress)) {
    totalModulesCompleted += course.completedModules.length;
    totalXP += course.completedModules.length * 10;
    if (course.completedAt) { coursesCompleted++; totalXP += 50; }
    for (const s of Object.values(course.scores)) totalXP += s.score;
  }
  return { totalXP, coursesCompleted, totalModulesCompleted };
}

async function ensureRow(userId: string, pathId: string): Promise<Row> {
  const { data: existing } = await supabase
    .from('course_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('path_id', pathId)
    .maybeSingle();
  if (existing) return existing as Row;

  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('course_progress')
    .insert({ user_id: userId, path_id: pathId, started_at: now, last_accessed_at: now })
    .select('*')
    .single();
  if (error || !data) throw new Error('No se pudo iniciar el progreso de la ruta.');
  return data as Row;
}

export async function getUserProgress(userId: string): Promise<UserProgressMap> {
  const { data, error } = await supabase.from('course_progress').select('*').eq('user_id', userId);
  if (error || !data) return {};
  const map: UserProgressMap = {};
  for (const row of data as Row[]) map[row.path_id] = rowToProgress(row);
  return map;
}

export async function getCourseProgress(userId: string, pathId: string): Promise<CourseProgress | null> {
  const progress = await getUserProgress(userId);
  return progress[pathId] ?? null;
}

export async function touchCourse(userId: string, pathId: string): Promise<void> {
  const row = await ensureRow(userId, pathId);
  await supabase
    .from('course_progress')
    .update({ last_accessed_at: new Date().toISOString() })
    .eq('user_id', userId)
    .eq('path_id', pathId);
  void row;
}

export async function markModuleComplete(
  userId: string,
  pathId: string,
  moduleIndex: number,
  totalModules: number,
): Promise<void> {
  const row = await ensureRow(userId, pathId);
  const completedModules = new Set(row.completed_modules);
  completedModules.add(moduleIndex);
  const nowDone = completedModules.size >= totalModules;
  await supabase
    .from('course_progress')
    .update({
      completed_modules: [...completedModules],
      last_accessed_at: new Date().toISOString(),
      completed_at: row.completed_at ?? (nowDone ? new Date().toISOString() : null),
    })
    .eq('user_id', userId)
    .eq('path_id', pathId);
}

export async function saveModuleScore(
  userId: string,
  pathId: string,
  moduleId: string,
  score: number,
  maxScore: number,
): Promise<void> {
  const row = await ensureRow(userId, pathId);
  const scores = { ...row.scores, [moduleId]: { moduleId, score, maxScore, completedAt: new Date().toISOString() } };
  await supabase
    .from('course_progress')
    .update({ scores, last_accessed_at: new Date().toISOString() })
    .eq('user_id', userId)
    .eq('path_id', pathId);
}

export async function resetCourseProgress(userId: string, pathId: string): Promise<void> {
  await supabase.from('course_progress').delete().eq('user_id', userId).eq('path_id', pathId);
}

// 10 XP por módulo completado + 50 XP de bonus por curso completo + puntajes H5P
export async function getUserStats(userId: string): Promise<UserStats> {
  return statsFromProgress(await getUserProgress(userId));
}

// Solo devuelve datos si el usuario que llama tiene rol 'teacher' (lo garantiza la RLS policy is_teacher()).
export async function getAllStudentsProgress(): Promise<StudentSummary[]> {
  const [{ data: profiles, error: profilesError }, { data: rows, error: rowsError }] = await Promise.all([
    supabase.from('profiles').select('id, name, email, role').eq('role', 'student'),
    supabase.from('course_progress').select('*'),
  ]);
  if (profilesError || rowsError || !profiles) return [];

  const byUser = new Map<string, Row[]>();
  for (const row of (rows ?? []) as Row[]) {
    const list = byUser.get(row.user_id) ?? [];
    list.push(row);
    byUser.set(row.user_id, list);
  }

  return profiles.map(p => {
    const progress: UserProgressMap = {};
    for (const row of byUser.get(p.id) ?? []) progress[row.path_id] = rowToProgress(row);
    return { id: p.id, name: p.name, email: p.email, progress, stats: statsFromProgress(progress) };
  });
}
