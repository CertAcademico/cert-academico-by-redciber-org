import React, { useEffect, useState } from 'react';
import { CAMPAIGN_UNTIL, PIONEER_HASHTAG } from '../platform';
import { getMyChallengeEntry, reportChallenge } from '../campaignService';
import type { ChallengeEntry } from '../campaignService';

// Campaña «Black Friday… pero gratis» y Reto Pionero. Se muestra en el panel mientras dure.
const daysLeft = (now = Date.now()) => Math.max(0, Math.ceil((Date.parse(CAMPAIGN_UNTIL) - now) / 86400000));

const BlackFridayCard: React.FC<{ userId: string; hasBadge: boolean; onOpenMap?: () => void }> = ({ userId, hasBadge, onOpenMap }) => {
  const [entry, setEntry] = useState<ChallengeEntry | null>(null);
  const [url, setUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [open, setOpen] = useState(false);
  const left = daysLeft();

  useEffect(() => {
    let cancelled = false;
    getMyChallengeEntry(userId).then(e => { if (!cancelled) setEntry(e); });
    return () => { cancelled = true; };
  }, [userId]);

  const send = async () => {
    setBusy(true); setMsg('');
    try { setEntry(await reportChallenge(userId, url)); setUrl(''); }
    catch (err) { setMsg((err as Error).message); }
    finally { setBusy(false); }
  };

  return (
    <section className="mb-8 rounded-2xl overflow-hidden border border-amber-400/40 bg-gradient-to-br from-black via-slate-950 to-amber-950/40" aria-labelledby="bf-title">
      <div className="p-5 md:p-6 grid md:grid-cols-[1fr_auto] gap-5 items-start">
        <div>
          <p className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-black bg-amber-400 rounded-full px-3 py-1">
            🖤 Black Friday · edición sin pagar
          </p>
          <h2 id="bf-title" className="mt-3 text-2xl md:text-3xl font-black text-white leading-tight">
            Descuento del <span className="text-amber-300">100 %</span>. Sí, leíste bien: todo sigue gratis.
          </h2>
          <p className="mt-2 text-slate-300 max-w-2xl">
            Mientras otros rebajan televisores, nosotros abrimos las rutas completas hasta el <strong className="text-white">31 de enero</strong>.
            Sin cupones, sin letra pequeña y sin carrito abandonado (bueno, ese último depende de ti 😉).
          </p>
          <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
            {[
              ['🔓', 'Todas las rutas abiertas, sin orden obligatorio'],
              ['🧠', 'Nuevo: IA para ciberseguridad, Intermedio y Avanzado'],
              ['🕵️', 'Nuevo: CTI Intermedio y Avanzado'],
              ['🛡️', 'CERTs y CSIRTs más retador, con entregables'],
            ].map(([e, t]) => (
              <li key={t} className="flex items-start gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-slate-200">
                <span aria-hidden="true">{e}</span>{t}
              </li>
            ))}
          </ul>
          {onOpenMap && (
            <button type="button" onClick={onOpenMap} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black px-4 py-2.5">
              🛒 Llenar mi carrito de rutas →
            </button>
          )}
        </div>
        <div className="md:w-44 text-center rounded-2xl border border-amber-400/40 bg-black/50 px-4 py-4">
          <p className="text-5xl font-black text-amber-300 tabular-nums">{left}</p>
          <p className="text-xs uppercase tracking-widest text-slate-300 mt-1">{left === 1 ? 'día queda' : 'días quedan'}</p>
          <p className="text-[11px] text-slate-500 mt-2">Lo que ganes se queda: tu avance y tus badges son tuyos.</p>
        </div>
      </div>

      {/* Reto Pionero */}
      <div className="border-t border-amber-400/20 bg-amber-400/5 px-5 md:px-6 py-4">
        <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open} className="w-full flex flex-wrap items-center justify-between gap-2 text-left">
          <span>
            <span className="block text-sm font-black text-amber-200">🚀 Reto Pionero: ¿quién publica primero su badge?</span>
            <span className="block text-sm text-slate-300">El primero en publicarlo en LinkedIn con {PIONEER_HASHTAG} gana el badge especial <strong className="text-white">Pionero 2026</strong>. Solo hay uno, como el último televisor de la promo.</span>
          </span>
          <span className="text-amber-300 text-sm font-bold">{entry ? '✅ Ya participas' : open ? 'Ocultar ▲' : 'Participar ▼'}</span>
        </button>
        {open && (
          <div className="mt-4 grid md:grid-cols-3 gap-3 text-sm">
            <div className={`rounded-xl border px-3 py-3 ${hasBadge ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-100' : 'border-slate-700 bg-slate-900/60 text-slate-300'}`}>
              <p className="font-bold">1. Gana un badge {hasBadge && '✓'}</p>
              <p className="mt-1">{hasBadge ? '¡Ya tienes al menos uno! Está en «Mis logros».' : 'Termina cualquier curso (o un nivel) y pídelo en «Mis logros».'}</p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-900/60 text-slate-300 px-3 py-3">
              <p className="font-bold">2. Publícalo</p>
              <p className="mt-1">Abre tu badge, toca «Agregar a LinkedIn» y compártelo en una publicación con {PIONEER_HASHTAG}.</p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-900/60 text-slate-300 px-3 py-3">
              <p className="font-bold">3. Repórtalo aquí</p>
              {entry ? (
                <p className="mt-1 text-emerald-200">Reportado el {new Date(entry.createdAt).toLocaleString('es-CO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}. Gana quien tenga la publicación válida más temprana. ¡Suerte!</p>
              ) : (
                <div className="mt-2 space-y-2">
                  <label htmlFor="bf-url" className="sr-only">Enlace de tu publicación</label>
                  <input id="bf-url" type="url" inputMode="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://www.linkedin.com/posts/…"
                    className="w-full bg-slate-950 border border-slate-600 rounded-lg px-3 py-2 text-slate-100" />
                  <button type="button" onClick={send} disabled={busy || !url.trim()} className="w-full rounded-lg bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-bold py-2">
                    {busy ? 'Enviando…' : 'Reportar mi publicación'}
                  </button>
                  {msg && <p className="text-rose-200 text-xs" role="alert">{msg}</p>}
                </div>
              )}
            </div>
            <p className="md:col-span-3 text-xs text-slate-500">Cuenta la publicación pública más temprana que muestre un badge verificable de CERT Académico de quien la reporta. El equipo revisa los reportes y anuncia al Pionero en la página. Un reporte por persona.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlackFridayCard;
