import React, { useEffect, useState } from 'react';
import type { HashLabContent } from '../types';

// Huella SHA-256 calculada en el navegador (Web Crypto): nada sale del dispositivo.
const toHex = (buf: ArrayBuffer) => Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
const sha256 = async (data: ArrayBuffer) => toHex(await crypto.subtle.digest('SHA-256', data));
const textBytes = (t: string) => new TextEncoder().encode(t).buffer as ArrayBuffer;

interface Slot { label: string; hash: string | null; source: string }

const HashLabView: React.FC<{ data: HashLabContent }> = ({ data }) => {
  const [textA, setTextA] = useState(data.sample);
  const [textB, setTextB] = useState(data.sample.replace(/\$4\.850\.000/, '$14.850.000'));
  const [a, setA] = useState<Slot>({ label: 'Original', hash: null, source: 'texto' });
  const [b, setB] = useState<Slot>({ label: 'Copia a comparar', hash: null, source: 'texto' });

  useEffect(() => { sha256(textBytes(textA)).then(h => setA(s => ({ ...s, hash: h, source: 'texto' }))); }, [textA]);
  useEffect(() => { sha256(textBytes(textB)).then(h => setB(s => ({ ...s, hash: h, source: 'texto' }))); }, [textB]);

  const pickFile = (set: React.Dispatch<React.SetStateAction<Slot>>) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    set(s => ({ ...s, hash: null, source: f.name }));
    const h = await sha256(await f.arrayBuffer());
    set(s => ({ ...s, hash: h, source: f.name }));
  };

  const same = a.hash !== null && a.hash === b.hash;
  const diffCount = a.hash && b.hash ? [...a.hash].filter((c, i) => c !== b.hash![i]).length : 0;

  const box = (slot: Slot, text: string, setText: (v: string) => void, set: React.Dispatch<React.SetStateAction<Slot>>) => (
    <div className="flex-1 min-w-0 bg-slate-900/70 border border-slate-700 rounded-xl p-4 space-y-2">
      <p className="text-xs uppercase tracking-widest text-slate-400">{slot.label}</p>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows={3}
        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100"
        aria-label={`Texto: ${slot.label}`}
      />
      <label className="block text-xs text-sky-300 cursor-pointer">
        📎 o elija un archivo
        <input type="file" className="hidden" onChange={pickFile(set)} />
      </label>
      <p className="text-[11px] text-slate-500">Huella de: {slot.source}</p>
      <p className="font-mono text-[11px] break-all text-emerald-200 bg-black/40 rounded px-2 py-1.5">{slot.hash ?? 'Calculando…'}</p>
    </div>
  );

  return (
    <div className="my-6 bg-slate-800/60 border border-slate-600 rounded-2xl p-5 text-left">
      <p className="text-lg font-bold text-white">{data.title}</p>
      <p className="text-sm text-slate-300 mt-1">{data.description}</p>
      <div className="flex flex-col md:flex-row gap-3 mt-4">
        {box(a, textA, setTextA, setA)}
        {box(b, textB, setTextB, setB)}
      </div>
      {a.hash && b.hash && (
        <p className={`mt-4 text-sm font-semibold rounded-lg px-3 py-2.5 border ${same ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200' : 'bg-rose-500/10 border-rose-500/40 text-rose-200'}`}>
          {same
            ? '✅ Las huellas son idénticas: el contenido es exactamente el mismo.'
            : `❌ Las huellas no coinciden (${diffCount} de 64 caracteres distintos): el contenido cambió, aunque sea en un solo carácter.`}
        </p>
      )}
    </div>
  );
};

export default HashLabView;
