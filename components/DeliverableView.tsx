import React, { useEffect, useMemo, useState } from 'react';
import type { DeliverableContent } from '../types';
import { getMyDeliverables, submitDeliverable } from '../deliverableService';

// Entregable escrito de un nivel del mapa. El borrador se guarda en este navegador mientras se
// escribe; al enviarlo queda en el servidor, que lo exige para emitir el badge del nivel.

interface Props {
  data: DeliverableContent;
  pathId: string;
  moduleId: string;
  onComplete?: () => void;
}

const draftKey = (pathId: string, id: string) => `entregable:${pathId}:${id}`;
const readDraft = (k: string): Record<string, string> | null => {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch { return null; }
};
const writeDraft = (k: string, v: Record<string, string>) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sin almacenamiento */ } };

const DeliverableView: React.FC<Props> = ({ data, pathId, moduleId, onComplete }) => {
  const key = draftKey(pathId, data.id);
  const empty = useMemo(() => Object.fromEntries(data.fields.map(f => [f.key, ''])), [data.fields]);
  const [values, setValues] = useState<Record<string, string>>(() => ({ ...empty, ...(readDraft(key) ?? {}) }));
  const [checks, setChecks] = useState<boolean[]>(() => data.rubric.map(() => false));
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getMyDeliverables(pathId).then(all => {
      if (cancelled) return;
      const mine = all[data.id];
      if (mine) {
        setSubmittedAt(mine.submittedAt);
        setValues(v => ({ ...v, ...mine.answers }));
        setChecks(data.rubric.map(() => true));
        onComplete?.();
      }
    });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathId, data.id]);

  const set = (k: string, v: string) => {
    setValues(prev => { const next = { ...prev, [k]: v }; writeDraft(key, next); return next; });
    setError('');
  };

  const filled = data.fields.filter(f => values[f.key].trim().length >= f.min).length;
  const allFilled = filled === data.fields.length;
  const allChecked = checks.every(Boolean);
  const locked = !!submittedAt && !editing;

  const send = async () => {
    if (!allFilled) { setError('Complete todos los campos hasta el mínimo indicado.'); return; }
    if (!allChecked) { setError('Revise su entregable con la rúbrica y marque cada punto antes de enviarlo.'); return; }
    setBusy(true); setError('');
    try {
      const at = await submitDeliverable(pathId, moduleId, data.id, values);
      setSubmittedAt(at); setEditing(false);
      onComplete?.();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  // Descarga en texto plano: sirve para el portafolio personal o para compartirlo con el equipo.
  const download = () => {
    const txt = [`# ${data.title}`, '', ...data.fields.flatMap(f => [`## ${f.label}`, values[f.key].trim(), ''])].join('\n');
    const url = URL.createObjectURL(new Blob([txt], { type: 'text/markdown;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = `${data.id}.md`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="my-6 rounded-2xl border border-fuchsia-500/40 bg-gradient-to-br from-fuchsia-950/40 to-slate-900/60 p-5 text-left space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-fuchsia-300">📎 Entregable obligatorio del nivel</p>
          <p className="text-xl font-bold text-white mt-1">{data.title}</p>
          <p className="text-sm text-slate-300 mt-1">{data.description}</p>
        </div>
        {submittedAt ? (
          <span className="shrink-0 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-xs font-bold px-3 py-1.5">
            ✅ Entregado el {new Date(submittedAt).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })}
          </span>
        ) : (
          <span className="shrink-0 rounded-full bg-slate-800 border border-slate-600 text-slate-300 text-xs font-bold px-3 py-1.5 tabular-nums">
            {filled}/{data.fields.length} campos listos
          </span>
        )}
      </div>

      {data.context && <p className="text-sm text-sky-100 bg-sky-500/10 border border-sky-500/30 rounded-xl px-4 py-3 whitespace-pre-line">{data.context}</p>}

      <div className="space-y-3">
        {data.fields.map((f, i) => {
          const len = values[f.key].trim().length;
          const ok = len >= f.min;
          return (
            <div key={f.key} className="bg-slate-950/60 border border-slate-700 rounded-xl p-3">
              <label htmlFor={`${data.id}-${f.key}`} className="flex items-center gap-2 text-sm font-bold text-white">
                <span className={`inline-grid place-items-center w-6 h-6 rounded-full text-xs ${ok ? 'bg-emerald-400 text-slate-900' : 'bg-slate-700 text-slate-200'}`}>{ok ? '✓' : i + 1}</span>
                {f.label}
              </label>
              <p className="text-xs text-slate-400 mt-1 mb-2">{f.hint}</p>
              <textarea
                id={`${data.id}-${f.key}`}
                value={values[f.key]}
                onChange={e => set(f.key, e.target.value)}
                readOnly={locked}
                rows={f.rows ?? 4}
                placeholder={f.example ? `Ejemplo: ${f.example}` : undefined}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 read-only:opacity-80"
              />
              <p className={`text-[11px] mt-1 text-right tabular-nums ${ok ? 'text-emerald-300' : 'text-slate-500'}`}>
                {ok ? '✓ Suficiente' : `${len} de ${f.min} caracteres mínimos`}
              </p>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
        <p className="text-sm font-bold text-amber-200 mb-2">🔍 Antes de enviar, revíselo con la rúbrica</p>
        <ul className="space-y-2">
          {data.rubric.map((r, i) => (
            <li key={i}>
              <label className="flex items-start gap-2 text-sm text-slate-200 cursor-pointer">
                <input type="checkbox" checked={checks[i]} disabled={locked}
                  onChange={e => setChecks(c => c.map((x, k) => (k === i ? e.target.checked : x)))}
                  className="mt-0.5 h-4 w-4 accent-emerald-500" />
                <span>{r}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {error && <p className="text-sm text-rose-200 bg-rose-500/10 border border-rose-500/40 rounded-lg px-3 py-2" role="alert">{error}</p>}

      <div className="flex flex-wrap gap-2">
        {locked ? (
          <button type="button" onClick={() => setEditing(true)} className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold">✏️ Mejorar mi entregable</button>
        ) : (
          <button type="button" onClick={send} disabled={busy} className="px-5 py-2.5 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 disabled:opacity-50 text-white text-sm font-bold">
            {busy ? 'Enviando…' : submittedAt ? '💾 Guardar la nueva versión' : '🚀 Enviar entregable'}
          </button>
        )}
        <button type="button" onClick={download} className="px-4 py-2 rounded-lg border border-slate-600 hover:border-slate-400 text-slate-200 text-sm">⬇ Descargar (.md)</button>
      </div>
      <p className="text-xs text-slate-400">Su borrador se guarda solo en este navegador mientras escribe. Use datos ficticios o anonimizados: nunca información real de personas, claves ni datos internos de su organización.</p>
    </div>
  );
};

export default DeliverableView;
