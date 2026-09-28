import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// En producción la app vive en /app/ y la landing en la raíz del sitio.
const copyLanding = () => ({
  name: 'copy-landing',
  apply: 'build' as const,
  closeBundle() {
    fs.copyFileSync(
      path.resolve(__dirname, 'landing/index.html'),
      path.resolve(__dirname, 'dist/index.html'),
    );
  },
});

export default defineConfig(({ command }) => {
    return {
      base: command === 'build' ? '/app/' : '/',
      build: {
        outDir: 'dist/app',
      },
      server: {
        port: 3000,
        host: '0.0.0.0',
        // Permite servir a través de túneles (Cloudflare / ngrok) sin que Vite bloquee el Host
        allowedHosts: ['.trycloudflare.com', '.ngrok-free.app', '.ngrok.app'],
      },
      plugins: [react(), copyLanding()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
