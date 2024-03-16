import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    // Ensures a CSS file is emitted during `build` step.
    cssCodeSplit: false, // TODO: Reassess if necessary towards end of project.
  },
  optimizeDeps: {
    include: ['@emotion/styled'], // Needed for MUI
  },
});
