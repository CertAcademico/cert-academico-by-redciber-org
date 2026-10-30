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

/** Último momento para registrarse gratis (hora de Colombia). Debe coincidir con handle_new_user(). */
export const REGISTRATION_DEADLINE = '2026-11-03T23:59:59-05:00';

export const isRegistrationOpen = (now = Date.now()) => now <= Date.parse(REGISTRATION_DEADLINE);

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
