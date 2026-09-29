import { supabase } from './supabaseClient';
import type { UserRole } from './types';

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

async function fetchProfile(userId: string): Promise<{ name: string; email: string; role: UserRole }> {
  const { data, error } = await supabase
    .from('profiles')
    .select('name, email, role')
    .eq('id', userId)
    .single();
  if (error || !data) throw new Error('No se pudo cargar el perfil del usuario.');
  return data as { name: string; email: string; role: UserRole };
}

export async function registerUser(name: string, email: string, password: string): Promise<SessionUser> {
  const { data, error } = await supabase.auth.signUp({
    email: email.toLowerCase().trim(),
    password,
    options: { data: { name: name.trim() } },
  });
  if (error) {
    if (error.message.toLowerCase().includes('already registered')) {
      throw new Error('Este correo ya está registrado en el sistema.');
    }
    throw new Error(error.message);
  }
  if (!data.user) throw new Error('No se pudo crear la cuenta. Intenta de nuevo.');

  // El trigger de la base de datos crea la fila en `profiles`; puede tardar un instante.
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const profile = await fetchProfile(data.user.id);
      return { id: data.user.id, ...profile };
    } catch {
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }
  return { id: data.user.id, name: name.trim(), email: email.toLowerCase().trim(), role: 'student' };
}

export async function loginUser(email: string, password: string): Promise<SessionUser> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase().trim(),
    password,
  });
  if (error) throw new Error('No existe una cuenta con ese correo o la contraseña es incorrecta.');
  if (!data.user) throw new Error('No se pudo iniciar sesión. Intenta de nuevo.');
  const profile = await fetchProfile(data.user.id);
  return { id: data.user.id, ...profile };
}

export async function getSession(): Promise<SessionUser | null> {
  const { data } = await supabase.auth.getSession();
  const user = data.session?.user;
  if (!user) return null;
  try {
    const profile = await fetchProfile(user.id);
    return { id: user.id, ...profile };
  } catch {
    return null;
  }
}

export async function logoutUser(): Promise<void> {
  await supabase.auth.signOut();
}
