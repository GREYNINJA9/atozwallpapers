/**
 * Single source of truth for NAP and business facts.
 * Mark every unverified value with // TODO-CONFIRM — keep this file consistent everywhere.
 */

export const site = {
  name: 'A to Z Wallpapers & Interiors',
  shortName: 'A to Z Wallpapers',
  tagline: 'Custom wallpapers & interiors for Faridabad homes',
  description:
    'Customised and printed wallpaper, wall murals and interior makeovers in Faridabad. Consultation, design samples and installation — Sector 19 and Delhi-NCR.',

  /** Production URL (no trailing slash) */
  url: 'https://atozwallpapers.in', // TODO-CONFIRM: final domain

  locale: 'en-IN',
  language: 'en',

  address: {
    street: 'House No. 1357, Near DPS School',
    locality: 'Sector 19',
    city: 'Faridabad',
    region: 'Haryana',
    postalCode: '121002',
    country: 'IN',
    countryName: 'India',
    /** Full single-line NAP string */
    full: 'House No. 1357, Near DPS School, Sector 19, Faridabad, Haryana 121002',
  },

  /** Exact Google Maps coordinates confirmed by client */
  geo: {
    latitude: 28.4257085,
    longitude: 77.3106342,
  },

  phone: {
    /** E.164 without spaces, e.g. +9198XXXXXXXX */
    e164: '+919811183401',
    /** Display format for UI */
    display: '9811183401',
    /** Digits only for WhatsApp (country code + number, no +) */
    whatsapp: '919811183401',
  },

  email: '', // TODO-CONFIRM
  ownerName: '', // TODO-CONFIRM
  gstin: '', // TODO-CONFIRM

  hours: {
    /** Schema.org openingHours format fragments */
    schema: ['Mo-Sa 10:00-19:00'], // TODO-CONFIRM
    display: 'Mon–Sat · 10:00 AM – 7:00 PM', // TODO-CONFIRM
    note: 'Sunday by appointment', // TODO-CONFIRM
  },

  social: {
    instagram: 'https://www.instagram.com/atozwallpapersandinteriors',
    facebook: '#',
    youtube: '#',
    pinterest: '#',
  },

  google: {
    businessProfileUrl: '#',
    mapsPlaceUrl: 'https://www.google.com/maps/place/A+to+Z+Wallpapers+%26+Interiors/@28.4257085,77.3106342,17z/data=!4m15!1m8!3m7!1s0x390cdd739cbb6443:0x65d83d0f66cbf1fe!2sA+to+Z+Wallpapers+%26+Interiors!8m2!3d28.4257085!4d77.3106342!10e1!16s%2Fg%2F11h5w8s9ps!3m5!1s0x390cdd739cbb6443:0x65d83d0f66cbf1fe!8m2!3d28.4257085!4d77.3106342!16s%2Fg%2F11h5w8s9ps?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D',
    mapsEmbedUrl: 'https://www.google.com/maps?q=28.4257085,77.3106342&output=embed',
  },

  /** Apps Script web app URL — rotate via README when compromised */
  formEndpoint: '', // TODO-CONFIRM after Apps Script deploy

  /** GTM container — empty disables injection until set */
  gtmId: '', // TODO-CONFIRM e.g. GTM-XXXXXXX

  serviceArea: {
    primary: 'Faridabad',
    areas: [
      'Sector 19',
      'NIT Faridabad',
      'Greater Faridabad',
      'Ballabgarh',
      'Old Faridabad',
      'Sector 15',
      'Sector 16',
      'Sector 17',
      'Sector 21',
      'Sector 37',
    ],
    nearby: 'Delhi-NCR',
  },

  /**
   * Core offerings — confirm with owner before publishing; do not invent services.
   * Prices intentionally omitted until confirmed.
   */
  offerings: [
    'Customised / printed wallpaper',
    '3D wallpaper',
    'Waterproof wallpaper',
    "Kids' room wallpaper",
    'Textured walls',
    'Wall murals',
    'Wall panels',
    'Flooring',
    'Ceiling work',
    'Full-room makeovers',
  ], // TODO-CONFIRM full service list with owner

  usp: [
    'Custom designs for your room',
    'Installation included',
    'Faridabad & Delhi-NCR service',
    'Free consultation',
  ], // TODO-CONFIRM

  calculator: {
    defaultRollCoverageSqFt: 57,
    wastagePercentMin: 10,
    wastagePercentMax: 15,
    /** Indicative ₹ per roll — only show range if confirmed */
    pricePerRollMin: null as number | null, // TODO-CONFIRM
    pricePerRollMax: null as number | null, // TODO-CONFIRM
  },

  cta: {
    primary: 'Book Free Consultation',
    primaryHinglish: 'Free Consultation Book Karein',
    whatsappPrefill:
      'Hi A to Z Wallpapers, I saw your website and want a free consultation for wallpaper / interiors in Faridabad.',
    replySla: 'We reply within one business day',
  },

  legal: {
    privacyEffective: '2026-10-11',
    termsEffective: '2026-10-11',
  },
} as const;

export type SiteConfig = typeof site;

/** Tel href — empty when phone not confirmed */
export function telHref(): string | null {
  return site.phone.e164 ? `tel:${site.phone.e164}` : null;
}

/** WhatsApp click-to-chat URL */
export function whatsappHref(message = site.cta.whatsappPrefill): string | null {
  if (!site.phone.whatsapp) return null;
  return `https://wa.me/${site.phone.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function fullAddress(): string {
  return site.address.full;
}
