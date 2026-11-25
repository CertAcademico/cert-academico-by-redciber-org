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
  /** Si existe, muestra la caja para subir el entregable de la actividad. */
  deliverable?: { label: string; hint?: string };
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

/** Enlace a un material de apoyo (presentación, guía). No cuenta como actividad. */
export interface ResourceContent {
  type: 'resource';
  title: string;
  description: string;
  href: string; // ruta pública, p. ej. /materiales/...
  cta: string;
}

/** Laboratorio de huella digital: calcula el SHA-256 de un texto o archivo en el dispositivo. */
export interface HashLabContent {
  type: 'hash_lab';
  title: string;
  description: string;
  sample: string; // texto inicial para comparar
}

/** Presentación incrustada: diapositivas como imágenes (base/01.jpg … base/NN.jpg), con visor y descarga. */
export interface SlidesContent {
  type: 'slides';
  title: string;
  description?: string;
  base: string; // carpeta pública, p. ej. /materiales/ia-farmacias/diapositivas
  count: number;
  start?: number; // diapositiva inicial (1 = la primera)
  download?: { label: string; href: string };
}

/** Laboratorio de prompts: arma una instrucción con la fórmula R-T-C-F, la evalúa y la abre en la IA. */
export interface PromptLabContent {
  type: 'prompt_lab';
  title: string;
  description: string;
  scenario?: string;
  weakPrompt?: string; // prompt débil para mejorar
  suggestions: { rol: string[]; tarea: string[]; contexto: string[]; formato: string[]; limites?: string[] };
}

/** Ronda relámpago: una frase a la vez y dos botones grandes (sí/no, real/trampa…), con el porqué. */
export interface QuickVoteContent {
  type: 'quick_vote';
  title: string;
  description: string;
  options: { a: { label: string; emoji: string }; b: { label: string; emoji: string } };
  items: { text: string; tag?: string; answer: 'a' | 'b'; why: string }[];
}

/** Guía para el docente: solo la ven docentes, tutores y admin. Pasos del momento, qué decir y respuestas. */
export interface TeacherGuideContent {
  type: 'teacher_guide';
  title: string;
  minutes: string; // p. ej. «0:10–0:30 (20 min)»
  goal: string;
  slides?: string; // p. ej. «Diapositivas 5 a 10»
  steps: { time: string; text: string }[];
  say?: string[]; // frases sugeridas
  answers?: string[]; // respuestas esperadas de las dinámicas
  tip?: string;
}

/**
 * Entregable escrito de los niveles Intermedio y Avanzado: el estudiante desarrolla un producto
 * profesional campo por campo y se autoevalúa con una rúbrica. Se guarda en la base de datos
 * (level_deliverables) y el servidor lo exige para emitir el badge del nivel.
 */
export interface DeliverableContent {
  type: 'deliverable';
  id: string; // único en todo el curso, p. ej. 'gri_d1'; debe coincidir con course_requirements()
  title: string;
  description: string;
  context?: string;
  fields: { key: string; label: string; hint: string; min: number; rows?: number; example?: string }[];
  rubric: string[];
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
  | ExamContent
  | ResourceContent
  | HashLabContent
  | PromptLabContent
  | SlidesContent
  | QuickVoteContent
  | TeacherGuideContent
  | DeliverableContent;

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

export type UserRole = 'student' | 'teacher' | 'tutor' | 'admin' | 'cert_student' | 'auditor' | 'cti_student' | 'free_student' | 'law_student' | 'insurance_student' | 'pharmacy_student';

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