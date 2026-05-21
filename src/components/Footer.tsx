"use client";

import Link from "next/link";
import { SiteImage as Image } from "@/components/SiteImage";
import { Container } from "@/components/Container";
import { useLanguage } from "@/i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative border-t border-slate-200/60 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-2/3 bg-gradient-to-r from-transparent via-sky-300/50 to-transparent" />

      {/* Background glow */}
      <div className="absolute -left-32 bottom-0 h-40 w-40 rounded-full bg-sky-100/30 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-40 w-40 rounded-full bg-indigo-100/20 blur-3xl" />

      <Container>
        <div className="relative py-10 sm:py-12">
          {/* Main footer content */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Brand + Logo */}
            <div className="flex items-center gap-3">
              <Image
                src="/logo_japanSystem.png"
                alt="Japan System Logo"
                width={28}
                height={28}
                className="rounded-full opacity-60"
              />
              <div className="text-xs font-medium text-slate-500">
                {t.common.copyright}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 text-xs font-semibold text-slate-600">
              <Link
                className="transition-colors hover:text-slate-900 hover:underline underline-offset-4"
                href="/company-profile"
              >
                {t.footer.companyProfile}
              </Link>
              <div className="h-3 w-px bg-slate-200 hidden sm:block" />
              <Link
                className="transition-colors hover:text-slate-900 hover:underline underline-offset-4"
                href="/contact"
              >
                {t.footer.contact}
              </Link>
              <div className="h-3 w-px bg-slate-200 hidden sm:block" />
              <Link
                className="transition-colors hover:text-slate-900 hover:underline underline-offset-4"
                href="/e-tax"
              >
                E-Tax
              </Link>
            </div>
          </div>

          {/* Bottom bar - visible on larger screens */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-400">
            <span>Built with precision & care</span>
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              All systems operational
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
