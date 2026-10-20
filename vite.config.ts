import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Relative base so the built app can be hosted from any folder (GitHub Pages, intranet, etc.).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
  },
  server: { host: true, port: 5173 },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    setupFiles: ['tests/setup.ts'],
  },
});
