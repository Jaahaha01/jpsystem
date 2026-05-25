/**
 * Strapi CMS API client
 * Fetches blog posts from Strapi v4/v5 REST API
 * Deployed Strapi URL: https://sublime-ducks-443367ee0e.strapiapp.com/
 *
 * Set STRAPI_URL in .env.local or your hosting environment to override.
 * NOTE: Use STRAPI_URL (not NEXT_PUBLIC_STRAPI_URL) for server-side only fetching
 *       to avoid exposing the URL to the browser bundle.
 */

import { cache } from "react";

const STRAPI_URL =
  process.env.STRAPI_URL || "https://sublime-ducks-443367ee0e.strapiapp.com";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

import type { StrapiImage, StrapiImageFormat, StrapiCategory, BlogPost, HomepageData, NewsCard, NewReleaseData, CompanyData, ContactData, ItServiceItem, ItFeatureItem, ItSystemData, ETaxPainItem, ETaxBenefitItem, ETaxCostItem, ETaxData, MarketingSocialIcon, MarketingData, MyLogStarAccordionItem, MyLogStarData } from '@/types/strapi';
export type { StrapiImage, StrapiImageFormat, StrapiCategory, BlogPost, HomepageData, NewsCard, NewReleaseData, CompanyData, ContactData, ItServiceItem, ItFeatureItem, ItSystemData, ETaxPainItem, ETaxBenefitItem, ETaxCostItem, ETaxData, MarketingSocialIcon, MarketingData, MyLogStarAccordionItem, MyLogStarData };

/* ── Internal helpers ───────────────────────────────── */

/**
 * useAuth=false  → public endpoints (blog, homepage, categories, etc.)
 * useAuth=true   → protected endpoints that require a token
 */
