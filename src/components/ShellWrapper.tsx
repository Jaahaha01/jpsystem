"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollToTop } from "@/components/ScrollToTop";
import dynamic from "next/dynamic";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

// Lazy load ZenLoader for better performance since it's only shown once
const ZenLoader = dynamic(() => import("@/components/ZenLoader"), { ssr: false });

export function ShellWrapper({
  children,
  dict,
  lang,
  initialShowLoader = true,
}: {
  children: React.ReactNode;
  dict: Dictionary;
  lang: Locale;
  initialShowLoader?: boolean;
}) {
  const [showLoader, setShowLoader] = useState(initialShowLoader);

  useEffect(() => {
    // If the server didn't see the cookie, but the client has it stored, we can hide it.
    // However, the cookie should naturally handle this. We don't strictly need a client-side check anymore
    // but we can keep a fallback just in case.
    if (showLoader && document.cookie.includes("jpsys_zen_loaded=1")) {
      setShowLoader(false);
    }
  }, [showLoader]);

  const handleComplete = () => {
    // Set a session cookie (expires when browser closes) or max-age for 24h
    // Since the user wants it like language, let's make it 24 hours.
    document.cookie = `jpsys_zen_loaded=1; path=/; max-age=86400`;
    setShowLoader(false);
  };

  return (
    <div className={showLoader ? "overflow-hidden" : ""}>
      {showLoader && <ZenLoader onComplete={handleComplete} />}
      <Navbar dict={dict} lang={lang} />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer dict={dict} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
