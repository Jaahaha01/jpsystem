"use client";

import type { Dictionary } from "@/i18n/dictionaries";
import { useParams } from "next/navigation";

import { SiteImage as Image } from "@/components/SiteImage";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { PageTitle } from "@/components/PageTitle";
import { ChevronDown } from "lucide-react";
import { ETaxData, getStrapiImageUrl } from "@/lib/strapi";

export default function ETaxClient({ data, dict }: { data: ETaxData | null; dict: Dictionary }) {
  const params = useParams();
  const lang = params.lang as string;
    const p = dict.pages.eTax;

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.8,
      behavior: "smooth",
    });
  };

  // Fallbacks & Merge Logic

  // 1. Hero Section
  const heroTitle = data?.heroTitle || "E-Tax Invoice & E-Receipt";
  const heroBgImageUrl = data?.heroBgImage ? getStrapiImageUrl(data.heroBgImage) : "/bg_etax_hero.jpg";

  // 2. Pain Points
  const painHeading = data?.painHeading || p.painHeading;
  const painBgImageUrl = data?.painBgImage ? getStrapiImageUrl(data.painBgImage) : "/bg_painpoints.jpg";
  
  const painItems = p.painItems.map((defaultItem, idx) => {
    const strapiItem = data?.painItems?.[idx];
    return (strapiItem && strapiItem.text && strapiItem.text.trim() !== "")
      ? strapiItem.text
      : defaultItem;
  });

  if (data?.painItems && data.painItems.length > p.painItems.length) {
    for (let i = p.painItems.length; i < data.painItems.length; i++) {
      const strapiItem = data.painItems[i];
      if (strapiItem && strapiItem.text && strapiItem.text.trim() !== "") {
        painItems.push(strapiItem.text);
      }
    }
  }

  // 3. About Section
  const aboutTitle = data?.aboutTitle || p.aboutTitle;
  const aboutDesc = data?.aboutDesc || p.aboutDesc;

  // 4. Definition Cards
  const definitionEtaxTitle = data?.definitionEtaxTitle || p.definitionEtaxTitle;
  const definitionEtaxDesc = data?.definitionEtaxDesc || p.definitionEtaxDesc;
  const definitionEtaxIconUrl = data?.definitionEtaxIcon ? getStrapiImageUrl(data.definitionEtaxIcon) : "/icon_etax.png";

  const definitionSigTitle = data?.definitionSigTitle || p.definitionSigTitle;
  const definitionSigDesc = data?.definitionSigDesc || p.definitionSigDesc;
  const definitionSigIconUrl = data?.definitionSigIcon ? getStrapiImageUrl(data.definitionSigIcon) : "/icon_signature.png";

  // 5. Benefits Section
  const benefitsTitle = data?.benefitsTitle || p.benefitsTitle;
  const defaultBenefitIcons = [
    "/benefit_1.png",
    "/benefit_2.png",
    "/benefit_3.png",
    "/benefit_4.png",
  ];
  const benefits = p.benefits.map((defaultText, idx) => {
    const strapiItem = data?.benefits?.[idx];
    const text = (strapiItem && strapiItem.text && strapiItem.text.trim() !== "")
      ? strapiItem.text
      : defaultText;
    const iconUrl = (strapiItem && strapiItem.icon)
      ? getStrapiImageUrl(strapiItem.icon)
      : (defaultBenefitIcons[idx] || "/benefit_1.png");
    return { text, iconUrl, index: idx + 1 };
  });

  if (data?.benefits && data.benefits.length > p.benefits.length) {
    for (let i = p.benefits.length; i < data.benefits.length; i++) {
      const strapiItem = data.benefits[i];
      if (strapiItem && strapiItem.text && strapiItem.text.trim() !== "") {
        benefits.push({
          text: strapiItem.text,
          iconUrl: strapiItem.icon ? getStrapiImageUrl(strapiItem.icon) : "/benefit_1.png",
          index: i + 1
        });
      }
    }
  }

  // 6. Mechanism Section
  const mechanismTitle = data?.mechanismTitle || p.mechanismTitle;
  const mechanismDiagramUrl = data?.mechanismDiagram ? getStrapiImageUrl(data.mechanismDiagram) : "/e-tax_diagram_en.jpg";

  // 7. Introduction & Build System
  const introTitle = data?.introTitle || p.introTitle;
  const introDesc = data?.introDesc || p.introDesc;

  // 8. Cost Reduction Example
  const costTitle = data?.costTitle || p.costTitle;
  const costSubtitle = data?.costSubtitle || p.costSubtitle;
  
  const costItems = p.costItems.map((defaultItem, idx) => {
    const strapiItem = data?.costItems?.[idx];
    const label = (strapiItem && strapiItem.label && strapiItem.label.trim() !== "")
      ? strapiItem.label
      : defaultItem.label;
    const price = (strapiItem && strapiItem.price && strapiItem.price.trim() !== "")
      ? strapiItem.price
      : defaultItem.price;
    return { label, price };
  });

  if (data?.costItems && data.costItems.length > p.costItems.length) {
    for (let i = p.costItems.length; i < data.costItems.length; i++) {
      const strapiItem = data.costItems[i];
      if (strapiItem && strapiItem.label && strapiItem.label.trim() !== "") {
        costItems.push({
          label: strapiItem.label,
          price: strapiItem.price || ""
        });
      }
    }
  }

  const costTotal = data?.costTotal || p.costTotal;
  const costTotalValue = data?.costTotalValue || p.costTotalValue;
  const costMonthlyLabel = data?.costMonthlyLabel || p.costMonthlyLabel;
  const costMonthlyValue = data?.costMonthlyValue || p.costMonthlyValue;
  const costMonthlyReduction = data?.costMonthlyReduction || p.costMonthlyReduction;
  const contactBtn = data?.contactBtn || p.contactBtn;

  // Check local images for Turbopack SSRF bypass
  const isLocalHeroBg = heroBgImageUrl.includes("localhost") || heroBgImageUrl.includes("127.0.0.1");
  const isLocalPainBg = painBgImageUrl.includes("localhost") || painBgImageUrl.includes("127.0.0.1");
  const isLocalEtaxIcon = definitionEtaxIconUrl.includes("localhost") || definitionEtaxIconUrl.includes("127.0.0.1");
  const isLocalSigIcon = definitionSigIconUrl.includes("localhost") || definitionSigIconUrl.includes("127.0.0.1");
  const isLocalDiagram = mechanismDiagramUrl.includes("localhost") || mechanismDiagramUrl.includes("127.0.0.1");

  return (
    <div className="bg-white min-h-screen font-sans flex flex-col">
      <PageTitle title={p.metaTitle} />

      {/* --- ส่วนที่ 1: Hero Section --- */}
      <section className="relative h-[350px] sm:h-[450px] md:h-[500px] lg:h-[650px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBgImageUrl}
            alt="E-Tax Invoice & E-Receipt Background"
            fill
            sizes="100vw"
            quality={65}
            className="object-cover"
            priority
            unoptimized={isLocalHeroBg}
          />
          <div className="absolute inset-0 bg-slate-900/40" />
        </div>

        <div className="relative z-10 text-center px-5 sm:px-6">
          <Reveal>
            <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-2xl">
              {heroTitle}
            </h1>

            <button
              onClick={scrollToContent}
              className="mt-10 sm:mt-16 group relative inline-flex items-center justify-center"
            >
              <div className="absolute h-12 w-12 sm:h-14 sm:w-14 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-all group-hover:bg-white/20" />
              <ChevronDown className="relative h-6 w-6 sm:h-7 sm:w-7 text-white animate-bounce" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* --- ส่วนที่ 2: Pain Points --- */}
      <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-white">
        <Container>
          <div className="text-center mb-10 sm:mb-16">
            <Reveal>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 tracking-tight px-2 sm:px-4">
                {painHeading}
              </h2>
              <div className="mt-4 sm:mt-6 mx-auto h-1 w-16 sm:w-20 rounded-full bg-sky-500" />
            </Reveal>
          </div>

          <div className="relative mx-auto max-w-5xl px-0 sm:px-4">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl sm:rounded-[3rem] shadow-xl sm:shadow-2xl border border-slate-200">
                <div className="absolute inset-0 z-0">
                  <Image
                    src={painBgImageUrl}
                    alt="Background paperwork"
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    quality={60}
                    loading="lazy"
                    className="object-cover"
                    unoptimized={isLocalPainBg}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-900/50 sm:to-transparent" />
                </div>

                <div className="relative z-10 px-5 py-10 sm:px-12 sm:py-16 md:px-20 md:py-20">
                  <div className="space-y-5 sm:space-y-8 max-w-2xl">
                    {painItems.map((item, idx) => (
                      <Reveal key={`pain-${idx}`} delay={idx * 0.1} x={-20}>
                        <div className="flex items-start gap-3 sm:gap-5 group">
                          <div className="mt-1.5 sm:mt-2 h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0 rounded-full bg-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.8)] transition-transform group-hover:scale-125" />
                          <p className="text-base sm:text-xl md:text-2xl font-semibold text-white leading-snug drop-shadow-md">
                            {item}
                          </p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* --- ส่วนที่ 3: About Section --- */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <Container>
          <Reveal>
            <div className="text-center max-w-4xl mx-auto px-2">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                {aboutTitle}
              </h2>
              <div className="mt-3 sm:mt-4 mx-auto h-0.5 w-32 sm:w-48 bg-slate-400" />
              <p className="mt-6 sm:mt-8 text-slate-500 text-sm md:text-base leading-relaxed">
                {aboutDesc}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* --- ส่วนที่ 4: Definition Cards --- */}
      <section className="py-12 sm:py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:gap-8 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl sm:rounded-[2rem] bg-sky-50 p-6 sm:p-8 shadow-sm border border-sky-100">
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 pr-3">{definitionEtaxTitle}</h3>
                  <div className="bg-rose-100 p-1.5 sm:p-2 rounded-lg shrink-0 w-[40px] h-[40px] relative">
                    <Image src={definitionEtaxIconUrl} fill sizes="40px" alt="e-Tax Icon" loading="lazy" className="object-contain p-1" unoptimized={isLocalEtaxIcon} />
                  </div>
                </div>
                <div className="h-px w-full bg-slate-300 mb-4 sm:mb-6" />
                <p className="text-slate-500 text-sm leading-relaxed">
                  {definitionEtaxDesc}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl sm:rounded-[2rem] bg-sky-50 p-6 sm:p-8 shadow-sm border border-sky-100">
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 pr-3">{definitionSigTitle}</h3>
                  <div className="bg-amber-100 p-1.5 sm:p-2 rounded-lg shrink-0 w-[40px] h-[40px] relative">
                    <Image src={definitionSigIconUrl} fill sizes="40px" alt="Signature Icon" loading="lazy" className="object-contain p-1" unoptimized={isLocalSigIcon} />
                  </div>
                </div>
                <div className="h-px w-full bg-slate-300 mb-4 sm:mb-6" />
                <p className="text-slate-500 text-sm leading-relaxed">
                  {definitionSigDesc}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* --- ส่วนที่ 5: Benefits Section --- */}
      <section className="py-10 sm:py-12 bg-white">
        <Container>
          <div className="text-center mb-8 sm:mb-10">
            <Reveal>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-600">{benefitsTitle}</h2>
              <div className="mt-3 sm:mt-4 mx-auto h-px w-32 sm:w-48 bg-slate-400" />
            </Reveal>
          </div>

          <div className="relative rounded-2xl sm:rounded-[3rem] border border-white/50 bg-slate-100/30 p-3 sm:p-4 shadow-xl backdrop-blur-md overflow-hidden">
            <div className="absolute -left-10 -bottom-10 h-32 w-32 bg-amber-200/20 blur-3xl rounded-full" />
            <div className="absolute -right-10 -top-10 h-32 w-32 bg-sky-200/20 blur-3xl rounded-full" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative z-10">
              {benefits.map((benefit, idx) => {
                const isLocalBenIcon = benefit.iconUrl.includes("localhost") || benefit.iconUrl.includes("127.0.0.1");
                return (
                  <Reveal key={`benefit-${idx}`} delay={idx * 0.05}>
                    <div className="bg-white rounded-2xl sm:rounded-[2rem] p-5 sm:p-6 shadow-md h-full flex flex-col border border-slate-100">
                      <div className="flex justify-between items-center mb-3 sm:mb-4">
                        <span className="text-slate-300 font-bold text-lg">{benefit.index}</span>
                        <div className="w-[28px] h-[28px] relative shrink-0">
                          <Image src={benefit.iconUrl} fill sizes="28px" alt="benefit icon" loading="lazy" className="object-contain" unoptimized={isLocalBenIcon} />
                        </div>
                      </div>
                      <div className="h-px w-full bg-slate-100 mb-3 sm:mb-4" />
                      <p className="text-[12px] sm:text-[13px] leading-relaxed text-slate-500 font-medium">
                        {benefit.text}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* --- ส่วนที่ 6: Mechanism Section --- */}
      <section className="py-14 sm:py-20 bg-white">
        <Container>
          <div className="text-center mb-8 sm:mb-12">
            <Reveal>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">{mechanismTitle}</h2>
              <div className="mt-3 sm:mt-4 mx-auto h-px w-40 sm:w-56 bg-slate-400" />
            </Reveal>
          </div>
          <Reveal>
            <div className="mx-auto max-w-5xl rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-xl sm:shadow-2xl border border-slate-200 bg-white p-2 sm:p-4 text-center">
              <Image
                src={mechanismDiagramUrl}
                alt="Mechanism Diagram"
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, 80vw"
                loading="lazy"
                className="inline-block object-contain w-full h-auto"
                unoptimized={isLocalDiagram}
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* --- ส่วนที่ 7: Introduction & Build System --- */}
      <section className="py-12 sm:py-16 bg-white">
        <Container>
          <div className="relative mx-auto max-w-5xl">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl sm:rounded-[3rem] border border-slate-200 p-1 shadow-xl sm:shadow-2xl">
                <div className="absolute inset-0 z-0 opacity-10">
                  <Image src={heroBgImageUrl} alt="background" fill sizes="80vw" quality={30} loading="lazy" className="object-cover" unoptimized={isLocalHeroBg} />
                </div>
                <div className="relative z-10 px-5 py-10 sm:px-12 sm:py-14 md:px-16 text-center bg-white/95 rounded-2xl sm:rounded-[2.9rem]">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
                    {introTitle}
                  </h2>
                  <div className="mt-4 sm:mt-6 mx-auto h-px w-32 sm:w-48 bg-slate-400" />
                  <p className="mt-6 sm:mt-8 text-slate-600 text-sm md:text-base leading-relaxed max-w-4xl mx-auto">
                    {introDesc}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* --- ส่วนที่ 8: Cost Reduction Example --- */}
      <section className="py-12 sm:py-16 bg-white flex-grow">
        <Container>
          <div className="text-center mb-8 sm:mb-12">
            <Reveal>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-700">{costTitle}</h2>
              <div className="mt-3 sm:mt-4 mx-auto h-px w-40 sm:w-56 bg-slate-400" />
            </Reveal>
          </div>

          <Reveal>
            <div className="mx-auto max-w-3xl rounded-2xl sm:rounded-[2.5rem] border border-slate-200 bg-white p-6 sm:p-8 md:p-12 shadow-lg">
              <h3 className="text-center text-slate-600 font-bold mb-6 sm:mb-10 text-base sm:text-lg">{costSubtitle}</h3>
              <div className="space-y-4 sm:space-y-6 max-w-md mx-auto">
                {costItems.map((item, idx) => (
                  <div key={`cost-${idx}`} className="flex justify-between items-center text-slate-600 border-b border-slate-100 pb-2 text-sm sm:text-base">
                    <span className="font-medium">{item.label} :</span>
                    <span className="font-bold">{item.price}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center text-slate-800 pt-3 sm:pt-4">
                  <span className="text-lg sm:text-xl font-black uppercase">{costTotal}</span>
                  <span className="text-lg sm:text-xl font-black">{costTotalValue}</span>
                </div>
              </div>

              <div className="mt-8 sm:mt-12 text-center">
                <p className="text-slate-500 text-sm italic font-medium">{costMonthlyLabel}</p>
                <div className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl font-black text-rose-500">
                  {costMonthlyValue}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 sm:mt-10 text-center">
              <h4 className="text-xl sm:text-2xl md:text-4xl font-black text-rose-600 tracking-tight">
                {costMonthlyReduction}
              </h4>
            </div>
          </Reveal>

          <div className="mt-10 sm:mt-16 flex justify-center sm:justify-end">
            <Reveal>
              <Link href="/contact">
                <button className="bg-red-600 text-white px-8 sm:px-10 py-3 rounded-full font-bold text-sm uppercase tracking-widest shadow-lg transition-all hover:bg-red-700 hover:scale-105 active:scale-95 w-full sm:w-auto">
                  {contactBtn}
                </button>
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
}
