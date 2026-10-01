import React, { useEffect, useState } from 'react';
import type { LearningPaths, UserRole } from '../types';
import { getAllStudentsProgress } from '../progressService';
import type { StudentSummary } from '../progressService';
import { formatRelativeTime } from '../utils';
import { supabase } from '../supabaseClient';

interface TeacherDashboardProps {
  paths: LearningPaths;
  onExit: () => void;
  isAdmin: boolean;
}

const pathLabel = (title: string): string => (title.length > 20 ? `${title.slice(0, 20)}…` : title);

async function callAdminApi(path: string, body: Record<string, unknown>): Promise<{ email: string; password: string }> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error('No hay sesión activa.');
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Ocurrió un error.');
  return json;
}

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: 'student', label: 'Estudiante' },
  { value: 'teacher', label: 'Docente' },
  { value: 'tutor', label: 'Tutor' },
  { value: 'admin', label: 'Administrador' },
];

const ResultBox: React.FC<{ email: string; password: string; onClose: () => void }> = ({ email, password, onClose }) => (
  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6">
    <div className="flex justify-between items-start gap-4">
      <div>
        <p className="text-emerald-300 text-sm font-semibold mb-1">Cópiala ahora — no se vuelve a mostrar</p>
        <p className="text-slate-200 text-sm">
          <span className="text-slate-400">Correo:</span> {email}
        </p>
        <p className="text-slate-200 text-sm font-mono">
          <span className="text-slate-400 font-sans">Contraseña:</span> {password}
        </p>
      </div>
      <button onClick={onClose} className="text-slate-400 hover:text-white text-sm">✕</button>
    </div>
  </div>
);

const AdminPanel: React.FC<{ onUserCreated: () => void }> = ({ onUserCreated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ email: string; password: string } | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const res = await callAdminApi('/api/admin-create-user', { name, email, role });
      setResult(res);
      setName('');
      setEmail('');
      setRole('student');
      onUserCreated();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-2xl p-4 md:p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">➕ Agregar usuario</h2>
      {result && <ResultBox email={result.email} password={result.password} onClose={() => setResult(null)} />}
      {error && <p className="text-rose-400 text-sm mb-4">{error}</p>}
      <form onSubmit={handleCreate} className="flex flex-col md:flex-row gap-3">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nombre completo"
          required
          className="flex-1 bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500"
        />
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="correo@dominio.com"
          type="email"
          required
          className="flex-1 bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500"
        />
        <select
          value={role}
          onChange={e => setRole(e.target.value as UserRole)}
          className="bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
        >
          {ROLE_OPTIONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
        </select>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors"
        >
          {isSubmitting ? 'Creando…' : 'Crear cuenta'}
        </button>
      </form>
    </div>
  );
};

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ paths, onExit, isAdmin }) => {
  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [resetResult, setResetResult] = useState<{ email: string; password: string } | null>(null);
  const [resetError, setResetError] = useState('');
  const [resettingEmail, setResettingEmail] = useState<string | null>(null);

  const loadStudents = () => {
    setIsLoading(true);
    getAllStudentsProgress()
      .then(setStudents)
      .finally(() => setIsLoading(false));
  };

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

  const handleReset = async (email: string) => {
    setResetError('');
    setResettingEmail(email);
    try {
      const res = await callAdminApi('/api/admin-reset-password', { email });
      setResetResult(res);
    } catch (err) {
      setResetError((err as Error).message);
    } finally {
      setResettingEmail(null);
    }
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

        {isAdmin && <AdminPanel onUserCreated={loadStudents} />}
        {isAdmin && resetResult && <ResultBox email={resetResult.email} password={resetResult.password} onClose={() => setResetResult(null)} />}
        {isAdmin && resetError && <p className="text-rose-400 text-sm mb-4">{resetError}</p>}

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
                  {isAdmin && <th className="py-2 pr-4 font-semibold">Acciones</th>}
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
                        {isAdmin && (
                          <td className="py-3 pr-4">
                            <button
                              onClick={() => handleReset(s.email)}
                              disabled={resettingEmail === s.email}
                              className="text-xs text-amber-300 hover:text-amber-200 border border-amber-700/50 hover:border-amber-500 rounded-lg px-2.5 py-1 disabled:opacity-50 transition-colors"
                            >
                              {resettingEmail === s.email ? 'Restableciendo…' : '🔑 Restablecer'}
                            </button>
                          </td>
                        )}
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
