"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollToTop } from "@/components/ScrollToTop";
import ZenLoader from "@/components/ZenLoader";

export function ShellWrapper({ children }: { children: React.ReactNode }) {
  // Set default to true to prevent the Home page from flashing on initial visit (SSR handles this cleanly)
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // If the loader was already displayed in the current browser session, hide it instantly
    const hasLoaded = sessionStorage.getItem("jpsys_entry_loaded");
    if (hasLoaded) {
      setShowLoader(false);
    }
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem("jpsys_entry_loaded", "true");
    setShowLoader(false);
  };

  return (
    <div className={showLoader ? "overflow-hidden" : ""}>
      {showLoader && <ZenLoader onComplete={handleComplete} />}
      <Navbar />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
