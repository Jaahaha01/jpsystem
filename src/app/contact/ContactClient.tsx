"use client";

import { useState } from "react";
import { SiteImage as Image } from "@/components/SiteImage";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { ContactData, getStrapiImageUrl } from "@/lib/strapi";
import { PageTitle } from "@/components/PageTitle";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="text-xs font-semibold tracking-wide text-slate-600">
        {label}
      </div>
      <div className="mt-2">{children}</div>
    </label>
  );
}

export default function ContactClient({ data: dataProp }: { data: { th: ContactData | null; en: ContactData | null; jp: ContactData | null } | ContactData | null }) {
  const { t, lang } = useLanguage();
  const data = (dataProp && typeof dataProp === "object" && ("en" in dataProp || "th" in dataProp || "jp" in dataProp))
    ? (dataProp as any)[lang]
    : dataProp as ContactData | null;
  const p = t.pages.contact;
  const [sent, setSent] = useState(false);

  // Fallbacks with Strapi fields
  const heroTitle = data?.heroTitle || p.title;
  const heroSubtitle = data?.heroSubtitle || p.subtitle;
  const heroBgImageUrl = data?.heroBgImage ? getStrapiImageUrl(data.heroBgImage) : "/imcontact.jpg";

  const formTitle = data?.formTitle || p.form.title;
  const formCompanyName = data?.formCompanyName || p.form.companyName;
  const formName = data?.formName || p.form.name;
  const formEmail = data?.formEmail || p.form.email;
  const formSubject = data?.formSubject || p.form.subject;
  const formMessage = data?.formMessage || p.form.message;
  const formNote = data?.formNote || p.form.note;

  const officeTitle = data?.officeTitle || p.office.title;
  const officeEmail = data?.officeEmail || p.office.email;
  const officePhone = data?.officePhone || p.office.phone;
  const officeAddress = data?.officeAddress || t.common.addressValue;
  
  const googleMapsUrl = data?.googleMapsUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.611116242337!2d100.56066231535492!3d13.742054290353457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ee628b031b9%3A0xc39f20106428e239!2s253%20Asoke%20Towers!5e0!3m2!1sen!2sth!4v1649999999999!5m2!1sen!2sth";

  // Check if image requires unoptimized due to localhost / 127.0.0.1 Next.js restriction
  const isLocalImage = heroBgImageUrl.includes("localhost") || heroBgImageUrl.includes("127.0.0.1");

  return (
    <div className="relative min-h-screen overflow-hidden py-10 sm:py-14 md:py-16 bg-sky-50">
      <PageTitle title={p.metaTitle} />

      {/* --- ส่วนหัว Hero Section --- */}
      <section className="relative mb-8 sm:mb-12 overflow-hidden rounded-2xl sm:rounded-[2.5rem] mx-3 sm:mx-6 md:mx-10 bg-white shadow-xl border border-slate-100">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBgImageUrl}
            alt="Contact Us Background"
            fill
            sizes="(max-width: 768px) 95vw, 90vw"
            quality={60}
            className="object-cover object-[85%_center]"
            priority
            unoptimized={isLocalImage}
          />
          <div className="absolute inset-0 bg-slate-900/40" />
        </div>

        <div className="relative z-10 px-5 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:py-24">
          <Container>
            <Reveal>
              <div className="max-w-2xl">
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl drop-shadow-2xl">
                  {heroTitle}
                </h1>
                <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-7 text-white/90 font-normal drop-shadow-lg">
                  {heroSubtitle}
                </p>
              </div>
            </Reveal>
          </Container>
        </div>
      </section>

      {/* --- ส่วนเนื้อหา Form และ Information --- */}
      <Container>
        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2">

          <Reveal>
            <div className="relative rounded-2xl sm:rounded-[2.5rem] border border-slate-100 bg-white p-5 sm:p-7 shadow-2xl shadow-sky-900/5 ring-1 ring-white/70">
              <div className="pointer-events-none absolute -inset-px rounded-2xl sm:rounded-[2.5rem] bg-gradient-to-b from-sky-500/5 to-transparent" />
              <div className="text-sm font-bold tracking-tight text-slate-900">
                {formTitle}
              </div>
              <form
                className="mt-5 sm:mt-6 space-y-3 sm:space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                  window.setTimeout(() => setSent(false), 2500);
                }}
              >
                <Field label={formCompanyName}>
                  <input
                    className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-slate-900 outline-none transition-colors focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
                    placeholder={formCompanyName}
                  />
                </Field>
                <Field label={formName}>
                  <input
                    required
                    className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-slate-900 outline-none transition-colors focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
                    placeholder={formName}
                  />
                </Field>
                <Field label={formEmail}>
                  <input
                    required
                    type="email"
                    className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-slate-900 outline-none transition-colors focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
                    placeholder={formEmail}
                  />
                </Field>
                <Field label={formSubject}>
                  <input
                    className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-slate-900 outline-none transition-colors focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
                    placeholder={formSubject}
                  />
                </Field>
                <Field label={formMessage}>
                  <textarea
                    required
                    rows={4}
                    className="w-full resize-none rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-slate-900 outline-none transition-colors focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
                    placeholder={formMessage}
                  />
                </Field>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pt-2">
                  <div className="text-xs text-slate-500">{formNote}</div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xl transition-all hover:-translate-y-1 active:scale-95"
                  >
                    {sent ? t.common.sent : t.common.send}
                  </button>
                </div>
              </form>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="space-y-5 sm:space-y-6">
              <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-5 sm:p-7 shadow-lg shadow-sky-900/5">
                <div className="text-sm font-bold tracking-tight text-slate-900">
                  {officeTitle}
                </div>
                <div className="mt-4 sm:mt-5 space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 text-sky-600 shrink-0" strokeWidth={1.8} />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold tracking-wide text-slate-500">{t.common.email}</div>
                      <a href={`mailto:${officeEmail}`} className="text-sm font-semibold text-slate-900 hover:text-sky-600 break-all">
                        {officeEmail}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 text-sky-600 shrink-0" strokeWidth={1.8} />
                    <div>
                      <div className="text-xs font-semibold tracking-wide text-slate-500">{t.common.phone}</div>
                      <a href={`tel:${officePhone}`} className="text-sm font-semibold text-slate-900 hover:text-sky-600">
                        {officePhone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 text-sky-600 shrink-0" strokeWidth={1.8} />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold tracking-wide text-slate-500">{t.common.address}</div>
                      <div className="text-sm font-semibold text-slate-900 break-words">
                        {officeAddress}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative aspect-[16/10] overflow-hidden rounded-xl sm:rounded-2xl border border-slate-100 bg-white shadow-lg shadow-sky-900/5">
                <iframe
                  title="Japan System (Thailand) Co., Ltd. Map"
                  src={googleMapsUrl}
                  className="h-full w-full transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
