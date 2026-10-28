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

/** Videos, newest first. Pass a guide slug to get only the videos linked to that guide. */
export async function getVideos(guide?: string) {
  const all = await getCollection('videos', ({ data }) => !guide || data.guide === guide);
  return all.sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
}
