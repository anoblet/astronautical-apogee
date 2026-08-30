// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    esbuild: {
      target: 'es2022',
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('/node_modules/lit/')) {
              return 'lit';
            }
          },
        },
      },
    },
  },
});
