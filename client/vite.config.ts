/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      includeAssets: ['favicon.ico', 'favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Roadwatch',
        short_name: 'Roadwatch',
        description:
          'Roadwatch revolutionizes how communities interact with and navigate their local road systems by providing a combined platform for reporting road conditions, alerting users to hazards, allowing community input, and influencing road infrastructure improvements.',
        theme_color: '#FB7110',
        icons: [
          {
            src: '/icons/512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/icons/192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  build: {
    // Ensures a CSS file is emitted during `build` step.
    cssCodeSplit: false, // TODO: Reassess if necessary towards end of project.
    sourcemap: true, // Ensures sourcemaps are emitted during `build` step.
  },
  optimizeDeps: {
    include: ['@emotion/styled'],
  },
  test: {
    exclude: ['**/*.cjs', '**/index.ts'],
    coverage: {
      exclude: ['**/*.cjs', '**/index.ts'],
    },
  },
});
