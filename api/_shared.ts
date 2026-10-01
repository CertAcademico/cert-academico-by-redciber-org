import { createClient } from '@supabase/supabase-js';
import { randomInt } from 'crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL as string;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
const ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY as string;

export function serviceClient() {
  return createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
}

// Valida el access_token del caller y confirma que su perfil tiene role='admin'.
// Devuelve el id del admin si es válido, o null si no lo es (401/403 ya resueltos).
export async function requireAdmin(req: VercelRequest, res: VercelResponse): Promise<string | null> {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!token) {
    res.status(401).json({ error: 'Falta el token de sesión.' });
    return null;
  }

  const asCaller = createClient(SUPABASE_URL, ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const { data: userData, error: userError } = await asCaller.auth.getUser();
  if (userError || !userData.user) {
    res.status(401).json({ error: 'Sesión inválida o expirada.' });
    return null;
  }

  const admin = serviceClient();
  const { data: profile, error: profileError } = await admin
    .from('profiles')
    .select('role')
    .eq('id', userData.user.id)
    .single();
  if (profileError || !profile || profile.role !== 'admin') {
    res.status(403).json({ error: 'Esta acción requiere permisos de administrador.' });
    return null;
  }

  return userData.user.id;
}

const PASSWORD_CHARSET = 'abcdefghjkmnpqrstuvwxyz23456789';

export function generatePassword(length = 14): string {
  let out = '';
  for (let i = 0; i < length; i++) {
    out += PASSWORD_CHARSET[randomInt(PASSWORD_CHARSET.length)];
  }
  return out;
}
