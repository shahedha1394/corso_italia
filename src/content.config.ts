import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import {
  cefrLevels,
  cities,
  deadlineTypes,
  fields,
  fundingTypes,
  keysOf,
  levels,
  modes,
  opportunityTypes,
  regions,
  skills,
  teachingLanguages,
} from './lib/taxonomy';

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

// Announcements. Entries disappear from the site after `expires_at`
// (or after `end`/`start` when no expiry is given); the site is rebuilt daily.
const opportunities = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/opportunities' }),
  schema: z.object({
    title: bilingual,
    type: z.enum(keysOf(opportunityTypes)),
    organiser: z.string(),
    mode: z.enum(keysOf(modes)),
    city: z.enum(keysOf(cities)).optional(),
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    apply_deadline: z.coerce.date().optional(),
    expires_at: z.coerce.date().optional(),
    description: bilingual,
    link: z.string().url(),
  }),
});

// Deadlines calendar: one YAML file per deadline. Past deadlines hide themselves
// (the site is rebuilt daily). Only add dates you checked on the official page.
const deadlines = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/deadlines' }),
  schema: z.object({
    title: bilingual,
    type: z.enum(keysOf(deadlineTypes)),
    university: reference('universities').optional(),
    opens: z.coerce.date().optional(),
    date: z.coerce.date(),
    note: bilingual.optional(),
    url: z.string().url(),
    last_checked: z.coerce.date(),
  }),
});

const engproSessions = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/engpro-sessions' }),
  schema: z.object({
    title: bilingual,
    levels: z.array(z.enum(cefrLevels)).min(1),
    // ISO date-time with a time zone, e.g. 2026-11-05T18:00:00+01:00
    start: z.coerce.date(),
    duration_minutes: z.number().int().positive(),
    teacher: z.string().optional(),
    description: bilingual,
    link: z.string().url(),
  }),
});

const engproResources = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/engpro-resources' }),
  schema: z.object({
    title: z.string(),
    description: bilingual,
    levels: z.array(z.enum(cefrLevels)).min(1),
    skill: z.enum(keysOf(skills)),
    url: z.string().url(),
  }),
});

export const collections = {
  guides,
  pages,
  universities,
  programs,
  funding,
  opportunities,
  deadlines,
  'engpro-sessions': engproSessions,
  'engpro-resources': engproResources,
};
