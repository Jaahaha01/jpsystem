"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Language } from "@/i18n/translations";

/* ── Types ── */
type LocalizedField = {
  th?: string;
  en?: string;
  ja?: string;
};

type HomePageData = {
  heroTitle?: LocalizedField;
  heroSubtitle?: LocalizedField;
  servicesTitle?: LocalizedField;
};

type SanityContentValue = {
  homePage: HomePageData | null;
  loaded: boolean;
  /** Get localized text from a page field */
  getHomeText: (field: keyof HomePageData, lang: Language) => string | undefined;
};

const SanityContentContext = createContext<SanityContentValue>({
  homePage: null,
  loaded: false,
  getHomeText: () => undefined,
});

function getLocalized(field: LocalizedField | undefined, lang: Language): string | undefined {
  if (!field) return undefined;
  const langKey = lang === "jp" ? "ja" : lang;
  const value = field[langKey as keyof LocalizedField];
  return value || undefined;
}

export function SanityContentProvider({ children }: { children: React.ReactNode }) {
  const [homePage, setHomePage] = useState<HomePageData | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
    const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-06";

    if (!projectId) {
      setLoaded(true);
      return;
    }

    const baseUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`;
    const query = encodeURIComponent(`*[_type == "homePage" && _id == "homePage"][0]{heroTitle, heroSubtitle, servicesTitle}`);

    fetch(`${baseUrl}?query=${query}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.result) setHomePage(data.result);
        setLoaded(true);
      })
      .catch(() => {
        setLoaded(true);
      });
  }, []);

  const getHomeText = (field: keyof HomePageData, lang: Language): string | undefined => {
    if (!homePage) return undefined;
    return getLocalized(homePage[field] as LocalizedField | undefined, lang);
  };

  return (
    <SanityContentContext.Provider value={{ homePage, loaded, getHomeText }}>
      {children}
    </SanityContentContext.Provider>
  );
}

export function useSanityContent() {
  return useContext(SanityContentContext);
}
