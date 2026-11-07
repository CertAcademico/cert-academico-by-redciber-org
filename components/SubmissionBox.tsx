import React, { useEffect, useRef, useState } from 'react';
import {
  listSubmissions, uploadSubmission, submissionUrl, deleteSubmission,
  getRoster, setMyGroup, syncMyDeliverableXp, getMilestoneStatus,
  getGroupProgress, listStarredGroups, toggleGroupStar,
  SUBMISSION_ACCEPT, SUBMISSION_MAX_MB, SUBMISSION_MAX_FILES, GROUP_LABELS,
} from '../submissionService';
import { NotEnabledError } from '../submissionService';
import type { Submission, RosterEntry, MilestoneStatus } from '../submissionService';
import { issueCertificate } from '../certificateService';
import { milestonesForModule, DELIVERABLE_XP, STAR_XP } from '../milestones';
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
  /** El estudiante ya completó esta sesión (primera estrella). */
  sessionCompleted?: boolean;
  /** Avisa que cambió el XP o las estrellas (para refrescar la barra lateral). */
  onProgressChange?: () => void;
}

/** Tres estrellas: llenas las ganadas. */
export const Stars: React.FC<{ earned: boolean[]; size?: string }> = ({ earned, size = 'text-base' }) => (
  <span className={`${size} tracking-tight`} aria-label={`${earned.filter(Boolean).length} de ${earned.length} estrellas`}>
    {earned.map((e, i) => <span key={i} className={e ? 'text-amber-300' : 'text-slate-600'}>{e ? '★' : '☆'}</span>)}
  </span>
);

const sizeLabel = (b: number) => (b >= 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);

