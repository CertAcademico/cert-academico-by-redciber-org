import type { VercelRequest, VercelResponse } from '@vercel/node';

// Cron diario (vercel.json): una consulta mínima a la base de datos para que Supabase no pause
// el proyecto gratuito por inactividad (lo hace tras 7 días). Si se pausara, dejarían de
// funcionar los enlaces de verificación de badges compartidos en LinkedIn.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Vercel envía "Authorization: Bearer <CRON_SECRET>" en las llamadas del cron.
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.authorization !== `Bearer ${secret}`) {
    res.status(401).json({ error: 'No autorizado.' });
    return;
  }

  const url = process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    res.status(500).json({ error: 'Faltan las variables de Supabase.' });
    return;
  }

  // Misma consulta que la verificación pública, con un código que no existe.
  const r = await fetch(`${url}/rest/v1/rpc/verify_certificate`, {
    method: 'POST',
    headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p_code: 'KEEPALIVE' }),
  });
  res.status(r.ok ? 200 : 502).json({ ok: r.ok, supabaseStatus: r.status, at: new Date().toISOString() });
}
