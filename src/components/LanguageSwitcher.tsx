"use client";

import { languages } from "@/i18n/translations";
import { useLanguage } from "@/i18n/LanguageContext";

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 sm:gap-1 rounded-full border border-slate-200 bg-white/60 p-0.5 sm:p-1 backdrop-blur">
      {languages.map((l) => {
        const active = l.code === lang;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            className={
              "rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-semibold tracking-wide transition-colors " +
              (active
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100")
            }
            aria-pressed={active}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
