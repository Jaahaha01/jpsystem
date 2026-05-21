"use client";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { languages, translations } from "@/i18n/translations";

export const defaultLanguage = "en";

export const htmlLangByLanguage = {
  th: "th",
  en: "en",
  jp: "ja",
} as const;

const resources = Object.fromEntries(
  Object.entries(translations).map(([language, translation]) => [
    language,
    { translation },
  ])
);

if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    resources,
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    supportedLngs: languages.map((language) => language.code),
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

export { i18next };
