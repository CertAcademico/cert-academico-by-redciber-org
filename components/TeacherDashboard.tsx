import React, { useEffect, useState } from 'react';
import type { LearningPaths, UserRole } from '../types';
import { getAllStudentsProgress } from '../progressService';
import type { StudentSummary } from '../progressService';
import { formatRelativeTime } from '../utils';
import { supabase } from '../supabaseClient';
import { BadgeSvg, CredentialModal, cleanCourseTitle } from './Credential';
import { ROUTE_CERTIFICATE_ID, ROUTE_CERTIFICATE_TITLE } from '../certificateService';
import type { Certificate } from '../certificateService';
import { FREE_ROUTE } from '../platform';
import { getCampaignRanking, CAMPAIGN_TOP } from '../rankingService';
import type { RankingRow } from '../rankingService';

interface TeacherDashboardProps {
  paths: LearningPaths;
  onExit: () => void;
  isAdmin: boolean;
  /** Nombre con el que se muestran los badges en la vista previa. */
  viewerName: string;
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
  { value: 'cert_student', label: 'Estudiante CERTs/CSIRTs' },
  { value: 'auditor', label: 'Auditor (cooperativas)' },
  { value: 'cti_student', label: 'Estudiante CTI' },
  { value: 'free_student', label: 'Registro gratuito (ruta completa)' },
];

type BulkResult = { name: string; email: string; password?: string; error?: string };

/** "Nombre, correo" o "Nombre<TAB>correo" por línea (acepta el orden inverso). */
const parseBulkLines = (text: string): { name: string; email: string }[] =>
  text
    .split('\n')
    .map(line => line.split(/[,\t;]/).map(p => p.trim()).filter(Boolean))
    .filter(parts => parts.length >= 2)
    .map(parts => {
      const email = parts.find(p => p.includes('@')) ?? '';
      const name = parts.filter(p => p !== email && !/^\d+$/.test(p)).join(' ');
      return { name, email };
    })
    .filter(u => u.name && u.email);

