import React, { forwardRef, useRef, useState } from 'react';
import { BRAND, appUrl } from '../platform';
import { ROUTE_CERTIFICATE_ID } from '../certificateService';
import type { Certificate } from '../certificateService';

// Color principal del badge por curso (el resto usa el azul de la marca).
const BADGE_COLORS: Record<string, [string, string]> = {
  cybersecurity: ['#2563eb', '#1e3a8a'],
  cybercrime: ['#dc2626', '#7f1d1d'],
  cybercriminology: ['#7c3aed', '#3b0764'],
  quantum_computing: ['#c026d3', '#4a044e'],
  forensic_auditing: ['#16a34a', '#14532d'],
  artificial_intelligence: ['#d97706', '#78350f'],
  ia_ofensiva_insider: ['#ea580c', '#7c2d12'],
  cert_csirt: ['#0d9488', '#134e4a'],
  auditoria_ciberriesgo: ['#e11d48', '#881337'],
  cti_basico: ['#8b5cf6', '#2e1065'],
  [ROUTE_CERTIFICATE_ID]: ['#eab308', '#713f12'],
};

/** Quita el prefijo "Ruta: " de los títulos de curso. */
export const cleanCourseTitle = (title: string) => title.replace(/^Ruta:\s*/, '');

const wrap = (text: string, max: number): string[] => {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(' ')) {
    if ((line + ' ' + word).trim().length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = (line + ' ' + word).trim();
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 4);
};

export const verifyUrl = (code: string) => appUrl(`?verificar=${encodeURIComponent(code)}`);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Bogota' });

/** Badge digital en SVG (400×460). */
export const BadgeSvg = forwardRef<SVGSVGElement, { pathId: string; title: string; year: string; size?: number }>(
  ({ pathId, title, year, size = 220 }, ref) => {
    const [c1, c2] = BADGE_COLORS[pathId] ?? ['#2563eb', '#1e3a8a'];
    const isRoute = pathId === ROUTE_CERTIFICATE_ID;
    const lines = wrap(title.toUpperCase(), 20);
    const gid = `g-${pathId}`;
    return (
      <svg ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 460" width={size} height={(size * 460) / 400} role="img" aria-label={`Badge: ${title}`}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={c1} />
            <stop offset="1" stopColor={c2} />
          </linearGradient>
        </defs>
        {/* Escudo */}
        <path d="M200 10 L380 70 V230 C380 340 300 410 200 450 C100 410 20 340 20 230 V70 Z" fill={`url(#${gid})`} />
        <path d="M200 30 L362 84 V230 C362 330 290 392 200 428 C110 392 38 330 38 230 V84 Z" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="3" />
        {/* Marca */}
        <text x="200" y="88" textAnchor="middle" fill="#ffffff" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="20" letterSpacing="3">CERT ACADÉMICO</text>
        <text x="200" y="110" textAnchor="middle" fill="#ffffff" fillOpacity="0.8" fontFamily="Arial, Helvetica, sans-serif" fontSize="13" letterSpacing="1">by RedCiber.org</text>
        {/* Sello central */}
        <circle cx="200" cy="168" r="38" fill="#ffffff" fillOpacity="0.15" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2" />
        {isRoute ? (
          <path d="M200 142 l8 17 19 2-14 13 4 19-17-10-17 10 4-19-14-13 19-2z" fill="#ffffff" />
        ) : (
          <path d="M184 168 l11 11 22-24" fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        )}
        {/* Curso */}
        {lines.map((l, i) => (
          <text key={i} x="200" y={256 + i * 26 - (lines.length - 1) * 9} textAnchor="middle" fill="#ffffff" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="21">{l}</text>
        ))}
        {/* Cinta */}
        <rect x="55" y="350" width="290" height="36" rx="6" fill="#ffffff" />
        <text x="200" y="374" textAnchor="middle" fill={c2} fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="15" letterSpacing="1">
          {isRoute ? 'RUTA COMPLETA' : 'CURSO COMPLETADO'} · {year}
        </text>
      </svg>
    );
  },
);

