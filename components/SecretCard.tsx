import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

// Carta secreta de la audiencia: cada estudiante ve solo la de su grupo contra su rival.
const EVIDENCIA: Record<string, string> = {
  A: 'Chat de WhatsApp', B: 'Correo del falso proveedor', C: 'Transferencia bancaria',
  D: 'Computador de la caja', E: 'Correo en la nube', F: 'Publicación en redes',
};

const SecretCard: React.FC<{ pathId: string }> = ({ pathId }) => {
  const [data, setData] = useState<{ group: string | null; rival?: string; card?: string } | null>(null);
  const [shown, setShown] = useState(false);

  const load = () => {
    supabase.rpc('my_hearing_card', { p_path: pathId }).then(({ data: d, error }) => {
      if (!error && d) setData(d as { group: string | null; rival?: string; card?: string });
    });
  };
  useEffect(load, [pathId]);

  if (!data) return null; // función aún no instalada o sin respuesta
  if (!data.group) {
    return <p className="my-4 text-sm text-amber-200">🔒 Elija su grupo en el Bloque 1 para recibir la carta secreta de la audiencia.</p>;
  }
  return (
    <div className="my-6 bg-slate-900/80 border border-amber-400/50 rounded-2xl p-5 text-left">
      <p className="text-lg font-bold text-amber-200">🔒 Carta secreta del Grupo {data.group}</p>
      <p className="text-sm text-slate-300 mt-1">
        Solo la ve su grupo. Su rival es el Grupo {data.rival} ({EVIDENCIA[data.rival ?? ''] ?? '—'}). No la muestren: úsenla en la audiencia junto con lo que hallaron como auditores.
      </p>
      {shown ? (
        <p className="mt-3 text-base text-white bg-amber-500/10 border border-amber-500/40 rounded-xl px-4 py-3">🃏 {data.card}</p>
      ) : (
        <button onClick={() => { load(); setShown(true); }} className="mt-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl px-4 py-2 text-sm">
          Ver nuestra carta
        </button>
      )}
    </div>
  );
};

export default SecretCard;
