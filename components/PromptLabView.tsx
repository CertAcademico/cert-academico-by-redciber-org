import React, { useMemo, useState } from 'react';
import type { PromptLabContent } from '../types';

// Laboratorio de prompts (fórmula R-T-C-F + límites). Todo ocurre en el navegador: nada se envía
// a ningún servidor hasta que el participante decide copiar el prompt o abrirlo en una IA.

type Key = 'rol' | 'tarea' | 'contexto' | 'formato' | 'limites';

const FIELDS: { key: Key; letter: string; label: string; hint: string; min: number }[] = [
  { key: 'rol', letter: 'R', label: 'Rol', hint: '¿Quién quiere que sea la IA? «Actúa como…»', min: 12 },
  { key: 'tarea', letter: 'T', label: 'Tarea', hint: '¿Qué debe hacer? Empiece con un verbo: escribe, resume, organiza…', min: 12 },
  { key: 'contexto', letter: 'C', label: 'Contexto', hint: '¿Para quién, con qué datos, en qué situación?', min: 20 },
  { key: 'formato', letter: 'F', label: 'Formato', hint: '¿Cómo lo quiere? Largo, tono, tabla, viñetas, emojis…', min: 10 },
  { key: 'limites', letter: '★', label: 'Límites (regla de oro)', hint: '¿Qué NO debe hacer? Sin datos personales, sin recomendar medicamentos…', min: 10 },
];

// Señales de datos personales o sensibles que no deberían ir en un prompt.
const RISKS: { re: RegExp; msg: string }[] = [
  { re: /\b\d{7,}\b/, msg: 'un número largo (¿cédula, teléfono o cuenta?)' },
  { re: /\b\d{3}[\s.-]\d{3,4}[\s.-]\d{4}\b/, msg: 'algo que parece un teléfono' },
  { re: /[\w.+-]+@[\w-]+\.[\w.]+/, msg: 'un correo electrónico' },
  { re: /c[eé]dula|contrase[nñ]a|clave del|historia cl[ií]nica|n[uú]mero de cuenta|tarjeta de cr[eé]dito/i, msg: 'una palabra de dato sensible (cédula, contraseña, historia clínica, cuenta…)' },
];

const AI_LINKS = [
  { name: 'ChatGPT', url: (q: string) => `https://chatgpt.com/?q=${encodeURIComponent(q)}` },
  { name: 'Copilot', url: (q: string) => `https://copilot.microsoft.com/?q=${encodeURIComponent(q)}` },
  { name: 'Perplexity', url: (q: string) => `https://www.perplexity.ai/search?q=${encodeURIComponent(q)}` },
];

