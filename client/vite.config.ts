/// <reference types="vitest" />
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const warningsToIgnore = [
  ['SOURCEMAP_ERROR', "Can't resolve original location of error"],
  ['INVALID_ANNOTATION', 'contains an annotation that Rollup cannot interpret'],
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    muteWarningsPlugin(warningsToIgnore),
    nodePolyfills(), // Adds `node:` polyfill to Node modules used in the service worker.
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
        type: 'module',
      },
      strategies: 'injectManifest', // Allows us to use a custom service worker script.
      srcDir: 'src/scripts',
      filename: 'sw.ts',
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

/**
 * Suppresses sourcemap errors when building.
 * Sourced from {@link https://github.com/vitejs/vite/issues/15012#issuecomment-1825035992}.
 * @param warningsToIgnore Warnings that appear during the build step that should be ignored.
 * @returns A new Vite Plugin.
 */
function muteWarningsPlugin(warningsToIgnore: string[][]): Plugin {
  const mutedMessages = new Set();
  return {
    name: 'mute-warnings',
    enforce: 'pre',
    config: (userConfig) => ({
      build: {
        rollupOptions: {
          onwarn(warning, defaultHandler) {
            if (warning.code) {
              const muted = warningsToIgnore.find(
                ([code, message]) => code == warning.code && warning.message.includes(message)
              );

              if (muted) {
                mutedMessages.add(muted.join());
                return;
              }
            }

            if (userConfig.build?.rollupOptions?.onwarn) {
              userConfig.build.rollupOptions.onwarn(warning, defaultHandler);
            } else {
              defaultHandler(warning);
            }
          },
        },
      },
    }),
    closeBundle() {
      const diff = warningsToIgnore.filter((x) => !mutedMessages.has(x.join()));
      if (diff.length > 0) {
        this.warn('Some of your muted warnings never appeared during the build process:');
        diff.forEach((m) => this.warn(`- ${m.join(': ')}`));
      }
    },
  };
}
