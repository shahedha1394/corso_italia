# Data model

All structured content lives in the repo as YAML/Markdown files, so both collaborators (and their agents) can edit through pull requests.
The schema that the build enforces is in `src/content.config.ts`; allowed cities, regions, levels, fields and funding types are in `src/lib/taxonomy.ts` (add a new city or field there first, with both labels).

**Implemented now (step 3):** universities, programs (name, university, level, single_cycle, field, language, duration_years, admission_test, language_requirement, tuition_eur, deadlines, required_documents, application_url, keywords, description, url, last_checked) and funding. Fields marked *later* below are planned but not yet in the schema. Optional program fields that are left out show "Not added yet, check the official page" on the program page.
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

## Program (`src/content/programs/<slug>.yaml`)
| Field | Type | Notes |
|---|---|---|
| slug | string | |
| university | slug | reference to University |
| name | {en, ar} | |
| level | `bachelor` \| `master` \| `phd` | single-cycle master counted as `master` with `single_cycle: true` |
| single_cycle | boolean | e.g. medicine |
| field | string | e.g. `engineering`, `medicine`, `economics` |
| language | `en` \| `it` \| `en-it` | teaching language |
| duration_years | number | |
| tuition_eur | {min, max} | per year, euros; leave out if the official page doesn't state it |
| admission_test | string \| null | `IMAT`, `TOLC-I`, `SAT`, `GRE`, `internal`, ... |
| language_requirement | string | e.g. `IELTS 6.0` |
| required_documents | list of {en, ar} | added to the general list |
| deadlines | list of {label {en, ar}, date} | non-EU deadlines |
| application_url | url | university application portal |
| keywords | list of string | extra search terms in both languages |
| description | {en, ar} | |
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
