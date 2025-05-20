// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [],
  prefetch: {
    defaultStrategy: "viewport",
    prefetchAll: true
  },
  vite: {
    esbuild: {
      target: "es2022",
    },
  },
});
