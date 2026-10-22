import React, { useEffect, useRef } from 'react';

// Cloudflare Turnstile (CAPTCHA gratuito). Supabase Auth valida el token en el servidor.
// Sin VITE_TURNSTILE_SITE_KEY el widget no se muestra y el formulario funciona sin CAPTCHA.
export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';
export const CAPTCHA_ENABLED = TURNSTILE_SITE_KEY !== '';

interface TurnstileApi {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<void> | null = null;
const loadScript = () => {
  scriptPromise ??= new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('No se pudo cargar el CAPTCHA.'));
    document.head.appendChild(s);
  });
  return scriptPromise;
};

/**
 * Cada token sirve una sola vez: para pedir uno nuevo después de un intento,
 * cambie la `key` del componente.
 */
const Turnstile: React.FC<{ onToken: (token: string | null) => void }> = ({ onToken }) => {
  const ref = useRef<HTMLDivElement>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useEffect(() => {
    if (!CAPTCHA_ENABLED) return;
    let widgetId: string | null = null;
    let cancelled = false;
    onTokenRef.current(null);
    loadScript()
      .then(() => {
        if (cancelled || !ref.current || !window.turnstile) return;
        widgetId = window.turnstile.render(ref.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: 'dark',
          language: 'es',
          callback: (token: string) => onTokenRef.current(token),
          'expired-callback': () => onTokenRef.current(null),
          'error-callback': () => onTokenRef.current(null),
        });
      })
      .catch(() => onTokenRef.current(null));
    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, []);

  if (!CAPTCHA_ENABLED) return null;
  return <div ref={ref} className="flex justify-center min-h-[65px]" />;
};

export default Turnstile;
