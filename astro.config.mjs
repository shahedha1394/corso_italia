// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages serves the site from /corso_italia/. With a custom domain,
// set SITE_URL to the domain and BASE_PATH to "/".
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://zoxerus.github.io',
  base: process.env.BASE_PATH ?? '/corso_italia',
  trailingSlash: 'always',
});
