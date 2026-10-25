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
