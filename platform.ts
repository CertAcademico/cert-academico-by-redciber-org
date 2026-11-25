// Configuración del registro gratuito, la política de datos y los certificados.
// Si cambias FREE_ROUTE o el número de módulos de un curso, actualiza también
// free_route() y course_module_counts() en supabase/migrations/2026-10-22_*.sql.

export const BRAND = 'CERT Académico by RedCiber.org';

/** Campaña de registro gratuito (22 oct – 3 nov 2026): los 7 cursos iniciales, en orden; cada uno se desbloquea al terminar el anterior. */
export const FREE_ROUTE = [
  'cybersecurity',
  'cybercrime',
  'cybercriminology',
  'quantum_computing',
  'forensic_auditing',
  'artificial_intelligence',
  'cert_csirt',
];

/**
 * Campaña «Black Friday… pero gratis» (25 nov 2026 – 31 ene 2027). Mientras dure:
 * registro gratuito abierto y todos los cursos abiertos, incluidos los niveles Intermedio y Avanzado
 * del mapa (cada nivel exige el anterior). Debe coincidir con campaign_open() en
 * supabase/migrations/2026-11-25_campana_black_friday.sql.
 */
export const CAMPAIGN_UNTIL = '2027-01-31T23:59:59-05:00';
export const isCampaignOpen = (now = Date.now()) => now <= Date.parse(CAMPAIGN_UNTIL);

/** Cursos de eventos que la campaña no abre: siguen solo para su público. */
export const CAMPAIGN_EXCLUDED = ['auditoria_ciberriesgo', 'prueba_digital', 'antisuplantacion_seguros', 'ia_farmacias'];

/** Reto Pionero: badge especial para quien publique primero su badge (lo otorga el administrador). */
export const PIONEER_BADGE_ID = 'pionero_2026';
export const PIONEER_HASHTAG = '#CERTAcadémico';

/** Último momento para registrarse gratis (hora de Colombia). Debe coincidir con handle_new_user(). */
export const REGISTRATION_DEADLINE = CAMPAIGN_UNTIL;

export const isRegistrationOpen = (now = Date.now()) => now <= Date.parse(REGISTRATION_DEADLINE);

/**
 * Registro con código de un evento (conferencia de antisuplantación con INIF y taller de IA para droguistas).
 * Cada código y su fecha límite se validan en handle_new_user()
 * (supabase/migrations/2026-11-23_curso_ia_farmacias.sql); acá solo la fecha más lejana, para mostrar el campo.
 */
export const EVENT_REGISTRATION_DEADLINE = '2027-01-31T23:59:59-05:00';
export const isEventRegistrationOpen = (now = Date.now()) => now <= Date.parse(EVENT_REGISTRATION_DEADLINE);

/** Logos de aliados por curso (co-marca en la tarjeta, el encabezado y el certificado). */
export const PARTNER_LOGOS: Record<string, { src: string; alt: string; label: string }> = {
  antisuplantacion_seguros: { src: '/materiales/marca/logo-inif.png', alt: 'INIF', label: 'En alianza con' },
};

/** Versión de la política que acepta quien se registra (se guarda con su consentimiento). */
export const POLICY_VERSION = '2026-10-24';

/**
 * Datos del Responsable del Tratamiento (Ley 1581 de 2012, art. 17 y Decreto 1074 de 2015).
 * COMPLETAR antes de difundir el registro: se muestran en la política publicada.
 */
export const DATA_CONTROLLER = {
  name: 'RedCiber.org',
  legalId: '', // NIT o documento de identificación
  address: '', // Domicilio y ciudad
  email: '', // Correo para consultas y reclamos sobre datos personales
  phone: '', // Opcional
};

export const appUrl = (query = '') => `${window.location.origin}${import.meta.env.BASE_URL}${query}`;