/** Caja de entrega de una actividad grupal: grupo, archivos, XP y badge de alcance. */
const SubmissionBox: React.FC<{ ctx: SubmissionContext; label: string; hint?: string }> = ({ ctx, label, hint }) => {
  const { pathId, moduleId, userId, canSubmit, isStaff, isAdmin, sessionCompleted = false, onProgressChange } = ctx;
  const [items, setItems] = useState<Submission[] | null>(null);
  const [roster, setRoster] = useState<RosterEntry[]>([]);
  const [statuses, setStatuses] = useState<Record<string, MilestoneStatus>>({});
  const [badges, setBadges] = useState<Record<string, string>>({});
  const [starred, setStarred] = useState(false);
  const [deliveredByGroup, setDeliveredByGroup] = useState(false);
  const [starredGroups, setStarredGroups] = useState<string[]>([]);
  const [changingGroup, setChangingGroup] = useState(false);
  const [pendingGroup, setPendingGroup] = useState('');
  const [savingGroup, setSavingGroup] = useState(false);
  const [notEnabled, setNotEnabled] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const milestones = milestonesForModule(pathId, moduleId);

  // Badges: se emiten solos en cuanto se cumplen los requisitos (el servidor los valida).
  const refreshMilestones = () => {
    if (!canSubmit) return;
    for (const [id] of milestones) {
      getMilestoneStatus(id).then(st => {
        if (!st) return;
        setStatuses(prev => ({ ...prev, [id]: st }));
        if (st.eligible) {
          issueCertificate(id).then(c => setBadges(prev => ({ ...prev, [id]: c.code }))).catch(() => undefined);
        }
      });
    }
  };

  const refreshMeta = () => {
    getRoster(pathId).then(setRoster);
    if (canSubmit) getGroupProgress(pathId).then(gp => {
      setStarred(!!gp?.starred.includes(moduleId));
      setDeliveredByGroup(!!gp?.delivered.includes(moduleId));
    });
    if (isStaff) listStarredGroups(pathId, moduleId).then(setStarredGroups);
    refreshMilestones();
    onProgressChange?.();
  };

  useEffect(() => {
    let cancelled = false;
    setItems(null);
    setNotEnabled(false);
    listSubmissions(pathId, moduleId)
      .then(s => { if (!cancelled) setItems(s); })
      .catch(err => { if (!cancelled) { setItems([]); if (err instanceof NotEnabledError) setNotEnabled(true); } });
    if (canSubmit) syncMyDeliverableXp(pathId).catch(() => undefined);
    refreshMeta();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathId, moduleId]);

  // Al completar la sesión (quiz aprobado), revisar de nuevo los badges.
  useEffect(() => {
    if (sessionCompleted) refreshMilestones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionCompleted]);

  if (!canSubmit && !isStaff) return null;

  const myGroup = roster.find(r => r.isMe)?.groupLabel ?? null;
  const mates = myGroup ? roster.filter(r => r.groupLabel === myGroup) : [];
  const mine = (items ?? []).filter(s => s.userId === userId);
  // Lo que subió cualquier integrante del grupo cuenta para todos.
  const groupDelivered = !!myGroup && (deliveredByGroup || (items ?? []).some(s => s.groupLabel === myGroup));
  const others = (items ?? []).filter(s => s.userId !== userId);
  const teamFiles = myGroup ? others.filter(s => s.groupLabel === myGroup) : [];

  const chooseGroup = async () => {
    const g = pendingGroup;
    if (!g) { setError('Elija la letra de su grupo.'); return; }
    if (myGroup && !confirm(`¿Cambiarse al Grupo ${g}? Recibirá el XP de las entregas de ese grupo y dejará de recibir el del Grupo ${myGroup}.`)) return;
    setError(''); setOk('');
    setSavingGroup(true);
    try {
      await setMyGroup(pathId, g);
      // Muestra el grupo de inmediato, sin esperar a recargar la lista de integrantes.
      setRoster(prev => [...prev.filter(r => !r.isMe), { groupLabel: g, memberName: 'Usted', isMe: true }]);
      setChangingGroup(false);
      setPendingGroup('');
      setOk(`✅ Quedó en el Grupo ${g}.`);
      refreshMeta();
      listSubmissions(pathId, moduleId).then(setItems).catch(() => undefined);
    } catch (err) {
      if (err instanceof NotEnabledError) setNotEnabled(true);
      setError((err as Error).message);
    } finally {
      setSavingGroup(false);
    }
  };

  // Se pueden elegir varios archivos a la vez; se suben uno tras otro hasta el máximo permitido.
  const onFiles = async (list: FileList | null) => {
    setError(''); setOk('');
    const files = Array.from(list ?? []).slice(0, Math.max(0, SUBMISSION_MAX_FILES - mine.length));
    if (!files.length) return;
    setBusy(true);
    const done: string[] = [];
    let group = '';
    try {
      for (const file of files) {
        const s = await uploadSubmission(pathId, moduleId, userId, file);
        setItems(prev => [s, ...(prev ?? [])]);
        done.push(`"${s.fileName}"`);
        group = s.groupLabel ?? group;
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      if (done.length) {
        setOk(`✅ ${done.join(' y ')} ${done.length > 1 ? 'quedaron entregados' : 'quedó entregado'}. Cada integrante del Grupo ${group} recibe ${DELIVERABLE_XP} XP por esta sesión.`);
        refreshMeta();
      }
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

  const toggleStar = async (g: string) => {
    try {
      const on = await toggleGroupStar(pathId, moduleId, g);
      setStarredGroups(prev => (on ? [...prev, g] : prev.filter(x => x !== g)));
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

  // Vista docente: grupos con sus integrantes y sus entregas.
  const staffGroups = [...new Set([...roster.map(r => r.groupLabel), ...others.map(s => s.groupLabel ?? '—')])].sort();

  const groupSelect = (
    <>
      <select
        value={pendingGroup}
        onChange={e => { setPendingGroup(e.target.value); setError(''); }}
        className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white"
        aria-label="Elegir grupo"
      >
        <option value="">Elija su grupo…</option>
        {GROUP_LABELS.filter(g => g !== myGroup).map(g => <option key={g} value={g}>Grupo {g}</option>)}
      </select>
      <button
        onClick={chooseGroup}
        disabled={!pendingGroup || savingGroup}
        className="bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-900 font-bold rounded-xl px-4 py-2 text-sm"
      >
        {savingGroup ? 'Guardando…' : 'Guardar grupo'}
      </button>
    </>
  );

  return (
    <div className="mt-6 bg-emerald-500/10 border border-emerald-500/40 rounded-2xl p-5 md:p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-1">📤 Entregable · +{DELIVERABLE_XP} XP para cada integrante del grupo</p>
      <h4 className="text-lg font-bold text-white mb-1">{label}</h4>
      {hint && <p className="text-sm text-slate-300 mb-4">{hint}</p>}

      {notEnabled && (
        <p className="text-sm text-amber-200 bg-amber-500/10 border border-amber-500/40 rounded-xl px-4 py-3 mb-4">
          ⚠️ La entrega de archivos aún no está activada en el servidor.{' '}
          {isStaff ? 'Falta ejecutar la migración supabase/migrations/2026-11-05_entregables_actividades.sql en Supabase → SQL Editor.' : 'Avise al docente.'}
        </p>
      )}

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
                <input ref={inputRef} type="file" multiple accept={SUBMISSION_ACCEPT} className="hidden" onChange={e => onFiles(e.target.files)} />
                <button
                  onClick={() => inputRef.current?.click()}
                  disabled={busy || mine.length >= SUBMISSION_MAX_FILES}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold rounded-xl px-5 py-2 text-sm"
                >
                  {busy ? 'Subiendo…' : 'Subir archivos'}
                </button>
                {groupDelivered && <span className="text-sm text-emerald-300">✅ Su grupo ya entregó esta sesión</span>}
              </div>
              <p className="text-xs text-slate-400 mb-3">
                PDF, Word, PowerPoint, Excel o imagen · hasta {SUBMISSION_MAX_MB} MB · máximo {SUBMISSION_MAX_FILES} archivos. Cualquier integrante puede subirlo y basta con una entrega: todos reciben el XP, las estrellas y el badge. Lo ven su grupo y los docentes.
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
          {items !== null && !isStaff && teamFiles.length > 0 && (
            <>
              <p className="text-sm font-semibold text-slate-200 mb-2">Subidos por su grupo</p>
              <ul className="space-y-2 mb-2">{teamFiles.map(s => row(s, true))}</ul>
            </>
          )}

          {/* Estrellas de la sesión */}
          {myGroup && (
            <div className="mt-4 bg-slate-900/50 rounded-xl p-4">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <Stars earned={[sessionCompleted, groupDelivered, starred]} size="text-2xl" />
                <span className="text-sm font-bold text-white">Estrellas de esta sesión</span>
              </div>
              <ul className="text-sm text-slate-300 space-y-0.5">
                <li>{sessionCompleted ? '★' : '☆'} Completar la sesión (aprobar el quiz) · 10 XP</li>
                <li>{groupDelivered ? '★' : '☆'} Su grupo sube el entregable · +{DELIVERABLE_XP} XP cada integrante</li>
                <li>{starred ? '★' : '☆'} El docente destaca la entrega del grupo · +{STAR_XP} XP cada integrante</li>
              </ul>
            </div>
          )}

          {/* Badges de la sesión y de la fase */}
          {milestones.map(([id, m]) => {
            const st = statuses[id];
            if (!st) return null;
            const code = badges[id];
            return (
              <div key={id} className="mt-3 bg-amber-500/10 border border-amber-500/40 rounded-xl p-4">
                <p className="text-sm font-bold text-amber-200 mb-1">🏅 {m.title}</p>
                {code ? (
                  <p className="text-sm text-emerald-300">¡Badge obtenido! Código <strong>{code}</strong>. Está con sus demás badges en el panel de inicio.</p>
                ) : (
                  <ul className="text-sm text-slate-200 space-y-0.5">
                    <li>{st.modulesDone >= st.modulesTotal ? '✅' : '⬜'} {st.modulesTotal === 1 ? 'Sesión completada por usted' : `Sesiones completadas por usted: ${st.modulesDone} de ${st.modulesTotal}`}</li>
                    <li>{st.delivered >= st.deliverablesTotal ? '✅' : '⬜'} {st.deliverablesTotal === 1 ? 'Entrega de su grupo' : `Entregas de su grupo: ${st.delivered} de ${st.deliverablesTotal}`}</li>
                  </ul>
                )}
              </div>
            );
          })}
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
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-200">
                      Grupo {g} {files.length > 0 ? '· ✅ entregó' : '· ⏳ sin entrega'}
                    </p>
                    {files.length > 0 && g !== '—' && (
                      <button
                        onClick={() => toggleStar(g)}
                        className={`text-xs rounded-lg px-2.5 py-1 border ${starredGroups.includes(g) ? 'bg-amber-400 text-slate-900 border-amber-300 font-bold' : 'text-amber-200 border-amber-500/50 hover:bg-amber-500/10'}`}
                        title={`Destacar da +${STAR_XP} XP a cada integrante del grupo`}
                      >
                        {starredGroups.includes(g) ? '★ Destacada' : '☆ Destacar'}
                      </button>
                    )}
                  </div>
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
