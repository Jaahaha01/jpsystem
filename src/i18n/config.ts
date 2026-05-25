/**
 * i18n Configuration
 * Central configuration for all locale-related constants and utilities.
 */

export const locales = ["th", "en", "ja"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Map our locale codes to the HTML `lang` attribute value */
export const htmlLangMap: Record<Locale, string> = {
  th: "th",
  en: "en",
  ja: "ja",
};

/** Map our locale codes to Strapi's locale codes */
export const strapiLocaleMap: Record<Locale, string> = {
  th: "th",
  en: "en",
  ja: "ja",
};

/** Type guard — narrows an unknown string to a valid Locale */
export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Locale labels for the language switcher UI */
export const localeLabels: Record<Locale, string> = {
  th: "TH",
  en: "EN",
  ja: "JP",
};
