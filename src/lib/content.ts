import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

/** Entry ids look like "en/residence-permit": split into language and slug. */
export function splitId(id: string): { lang: Lang; slug: string } {
  const [lang, ...rest] = id.split('/');
  return { lang: lang as Lang, slug: rest.join('/') };
}

export async function getGuides(lang: Lang, section?: 'study' | 'living') {
  const all = await getCollection('guides', ({ id, data }) => {
    return splitId(id).lang === lang && (!section || data.section === section);
  });
  return all.sort((a, b) => a.data.order - b.data.order);
}

export type Guide = CollectionEntry<'guides'>;

/** All programs with their university entry attached, sorted by name in the given language. */
export async function getPrograms(lang: Lang) {
  const [programs, universities] = await Promise.all([getCollection('programs'), getCollection('universities')]);
  const byId = new Map(universities.map((u) => [u.id, u]));
  return programs
    .map((p) => ({ ...p, uni: byId.get(p.data.university.id)! }))
    .sort((a, b) => a.data.name[lang].localeCompare(b.data.name[lang], lang));
}

export type ProgramWithUni = Awaited<ReturnType<typeof getPrograms>>[number];

/** Upcoming opportunities: hidden once `expires_at` (or `end`, or `start`) has passed. Soonest first. */
export async function getActiveOpportunities(now = new Date()) {
  const all = await getCollection('opportunities');
  return all
    .filter((o) => (o.data.expires_at ?? o.data.end ?? o.data.start) >= now)
    .sort((a, b) => a.data.start.getTime() - b.data.start.getTime());
}

/** EngPro sessions that have not finished yet. Soonest first. */
export async function getUpcomingSessions(now = new Date()) {
  const all = await getCollection('engpro-sessions');
  return all
    .filter((s) => s.data.start.getTime() + s.data.duration_minutes * 60_000 >= now.getTime())
    .sort((a, b) => a.data.start.getTime() - b.data.start.getTime());
}

/** Deadlines that have not passed yet (a deadline stays visible through its own day). Soonest first. */
export async function getUpcomingDeadlines(now = new Date()) {
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const all = await getCollection('deadlines');
  return all
    .filter((d) => d.data.date >= startOfToday)
    .sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
}
