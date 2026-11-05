import React, { useEffect, useRef, useState } from 'react';
import {
  listSubmissions, uploadSubmission, submissionUrl, deleteSubmission,
  getRoster, setMyGroup, syncMyDeliverableXp, getMilestoneStatus,
  SUBMISSION_ACCEPT, SUBMISSION_MAX_MB, SUBMISSION_MAX_FILES, GROUP_LABELS,
} from '../submissionService';
import type { Submission, RosterEntry, MilestoneStatus } from '../submissionService';
import { issueCertificate } from '../certificateService';
import { milestoneForModule, DELIVERABLE_XP } from '../milestones';
import { formatRelativeTime } from '../utils';

export interface SubmissionContext {
  pathId: string;
  moduleId: string;
  userId: string;
  /** Puede subir archivos (el registro gratuito no). */
  canSubmit: boolean;
  /** Docente, tutor o admin: ve las entregas y los grupos de todos. */
  isStaff: boolean;
  isAdmin: boolean;
}

const sizeLabel = (b: number) => (b >= 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);

/** Caja de entrega de una actividad grupal: grupo, archivos, XP y badge de alcance. */
const SubmissionBox: React.FC<{ ctx: SubmissionContext; label: string; hint?: string }> = ({ ctx, label, hint }) => {
  const { pathId, moduleId, userId, canSubmit, isStaff, isAdmin } = ctx;
  const [items, setItems] = useState<Submission[] | null>(null);
  const [roster, setRoster] = useState<RosterEntry[]>([]);
  const [milestone, setMilestone] = useState<MilestoneStatus | null>(null);
  const [badgeCode, setBadgeCode] = useState('');
  const [changingGroup, setChangingGroup] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const ms = milestoneForModule(pathId, moduleId);

  const refreshMeta = () => {
    getRoster(pathId).then(setRoster);
    if (ms && canSubmit) getMilestoneStatus(ms[0]).then(setMilestone);
  };

  useEffect(() => {
    let cancelled = false;
    setItems(null);
    listSubmissions(pathId, moduleId).then(s => { if (!cancelled) setItems(s); });
    if (canSubmit) syncMyDeliverableXp(pathId).catch(() => undefined);
    refreshMeta();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathId, moduleId]);

  if (!canSubmit && !isStaff) return null;

  const myGroup = roster.find(r => r.isMe)?.groupLabel ?? null;
  const mates = myGroup ? roster.filter(r => r.groupLabel === myGroup) : [];
  const mine = (items ?? []).filter(s => s.userId === userId);
  const groupDelivered = !!myGroup && (items ?? []).some(s => s.groupLabel === myGroup);
  const others = (items ?? []).filter(s => s.userId !== userId);

  const chooseGroup = async (g: string) => {
    if (!g) return;
    if (myGroup && !confirm(`¿Cambiarse al Grupo ${g}? Recibirá el XP de las entregas de ese grupo y dejará de recibir el del Grupo ${myGroup}.`)) return;
    setError('');
    try {
      await setMyGroup(pathId, g);
      setChangingGroup(false);
      refreshMeta();
      listSubmissions(pathId, moduleId).then(setItems);
    } catch (err) { setError((err as Error).message); }
  };

  const onFile = async (file: File | undefined) => {
    setError(''); setOk('');
    if (!file) return;
    setBusy(true);
    try {
      const s = await uploadSubmission(pathId, moduleId, userId, file);
      setItems(prev => [s, ...(prev ?? [])]);
      setOk(`✅ "${s.fileName}" quedó entregado. Cada integrante del Grupo ${s.groupLabel} recibe ${DELIVERABLE_XP} XP por esta sesión.`);
      refreshMeta();
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
    if (!confirm(`¿Eliminar "${s.fileName}"? Si era la única entrega del grupo en esta sesión, el grupo pierde su XP.`)) return;
    try {
      await deleteSubmission(s);
      setItems(prev => (prev ?? []).filter(x => x.id !== s.id));
      refreshMeta();
    } catch (err) { alert((err as Error).message); }
  };

  const claimBadge = async () => {
    if (!ms) return;
    setError('');
    try {
      const cert = await issueCertificate(ms[0]);
      setBadgeCode(cert.code);
    } catch (err) { setError((err as Error).message); }
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

  // Vista docente: grupos con sus integrantes y sus entregas.
  const staffGroups = [...new Set([...roster.map(r => r.groupLabel), ...others.map(s => s.groupLabel ?? '—')])].sort();

  const groupSelect = (
    <select
      defaultValue=""
      onChange={e => chooseGroup(e.target.value)}
      className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white"
      aria-label="Elegir grupo"
    >
      <option value="" disabled>Elija su grupo…</option>
      {GROUP_LABELS.filter(g => g !== myGroup).map(g => <option key={g} value={g}>Grupo {g}</option>)}
    </select>
  );

  return (
    <div className="mt-6 bg-emerald-500/10 border border-emerald-500/40 rounded-2xl p-5 md:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-1">📤 Entregable · +{DELIVERABLE_XP} XP para cada integrante del grupo</p>
      <h4 className="text-lg font-bold text-white mb-1">{label}</h4>
      {hint && <p className="text-sm text-slate-300 mb-4">{hint}</p>}

      {canSubmit && (
        <>
          {/* Grupo */}
          <div className="bg-slate-900/50 rounded-xl p-3 mb-4">
            {myGroup && !changingGroup ? (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-sm font-bold text-amber-200">👥 Grupo {myGroup}</span>
                <span className="text-sm text-slate-300 flex-grow">{mates.map(m => (m.isMe ? `${m.memberName} (tú)` : m.memberName)).join(' · ')}</span>
                <button onClick={() => setChangingGroup(true)} className="text-xs text-slate-400 hover:text-white underline">Cambiar</button>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-slate-200">{myGroup ? 'Cambiar de grupo:' : 'Primero indiquen su grupo (lo eligen una vez para todo el curso):'}</span>
                {groupSelect}
                {myGroup && <button onClick={() => setChangingGroup(false)} className="text-xs text-slate-400 hover:text-white">Cancelar</button>}
              </div>
            )}
          </div>

          {myGroup && (
            <>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <input ref={inputRef} type="file" accept={SUBMISSION_ACCEPT} className="hidden" onChange={e => onFile(e.target.files?.[0])} />
                <button
                  onClick={() => inputRef.current?.click()}
                  disabled={busy || mine.length >= SUBMISSION_MAX_FILES}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold rounded-xl px-5 py-2 text-sm"
                >
                  {busy ? 'Subiendo…' : 'Subir archivo'}
                </button>
                {groupDelivered && <span className="text-sm text-emerald-300">✅ Su grupo ya entregó esta sesión</span>}
              </div>
              <p className="text-xs text-slate-400 mb-3">
                PDF, Word, PowerPoint, Excel o imagen · hasta {SUBMISSION_MAX_MB} MB · máximo {SUBMISSION_MAX_FILES} archivos. Basta con que una persona del grupo lo suba: todos reciben el XP. Solo lo ven usted y los docentes.
              </p>
            </>
          )}
          {error && <p className="text-sm text-rose-300 mb-3">{error}</p>}
          {ok && <p className="text-sm text-emerald-300 mb-3">{ok}</p>}
          {items !== null && mine.length > 0 && (
            <>
              <p className="text-sm font-semibold text-slate-200 mb-2">Sus archivos</p>
              <ul className="space-y-2 mb-2">{mine.map(s => row(s, false))}</ul>
            </>
          )}

          {/* Badge de alcance */}
          {ms && milestone && (
            <div className="mt-4 bg-amber-500/10 border border-amber-500/40 rounded-xl p-4">
              <p className="text-sm font-bold text-amber-200 mb-2">🏅 Badge de alcance: {ms[1].title}</p>
              {badgeCode ? (
                <p className="text-sm text-emerald-300">¡Badge obtenido! Código de verificación <strong>{badgeCode}</strong>. Lo verá con sus demás badges en el panel de inicio.</p>
              ) : (
                <>
                  <ul className="text-sm text-slate-200 space-y-1 mb-3">
                    <li>{milestone.modulesDone >= milestone.modulesTotal ? '✅' : '⬜'} Sesiones completadas por usted: {milestone.modulesDone} de {milestone.modulesTotal}</li>
                    <li>{milestone.delivered >= milestone.deliverablesTotal ? '✅' : '⬜'} Entregas de su grupo: {milestone.delivered} de {milestone.deliverablesTotal}</li>
                  </ul>
                  <button
                    onClick={claimBadge}
                    disabled={!milestone.eligible}
                    className="bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-900 font-bold rounded-xl px-5 py-2 text-sm"
                  >
                    {milestone.eligible ? 'Obtener mi badge' : 'Aún no disponible'}
                  </button>
                </>
              )}
            </div>
          )}
        </>
      )}

      {isStaff && (
        <div className="mt-5 pt-4 border-t border-emerald-500/30">
          <p className="text-sm font-bold text-emerald-200 mb-2">
            👩‍🏫 Grupos y entregas {items ? `· ${new Set(others.map(s => s.groupLabel)).size} de ${GROUP_LABELS.length} grupos entregaron` : ''}
          </p>
          {items === null ? (
            <p className="text-sm text-slate-400">Cargando…</p>
          ) : staffGroups.length === 0 ? (
            <p className="text-sm text-slate-400">Aún no hay grupos ni entregas.</p>
          ) : (
            staffGroups.map(g => {
              const members = roster.filter(r => r.groupLabel === g).map(r => r.memberName);
              const files = others.filter(s => (s.groupLabel ?? '—') === g);
              return (
                <div key={g} className="mb-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-200 mb-1">
                    Grupo {g} {files.length > 0 ? '· ✅ entregó' : '· ⏳ sin entrega'}
                  </p>
                  {members.length > 0 && <p className="text-xs text-slate-400 mb-1.5">{members.join(' · ')}</p>}
                  {files.length > 0 && <ul className="space-y-2">{files.map(s => row(s, true))}</ul>}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default SubmissionBox;
