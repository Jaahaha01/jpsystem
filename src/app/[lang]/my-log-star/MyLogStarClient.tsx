"use client";

import type { Dictionary } from "@/i18n/dictionaries";
import { useParams } from "next/navigation";

import { SiteImage as Image } from "@/components/SiteImage";
import { type ReactNode, useState } from "react";
import { Container } from "@/components/Container";
import { PageTitle } from "@/components/PageTitle";
import { Reveal } from "@/components/Reveal";
import { LazyYouTube } from "@/components/LazyYouTube";
import { MyLogStarData, getStrapiImageUrl } from "@/lib/strapi";

function Chip({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold tracking-wide text-slate-700">
      {children}
    </span>
  );
}

function FeatureCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
      <div className="text-sm font-bold tracking-tight text-slate-900">{title}</div>
      <div className="mt-3 sm:mt-4 text-sm leading-6 sm:leading-7 text-slate-600">{children}</div>
    </div>
  );
}

function AccordionItem({
  title,
  isOpen,
  onToggle,
  children,
  imageSrc,
  imageAlt,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
}) {
  const isLocalAccImg = !!(imageSrc && (imageSrc.includes("localhost") || imageSrc.includes("127.0.0.1")));

  return (
    <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-100 bg-white shadow-[0_16px_56px_rgba(15,23,42,0.06)]">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 sm:gap-4 px-4 py-4 sm:px-6 sm:py-5 text-left text-base sm:text-lg font-semibold text-slate-900 transition-colors hover:bg-slate-50"
        onClick={onToggle}
      >
        <span>{title}</span>
        <span className="text-slate-500 shrink-0">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="border-t border-slate-100 px-4 py-4 sm:px-6 sm:py-5 bg-white">
          <div className="text-sm leading-6 sm:leading-7 text-slate-600 whitespace-pre-line">{children}</div>
          {imageSrc && (
            <div className="mt-6">
              <div className="relative overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                <Image
                  src={imageSrc}
                  alt={imageAlt || title}
                  width={1200}
                  height={720}
                  sizes="(max-width: 1024px) 90vw, 70vw"
                  priority
                  className="h-auto w-full object-cover"
                  unoptimized={isLocalAccImg}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function MyLogStarClient({ data, dict }: { data: MyLogStarData | null; dict: Dictionary }) {
  const params = useParams();
  const lang = params.lang as string;
    const p = dict.pages.myLogStar;
  const [openSection, setOpenSection] = useState("log-management");

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? "" : id);
  };

  // Fallbacks & Merge Logic

  // 1. Hero
  const heroTitle = data?.heroTitle || p.heroTitle;
  const heroDesc = data?.heroDesc || p.heroDesc;

  // 2. Media & Visuals
  const youtubeVideoId = data?.youtubeVideoId || "R8GhVnNnbV8";
  const mediaImage1Url = data?.mediaImage1 ? getStrapiImageUrl(data.mediaImage1) : "/logstar.png";
  const mediaImage2Url = data?.mediaImage2 ? getStrapiImageUrl(data.mediaImage2) : "/mylogstar.png";

  // 3. Feature Card
  const featureTitle = data?.featureTitle || p.featureTitle;
  const featureLogCollectionTitle = data?.featureLogCollectionTitle || p.featureLogCollectionTitle;
  const featureLogCollectionDesc = data?.featureLogCollectionDesc || p.featureLogCollectionDesc;
  const featureLogAvailabilityTitle = data?.featureLogAvailabilityTitle || p.featureLogAvailabilityTitle;
  const featureLogAvailabilityDesc = data?.featureLogAvailabilityDesc || p.featureLogAvailabilityDesc;

  // 4. Accordion merging
  const dictAccordion = (p as any).accordion as Array<{ id: string; title: string; content: string }> | undefined;

  const defaultAccordion = dictAccordion ?? [
    {
      id: "log-management",
      title: "What is log management?",
      content: "When you use a personal computer, information such as what software you used and which file you opened is recorded on your computer. Also, when you visit a website using the Internet, you can keep a record of which page you visited on what day of the month. In addition, special systems can be used to collect more detailed information. The personal computer usage history collected in this way is called a \"log\". The log contains a great deal of information, and a closer look reveals who, when, and what they were doing on their computer."
    },
    {
      id: "log-collection",
      title: "Log collection power",
      content: "When managing logs, if the necessary logs cannot be collected, they cannot be saved or analyzed as a trail. MylogStar acquires logs at the kernel level of the OS, and can grasp operations that cannot be acquired by other log management products. Since highly accurate logs can be acquired, it can be effectively used for information leakage countermeasures and business improvement. When you use a personal computer, information such as what software you used and which file you opened is recorded on your computer. Also, when you visit a website using the Internet, you can keep a record of which page you visited on what day of the month. In addition, special systems can be used to collect more detailed information. The personal computer usage history collected in this way is called a \"log\". The log contains a great deal of information, and a closer look reveals who, when, and what they were doing on their computer.\n\nLog collection power\nI don't know when to use the collected logs. If you suspect an information leak, you may want to check the logs over the last few years. This log is meaningless unless it is available. MylogStar is a dedicated software for managing client operation logs, and provides user-friendly operation management that makes use of many years of experience.\n\nLog management to Support telework\nFrom security measures to business improvement with MylogStar"
    },
    {
      id: "fileserver",
      title: "My log Star FileServer",
      content: "Pinpoint monitoring of important servers Low price & high functionality! File server access log / audit log management\n\nLog monitoring is indispensable for measures against information leakage. However, for companies that own a huge number of servers or small and medium-sized companies that cannot devote a lot of resources to system management, it will be difficult to implement it on all systems. MylogStar FileServer monitors data input / output and user operations within the file server by narrowing down the monitoring target to the file server where confidential information is stored and installing it directly on the monitored server. It is a file server access log management software that maintains security. MylogStar FileServer also makes it possible to acquire audit logs. Audit logs are a record of operations performed by system administrators and users. The operation contents in the server are recorded as an audit log in chronological order and continuously (when, who, what did). There is no need to prepare a separate management server, and there is no need to install an agent on the PC, so log management is easy and inexpensive."
    },
    {
      id: "desktop",
      title: "My log star Desktop",
      content: "My log Star Desktop — \"Log management\" & \"device control\" that can be done immediately on a stand-alone PC or a small base\nMylogStar Desktop is log management and device control software that is ideal for environments with a small number of target PCs, such as PCs that cannot connect to the network and small bases. No management server is required, and it can be easily installed by simply installing it on the target PC. With the industry's top class log collection power, operation logs in the target PC can be uprooted and managed as a trail. In addition, the device control function controls the export of confidential data.\n\nLog management\nMylogStar Desktop — With the industry's top class log collection power, you can uproot the operation log in the target PC and keep it as a trail. The most worrisome thing about leaks from standalone PCs and mobile PCs is the removable disk. MylogStar Desktop records all file operations performed on local disks, network drives, etc., including removable disks. In addition, it also has a trace function, so even if a cover-up is performed by unauthorized operation, it can be identified immediately. With the screen snapshot function, you can also capture the screen when a specified event occurs.\n\nMylogStar 4 Standalone Manager\nMylogStar 4 Standalone Manager is MylogStar 4 — Logs of several machines on which Desktop is installed can be centrally collected, managed and viewed. In addition, MylogStar 4 Standalone including alert function and report function. There are also functions and operations that can be enhanced by using Manager.\n\n※ SQL Server is required to use Standalone Manager.\n※ The English version of MylogStar 4 Standalone Manager is a product to be developed, so we will let you know when it will be available.\n\nEasy-to-understand and simple management console\nThe management console of MylogStar Desktop is a simple and easy-to-understand management console so that even personnel who are not familiar with IT can easily check the logs.\n\nDevice control\nMylogStar Desktop's Access Control Option not only prohibits the use of USB devices uniformly, but also allows you to set detailed security policies such as allow, prohibit, and read-only when using USB storage. In addition, by using the \"USB whitelist\" function, it is possible to give permission to use only a specific USB storage based on the vendor ID, product ID, and serial number given to the USB storage. As a result, it is possible to enhance security by taking advantage of the convenience of USB storage without impairing business efficiency."
    }
  ];
  
  
  const accordion = defaultAccordion.map((defaultSec, idx) => {
    const strapiSec = data?.accordionItems?.[idx];
    const title = (strapiSec && strapiSec.title && strapiSec.title.trim() !== "")
      ? strapiSec.title
      : defaultSec.title;
    const content = (strapiSec && strapiSec.content && strapiSec.content.trim() !== "")
      ? strapiSec.content
      : defaultSec.content;
    
    const defaultImage = defaultSec.id === "fileserver" ? "/fileserver.png" : defaultSec.id === "desktop" ? "/desktop.jpg" : undefined;
    const imageSrc = (strapiSec && strapiSec.image)
      ? getStrapiImageUrl(strapiSec.image)
      : defaultImage;
    
    return {
      id: defaultSec.id,
      title,
      content,
      imageSrc
    };
  });

  if (data?.accordionItems && data.accordionItems.length > defaultAccordion.length) {
    for (let i = defaultAccordion.length; i < data.accordionItems.length; i++) {
      const strapiSec = data.accordionItems[i];
      if (strapiSec && strapiSec.title && strapiSec.title.trim() !== "") {
        accordion.push({
          id: strapiSec.sectionId || `section-${i}`,
          title: strapiSec.title,
          content: strapiSec.content || "",
          imageSrc: strapiSec.image ? getStrapiImageUrl(strapiSec.image) : undefined
        });
      }
    }
  }

  // SSRF bypass checks
  const isLocalImg1 = mediaImage1Url.includes("localhost") || mediaImage1Url.includes("127.0.0.1");
  const isLocalImg2 = mediaImage2Url.includes("localhost") || mediaImage2Url.includes("127.0.0.1");

  return (
    <div className="py-10 sm:py-14 md:py-16 bg-sky-50 min-h-screen">
      <PageTitle title={p.metaTitle} />
      <Container>
        <Reveal>
          <div className="max-w-3xl">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              {heroTitle}
            </h1>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-6 sm:leading-7 text-slate-600">
              {heroDesc}
            </p>
          </div>
        </Reveal>

        <div className="mt-6 sm:mt-10 grid gap-5 sm:gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <div className="space-y-5 sm:space-y-6">
              {/* ส่วนวิดีโอ */}
              <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-4 sm:p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
                <LazyYouTube videoId={youtubeVideoId} title="My Log Star Overview" />
              </div>
              {/* รูปภาพประกอบ 1 */}
              <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-4 sm:p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
                <div className="relative overflow-hidden rounded-xl sm:rounded-3xl border border-slate-100 bg-slate-50">
                  <Image
                    src={mediaImage1Url}
                    alt="LogStar"
                    width={1200}
                    height={720}
                    sizes="(max-width: 1024px) 90vw, 55vw"
                    loading="lazy"
                    className="h-auto w-full object-cover"
                    unoptimized={isLocalImg1}
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="space-y-5 sm:space-y-6">
              {/* รูปภาพประกอบ 2 */}
              <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-4 sm:p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
                <div className="relative overflow-hidden rounded-xl sm:rounded-3xl border border-slate-100 bg-slate-50">
                  <Image
                    src={mediaImage2Url}
                    alt="MylogStar"
                    width={1200}
                    height={720}
                    sizes="(max-width: 1024px) 90vw, 35vw"
                    loading="lazy"
                    className="h-auto w-full object-cover"
                    unoptimized={isLocalImg2}
                  />
                </div>
              </div>
              {/* การ์ดฟีเจอร์ */}
              <FeatureCard title={featureTitle}>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <div className="font-semibold text-slate-900">{featureLogCollectionTitle}</div>
                    <div className="mt-1.5 sm:mt-2 text-sm leading-6 sm:leading-7 text-slate-600">
                      {featureLogCollectionDesc}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{featureLogAvailabilityTitle}</div>
                    <div className="mt-1.5 sm:mt-2 text-sm leading-6 sm:leading-7 text-slate-600">
                      {featureLogAvailabilityDesc}
                    </div>
                  </div>
                </div>
              </FeatureCard>
            </div>
          </Reveal>
        </div>

        {/* Accordion ส่วนรายละเอียดเพิ่มเติม */}
        <div className="mt-8 sm:mt-12 space-y-3 sm:space-y-4">
          {accordion.map((section) => (
            <AccordionItem
              key={section.id}
              title={section.title}
              isOpen={openSection === section.id}
              onToggle={() => toggleSection(section.id)}
              imageSrc={section.imageSrc}
              imageAlt={section.title}
            >
              {section.content}
            </AccordionItem>
          ))}
        </div>
      </Container>
    </div>
  );
}
