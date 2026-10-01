import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin, serviceClient, generatePassword } from './_shared.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido.' });
    return;
  }

  const adminId = await requireAdmin(req, res);
  if (!adminId) return;

  const { email } = (req.body ?? {}) as { email?: string };
  const cleanEmail = (email || '').toLowerCase().trim();
  if (!cleanEmail) {
    res.status(400).json({ error: 'Falta el correo.' });
    return;
  }

  const supabase = serviceClient();

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', cleanEmail)
    .single();
  if (profileError || !profile) {
    res.status(404).json({ error: 'No existe ninguna cuenta con ese correo.' });
    return;
  }

  const password = generatePassword(14);
  const { error: updateError } = await supabase.auth.admin.updateUserById(profile.id, { password });
  if (updateError) {
    res.status(500).json({ error: `No se pudo restablecer la contraseña: ${updateError.message}` });
    return;
  }

  res.status(200).json({ email: cleanEmail, password });
}