/** Hoja del certificado (horizontal, imprimible como PDF). */
export const CertificateSheet: React.FC<{ cert: Certificate; title: string }> = ({ cert, title }) => {
  const isRoute = cert.pathId === ROUTE_CERTIFICATE_ID;
  return (
    <div id="certificate-sheet" className="bg-white text-slate-900 rounded-xl p-8 md:p-12 border-[10px] border-double border-slate-800 aspect-[1.414/1] w-full flex flex-col justify-between">
      <div className="flex justify-between items-start gap-6">
        <div>
          <p className="text-xl md:text-2xl font-extrabold tracking-wide">CERT Académico</p>
          <p className="text-sm text-slate-500">by RedCiber.org</p>
        </div>
        <BadgeSvg pathId={cert.pathId} title={title} year={new Date(cert.issuedAt).getFullYear().toString()} size={90} />
      </div>
      <div className="text-center">
        <p className="uppercase tracking-[0.3em] text-xs md:text-sm text-slate-500 mb-2">
          {isRoute ? 'Certificado de finalización de ruta' : 'Certificado de finalización'}
        </p>
        <p className="text-sm text-slate-600 mb-1">Se otorga a</p>
        <p className="text-2xl md:text-4xl font-serif font-bold mb-3">{cert.recipientName}</p>
        <p className="text-sm text-slate-600 mb-1">{isRoute ? 'por completar la ruta' : 'por completar el curso'}</p>
        <p className="text-lg md:text-2xl font-bold">{title}</p>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 text-xs text-slate-500">
        <div>
          <p>Fecha de emisión: <span className="text-slate-800 font-semibold">{formatDate(cert.issuedAt)}</span></p>
          <p>Código: <span className="text-slate-800 font-mono font-semibold">{cert.code}</span></p>
          <p>Verificar en: <span className="text-slate-800">{verifyUrl(cert.code)}</span></p>
        </div>
        <p className="md:text-right max-w-xs">Acredita la finalización del contenido en la plataforma {BRAND}. No constituye un título académico ni una certificación profesional acreditada.</p>
      </div>
    </div>
  );
};

const downloadBadgePng = (svg: SVGSVGElement, fileName: string) => {
  const xml = new XMLSerializer().serializeToString(svg);
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 920;
    canvas.getContext('2d')?.drawImage(img, 0, 0, 800, 920);
    canvas.toBlob(blob => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  };
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`;
};

const linkedInUrl = (cert: Certificate, title: string) => {
  const d = new Date(cert.issuedAt);
  const params = new URLSearchParams({
    startTask: 'CERTIFICATION_NAME',
    name: title,
    organizationName: BRAND,
    issueYear: String(d.getFullYear()),
    issueMonth: String(d.getMonth() + 1),
    certUrl: verifyUrl(cert.code),
    certId: cert.code,
  });
  return `https://www.linkedin.com/profile/add?${params.toString()}`;
};

// Al imprimir, solo se muestra la hoja del certificado, en horizontal.
const PRINT_CSS = `
@media print {
  @page { size: A4 landscape; margin: 0; }
  body * { visibility: hidden !important; }
  #certificate-sheet, #certificate-sheet * { visibility: visible !important; }
  #certificate-sheet { position: fixed; inset: 0; margin: 0; border-radius: 0; width: 100%; height: 100%; }
}`;

/** Vista del titular: badge, certificado, compartir, descargar e imprimir. */
export const CredentialModal: React.FC<{ cert: Certificate; title: string; onClose: () => void }> = ({ cert, title, onClose }) => {
  const badgeRef = useRef<SVGSVGElement>(null);
  const [copied, setCopied] = useState(false);
  const url = verifyUrl(cert.code);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* el enlace sigue visible para copiarlo a mano */
    }
  };

  const btn = 'text-sm font-bold rounded-xl px-4 py-2.5 transition-colors text-center';
  return (
    <div className="fixed inset-0 z-50 bg-black/75 overflow-y-auto p-4" onClick={onClose}>
      <style>{PRINT_CSS}</style>
      <div className="max-w-4xl mx-auto my-6 bg-slate-900 border border-slate-700 rounded-2xl p-5 md:p-8 text-white" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-amber-300 text-sm font-semibold">🎖️ ¡Felicitaciones, {cert.recipientName.split(' ')[0]}!</p>
            <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xl" aria-label="Cerrar">✕</button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center mb-8">
          <BadgeSvg ref={badgeRef} pathId={cert.pathId} title={title} year={new Date(cert.issuedAt).getFullYear().toString()} />
          <div className="flex-1 w-full space-y-3">
            <p className="text-slate-300 text-sm">Este badge es verificable: cualquiera con el enlace puede confirmar que es auténtico.</p>
            <div className="flex gap-2">
              <input readOnly value={url} className="flex-1 min-w-0 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300" />
              <button onClick={copy} className={`${btn} bg-slate-700 hover:bg-slate-600`}>{copied ? '✓ Copiado' : 'Copiar'}</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <a href={linkedInUrl(cert, title)} target="_blank" rel="noopener noreferrer" className={`${btn} bg-[#0a66c2] hover:bg-[#004182]`}>
                Agregar a LinkedIn
              </a>
              <button onClick={() => badgeRef.current && downloadBadgePng(badgeRef.current, `badge-${cert.code}.png`)} className={`${btn} bg-blue-600 hover:bg-blue-500`}>
                ⬇ Badge (PNG)
              </button>
              <button onClick={() => window.print()} className={`${btn} bg-emerald-600 hover:bg-emerald-500`}>
                🖨 Certificado (PDF)
              </button>
            </div>
            <p className="text-slate-500 text-xs">Para el PDF, elija "Guardar como PDF" en la ventana de impresión.</p>
          </div>
        </div>

        <CertificateSheet cert={cert} title={title} />
      </div>
    </div>
  );
};
