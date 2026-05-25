"use client";

import Link from "next/link";
import { SiteImage as Image } from "@/components/SiteImage";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Container } from "@/components/Container";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

const topLinks = [
  { href: "/", key: "home" as const },
  { href: "/new-release", key: "newRelease" as const },
  { href: "/company-profile", key: "company" as const },
  { href: "/contact", key: "contact" as const },
];

const solutionLinks = [
  { href: "/it-system", key: "itSystem" as const },
  { href: "/e-tax", key: "eTax" as const },
  { href: "/marketing", key: "marketing" as const },
  { href: "/my-log-star", key: "myLogStar" as const },
];

export function Navbar({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSolutionOpen, setMobileSolutionOpen] = useState(false);

  // Helper to prepend locale to paths if necessary. Pathname from Next.js 
  // app router includes the locale segment e.g., `/en/contact`.
  const inSolution = useMemo(() => {
    return solutionLinks.some((l) => pathname.endsWith(l.href) || pathname === `/${lang}${l.href}`);
  }, [pathname, lang]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileSolutionOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <Container>
          <div className="flex h-16 items-center justify-between gap-4">
            <Link
              href={`/${lang}`}
              className="group flex items-center gap-3 text-sm font-semibold tracking-tight text-slate-900"
            >
              <span className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image
                  src="/logo_japanSystem.png"
                  alt="Japan System Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                  priority
                />
              </span>
              <span className="hidden sm:block">{dict.brand}</span>
              <span className="sm:hidden">JST</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 md:flex">
              {topLinks.slice(0, 1).map((l) => {
                const href = l.href === "/" ? `/${lang}` : `/${lang}${l.href}`;
                const active = pathname === href || pathname === href + "/";
                return (
                  <Link
                    key={l.href}
                    href={href}
                    className={
                      "relative rounded-full px-3 py-2 text-xs font-semibold tracking-wide transition-colors " +
                      (active
                        ? "text-slate-900"
                        : "text-slate-600 hover:text-slate-900")
                    }
                    data-cursor="interactive"
                  >
                    {dict.nav[l.key]}
                    {active ? (
                      <span className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500" />
                    ) : null}
                  </Link>
                );
              })}

              <div
                className="relative"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                <button
                  type="button"
                  className={
                    "relative inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold tracking-wide transition-colors " +
                    (inSolution || open
                      ? "text-slate-900"
                      : "text-slate-600 hover:text-slate-900")
                  }
                  aria-haspopup="menu"
                  aria-expanded={open}
                  data-cursor="interactive"
                >
                  {dict.nav.solution}
                  <span
                    className={
                      "text-slate-400 transition-transform duration-200 " +
                      (open ? "rotate-180" : "")
                    }
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                  {inSolution ? (
                    <span className="absolute inset-x-2 -bottom-0.5 h-px bg-sky-500/70" />
                  ) : null}
                </button>

                <AnimatePresence>
                  {open ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: 8, filter: "blur(10px)" }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-slate-100 bg-white/80 shadow-[0_30px_90px_rgba(15,23,42,0.10)] backdrop-blur"
                      role="menu"
                    >
                      <div className="p-2">
                        {solutionLinks.map((l, idx) => {
                          const href = `/${lang}${l.href}`;
                          const active = pathname === href || pathname === href + "/";
                          return (
                            <motion.div
                              key={l.href}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.22, delay: 0.03 * idx }}
                            >
                              <Link
                                href={href}
                                className={
                                  "group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition-colors " +
                                  (active
                                    ? "bg-slate-900 text-white"
                                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900")
                                }
                                onClick={() => setOpen(false)}
                                data-cursor="interactive"
                                role="menuitem"
                              >
                                <span>{dict.nav[l.key]}</span>
                                <span
                                  className={
                                    "text-sky-500/80 opacity-0 transition-opacity group-hover:opacity-100 " +
                                    (active ? "text-white/80 opacity-100" : "")
                                  }
                                  aria-hidden="true"
                                >
                                  →
                                </span>
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {topLinks.slice(1).map((l) => {
                const href = `/${lang}${l.href}`;
                const active = pathname === href || pathname === href + "/";
                return (
                  <Link
                    key={l.href}
                    href={href}
                    className={
                      "relative rounded-full px-3 py-2 text-xs font-semibold tracking-wide transition-colors " +
                      (active
                        ? "text-slate-900"
                        : "text-slate-600 hover:text-slate-900")
                    }
                    data-cursor="interactive"
                  >
                    {dict.nav[l.key]}
                    {active ? (
                      <span className="absolute inset-x-2 -bottom-0.5 h-px bg-sky-500/70" />
                    ) : null}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <LanguageSwitcher currentLang={lang} />
              <Link
                href={`/${lang}/contact`}
                className="hidden rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold tracking-wide text-white shadow-lg shadow-slate-900/10 transition-all hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-xl shimmer md:inline-flex"
                data-cursor="interactive"
              >
                {dict.nav.contact}
              </Link>

              {/* Mobile hamburger button */}
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/60 backdrop-blur transition-all hover:bg-slate-50 md:hidden"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                <div className="flex flex-col items-center justify-center gap-[5px]">
                  <span
                    className={
                      "block h-[2px] w-5 rounded-full bg-slate-700 transition-all duration-300 " +
                      (mobileOpen ? "translate-y-[7px] rotate-45" : "")
                    }
                  />
                  <span
                    className={
                      "block h-[2px] w-5 rounded-full bg-slate-700 transition-all duration-300 " +
                      (mobileOpen ? "opacity-0 scale-0" : "")
                    }
                  />
                  <span
                    className={
                      "block h-[2px] w-5 rounded-full bg-slate-700 transition-all duration-300 " +
                      (mobileOpen ? "-translate-y-[7px] -rotate-45" : "")
                    }
                  />
                </div>
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Mobile Drawer */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 z-50 flex h-full w-[85%] max-w-sm flex-col bg-white/95 backdrop-blur-xl shadow-2xl md:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                <Link
                  href={`/${lang}`}
                  className="flex items-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <Image
                    src="/logo_japanSystem.png"
                    alt="Logo"
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                  <span className="text-sm font-bold text-slate-900">
                    {dict.brand}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Close menu"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M12 4L4 12M4 4l8 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="space-y-1">
                  {/* Home link */}
                  {topLinks.slice(0, 1).map((l) => {
                    const href = l.href === "/" ? `/${lang}` : `/${lang}${l.href}`;
                    const active = pathname === href || pathname === href + "/";
                    return (
                      <motion.div
                        key={l.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Link
                          href={href}
                          onClick={() => setMobileOpen(false)}
                          className={
                            "flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-colors " +
                            (active
                              ? "bg-slate-900 text-white"
                              : "text-slate-700 hover:bg-slate-50")
                          }
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-sky-50 to-indigo-50 text-sky-600">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                              <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                          </span>
                          {dict.nav[l.key]}
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Solution accordion */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setMobileSolutionOpen(!mobileSolutionOpen)
                      }
                      className={
                        "flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-colors " +
                        (inSolution
                          ? "bg-sky-50 text-sky-700"
                          : "text-slate-700 hover:bg-slate-50")
                      }
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-sky-50 to-indigo-50 text-sky-600">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                            <line x1="8" y1="21" x2="16" y2="21" />
                            <line x1="12" y1="17" x2="12" y2="21" />
                          </svg>
                        </span>
                        {dict.nav.solution}
                      </div>
                      <span
                        className={
                          "text-slate-400 transition-transform duration-300 " +
                          (mobileSolutionOpen ? "rotate-180" : "")
                        }
                      >
                        ▾
                      </span>
                    </button>

                    <AnimatePresence>
                      {mobileSolutionOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="ml-6 mt-1 space-y-1 border-l-2 border-sky-100 pl-4">
                            {solutionLinks.map((l, idx) => {
                              const href = `/${lang}${l.href}`;
                              const active = pathname === href || pathname === href + "/";
                              return (
                                <motion.div
                                  key={l.href}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    delay: 0.05 * idx,
                                    duration: 0.2,
                                  }}
                                >
                                  <Link
                                    href={href}
                                    onClick={() => setMobileOpen(false)}
                                    className={
                                      "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors " +
                                      (active
                                        ? "bg-slate-900 text-white"
                                        : "text-slate-600 hover:bg-sky-50 hover:text-sky-700")
                                    }
                                  >
                                    <span
                                      className={
                                        "h-1.5 w-1.5 rounded-full " +
                                        (active
                                          ? "bg-white"
                                          : "bg-sky-400")
                                      }
                                    />
                                    {dict.nav[l.key]}
                                  </Link>
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Other top links */}
                  {topLinks.slice(1).map((l, idx) => {
                    const href = `/${lang}${l.href}`;
                    const active = pathname === href || pathname === href + "/";
                    const icons = [
                      // New Release
                      <svg key="nr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>,
                      // Company
                      <svg key="cp" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                      </svg>,
                      // Contact
                      <svg key="ct" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>,
                    ];
                    return (
                      <motion.div
                        key={l.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + idx * 0.05 }}
                      >
                        <Link
                          href={href}
                          onClick={() => setMobileOpen(false)}
                          className={
                            "flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-colors " +
                            (active
                              ? "bg-slate-900 text-white"
                              : "text-slate-700 hover:bg-slate-50")
                          }
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-sky-50 to-indigo-50 text-sky-600">
                            {icons[idx]}
                          </span>
                          {dict.nav[l.key]}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="border-t border-slate-100 px-6 py-5">
                <Link
                  href={`/${lang}/contact`}
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:shadow-xl active:scale-[0.98]"
                >
                  {dict.nav.contact}
                  <span className="ml-2 text-white/60">→</span>
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
