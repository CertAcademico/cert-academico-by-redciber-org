import React, { useState } from 'react';
import type { TeacherGuideContent } from '../types';

// Guía del docente dentro del módulo. Solo se muestra a docentes, tutores y admin (lo decide App).
const TeacherGuideView: React.FC<{ data: TeacherGuideContent }> = ({ data }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-6 rounded-2xl border-2 border-dashed border-amber-400/60 bg-amber-500/5 text-left">
      <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open}
        className="w-full flex flex-wrap items-center justify-between gap-2 px-5 py-4">
        <span>
          <span className="block text-xs font-bold uppercase tracking-widest text-amber-300">🧑‍🏫 Guía del docente · solo la ven docentes</span>
          <span className="block text-lg font-bold text-white mt-0.5">{data.title}</span>
        </span>
        <span className="text-sm text-amber-200 font-semibold">⏱ {data.minutes} {open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-4 text-sm text-slate-200">
          <p><span className="font-bold text-amber-200">Objetivo:</span> {data.goal}</p>
          {data.slides && <p><span className="font-bold text-amber-200">Presentación:</span> {data.slides}</p>}
          <ol className="space-y-2">
            {data.steps.map((s, k) => (
              <li key={k} className="flex gap-3 bg-slate-900/60 border border-slate-700 rounded-xl px-3 py-2">
                <span className="shrink-0 w-16 text-amber-300 font-bold tabular-nums">{s.time}</span>
                <span>{s.text}</span>
              </li>
            ))}
          </ol>
          {data.say && data.say.length > 0 && (
            <div>
              <p className="font-bold text-amber-200 mb-1">🗣️ Frases para decir</p>
              <ul className="space-y-1">{data.say.map((t, k) => <li key={k} className="italic">«{t}»</li>)}</ul>
            </div>
          )}
          {data.answers && data.answers.length > 0 && (
            <div>
              <p className="font-bold text-amber-200 mb-1">✅ Respuestas de las dinámicas</p>
              <ul className="list-disc pl-5 space-y-1">{data.answers.map((t, k) => <li key={k}>{t}</li>)}</ul>
            </div>
          )}
          {data.tip && <p className="bg-sky-500/10 border border-sky-500/30 rounded-lg px-3 py-2"><span className="font-bold">💡 Consejo:</span> {data.tip}</p>}
        </div>
      )}
    </div>
  );
};

export default TeacherGuideView;
