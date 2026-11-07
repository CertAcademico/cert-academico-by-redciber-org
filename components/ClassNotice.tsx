import React, { useEffect, useState } from 'react';
import { getGroupProgress, type GroupProgress } from '../submissionService';
import { LIVE_DAYS, hhmm } from '../liveSchedule';

// Avisos de la clase en vivo: aparecen dentro del curso solo en su franja horaria.
interface Notice {
  pathId: string;
  moduleId?: string; // entrega que se revisa; si falta, la del bloque abierto
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
    text: 'Una persona del grupo sube la «Primera intuición» en la caja de entrega del Bloque 1: con una entrega basta para que todo el grupo gane el badge. Después viene la plenaria: cada vocero presenta a su grupo.',
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
  {
    pathId: 'prueba_digital', moduleId: 'pd_b4',
    from: '2026-11-07T14:55:00-05:00', to: '2026-11-07T15:15:00-05:00', tone: 'info',
    title: '⏱ La entrega del Bloque 4 cierra a las 15:20',
    text: 'Una persona del grupo sube la «Ruta procesal» en la caja de entrega del Bloque 4. Con una entrega basta para que todo el grupo gane el badge.',
  },
  {
    pathId: 'prueba_digital', moduleId: 'pd_b4',
    from: '2026-11-07T15:15:00-05:00', to: '2026-11-07T15:20:00-05:00', tone: 'warn',
    title: '⏰ Quedan 5 minutos: la entrega del Bloque 4 cierra a las 15:20',
    text: 'Si su grupo no ha subido la «Ruta procesal», súbala ya. A las 15:20 empieza el Bloque 5: cadena de custodia. La jornada termina a las 16:40.',
  },
  {
    pathId: 'prueba_digital',
    from: '2026-11-07T16:00:00-05:00', to: '2026-12-01T00:00:00-05:00', tone: 'live',
    title: '📝 La evaluación final queda abierta hasta el 30 de noviembre',
    text: 'Si no alcanza a terminarla hoy, hágala con calma desde cualquier dispositivo hasta el 30 de noviembre a las 23:59. Al aprobarla (70 %) recibe su certificado. Los badges que ya ganó en los bloques se conservan.',
  },
  {
    pathId: 'prueba_digital',
    from: '2026-11-07T11:25:00-05:00', to: '2026-11-08T00:00:00-05:00', tone: 'info',
    title: '🏅 Cómo se gana el badge de cada bloque',
    text: 'Basta con que UNA persona del grupo suba la entrega en la caja del bloque: no hace falta que cada uno la suba. El badge le llega a cada integrante que haya elegido su grupo y completado el reto del bloque. Si no lo ve, recargue la página.',
  },
];

// Bloques con entrega de grupo.
const DELIVERABLE_MODULES = ['pd_b1', 'pd_b2', 'pd_b3', 'pd_b4', 'pd_b5', 'pd_b6', 'pd_b7'];
// Hora de cierre de las entregas (debe coincidir con public.deliverable_deadlines).
const CLOSES_AT: Record<string, string> = { pd_b1: '2026-11-07T11:10:00-05:00', pd_b4: '2026-11-07T15:20:00-05:00' };

const TONES: Record<Notice['tone'], string> = {
  info: 'bg-sky-500/10 border-sky-400/40 text-sky-100',
  warn: 'bg-amber-500/15 border-amber-400/60 text-amber-100',
  live: 'bg-violet-500/15 border-violet-400/50 text-violet-100',
};

const ClassNotice: React.FC<{ pathId: string; moduleId?: string }> = ({ pathId, moduleId }) => {
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

  // Cronograma activo: bloque en curso, el siguiente y la hora de cierre de la jornada.
  const day = LIVE_DAYS[pathId];
  let agenda: { text: string; warn: boolean } | null = null;
  if (day && now >= Date.parse(day.blocks[0].start) && now < Date.parse(day.dayEnd)) {
    const all = [...day.blocks, ...day.breaks].sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
    const cur = all.find(b => now >= Date.parse(b.start) && now < Date.parse(b.end));
    const nxt = all.find(b => Date.parse(b.start) > now);
    if (cur) {
      const left = Math.ceil((Date.parse(cur.end) - now) / 60000);
      agenda = {
        warn: left <= 5,
        text: (left <= 5 ? `⏰ Quedan ${left} min · ` : '🗓 Ahora: ')
          + `${cur.name} (${hhmm(cur.start)} a ${hhmm(cur.end)})`
          + (nxt ? ` · Sigue: ${nxt.name} a las ${hhmm(nxt.start)}` : '')
          + ` · La jornada termina a las ${hhmm(day.dayEnd)}`,
      };
    }
  }

  const agendaBar = agenda && (
    <p className={`mb-3 rounded-xl border px-4 py-2 text-sm font-semibold text-left ${agenda.warn ? TONES.warn : 'bg-slate-800/70 border-slate-600 text-slate-100'}`}>
      {agenda.text}
    </p>
  );

  if (!notice) return agendaBar || null;

  const target = notice.moduleId ?? moduleId;
  const block = target ? `Bloque ${target.replace('pd_b', '')}` : '';
  let status: string | null = null;
  if (gp && target && DELIVERABLE_MODULES.includes(target)) {
    if (!gp.group) status = '👥 Todavía no ha elegido su grupo: elíjalo en la caja de entrega del Bloque 1. Sin grupo, la entrega no le cuenta para el badge.';
    else if (gp.delivered.includes(target)) status = `✅ Grupo ${gp.group}: la entrega del ${block} ya está cargada. No necesita subirla usted: complete el reto del bloque y el badge le llega.`;
    else if (CLOSES_AT[target] && now >= Date.parse(CLOSES_AT[target])) status = `⛔ Las entregas del ${block} cerraron a las ${new Date(CLOSES_AT[target]).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Bogota' })}.`;
    else status = `⚠️ Grupo ${gp.group}: todavía no han cargado la entrega del ${block}. Basta con que una persona del grupo la suba.`;
  }

  return (
    <>
    {agendaBar}
    <div role="status" aria-live="polite" className={`mb-6 rounded-xl border px-4 py-3 text-left ${TONES[notice.tone]}`}>
      <p className="font-bold">{notice.title}</p>
      <p className="text-sm mt-1">{notice.text}</p>
      {status && <p className="text-sm font-semibold mt-2">{status}</p>}
    </div>
    </>
  );
};

export default ClassNotice;
