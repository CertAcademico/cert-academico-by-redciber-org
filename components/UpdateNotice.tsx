import React, { useEffect, useState } from 'react';

// Detecta si se publicó una versión nueva de la plataforma y pide recargar.
// En las horas de FORCE_AT recarga sola a quien siga con una versión vieja.
const CHECK_EVERY_MS = 60000;
const FORCE_AT = ['2026-11-07T15:30:00-05:00'];

const currentBundle = (): string | null => {
  const s = document.querySelector<HTMLScriptElement>('script[type="module"][src*="/assets/index-"]');
  return s ? new URL(s.src, location.href).pathname : null;
};

async function latestBundle(): Promise<string | null> {
  const res = await fetch(`${import.meta.env.BASE_URL}index.html?v=${Date.now()}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const m = (await res.text()).match(/src="([^"]*\/assets\/index-[^"]+\.js)"/);
  return m ? m[1] : null;
}

const UpdateNotice: React.FC = () => {
  const [outdated, setOutdated] = useState(false);

  useEffect(() => {
    const mine = currentBundle();
    if (!mine) return; // en desarrollo no hay bundle con hash
    let alive = true;
    const check = async () => {
      try {
        const latest = await latestBundle();
        if (!alive || !latest || latest === mine) return;
        setOutdated(true);
        const now = Date.now();
        const due = FORCE_AT.some(t => now >= Date.parse(t) && now < Date.parse(t) + 30 * 60000);
        if (due) location.reload();
      } catch { /* sin conexión: se intenta en el siguiente ciclo */ }
    };
    check();
    const t = window.setInterval(check, CHECK_EVERY_MS);
    return () => { alive = false; window.clearInterval(t); };
  }, []);

  if (!outdated) return null;
  return (
    <div role="alert" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[min(92vw,560px)] bg-amber-500 text-slate-950 rounded-2xl shadow-2xl px-5 py-3 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm font-semibold">🔄 Hay una actualización de la plataforma. Actualice para ver los cambios del curso.</p>
      <button onClick={() => location.reload()} className="bg-slate-950 text-white font-bold rounded-xl px-4 py-2 text-sm">
        Actualizar ahora
      </button>
    </div>
  );
};

export default UpdateNotice;
