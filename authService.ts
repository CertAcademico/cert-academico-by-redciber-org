import type { UserProfile } from './types';

const USERS_KEY = 'rc_users';
const SESSION_KEY = 'rc_session';

export type SessionUser = Pick<UserProfile, 'id' | 'name' | 'email'>;

async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest('SHA-256', enc.encode(password + 'rc_cert_2026'));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function getUsers(): UserProfile[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
  catch { return []; }
}

export async function registerUser(name: string, email: string, password: string): Promise<SessionUser> {
  const users = getUsers();
  const normalized = email.toLowerCase().trim();
  if (users.some(u => u.email === normalized)) {
    throw new Error('Este correo ya está registrado en el sistema.');
  }
  const user: UserProfile = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalized,
    passwordHash: await hashPassword(password),
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
  const session: SessionUser = { id: user.id, name: user.name, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export async function loginUser(email: string, password: string): Promise<SessionUser> {
  const users = getUsers();
  const user = users.find(u => u.email === email.toLowerCase().trim());
  if (!user) throw new Error('No existe una cuenta con ese correo electrónico.');
  if (user.passwordHash !== await hashPassword(password)) {
    throw new Error('La contraseña es incorrecta. Inténtalo de nuevo.');
  }
  const session: SessionUser = { id: user.id, name: user.name, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function getSession(): SessionUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function logoutUser(): void {
  localStorage.removeItem(SESSION_KEY);
}
