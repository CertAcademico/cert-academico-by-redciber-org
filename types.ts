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

/** Laboratorio de escenario: una historia con decisiones ramificadas y puntaje. */
export interface ScenarioChoice {
  text: string;
  next: string; // id del siguiente paso
  points?: number;
  feedback?: string;
}

export interface ScenarioStep {
  text: string;
  evidence?: string; // texto en monoespaciado: logs, correos, registros…
  choices?: ScenarioChoice[]; // sin choices = final
}

export interface ScenarioContent {
  type: 'scenario';
  title: string;
  intro: string;
  start: string;
  steps: Record<string, ScenarioStep>;
  passPoints: number;
  maxPoints: number;
}

/** Reto tipo CTF: analizar evidencias y responder con la "bandera" exacta. */
export interface ChallengeQuestion {
  prompt: string;
  answers: string[]; // respuestas aceptadas (se comparan sin mayúsculas, tildes ni espacios extra)
  hint?: string;
  explanation: string;
}

export interface ChallengeContent {
  type: 'challenge';
  title: string;
  brief: string;
  artifacts: { name: string; content: string }[];
  questions: ChallengeQuestion[];
}

/** Examen con banco de preguntas: cada intento toma una muestra aleatoria y exige nota mínima. */
export interface ExamContent {
  type: 'exam';
  title: string;
  description: string;
  passPercent: number;
  questionsPerAttempt: number;
  questions: H5PQuestion[];
}

export type ContentBlock = 
  | TextContent 
  | VideoContent 
  | QuizContent 
  | InteractiveContent 
  | FlashcardsContent 
  | MemoryContent 
  | H5PCheckContent
  | ActivityContent
  | ScenarioContent
  | ChallengeContent
  | ExamContent;

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

export type UserRole = 'student' | 'teacher' | 'tutor' | 'admin' | 'cert_student' | 'auditor' | 'cti_student' | 'free_student';

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