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
