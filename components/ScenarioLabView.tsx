import React, { useState } from 'react';
import type { ScenarioContent, ScenarioChoice } from '../types';

/** Laboratorio de escenario: cada decisión suma puntos; al llegar a un final se aprueba con passPoints. */
const ScenarioLabView: React.FC<{ data: ScenarioContent; onComplete: () => void }> = ({ data, onComplete }) => {
  const [started, setStarted] = useState(false);
  const [stepId, setStepId] = useState(data.start);
  const [points, setPoints] = useState(0);
  const [log, setLog] = useState<{ choice: string; feedback?: string; points: number }[]>([]);
  const [lastFeedback, setLastFeedback] = useState<{ text: string; points: number } | null>(null);
  const [passed, setPassed] = useState(false);

  const step = data.steps[stepId];
  const isEnd = !step?.choices || step.choices.length === 0;

  const choose = (c: ScenarioChoice) => {
    const gained = c.points ?? 0;
    const total = points + gained;
    setPoints(total);
    setLog(prev => [...prev, { choice: c.text, feedback: c.feedback, points: gained }]);
    setLastFeedback(c.feedback ? { text: c.feedback, points: gained } : null);
    setStepId(c.next);
    const next = data.steps[c.next];
    if ((!next?.choices || next.choices.length === 0) && total >= data.passPoints && !passed) {
      setPassed(true);
      onComplete();
    }
  };

  const restart = () => {
    setStepId(data.start);
    setPoints(0);
    setLog([]);
    setLastFeedback(null);
  };

  return (
    <div className="my-6 bg-slate-900/70 border border-amber-500/30 rounded-2xl p-5 md:p-7 text-left">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <p className="text-amber-300 text-xs font-bold uppercase tracking-widest">🧪 Laboratorio · Simulación de caso</p>
        {started && <p className="text-xs text-slate-400">Puntaje: <span className="text-white font-bold">{points}</span> / {data.maxPoints} · aprueba con {data.passPoints}</p>}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{data.title}</h3>

      {!started ? (
        <>
          <p className="text-slate-300 leading-relaxed mb-5">{data.intro}</p>
          <button onClick={() => setStarted(true)} className="bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl px-5 py-2.5 text-sm">
            Iniciar laboratorio →
          </button>
        </>
      ) : (
        <>
          {lastFeedback && (
            <p className={`mb-4 text-sm rounded-lg px-3 py-2.5 border ${lastFeedback.points > 0 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' : 'bg-rose-500/10 border-rose-500/30 text-rose-200'}`}>
              {lastFeedback.points > 0 ? `+${lastFeedback.points} · ` : ''}{lastFeedback.text}
            </p>
          )}
          <p className="text-slate-200 leading-relaxed mb-4 whitespace-pre-line">{step?.text}</p>
          {step?.evidence && (
            <pre className="mb-5 text-xs md:text-sm bg-black/60 border border-slate-700 rounded-lg p-4 overflow-x-auto text-emerald-300 whitespace-pre-wrap">{step.evidence}</pre>
          )}
          {!isEnd ? (
            <div className="grid gap-2">
              {step.choices!.map((c, i) => (
                <button
                  key={i}
                  onClick={() => choose(c)}
                  className="text-left bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-amber-500/60 rounded-xl px-4 py-3 text-sm text-slate-100 transition-colors"
                >
                  <span className="text-amber-400 font-bold mr-2">{String.fromCharCode(65 + i)}.</span>{c.text}
                </button>
              ))}
            </div>
          ) : (
            <div className={`rounded-xl p-4 border ${points >= data.passPoints ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'}`}>
              <p className="font-bold text-white mb-1">
                {points >= data.passPoints ? '✅ Laboratorio aprobado' : '❌ Aún no alcanza el puntaje mínimo'} · {points}/{data.maxPoints} puntos
              </p>
              <ul className="text-xs text-slate-300 space-y-1 mb-3 list-disc pl-4">
                {log.map((l, i) => <li key={i}>{l.choice} <span className="text-slate-500">({l.points >= 0 ? '+' : ''}{l.points})</span></li>)}
              </ul>
              <button onClick={restart} className="text-sm text-amber-300 hover:underline">↻ Repetir el laboratorio</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ScenarioLabView;
