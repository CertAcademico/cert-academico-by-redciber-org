import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BadgeSvg, verifyUrl } from './Credential';
import { issueCertificate } from '../certificateService';
import { publishBadge } from '../publicationService';
import type { PublicationChannel } from '../publicationService';
import { PIONEER_HASHTAG } from '../platform';

// Publicar un badge para abrir el siguiente nivel: en LinkedIn (se pega el enlace de la publicación)
// o en el Muro de logros de la plataforma (mensaje visible para los usuarios registrados).

interface Props {
  pathId: string;
  title: string;
  nextTitle?: string;
  onClose: () => void;
  onPublished: (pathId: string) => void;
}

const PublishBadgeModal: React.FC<Props> = ({ pathId, title, nextTitle, onClose, onPublished }) => {
  const [code, setCode] = useState<string | null>(null);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [loadError, setLoadError] = useState('');
  const [channel, setChannel] = useState<PublicationChannel>('linkedin');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  // El badge del nivel terminado (si aún no lo había pedido, se emite ahora).
  useEffect(() => {
    issueCertificate(pathId)
      .then(c => { setCode(c.code); setYear(new Date(c.issuedAt).getFullYear().toString()); })
      .catch(err => setLoadError((err as Error).message));
  }, [pathId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const link = code ? verifyUrl(code) : '';
  const suggested = `🎓 Terminé «${title}» en CERT Académico by RedCiber.org y gané este badge verificable. ${nextTitle ? `Ahora voy por ${nextTitle}. ` : ''}Verifícalo aquí: ${link} ${PIONEER_HASHTAG} #Ciberseguridad`;

  const copy = async () => {
    try { await navigator.clipboard.writeText(suggested); setCopied(true); } catch { setCopied(false); }
  };

  const submit = async () => {
    setError('');
    if (channel === 'muro' && !consent) { setError('Marca la autorización para mostrar tu publicación en el Muro de logros.'); return; }
    setBusy(true);
    try {
      await publishBadge(pathId, channel, url, message);
      onPublished(pathId);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const tab = (c: PublicationChannel, label: string) => (
    <button type="button" role="tab" aria-selected={channel === c} onClick={() => { setChannel(c); setError(''); }}
      className={`flex-1 rounded-lg px-3 py-2 text-sm font-bold ${channel === c ? 'bg-white text-slate-900' : 'text-slate-300 hover:text-white'}`}>
      {label}
    </button>
  );

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start md:items-center justify-center p-4 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="pub-title" onClick={onClose}>
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 p-5 md:p-6 text-white my-8" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-300">📣 Publica tu badge para avanzar</p>
            <h2 id="pub-title" className="text-xl font-bold mt-1">{title}</h2>
            <p className="text-sm text-slate-300 mt-1">
              {nextTitle ? <>Al publicarlo se abre <strong className="text-white">{nextTitle}</strong>. </> : null}
              Contarlo te compromete, inspira a otros y le da valor a tu badge.
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="text-slate-400 hover:text-white text-2xl leading-none">×</button>
        </div>

        {loadError ? (
          <p className="mt-4 text-sm text-rose-200 bg-rose-500/10 border border-rose-500/40 rounded-lg px-3 py-2">{loadError}</p>
        ) : !code ? (
          <p className="mt-6 text-slate-400">Preparando tu badge…</p>
        ) : (
          <>
            <div className="mt-4 flex items-center gap-4 bg-slate-950/60 border border-slate-700 rounded-xl p-3">
              <BadgeSvg pathId={pathId} title={title} year={year} size={84} />
              <div className="text-sm min-w-0">
                <p className="text-slate-400">Enlace de verificación</p>
                <p className="font-mono text-xs text-sky-300 break-all">{link}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-1 bg-slate-800 rounded-xl p-1" role="tablist">
              {tab('linkedin', 'En LinkedIn')}
              {tab('muro', 'En el Muro de logros')}
            </div>

            {channel === 'linkedin' ? (
              <div className="mt-4 space-y-3 text-sm">
                <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-3">
                  <p className="font-bold">1. Copia el texto sugerido (o escribe el tuyo)</p>
                  <p className="mt-2 text-slate-300 whitespace-pre-wrap">{suggested}</p>
                  <button type="button" onClick={copy} className="mt-2 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-bold">{copied ? '✓ Copiado' : '📋 Copiar texto'}</button>
                </div>
                <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-3">
                  <p className="font-bold">2. Publícalo en LinkedIn</p>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`} target="_blank" rel="noopener noreferrer"
                    className="mt-2 inline-block px-3 py-1.5 rounded-lg bg-[#0a66c2] hover:bg-[#004182] text-white text-xs font-bold">Abrir LinkedIn ↗</a>
                  <p className="mt-2 text-xs text-slate-400">Pega el texto en la publicación. La publicación debe ser pública para que cuente.</p>
                </div>
                <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-3">
                  <label htmlFor="pub-url" className="font-bold">3. Pega aquí el enlace de tu publicación</label>
                  <input id="pub-url" type="url" inputMode="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://www.linkedin.com/posts/…"
                    className="mt-2 w-full bg-slate-950 border border-slate-600 rounded-lg px-3 py-2 text-slate-100" />
                  <p className="mt-1 text-xs text-slate-500">En LinkedIn: menú «…» de tu publicación → «Copiar enlace a la publicación».</p>
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-3 text-sm">
                <p className="text-slate-300">¿No usas LinkedIn? Publícalo en el Muro de logros: lo ven los usuarios registrados de CERT Académico.</p>
                <label htmlFor="pub-msg" className="font-bold block">Tu mensaje para la comunidad</label>
                <textarea id="pub-msg" value={message} onChange={e => setMessage(e.target.value)} rows={4} maxLength={500}
                  placeholder="Ej.: Lo que más me sirvió fue el laboratorio de pivoteo: ya sé seguir la infraestructura de una campaña de phishing."
                  className="w-full bg-slate-950 border border-slate-600 rounded-lg px-3 py-2 text-slate-100" />
                <p className={`text-xs text-right ${message.trim().length >= 20 ? 'text-emerald-300' : 'text-slate-500'}`}>{message.trim().length}/500 (mínimo 20)</p>
                <label className="flex items-start gap-2 text-slate-300">
                  <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 accent-emerald-500" />
                  <span>Autorizo que mi nombre, este badge, su código de verificación y mi mensaje se muestren a los usuarios registrados de la plataforma.</span>
                </label>
              </div>
            )}

            {error && <p className="mt-3 text-sm text-rose-200 bg-rose-500/10 border border-rose-500/40 rounded-lg px-3 py-2" role="alert">{error}</p>}

            <div className="mt-5 flex flex-wrap gap-2 justify-end">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-slate-600 text-slate-200 text-sm">Ahora no</button>
              <button type="button" onClick={submit} disabled={busy || (channel === 'linkedin' ? !url.trim() : message.trim().length < 20)}
                className="px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black text-sm font-black">
                {busy ? 'Publicando…' : nextTitle ? '🚀 Publicar y abrir el siguiente nivel' : '🚀 Publicar'}
              </button>
            </div>
            <p className="mt-3 text-[11px] text-slate-500">Las publicaciones se revisan; si un enlace no corresponde a tu badge, el equipo puede anularla y el nivel vuelve a quedar bloqueado. Si ya habías empezado el siguiente nivel antes de esta regla, no necesitas publicar para terminarlo.</p>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default PublishBadgeModal;
