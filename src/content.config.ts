import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/blog' }),
  schema: z.object({
    date: z.date(),
    description: z.string(),
    title: z.string(),
  }),
});

const lauren = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/lauren' }),
  schema: z.object({
    date: z.date(),
    description: z.string(),
    title: z.string(),
  }),
});

export const collections = { blog, lauren };
