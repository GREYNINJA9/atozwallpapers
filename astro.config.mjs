// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import preact from '@astrojs/preact';

const SITE = 'https://atozwallpapers.in'; // TODO-CONFIRM: production domain

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'], // add 'hi' + src/pages/hi/* when Hindi routes exist
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    preact({ compat: true }),
    sitemap({
      filter: (page) =>
        !page.includes('/lp/') &&
        !page.includes('/thank-you') &&
        !page.includes('/404'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    domains: [],
  },
});
