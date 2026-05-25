"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollToTop } from "@/components/ScrollToTop";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function ShellWrapper({
  children,
  dict,
  lang,
}: {
  children: React.ReactNode;
  dict: Dictionary;
  lang: Locale;
}) {
  return (
    <div>
      <Navbar dict={dict} lang={lang} />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer dict={dict} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
