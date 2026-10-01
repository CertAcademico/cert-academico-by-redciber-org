import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin, serviceClient, generatePassword } from './_shared.js';

const VALID_ROLES = ['student', 'teacher', 'tutor', 'admin'];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido.' });
    return;
  }

  const adminId = await requireAdmin(req, res);
  if (!adminId) return;

  const { name, email, role } = (req.body ?? {}) as { name?: string; email?: string; role?: string };
  const cleanEmail = (email || '').toLowerCase().trim();
  const cleanName = (name || '').trim();

  if (!cleanName || !cleanEmail || !role || !VALID_ROLES.includes(role)) {
    res.status(400).json({ error: 'Faltan datos: nombre, correo y un rol válido (student/teacher/tutor/admin).' });
    return;
  }

  const supabase = serviceClient();
  const password = generatePassword(14);

  const { error: allowError } = await supabase
    .from('allowed_emails')
    .upsert({ email: cleanEmail, role }, { onConflict: 'email' });
  if (allowError) {
    res.status(500).json({ error: `No se pudo autorizar el correo: ${allowError.message}` });
    return;
  }

  const { data: created, error: createError } = await supabase.auth.admin.createUser({
    email: cleanEmail,
    password,
    email_confirm: true,
    user_metadata: { name: cleanName },
  });

  if (createError) {
    res.status(500).json({ error: `No se pudo crear la cuenta: ${createError.message}` });
    return;
  }

  res.status(200).json({ email: cleanEmail, password, userId: created.user?.id });
}
