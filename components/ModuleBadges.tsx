import React, { useEffect, useState } from 'react';
import { BadgeSvg, CredentialModal, cleanCourseTitle } from './Credential';
import { getMyCertificates } from '../certificateService';
import type { Certificate } from '../certificateService';
import { milestonesForModule } from '../milestones';

interface Props {
  pathId: string;
  moduleId: string;
  courseTitle: string;
  userId: string;
  totalModules: number;
  completedCount: number;
  /** Cambia cuando puede haber badges nuevos (módulo completado, entrega del grupo). */
  refreshKey: string;
}

interface BadgeItem {
  id: string;
  title: string;
  /** Qué falta para ganarlo, si todavía no se tiene. */
  how: string;
}

/** Badges de RedCiber que se ganan en este módulo: a color si ya se tienen, en gris si no. */
const ModuleBadges: React.FC<Props> = ({ pathId, moduleId, courseTitle, userId, totalModules, completedCount, refreshKey }) => {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [open, setOpen] = useState<{ cert: Certificate; title: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = () => getMyCertificates(userId).then(c => { if (!cancelled) setCerts(c); }).catch(() => undefined);
    load();
    // Los badges de sesión se emiten en segundo plano al abrir el curso: se vuelve a mirar poco después.
    const t = setTimeout(load, 2500);
    return () => { cancelled = true; clearTimeout(t); };
  }, [userId, refreshKey]);

  const course = cleanCourseTitle(courseTitle);
  const items: BadgeItem[] = [
    ...milestonesForModule(pathId, moduleId).map(([id, m]) => ({
      id,
      title: m.title,
      how: m.modules.length > 1
        ? `Completa las sesiones ${m.modules.map(x => x.replace(/\D/g, '')).join(', ')} y que tu grupo entregue en cada una.`
        : 'Completa esta sesión y que tu grupo suba el entregable.',
    })),
    {
      id: pathId,
      title: course,
      how: `Completa los ${totalModules} módulos del curso (llevas ${Math.min(completedCount, totalModules)}).`,
    },
  ];

  const year = new Date().getFullYear().toString();

  return (
    <section className="mb-6 rounded-xl border border-slate-700/60 bg-slate-900/40 p-4" aria-label="Badges de RedCiber de este módulo">
      <h3 className="text-sm font-semibold text-slate-300 mb-3">🎖️ Badges de RedCiber en este módulo</h3>
      <div className="flex flex-wrap gap-4">
        {items.map(item => {
          const cert = certs.find(c => c.pathId === item.id);
          const earned = !!cert;
          return (
            <div key={item.id} className="flex items-center gap-3 min-w-[220px] max-w-sm">
              <button
                type="button"
                onClick={() => cert && setOpen({ cert, title: item.title })}
                disabled={!earned}
                className={`shrink-0 rounded-lg transition-transform ${earned ? 'hover:scale-105 cursor-pointer' : 'cursor-default'}`}
                style={earned ? undefined : { filter: 'grayscale(1)', opacity: 0.4 }}
                aria-label={earned ? `Ver badge: ${item.title}` : `Badge pendiente: ${item.title}`}
              >
                <BadgeSvg pathId={item.id} title={item.title} year={cert ? new Date(cert.issuedAt).getFullYear().toString() : year} size={84} />
              </button>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white leading-snug">{item.title}</p>
                {earned ? (
                  <p className="text-xs text-emerald-300 mt-1">✓ Obtenido · toca el badge para verlo</p>
                ) : (
                  <p className="text-xs text-slate-400 mt-1">🔒 {item.how}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {open && <CredentialModal cert={open.cert} title={open.title} onClose={() => setOpen(null)} />}
    </section>
  );
};

export default ModuleBadges;
