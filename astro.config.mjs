// @ts-check
import { defineConfig } from 'astro/config';

// Served from the custom domain https://corsoitaly.com (GitHub Pages, see public/CNAME).
// To build for a sub-path instead, set SITE_URL and BASE_PATH, e.g. BASE_PATH=/corso_italia.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://corsoitaly.com',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'always',
});
