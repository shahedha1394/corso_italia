# Corso Italia – guidelines for contributors and AI agents

Two people (and their Claude agents) work on this repo. Read this before making changes.

## Project
A free, bilingual (English + Arabic) website helping Arab students study and live in Italy, plus **EngPro** (free English learning with volunteer teachers) and an **Opportunities** board.
- Site map: [docs/SITEMAP.md](docs/SITEMAP.md)
- Data model: [docs/DATA_MODEL.md](docs/DATA_MODEL.md)
- Roadmap: [docs/ROADMAP.md](docs/ROADMAP.md)

## Workflow
- Never push directly to `main`. One branch per task (`feature/...`, `content/...`, `fix/...`), then a pull request.
- Keep PRs small and focused on one task. Describe what changed and which roadmap step it belongs to.
- Pull `main` before starting, and rebase or merge `main` before opening the PR.
- Before starting a task, check open PRs and the roadmap to avoid working on the same thing as the other collaborator.
- Run `npm run check` and `npm run build` before opening a PR (Node 22.23.4+; CI runs both on every PR).

## Bilingual rules (mandatory)
- Every user-facing string exists in **both** `en` and `ar`. No hard-coded text in components; use the translation files.
- Arabic pages use `dir="rtl"` and `lang="ar"`. Use CSS logical properties (`margin-inline-start`, not `margin-left`) so layouts flip correctly.
- Numbers, dates and Italian proper names (Questura, Universitaly, codice fiscale) stay readable in both directions. In Arabic text, wrap a Latin term that ends right before `)` in Unicode isolates (U+2066 … U+2069) so the brackets render correctly.
- Adding a guide: create the same file name in `src/content/guides/en/` and `src/content/guides/ar/`. `npm run check` fails if one is missing.
- Adding a program or university: add one YAML file to `src/content/programs/` or `src/content/universities/` (copy an existing one). Only add facts you checked on the official page, put that page in `url`, and set `last_checked` to the day you checked.
- Announcing an opportunity or EngPro session: copy `docs/examples/opportunity.yaml` or `docs/examples/engpro-session.yaml` into `src/content/opportunities/` or `src/content/engpro-sessions/`. Past entries hide themselves; the site rebuilds every morning.
- Adding a deadline to the calendar: copy `docs/examples/deadline.yaml` into `src/content/deadlines/`. Only dates checked on the official page; past deadlines hide themselves.
- Sign-up form links live in `src/config/forms.ts`. Answers stay in Google Forms/Sheets and are never copied into the repo.
- Links inside templates use `path(lang, '/study/')` from `src/i18n` so the GitHub Pages base path is respected.

## Content rules
- Every guide, program, funding entry and visa note has a `last_checked` date and links to official sources.
- Do not invent facts, deadlines, fees or requirements. If unsure, leave it out and add a TODO.
- No personal data (sign-ups, emails) is ever committed to the repo.
