// @ts-check
import { defineConfig } from 'astro/config';
import angular from '@analogjs/astro-angular';
import { readFile } from 'node:fs/promises';

// https://astro.build/config
export default defineConfig({
  integrations: [angular()],
  vite: {
    oxc: { target: 'es2022' },
    optimizeDeps: {
      // Astro injects this module through /@id/, bypassing optimized URLs.
      exclude: ['astro/runtime/client/dev-toolbar/entrypoint.js'],
    },
    plugins: [
      {
        // Analog still supplies esbuild options; Astro 7 uses Oxc instead.
        name: 'angular-oxc-compatibility',
        enforce: 'post',
        config(config) {
          delete config.esbuild;
        },
        configEnvironment(name, options) {
          if (name === 'client' && options.optimizeDeps?.include) {
            options.optimizeDeps.include = options.optimizeDeps.include.filter(
              id => id !== 'astro/runtime/client/dev-toolbar/entrypoint.js'
            );
          }
        },
      },
      {
        // Angular's published server maps put source text in `sources`.
        name: 'angular-server-sourcemaps',
        enforce: 'pre',
        async load(id) {
          if (
            !id.includes('/@angular/platform-server/') ||
            !id.endsWith('.mjs')
          )
            return;
          const code = await readFile(id, 'utf8');
          const map = JSON.parse(await readFile(`${id}.map`, 'utf8'));
          if (!map.sources.some(source => source.includes('\n'))) return;
          map.sourcesContent = map.sources;
          map.sources = map.sources.map(
            (_, index) => `angular-server-source-${index}.ts`
          );
          return { code: code.replace(/\/\/# sourceMappingURL=.*$/m, ''), map };
        },
      },
    ],
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
