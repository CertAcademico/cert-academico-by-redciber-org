import { supabase } from './supabaseClient';

export const ROUTE_CERTIFICATE_ID = 'ruta_completa';
export const ROUTE_CERTIFICATE_TITLE = 'Ruta de Ciberseguridad: de Fundamentos a CERTs y CSIRTs';

export interface Certificate {
  code: string;
  pathId: string;
  recipientName: string;
  issuedAt: string;
}

interface CertificateRow {
  code: string;
  path_id: string;
  recipient_name: string;
  issued_at: string;
}

const toCertificate = (r: CertificateRow): Certificate => ({
  code: r.code,
  pathId: r.path_id,
  recipientName: r.recipient_name,
  issuedAt: r.issued_at,
});

export async function getMyCertificates(userId: string): Promise<Certificate[]> {
  const { data, error } = await supabase
    .from('certificates')
    .select('code, path_id, recipient_name, issued_at')
    .eq('user_id', userId);
  if (error || !data) return [];
  return (data as CertificateRow[]).map(toCertificate);
}

/** Emite (o devuelve, si ya existe) el certificado del curso. El servidor valida el progreso. */
export async function issueCertificate(pathId: string): Promise<Certificate> {
  const { data, error } = await supabase.rpc('issue_certificate', { p_path_id: pathId });
  if (error || !data) {
    const msg = error?.message ?? '';
    if (msg.includes('COURSE_NOT_COMPLETED') || msg.includes('ROUTE_NOT_COMPLETED')) {
      throw new Error('Aún no se puede emitir: completa todos los módulos, aprueba el examen del nivel (si lo tiene) y dedica al menos 10 minutos a cada curso.');
    }
    if (msg.includes('PREREQUISITE_NOT_COMPLETED')) {
      throw new Error('Aún no se puede emitir: primero debes completar el nivel anterior de esta ruta.');
    }
    if (msg.includes('issue_certificate')) {
      throw new Error('Los certificados todavía no están habilitados en la plataforma. Intenta más tarde.');
    }
    throw new Error('No se pudo emitir el certificado. Intenta de nuevo.');
  }
  return toCertificate(data as CertificateRow);
}

/** Verificación pública (sin sesión): no devuelve el correo del titular. */
export async function verifyCertificate(code: string): Promise<Certificate | null> {
  const { data, error } = await supabase.rpc('verify_certificate', { p_code: code });
  const rows = data as CertificateRow[] | null;
  if (error || !rows || rows.length === 0) return null;
  return toCertificate(rows[0]);
}