function buildHeaders(useAuth = false): HeadersInit {
  const h: HeadersInit = { "Content-Type": "application/json" };
  if (useAuth && STRAPI_TOKEN) h["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
  return h;
}

/** Normalise Strapi v4 `{ data: { id, attributes } }` → flat object */
function flattenV4<T>(raw: {
  id: number;
  attributes: Record<string, unknown>;
}): T {
  return { id: raw.id, ...raw.attributes } as T;
}

/** Resolve full URL for Strapi-hosted images */
export function getStrapiImageUrl(img: StrapiImage | null): string {
  if (!img) return "";
  const url = img.url;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

/* ── Image populate helper ──────────────────────────── */

/**
 * Builds populate params for an image field.
 * Omits `formats` by default — only request it when you actually need
 * thumbnail/small/medium/large variants to keep response payloads small.
 */
function imgPopulate(field: string, includeFormats = false): string {
  const base = [
    `populate[${field}][fields][0]=url`,
    `populate[${field}][fields][1]=alternativeText`,
    `populate[${field}][fields][2]=width`,
    `populate[${field}][fields][3]=height`,
  ];
  if (includeFormats) base.push(`populate[${field}][fields][4]=formats`);
  return base.join("&");
}

/* ── POPULATE strings ───────────────────────────────── */

// Blog posts: keep formats so components can pick the right size
const BLOG_POPULATE =
  `${imgPopulate("img", true)}` +
  "&populate[categories][fields][0]=name" +
  "&populate[categories][fields][1]=slug" +
  "&populate[categories][fields][2]=color";

/* ── API calls ──────────────────────────────────────── */

/**
 * Fetch paginated list of blog posts.
 * Wrapped in React `cache()` so multiple Server Components calling this
 * within the same render deduplicate to a single network request.
 */
export const getBlogPosts = cache(async (
  page = 1,
  limit = 9,
  cateSlug?: string
): Promise<{ posts: BlogPost[]; total: number; pageCount: number }> => {
  const filters = cateSlug
    ? `&filters[categories][slug][$eq]=${encodeURIComponent(cateSlug)}`
    : "";

  const url = `${STRAPI_URL}/api/blog-posts?${BLOG_POPULATE}&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${limit}${filters}`;

  try {
    const res = await fetch(url, {
      headers: buildHeaders(false), // public endpoint
      next: { tags: ["blog"] },
    });

    if (!res.ok) throw new Error(`Strapi ${res.status}: ${res.statusText}`);

    const json = await res.json();
    const isV4 = json.data?.[0] && "attributes" in (json.data[0] ?? {});

    const posts: BlogPost[] = (json.data ?? []).map(
      (item: Record<string, unknown>) => {
        const mapped = isV4
          ? flattenV4<any>(item as { id: number; attributes: Record<string, unknown> })
          : (item as any);

        if (mapped.categories && Array.isArray(mapped.categories) && mapped.categories.length > 0) {
          mapped.cate = mapped.categories[0];
        } else if (mapped.categories && !Array.isArray(mapped.categories)) {
          mapped.cate = mapped.categories;
        }

        return mapped as BlogPost;
      }
    );

    return {
      posts,
      total: json.meta?.pagination?.total ?? posts.length,
      pageCount: json.meta?.pagination?.pageCount ?? 1,
    };
  } catch (err) {
    console.error("[Strapi] getBlogPosts failed:", err);
    return { posts: [], total: 0, pageCount: 0 };
  }
});

/**
 * Fetch a single blog post by slug.
 * Uses slug filter on the collection (compatible with both v4 and v5).
 * If you migrate fully to Strapi v5, prefer fetching by documentId directly:
 *   /api/blog-posts/:documentId
 */
export const getBlogPost = cache(async (slug: string): Promise<BlogPost | null> => {
  const url = `${STRAPI_URL}/api/blog-posts?${BLOG_POPULATE}&filters[slug][$eq]=${encodeURIComponent(slug)}&pagination[pageSize]=1`;

  try {
    const res = await fetch(url, {
      headers: buildHeaders(false), // public endpoint
      next: { tags: ["blog", slug] },
    });

    if (!res.ok) throw new Error(`Strapi ${res.status}: ${res.statusText}`);

    const json = await res.json();
    const raw = json.data?.[0];
    if (!raw) return null;

    const isV4 = "attributes" in (raw ?? {});
    const mapped = isV4
      ? flattenV4<any>(raw as { id: number; attributes: Record<string, unknown> })
      : (raw as any);

    if (mapped.categories && Array.isArray(mapped.categories) && mapped.categories.length > 0) {
      mapped.cate = mapped.categories[0];
    } else if (mapped.categories && !Array.isArray(mapped.categories)) {
      mapped.cate = mapped.categories;
    }

    return mapped as BlogPost;
  } catch (err) {
    console.error("[Strapi] getBlogPost failed:", err);
    return null;
  }
});

/** Fetch all categories */
export const getBlogCategories = cache(async (): Promise<StrapiCategory[]> => {
  const url = `${STRAPI_URL}/api/categories?fields[0]=name&fields[1]=slug&fields[2]=color&sort=name:asc`;

  try {
    const res = await fetch(url, {
      headers: buildHeaders(false), // public endpoint
      next: { tags: ["category"] },
    });

    if (!res.ok) return [];

    const json = await res.json();
    const isV4 = json.data?.[0] && "attributes" in (json.data[0] ?? {});

    return (json.data ?? []).map((item: Record<string, unknown>) =>
      isV4
        ? flattenV4<StrapiCategory>(item as { id: number; attributes: Record<string, unknown> })
        : (item as StrapiCategory)
    );
  } catch {
    return [];
  }
});

/** Fetch Homepage Content */
export const getHomepageData = cache(async (locale?: string): Promise<HomepageData | null> => {
  const localeQuery = locale ? `&locale=${locale}` : "";
  const url =
    `${STRAPI_URL}/api/homepage` +
    `?${imgPopulate("heroBgImage")}` +
    `&populate[serviceItems][populate][icon][fields][0]=url` +
    `&populate[serviceItems][populate][icon][fields][1]=alternativeText` +
    `&populate[serviceItems][populate][icon][fields][2]=width` +
    `&populate[serviceItems][populate][icon][fields][3]=height` +
    localeQuery;

  try {
    const res = await fetch(url, {
      headers: buildHeaders(false), // public endpoint
      next: { tags: ["homepage", locale || "th"] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const raw = json.data;
    if (!raw) return null;

    const isV4 = "attributes" in (raw ?? {});
    const mapped = isV4
      ? flattenV4<any>(raw as { id: number; attributes: Record<string, unknown> })
      : (raw as any);

    return {
      heroTitle: mapped.heroTitle,
      heroSubtitle: mapped.heroSubtitle,
      heroCtaPrimary: mapped.heroCtaPrimary,
      heroBgImage: mapped.heroBgImage,
      servicesTitle: mapped.servicesTitle,
      serviceItems: (mapped.serviceItems || []).map((it: any) => ({
        id: it.id,
        title: it.Title || it.title || "",
        desc: it.desc || "",
        url: it.url || "",
        icon: it.icon || null,
      })),
    };
  } catch (err) {
    console.error("[Strapi] getHomepageData failed:", err);
    return null;
  }
});

/** Fetch New Release Content */
export const getNewReleaseData = cache(async (locale?: string): Promise<NewReleaseData | null> => {
  const localeQuery = locale ? `&locale=${locale}` : "";
  const url =
    `${STRAPI_URL}/api/new-release` +
    `?${imgPopulate("heroBgImage")}` +
    `&${imgPopulate("eTaxTopImage")}` +
    `&${imgPopulate("botImage")}` +
    `&populate[newsCards][populate][image][fields][0]=url` +
    `&populate[newsCards][populate][image][fields][1]=alternativeText` +
    `&populate[newsCards][populate][image][fields][2]=width` +
    `&populate[newsCards][populate][image][fields][3]=height` +
    localeQuery;

  try {
    const res = await fetch(url, {
      headers: buildHeaders(false), // public endpoint
      next: { tags: ["new-release", locale || "th"] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const raw = json.data;
    if (!raw) return null;

    const isV4 = "attributes" in (raw ?? {});
    const mapped = isV4 ? flattenV4<any>(raw) : (raw as any);

    return {
      heroTitle: mapped.heroTitle,
      heroSubtitle: mapped.heroSubtitle,
      heroBgImage: mapped.heroBgImage,
      eTaxHeading: mapped.eTaxHeading,
      taxInvoiceSubtitle: mapped.taxInvoiceSubtitle,
      eTaxTopImage: mapped.eTaxTopImage,
      videoId: mapped.videoId,
      botImage: mapped.botImage,
      newsCards: (mapped.newsCards || []).map((it: any) => ({
        id: it.id,
        title: it.Title || it.title || "",
        category: it.category || "NEWS",
        date: it.date || "",
        url: it.url || "#",
        image: it.image || null,
      })),
    };
  } catch (err) {
    console.error("[Strapi] getNewReleaseData failed:", err);
    return null;
  }
});

/** Fetch Company Profile Content */
export const getCompanyData = cache(async (locale?: string): Promise<CompanyData | null> => {
  const localeQuery = locale ? `&locale=${locale}` : "";
  const url =
    `${STRAPI_URL}/api/company` +
    `?${imgPopulate("heroBgImage")}` +
    `&${imgPopulate("aboutImage")}` +
    localeQuery;

  try {
    const res = await fetch(url, {
      headers: buildHeaders(false), // public endpoint
      next: { tags: ["company", locale || "th"] }, // company info rarely changes
    });

    if (!res.ok) return null;

    const json = await res.json();
    const raw = json.data;
    if (!raw) return null;

    const isV4 = "attributes" in (raw ?? {});
    const mapped = isV4 ? flattenV4<any>(raw) : (raw as any);

    return {
      heroTitle: mapped.heroTitle,
      heroSubtitle: mapped.heroSubtitle,
      heroBgImage: mapped.heroBgImage,
      aboutTitle: mapped.aboutTitle,
      aboutBody: mapped.aboutBody,
      aboutImage: mapped.aboutImage,
      infoTitle: mapped.infoTitle,
      infoCompanyName: mapped.infoCompanyName || mapped.InfoCompanyName || "",
      infoAddress: mapped.infoAddress || mapped.InfoAddress || "",
      infoEstablishment: mapped.infoEstablishment || mapped.InfoEstablishment || "",
      infoCapital: mapped.infoCapital || mapped.InfoCapital || "",
      infoRepresentative: mapped.infoRepresentative || mapped.InfoRepresentative || "",
      infoEmail: mapped.infoEmail || mapped.InfoEmail || "",
      infoPhone: mapped.infoPhone || mapped.InfoPhone || "",
      infoRows: (mapped.infoRows || []).map((it: any) => ({
        id: it.id,
        key: it.Key || it.key || "",
        value: it.Value || it.value || "",
      })),
    };
  } catch (err) {
    console.error("[Strapi] getCompanyData failed:", err);
    return null;
  }
});

/** Fetch Contact Page Content */
export const getContactData = cache(async (locale?: string): Promise<ContactData | null> => {
  const localeQuery = locale ? `&locale=${locale}` : "";
  const url =
    `${STRAPI_URL}/api/contact` +
    `?${imgPopulate("heroBgImage")}` +
    localeQuery;

  try {
    const res = await fetch(url, {
      headers: buildHeaders(false), // public endpoint
      next: { tags: ["contact", locale || "th"] }, // contact info rarely changes
    });

    if (!res.ok) return null;

    const json = await res.json();
    const raw = json.data;
    if (!raw) return null;

    const isV4 = "attributes" in (raw ?? {});
    const mapped = isV4 ? flattenV4<any>(raw) : (raw as any);

    return {
      heroTitle: mapped.heroTitle || mapped.HeroTitle || "",
      heroSubtitle: mapped.heroSubtitle || mapped.HeroSubtitle || "",
      heroBgImage: mapped.heroBgImage || mapped.HeroBgImage || null,
      formTitle: mapped.formTitle || mapped.FormTitle || "",
      formCompanyName: mapped.formCompanyName || mapped.FormCompanyName || "",
      formName: mapped.formName || mapped.FormName || "",
      formEmail: mapped.formEmail || mapped.FormEmail || "",
      formSubject: mapped.formSubject || mapped.FormSubject || "",
      formMessage: mapped.formMessage || mapped.FormMessage || "",
      formNote: mapped.formNote || mapped.FormNote || "",
      officeTitle: mapped.officeTitle || mapped.OfficeTitle || "",
      officeEmail: mapped.officeEmail || mapped.OfficeEmail || "",
      officePhone: mapped.officePhone || mapped.OfficePhone || "",
      officeAddress: mapped.officeAddress || mapped.OfficeAddress || "",
      googleMapsUrl: mapped.googleMapsUrl || mapped.GoogleMapsUrl || "",
    };
  } catch (err) {
    console.error("[Strapi] getContactData failed:", err);
    return null;
  }
});

/** Fetch IT System Page Content */
export const getItSystemData = cache(async (locale?: string): Promise<ItSystemData | null> => {
  const localeQuery = locale ? `&locale=${locale}` : "";
  const url =
    `${STRAPI_URL}/api/it-system` +
    `?${imgPopulate("heroBgImage")}` +
    `&populate[serviceItems][populate][image][fields][0]=url` +
    `&populate[serviceItems][populate][image][fields][1]=alternativeText` +
    `&populate[serviceItems][populate][image][fields][2]=width` +
    `&populate[serviceItems][populate][image][fields][3]=height` +
    `&populate[features][fields][0]=title` +
    `&populate[features][fields][1]=desc` +
    localeQuery;

  try {
    const res = await fetch(url, {
      headers: buildHeaders(false), // public endpoint
      next: { tags: ["it-system", locale || "th"] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const raw = json.data;
    if (!raw) return null;

    const isV4 = "attributes" in (raw ?? {});
    const mapped = isV4 ? flattenV4<any>(raw) : (raw as any);

    return {
      heroTitle: mapped.heroTitle || mapped.HeroTitle || "",
      heroSubtitle: mapped.heroSubtitle || mapped.HeroSubtitle || "",
      heroBgImage: mapped.heroBgImage || mapped.HeroBgImage || null,
      productsTitle: mapped.productsTitle || mapped.ProductsTitle || "",
      serviceItems: (mapped.serviceItems || []).map((it: any) => ({
        id: it.id,
        title: it.Title || it.title || "",
        image: it.image || it.Image || null,
      })),
      featuresTitle: mapped.featuresTitle || mapped.FeaturesTitle || "",
      features: (mapped.features || []).map((it: any) => ({
        id: it.id,
        title: it.Title || it.title || "",
        desc: it.Desc || it.desc || "",
      })),
    };
  } catch (err) {
    console.error("[Strapi] getItSystemData failed:", err);
    return null;
  }
});

/** Fetch E-Tax Page Content */
export const getETaxData = cache(async (locale?: string): Promise<ETaxData | null> => {
  const localeQuery = locale ? `&locale=${locale}` : "";
  const url =
    `${STRAPI_URL}/api/e-tax` +
    `?${imgPopulate("heroBgImage")}` +
    `&${imgPopulate("painBgImage")}` +
    `&populate[painItems][fields][0]=text` +
    `&${imgPopulate("definitionEtaxIcon")}` +
    `&${imgPopulate("definitionSigIcon")}` +
    `&populate[benefits][populate][icon][fields][0]=url` +
    `&populate[benefits][populate][icon][fields][1]=alternativeText` +
    `&populate[benefits][populate][icon][fields][2]=width` +
    `&populate[benefits][populate][icon][fields][3]=height` +
    `&${imgPopulate("mechanismDiagram")}` +
    `&populate[costItems][fields][0]=label` +
    `&populate[costItems][fields][1]=price` +
    localeQuery;

  try {
    const res = await fetch(url, {
      headers: buildHeaders(false), // public endpoint
      next: { tags: ["e-tax", locale || "th"] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const raw = json.data;
    if (!raw) return null;

    const isV4 = "attributes" in (raw ?? {});
    const mapped = isV4 ? flattenV4<any>(raw) : (raw as any);

    return {
      heroTitle: mapped.heroTitle || mapped.HeroTitle || "",
      heroBgImage: mapped.heroBgImage || mapped.HeroBgImage || null,
      painHeading: mapped.painHeading || mapped.PainHeading || "",
      painBgImage: mapped.painBgImage || mapped.PainBgImage || null,
      painItems: (mapped.painItems || []).map((it: any) => ({
        id: it.id,
        text: it.text || it.Text || "",
      })),
      aboutTitle: mapped.aboutTitle || mapped.AboutTitle || "",
      aboutDesc: mapped.aboutDesc || mapped.AboutDesc || "",
      definitionEtaxTitle: mapped.definitionEtaxTitle || mapped.DefinitionEtaxTitle || "",
      definitionEtaxDesc: mapped.definitionEtaxDesc || mapped.DefinitionEtaxDesc || "",
      definitionEtaxIcon: mapped.definitionEtaxIcon || mapped.DefinitionEtaxIcon || null,
      definitionSigTitle: mapped.definitionSigTitle || mapped.DefinitionSigTitle || "",
      definitionSigDesc: mapped.definitionSigDesc || mapped.DefinitionSigDesc || "",
      definitionSigIcon: mapped.definitionSigIcon || mapped.DefinitionSigIcon || null,
      benefitsTitle: mapped.benefitsTitle || mapped.BenefitsTitle || "",
      benefits: (mapped.benefits || []).map((it: any) => ({
        id: it.id,
        text: it.text || it.Text || "",
        icon: it.icon || it.Icon || null,
      })),
      mechanismTitle: mapped.mechanismTitle || mapped.MechanismTitle || "",
      mechanismDiagram: mapped.mechanismDiagram || mapped.MechanismDiagram || null,
      introTitle: mapped.introTitle || mapped.IntroTitle || "",
      introDesc: mapped.introDesc || mapped.IntroDesc || "",
      costTitle: mapped.costTitle || mapped.CostTitle || "",
      costSubtitle: mapped.costSubtitle || mapped.CostSubtitle || "",
      costItems: (mapped.costItems || []).map((it: any) => ({
        id: it.id,
        label: it.label || it.Label || "",
        price: it.price || it.Price || "",
      })),
      costTotal: mapped.costTotal || mapped.CostTotal || "",
      costTotalValue: mapped.costTotalValue || mapped.CostTotalValue || "",
      costMonthlyLabel: mapped.costMonthlyLabel || mapped.CostMonthlyLabel || "",
      costMonthlyValue: mapped.costMonthlyValue || mapped.CostMonthlyValue || "",
      costMonthlyReduction: mapped.costMonthlyReduction || mapped.CostMonthlyReduction || "",
      contactBtn: mapped.contactBtn || mapped.ContactBtn || "",
    };
  } catch (err) {
    console.error("[Strapi] getETaxData failed:", err);
    return null;
  }
});

/** Fetch Marketing Page Content */
export const getMarketingData = cache(async (locale?: string): Promise<MarketingData | null> => {
  const localeQuery = locale ? `&locale=${locale}` : "";
  const url =
    `${STRAPI_URL}/api/marketing` +
    `?${imgPopulate("heroBgImage")}` +
    `&${imgPopulate("cardWebsiteBg")}` +
    `&${imgPopulate("cardWebsiteIcon")}` +
    `&${imgPopulate("cardOnlineMarketingBg")}` +
    `&populate[socialIcons][populate][icon][fields][0]=url` +
    `&populate[socialIcons][populate][icon][fields][1]=alternativeText` +
    `&populate[socialIcons][populate][icon][fields][2]=width` +
    `&populate[socialIcons][populate][icon][fields][3]=height` +
    localeQuery;

  try {
    const res = await fetch(url, {
      headers: buildHeaders(false), // public endpoint
      next: { tags: ["marketing", locale || "th"] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const raw = json.data;
    if (!raw) return null;

    const isV4 = "attributes" in (raw ?? {});
    const mapped = isV4 ? flattenV4<any>(raw) : (raw as any);

    return {
      heroTitle: mapped.heroTitle || mapped.HeroTitle || "",
      heroBgImage: mapped.heroBgImage || mapped.HeroBgImage || null,
      cardWebsite: mapped.cardWebsite || mapped.CardWebsite || "",
      cardWebsiteBg: mapped.cardWebsiteBg || mapped.CardWebsiteBg || null,
      cardWebsiteIcon: mapped.cardWebsiteIcon || mapped.CardWebsiteIcon || null,
      cardWebsiteLabel: mapped.cardWebsiteLabel || mapped.CardWebsiteLabel || "",
      cardOnlineMarketing: mapped.cardOnlineMarketing || mapped.CardOnlineMarketing || "",
      cardOnlineMarketingBg: mapped.cardOnlineMarketingBg || mapped.CardOnlineMarketingBg || null,
      socialIcons: (mapped.socialIcons || []).map((it: any) => ({
        id: it.id,
        label: it.label || it.Label || "",
        icon: it.icon || it.Icon || null,
      })),
    };
  } catch (err) {
    console.error("[Strapi] getMarketingData failed:", err);
    return null;
  }
});

/** Fetch MyLogStar Page Content */
export const getMyLogStarData = cache(async (locale?: string): Promise<MyLogStarData | null> => {
  const localeQuery = locale ? `&locale=${locale}` : "";
  const url =
    `${STRAPI_URL}/api/my-log-star` +
    `?${imgPopulate("mediaImage1")}` +
    `&${imgPopulate("mediaImage2")}` +
    `&populate[accordionItems][populate][image][fields][0]=url` +
    `&populate[accordionItems][populate][image][fields][1]=alternativeText` +
    `&populate[accordionItems][populate][image][fields][2]=width` +
    `&populate[accordionItems][populate][image][fields][3]=height` +
    localeQuery;

  try {
    const res = await fetch(url, {
      headers: buildHeaders(false), // public endpoint
      next: { tags: ["my-log-star", locale || "th"] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const raw = json.data;
    if (!raw) return null;

    const isV4 = "attributes" in (raw ?? {});
    const mapped = isV4 ? flattenV4<any>(raw) : (raw as any);

    return {
      heroTitle: mapped.heroTitle || mapped.HeroTitle || "",
      heroDesc: mapped.heroDesc || mapped.HeroDesc || "",
      youtubeVideoId: mapped.youtubeVideoId || mapped.YoutubeVideoId || "",
      mediaImage1: mapped.mediaImage1 || mapped.MediaImage1 || null,
      mediaImage2: mapped.mediaImage2 || mapped.MediaImage2 || null,
      featureTitle: mapped.featureTitle || mapped.FeatureTitle || "",
      featureLogCollectionTitle: mapped.featureLogCollectionTitle || mapped.FeatureLogCollectionTitle || "",
      featureLogCollectionDesc: mapped.featureLogCollectionDesc || mapped.FeatureLogCollectionDesc || "",
      featureLogAvailabilityTitle: mapped.featureLogAvailabilityTitle || mapped.FeatureLogAvailabilityTitle || "",
      featureLogAvailabilityDesc: mapped.featureLogAvailabilityDesc || mapped.FeatureLogAvailabilityDesc || "",
      accordionItems: (mapped.accordionItems || []).map((it: any) => ({
        id: it.id,
        sectionId: it.sectionId || it.SectionId || "",
        title: it.title || it.Title || "",
        content: it.content || it.Content || "",
        image: it.image || it.Image || null,
      })),
    };
  } catch (err) {
    console.error("[Strapi] getMyLogStarData failed:", err);
    return null;
  }
});
