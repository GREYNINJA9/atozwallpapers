# A to Z Wallpapers & Interiors — Website

Production-ready, mobile-first Astro static site for lead generation and local SEO in Faridabad, Haryana.

**Stack:** Astro 7 (static) · TypeScript · Tailwind CSS v4 · Preact islands · Content Collections · Netlify · Google Apps Script → Sheets

## Quick start

```bash
npm install
npm run dev          # or: npx astro dev --background  (see AGENTS.md)
npm run build
npm run preview
```

Set business facts in **`src/data/site.ts`** only (NAP single source of truth). Every unverified field is marked `// TODO-CONFIRM`.

## Deploy to Netlify (free tier)

1. Push this repo to GitHub/GitLab.
2. Netlify → Add site → Import → build command `npm run build`, publish `dist`.
3. `netlify.toml` already sets security headers and long cache for `/_astro/*`.
4. Confirm `site.url` in `src/data/site.ts` and `astro.config.mjs` match the live domain.
5. Update `public/robots.txt` Sitemap URL if the domain changes.

## Apps Script lead backend

Form → `fetch` POST with `Content-Type: text/plain` → Apps Script → Google Sheet + owner email (+ optional CallMeBot).

### Deploy steps

1. Create a Google Sheet named e.g. `AtoZ-Leads`. Add tab **`Leads`** (script can create headers automatically).
2. Extensions → Apps Script. Paste `apps-script/Code.gs`.
3. Script properties (Project settings → Script properties):
   - `OWNER_EMAIL` = your inbox (required)
   - `SHEET_ID` = spreadsheet ID from the URL (recommended)
   - Optional: `ENABLE_CALLMEBOT=true`, `CALLMEBOT_PHONE`, `CALLMEBOT_APIKEY`
4. Deploy → New deployment → Type **Web app** → Execute as **Me** → Who has access **Anyone**.
5. Copy the web app URL into `site.formEndpoint` in `src/data/site.ts`.
6. Test from `/contact/`. On failure the UI shows a WhatsApp fallback (never silent).

### Sheet column order

`timestamp | name | phone | email | need | location | roomType | areaSqFt | budget | message | source | page | landing_page | referrer | utm_source | utm_medium | utm_campaign | utm_term | utm_content | gclid | msclkid | fbclid`

### Rotate the endpoint

If the URL leaks: Deploy → Manage deployments → New version (or retire old). Update `formEndpoint` and redeploy the site. Do not commit secrets; the endpoint is a public POST URL by design — protect with honeypot + min-time + validation.

## Content editing

### Add a new project (5 steps)

1. Copy `src/content/projects/sector-19-living-room.md` to a new slug file.
2. Fill frontmatter: title, roomType, locationArea (area-level only), images under `/public/images/`.
3. Replace PLACEHOLDER body; set `clientQuote` only from a real permitted quote.
4. Leave `budgetRange` as TODO until confirmed — never invent prices.
5. `npm run build` and open `/projects/your-slug/`.

### Wallpapers / blog / testimonials

- `src/content/wallpapers/*.md` — category pages (300+ words each)
- `src/content/blog/*.md` — articles + Article JSON-LD
- `src/content/testimonials/*.md` — mark `source: google` + `verified: true` only for real permitted reviews

### Services & localities

- `src/data/services.ts` — service pages under `/services/[slug]/`
- `src/data/localities.ts` — Sector 19, NIT, Greater Faridabad, Ballabgarh

## Analytics / Ads / UET

1. Create GTM container; set `site.gtmId`.
2. Consent banner defaults to denied; GTM loads on Accept (DPDP-aware).
3. In GTM: GA4, Google Ads conversion + remarketing, Bing UET, Meta Pixel.
4. Trigger Ads/Bing conversion on `form_submit` (and `/thank-you/` backup).
5. Details: [`docs/ppc-starter.md`](docs/ppc-starter.md) · Social: [`docs/social-playbook.md`](docs/social-playbook.md)

## Google Business Profile checklist

- [ ] Primary category: Wallpaper Store / Home improvement (confirm best fit)
- [ ] Secondary: Interior Designer, Flooring, etc. as accurate
- [ ] Services list matching `site.offerings` (after owner confirm)
- [ ] NAP identical to `site.ts`
- [ ] Photos: exterior, interior, installs, team (real only)
- [ ] Products / services with photos
- [ ] Q&A seeded (hours, custom prints, installation, areas)
- [ ] Weekly Posts linking to site with UTM
- [ ] Review request link (SMS/WhatsApp after install) — never buy reviews
- [ ] Book / WhatsApp buttons once phone confirmed

## NAP consistency list (directories)

Update **exact** same name, address, phone everywhere after TODO-CONFIRM:

| Directory | Status |
|-----------|--------|
| Google Business Profile | TODO-CONFIRM |
| Justdial | Align NAP |
| IndiaMART | Align NAP |
| Sulekha | Align NAP |
| Instagram / Facebook | Align name + city |
| Bing Places | Mirror GBP |

## SEO notes

- Sitemap excludes `/lp/*` and `/thank-you`
- JSON-LD: LocalBusiness, Service, BreadcrumbList, Article, FAQPage
- **No** self-serving Review/AggregateRating markup
- Hindi `hreflang` only when Hindi routes exist

## Project structure

```
src/data/site.ts          # NAP + config
src/content/              # Markdown collections
src/components/           # UI + islands (Preact)
src/layouts/              # Base + LP layouts
src/pages/                # Routes
apps-script/Code.gs       # Lead backend
docs/                     # PPC + social
netlify.toml              # Headers + cache
```

## TODO-CONFIRM (blockers before ads / launch)

- Phone / WhatsApp (directories conflict)
- Owner name, email, hours, GST
- Social URLs, GBP URL, Maps place + embed + exact coordinates
- Domain (`atozwallpapers.in` placeholder)
- `formEndpoint`, `gtmId`
- Starting prices for services/categories
- Real photos, real testimonials
- Final service list with owner

## License

Private business site — all rights reserved by the business owner.
