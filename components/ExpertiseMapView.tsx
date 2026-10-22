import React from 'react';
import { motion } from 'framer-motion';
import type { LearningPaths, UserProgressMap } from '../types';
import { EXPERTISE_TRACKS, LEVEL_NAMES } from '../expertise';
import { BadgeSvg, cleanCourseTitle } from './Credential';

type NodeState = 'done' | 'available' | 'locked' | 'soon';

interface ExpertiseMapViewProps {
  allPaths: LearningPaths;
  /** Cursos básicos que este usuario puede ver (las rutas sin Básico visible no se muestran). */
  visibleBase: Set<string>;
  /** Bloqueos del Básico por rol o calendario (texto a mostrar). */
  baseLocks: Record<string, string>;
  progress: UserProgressMap;
  isAdmin: boolean;
  /** Motivo fijo de bloqueo de Intermedio/Avanzado (p. ej. registro gratuito). */
  levelLockReason?: string;
  onSelect: (pathId: string) => void;
  onClose: () => void;
}

// En el mapa el nivel ya se indica aparte: "Investigador Cibercriminal · Nivel Intermedio" → "Investigador Cibercriminal".
const mapTitle = (title: string) => cleanCourseTitle(title).replace(/\s*·\s*Nivel\s+\S+$/, '');

const LEVEL_STYLE = [
  { ring: 'ring-emerald-400', dot: 'bg-emerald-500', text: 'text-emerald-300' },
  { ring: 'ring-amber-400', dot: 'bg-amber-500', text: 'text-amber-300' },
  { ring: 'ring-rose-400', dot: 'bg-rose-500', text: 'text-rose-300' },
];

const ExpertiseMapView: React.FC<ExpertiseMapViewProps> = ({ allPaths, visibleBase, baseLocks, progress, isAdmin, levelLockReason, onSelect, onClose }) => {
  const isComplete = (pathId: string) => {
    const cp = progress[pathId];
    const path = allPaths[pathId];
    return !!cp?.completedAt && !!path && cp.completedModules.length >= path.modules.length;
  };

  const tracks = EXPERTISE_TRACKS.filter(t => visibleBase.has(t.levels[0]));
  let levelsDone = 0;
  let levelsPublished = 0;

  const rows = tracks.map(track => {
    const states: NodeState[] = track.levels.map((pathId, i) => {
      if (!pathId || !allPaths[pathId]) return 'soon';
      levelsPublished++;
      if (isComplete(pathId)) { levelsDone++; return 'done'; }
      if (i === 0) return baseLocks[pathId] ? 'locked' : 'available';
      if (levelLockReason && !isAdmin) return 'locked';
      const prev = track.levels[i - 1];
      return isAdmin || (prev && isComplete(prev)) ? 'available' : 'locked';
    });
    return { track, states };
  });

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 min-h-screen text-white font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <button onClick={onClose} className="text-sm text-blue-400 hover:underline mb-6">← Volver a mis cursos</button>
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-1">Mapa de expertise</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">🗺️ Tu camino a la experticia</h1>
          <p className="text-slate-400 max-w-3xl">
            Cada ruta tiene tres niveles: <span className="text-emerald-300">Básico</span>, <span className="text-amber-300">Intermedio</span> y{' '}
            <span className="text-rose-300">Avanzado</span>. Al aprobar un nivel se desbloquea el siguiente y ganas su badge. Completa los tres para obtener el título de la ruta.
          </p>
          <p className="mt-3 text-sm text-slate-300">Niveles completados: <span className="font-bold text-white">{levelsDone}</span> de {levelsPublished} publicados</p>
        </div>

        <div className="space-y-5">
          {rows.map(({ track, states }, r) => {
            const mastered = states.every(s => s === 'done');
            const doneCount = states.filter(s => s === 'done').length;
            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: r * 0.05 }}
                className={`rounded-2xl border p-5 md:p-6 ${mastered ? 'bg-amber-500/10 border-amber-400/50' : 'bg-slate-900/70 border-slate-700/60'}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                  <div>
                    <h2 className="text-lg md:text-xl font-bold">{mastered ? '🏆 ' : ''}{track.title}</h2>
                    <p className="text-xs text-slate-400">{doneCount === 0 ? 'Aún no has comenzado esta ruta' : mastered ? '¡Ruta dominada! Título obtenido.' : `${doneCount} de 3 niveles completados`}</p>
                  </div>
                  <div className="flex gap-1">
                    {states.map((s, i) => (
                      <span key={i} className={`w-8 h-1.5 rounded-full ${s === 'done' ? LEVEL_STYLE[i].dot : 'bg-slate-700'}`} />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative">
                  {track.levels.map((pathId, i) => {
                    const state = states[i];
                    const path = pathId ? allPaths[pathId] : undefined;
                    const style = LEVEL_STYLE[i];
                    const clickable = !!pathId && (state === 'available' || state === 'done');
                    return (
                      <button
                        key={i}
                        disabled={!clickable}
                        onClick={() => pathId && clickable && onSelect(pathId)}
                        className={`relative text-left rounded-xl p-4 border transition-all flex items-center gap-4 ${
                          state === 'done'
                            ? `bg-slate-800/80 border-slate-600 ring-2 ${style.ring}`
                            : state === 'available'
                              ? `bg-slate-800/80 border-slate-500 hover:border-white ring-1 ${style.ring} animate-[pulse_3s_ease-in-out_infinite]`
                              : state === 'locked'
                                ? 'bg-slate-900/60 border-slate-800 opacity-60 cursor-not-allowed'
                                : 'bg-transparent border-dashed border-slate-700 opacity-50 cursor-default'
                        }`}
                      >
                        <div className="shrink-0">
                          {state === 'done' && pathId && path ? (
                            <BadgeSvg pathId={pathId} title={cleanCourseTitle(path.title)} year={new Date().getFullYear().toString()} size={56} />
                          ) : (
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${state === 'soon' ? 'border-2 border-dashed border-slate-600' : 'bg-slate-700/60'}`}>
                              {state === 'available' ? '▶' : state === 'locked' ? '🔒' : '⏳'}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className={`text-xs font-bold uppercase tracking-widest ${style.text}`}>Nivel {LEVEL_NAMES[i]}</p>
                          <p className="text-sm font-semibold text-white leading-snug">{path ? mapTitle(path.title) : 'Próximamente'}</p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {state === 'done' && '✓ Completado · badge obtenido'}
                            {state === 'available' && (path ? `${path.modules.length} módulos · ${i === 0 ? 'Disponible' : 'Desbloqueado'}` : '')}
                            {state === 'locked' && (i === 0 ? baseLocks[pathId!]?.replace(/^🔒\s*/, '') : levelLockReason ?? `Aprueba el nivel ${LEVEL_NAMES[i - 1]} para desbloquear`)}
                            {state === 'soon' && 'En preparación'}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExpertiseMapView;
