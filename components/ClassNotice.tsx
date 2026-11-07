import React, { useEffect, useState } from 'react';
import { getGroupProgress, type GroupProgress } from '../submissionService';

// Avisos de la clase en vivo: aparecen dentro del curso solo en su franja horaria.
interface Notice {
  pathId: string;
  moduleId: string; // entrega que se revisa para el grupo
  from: string;
  to: string;
  tone: 'info' | 'warn' | 'live';
  title: string;
  text: string;
}

const NOTICES: Notice[] = [
  {
    pathId: 'prueba_digital', moduleId: 'pd_b1',
    from: '2026-11-07T10:30:00-05:00', to: '2026-11-07T11:05:00-05:00', tone: 'info',
    title: '⏱ La primera actividad cierra a las 11:10',
    text: 'Suban la «Primera intuición» en la caja de entrega del Bloque 1. Después viene la plenaria: cada vocero presenta a su grupo.',
  },
  {
    pathId: 'prueba_digital', moduleId: 'pd_b1',
    from: '2026-11-07T11:05:00-05:00', to: '2026-11-07T11:10:00-05:00', tone: 'warn',
    title: '⏰ Quedan 5 minutos: la actividad cierra a las 11:10',
    text: 'Si su grupo no ha subido la «Primera intuición», súbala ya en la caja de entrega del Bloque 1. Vocero: prepárese para la plenaria.',
  },
  {
    pathId: 'prueba_digital', moduleId: 'pd_b1',
    from: '2026-11-07T11:10:00-05:00', to: '2026-11-07T11:25:00-05:00', tone: 'live',
    title: '🎤 Plenaria: intervención de los voceros (11:10 a 11:25)',
    text: 'Cada vocero, del Grupo A al F, presenta en 2 minutos su evidencia y su primera intuición. A las 11:25 seguimos con el Bloque 2.',
  },
];

const TONES: Record<Notice['tone'], string> = {
  info: 'bg-sky-500/10 border-sky-400/40 text-sky-100',
  warn: 'bg-amber-500/15 border-amber-400/60 text-amber-100',
  live: 'bg-violet-500/15 border-violet-400/50 text-violet-100',
};

const ClassNotice: React.FC<{ pathId: string }> = ({ pathId }) => {
  const [now, setNow] = useState(() => Date.now());
  const [gp, setGp] = useState<GroupProgress | null>(null);

  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 15000);
    return () => window.clearInterval(t);
  }, []);

  const notice = NOTICES.find(
    n => n.pathId === pathId && now >= Date.parse(n.from) && now < Date.parse(n.to),
  );

  // Estado de la entrega del grupo: se consulta al aparecer el aviso y cada minuto.
  useEffect(() => {
    if (!notice) return;
    let alive = true;
    const load = () => getGroupProgress(pathId).then(r => { if (alive) setGp(r); }).catch(() => undefined);
    load();
    const t = window.setInterval(load, 60000);
    return () => { alive = false; window.clearInterval(t); };
  }, [notice?.from, pathId]);

  if (!notice) return null;

  let status: string | null = null;
  if (gp) {
    if (!gp.group) status = '👥 Todavía no ha elegido su grupo: elíjalo en la caja de entrega del Bloque 1.';
    else if (gp.delivered.includes(notice.moduleId)) status = `✅ Grupo ${gp.group}: su entrega ya está cargada.`;
    else status = `⚠️ Grupo ${gp.group}: todavía no han cargado la entrega.`;
  }

  return (
    <div role="status" aria-live="polite" className={`mb-6 rounded-xl border px-4 py-3 text-left ${TONES[notice.tone]}`}>
      <p className="font-bold">{notice.title}</p>
      <p className="text-sm mt-1">{notice.text}</p>
      {status && <p className="text-sm font-semibold mt-2">{status}</p>}
    </div>
  );
};

export default ClassNotice;
