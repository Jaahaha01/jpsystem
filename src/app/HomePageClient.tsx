"use client";

import { SiteImage as Image } from "@/components/SiteImage";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/Card";
import { PageTitle } from "@/components/PageTitle";
import { useLanguage } from "@/i18n/LanguageContext";
import { ChevronDown } from "lucide-react";
import { type HomepageData, getStrapiImageUrl } from "@/lib/strapi";

export default function HomePageClient({ data: dataProp }: { data: { th: HomepageData | null; en: HomepageData | null; jp: HomepageData | null } | HomepageData | null }) {
  const { t, lang } = useLanguage();
  const data = (dataProp && typeof dataProp === "object" && ("en" in dataProp || "th" in dataProp || "jp" in dataProp))
    ? (dataProp as any)[lang]
    : dataProp as HomepageData | null;

  const heroTitle = data?.heroTitle || t.pages.home.hero.title;
  const heroSubtitle = data?.heroSubtitle || t.pages.home.hero.subtitle;
  const heroCtaPrimary = data?.heroCtaPrimary || t.pages.home.hero.ctaPrimary;

  const servicesTitle = data?.servicesTitle || t.pages.home.services.title;
  
  const defaultServices = t.pages.home.services.items;
  const serviceItems = defaultServices.map((defaultItem, idx) => {
    const strapiItem = data?.serviceItems?.[idx];
    const title = (strapiItem && strapiItem.title && strapiItem.title.trim() !== "") ? strapiItem.title : defaultItem.title;
    const desc = (strapiItem && strapiItem.desc && strapiItem.desc.trim() !== "") ? strapiItem.desc : defaultItem.desc;
    return {
      id: strapiItem?.id,
      title,
      desc,
      url: strapiItem?.url || undefined,
      icon: strapiItem?.icon || null
    };
  });

  if (data?.serviceItems && data.serviceItems.length > defaultServices.length) {
    for (let i = defaultServices.length; i < data.serviceItems.length; i++) {
      const strapiItem = data.serviceItems[i];
      if (strapiItem && strapiItem.title && strapiItem.title.trim() !== "") {
        serviceItems.push({
          id: strapiItem.id,
          title: strapiItem.title,
          desc: strapiItem.desc || "",
          url: strapiItem.url,
          icon: strapiItem.icon
        });
      }
    }
  }

  const heroBgImageUrl = data?.heroBgImage ? getStrapiImageUrl(data.heroBgImage) : "/homebg.jpg";

  return (
    <div className="relative overflow-hidden">
      <PageTitle title={t.pages.home.metaTitle} />

      {/* --- Section 1: Hero --- */}
      <section className="relative border-b border-slate-100">
        <div className="relative overflow-hidden">
          {/* Responsive aspect ratio: taller on mobile, wider on desktop */}
          <div className="relative aspect-[9/14] w-full sm:aspect-[16/10] lg:aspect-[21/9]">
            <Image
              src={heroBgImageUrl}
              alt="Home background"
              fill
              priority
              sizes="100vw"
              quality={75}
              className="object-cover"
              unoptimized={heroBgImageUrl.includes("localhost") || heroBgImageUrl.includes("127.0.0.1")}
            />
          </div>
          {/* Multi-layer overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/50 to-slate-950/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900/20 to-indigo-900/10" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-5 sm:px-6 text-center">
            <div className="max-w-3xl w-full">
              {/* Animated badge */}
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 sm:px-4 sm:py-1.5 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-white/90 uppercase">
                    Japan System
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="mt-4 sm:mt-6 text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl drop-shadow-2xl">
                  {heroTitle}
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-3 sm:mt-4 text-sm text-white/70 max-w-2xl mx-auto sm:text-base lg:text-lg">
                  {heroSubtitle}
                </p>
              </Reveal>

              {/* CTA Buttons */}
              <Reveal delay={0.3}>
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/it-system"
                    className="shimmer w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-white px-5 sm:px-6 py-3 text-sm font-semibold text-slate-900 shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl"
                  >
                    {heroCtaPrimary}
                    <span className="ml-2">→</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-5 sm:px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                  >
                    {t.nav.contact}
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Scroll indicator */}
            <Reveal delay={0.4}>
              <button
                type="button"
                onClick={() => {
                  const target = document.getElementById("services");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="mt-8 sm:mt-12 group relative inline-flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14"
                aria-label="Scroll to services"
              >
                <div className="absolute inset-0 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/15 group-hover:border-white/40" />
                <ChevronDown className="relative h-5 w-5 sm:h-6 sm:w-6 text-white animate-bounce" />
              </button>
            </Reveal>
          </div>

          {/* Decorative floating orbs — hidden on very small screens for performance */}
          <div className="hidden sm:block absolute -right-20 top-1/4 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl animate-float" />
          <div className="hidden sm:block absolute -left-16 bottom-1/3 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl animate-float-delayed" />
        </div>
      </section>

      {/* --- Section 2: Services --- */}
      <section id="services" className="relative py-14 sm:py-20 lg:py-24 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-2/3 bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
        <div className="hidden sm:block absolute -right-32 top-20 h-64 w-64 rounded-full bg-sky-100/50 blur-3xl" />
        <div className="hidden sm:block absolute -left-32 bottom-20 h-64 w-64 rounded-full bg-indigo-100/30 blur-3xl" />

        <Container>
          <div className="relative">
            <Reveal>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold tracking-wide text-slate-600 shadow-sm mb-3 sm:mb-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                    Services
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
                    {servicesTitle}
                  </h2>
                </div>
                <Link
                  href="/it-system"
                  className="hidden text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors sm:inline-flex items-center gap-1"
                  data-cursor="interactive"
                >
                  {t.common.learnMore}
                  <span className="text-sky-500 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </Reveal>

            <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {serviceItems.map((it: any, idx: number) => {
                // ลิสต์ลิงก์และไอคอนเริ่มต้น (อ้างอิงตาม Index)
                const hrefs = ["/it-system", "/e-tax", "/marketing", "/my-log-star", "/new-release"];
                const icons = [
                  "/iconcpu.png",
                  "/iconfile-text.png",
                  "/iconchart-no-axes-combined.png",
                  "/iconshield-check.png",
                  "/iconlightbulb.png",
                ];
                
                // ถ้ารายการเกิน 5 อันที่ตั้งไว้ จะให้ใช้ลิงก์และไอคอน Default
                // หรือถ้า Strapi ส่งข้อมูล URL / Icon มา ก็จะใช้ข้อมูลจาก Strapi
                const href = (it as any).url || hrefs[idx] || "#";
                const iconSrc = (it as any).icon ? getStrapiImageUrl((it as any).icon) : (icons[idx] || "/iconlightbulb.png"); 

                return (
                  <Reveal key={it.id || `service-${idx}`} delay={0.05 * (idx % 3)}>
                    <Card
                      title={it.title}
                      desc={it.desc}
                      href={href}
                      icon={
                        <Image
                          src={iconSrc}
                          alt="Service icon"
                          width={24}
                          height={24}
                          loading="lazy"
                          className="h-6 w-6 object-contain"
                          unoptimized={iconSrc.includes("localhost") || iconSrc.includes("127.0.0.1")}
                        />
                      }
                    />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
