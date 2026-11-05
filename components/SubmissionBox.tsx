import React, { useEffect, useRef, useState } from 'react';
import {
  listSubmissions, uploadSubmission, submissionUrl, deleteSubmission,
  SUBMISSION_ACCEPT, SUBMISSION_MAX_MB, SUBMISSION_MAX_FILES, GROUP_LABELS,
} from '../submissionService';
import type { Submission } from '../submissionService';
import { formatRelativeTime } from '../utils';

export interface SubmissionContext {
  pathId: string;
  moduleId: string;
  userId: string;
  /** Puede subir archivos (el registro gratuito no). */
  canSubmit: boolean;
  /** Docente, tutor o admin: ve las entregas de todos. */
  isStaff: boolean;
  isAdmin: boolean;
}

const sizeLabel = (b: number) => (b >= 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);

/** Caja de entrega de una actividad grupal. */
const SubmissionBox: React.FC<{ ctx: SubmissionContext; label: string; hint?: string }> = ({ ctx, label, hint }) => {
  const { pathId, moduleId, userId, canSubmit, isStaff, isAdmin } = ctx;
  const [items, setItems] = useState<Submission[] | null>(null);
  const [group, setGroup] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    setItems(null);
    listSubmissions(pathId, moduleId).then(s => { if (!cancelled) setItems(s); });
    return () => { cancelled = true; };
  }, [pathId, moduleId]);

  if (!canSubmit && !isStaff) return null;

  const mine = (items ?? []).filter(s => s.userId === userId);
  const others = (items ?? []).filter(s => s.userId !== userId);

  const onFile = async (file: File | undefined) => {
    setError(''); setOk('');
    if (!file) return;
    if (!group) { setError('Primero indique la letra de su grupo.'); return; }
    setBusy(true);
    try {
      const s = await uploadSubmission(pathId, moduleId, userId, file, group);
      setItems(prev => [s, ...(prev ?? [])]);
      setOk(`✅ "${s.fileName}" quedó entregado.`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const download = async (s: Submission) => {
    try { window.open(await submissionUrl(s), '_blank', 'noopener'); } catch (err) { alert((err as Error).message); }
  };

  const remove = async (s: Submission) => {
    if (!confirm(`¿Eliminar "${s.fileName}"?`)) return;
    try {
      await deleteSubmission(s);
      setItems(prev => (prev ?? []).filter(x => x.id !== s.id));
    } catch (err) { alert((err as Error).message); }
  };

  const row = (s: Submission, showAuthor: boolean) => (
    <li key={s.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 bg-slate-900/60 border border-slate-700/60 rounded-xl px-4 py-2.5">
      <span className="text-xl">📎</span>
      <span className="flex-grow min-w-0">
        <span className="block text-sm font-semibold text-white truncate">{s.fileName}</span>
        <span className="block text-xs text-slate-400">
          {s.groupLabel ? `Grupo ${s.groupLabel} · ` : ''}{showAuthor ? `${s.authorName} · ` : ''}{sizeLabel(s.sizeBytes)} · {formatRelativeTime(s.createdAt)}
        </span>
      </span>
      <button onClick={() => download(s)} className="text-sm text-sky-300 hover:underline">Descargar</button>
      {(s.userId === userId || isAdmin) && (
        <button onClick={() => remove(s)} className="text-sm text-rose-300/80 hover:text-rose-300">Eliminar</button>
      )}
    </li>
  );

  // Entregas de todos, agrupadas por grupo (vista docente).
  const byGroup = new Map<string, Submission[]>();
  for (const s of others) {
    const k = s.groupLabel ? `Grupo ${s.groupLabel}` : 'Sin grupo';
    byGroup.set(k, [...(byGroup.get(k) ?? []), s]);
  }
  const groupKeys = [...byGroup.keys()].sort();

  return (
    <div className="mt-6 bg-emerald-500/10 border border-emerald-500/40 rounded-2xl p-5 md:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-1">📤 Entregable</p>
      <h4 className="text-lg font-bold text-white mb-1">{label}</h4>
      {hint && <p className="text-sm text-slate-300 mb-4">{hint}</p>}

      {canSubmit && (
        <>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <label className="text-sm text-slate-200" htmlFor={`grupo-${moduleId}`}>Grupo</label>
            <select
              id={`grupo-${moduleId}`}
              value={group}
              onChange={e => setGroup(e.target.value)}
              className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white"
            >
              <option value="">Elija…</option>
              {GROUP_LABELS.map(g => <option key={g} value={g}>Grupo {g}</option>)}
            </select>
            <input ref={inputRef} type="file" accept={SUBMISSION_ACCEPT} className="hidden" onChange={e => onFile(e.target.files?.[0])} />
            <button
              onClick={() => (group ? inputRef.current?.click() : setError('Primero indique la letra de su grupo.'))}
              disabled={busy || mine.length >= SUBMISSION_MAX_FILES}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold rounded-xl px-5 py-2 text-sm"
            >
              {busy ? 'Subiendo…' : 'Subir archivo'}
            </button>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            PDF, Word, PowerPoint, Excel o imagen · hasta {SUBMISSION_MAX_MB} MB · máximo {SUBMISSION_MAX_FILES} archivos. Basta con que una persona del grupo lo suba. Solo lo ven usted y los docentes.
          </p>
          {error && <p className="text-sm text-rose-300 mb-3">{error}</p>}
          {ok && <p className="text-sm text-emerald-300 mb-3">{ok}</p>}
          {items === null ? (
            <p className="text-sm text-slate-400">Cargando…</p>
          ) : mine.length > 0 ? (
            <>
              <p className="text-sm font-semibold text-slate-200 mb-2">Sus entregas</p>
              <ul className="space-y-2 mb-2">{mine.map(s => row(s, false))}</ul>
            </>
          ) : (
            <p className="text-sm text-slate-400">Todavía no ha entregado nada en esta actividad.</p>
          )}
        </>
      )}

      {isStaff && (
        <div className="mt-5 pt-4 border-t border-emerald-500/30">
          <p className="text-sm font-bold text-emerald-200 mb-2">
            👩‍🏫 Entregas recibidas {items ? `· ${others.length} ${others.length === 1 ? 'archivo' : 'archivos'} de ${groupKeys.filter(k => k !== 'Sin grupo').length} grupos` : ''}
          </p>
          {items === null ? (
            <p className="text-sm text-slate-400">Cargando…</p>
          ) : others.length === 0 ? (
            <p className="text-sm text-slate-400">Aún no hay entregas de estudiantes.</p>
          ) : (
            groupKeys.map(k => (
              <div key={k} className="mb-3">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-200 mb-1.5">{k}</p>
                <ul className="space-y-2">{byGroup.get(k)!.map(s => row(s, true))}</ul>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SubmissionBox;
