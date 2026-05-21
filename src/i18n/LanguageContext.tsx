"use client";

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { defaultLanguage, htmlLangByLanguage, i18next } from "@/i18n/i18next";
import type { Language } from "@/i18n/translations";
import { translations } from "@/i18n/translations";

type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (typeof translations)[Language];
  translate: TFunction<"translation", undefined>;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "jst-lang";

function detectClientLanguage(): Language {
  const saved = window.localStorage.getItem(STORAGE_KEY) as Language | null;
  if (saved && saved in translations) return saved;

  const browserLang = navigator.language || "";
  if (browserLang.startsWith("ja")) return "jp";
  if (browserLang.startsWith("th")) return "th";

  return defaultLanguage;
}

function applyLanguage(language: Language, nextI18n: typeof i18next) {
  window.localStorage.setItem(STORAGE_KEY, language);
  document.documentElement.lang = htmlLangByLanguage[language];
  document.documentElement.dataset.lang = language;
  nextI18n.changeLanguage(language);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18next}>
      <LanguageStateProvider>{children}</LanguageStateProvider>
    </I18nextProvider>
  );
}

function LanguageStateProvider({ children }: { children: React.ReactNode }) {
  const { t: translate, i18n } = useTranslation();
  const [lang, setLangState] = useState<Language>(defaultLanguage);
  const skipNextLanguageEffect = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const detected = detectClientLanguage();
    applyLanguage(detected, i18n);

    if (detected !== defaultLanguage) {
      // Language differs from the initial state → a re-render will follow.
      // Set the skip flag so the second useEffect ignores that single re-render
      // (applyLanguage was already called above).
      skipNextLanguageEffect.current = true;
      window.setTimeout(() => setLangState(detected), 0);
    }
    // When detected === defaultLanguage, setLangState won't fire (same value),
    // so we must NOT set skipNextLanguageEffect = true — there is no upcoming
    // effect invocation to consume it, and it would silently swallow the user's
    // first manual language switch.
  }, [i18n]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (skipNextLanguageEffect.current) {
      skipNextLanguageEffect.current = false;
      return;
    }

    applyLanguage(lang, i18n);
  }, [i18n, lang]);

  const value = useMemo<LanguageContextValue>(() => {
    const resourceBundle = i18n.getResourceBundle(lang, "translation") as
      | (typeof translations)[Language]
      | undefined;

    return {
      lang,
      setLang: (next) => setLangState(next),
      t: resourceBundle ?? translations[lang],
      translate,
    };
  }, [i18n, lang, translate]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
