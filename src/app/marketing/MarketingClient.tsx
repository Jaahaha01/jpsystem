"use client";

import { SiteImage as Image } from "@/components/SiteImage";
import { Container } from "@/components/Container";
import { PageTitle } from "@/components/PageTitle";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { ChevronDown } from "lucide-react";
import { MarketingData, getStrapiImageUrl } from "@/lib/strapi";

export default function MarketingClient({ data: dataProp }: { data: { th: MarketingData | null; en: MarketingData | null; jp: MarketingData | null } | MarketingData | null }) {
  const { t, lang } = useLanguage();
  const data = (dataProp && typeof dataProp === "object" && ("en" in dataProp || "th" in dataProp || "jp" in dataProp))
    ? (dataProp as any)[lang]
    : dataProp as MarketingData | null;
  const p = t.pages.marketing;

  const defaultSocialIcons = [
    { src: "/facebook.png", alt: "Facebook", label: "Facebook" },
    { src: "/instagram.png", alt: "Instagram", label: "Instagram" },
    { src: "/line.png", alt: "Line", label: "Line" },
    { src: "/Twitter.png", alt: "Twitter", label: "Twitter" },
  ];

  // Fallbacks & Merge Logic

  // 1. Hero Section
  const heroTitle = data?.heroTitle || p.heroTitle;
  const heroBgImageUrl = data?.heroBgImage ? getStrapiImageUrl(data.heroBgImage) : "/bg_mmk.jpg";

  // 2. Card 1: Website
  const cardWebsite = data?.cardWebsite || p.cardWebsite;
  const cardWebsiteBgUrl = data?.cardWebsiteBg ? getStrapiImageUrl(data.cardWebsiteBg) : "/commk.jpg";
  const cardWebsiteIconUrl = data?.cardWebsiteIcon ? getStrapiImageUrl(data.cardWebsiteIcon) : "/website-icon.png";
  const cardWebsiteLabel = data?.cardWebsiteLabel || "Website";

  // 3. Card 2: Online Marketing
  const cardOnlineMarketing = data?.cardOnlineMarketing || p.cardOnlineMarketing;
  const cardOnlineMarketingBgUrl = data?.cardOnlineMarketingBg ? getStrapiImageUrl(data.cardOnlineMarketingBg) : "/bg_mmk.jpg";

  const socialIcons = defaultSocialIcons.map((defaultIcon, idx) => {
    const strapiIcon = data?.socialIcons?.[idx];
    const label = (strapiIcon && strapiIcon.label && strapiIcon.label.trim() !== "")
      ? strapiIcon.label
      : defaultIcon.label;
    const src = (strapiIcon && strapiIcon.icon)
      ? getStrapiImageUrl(strapiIcon.icon)
      : defaultIcon.src;
    return { src, alt: label, label };
  });

  if (data?.socialIcons && data.socialIcons.length > defaultSocialIcons.length) {
    for (let i = defaultSocialIcons.length; i < data.socialIcons.length; i++) {
      const strapiIcon = data.socialIcons[i];
      if (strapiIcon && strapiIcon.label && strapiIcon.label.trim() !== "") {
        socialIcons.push({
          src: strapiIcon.icon ? getStrapiImageUrl(strapiIcon.icon) : "/facebook.png",
          alt: strapiIcon.label,
          label: strapiIcon.label
        });
      }
    }
  }

  const scrollToContent = () => {
    const content = document.getElementById("content");
    content?.scrollIntoView({ behavior: "smooth" });
  };

  // SSRF bypass checks
  const isLocalHeroBg = heroBgImageUrl.includes("localhost") || heroBgImageUrl.includes("127.0.0.1");
  const isLocalCardWebsiteBg = cardWebsiteBgUrl.includes("localhost") || cardWebsiteBgUrl.includes("127.0.0.1");
  const isLocalCardWebsiteIcon = cardWebsiteIconUrl.includes("localhost") || cardWebsiteIconUrl.includes("127.0.0.1");
  const isLocalCardMarketingBg = cardOnlineMarketingBgUrl.includes("localhost") || cardOnlineMarketingBgUrl.includes("127.0.0.1");

  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50/50 min-h-screen font-sans flex flex-col">
      <PageTitle title={p.metaTitle} />

      {/* --- Hero --- */}
      <section className="relative h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBgImageUrl}
            alt="Marketing background"
            fill
            sizes="100vw"
            quality={65}
            className="object-cover"
            priority
            unoptimized={isLocalHeroBg}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/40 to-slate-900/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/10 to-sky-900/10" />
        </div>

        {/* Decorative floating elements */}
        <div className="hidden sm:block absolute -right-20 top-1/4 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl animate-float" />
        <div className="hidden sm:block absolute -left-16 bottom-1/3 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl animate-float-delayed" />

        <div className="relative z-10 text-center px-5 sm:px-6">
          <Reveal>
            <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-2xl uppercase">
              {heroTitle}
            </h1>
            <div className="mt-4 sm:mt-6 mx-auto h-0.5 w-16 sm:w-24 bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full" />

            <button
              onClick={scrollToContent}
              className="mt-8 sm:mt-12 group relative inline-flex items-center justify-center"
            >
              <div className="absolute h-12 w-12 sm:h-14 sm:w-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/15" />
              <ChevronDown className="relative h-6 w-6 sm:h-7 sm:w-7 text-white animate-bounce" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* --- Service Cards --- */}
      <div id="content" className="py-14 sm:py-20 flex-grow relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-2/3 bg-gradient-to-r from-transparent via-sky-300/40 to-transparent" />
        <div className="hidden sm:block absolute -right-20 top-40 h-48 w-48 rounded-full bg-sky-100/40 blur-3xl" />
        <div className="hidden sm:block absolute -left-20 bottom-20 h-40 w-40 rounded-full bg-indigo-100/30 blur-3xl" />

        <Container>
          <div className="relative grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2">

            {/* Card 1: Website */}
            <Reveal>
              <div className="flex flex-col items-center group">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">
                  <span className="relative">
                    {cardWebsite}
                    <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                  </span>
                </h3>
                <div className="relative w-full aspect-[4/3] sm:aspect-square max-w-[450px] rounded-2xl sm:rounded-[3rem] overflow-hidden shadow-xl sm:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_40px_100px_rgba(14,165,233,0.15)] gradient-border">
                  <Image
                    src={cardWebsiteBgUrl}
                    alt="Website background"
                    fill
                    sizes="(max-width: 768px) 90vw, 450px"
                    quality={60}
                    loading="lazy"
                    className="object-cover blur-[2px] transition-transform duration-700 group-hover:scale-105"
                    unoptimized={isLocalCardWebsiteBg}
                  />
                  <div className="absolute inset-0 bg-slate-200/20" />

                  <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
                    <div className="w-full max-w-[280px] sm:max-w-[300px] aspect-[4/3] rounded-2xl sm:rounded-3xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl flex flex-col items-center justify-center p-4 sm:p-6 transition-transform duration-500 group-hover:-translate-y-2">
                      <div className="relative h-14 w-14 sm:h-20 sm:w-20 mb-3 sm:mb-4">
                        <Image
                          src={cardWebsiteIconUrl}
                          alt="Website icon"
                          fill
                          sizes="80px"
                          loading="lazy"
                          className="object-contain"
                          unoptimized={isLocalCardWebsiteIcon}
                        />
                      </div>
                      <span className="text-base sm:text-lg font-bold text-slate-700 tracking-widest uppercase">{cardWebsiteLabel}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Card 2: Online Marketing */}
            <Reveal delay={0.1}>
              <div className="flex flex-col items-center group">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">
                  <span className="relative">
                    {cardOnlineMarketing}
                    <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                  </span>
                </h3>
                <div className="relative w-full aspect-[4/3] sm:aspect-square max-w-[450px] rounded-2xl sm:rounded-[3rem] overflow-hidden shadow-xl sm:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_40px_100px_rgba(99,102,241,0.12)] gradient-border">
                  <Image
                    src={cardOnlineMarketingBgUrl}
                    alt="Marketing background"
                    fill
                    sizes="(max-width: 768px) 90vw, 450px"
                    quality={60}
                    loading="lazy"
                    className="object-cover blur-[2px] transition-transform duration-700 group-hover:scale-105"
                    unoptimized={isLocalCardMarketingBg}
                  />
                  <div className="absolute inset-0 bg-slate-200/20" />

                  <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
                    <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-white/40 backdrop-blur-xl border border-white/40 shadow-2xl p-4 sm:p-6 flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-2">
                      <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
                        {socialIcons.map((icon, idx) => {
                          const isLocalIcon = icon.src.includes("localhost") || icon.src.includes("127.0.0.1");
                          return (
                            <div key={`${icon.alt}-${idx}`} className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                              <div className="relative h-8 w-8 sm:h-10 sm:w-10 mb-1.5 sm:mb-2">
                                <Image
                                  src={icon.src}
                                  alt={icon.alt}
                                  fill
                                  sizes="40px"
                                  loading="lazy"
                                  className="object-contain"
                                  unoptimized={isLocalIcon}
                                />
                              </div>
                              <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{icon.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </Container>
      </div>
    </div>
  );
}