const BulkCreatePanel: React.FC<{ onUsersCreated: () => void }> = ({ onUsersCreated }) => {
  const [text, setText] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<BulkResult[]>([]);
  const users = parseBulkLines(text);

  const handleRun = async () => {
    setIsRunning(true);
    const out: BulkResult[] = [];
    for (const u of users) {
      try {
        const res = await callAdminApi('/api/admin-create-user', { name: u.name, email: u.email, role });
        out.push({ ...u, password: res.password });
      } catch (err) {
        out.push({ ...u, error: (err as Error).message });
      }
      setResults([...out]);
    }
    setIsRunning(false);
    setText('');
    onUsersCreated();
  };

  const csv = ['nombre,correo,rol,contrasena', ...results.filter(r => r.password).map(r => `${r.name},${r.email},${role},${r.password}`)].join('\n');

  const download = () => {
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `cuentas_${role}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-800/50 rounded-2xl p-4 md:p-6 mb-6">
      <h2 className="text-lg font-semibold mb-1">👥 Agregar varios usuarios</h2>
      <p className="text-slate-400 text-sm mb-4">Una persona por línea: <span className="font-mono">Nombre, correo</span>. También puede pegar columnas copiadas de Excel.</p>
      {results.length > 0 && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-4">
          <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
            <p className="text-emerald-300 text-sm font-semibold">Descargue las contraseñas ahora — no se vuelven a mostrar</p>
            <div className="flex gap-2">
              <button onClick={download} disabled={isRunning} className="text-xs bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-lg px-3 py-1.5">⬇ Descargar CSV</button>
              <button onClick={() => setResults([])} disabled={isRunning} className="text-slate-400 hover:text-white text-sm px-2">✕</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {results.map(r => (
                  <tr key={r.email} className="border-t border-slate-700/50">
                    <td className="py-1.5 pr-3 text-slate-200">{r.name}</td>
                    <td className="py-1.5 pr-3 text-slate-400">{r.email}</td>
                    <td className="py-1.5 font-mono">{r.password ? <span className="text-slate-100">{r.password}</span> : <span className="text-rose-400 font-sans">{r.error}</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows={5}
        placeholder={'Ana Pérez Gómez, aperez12345@universidadean.edu.co\nLuis Rojas, lrojas67890@universidadean.edu.co'}
        className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 font-mono mb-3"
      />
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <select
          value={role}
          onChange={e => setRole(e.target.value as UserRole)}
          className="bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
        >
          {ROLE_OPTIONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
        </select>
        <button
          onClick={handleRun}
          disabled={isRunning || users.length === 0}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors"
        >
          {isRunning ? `Creando… (${results.length}/${users.length})` : `Crear ${users.length} cuenta${users.length !== 1 ? 's' : ''}`}
        </button>
      </div>
    </div>
  );
};

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

const ROLE_LABELS: Record<string, string> = {
  free_student: 'Registro gratuito',
  student: 'EAN · Hacking Ético',
  cti_student: 'CTI',
  cert_student: 'CERTs/CSIRTs',
  auditor: 'Auditor',
  teacher: 'Docente',
  tutor: 'Tutor',
  admin: 'Admin',
};

interface SignupRow {
  name: string;
  email: string;
  role: string;
  created_at: string;
  data_consent_at: string | null;
}

/** Registros recientes (solo admin): quién se registró, cuándo, con qué rol y si aceptó la política. */
const RecentSignupsPanel: React.FC = () => {
  const [rows, setRows] = useState<SignupRow[] | null>(null);
  const [role, setRole] = useState('');
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    let cancelled = false;
    let q = supabase
      .from('profiles')
      .select('name, email, role, created_at, data_consent_at')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (role) q = q.eq('role', role);
    q.then(({ data }) => { if (!cancelled) setRows((data as SignupRow[]) ?? []); });
    return () => { cancelled = true; };
  }, [role, limit]);

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString('es-CO', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'America/Bogota' });
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Bogota' });
  const todayCount = (rows ?? []).filter(r => new Date(r.created_at).toLocaleDateString('en-CA', { timeZone: 'America/Bogota' }) === today).length;

  return (
    <div className="bg-slate-800/50 rounded-2xl p-4 md:p-6 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
        <h2 className="text-lg font-semibold">🆕 Registros recientes</h2>
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white outline-none"
        >
          <option value="">Todos los tipos de usuario</option>
          {Object.entries(ROLE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>
      <p className="text-slate-400 text-sm mb-4">
        {rows === null ? 'Cargando…' : `Mostrando los ${rows.length} más recientes${todayCount ? ` · ${todayCount} hoy` : ''}.`}
      </p>
      {rows && rows.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-700">
                <th className="py-2 pr-3">Registro</th>
                <th className="py-2 pr-3">Nombre</th>
                <th className="py-2 pr-3">Correo</th>
                <th className="py-2 pr-3">Tipo</th>
                <th className="py-2">Política</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.email + r.created_at} className="border-b border-slate-800">
                  <td className="py-2 pr-3 text-slate-400 whitespace-nowrap">{fmt(r.created_at)}</td>
                  <td className="py-2 pr-3">{r.name}</td>
                  <td className="py-2 pr-3 text-slate-400">{r.email}</td>
                  <td className="py-2 pr-3 whitespace-nowrap">{ROLE_LABELS[r.role] ?? r.role}</td>
                  <td className="py-2" title={r.data_consent_at ? `Aceptó el ${fmt(r.data_consent_at)}` : 'Cuenta creada por un administrador o antes de la política'}>
                    {r.data_consent_at ? '✅' : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === limit && (
            <button onClick={() => setLimit(l => l + 50)} className="mt-3 text-sm text-blue-400 hover:underline">Ver más</button>
          )}
        </div>
      )}
    </div>
  );
};

/** Ranking de la campaña (solo admin): top 50 con datos de contacto, alerta de ritmo sospechoso y CSV. */
const CampaignRankingPanel: React.FC = () => {
  const [rows, setRows] = useState<RankingRow[] | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getCampaignRanking().then(r => { if (!cancelled) setRows(r); });
    return () => { cancelled = true; };
  }, []);

  // Menos de 15 minutos por badge en promedio es inusual: conviene revisarlo a mano antes de anunciar.
  const minutesPerBadge = (r: RankingRow) =>
    r.badges > 0 && r.startedAt && r.lastBadgeAt ? (Date.parse(r.lastBadgeAt) - Date.parse(r.startedAt)) / 60000 / r.badges : null;
  const suspicious = (r: RankingRow) => {
    const m = minutesPerBadge(r);
    return m !== null && m < 15;
  };
  const fmt = (iso: string | null) =>
    iso ? new Date(iso).toLocaleString('es-CO', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'America/Bogota' }) : '—';

  const ranked = (rows ?? []).filter(r => r.badges > 0);
  const visible = showAll ? ranked : ranked.slice(0, CAMPAIGN_TOP);

  const downloadCsv = () => {
    const header = 'puesto,nombre,correo,badges,puntos,inicio,ultimo_badge,revisar';
    const lines = ranked.slice(0, CAMPAIGN_TOP).map(r =>
      [r.position, `"${r.name.replace(/"/g, '""')}"`, r.email, r.badges, r.score, r.startedAt ?? '', r.lastBadgeAt ?? '', suspicious(r) ? 'si' : ''].join(','),
    );
    const url = URL.createObjectURL(new Blob([[header, ...lines].join('\n')], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `ranking_top${CAMPAIGN_TOP}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-800/50 rounded-2xl p-4 md:p-6 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
        <h2 className="text-lg font-semibold">🏆 Ranking de la campaña (registro gratuito)</h2>
        {ranked.length > 0 && (
          <button onClick={downloadCsv} className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg px-3 py-1.5">
            ⬇ Top {CAMPAIGN_TOP} (CSV)
          </button>
        )}
      </div>
      <p className="text-slate-400 text-sm mb-4">
        {rows === null
          ? 'Cargando…'
          : `${rows.length} participantes · ${ranked.length} con al menos un badge. Corte: 31 oct, 23:59. ⚠️ = menos de 15 min por badge: revisar antes de anunciar.`}
      </p>
      {ranked.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-700">
                <th className="py-2 pr-3">#</th>
                <th className="py-2 pr-3">Nombre</th>
                <th className="py-2 pr-3">Correo</th>
                <th className="py-2 pr-3">Badges</th>
                <th className="py-2 pr-3">Puntos</th>
                <th className="py-2 pr-3">Inicio</th>
                <th className="py-2 pr-3">Último badge</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {visible.map(r => (
                <tr key={r.userId} className={`border-b border-slate-800 ${r.position <= CAMPAIGN_TOP ? '' : 'opacity-60'}`}>
                  <td className="py-2 pr-3 font-bold">{r.position}</td>
                  <td className="py-2 pr-3">{r.name}</td>
                  <td className="py-2 pr-3 text-slate-400">{r.email}</td>
                  <td className="py-2 pr-3">{r.badges}</td>
                  <td className="py-2 pr-3">{r.score}</td>
                  <td className="py-2 pr-3 text-slate-400">{fmt(r.startedAt)}</td>
                  <td className="py-2 pr-3 text-slate-400">{fmt(r.lastBadgeAt)}</td>
                  <td className="py-2" title="Ritmo inusualmente rápido">{suspicious(r) ? '⚠️' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {ranked.length > CAMPAIGN_TOP && (
            <button onClick={() => setShowAll(v => !v)} className="mt-3 text-sm text-blue-400 hover:underline">
              {showAll ? `Ver solo el top ${CAMPAIGN_TOP}` : `Ver los ${ranked.length} participantes con badges`}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

/** Vista previa (solo admin) de todos los badges y certificados, sin emitir nada en la base de datos. */
const BadgePreviewPanel: React.FC<{ paths: LearningPaths; viewerName: string }> = ({ paths, viewerName }) => {
  const [open, setOpen] = useState<{ cert: Certificate; title: string } | null>(null);
  const routeIds = FREE_ROUTE.filter(id => id in paths);
  const otherIds = Object.keys(paths).filter(id => !FREE_ROUTE.includes(id));
  const items = [
    ...routeIds.map(id => ({ id, title: cleanCourseTitle(paths[id].title) })),
    { id: ROUTE_CERTIFICATE_ID, title: ROUTE_CERTIFICATE_TITLE },
    ...otherIds.map(id => ({ id, title: cleanCourseTitle(paths[id].title) })),
  ];
  const year = new Date().getFullYear().toString();

  return (
    <div className="bg-slate-800/50 rounded-2xl p-4 md:p-6 mb-6">
      <h2 className="text-lg font-semibold mb-1">🎖️ Vista previa de badges y certificados</h2>
      <p className="text-slate-400 text-sm mb-4">Haz clic en un badge para ver el certificado y probar la descarga, tal como lo verá un estudiante. No se emite nada real.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {items.map(it => (
          <button
            key={it.id}
            onClick={() =>
              setOpen({
                cert: { code: 'VISTAPREVIA0', pathId: it.id, recipientName: viewerName, issuedAt: new Date().toISOString() },
                title: it.title,
              })
            }
            className="flex flex-col items-center gap-2 rounded-xl p-2 hover:bg-slate-700/40 transition-colors"
          >
            <BadgeSvg pathId={it.id} title={it.title} year={year} size={120} />
            <span className="text-xs text-slate-300 text-center leading-tight">{it.title}</span>
          </button>
        ))}
      </div>
      {open && <CredentialModal cert={open.cert} title={open.title} onClose={() => setOpen(null)} preview />}
    </div>
  );
};

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ paths, onExit, isAdmin, viewerName }) => {
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
        {isAdmin && <BulkCreatePanel onUsersCreated={loadStudents} />}
        {isAdmin && <RecentSignupsPanel />}
        {isAdmin && <CampaignRankingPanel />}
        {isAdmin && <BadgePreviewPanel paths={paths} viewerName={viewerName} />}
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
