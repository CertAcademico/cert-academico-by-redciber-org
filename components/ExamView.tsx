import React, { useState } from 'react';
import type { ExamContent, H5PQuestion } from '../types';

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const drawAttempt = (data: ExamContent): H5PQuestion[] =>
  shuffle(data.questions)
    .slice(0, Math.min(data.questionsPerAttempt, data.questions.length))
    .map(q => ({ ...q, options: shuffle(q.options) }));

/**
 * Examen: cada intento toma preguntas al azar del banco y baraja las opciones. Las respuestas
 * se revelan al final. Solo si alcanza passPercent se llama onPassed (guarda nota y completa el módulo).
 */
const ExamView: React.FC<{ data: ExamContent; onPassed: (score: number, maxScore: number) => void }> = ({ data, onPassed }) => {
  const [questions, setQuestions] = useState<H5PQuestion[]>(() => drawAttempt(data));
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [attempt, setAttempt] = useState(1);
  const [everPassed, setEverPassed] = useState(false);

  const q = questions[index];
  const correctCount = answers.filter((a, i) => questions[i]?.options.find(o => o.id === a)?.isCorrect).length;
  const percent = Math.round((correctCount / questions.length) * 100);
  const passed = percent >= data.passPercent;

  const next = () => {
    const all = [...answers, selected];
    setAnswers(all);
    setSelected(null);
    if (index < questions.length - 1) {
      setIndex(index + 1);
      return;
    }
    setFinished(true);
    const right = all.filter((a, i) => questions[i].options.find(o => o.id === a)?.isCorrect).length;
    if ((right / questions.length) * 100 >= data.passPercent) {
      setEverPassed(true);
      onPassed(right * 10, questions.length * 10);
    }
  };

  const retry = () => {
    setQuestions(drawAttempt(data));
    setIndex(0);
    setAnswers([]);
    setSelected(null);
    setFinished(false);
    setAttempt(a => a + 1);
  };

  return (
    <div className="my-6 bg-slate-900/70 border border-violet-500/30 rounded-2xl p-5 md:p-7 text-left">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <p className="text-violet-300 text-xs font-bold uppercase tracking-widest">📝 Examen de nivel</p>
        <p className="text-xs text-slate-400">Aprueba con {data.passPercent}% · Intento {attempt}</p>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{data.title}</h3>

      {!started ? (
        <>
          <p className="text-slate-300 leading-relaxed mb-2">{data.description}</p>
          <p className="text-sm text-slate-400 mb-5">
            {questions.length} preguntas al azar de un banco de {data.questions.length}. Las respuestas correctas se muestran al final. Puede reintentar con preguntas distintas.
          </p>
          <button onClick={() => setStarted(true)} className="bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl px-5 py-2.5 text-sm">
            Comenzar examen →
          </button>
        </>
      ) : !finished ? (
        <>
          <div className="w-full h-1.5 bg-black/40 rounded-full mb-5 overflow-hidden">
            <div className="h-full bg-violet-500 transition-all" style={{ width: `${(index / questions.length) * 100}%` }} />
          </div>
          <p className="text-xs text-slate-400 mb-1">Pregunta {index + 1} de {questions.length}</p>
          <p className="text-lg text-white font-semibold mb-4">{q.question}</p>
          <div className="grid gap-2 mb-5">
            {q.options.map(o => (
              <button
                key={o.id}
                onClick={() => setSelected(o.id)}
                className={`text-left rounded-xl px-4 py-3 text-sm border transition-colors ${selected === o.id ? 'bg-violet-600/30 border-violet-400 text-white' : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-slate-500'}`}
              >
                {o.text}
              </button>
            ))}
          </div>
          <button onClick={next} disabled={!selected} className="bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-bold rounded-xl px-5 py-2.5 text-sm">
            {index < questions.length - 1 ? 'Siguiente →' : 'Terminar examen'}
          </button>
        </>
      ) : (
        <>
          <div className={`rounded-xl p-4 mb-5 border ${passed ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'}`}>
            <p className="text-2xl font-bold text-white">{percent}% <span className="text-base font-normal text-slate-300">({correctCount} de {questions.length})</span></p>
            <p className={`text-sm font-semibold ${passed ? 'text-emerald-300' : 'text-rose-300'}`}>
              {passed ? '✅ ¡Examen aprobado! Ya puede obtener el badge de este nivel.' : `❌ No aprobado. Necesita ${data.passPercent}% o más.`}
            </p>
            {!passed && everPassed && <p className="text-xs text-slate-400 mt-1">Ya había aprobado en un intento anterior: su nota aprobatoria se mantiene.</p>}
          </div>
          <div className="space-y-3 mb-5">
            {questions.map((qq, i) => {
              const chosen = qq.options.find(o => o.id === answers[i]);
              const right = qq.options.find(o => o.isCorrect);
              return (
                <div key={i} className="text-sm bg-slate-800/60 border border-slate-700 rounded-lg p-3">
                  <p className="text-white mb-1">{chosen?.isCorrect ? '✅' : '❌'} {qq.question}</p>
                  {!chosen?.isCorrect && <p className="text-slate-400">Respuesta correcta: <span className="text-slate-200">{right?.text}</span></p>}
                  <p className="text-slate-400 text-xs mt-1">{qq.feedback}</p>
                </div>
              );
            })}
          </div>
          <button onClick={retry} className="text-sm text-violet-300 hover:underline">↻ Nuevo intento con otras preguntas</button>
        </>
      )}
    </div>
  );
};

export default ExamView;
