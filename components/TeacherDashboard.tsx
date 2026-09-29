import React, { useEffect, useState } from 'react';
import type { LearningPaths } from '../types';
import { getAllStudentsProgress } from '../progressService';
import type { StudentSummary } from '../progressService';
import { formatRelativeTime } from '../utils';

interface TeacherDashboardProps {
  paths: LearningPaths;
  onExit: () => void;
}

const pathLabel = (title: string): string => (title.length > 20 ? `${title.slice(0, 20)}…` : title);

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ paths, onExit }) => {
  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getAllStudentsProgress()
      .then(data => { if (!cancelled) setStudents(data); })
      .finally(() => { if (!cancelled) setIsLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const pathIds = Object.keys(paths);

  const lastActive = (s: StudentSummary): string | null => {
    const dates = Object.values(s.progress).map(p => p.lastAccessedAt);
    if (dates.length === 0) return null;
    return formatRelativeTime([...dates].sort().reverse()[0]);
  };

  return (
    <main className="bg-gradient-to-br from-slate-900 to-gray-800 min-h-screen text-white font-sans flex flex-col p-4">
      <div className="w-full max-w-6xl mx-auto flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onExit} className="text-sm text-blue-400 hover:underline">
            ← Volver al Panel
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-center">📊 Panel Docente</h1>
          <div className="w-36" />
        </div>

        {isLoading ? (
          <p className="text-center text-slate-400 mt-10">Cargando estudiantes...</p>
        ) : students.length === 0 ? (
          <p className="text-center text-slate-400 mt-10">Todavía no hay estudiantes registrados.</p>
        ) : (
          <div className="bg-slate-800/50 rounded-2xl p-4 md:p-6 overflow-x-auto">
            <p className="text-slate-400 text-sm mb-4">
              {students.length} estudiante{students.length !== 1 ? 's' : ''} registrado{students.length !== 1 ? 's' : ''}
            </p>
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-700">
                  <th className="py-2 pr-4 font-semibold">Estudiante</th>
                  <th className="py-2 pr-4 font-semibold">XP total</th>
                  <th className="py-2 pr-4 font-semibold">Cursos completados</th>
                  <th className="py-2 pr-4 font-semibold">Módulos completados</th>
                  <th className="py-2 pr-4 font-semibold">Rutas en progreso</th>
                  <th className="py-2 pr-4 font-semibold">Última actividad</th>
                </tr>
              </thead>
              <tbody>
                {students
                  .slice()
                  .sort((a, b) => b.stats.totalXP - a.stats.totalXP)
                  .map(s => {
                    const active = lastActive(s);
                    const started = pathIds.filter(id => s.progress[id]);
                    return (
                      <tr key={s.id} className="border-b border-slate-800 hover:bg-slate-800/40">
                        <td className="py-3 pr-4">
                          <div className="font-semibold text-slate-100">{s.name}</div>
                          <div className="text-xs text-slate-500">{s.email}</div>
                        </td>
                        <td className="py-3 pr-4 text-amber-300 font-bold">⚡ {s.stats.totalXP}</td>
                        <td className="py-3 pr-4">{s.stats.coursesCompleted}</td>
                        <td className="py-3 pr-4">{s.stats.totalModulesCompleted}</td>
                        <td className="py-3 pr-4">
                          <div className="flex flex-wrap gap-1.5">
                            {started.length === 0 && <span className="text-xs text-slate-600">Sin iniciar</span>}
                            {started.map(id => {
                              const cp = s.progress[id];
                              const total = paths[id].modules.length;
                              const pct = Math.round((cp.completedModules.length / total) * 100);
                              return (
                                <span
                                  key={id}
                                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                    cp.completedAt ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'
                                  }`}
                                  title={paths[id].title}
                                >
                                  {pathLabel(paths[id].title)} {pct}%
                                </span>
                              );
                            })}
                          </div>
                        </td>
                        <td className="py-3 pr-4 text-slate-400">{active ?? '—'}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <footer className="text-center mt-6 text-sm text-gray-500">
        <p>CERT Académico by RedCiber.org</p>
      </footer>
    </main>
  );
};

export default TeacherDashboard;
