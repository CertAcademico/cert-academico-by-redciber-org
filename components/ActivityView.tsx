import React from 'react';
import type { ActivityContent } from '../types';

const ActivityView: React.FC<{ data: ActivityContent }> = ({ data }) => (
  <div className="my-4 p-6 md:p-8 bg-slate-800/50 rounded-lg text-left">
    <p className="text-xs font-bold uppercase tracking-widest text-amber-300 mb-2">Actividad grupal presencial</p>
    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{data.title}</h3>
    <div className="flex flex-wrap gap-2 mb-4 text-xs">
      <span className="bg-slate-700/70 rounded-full px-3 py-1">⏱ {data.duration}</span>
      <span className="bg-slate-700/70 rounded-full px-3 py-1">👥 {data.groupSize}</span>
    </div>
    <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-6">{data.goal}</p>

    {data.downloads.length > 0 && (
      <div className="mb-6 space-y-2">
        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Materiales</h4>
        {data.downloads.map(d => (
          <a
            key={d.href}
            href={d.href}
            download
            className="flex items-center gap-3 bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/40 rounded-xl px-4 py-3 transition-colors"
          >
            <span className="text-2xl">📄</span>
            <span className="flex-grow">
              <span className="block font-semibold text-blue-200">{d.label}</span>
              {d.note && <span className="block text-xs text-slate-400">{d.note}</span>}
            </span>
            <span className="text-sm font-bold text-blue-300 shrink-0">Descargar ↓</span>
          </a>
        ))}
      </div>
    )}

    <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">Paso a paso</h4>
    <ol className="space-y-3 mb-6">
      {data.steps.map((step, i) => (
        <li key={step.title} className="flex gap-3">
          <span className="w-7 h-7 shrink-0 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
          <div>
            <p className="font-semibold text-white">
              {step.title} <span className="text-xs font-normal text-slate-400">· {step.minutes}</span>
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">{step.detail}</p>
          </div>
        </li>
      ))}
    </ol>

    {data.groups && (
      <>
        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">Grupos y países asignados</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {data.groups.map(g => (
            <div key={g.name} className="bg-slate-900/60 border border-slate-700/60 rounded-xl p-3">
              <p className="text-sm font-bold text-amber-200 mb-1">{g.name}</p>
              <p className="text-sm text-slate-300">{g.items.join(' · ')}</p>
            </div>
          ))}
        </div>
      </>
    )}

    {data.closing && (
      <p className="text-sm text-slate-300 bg-slate-900/60 border-l-4 border-amber-400 rounded-r-lg px-4 py-3">{data.closing}</p>
    )}
  </div>
);

export default ActivityView;
