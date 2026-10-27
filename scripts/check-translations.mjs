// Fails if the site languages drift apart:
// - every UI string key must exist in every language file (src/i18n/<lang>.json), with a non-empty value
// - every guide and page must exist in every language (same file name)
// Content data (universities, cities, ...) may still miss French: it falls back to English. Run with
// --report-french to list the entries that have no French text yet.
import { readFileSync, readdirSync } from 'node:fs';

const langs = ['en', 'ar', 'fr'];
const errors = [];

const ui = Object.fromEntries(langs.map((l) => [l, JSON.parse(readFileSync(`src/i18n/${l}.json`, 'utf8'))]));
const allKeys = new Set(langs.flatMap((l) => Object.keys(ui[l])));
for (const key of allKeys) {
  for (const l of langs) {
    if (!ui[l][key]?.trim()) errors.push(`${l}.json is missing "${key}"`);
  }
}

for (const collection of ['guides', 'pages']) {
  const files = Object.fromEntries(
    langs.map((l) => [l, new Set(readdirSync(`src/content/${collection}/${l}`).filter((f) => f.endsWith('.md')))]),
  );
  const all = new Set(langs.flatMap((l) => [...files[l]]));
  for (const f of all) {
    for (const l of langs) if (!files[l].has(f)) errors.push(`src/content/${collection}/${l}/${f} is missing`);
  }
}

if (process.argv.includes('--report-french')) {
  const missing = [];
  for (const dir of ['universities', 'cities', 'funding', 'deadlines', 'engpro-resources', 'opportunities', 'engpro-sessions']) {
    for (const f of readdirSync(`src/content/${dir}`).filter((f) => f.endsWith('.yaml'))) {
      const text = readFileSync(`src/content/${dir}/${f}`, 'utf8');
      const en = (text.match(/^\s+en:/gm) ?? []).length;
      const fr = (text.match(/^\s+fr:/gm) ?? []).length;
      if (fr < en) missing.push(`src/content/${dir}/${f}`);
    }
  }
  console.log(missing.length ? `No French text yet in:\n- ${missing.join('\n- ')}` : 'All content has French text.');
}

if (errors.length) {
  console.error(`Translation check failed:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`Translation check passed: ${langs.join(', ')} are in sync.`);
