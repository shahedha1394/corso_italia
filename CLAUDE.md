# Corso Italy – guidelines for contributors and AI agents

Two people (and their Claude agents) work on this repo. Read this before making changes.

## Project
A free website in English, Arabic and French helping Arab students study and live in Italy, plus **EngPro** (free English learning with volunteer teachers) and an **Opportunities** board.
- Site map: [docs/SITEMAP.md](docs/SITEMAP.md)
- Data model: [docs/DATA_MODEL.md](docs/DATA_MODEL.md)
- Roadmap: [docs/ROADMAP.md](docs/ROADMAP.md)

## Workflow
- Never push directly to `main`. One branch per task (`feature/...`, `content/...`, `fix/...`), then a pull request.
- Keep PRs small and focused on one task. Describe what changed and which roadmap step it belongs to.
- Pull `main` before starting, and rebase or merge `main` before opening the PR.
- Before starting a task, check open PRs and the roadmap to avoid working on the same thing as the other collaborator.
- Run `npm run check` and `npm run build` before opening a PR (Node 22.23.4+; CI runs both on every PR).

## Language rules (mandatory)
- Every user-facing string exists in **all three** languages: `en`, `ar` and `fr`. No hard-coded text in components; use the translation files (`src/i18n/<lang>.json`).
- Content data (universities, cities, funding...) has `en`, `ar` and `fr` text. `fr` may be missing while translations are being added: French pages then show the English text. `node scripts/check-translations.mjs --report-french` lists what is still missing.
- Arabic pages use `dir="rtl"` and `lang="ar"`. Use CSS logical properties (`margin-inline-start`, not `margin-left`) so layouts flip correctly.
- Numbers, dates and Italian proper names (Questura, Universitaly, codice fiscale) stay readable in both directions. In Arabic text, wrap a Latin term that ends right before `)` in Unicode isolates (U+2066 … U+2069) so the brackets render correctly.
- Adding a guide: create the same file name in `src/content/guides/en/`, `src/content/guides/ar/` and `src/content/guides/fr/`. `npm run check` fails if one is missing.
- Adding a university: add one YAML file to `src/content/universities/` (copy an existing one). The site does not list individual study programs; link to the university's official program list instead. A new city also needs its key in `src/lib/taxonomy.ts`, a short description in `src/content/cities/<city>.yaml`, and a position on the map: add it to `CITY_MUNICIPALITY` in `scripts/build-italy-map.py` and run the script (instructions at the top of the file). Only add facts you checked on the official page, put that page in `url`, and set `last_checked` to the day you checked.
- Announcing an opportunity: copy `docs/examples/opportunity.yaml` into `src/content/opportunities/`. Past entries hide themselves; the site rebuilds every morning. (The EngPro sessions list is not shown on the site any more; `src/content/engpro-sessions/` is kept in case it comes back.)
- Adding a video: copy `docs/examples/video.yaml` into `src/content/videos/`. It shows on the Videos page, on the home page if it is the newest, and at the top of its guide if `guide` is set. The Videos link in the menu appears once there is one video. Student stories (live interviews) are videos with `category: stories`, a `guest` and optionally `university` and `live`; they appear on the Student stories page and on the university's page.
- Adding a deadline to the calendar: copy `docs/examples/deadline.yaml` into `src/content/deadlines/`. Only dates checked on the official page; past deadlines hide themselves.
- Sign-up form links live in `src/config/forms.ts`. Answers stay in Google Forms/Sheets and are never copied into the repo.
- Fonts are self-hosted: `scripts/fetch-fonts.mjs` downloads them into `public/fonts/` at build time (not committed). Do not link Google Fonts or other font CDNs directly.
- Links inside templates use `path(lang, '/study/')` from `src/i18n` so the GitHub Pages base path is respected.

## Content rules
- Every guide, university, funding entry and visa note has a `last_checked` date and links to official sources.
- Do not invent facts, deadlines, fees or requirements. If unsure, leave it out and add a TODO.
- No personal data (sign-ups, emails) is ever committed to the repo.
