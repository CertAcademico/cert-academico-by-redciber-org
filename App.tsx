
import React, { useState, useEffect, useRef } from 'react';
import { fetchLearningPaths } from './api';
import type { LearningPaths, LearningPath as LearningPathType, ContentBlock, Module } from './types';
import { getSession, logoutUser } from './authService';
import type { SessionUser } from './authService';
import {
  getCourseProgress,
  getUserProgress,
  getUserStats,
  markModuleComplete,
  saveModuleScore,
  resetCourseProgress,
  touchCourse,
} from './progressService';
import type { UserStats } from './progressService';
import type { UserProgressMap, ModuleScore } from './types';
import QuizView from './components/QuizView';
import VideoPlayer from './components/VideoPlayer';
import InteractiveCard from './components/InteractiveCard';
import ProgressBar from './components/ProgressBar';
import FlashcardsView from './components/FlashcardsView';
import MemoryPuzzleView from './components/MemoryPuzzleView';
import H5PCheckView from './components/H5PCheckView';
import AICourseCompanion from './components/AICourseCompanion';
import LoginView from './components/LoginView';
import TeacherDashboard from './components/TeacherDashboard';
import ActivityView from './components/ActivityView';
import ChangePasswordModal from './components/ChangePasswordModal';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlayCircleIcon,
  CheckCircleIcon,
  iconMap,
  CalendarIcon,
  PointerIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
} from './components/icons';
import { formatRelativeTime } from './utils';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Content renderer
// ---------------------------------------------------------------------------

const renderContentBlock = (
  block: ContentBlock,
  onComplete: () => void,
  onH5PComplete: (score: number, maxScore: number) => void,
) => {
  switch (block.type) {
    case 'text': {
      const IconComponent = block.icon ? iconMap[block.icon] : null;
      return (
        <div className="flex flex-col items-center justify-center text-center p-8 my-4 bg-slate-800/50 rounded-lg">
          {IconComponent && (
            <div className="w-24 h-24 mb-6 text-slate-100">
              {React.createElement(IconComponent)}
            </div>
          )}
          <p className="text-xl md:text-2xl max-w-3xl leading-relaxed">{block.text}</p>
        </div>
      );
    }
    case 'video':
      return <VideoPlayer videoId={block.videoId} title={block.title} />;
    case 'quiz':
      return <QuizView onComplete={onComplete} data={block.quizData} />;
    case 'interactive':
      return <InteractiveCard title={block.title} items={block.items} />;
    case 'flashcards':
      return <FlashcardsView title={block.title} cards={block.cards} onComplete={onComplete} />;
    case 'memory':
      return <MemoryPuzzleView title={block.title} pairs={block.pairs} onComplete={onComplete} />;
    case 'h5p_check':
      return <H5PCheckView data={block} onComplete={onH5PComplete} />;
    case 'activity':
      return <ActivityView data={block} />;
    default:
      return null;
  }
};

// ---------------------------------------------------------------------------
// LearningPathView
// ---------------------------------------------------------------------------

interface LearningPathViewProps {
  path: LearningPathType;
  pathId: string;
  onExit: () => void;
  userId: string;
  unlockAll: boolean;
}

