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

// Copia materiales descargables (pptx/docx de cursos) a la raíz del sitio: /materiales/...
function copyDirRecursive(src: string, dest: string) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDirRecursive(s, d);
    else fs.copyFileSync(s, d);
  }
}

const copyMateriales = () => ({
  name: 'copy-materiales',
  apply: 'build' as const,
  closeBundle() {
    const src = path.resolve(__dirname, 'materiales');
    if (fs.existsSync(src)) {
      copyDirRecursive(src, path.resolve(__dirname, 'dist/materiales'));
    }
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
      plugins: [react(), copyLanding(), copyMateriales()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
