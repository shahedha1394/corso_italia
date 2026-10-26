# Data model

All structured content lives in the repo as YAML/Markdown files, so both collaborators (and their agents) can edit through pull requests.
The schema that the build enforces is in `src/content.config.ts`; allowed cities, regions, levels, fields and funding types are in `src/lib/taxonomy.ts` (add a new city or field there first, with both labels).

**Implemented now:** universities, funding, deadlines, opportunities and EngPro. Fields marked *later* below are planned but not yet in the schema.

The site does not keep its own list of study programs (removed in favour of a university-and-city guide): each university page links to the university's official list of programs.
Bilingual text fields are objects with `en` and `ar` keys.

## University (`src/content/universities/<slug>.yaml`)
| Field | Type | Notes |
|---|---|---|
| slug | string | e.g. `politecnico-di-milano` |
| name | {en, ar} | Official Italian name can go in `name_it` |
| name_it | string | |
| city | string | city slug, e.g. `milano` |
| region | string | e.g. `lombardia` (used for DSU scholarships) |
| type | `public` \| `private` | |
| website | url | |
| international_office | url / email | | *later*
| tuition_range_eur | {min, max} | per year | *later*
| description | {en, ar} | short |
| last_checked | date | |

## Funding (`src/content/funding/<slug>.yaml`)
provider, name {en, ar}, type (`regional_dsu` | `government` | `university` | `external`), region, eligibility {en, ar}, amount, deadline, url, last_checked.

## Visa country notes (`src/content/visa-countries/<country>.yaml`)
country code, name {en, ar}, embassy/VFS links, booking notes {en, ar}, extra documents, last_checked.

## Opportunity (`src/content/opportunities/<slug>.md`)
title {en, ar}, type (`workshop` | `teaching_session` | `scholarship_call` | `other`), organiser, mode (`online` | `in_person`), city, start date, end date, apply deadline, link, expires_at.

## EngPro resources (`src/content/engpro-resources/<slug>.yaml`)
title {en, ar}, CEFR level(s), skill (`speaking` | `listening` | `reading` | `writing` | `grammar` | `vocabulary` | `exam`), url, free: true.

## Not in the repo (needs a small backend, step 4)
Sign-ups for EngPro learners and volunteers, opportunity submissions and the admin approval queue. Personal data stays out of Git.