const LearningPathView: React.FC<LearningPathViewProps> = ({ path, pathId, onExit, userId, unlockAll }) => {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [isProgressLoading, setIsProgressLoading] = useState(true);
  const moduleContentRef = useRef<HTMLDivElement>(null);

  // Load progress (and mark the course as touched) whenever the path changes
  useEffect(() => {
    let cancelled = false;
    setIsProgressLoading(true);
    setCurrentModuleIndex(0);
    (async () => {
      await touchCourse(userId, pathId).catch(console.error);
      const cp = await getCourseProgress(userId, pathId).catch(() => null);
      if (cancelled) return;
      setCompletedModules(cp?.completedModules ?? []);
      setIsProgressLoading(false);
    })();
    return () => { cancelled = true; };
  }, [path, userId, pathId]);

  useEffect(() => {
    moduleContentRef.current?.focus();
  }, [currentModuleIndex]);

  // Auto-complete non-interactive modules
  useEffect(() => {
    const mod = path.modules[currentModuleIndex];
    if (!mod) return;
    const hasInteractive = mod.content.some(
      c => c.type === 'quiz' || c.type === 'flashcards' || c.type === 'memory' || c.type === 'h5p_check',
    );
    if (!hasInteractive) {
      setCompletedModules(prev => {
        if (prev.includes(currentModuleIndex)) return prev;
        markModuleComplete(userId, pathId, currentModuleIndex, path.modules.length).catch(console.error);
        return [...new Set([...prev, currentModuleIndex])];
      });
    }
  }, [currentModuleIndex, path, userId, pathId]);

  const isModuleLocked = (index: number): boolean => {
    if (path.modules[index]?.locked && !unlockAll) return true;
    const checkInteractive = (m: Module) =>
      m.content.some(
        c => c.type === 'quiz' || c.type === 'flashcards' || c.type === 'memory' || c.type === 'h5p_check',
      );
    const firstQuizIndex = path.modules.findIndex(checkInteractive);
    if (firstQuizIndex === -1) return false;
    let lastQuizBeforeTarget = -1;
    for (let i = 0; i < index; i++) {
      if (checkInteractive(path.modules[i])) lastQuizBeforeTarget = i;
    }
    return lastQuizBeforeTarget !== -1 && !completedModules.includes(lastQuizBeforeTarget);
  };

  const handleSelectModule = (index: number) => {
    if (isModuleLocked(index)) return;
    setCurrentModuleIndex(index);
  };

  const handleQuizComplete = () => {
    setCompletedModules(prev => {
      if (prev.includes(currentModuleIndex)) return prev;
      markModuleComplete(userId, pathId, currentModuleIndex, path.modules.length).catch(console.error);
      return [...new Set([...prev, currentModuleIndex])];
    });
  };

  const handleH5PComplete = (score: number, maxScore: number) => {
    const moduleId = path.modules[currentModuleIndex].id;
    saveModuleScore(userId, pathId, moduleId, score, maxScore).catch(console.error);
    handleQuizComplete();
  };

  const goToNextModule = () => {
    if (currentModuleIndex < path.modules.length - 1) {
      handleSelectModule(currentModuleIndex + 1);
    }
  };

  // Reiniciar Ruta — limpia estado local Y el registro almacenado
  const handleReset = () => {
    setCurrentModuleIndex(0);
    setCompletedModules([]);
    resetCourseProgress(userId, pathId).catch(console.error);
  };

  const getModuleIcon = (module: Module, index: number) => {
    if (completedModules.includes(index)) return <CheckCircleIcon />;
    switch (module.content[0]?.type) {
      case 'video': return <PlayCircleIcon />;
      case 'quiz':
      case 'h5p_check': return <QuestionMarkCircleIcon />;
      case 'interactive':
      case 'flashcards':
      case 'memory': return <PointerIcon />;
      default: return <DocumentTextIcon />;
    }
  };

  const currentModule = path.modules[currentModuleIndex];
  const isCurrentInteractive = currentModule.content.some(
    c => c.type === 'quiz' || c.type === 'flashcards' || c.type === 'memory' || c.type === 'h5p_check',
  );
  const isCurrentCompleted = completedModules.includes(currentModuleIndex);
  const canGoNext =
    currentModuleIndex < path.modules.length - 1 &&
    (!isCurrentInteractive || isCurrentCompleted) &&
    !isModuleLocked(currentModuleIndex + 1);
  const isLastModule = currentModuleIndex === path.modules.length - 1;

  if (isProgressLoading) return <LoadingSpinner message="Cargando tu progreso..." />;

  return (
    <main className="bg-gradient-to-br from-slate-900 to-gray-800 min-h-screen text-white font-sans flex flex-col p-4 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onExit}
            aria-label="Volver al panel de rutas"
            className="text-sm text-blue-400 hover:underline"
          >
            ← Volver al Panel
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-center">{path.title}</h1>
          <div className="w-36" />
        </div>

        <ProgressBar
          completedCount={completedModules.length}
          totalCount={path.modules.length}
          themeColor={pathId}
        />

        <div className="flex-grow flex gap-6 flex-col lg:flex-row">
          {/* Sidebar */}
          <aside
            className={`w-full ${pathId === 'artificial_intelligence' ? 'lg:w-1/5' : 'lg:w-1/4'} bg-slate-800/50 rounded-2xl p-6 overflow-y-auto`}
          >
            <h2 className="text-lg font-semibold mb-4 text-slate-300">Módulos</h2>
            <nav>
              <ul>
                {path.modules.map((module, index) => {
                  const isLocked = isModuleLocked(index);
                  const isCompleted = completedModules.includes(index);
                  const isCurrent = index === currentModuleIndex;
                  let statusCls = 'text-slate-400 hover:text-white';
                  if (isLocked) statusCls = 'text-slate-500 cursor-not-allowed';
                  else if (isCurrent) statusCls = 'text-blue-400 font-bold bg-blue-500/10';
                  else if (isCompleted) statusCls = 'text-green-400 hover:text-green-300';

                  return (
                    <li key={module.id} className="mb-2">
                      <button
                        onClick={() => handleSelectModule(index)}
                        disabled={isLocked}
                        className={`w-full text-left transition-colors duration-200 p-3 rounded-md flex items-center gap-3 ${statusCls}`}
                        aria-current={isCurrent ? 'true' : undefined}
                      >
                        <div className="w-6 h-6 flex-shrink-0">{getModuleIcon(module, index)}</div>
                        <span className="flex-grow text-xs font-semibold leading-snug">{module.title}</span>
                        {module.locked && <span className="text-xs shrink-0" title="Sesión aún no habilitada">🔒</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Main content */}
          <section className="w-full lg:flex-1 flex flex-col min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentModuleIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-black/30 rounded-2xl shadow-2xl flex-grow p-8 overflow-y-auto outline-none focus:ring-2 focus:ring-blue-500"
                ref={moduleContentRef}
                tabIndex={-1}
                aria-labelledby={`module-title-${currentModuleIndex}`}
              >
                <h2 id={`module-title-${currentModuleIndex}`} className="sr-only">
                  {currentModule.title}
                </h2>
                {currentModule.content.map((block, index) => (
                  <div key={index}>
                    {renderContentBlock(block, handleQuizComplete, handleH5PComplete)}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-end items-center p-4">
              {isLastModule ? (
                <button
                  onClick={handleReset}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-all"
                >
                  Reiniciar Ruta
                </button>
              ) : (
                <button
                  onClick={goToNextModule}
                  disabled={!canGoNext}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente Módulo
                </button>
              )}
            </div>
          </section>

          {pathId === 'artificial_intelligence' && (
            <aside className="w-full lg:w-[350px] shrink-0 flex flex-col">
              <AICourseCompanion
                currentModuleId={path.modules[currentModuleIndex].id}
                currentModuleIndex={currentModuleIndex}
                completedModules={completedModules}
                pathId={pathId}
              />
            </aside>
          )}
        </div>
      </div>
      <footer className="text-center mt-6 text-sm text-gray-500">
        <p>CERT Académico by RedCiber.org</p>
      </footer>
    </main>
  );
};

// ---------------------------------------------------------------------------
// LoadingSpinner
// ---------------------------------------------------------------------------

const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Cargando rutas...' }) => (
  <div
    role="status"
    className="bg-gradient-to-br from-slate-900 to-gray-800 min-h-screen flex items-center justify-center"
  >
    <svg
      className="animate-spin h-10 w-10 text-blue-400 mr-3"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <span className="text-xl text-slate-300">{message}</span>
  </div>
);

// ---------------------------------------------------------------------------
// Path theme map
// ---------------------------------------------------------------------------

const pathThemes: Record<string, { card: string; title: string; bar: string }> = {
  cybersecurity: {
    card: 'from-blue-900/50 to-cyan-900/50 ring-cyan-700 hover:ring-cyan-500 hover:shadow-cyan-500/30',
    title: 'text-cyan-400',
    bar: 'from-cyan-500 to-blue-400',
  },
  cybercrime: {
    card: 'from-red-900/50 to-slate-900/50 ring-red-800 hover:ring-red-600 hover:shadow-red-600/30',
    title: 'text-red-400',
    bar: 'from-red-500 to-rose-400',
  },
  cybercriminology: {
    card: 'from-purple-900/50 to-indigo-900/50 ring-indigo-700 hover:ring-indigo-500 hover:shadow-indigo-500/30',
    title: 'text-indigo-400',
    bar: 'from-indigo-500 to-purple-400',
  },
  quantum_computing: {
    card: 'from-fuchsia-900/60 to-slate-900/60 ring-fuchsia-700 hover:ring-fuchsia-500 hover:shadow-fuchsia-500/30',
    title: 'text-fuchsia-400',
    bar: 'from-fuchsia-500 to-pink-400',
  },
  forensic_auditing: {
    card: 'from-green-900/50 to-gray-800/50 ring-green-800 hover:ring-green-600 hover:shadow-green-600/30',
    title: 'text-green-400',
    bar: 'from-green-500 to-emerald-400',
  },
  artificial_intelligence: {
    card: 'from-amber-900/40 to-yellow-950/40 ring-amber-700 hover:ring-amber-500 hover:shadow-amber-500/30',
    title: 'text-amber-400',
    bar: 'from-amber-500 to-yellow-400',
  },
  cert_csirt: {
    card: 'from-teal-900/50 to-slate-900/50 ring-teal-700 hover:ring-teal-500 hover:shadow-teal-500/30',
    title: 'text-teal-400',
    bar: 'from-teal-500 to-cyan-400',
  },
  ia_ofensiva_insider: {
    card: 'from-orange-900/50 to-slate-900/50 ring-orange-700 hover:ring-orange-500 hover:shadow-orange-500/30',
    title: 'text-orange-400',
    bar: 'from-orange-500 to-amber-400',
  },
  default: {
    card: 'bg-black/30 ring-slate-700 hover:ring-blue-500 hover:shadow-blue-500/30',
    title: 'text-blue-400',
    bar: 'from-blue-500 to-indigo-400',
  },
};

// ---------------------------------------------------------------------------
// LearningPathSelector — with progress and user header
// ---------------------------------------------------------------------------

interface LearningPathSelectorProps {
  paths: LearningPaths;
  onSelect: (id: string) => void;
  onLogout: () => void;
  userId: string;
  userName: string;
  isTeacher: boolean;
  onOpenTeacherDashboard: () => void;
}

const emptyStats: UserStats = { totalXP: 0, coursesCompleted: 0, totalModulesCompleted: 0 };

const LearningPathSelector: React.FC<LearningPathSelectorProps> = ({
  paths,
  onSelect,
  onLogout,
  userId,
  userName,
  isTeacher,
  onOpenTeacherDashboard,
}) => {
  const [stats, setStats] = useState<UserStats>(emptyStats);
  const [userProgress, setUserProgress] = useState<UserProgressMap>({});
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const firstName = userName.split(' ')[0];
  const initial = userName.charAt(0).toUpperCase();

  useEffect(() => {
    let cancelled = false;
    Promise.all([getUserStats(userId), getUserProgress(userId)]).then(([s, p]) => {
      if (cancelled) return;
      setStats(s);
      setUserProgress(p);
      setIsStatsLoading(false);
    });
    return () => { cancelled = true; };
  }, [userId]);

  if (isStatsLoading) return <LoadingSpinner message="Cargando tu panel..." />;

  return (
    <div className="bg-gradient-to-br from-slate-900 to-gray-800 min-h-screen text-white font-sans flex flex-col">
      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-20 border-b border-slate-700/40 bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-lg font-bold tracking-tight">CERT Académico</span>
            <span className="text-blue-400 text-sm hidden sm:block">by RedCiber.org</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-end">
            {/* XP badge */}
            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1.5">
              <span className="text-amber-400 text-xs">⚡</span>
              <span className="text-amber-300 font-bold text-xs">{stats.totalXP} XP</span>
            </div>
            {/* Courses completed */}
            {stats.coursesCompleted > 0 && (
              <div className="hidden md:flex items-center gap-1 text-slate-400 text-xs">
                <span>🎓</span>
                <span>{stats.coursesCompleted} completado{stats.coursesCompleted !== 1 ? 's' : ''}</span>
              </div>
            )}
            {/* Avatar + logout */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {initial}
                </div>
                <span className="text-sm font-medium text-slate-200 hidden md:block">{userName}</span>
              </div>
              {isTeacher && (
                <button
                  onClick={onOpenTeacherDashboard}
                  className="text-xs text-teal-300 hover:text-white border border-teal-700/60 hover:border-teal-500 bg-teal-500/10 rounded-lg px-3 py-1.5 transition-all"
                >
                  📊 Panel Docente
                </button>
              )}
              <button
                onClick={() => setShowChangePassword(true)}
                className="text-xs text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 rounded-lg px-3 py-1.5 transition-all"
              >
                🔑 Contraseña
              </button>
              <button
                onClick={onLogout}
                className="text-xs text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 rounded-lg px-3 py-1.5 transition-all"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      </header>
      {showChangePassword && <ChangePasswordModal onClose={() => setShowChangePassword(false)} />}

      {/* ── Main content ── */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">
            {stats.totalModulesCompleted > 0 ? `Bienvenido de vuelta, ${firstName} 👋` : `Hola, ${firstName} 👋`}
          </h1>
          <p className="text-slate-400 mt-2 text-base">
            {stats.totalModulesCompleted > 0
              ? `Has completado ${stats.totalModulesCompleted} módulo${stats.totalModulesCompleted !== 1 ? 's' : ''} en total · ${stats.totalXP} XP acumulados.`
              : 'Elige una ruta de aprendizaje para comenzar tu formación en ciberseguridad.'}
          </p>
        </div>

        {/* Course grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(paths).map(([id, path]) => {
            const typedPath = path as LearningPathType;
            const theme = pathThemes[id] || pathThemes.default;
            const cp = userProgress[id];
            const completedCount = cp?.completedModules.length ?? 0;
            const totalCount = typedPath.modules.length;
            const pct = Math.round((completedCount / totalCount) * 100);
            const isDone = !!cp?.completedAt;
            const started = completedCount > 0;
            const lastAccessed = cp ? formatRelativeTime(cp.lastAccessedAt) : null;

            let courseXP = completedCount * 10 + (isDone ? 50 : 0);
            if (cp) for (const s of Object.values<ModuleScore>(cp.scores)) courseXP += s.score;

            return (
              <motion.button
                key={id}
                onClick={() => onSelect(id)}
                className={`bg-gradient-to-br p-6 rounded-2xl shadow-lg transition-all duration-300 text-left flex flex-col h-full ring-1 relative overflow-hidden ${theme.card}`}
                whileHover={{ y: -5 }}
                aria-label={`${started ? 'Continuar' : 'Iniciar'} la ruta: ${typedPath.title}`}
              >
                {isDone && (
                  <span className="absolute top-3 right-3 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    ✓ Completado
                  </span>
                )}

                <h2 className={`text-xl font-bold mb-2 ${isDone ? 'pr-24' : ''} ${theme.title}`}>
                  {typedPath.title}
                </h2>
                <p className="text-slate-300 text-sm flex-grow mb-5 leading-relaxed">
                  {typedPath.description}
                </p>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                    <span>{completedCount} de {totalCount} módulos</span>
                    <span className="font-semibold">{pct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r transition-all duration-700 ${isDone ? 'from-emerald-500 to-green-400' : theme.bar}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center text-xs text-slate-400 mb-4">
                  <span>⚡ {courseXP} XP</span>
                  {lastAccessed ? (
                    <span>🕐 {lastAccessed}</span>
                  ) : (
                    <div className="flex items-center gap-1">
                      <div className="w-3.5 h-3.5"><CalendarIcon /></div>
                      <span>{typedPath.lastUpdated}</span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div
                  className={`py-2 px-4 rounded-xl text-center text-sm font-bold transition-colors ${
                    isDone
                      ? 'bg-emerald-600/20 text-emerald-300'
                      : started
                      ? 'bg-blue-600/20 text-blue-300'
                      : 'bg-white/5 text-slate-300'
                  }`}
                >
                  {isDone ? '🔄 Repasar' : started ? '▶ Continuar' : '🚀 Comenzar'}
                </div>
              </motion.button>
            );
          })}
        </div>
      </main>

      <footer className="text-center py-5 text-sm text-gray-500 border-t border-slate-800">
        CERT Académico by RedCiber.org · {new Date().getFullYear()}
      </footer>
    </div>
  );
};

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<SessionUser | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);
  const [showTeacherDashboard, setShowTeacherDashboard] = useState(false);
  const [learningPaths, setLearningPaths] = useState<LearningPaths | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession()
      .then(setCurrentUser)
      .catch(err => console.error('Failed to restore session:', err))
      .finally(() => setIsAuthChecked(true));
  }, []);

  useEffect(() => {
    fetchLearningPaths()
      .then(paths => {
        setLearningPaths(paths);
        const params = new URLSearchParams(window.location.search);
        const topic = params.get('topic');
        if (topic && topic in paths) setSelectedPathId(topic);
      })
      .catch(err => console.error('Failed to fetch learning paths:', err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleLogin = (user: SessionUser) => setCurrentUser(user);

  const handleLogout = () => {
    logoutUser().catch(err => console.error('Failed to log out:', err));
    setCurrentUser(null);
    setSelectedPathId(null);
    setShowTeacherDashboard(false);
  };

  if (!isAuthChecked) return <LoadingSpinner message="Verificando sesión..." />;

  if (!currentUser) return <LoginView onLogin={handleLogin} />;

  if (isLoading) return <LoadingSpinner />;

  if (!learningPaths) {
    return (
      <div className="bg-gradient-to-br from-slate-900 to-gray-800 min-h-screen flex items-center justify-center text-white text-center p-8">
        Error al cargar el contenido. Recarga la página.
      </div>
    );
  }

  const isAdmin = currentUser.role === 'admin';
  const isCertStudent = currentUser.role === 'cert_student';
  // CERTs/CSIRTs es para otro público (registro abierto, rol cert_student) — la cohorte no lo ve,
  // y cert_student solo ve ese curso. Admin ve todo.
  // Se filtra acá (no solo en el grid) para que tampoco se pueda entrar por URL directa (?topic=cert_csirt).
  const visiblePaths: LearningPaths = Object.fromEntries(
    (Object.entries(learningPaths) as [string, LearningPathType][]).filter(([id]) =>
      isAdmin || (isCertStudent ? id === 'cert_csirt' : id !== 'cert_csirt'),
    ),
  );

  if (showTeacherDashboard) {
    return <TeacherDashboard paths={visiblePaths} onExit={() => setShowTeacherDashboard(false)} isAdmin={isAdmin} />;
  }

  if (!selectedPathId || !(selectedPathId in visiblePaths)) {
    return (
      <LearningPathSelector
        paths={visiblePaths}
        onSelect={setSelectedPathId}
        onLogout={handleLogout}
        userId={currentUser.id}
        userName={currentUser.name}
        isTeacher={currentUser.role === 'teacher' || currentUser.role === 'tutor' || isAdmin}
        onOpenTeacherDashboard={() => setShowTeacherDashboard(true)}
      />
    );
  }

  const selectedPath = visiblePaths[selectedPathId];
  return (
    <LearningPathView
      path={selectedPath}
      pathId={selectedPathId}
      onExit={() => setSelectedPathId(null)}
      userId={currentUser.id}
      unlockAll={isAdmin}
    />
  );
};

// Ensures framer-motion is hydrated before rendering
const FramerMotionWrapper: React.FC = () => {
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => { setHydrated(true); }, []);
  if (!hydrated) return null;
  return <App />;
};

export default FramerMotionWrapper;
