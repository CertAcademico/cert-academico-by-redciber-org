import React, { useEffect, useState } from 'react';
import { getMyCampaignRank, CAMPAIGN_CUTOFF, CAMPAIGN_TOP, CAMPAIGN_PRIZE } from '../rankingService';
import type { MyRank } from '../rankingService';

/** Posición del estudiante en el ranking de la campaña (solo ve la suya) y las reglas. */
const CampaignRankCard: React.FC = () => {
  const [rank, setRank] = useState<MyRank | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const closed = Date.now() > Date.parse(CAMPAIGN_CUTOFF);

  useEffect(() => {
    let cancelled = false;
    getMyCampaignRank().then(r => {
      if (cancelled) return;
      setRank(r);
      setLoaded(true);
    });
    return () => { cancelled = true; };
  }, []);

  const inTop = !!rank && rank.badges > 0 && rank.position <= CAMPAIGN_TOP;

  return (
    <div className="mb-8 rounded-2xl p-5 bg-gradient-to-r from-amber-900/40 via-orange-900/30 to-slate-900/40 border border-amber-500/40">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-amber-300 mb-1">
            🏆 {closed ? 'Ranking cerrado' : 'Convocatoria · Top 50'}
          </p>
          <p className="text-lg font-bold text-white">
            Los {CAMPAIGN_TOP} mejores puntajes al 31 de octubre acceden gratis al {CAMPAIGN_PRIZE}
          </p>
          {loaded && (
            <p className="text-sm text-slate-200 mt-1">
              {!rank || rank.badges === 0
                ? 'Aún no tienes puntaje: obtén tu primer badge para entrar al ranking.'
                : <>
                    {closed ? 'Quedaste' : 'Vas'} en el puesto <span className="font-bold text-white">#{rank.position}</span> de {rank.total} · {rank.badges} badge{rank.badges !== 1 ? 's' : ''} · {rank.score} puntos en evaluaciones ·{' '}
                    {inTop
                      ? <span className="text-emerald-300 font-semibold">{closed ? '¡Quedaste en el top 50!' : '¡Estás dentro del top 50!'}</span>
                      : <span className="text-amber-200">{closed ? 'No alcanzaste el top 50.' : `Te faltan ${rank.position - CAMPAIGN_TOP} puestos para el top 50.`}</span>}
                  </>}
            </p>
          )}
        </div>
        <button onClick={() => setShowRules(v => !v)} className="shrink-0 text-sm text-amber-200 border border-amber-500/40 hover:border-amber-300 rounded-xl px-4 py-2">
          {showRules ? 'Ocultar reglas' : '📜 Ver reglas'}
        </button>
      </div>
      {showRules && (
        <ol className="mt-4 text-sm text-slate-200 space-y-1.5 list-decimal pl-5">
          <li>Participan quienes se registraron gratis en CERT Académico hasta el 31 de octubre de 2026.</li>
          <li>Cuenta lo logrado hasta el 31 de octubre a las 23:59 (hora de Colombia).</li>
          <li>El orden se define por: (1) número de badges obtenidos en los 7 cursos iniciales; (2) a igual número, la mayor suma de notas en las evaluaciones de esos cursos; (3) si persiste el empate, quien obtuvo su último badge primero.</li>
          <li>Los {CAMPAIGN_TOP} primeros acceden gratis al {CAMPAIGN_PRIZE}. Serán contactados al correo con el que se registraron.</li>
          <li>RedCiber.org revisará los resultados antes de anunciarlos y podrá excluir puntajes obtenidos de forma fraudulenta o automatizada.</li>
          <li>Solo tú ves tu posición; la lista completa no se publica.</li>
        </ol>
      )}
    </div>
  );
};

export default CampaignRankCard;
