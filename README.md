# Corso Italia

A free website in English, العربية and Français helping Arab students study and live in Italy.

- **Study in Italy**: university and program directory, how to apply, funding, visa
- **Living in Italy**: residence permit, health insurance, accommodation, first weeks
- **EngPro**: free English learning with volunteer teachers
- **Opportunities**: workshops and teaching sessions

See [docs/ROADMAP.md](docs/ROADMAP.md) for the plan and [CLAUDE.md](CLAUDE.md) for contribution rules.

## Running locally

Requires Node.js 22.23.4 or newer (24 recommended, see `.nvmrc`).

```sh
npm install
npm run dev      # http://localhost:4321/
npm run check    # English, Arabic and French are in sync
npm run build    # static site in dist/
```

The site is deployed to GitHub Pages at https://corsoitaly.com from `main` by `.github/workflows/deploy.yml`.

## Where things live

| What | Where |
|---|---|
| Interface text (menus, buttons) | `src/i18n/en.json`, `src/i18n/ar.json`, `src/i18n/fr.json` |
| Guides (Study, Living) | `src/content/guides/<en\|ar\|fr>/<slug>.md` |
| Simple pages (About, FAQ...) | `src/content/pages/<en\|ar\|fr>/<slug>.md` |
| Page templates | `src/pages/[lang]/...` |
| Layout and styles | `src/layouts/Base.astro`, `src/styles/global.css` |
| Map of Italy | `src/components/ItalyMap.astro`, data in `src/data/italy-map.json` (built by `scripts/build-italy-map.py` from ISTAT data, CC BY 4.0) |
| Icons | `src/components/Icon.astro`, `src/lib/icons.ts` (from Lucide, ISC License) |
