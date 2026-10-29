// Runs before `astro build`: downloads the site fonts (Inter and Noto Sans Arabic, SIL Open Font License)
// from Google Fonts into public/fonts/, so visitors load them from our own site and Google never sees them.
// The files are not committed (public/fonts/ is in .gitignore); they are fetched again on every build.
// If the download fails locally, the site falls back to system fonts. In CI (GitHub Actions) it fails the build.
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const CSS_URL =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap';
// A current browser user agent, so Google returns woff2 files split by script (unicode-range).
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const OUT = 'public/fonts';

async function main() {
  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });

  const res = await fetch(CSS_URL, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`Google Fonts CSS: HTTP ${res.status}`);
  let css = await res.text();

  const urls = [...new Set([...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map((m) => m[1]))];
  if (urls.length === 0) throw new Error('No font files found in the Google Fonts CSS');

  for (const url of urls) {
    // e.g. https://fonts.gstatic.com/s/inter/v20/abc.woff2 -> inter-abc.woff2
    const parts = new URL(url).pathname.split('/');
    const name = `${parts[2]}-${parts.at(-1)}`;
    const file = await fetch(url);
    if (!file.ok) throw new Error(`${url}: HTTP ${file.status}`);
    writeFileSync(join(OUT, name), Buffer.from(await file.arrayBuffer()));
    // Relative URL: works with any base path, because fonts.css sits next to the files.
    css = css.replaceAll(url, `./${name}`);
  }

  writeFileSync(join(OUT, 'fonts.css'), `/* Inter and Noto Sans Arabic, SIL Open Font License 1.1. Downloaded at build time. */\n${css}`);
  console.log(`fonts: ${urls.length} files saved to ${OUT}/`);
}

main().catch((error) => {
  if (process.env.CI) {
    console.error(`fonts: ${error.message}`);
    process.exit(1);
  }
  console.warn(`fonts: could not download (${error.message}); the site will use system fonts.`);
  mkdirSync(OUT, { recursive: true });
  writeFileSync(join(OUT, 'fonts.css'), '/* Fonts not downloaded: system fonts are used. */\n');
});
