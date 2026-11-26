import React, { useEffect, useState } from 'react';
import { BadgeSvg, BADGE_TITLES, verifyUrl } from './Credential';
import { MILESTONES } from '../milestones';
import { getAchievementWall } from '../publicationService';
import type { WallEntry } from '../publicationService';

// Muro de logros: los badges que la comunidad publicó en la plataforma (los más recientes primero).
const timeAgo = (iso: string) => {
  const min = Math.round((Date.now() - Date.parse(iso)) / 60000);
  if (min < 60) return `hace ${Math.max(1, min)} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.round(h / 24);
  return `hace ${d} día${d === 1 ? '' : 's'}`;
};

const AchievementWall: React.FC<{ refreshKey?: number }> = ({ refreshKey = 0 }) => {
  const [items, setItems] = useState<WallEntry[] | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getAchievementWall(24).then(r => { if (!cancelled) setItems(r); });
    return () => { cancelled = true; };
  }, [refreshKey]);

  if (!items || items.length === 0) return null;
  const shown = showAll ? items : items.slice(0, 6);

  return (
    <section className="mt-10" aria-labelledby="wall-title">
      <div className="flex flex-wrap items-end justify-between gap-2 mb-4">
        <div>
          <h2 id="wall-title" className="text-xl font-bold text-white">🏆 Muro de logros</h2>
          <p className="text-sm text-slate-400">Badges que la comunidad publicó para avanzar de nivel. ¡Felicítalos con tu propio logro!</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {shown.map(e => (
          <article key={`${e.certCode}`} className="rounded-2xl bg-slate-800/60 border border-slate-700 p-4 flex gap-3">
            <div className="shrink-0"><BadgeSvg pathId={e.pathId} title={BADGE_TITLES[e.pathId] ?? MILESTONES[e.pathId]?.title ?? e.pathId} year={new Date(e.createdAt).getFullYear().toString()} size={64} /></div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">{e.authorName}</p>
              <p className="text-xs text-amber-300 truncate">{BADGE_TITLES[e.pathId] ?? MILESTONES[e.pathId]?.title ?? e.pathId}</p>
              <p className="text-sm text-slate-300 mt-1 line-clamp-3">“{e.message}”</p>
              <p className="text-[11px] text-slate-500 mt-1">{timeAgo(e.createdAt)} · <a href={verifyUrl(e.certCode)} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">verificar</a></p>
            </div>
          </article>
        ))}
      </div>
      {items.length > 6 && (
        <button type="button" onClick={() => setShowAll(s => !s)} className="mt-3 text-sm text-sky-400 hover:underline">
          {showAll ? 'Ver menos' : `Ver los ${items.length} logros`}
        </button>
      )}
    </section>
  );
};

export default AchievementWall;
