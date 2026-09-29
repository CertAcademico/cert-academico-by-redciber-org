import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Defínelas en .env.local (desarrollo) o en las variables de entorno del proyecto en Vercel (producción).',
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
