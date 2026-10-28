# Data model

All structured content lives in the repo as YAML/Markdown files, so both collaborators (and their agents) can edit through pull requests.
The schema that the build enforces is in `src/content.config.ts`; allowed cities, regions, levels, fields and funding types are in `src/lib/taxonomy.ts` (add a new city or field there first, with both labels).

**Implemented now:** universities, funding, deadlines, opportunities and EngPro. Fields marked *later* below are planned but not yet in the schema.

The site does not keep its own list of study programs (removed in favour of a university-and-city guide): each university page links to the university's official list of programs.
Text fields are objects with `en`, `ar` and `fr` keys (`fr` optional for now; English is shown on French pages when it is missing).

## University (`src/content/universities/<slug>.yaml`)
| Field | Type | Notes |
|---|---|---|
| slug | string | e.g. `politecnico-di-milano` |
| name | {en, ar} | Official Italian name can go in `name_it` |
| name_it | string | |
| city | string | city slug, e.g. `milano` |
| region | string | e.g. `lombardia` (used for DSU scholarships) |
| type | `public` \| `private` \| `special` \| `online` | public = on the Ministry's list of state universities: https://www.mur.gov.it/it/aree-tematiche/universita/le-universita/universita-statali ; private = on its list of recognised non-state universities: https://www.mur.gov.it/it/aree-tematiche/universita/le-universita/universita-non-statali-riconosciute (shown as "Non-state university"); special = MUR list of istituti a ordinamento speciale; online = MUR list of università telematiche |
| website | url | |
| international_page | url | official page for international applicants |
| programs_page | url | official list of degree programs (bachelor's list if separate) |
| masters_page | url | official master's list, when separate |
| areas | list | broad study areas from `areas` in `src/lib/taxonomy.ts`, only those seen on the official site |
| tuition_range_eur | {min, max} | per year | *later*
| description | {en, ar} | one or two sentences, only facts from the official site |
| last_checked | date | |

## City (`src/content/cities/<city-key>.yaml`)
description {en, ar}: one short, stable sentence (where the city is). File name is the city key in `src/lib/taxonomy.ts`.

## Funding (`src/content/funding/<slug>.yaml`)
provider, name {en, ar}, type (`regional_dsu` | `government` | `university` | `external`), region, eligibility {en, ar}, amount, deadline, url, last_checked.

## Visa country notes (`src/content/visa-countries/<country>.yaml`)
country code, name {en, ar}, embassy/VFS links, booking notes {en, ar}, extra documents, last_checked.

## Opportunity (`src/content/opportunities/<slug>.md`)
title {en, ar}, type (`workshop` | `teaching_session` | `scholarship_call` | `other`), organiser, mode (`online` | `in_person`), city, start date, end date, apply deadline, link, expires_at.

## EngPro resources (`src/content/engpro-resources/<slug>.yaml`)
title {en, ar}, CEFR level(s), skill (`speaking` | `listening` | `reading` | `writing` | `grammar` | `vocabulary` | `exam`), url, free: true.

## Video (`src/content/videos/<slug>.yaml`)
title {en, ar, fr}, youtube (link or video ID), category (`study` | `papers` | `life` | `engpro`), guide (optional guide file name), published date, description {en, ar, fr} (optional). Videos load from youtube-nocookie.com only after the visitor presses play.

## Not in the repo (needs a small backend, step 4)
Sign-ups for EngPro learners and volunteers, opportunity submissions and the admin approval queue. Personal data stays out of Git.
