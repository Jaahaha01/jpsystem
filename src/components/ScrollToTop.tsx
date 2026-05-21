"use client";

import { useEffect, useState } from "react";

/**
 * Lightweight ScrollToTop — uses pure CSS transitions instead of
 * framer-motion to avoid loading the animation library for this small button.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={
        "fixed bottom-6 right-6 z-50 grid h-11 w-11 place-items-center rounded-full bg-slate-900/80 text-white shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-slate-900 hover:scale-110 hover:shadow-2xl " +
        (visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none")
      }
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
