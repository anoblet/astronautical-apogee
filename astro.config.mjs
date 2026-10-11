// @ts-check
import { defineConfig } from 'astro/config';
import angular from '@analogjs/astro-angular';

// https://astro.build/config
export default defineConfig({
  integrations: [angular()],
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
