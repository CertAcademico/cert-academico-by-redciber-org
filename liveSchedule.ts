// Cronograma de las clases en vivo: abre cada bloque a su hora y alimenta el aviso del cronograma.
export interface LiveBlock { start: string; end: string; name: string }
export interface LiveDay { blocks: LiveBlock[]; breaks: LiveBlock[]; dayEnd: string }

const T = (hhmm: string) => `2026-11-07T${hhmm}:00-05:00`;

export const LIVE_DAYS: Record<string, LiveDay> = {
  prueba_digital: {
    blocks: [
      { start: T('10:30'), end: T('11:25'), name: 'Bloque 1 · El caso' },
      { start: T('11:25'), end: T('12:15'), name: 'Bloque 2 · ABC técnico' },
      { start: T('14:00'), end: T('14:40'), name: 'Bloque 3 · El mundo' },
      { start: T('14:40'), end: T('15:20'), name: 'Bloque 4 · Colombia' },
      { start: T('15:20'), end: T('15:45'), name: 'Bloque 5 · Cadena de custodia' },
      { start: T('15:45'), end: T('16:05'), name: 'Bloque 6 · ¿Vale o no vale?' },
      { start: T('16:05'), end: T('16:40'), name: 'Bloque 7 · Audiencia simulada, cierre y evaluación' },
    ],
    breaks: [{ start: T('12:15'), end: T('14:00'), name: '🍽️ Almuerzo' }],
    dayEnd: T('16:40'),
  },
};

/** Hora de apertura de cada bloque (índice = bloque). */
export const LIVE_SCHEDULE: Record<string, string[]> = Object.fromEntries(
  Object.entries(LIVE_DAYS).map(([k, d]) => [k, d.blocks.map(b => b.start)]),
);

export const hhmm = (iso: string) =>
  new Date(iso).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Bogota' });
