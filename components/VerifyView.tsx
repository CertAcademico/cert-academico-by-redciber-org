import React, { useEffect, useState } from 'react';
import { verifyCertificate, ROUTE_CERTIFICATE_ID, ROUTE_CERTIFICATE_TITLE } from '../certificateService';
import type { Certificate } from '../certificateService';
import { fetchLearningPaths } from '../api';
import { BadgeSvg, CertificateSheet, cleanCourseTitle } from './Credential';
import { BRAND } from '../platform';

/** Página pública: /app/?verificar=CÓDIGO. Muestra nombre, curso y fecha; nunca el correo. */
const VerifyView: React.FC<{ code: string }> = ({ code }) => {
  const [state, setState] = useState<'loading' | 'valid' | 'invalid'>('loading');
  const [cert, setCert] = useState<Certificate | null>(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    let cancelled = false;
    Promise.all([verifyCertificate(code), fetchLearningPaths()]).then(([c, paths]) => {
      if (cancelled) return;
      if (!c) { setState('invalid'); return; }
      setCert(c);
      setTitle(c.pathId === ROUTE_CERTIFICATE_ID ? ROUTE_CERTIFICATE_TITLE : cleanCourseTitle(paths[c.pathId]?.title ?? c.pathId));
      setState('valid');
    });
    return () => { cancelled = true; };
  }, [code]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-slate-400 text-sm mb-6">{BRAND} · Verificación de credenciales</p>
        {state === 'loading' && <p className="text-center text-slate-400">Verificando…</p>}
        {state === 'invalid' && (
          <div className="max-w-md mx-auto text-center bg-rose-500/10 border border-rose-500/30 rounded-2xl p-6">
            <p className="text-3xl mb-2">❌</p>
            <p className="font-bold text-lg mb-1">Credencial no encontrada</p>
            <p className="text-slate-300 text-sm">El código <span className="font-mono">{code}</span> no corresponde a ningún badge o certificado emitido por {BRAND}.</p>
          </div>
        )}
        {state === 'valid' && cert && (
          <>
            <div className="flex flex-col md:flex-row items-center gap-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 mb-6">
              <BadgeSvg pathId={cert.pathId} title={title} year={new Date(cert.issuedAt).getFullYear().toString()} size={160} />
              <div>
                <p className="text-emerald-300 font-bold text-lg mb-2">✅ Credencial válida</p>
                <p className="text-slate-200"><span className="text-slate-400">Titular:</span> {cert.recipientName}</p>
                <p className="text-slate-200"><span className="text-slate-400">Curso:</span> {title}</p>
                <p className="text-slate-200">
                  <span className="text-slate-400">Emitida:</span>{' '}
                  {new Date(cert.issuedAt).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Bogota' })}
                </p>
                <p className="text-slate-200"><span className="text-slate-400">Código:</span> <span className="font-mono">{cert.code}</span></p>
              </div>
            </div>
            <CertificateSheet cert={cert} title={title} />
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyView;
