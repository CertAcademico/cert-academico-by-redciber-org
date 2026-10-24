import React, { useState } from 'react';
import type { ChallengeContent } from '../types';

// Compara sin mayúsculas, tildes, espacios ni comillas: "Reply-To " = "reply-to".
const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/["'`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

/** Reto tipo CTF: el estudiante analiza las evidencias y escribe cada respuesta ("bandera"). */
const ChallengeLabView: React.FC<{ data: ChallengeContent; onComplete: () => void }> = ({ data, onComplete }) => {
  const [inputs, setInputs] = useState<string[]>(() => data.questions.map(() => ''));
  const [solved, setSolved] = useState<boolean[]>(() => data.questions.map(() => false));
  const [wrong, setWrong] = useState<boolean[]>(() => data.questions.map(() => false));
  const [hints, setHints] = useState<boolean[]>(() => data.questions.map(() => false));
  const [openArtifact, setOpenArtifact] = useState(0);

  const check = (i: number) => {
    const ok = data.questions[i].answers.some(a => normalize(a) === normalize(inputs[i]));
    const nextSolved = solved.map((v, j) => (j === i ? v || ok : v));
    setSolved(nextSolved);
    setWrong(w => w.map((v, j) => (j === i ? !ok : v)));
    if (ok && nextSolved.every(Boolean) && !solved.every(Boolean)) onComplete();
  };

  const done = solved.filter(Boolean).length;

  return (
    <div className="my-6 bg-slate-900/70 border border-emerald-500/30 rounded-2xl p-5 md:p-7 text-left">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <p className="text-emerald-300 text-xs font-bold uppercase tracking-widest">🚩 Reto práctico · Captura la bandera</p>
        <p className="text-xs text-slate-400">Banderas: <span className="text-white font-bold">{done}</span> / {data.questions.length}</p>
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{data.title}</h3>
      <p className="text-slate-300 leading-relaxed mb-5">{data.brief}</p>

      {/* Evidencias */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-2">
          {data.artifacts.map((a, i) => (
            <button
              key={a.name}
              onClick={() => setOpenArtifact(i)}
              className={`text-xs font-mono rounded-lg px-3 py-1.5 border ${openArtifact === i ? 'bg-emerald-600/30 border-emerald-500 text-emerald-100' : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500'}`}
            >
              📄 {a.name}
            </button>
          ))}
        </div>
        <pre className="text-xs md:text-sm bg-black/70 border border-slate-700 rounded-lg p-4 overflow-x-auto text-emerald-300 max-h-96">{data.artifacts[openArtifact]?.content}</pre>
      </div>

      {/* Preguntas */}
      <div className="space-y-4">
        {data.questions.map((q, i) => (
          <div key={i} className={`rounded-xl p-4 border ${solved[i] ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-800/60 border-slate-700'}`}>
            <p className="text-sm text-white font-semibold mb-2">{i + 1}. {q.prompt}</p>
            {solved[i] ? (
              <p className="text-sm text-emerald-200">✅ {q.explanation}</p>
            ) : (
              <>
                <div className="flex gap-2">
                  <input
                    value={inputs[i]}
                    onChange={e => setInputs(v => v.map((x, j) => (j === i ? e.target.value : x)))}
                    onKeyDown={e => { if (e.key === 'Enter') check(i); }}
                    placeholder="Tu respuesta"
                    className="flex-1 min-w-0 bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm text-white font-mono outline-none"
                  />
                  <button onClick={() => check(i)} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg px-4 text-sm">Validar</button>
                </div>
                {wrong[i] && <p className="text-xs text-rose-300 mt-2">No es correcto. Revisa de nuevo las evidencias.</p>}
                {q.hint && (
                  hints[i]
                    ? <p className="text-xs text-amber-200 mt-2">💡 {q.hint}</p>
                    : <button onClick={() => setHints(h => h.map((v, j) => (j === i ? true : v)))} className="text-xs text-amber-300 hover:underline mt-2">💡 Ver pista</button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      {done === data.questions.length && (
        <p className="mt-5 text-sm font-bold text-emerald-300">🏁 ¡Reto completado! Todas las banderas capturadas.</p>
      )}
    </div>
  );
};

export default ChallengeLabView;
