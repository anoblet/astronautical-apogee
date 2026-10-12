import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import { readdirSync } from 'node:fs';

const laurenLoader = glob({ pattern: '**/*.md', base: './src/lauren' });

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/blog' }),
  schema: z.object({
    date: z.date(),
    description: z.string(),
    title: z.string(),
  }),
});

const lauren = defineCollection({
  loader: {
    ...laurenLoader,
    async load(context) {
      const files = readdirSync(new URL('./lauren/', import.meta.url), {
        recursive: true,
      });
      if (files.some(file => String(file).endsWith('.md'))) {
        await laurenLoader.load(context);
      }
    },
  },
  schema: z.object({
    date: z.date(),
    description: z.string(),
    title: z.string(),
  }),
});

export const collections = { blog, lauren };