const PromptLabView: React.FC<{ data: PromptLabContent }> = ({ data }) => {
  const [values, setValues] = useState<Record<Key, string>>({ rol: '', tarea: '', contexto: '', formato: '', limites: '' });
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(
    () => FIELDS.map(f => values[f.key].trim()).filter(Boolean).join('\n'),
    [values],
  );
  const done = FIELDS.filter(f => values[f.key].trim().length >= f.min);
  const coreDone = done.filter(f => f.key !== 'limites').length;
  const risks = RISKS.filter(r => r.re.test(prompt)).map(r => r.msg);
  const level = risks.length ? 'risk' : coreDone === 4 ? 'good' : coreDone >= 2 ? 'mid' : 'low';

  const set = (k: Key, v: string) => { setValues(s => ({ ...s, [k]: v })); setCopied(false); };
  // Atajo para quien se bloquea con la hoja en blanco: llena los vacíos con la primera sugerencia.
  const quickStart = () => {
    setValues(s => {
      const next = { ...s };
      FIELDS.forEach(f => { const first = data.suggestions[f.key]?.[0]; if (!next[f.key].trim() && first) next[f.key] = first; });
      return next;
    });
    setCopied(false);
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(prompt); setCopied(true); } catch { setCopied(false); }
  };

  const LEVEL: Record<string, { cls: string; text: string }> = {
    low: { cls: 'bg-rose-500/10 border-rose-500/40 text-rose-200', text: '🔴 Le faltan partes: complete al menos Rol, Tarea, Contexto y Formato.' },
    mid: { cls: 'bg-amber-500/10 border-amber-500/40 text-amber-200', text: `🟡 Va bien: tiene ${coreDone} de 4 partes. Complete las que faltan.` },
    good: { cls: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200', text: values.limites.trim().length >= 10 ? '🟢 ¡Prompt completo, con límites! Cópielo o ábralo en la IA.' : '🟢 Prompt completo. Para nota perfecta, agregue un límite (regla de oro).' },
    risk: { cls: 'bg-rose-500/15 border-rose-500/60 text-rose-100', text: `⚠️ Cuidado: su prompt parece incluir ${risks.join(' y ')}. Reemplácelo por algo genérico («Cliente A», «[TELÉFONO]») antes de usarlo.` },
  };

  return (
    <div className="my-6 bg-slate-800/60 border border-slate-600 rounded-2xl p-5 text-left space-y-4">
      <div>
        <p className="text-lg font-bold text-white">{data.title}</p>
        <p className="text-sm text-slate-300 mt-1">{data.description}</p>
      </div>
      {data.scenario && (
        <p className="text-sm text-sky-100 bg-sky-500/10 border border-sky-500/30 rounded-xl px-4 py-3 whitespace-pre-line">{data.scenario}</p>
      )}
      {data.weakPrompt && (
        <div className="text-sm bg-rose-500/10 border border-rose-500/30 rounded-xl px-4 py-3">
          <p className="text-xs uppercase tracking-widest text-rose-300 font-bold mb-1">Prompt débil a mejorar</p>
          <p className="font-mono text-rose-100">«{data.weakPrompt}»</p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 bg-violet-500/10 border border-violet-500/30 rounded-xl px-4 py-3">
        <button type="button" onClick={quickStart} className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold">
          ✨ Ayúdeme a empezar
        </button>
        <p className="text-xs text-violet-100 flex-1 min-w-[12rem]">Llena los campos vacíos con un ejemplo. Después cambie lo que quiera para que suene a su droguería.</p>
      </div>

      <div className="space-y-3">
        {FIELDS.map(f => {
          const ok = values[f.key].trim().length >= f.min;
          const sugg = data.suggestions[f.key] ?? [];
          return (
            <div key={f.key} className="bg-slate-900/70 border border-slate-700 rounded-xl p-3">
              <label className="flex items-center gap-2 text-sm font-bold text-white">
                <span className={`inline-grid place-items-center w-7 h-7 rounded-full text-xs font-black ${ok ? 'bg-emerald-400 text-slate-900' : 'bg-slate-700 text-slate-200'}`}>{ok ? '✓' : f.letter}</span>
                {f.label}
              </label>
              <p className="text-xs text-slate-400 mt-1 mb-2">{f.hint}</p>
              <textarea
                value={values[f.key]}
                onChange={e => set(f.key, e.target.value)}
                rows={2}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100"
                aria-label={f.label}
              />
              {sugg.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {sugg.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => set(f.key, s)}
                      className="text-left text-xs text-violet-100 bg-violet-500/10 border border-violet-500/30 hover:border-violet-400 rounded-lg px-2.5 py-1.5"
                    >
                      💡 {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Su prompt</p>
        <pre className="whitespace-pre-wrap font-sans text-sm text-emerald-100 bg-black/40 border border-slate-700 rounded-xl px-4 py-3 min-h-[3rem]">{prompt || 'Aquí aparecerá su prompt a medida que llene los campos.'}</pre>
      </div>

      <p className={`text-sm font-semibold rounded-lg px-3 py-2.5 border ${LEVEL[level].cls}`}>{LEVEL[level].text}</p>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={copy} disabled={!prompt} className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-sm font-bold">
          {copied ? '✓ Copiado' : '📋 Copiar prompt'}
        </button>
        {AI_LINKS.map(a => (
          <a
            key={a.name}
            href={prompt && !risks.length ? a.url(prompt) : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!prompt || risks.length > 0}
            className={`px-4 py-2 rounded-lg text-sm font-bold border ${prompt && !risks.length ? 'bg-slate-700 hover:bg-slate-600 border-slate-500 text-white' : 'opacity-40 pointer-events-none border-slate-700 text-slate-400'}`}
          >
            Abrir en {a.name} ↗
          </a>
        ))}
      </div>
      <p className="text-xs text-slate-400">Para Gemini o cualquier otra IA: copie el prompt y péguelo allí. Recuerde: la IA da un borrador; usted revisa, ajusta y decide.</p>
    </div>
  );
};

export default PromptLabView;
