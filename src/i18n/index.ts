import { messages as en } from './en';

/** Default locale. When Hindi pages exist, select from Astro.currentLocale. */
export const t = en;
export type Messages = typeof en;
