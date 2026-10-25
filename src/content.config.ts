import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { cities, fields, fundingTypes, keysOf, levels, regions, teachingLanguages } from './lib/taxonomy';

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

const bilingual = z.object({ en: z.string().min(1), ar: z.string().min(1) });
const source = z.object({ label: z.string(), url: z.string().url() });

// Directory data: one YAML file per entry. See docs/DATA_MODEL.md.
const universities = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/universities' }),
  schema: z.object({
    name: bilingual,
    name_it: z.string(),
    city: z.enum(keysOf(cities)),
    region: z.enum(keysOf(regions)),
    type: z.enum(['public', 'private']),
    website: z.string().url(),
    international_page: z.string().url().optional(),
    description: bilingual.optional(),
    last_checked: z.coerce.date(),
  }),
});

const programs = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/programs' }),
  schema: z.object({
    name: bilingual,
    university: reference('universities'),
    level: z.enum(keysOf(levels)),
    single_cycle: z.boolean().default(false),
    field: z.enum(keysOf(fields)),
    language: z.enum(keysOf(teachingLanguages)),
    duration_years: z.number(),
    admission_test: z.string().optional(),
    keywords: z.array(z.string()).default([]),
    description: bilingual.optional(),
    url: z.string().url(),
    last_checked: z.coerce.date(),
  }),
});

const funding = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/funding' }),
  schema: z.object({
    name: bilingual,
    provider: z.string(),
    type: z.enum(keysOf(fundingTypes)),
    region: z.enum(keysOf(regions)).optional(),
    description: bilingual,
    eligibility: bilingual,
    url: z.string().url(),
    sources: z.array(source).default([]),
    last_checked: z.coerce.date(),
  }),
});

export const collections = { guides, pages, universities, programs, funding };
