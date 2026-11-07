import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { listSubmissions, submissionUrl, type Submission } from '../submissionService';

// Panel del docente para la audiencia simulada: cada sala con sus dos grupos, lo que entregaron
// durante el día y la carta que le conviene jugar al rival según sus retos y entregas.
const PATH = 'prueba_digital';
const SALAS: [string, string][] = [['A', 'B'], ['C', 'D'], ['E', 'F']];
const EVIDENCIA: Record<string, string> = {
  A: 'Chat de WhatsApp', B: 'Correo del falso proveedor', C: 'Transferencia bancaria',
  D: 'Computador de la caja', E: 'Correo en la nube', F: 'Publicación en redes',
};
const MODULES: { id: string; label: string }[] = [
  { id: 'pd_b2', label: 'Ficha (B2)' },
  { id: 'pd_b4', label: 'Ruta procesal (B4)' },
  { id: 'pd_b5', label: 'Custodia y auditoría (B5)' },
  { id: 'pd_b6', label: 'Semáforo (B6)' },
];

type Scores = Record<string, { b4: number | null; b6: number | null }>;

const pct = (sc: unknown) => {
  const s = sc as { score?: number; maxScore?: number } | undefined;
  return s && s.maxScore ? (100 * (s.score ?? 0)) / s.maxScore : null;
};
const avg = (xs: (number | null)[]) => {
  const v = xs.filter((x): x is number => x !== null);
  return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : null;
};

function cartaContra(g: string, scores: Scores, files: Record<string, Submission[]>): string {
  const sc = scores[g];
  if (!files[`${g}:pd_b5`]?.length) return 'No entregó su registro de custodia: ataque la continuidad y el registro (arts. 254 y 273).';
  if (sc?.b4 !== null && sc?.b4 !== undefined && sc.b4 < 70) return 'Flojo en control judicial: pida la exclusión en la preparatoria (arts. 23, 359 y 360).';
  if (sc?.b6 !== null && sc?.b6 !== undefined && sc.b6 < 70) return 'Flojo en licitud y valoración: ataque la licitud y el valor del pantallazo.';
  return 'Sólido en los retos: vaya por el eslabón roto de su auditoría y el perito (arts. 393 y 403).';
}

const HearingPanel: React.FC = () => {
  const [files, setFiles] = useState<Record<string, Submission[]> | null>(null);
  const [scores, setScores] = useState<Scores>({});
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const byKey: Record<string, Submission[]> = {};
      for (const m of MODULES) {
        for (const s of await listSubmissions(PATH, m.id)) {
          const k = `${s.groupLabel ?? '—'}:${m.id}`;
          (byKey[k] ??= []).push(s);
        }
      }
      setFiles(byKey);
      const [{ data: groups }, { data: progress }] = await Promise.all([
        supabase.from('course_groups').select('user_id, group_label').eq('path_id', PATH),
        supabase.from('course_progress').select('user_id, scores').eq('path_id', PATH),
      ]);
      const byUser = new Map((progress ?? []).map((p: { user_id: string; scores: Record<string, unknown> }) => [p.user_id, p.scores ?? {}]));
      const acc: Record<string, { b4: (number | null)[]; b6: (number | null)[] }> = {};
      for (const g of (groups ?? []) as { user_id: string; group_label: string }[]) {
        const sc = byUser.get(g.user_id) ?? {};
        (acc[g.group_label] ??= { b4: [], b6: [] });
        acc[g.group_label].b4.push(pct(sc['pd_b4']));
        acc[g.group_label].b6.push(pct(sc['pd_b6']));
      }
      setScores(Object.fromEntries(Object.entries(acc).map(([g, v]) => [g, { b4: avg(v.b4), b6: avg(v.b6) }])));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => { load(); }, []);

  const open = async (s: Submission) => {
    try { window.open(await submissionUrl(s), '_blank', 'noopener'); } catch (err) { alert((err as Error).message); }
  };

  const groupCard = (g: string, rival: string) => (
    <div key={g} className="flex-1 min-w-[260px] bg-slate-900/70 border border-slate-700 rounded-xl p-4">
      <p className="font-bold text-white">Grupo {g} <span className="text-slate-400 font-normal">· {EVIDENCIA[g]}</span></p>
      <p className="text-xs text-slate-400 mt-1">
        Retos: control judicial (B4) {scores[g]?.b4 ?? '—'}{scores[g]?.b4 != null ? ' %' : ''} · admisibilidad (B6) {scores[g]?.b6 ?? '—'}{scores[g]?.b6 != null ? ' %' : ''}
      </p>
      <ul className="mt-3 space-y-1.5">
        {MODULES.map(m => {
          const list = files?.[`${g}:${m.id}`] ?? [];
          return (
            <li key={m.id} className="text-sm">
              <span className="text-slate-300">{m.label}: </span>
              {list.length === 0 ? <span className="text-rose-300">sin entrega</span> : list.map(s => (
                <button key={s.id} onClick={() => open(s)} className="mr-2 text-sky-300 hover:underline" title={s.fileName}>
                  📎 {s.fileName.length > 28 ? s.fileName.slice(0, 26) + '…' : s.fileName}
                </button>
              ))}
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-sm bg-amber-500/10 border border-amber-500/40 text-amber-100 rounded-lg px-3 py-2">
        🃏 Carta para el Grupo {rival}: {cartaContra(g, scores, files ?? {})}
      </p>
    </div>
  );

  return (
    <div className="my-6 bg-violet-500/10 border border-violet-500/40 rounded-2xl p-5 text-left">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
        <p className="text-lg font-bold text-white">🎯 Panel de la audiencia (solo docentes)</p>
        <button onClick={load} className="text-xs rounded-lg px-3 py-1.5 border border-violet-400/60 text-violet-100 hover:bg-violet-500/20">🔄 Actualizar</button>
      </div>
      <p className="text-sm text-slate-300 mb-4">Abra las entregas de cada grupo con un clic. No lo proyecte: cada grupo ya ve su carta secreta en su propia pantalla. Úselo para seguir la audiencia y resolver polémicas.</p>
      {error && <p className="text-sm text-rose-300 mb-3">{error}</p>}
      {files === null ? <p className="text-sm text-slate-400">Cargando…</p> : SALAS.map(([x, y], i) => (
        <div key={i} className="mb-4">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-200 mb-2">Sala {i + 1} · Grupo {x} contra Grupo {y}</p>
          <div className="flex flex-wrap gap-3">{groupCard(x, y)}{groupCard(y, x)}</div>
        </div>
      ))}
    </div>
  );
};

export default HearingPanel;
