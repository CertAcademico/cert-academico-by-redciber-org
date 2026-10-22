import { supabase } from './supabaseClient';
import type { UserRole } from './types';
import { POLICY_VERSION, appUrl } from './platform';

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
  const profile = data as { name: string; email: string; role: UserRole };
  // Un estudiante de la EAN que se autoregistró queda como cert_student (el trigger da ese rol a
  // todo correo fuera de allowed_emails), pero pertenece a la cohorte de pregrado, no a CERTs/CSIRTs.
  if (profile.role === 'cert_student' && profile.email.toLowerCase().endsWith('@universidadean.edu.co')) {
    profile.role = 'student';
  }
  return profile;
}

/** Si el proyecto exige confirmar el correo, el registro no inicia sesión: hay que abrir el enlace enviado. */
export type RegisterResult = { user: SessionUser } | { needsConfirmation: true; email: string };

export class EmailNotConfirmedError extends Error {}

const confirmRedirect = () => appUrl();

export async function registerUser(
  name: string,
  email: string,
  password: string,
  captchaToken?: string,
): Promise<RegisterResult> {
  const cleanEmail = email.toLowerCase().trim();
  const { data, error } = await supabase.auth.signUp({
    email: cleanEmail,
    password,
    options: {
      data: { name: name.trim(), data_consent_version: POLICY_VERSION },
      emailRedirectTo: confirmRedirect(),
      captchaToken,
    },
  });
  if (error) {
    const msg = error.message.toLowerCase();
    if (msg.includes('already registered')) {
      throw new Error('Este correo ya está registrado en el sistema.');
    }
    if (msg.includes('captcha')) {
      throw new Error('No pudimos verificar que eres una persona. Completa la verificación e intenta de nuevo.');
    }
    if (msg.includes('rate limit')) {
      throw new Error('Hay muchos registros en este momento. Espera unos minutos e intenta de nuevo.');
    }
    // Supabase envuelve las excepciones del trigger handle_new_user() en un mensaje genérico.
    if (error.message.includes('REGISTRATION_CLOSED') || error.message.includes('CONSENT_REQUIRED') || error.message.includes('Database error saving new user')) {
      throw new Error('No fue posible completar el registro. El registro gratuito está abierto hasta el 31 de octubre y requiere aceptar la Política de Tratamiento de Datos Personales.');
    }
    throw new Error(error.message);
  }
  if (!data.user) throw new Error('No se pudo crear la cuenta. Intenta de nuevo.');
  // Con confirmación de correo activa, Supabase no revela si el correo ya existía: devuelve un
  // usuario sin identidades.
  if (data.user.identities && data.user.identities.length === 0) {
    throw new Error('Este correo ya está registrado en el sistema. Inicia sesión.');
  }
  if (!data.session) return { needsConfirmation: true, email: cleanEmail };

  // El trigger de la base de datos crea la fila en `profiles`; puede tardar un instante.
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const profile = await fetchProfile(data.user.id);
      return { user: { id: data.user.id, ...profile } };
    } catch {
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }
  throw new Error('Tu cuenta se creó, pero no pudimos cargar tu perfil. Inicia sesión.');
}

export async function loginUser(email: string, password: string, captchaToken?: string): Promise<SessionUser> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase().trim(),
    password,
    options: { captchaToken },
  });
  if (error) {
    const msg = error.message.toLowerCase();
    if (msg.includes('email not confirmed')) {
      throw new EmailNotConfirmedError('Aún no has confirmado tu correo. Abre el enlace que te enviamos o pide uno nuevo.');
    }
    if (msg.includes('captcha')) {
      throw new Error('No pudimos verificar que eres una persona. Completa la verificación e intenta de nuevo.');
    }
    throw new Error('No existe una cuenta con ese correo o la contraseña es incorrecta.');
  }
  if (!data.user) throw new Error('No se pudo iniciar sesión. Intenta de nuevo.');
  const profile = await fetchProfile(data.user.id);
  return { id: data.user.id, ...profile };
}

export async function resendConfirmation(email: string, captchaToken?: string): Promise<void> {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email.toLowerCase().trim(),
    options: { emailRedirectTo: confirmRedirect(), captchaToken },
  });
  if (error) {
    if (error.message.toLowerCase().includes('rate limit') || error.message.toLowerCase().includes('seconds')) {
      throw new Error('Ya enviamos un correo hace poco. Espera un minuto antes de pedir otro.');
    }
    throw new Error('No se pudo reenviar el correo. Intenta de nuevo en unos minutos.');
  }
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

export async function changePassword(newPassword: string): Promise<void> {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) {
    if (error.message.toLowerCase().includes('different from the old')) {
      throw new Error('La nueva contraseña debe ser distinta de la actual.');
    }
    throw new Error(error.message);
  }
}
