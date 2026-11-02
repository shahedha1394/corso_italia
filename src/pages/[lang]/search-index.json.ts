// Search index for one language, built with the site: /<lang>/search-index.json.
// The search page (search.astro) downloads it only when someone searches.
import type { APIRoute } from 'astro';
import { getCollection, render, type CollectionEntry } from 'astro:content';
import { getStaticLangPaths, path, useTranslations, type Lang, type UIKey } from '../../i18n';
import { getActiveOpportunities, getVideos, splitId } from '../../lib/content';
import { chunks } from '../../lib/search-index';
import { cities } from '../../lib/taxonomy';

export const getStaticPaths = getStaticLangPaths;

/** k: kind of result, t: title, h: section heading, u: link, x: text to search and quote. */
type Item = { k: string; t: string; h?: string; u: string; x: string };

// Section pages: title, intro and address.
const sections: [UIKey, UIKey, string][] = [
  ['study.title', 'study.intro', '/study/'],
  ['living.title', 'living.intro', '/living/'],
  ['dir.universities.title', 'dir.universities.intro', '/study/universities/'],
  ['cities.title', 'cities.intro', '/study/cities/'],
  ['fees.title', 'fees.intro', '/study/fees/'],
  ['dir.funding.title', 'dir.funding.intro', '/study/scholarships/'],
  ['phd.title', 'phd.intro', '/study/phd/'],
  ['calendar.title', 'calendar.intro', '/study/calendar/'],
  ['engpro.title', 'engpro.tagline', '/engpro/'],
  ['opportunities.title', 'opportunities.intro', '/opportunities/'],
  ['stories.title', 'stories.intro', '/stories/'],
];

type CityKey = keyof typeof cities;
// City names in every language, so "Pisa", "Pise" and "بيزا" all find it.
const cityNames = (key: CityKey) => [key, cities[key].en, cities[key].ar, cities[key].fr].join(' ');

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as Lang;
  const t = useTranslations(lang);
  const items: Item[] = [];

  const addDoc = async (kind: string, entry: CollectionEntry<'guides'> | CollectionEntry<'pages'>, url: string) => {
    const { headings } = await render(entry);
    for (const c of chunks(entry.body ?? '', headings)) {
      items.push({
        k: kind,
        t: entry.data.title,
        h: c.heading,
        u: c.slug ? `${url}#${c.slug}` : url,
        x: c.heading ? c.text : [entry.data.description, c.text].filter(Boolean).join(' '),
      });
    }
  };

  const inLang = ({ id }: { id: string }) => splitId(id).lang === lang;
  for (const g of await getCollection('guides', inLang)) {
    await addDoc('guide', g, path(lang, `/${g.data.section}/${splitId(g.id).slug}/`));
  }
  for (const p of await getCollection('pages', inLang)) {
    await addDoc('page', p, path(lang, `/${splitId(p.id).slug}/`));
  }

  const videos = await getVideos();
  const allSections: typeof sections = videos.length > 0 ? [...sections, ['videos.title', 'videos.intro', '/videos/']] : sections;
  for (const [title, intro, to] of allSections) items.push({ k: 'section', t: t(title), u: path(lang, to), x: t(intro) });

  for (const u of await getCollection('universities')) {
    items.push({
      k: 'university',
      t: u.data.name[lang],
      u: path(lang, `/study/universities/${u.id}/`),
      x: [u.data.name_it, cityNames(u.data.city), u.data.description?.[lang]].filter(Boolean).join(' '),
    });
  }
  for (const c of await getCollection('cities')) {
    const key = c.id as CityKey;
    if (!(key in cities)) continue;
    items.push({ k: 'city', t: cities[key][lang], u: path(lang, `/study/cities/#${key}`), x: `${cityNames(key)} ${c.data.description[lang]}` });
  }
  for (const f of await getCollection('funding')) {
    items.push({
      k: 'funding',
      t: f.data.name[lang],
      u: path(lang, '/study/scholarships/'),
      x: [f.data.provider, f.data.description[lang], f.data.eligibility[lang]].join(' '),
    });
  }
  for (const o of await getActiveOpportunities()) {
    items.push({ k: 'opportunity', t: o.data.title[lang], u: path(lang, '/opportunities/'), x: o.data.description[lang] });
  }
  for (const v of videos) {
    items.push({
      k: 'video',
      t: v.data.title[lang],
      u: path(lang, v.data.category === 'stories' ? '/stories/' : '/videos/'),
      x: v.data.description?.[lang] ?? '',
    });
  }

  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
