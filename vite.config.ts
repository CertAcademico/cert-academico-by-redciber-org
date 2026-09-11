import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        // Permite servir a través de túneles (Cloudflare / ngrok) sin que Vite bloquee el Host
        allowedHosts: ['.trycloudflare.com', '.ngrok-free.app', '.ngrok.app'],
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
