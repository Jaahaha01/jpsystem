"use client";

import type { Dictionary } from "@/i18n/dictionaries";
import { useParams } from "next/navigation";

import { SiteImage as Image } from "@/components/SiteImage";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageTitle } from "@/components/PageTitle";
import { Reveal } from "@/components/Reveal";
import { LazyYouTube } from "@/components/LazyYouTube";
import { type NewReleaseData, getStrapiImageUrl } from "@/lib/strapi";

export default function NewReleaseClient({ data, dict }: { data: NewReleaseData | null; dict: Dictionary }) {
  const params = useParams();
  const lang = params.lang as string;
    const p = dict.pages.newRelease;

  // Hero Section
  const heroTitle = data?.heroTitle || p.title;
  const heroSubtitle = data?.heroSubtitle || p.subtitle;
  const heroBgImageUrl = data?.heroBgImage ? getStrapiImageUrl(data.heroBgImage) : "/topBG-new-releasesss.jpg";

  // e-Tax Section
  const eTaxHeading = data?.eTaxHeading || p.eTaxHeading;
  const taxInvoiceSubtitle = data?.taxInvoiceSubtitle || p.taxInvoiceSubtitle;
  const eTaxTopImageUrl = data?.eTaxTopImage ? getStrapiImageUrl(data.eTaxTopImage) : "/topimg-new-release.jpg";

  // Bottom Section
  const videoId = data?.videoId || "R8GhVnNnbV8";
  const botImageUrl = data?.botImage ? getStrapiImageUrl(data.botImage) : "/botimg_new-release.png";

  const newsCards = data?.newsCards || [];

  return (
    <div className="relative overflow-hidden py-10 sm:py-14 md:py-16 bg-sky-50 min-h-screen">
      <PageTitle title={p.metaTitle} />

      <Container>
        {/* --- ส่วนหัว Hero Section --- */}
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] bg-slate-900 px-5 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20 border border-slate-100 shadow-xl">
            <div className="absolute inset-0 z-0">
              <Image
                src={heroBgImageUrl}
                alt="Background visual"
                fill
                sizes="(max-width: 768px) 95vw, 90vw"
                quality={60}
                className="object-cover"
                priority
                unoptimized={heroBgImageUrl.includes("localhost") || heroBgImageUrl.includes("127.0.0.1")}
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="relative z-10 mx-auto max-w-2xl text-center text-white">
              <h1 className="text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl drop-shadow-lg">
                {heroTitle}
              </h1>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-white/80 font-normal drop-shadow-md">
                {heroSubtitle}
              </p>
            </div>
          </div>
        </Reveal>

        {/* --- ส่วน News Cards (เพิ่มใหม่) --- */}
        {newsCards.length > 0 && (
          <Reveal delay={0.05}>
            <div className="mt-10 sm:mt-14">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl mb-6 pl-2">
                Latest News
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {newsCards.slice(0, 4).map((card: any, idx: number) => {
                  const cardImgUrl = card.image ? getStrapiImageUrl(card.image) : "/topimg-new-release.jpg";
                  return (
                    <div key={card.id || idx} className="flex flex-col bg-[#171b26] rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-1">
                      <div className="relative h-44 w-full bg-slate-800">
                        <Image
                          src={cardImgUrl}
                          alt={card.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          className="object-cover"
                          unoptimized={cardImgUrl.includes("localhost") || cardImgUrl.includes("127.0.0.1")}
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="flex items-center justify-between mb-3 text-[11px] font-bold tracking-wider uppercase">
                          <span className="text-[#3b82f6]">{card.category || "NEWS"}</span>
                          <span className="text-white/50">{card.date || ""}</span>
                        </div>
                        <h3 className="text-base font-bold text-white mb-6 line-clamp-2">{card.title}</h3>
                        <div className="mt-auto flex justify-end">
                          <Link href={card.url || "#"} className="inline-flex items-center justify-center rounded bg-[#3b82f6] px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-400">
                            READ MORE →
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        )}

        {/* --- ส่วนเนื้อหา e-Tax Section --- */}
        <Reveal delay={0.06}>
          <div className="mt-6 sm:mt-10 overflow-hidden rounded-2xl sm:rounded-[2rem] border border-slate-200 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.06)]">
            <div className="border-b border-slate-200 bg-white px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10">
              <div className="flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
                    {eTaxHeading}
                  </h2>
                  <p className="mt-2 sm:mt-3 text-sm leading-6 text-slate-600">
                    {taxInvoiceSubtitle}
                  </p>
                </div>
                <div className="shrink-0">
                  <div className="aspect-[5/3] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 lg:w-56">
                    <Image
                      src={eTaxTopImageUrl}
                      alt="New release top visual"
                      width={560}
                      height={336}
                      sizes="(max-width: 1024px) 90vw, 224px"
                      quality={65}
                      loading="lazy"
                      className="h-full w-full object-cover"
                      unoptimized={eTaxTopImageUrl.includes("localhost") || eTaxTopImageUrl.includes("127.0.0.1")}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10">
              {/* ตารางคำนวณ */}
              <div className="grid gap-2 sm:gap-3 rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-6 text-sm text-slate-700 sm:text-base">
                <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[minmax(160px,1fr)_minmax(120px,auto)] gap-3 sm:gap-4 font-semibold text-slate-900">
                  <div className="text-sm sm:text-base">{p.costTable.option}</div>
                  <div className="text-right text-sm sm:text-base">{p.costTable.value}</div>
                </div>
                <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[minmax(160px,1fr)_minmax(120px,auto)] gap-3 sm:gap-4 border-t border-slate-200 pt-3 sm:pt-4">
                  <div className="text-sm sm:text-base">{p.costTable.usePaper}</div>
                  <div className="text-right text-sm sm:text-base">{p.costTable.usePaperVal}</div>
                </div>
                <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[minmax(160px,1fr)_minmax(120px,auto)] gap-3 sm:gap-4 border-t border-slate-200 pt-3 sm:pt-4">
                  <div className="text-sm sm:text-base">{p.costTable.printingFee}</div>
                  <div className="text-right text-sm sm:text-base">{p.costTable.printingFeeVal}</div>
                </div>
                <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[minmax(160px,1fr)_minmax(120px,auto)] gap-3 sm:gap-4 border-t border-slate-200 pt-3 sm:pt-4">
                  <div className="text-sm sm:text-base">{p.costTable.storageMaterial}</div>
                  <div className="text-right text-sm sm:text-base">{p.costTable.storageMaterialVal}</div>
                </div>
                <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[minmax(160px,1fr)_minmax(120px,auto)] gap-3 sm:gap-4 border-t border-slate-200 pt-3 sm:pt-4">
                  <div className="text-sm sm:text-base">{p.costTable.deliveryFee}</div>
                  <div className="text-right text-sm sm:text-base">{p.costTable.deliveryFeeVal}</div>
                </div>
                <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[minmax(160px,1fr)_minmax(120px,auto)] gap-3 sm:gap-4 border-t border-slate-200 pt-3 sm:pt-4">
                  <div className="font-semibold text-red-600 text-sm sm:text-base">{p.costTable.total}</div>
                  <div className="text-right font-semibold text-red-600 text-sm sm:text-base">{p.costTable.totalVal}</div>
                </div>
              </div>

              {/* ส่วนสรุปรายเดือน */}
              <div className="mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-[0_16px_36px_rgba(15,23,42,0.06)] text-sm text-slate-700 sm:text-base">
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <div className="grid h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 place-items-center rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 text-slate-900">
                    <span className="text-base sm:text-lg font-bold">£</span>
                  </div>
                  <div className="min-w-0 w-full">
                    <div className="font-semibold text-slate-900">
                      {p.monthlyCostLabel}
                    </div>
                    <div className="mt-2 sm:mt-3 text-sm sm:text-base font-bold leading-6 text-red-600">
                      {p.monthlyCostValue}
                    </div>
                    <div className="mt-1 sm:mt-2 text-xs sm:text-sm font-semibold leading-6 text-red-600">
                      {p.monthlyCostReduction}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 flex justify-center sm:justify-end">
                <Link
                  href="/e-tax"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 active:scale-95"
                >
                  {dict.common.readMore}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* --- ส่วนวิดีโอและรูปภาพด้านล่าง --- */}
        <div className="mt-6 sm:mt-10 grid gap-5 sm:gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <Reveal delay={0.08}>
            <div className="rounded-2xl sm:rounded-[1.75rem] border border-slate-200 bg-white p-4 sm:p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <LazyYouTube videoId={videoId} title="My Log Star video" />
            </div>
          </Reveal>

          <Reveal>
            <div className="relative rounded-2xl sm:rounded-[1.75rem] border border-slate-200 bg-white p-4 sm:p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] flex flex-col h-full">
              <div className="overflow-hidden rounded-xl sm:rounded-3xl border border-slate-200 bg-slate-50">
                <Image
                  src={botImageUrl}
                  alt="Bottom new release visual"
                  width={1200}
                  height={720}
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  loading="lazy"
                  className="h-full w-full object-cover"
                  unoptimized={botImageUrl.includes("localhost") || botImageUrl.includes("127.0.0.1")}
                />
              </div>

              <div className="mt-4 sm:mt-6 flex justify-center sm:justify-end">
                <Link
                  href="/my-log-star"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-slate-900 px-5 sm:px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-slate-800 hover:-translate-y-1 active:scale-95"
                >
                  {dict.common.readMore}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
