// Runs after `astro build`: lists every built page in dist/sitemap.xml and writes dist/robots.txt,
// so search engines (Google Search Console) can find all pages in all three languages.
// Uses the same SITE_URL and BASE_PATH as astro.config.mjs.
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const dist = 'dist';
const site = (process.env.SITE_URL ?? 'https://corsoitaly.com').replace(/\/$/, '');
const base = (process.env.BASE_PATH ?? '/').replace(/\/$/, '');

function pages(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return pages(full);
    return name === 'index.html' ? [full] : [];
  });
}

const urls = pages(dist)
  .map((file) => {
    const folder = relative(dist, file).split(sep).slice(0, -1).join('/');
    return `${site}${base}/${folder ? `${folder}/` : ''}`;
  })
  .sort();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>
`;
writeFileSync(join(dist, 'sitemap.xml'), xml);
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}${base}/sitemap.xml\n`);
console.log(`sitemap.xml: ${urls.length} pages`);
