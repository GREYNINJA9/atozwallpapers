/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface AtozAttrs {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  msclkid?: string;
  fbclid?: string;
  landing_page?: string;
  referrer?: string;
}

interface Window {
  dataLayer: Record<string, unknown>[];
  atozTrack?: (event: string, payload?: Record<string, unknown>) => void;
  gtag?: (...args: unknown[]) => void;
  __ATOZ_ATTRS?: AtozAttrs;
  __ATOZ_GTM_ID?: string;
  __ATOZ_GTM_LOADED?: boolean;
}
