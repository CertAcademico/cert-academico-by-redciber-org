import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { SlidesContent } from '../types';

// Visor de presentación incrustado: cada diapositiva es una imagen (01.jpg, 02.jpg…).
// Flechas, deslizar en el celular, teclado (← →) y pantalla completa.
const pad = (n: number) => String(n).padStart(2, '0');

const SlideDeckView: React.FC<{ data: SlidesContent }> = ({ data }) => {
  const { count, base } = data;
  const [i, setI] = useState(Math.min(Math.max(data.start ?? 1, 1), count));
  const [full, setFull] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback((n: number) => setI(Math.min(Math.max(n, 1), count)), [count]);
  const src = (n: number) => `${base}/${pad(n)}.jpg`;

  // Precarga la siguiente y la anterior para que el cambio sea inmediato.
  useEffect(() => {
    [i - 1, i + 1].filter(n => n >= 1 && n <= count).forEach(n => { const im = new Image(); im.src = src(n); });
  }, [i, count]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onFs = () => setFull(document.fullscreenElement === boxRef.current);
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  const toggleFull = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else boxRef.current?.requestFullscreen?.().catch(() => {});
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); go(i + 1); }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(i - 1); }
    if (e.key === 'Home') go(1);
    if (e.key === 'End') go(count);
  };

  return (
    <div className="my-6 bg-slate-800/60 border border-slate-600 rounded-2xl p-4 md:p-5 text-left">
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div>
          <p className="text-lg font-bold text-white">{data.title}</p>
          {data.description && <p className="text-sm text-slate-300 mt-1">{data.description}</p>}
        </div>
        {data.download && (
          <a href={data.download.href} download className="shrink-0 px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 border border-slate-500 text-sm font-bold text-white">
            ⬇ {data.download.label}
          </a>
        )}
      </div>

      <div
        ref={boxRef}
        tabIndex={0}
        onKeyDown={onKey}
        onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
        className={`relative outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-xl overflow-hidden bg-black ${full ? 'flex items-center justify-center' : ''}`}
        aria-roledescription="presentación"
        aria-label={`${data.title}: diapositiva ${i} de ${count}`}
      >
        <img
          src={src(i)}
          alt={`Diapositiva ${i} de ${count}`}
          className={full ? 'max-h-screen max-w-full object-contain' : 'w-full h-auto block aspect-video object-contain'}
          draggable={false}
        />
        <button type="button" onClick={() => go(i - 1)} disabled={i === 1} aria-label="Diapositiva anterior"
          className="absolute left-0 top-0 h-full w-1/5 flex items-center justify-start pl-2 text-white/80 hover:text-white disabled:opacity-0">
          <span className="hidden md:grid place-items-center w-10 h-10 rounded-full bg-black/50 text-xl">‹</span>
        </button>
        <button type="button" onClick={() => go(i + 1)} disabled={i === count} aria-label="Diapositiva siguiente"
          className="absolute right-0 top-0 h-full w-1/5 flex items-center justify-end pr-2 text-white/80 hover:text-white disabled:opacity-0">
          <span className="hidden md:grid place-items-center w-10 h-10 rounded-full bg-black/50 text-xl">›</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-3">
        <button type="button" onClick={() => go(i - 1)} disabled={i === 1} className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-white text-sm">← Anterior</button>
        <button type="button" onClick={() => go(i + 1)} disabled={i === count} className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-sm font-bold">Siguiente →</button>
        <label className="text-sm text-slate-300 flex items-center gap-1.5">
          Ir a
          <select value={i} onChange={e => go(Number(e.target.value))} className="bg-slate-900 border border-slate-600 rounded-md px-2 py-1 text-white">
            {Array.from({ length: count }, (_, k) => <option key={k + 1} value={k + 1}>{k + 1}</option>)}
          </select>
          <span className="tabular-nums">de {count}</span>
        </label>
        <button type="button" onClick={toggleFull} className="ml-auto px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm">
          {full ? '✕ Salir de pantalla completa' : '⛶ Pantalla completa'}
        </button>
      </div>
      <div className="mt-3 h-1 rounded bg-slate-700 overflow-hidden" aria-hidden="true">
        <div className="h-full bg-emerald-500 transition-all" style={{ width: `${(i / count) * 100}%` }} />
      </div>
    </div>
  );
};

export default SlideDeckView;
