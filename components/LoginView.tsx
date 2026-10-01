import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { registerUser, loginUser } from '../authService';
import type { SessionUser } from '../authService';

interface LoginViewProps {
  onLogin: (user: SessionUser) => void;
}

type Tab = 'login' | 'register';

const inputCls =
  'w-full bg-slate-900/80 border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors text-sm';

const ShieldIcon: React.FC = () => (
  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
  </svg>
);

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [tab, setTab] = useState<Tab>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');

  const switchTab = (t: Tab) => { setTab(t); setError(''); };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!loginEmail || !loginPassword) { setError('Completa todos los campos.'); return; }
    setIsLoading(true);
    try {
      onLogin(await loginUser(loginEmail, loginPassword));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!regName || !regEmail || !regPassword || !regConfirm) { setError('Completa todos los campos.'); return; }
    if (regPassword.length < 6) { setError('La contraseña debe tener al menos 6 caracteres.'); return; }
    if (regPassword !== regConfirm) { setError('Las contraseñas no coinciden.'); return; }
    setIsLoading(true);
    try {
      onLogin(await registerUser(regName, regEmail, regPassword));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient decorative blobs */}
      <div className="absolute top-1/4 left-1/5 w-80 h-80 bg-blue-600/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/5 w-96 h-96 bg-indigo-600/6 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg shadow-blue-500/20 mb-4">
            <ShieldIcon />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">CERT Académico</h1>
          <p className="text-blue-400 font-medium text-sm mt-1">by RedCiber.org</p>
          <p className="text-slate-500 text-xs mt-2 max-w-xs mx-auto">
            Plataforma de Aprendizaje y Apoyo Docente en Ciberseguridad e IA
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl shadow-black/40">
          {/* Tabs */}
          <div className="flex bg-slate-800/60 rounded-xl p-1 mb-7 gap-1">
            {(['login', 'register'] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => switchTab(t)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  tab === t ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {tab === 'login' ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    className={inputCls}
                    placeholder="tu@correo.com"
                    autoComplete="email"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    className={inputCls}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                  />
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2.5"
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-sm shadow-blue-900/30 text-sm"
                >
                  {isLoading ? 'Verificando...' : 'Entrar al Aula Virtual →'}
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleRegister}
                className="space-y-4"
              >
                <p className="text-xs text-slate-400 bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-2 -mt-1">
                  Acceso restringido: solo correos autorizados por el docente pueden crear una cuenta.
                </p>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    className={inputCls}
                    placeholder="Tu nombre y apellido"
                    autoComplete="name"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    className={inputCls}
                    placeholder="tu@correo.com"
                    autoComplete="email"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={e => setRegPassword(e.target.value)}
                    className={inputCls}
                    placeholder="Mínimo 6 caracteres"
                    autoComplete="new-password"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    value={regConfirm}
                    onChange={e => setRegConfirm(e.target.value)}
                    className={inputCls}
                    placeholder="Repite tu contraseña"
                    autoComplete="new-password"
                    required
                  />
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2.5"
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all text-sm"
                >
                  {isLoading ? 'Creando cuenta...' : 'Crear mi Cuenta →'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-slate-600 text-xs mt-5">
          Los datos se almacenan localmente en tu dispositivo de forma segura.
        </p>
      </motion.div>
    </div>
  );
};

export default LoginView;
