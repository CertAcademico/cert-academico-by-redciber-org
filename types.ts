export type ContentBlockType = 'text' | 'video' | 'quiz' | 'interactive' | 'flashcards' | 'memory' | 'h5p_check' | 'activity';

export interface TextContent {
  type: 'text';
  icon?: string; // Icon name as a string
  text: string;
}

export interface VideoContent {
  type: 'video';
  title: string;
  videoId: string; // YouTube video ID
}

export interface QuizContent {
  type: 'quiz';
  quizData: QuizData;
}

export interface InteractiveItem {
  term: string;
  definition: string;
}

export interface InteractiveContent {
  type: 'interactive';
  title: string;
  items: InteractiveItem[];
}

export interface FlashcardItem {
  front: string;
  back: string;
}

export interface FlashcardsContent {
  type: 'flashcards';
  title: string;
  cards: FlashcardItem[];
}

export interface MemoryPair {
  term: string;
  definition: string;
}

export interface MemoryContent {
  type: 'memory';
  title: string;
  pairs: MemoryPair[];
}

export interface H5POption {
  id: string;
  text: string;
  isCorrect: boolean;
  score: number;
}

export interface H5PQuestion {
  question: string;
  options: H5POption[];
  feedback: string;
}

export interface H5PCheckContent {
  type: 'h5p_check';
  title: string;
  description: string;
  questions: H5PQuestion[];
}

export interface ActivityStep {
  title: string;
  minutes: string;
  detail: string;
}

export interface ActivityDownload {
  label: string;
  href: string; // Ruta pública, p. ej. /materiales/...
  note?: string;
}

/** Actividad grupal presencial: pasos, grupos asignados y materiales descargables. */
export interface ActivityContent {
  type: 'activity';
  title: string;
  duration: string;
  groupSize: string;
  goal: string;
  downloads: ActivityDownload[];
  steps: ActivityStep[];
  groupsTitle?: string;
  groups?: { name: string; items: string[] }[];
  closing?: string;
}

export type ContentBlock = 
  | TextContent 
  | VideoContent 
  | QuizContent 
  | InteractiveContent 
  | FlashcardsContent 
  | MemoryContent 
  | H5PCheckContent
  | ActivityContent;

export interface Module {
  id: string;
  title:string;
  content: ContentBlock[];
  /** Sesión aún no habilitada por el docente (solo admin puede abrirla). */
  locked?: boolean;
}

export interface QuizData {
  question: string;
  options: string[];
  correctOptionIndex: number;
  feedback: {
    correct: string;
    incorrect: string;
  };
}

export interface LearningPath {
  title: string;
  description: string;
  lastUpdated: string;
  modules: Module[];
}

export type LearningPaths = Record<string, LearningPath>;

// --- Auth & Progress ---

export type UserRole = 'student' | 'teacher' | 'tutor' | 'admin' | 'cert_student';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface ModuleScore {
  moduleId: string;
  score: number;
  maxScore: number;
  completedAt: string;
}

export interface CourseProgress {
  pathId: string;
  completedModules: number[];
  scores: Record<string, ModuleScore>;
  startedAt: string;
  lastAccessedAt: string;
  completedAt?: string;
}

export type UserProgressMap = Record<string, CourseProgress>;