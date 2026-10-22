import React, { forwardRef, useRef, useState } from 'react';
import { BRAND, FREE_ROUTE, appUrl } from '../platform';
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
  return lines;
};

export const verifyUrl = (code: string) => appUrl(`?verificar=${encodeURIComponent(code)}`);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Bogota' });

// Título corto que cabe en el badge (el certificado usa el título completo).
const BADGE_TITLES: Record<string, string> = {
  cybersecurity: 'Fundamentos de Ciberseguridad',
  cybercrime: 'Investigación del Cibercrimen',
  cybercriminology: 'Principios de Cibercriminología',
  quantum_computing: 'Computación Cuántica',
  forensic_auditing: 'Auditoría Forense Digital',
  artificial_intelligence: 'Inteligencia Artificial y LLMs',
  ia_ofensiva_insider: 'IA Ofensiva e Insider',
  cert_csirt: 'CERTs y CSIRTs',
  auditoria_ciberriesgo: 'Auditoría del Riesgo Cibernético',
  cti_basico: 'Cyber Threat Intelligence',
  [ROUTE_CERTIFICATE_ID]: 'Ruta de Ciberseguridad',
};

/** Ícono de cada curso, dibujado en una caja de 64×64. */
const BadgeIcon: React.FC<{ pathId: string; color: string }> = ({ pathId, color }) => {
  const s = { fill: 'none', stroke: color, strokeWidth: 4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (pathId) {
    case 'cybersecurity': // escudo con candado
      return (<g {...s}><path d="M32 4 L56 13 V30 C56 46 45 56 32 61 C19 56 8 46 8 30 V13 Z" /><rect x="22" y="30" width="20" height="15" rx="3" /><path d="M26 30 V25 a6 6 0 0 1 12 0 V30" /></g>);
    case 'cybercrime': // lupa de investigación
      return (<g {...s}><circle cx="27" cy="27" r="18" /><path d="M40 40 L57 57" strokeWidth={6} /><path d="M27 17 V29" /><circle cx="27" cy="36" r="1.5" fill={color} /></g>);
    case 'cybercriminology': // perfil con interrogante: la mente del delincuente
      return (<g {...s}><path d="M22 60 V47 C14 43 9 35 11 25 C13 13 24 5 36 6 C48 7 56 18 54 30 L58 38 L53 40 V47 C53 51 50 53 46 52 L41 51 V60" /><path d="M28 21 a6 6 0 1 1 8 6 c-2 1 -3 2 -3 5" /><circle cx="33" cy="38" r="1.5" fill={color} /></g>);
    case 'quantum_computing': // átomo
      return (<g {...s} strokeWidth={3.5}><ellipse cx="32" cy="32" rx="27" ry="10" /><ellipse cx="32" cy="32" rx="27" ry="10" transform="rotate(60 32 32)" /><ellipse cx="32" cy="32" rx="27" ry="10" transform="rotate(120 32 32)" /><circle cx="32" cy="32" r="4" fill={color} /></g>);
    case 'forensic_auditing': // huella digital
      return (<g {...s} strokeWidth={3.5}><path d="M14 40 C12 30 14 20 22 13 C29 7 41 7 48 14 C54 20 55 30 53 40" /><path d="M21 50 C18 40 18 29 24 22 C29 17 37 17 42 23 C46 28 46 38 44 48" /><path d="M29 57 C26 48 26 37 29 30 C31 26 35 26 37 30 C39 37 38 46 36 55" /><path d="M32 33 C33 42 32 50 29 58" /></g>);
    case 'artificial_intelligence': // chip de IA
      return (<g {...s}><rect x="15" y="15" width="34" height="34" rx="5" /><path d="M24 15 V7 M32 15 V7 M40 15 V7 M24 49 V57 M32 49 V57 M40 49 V57 M15 24 H7 M15 32 H7 M15 40 H7 M49 24 H57 M49 32 H57 M49 40 H57" /><text x="32" y="38" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="16" fill={color} stroke="none">IA</text></g>);
    case 'cert_csirt': // radar de respuesta a incidentes
      return (<g {...s}><circle cx="32" cy="32" r="26" /><circle cx="32" cy="32" r="15" /><path d="M32 32 L50 14" /><circle cx="44" cy="22" r="3" fill={color} /><circle cx="32" cy="32" r="2.5" fill={color} /></g>);
    case 'ia_ofensiva_insider': // mira
      return (<g {...s}><circle cx="32" cy="32" r="22" /><circle cx="32" cy="32" r="8" /><path d="M32 4 V16 M32 48 V60 M4 32 H16 M48 32 H60" /></g>);
    case 'auditoria_ciberriesgo': // portapapeles con visto bueno
      return (<g {...s}><rect x="13" y="10" width="38" height="48" rx="5" /><rect x="23" y="5" width="18" height="10" rx="3" /><path d="M22 36 L29 43 L43 27" /></g>);
    case 'cti_basico': // ojo de inteligencia
      return (<g {...s}><path d="M4 32 C14 15 50 15 60 32 C50 49 14 49 4 32 Z" /><circle cx="32" cy="32" r="10" /><circle cx="32" cy="32" r="3.5" fill={color} /></g>);
    case ROUTE_CERTIFICATE_ID: // trofeo
      return (<g {...s}><path d="M20 8 H44 V22 C44 32 39 39 32 39 C25 39 20 32 20 22 Z" /><path d="M20 13 H11 C11 23 15 28 21 28 M44 13 H53 C53 23 49 28 43 28" /><path d="M32 39 V49 M23 57 H41 M26 49 H38" /></g>);
    default: // visto bueno genérico
      return (<g {...s}><circle cx="32" cy="32" r="26" /><path d="M20 33 L29 42 L45 24" /></g>);
  }
};

/** Badge digital en SVG (400×460): hexágono con ícono del curso, título y posición en la ruta. */
export const BadgeSvg = forwardRef<SVGSVGElement, { pathId: string; title: string; year: string; size?: number }>(
  ({ pathId, title, year, size = 220 }, ref) => {
    const [c1, c2] = BADGE_COLORS[pathId] ?? ['#2563eb', '#1e3a8a'];
    const isRoute = pathId === ROUTE_CERTIFICATE_ID;
    const routeIndex = FREE_ROUTE.indexOf(pathId);
    const ribbon = isRoute
      ? `RUTA COMPLETA · ${year}`
      : routeIndex >= 0
        ? `CURSO ${routeIndex + 1} DE ${FREE_ROUTE.length} · ${year}`
        : `CURSO COMPLETADO · ${year}`;
    const lines = wrap((BADGE_TITLES[pathId] ?? cleanCourseTitle(title)).toUpperCase(), 17).slice(0, 3);
    const id = `b-${pathId}`;
    const hex = 'M200 22 L367 118 V310 L200 406 L33 310 V118 Z';
    const font = 'Arial, Helvetica, sans-serif';
    return (
      <svg ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 460" width={size} height={(size * 460) / 400} role="img" aria-label={`Badge: ${title}`}>
        <defs>
          <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={c1} />
            <stop offset="1" stopColor={c2} />
          </linearGradient>
          <pattern id={`${id}-p`} width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M0 14 H10 L14 10 V0 M28 14 H18 L14 18 V28" fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="1.5" />
            <circle cx="14" cy="14" r="1.6" fill="#ffffff" fillOpacity="0.1" />
          </pattern>
          <clipPath id={`${id}-c`}><path d={hex} /></clipPath>
        </defs>
        {/* Hexágono con borde y textura de circuito */}
        <path d={hex} fill={c2} stroke={c2} strokeWidth="18" strokeLinejoin="round" />
        <path d={hex} fill={`url(#${id}-g)`} />
        <rect width="400" height="460" fill={`url(#${id}-p)`} clipPath={`url(#${id}-c)`} />
        <path d="M200 40 L351 127 V301 L200 388 L49 301 V127 Z" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" strokeLinejoin="round" />
        {/* Marca */}
        <text x="200" y="88" textAnchor="middle" fill="#ffffff" fontFamily={font} fontWeight="700" fontSize="15" letterSpacing="3">CERT ACADÉMICO</text>
        {/* Ícono del curso */}
        <circle cx="200" cy="152" r="50" fill="#ffffff" />
        <circle cx="200" cy="152" r="54" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="6" />
        <g transform="translate(161.6 113.6) scale(1.2)"><BadgeIcon pathId={pathId} color={c2} /></g>
        {/* Título del curso */}
        {lines.map((l, i) => (
          <text key={i} x="200" y={236 + i * 25} textAnchor="middle" fill="#ffffff" fontFamily={font} fontWeight="700" fontSize="20">{l}</text>
        ))}
        {/* Cinta con extremos plegados */}
        <path d="M14 326 L44 326 L44 362 L14 362 L26 344 Z" fill={c2} />
        <path d="M386 326 L356 326 L356 362 L386 362 L374 344 Z" fill={c2} />
        <rect x="34" y="318" width="332" height="38" rx="4" fill="#ffffff" />
        <text x="200" y="343" textAnchor="middle" fill={c2} fontFamily={font} fontWeight="700" fontSize="16" letterSpacing="1.5">{ribbon}</text>
        {/* Firma de la marca */}
        <text x="200" y="384" textAnchor="middle" fill="#ffffff" fillOpacity="0.85" fontFamily={font} fontSize="13" letterSpacing="1">by RedCiber.org</text>
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
