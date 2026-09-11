import type { CourseProgress, UserProgressMap } from './types';

const PROGRESS_KEY = 'rc_progress';

export interface UserStats {
  totalXP: number;
  coursesCompleted: number;
  totalModulesCompleted: number;
}

type Store = Record<string, UserProgressMap>;

function load(): Store {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'); }
  catch { return {}; }
}

function persist(store: Store): void {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(store));
}

function ensure(store: Store, userId: string, pathId: string): void {
  if (!store[userId]) store[userId] = {};
  if (!store[userId][pathId]) {
    store[userId][pathId] = {
      pathId,
      completedModules: [],
      scores: {},
      startedAt: new Date().toISOString(),
      lastAccessedAt: new Date().toISOString(),
    };
  }
}

export function getUserProgress(userId: string): UserProgressMap {
  return load()[userId] || {};
}

export function getCourseProgress(userId: string, pathId: string): CourseProgress | null {
  return getUserProgress(userId)[pathId] || null;
}

export function touchCourse(userId: string, pathId: string): void {
  const store = load();
  ensure(store, userId, pathId);
  store[userId][pathId].lastAccessedAt = new Date().toISOString();
  persist(store);
}

export function markModuleComplete(
  userId: string,
  pathId: string,
  moduleIndex: number,
  totalModules: number,
): void {
  const store = load();
  ensure(store, userId, pathId);
  const c = store[userId][pathId];
  c.lastAccessedAt = new Date().toISOString();
  if (!c.completedModules.includes(moduleIndex)) {
    c.completedModules.push(moduleIndex);
  }
  if (!c.completedAt && c.completedModules.length >= totalModules) {
    c.completedAt = new Date().toISOString();
  }
  persist(store);
}

export function saveModuleScore(
  userId: string,
  pathId: string,
  moduleId: string,
  score: number,
  maxScore: number,
): void {
  const store = load();
  ensure(store, userId, pathId);
  store[userId][pathId].scores[moduleId] = {
    moduleId,
    score,
    maxScore,
    completedAt: new Date().toISOString(),
  };
  store[userId][pathId].lastAccessedAt = new Date().toISOString();
  persist(store);
}

export function resetCourseProgress(userId: string, pathId: string): void {
  const store = load();
  if (store[userId]?.[pathId]) {
    delete store[userId][pathId];
  }
  persist(store);
}

// 10 XP per completed module + 50 XP course-completion bonus + H5P scores
export function getUserStats(userId: string): UserStats {
  const progress = getUserProgress(userId);
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
