import React, { useState } from 'react';
import type { QuickVoteContent } from '../types';

// Ronda relámpago: una frase a la vez, dos botones grandes y la explicación inmediata.
// Pensada para el celular y para jugar en grupo mientras el docente lee en voz alta.
const QuickVoteView: React.FC<{ data: QuickVoteContent; onComplete?: (score: number, maxScore: number) => void }> = ({ data, onComplete }) => {
  const { items, options } = data;
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<'a' | 'b' | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [done, setDone] = useState(false);

  const item = items[i];
  const ok = picked !== null && picked === item.answer;

  const choose = (k: 'a' | 'b') => {
    if (picked) return;
    setPicked(k);
    if (k === item.answer) { setScore(s => s + 1); setStreak(s => s + 1); } else setStreak(0);
  };

  const next = () => {
    if (i < items.length - 1) { setI(i + 1); setPicked(null); return; }
    setDone(true);
    onComplete?.(score * 10, items.length * 10);
  };

  const restart = () => { setI(0); setPicked(null); setScore(0); setStreak(0); setDone(false); };

  const btn = (k: 'a' | 'b') => {
    const o = options[k];
    const base = 'flex-1 min-h-[88px] rounded-2xl border-2 text-lg md:text-xl font-black flex flex-col items-center justify-center gap-1 transition-transform active:scale-95';
    let cls = k === 'a' ? 'bg-emerald-500/15 border-emerald-400/60 text-emerald-100 hover:bg-emerald-500/25' : 'bg-rose-500/15 border-rose-400/60 text-rose-100 hover:bg-rose-500/25';
    if (picked) cls = k === item.answer ? 'bg-emerald-500 border-emerald-300 text-white' : picked === k ? 'bg-rose-600 border-rose-400 text-white opacity-90' : 'bg-slate-800 border-slate-700 text-slate-500';
    return (
      <button type="button" onClick={() => choose(k)} disabled={!!picked} className={`${base} ${cls}`}>
        <span className="text-3xl" aria-hidden="true">{o.emoji}</span>
        {o.label}
      </button>
    );
  };

  if (done) {
    const pct = Math.round((score / items.length) * 100);
    return (
      <div className="my-6 bg-slate-800/60 border border-slate-600 rounded-2xl p-6 text-center space-y-3">
        <p className="text-5xl" aria-hidden="true">{pct === 100 ? '🏆' : pct >= 70 ? '🎉' : '💪'}</p>
        <p className="text-xl font-bold text-white">{data.title}</p>
        <p className="text-3xl font-black text-emerald-300">{score} de {items.length}</p>
        <p className="text-slate-300">{pct === 100 ? '¡Perfecto! No se le escapó ninguna.' : pct >= 70 ? '¡Muy bien! Repase las que falló.' : 'Vuelva a intentarlo: ahora ya conoce el porqué.'}</p>
        <button type="button" onClick={restart} className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold">↻ Jugar otra vez</button>
      </div>
    );
  }

  return (
    <div className="my-6 bg-slate-800/60 border border-slate-600 rounded-2xl p-5 text-left space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-lg font-bold text-white">{data.title}</p>
          <p className="text-sm text-slate-300 mt-1">{data.description}</p>
        </div>
        <div className="text-right text-sm text-slate-300 tabular-nums">
          <p><span className="font-bold text-white">{i + 1}</span> de {items.length}</p>
          <p>✅ {score}{streak >= 2 ? ` · 🔥 ${streak} seguidas` : ''}</p>
        </div>
      </div>

      <div className="flex gap-1.5" aria-hidden="true">
        {items.map((_, k) => <span key={k} className={`h-1.5 flex-1 rounded ${k < i ? 'bg-emerald-500' : k === i ? 'bg-sky-400' : 'bg-slate-700'}`} />)}
      </div>

      <div className="bg-slate-950/70 border border-slate-700 rounded-2xl px-5 py-6 min-h-[120px] flex flex-col justify-center">
        {item.tag && <p className="text-xs font-bold uppercase tracking-widest text-sky-300 mb-2">{item.tag}</p>}
        <p className="text-lg md:text-xl text-white leading-relaxed">{item.text}</p>
      </div>

      <div className="flex gap-3">{btn('a')}{btn('b')}</div>

      {picked && (
        <div className={`rounded-xl px-4 py-3 border ${ok ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-100' : 'bg-rose-500/10 border-rose-500/40 text-rose-100'}`} role="status">
          <p className="font-bold">{ok ? '¡Correcto!' : `Era: ${options[item.answer].emoji} ${options[item.answer].label}`}</p>
          <p className="text-sm mt-1">{item.why}</p>
        </div>
      )}

      {picked && (
        <button type="button" onClick={next} className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold">
          {i < items.length - 1 ? 'Siguiente →' : 'Ver mi resultado'}
        </button>
      )}
    </div>
  );
};

export default QuickVoteView;
