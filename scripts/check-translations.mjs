// Fails if English and Arabic drift apart:
// - every UI string key must exist in both en.json and ar.json, with a non-empty value
// - every guide and page must exist in both languages (same file name)
import { readFileSync, readdirSync } from 'node:fs';

const errors = [];

const en = JSON.parse(readFileSync('src/i18n/en.json', 'utf8'));
const ar = JSON.parse(readFileSync('src/i18n/ar.json', 'utf8'));
for (const key of Object.keys(en)) {
  if (!ar[key]?.trim()) errors.push(`ar.json is missing "${key}"`);
}
for (const key of Object.keys(ar)) {
  if (!(key in en)) errors.push(`en.json is missing "${key}"`);
}

for (const collection of ['guides', 'pages']) {
  const files = (lang) => new Set(readdirSync(`src/content/${collection}/${lang}`).filter((f) => f.endsWith('.md')));
  const enFiles = files('en');
  const arFiles = files('ar');
  for (const f of enFiles) if (!arFiles.has(f)) errors.push(`src/content/${collection}/ar/${f} is missing`);
  for (const f of arFiles) if (!enFiles.has(f)) errors.push(`src/content/${collection}/en/${f} is missing`);
}

if (errors.length) {
  console.error(`Translation check failed:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log('Translation check passed: English and Arabic are in sync.');
