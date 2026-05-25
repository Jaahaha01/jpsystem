"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, localeLabels } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

export function LanguageSwitcher({ currentLang }: { currentLang: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === currentLang) return;
    
    // Replace the first segment of the path with the new locale
    const newPath = pathname.replace(`/${currentLang}`, `/${newLocale}`);
    router.push(newPath);
    router.refresh(); // Optional, to ensure data is refetched if needed
  };

  return (
    <div className="flex items-center gap-0.5 sm:gap-1 rounded-full border border-slate-200 bg-white/60 p-0.5 sm:p-1 backdrop-blur">
      {locales.map((locale) => {
        const active = locale === currentLang;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => handleLanguageChange(locale)}
            className={
              "rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-semibold tracking-wide transition-colors " +
              (active
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100")
            }
            aria-pressed={active}
          >
            {localeLabels[locale]}
          </button>
        );
      })}
    </div>
  );
}
