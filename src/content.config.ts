import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Guides live in src/content/guides/<lang>/<slug>.md.
// The same slug must exist in every language (checked by `npm run check`).
const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.enum(['study', 'living']),
    order: z.number().default(100),
    draft: z.boolean().default(false),
    lastChecked: z.coerce.date().optional(),
    sources: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .default([]),
  }),
});

// Simple pages (about, FAQ, disclaimer, privacy, contact) in src/content/pages/<lang>/<slug>.md.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { guides, pages };
