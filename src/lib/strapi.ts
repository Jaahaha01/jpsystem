/**
 * Strapi CMS API client
 * Fetches blog posts from Strapi v4/v5 REST API
 * Deployed Strapi URL: https://authentic-chocolate-641291934d.strapiapp.com
 *
 * Set NEXT_PUBLIC_STRAPI_URL in .env.local or your hosting environment to override.
 */

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "https://authentic-chocolate-641291934d.strapiapp.com";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

/* ── Types ─────────────────────────────────────────── */

export type StrapiImageFormat = {
  url: string;
  width: number;
  height: number;
};

export type StrapiImage = {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
};

export type StrapiCategory = {
  id: number;
  name: string;
  slug: string;
  color?: string;
};

export type BlogPost = {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  desc: string;          // short description / excerpt
  content?: string | any[]; // full rich-text content (optional for listing)
  img: StrapiImage | null;
  cate: StrapiCategory | null;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type HomepageData = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroCtaPrimary?: string;
  heroBgImage?: StrapiImage | null;
  servicesTitle?: string;
  serviceItems?: {
    id: number;
    title: string;
    desc: string;
    url?: string;
    icon?: StrapiImage | null;
  }[];
};

export type NewsCard = {
  id: number;
  title: string;
  category?: string;
  date?: string;
  url?: string;
  image?: StrapiImage | null;
};

export type NewReleaseData = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroBgImage?: StrapiImage | null;
  eTaxHeading?: string;
  taxInvoiceSubtitle?: string;
  eTaxTopImage?: StrapiImage | null;
  videoId?: string;
  botImage?: StrapiImage | null;
  newsCards?: NewsCard[];
};

export type CompanyData = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroBgImage?: StrapiImage | null;
  aboutTitle?: string;
  aboutBody?: string;
  aboutImage?: StrapiImage | null;
  infoTitle?: string;
  infoCompanyName?: string;
  infoAddress?: string;
  infoEstablishment?: string;
  infoCapital?: string;
  infoRepresentative?: string;
  infoEmail?: string;
  infoPhone?: string;
  infoRows?: {
    id: number;
    key: string;
    value: string;
  }[];
};

export type ContactData = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroBgImage?: StrapiImage | null;
  formTitle?: string;
  formCompanyName?: string;
  formName?: string;
  formEmail?: string;
  formSubject?: string;
  formMessage?: string;
  formNote?: string;
  officeTitle?: string;
  officeEmail?: string;
  officePhone?: string;
  officeAddress?: string;
  googleMapsUrl?: string;
};

export type ItServiceItem = {
  id: number;
  title: string;
  image?: StrapiImage | null;
};

export type ItFeatureItem = {
  id: number;
  title: string;
  desc: string;
};

export type ItSystemData = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroBgImage?: StrapiImage | null;
  productsTitle?: string;
  serviceItems?: ItServiceItem[];
  featuresTitle?: string;
  features?: ItFeatureItem[];
};

export type ETaxPainItem = {
  id: number;
  text: string;
};

export type ETaxBenefitItem = {
  id: number;
  text: string;
  icon?: StrapiImage | null;
};

export type ETaxCostItem = {
  id: number;
  label: string;
  price: string;
};

export type ETaxData = {
  heroTitle?: string;
  heroBgImage?: StrapiImage | null;
  painHeading?: string;
  painBgImage?: StrapiImage | null;
  painItems?: ETaxPainItem[];
  aboutTitle?: string;
  aboutDesc?: string;
  definitionEtaxTitle?: string;
  definitionEtaxDesc?: string;
  definitionEtaxIcon?: StrapiImage | null;
  definitionSigTitle?: string;
  definitionSigDesc?: string;
  definitionSigIcon?: StrapiImage | null;
  benefitsTitle?: string;
  benefits?: ETaxBenefitItem[];
  mechanismTitle?: string;
  mechanismDiagram?: StrapiImage | null;
  introTitle?: string;
  introDesc?: string;
  costTitle?: string;
  costSubtitle?: string;
  costItems?: ETaxCostItem[];
  costTotal?: string;
  costTotalValue?: string;
  costMonthlyLabel?: string;
  costMonthlyValue?: string;
  costMonthlyReduction?: string;
  contactBtn?: string;
};

export type MarketingSocialIcon = {
  id: number;
  label: string;
  icon?: StrapiImage | null;
};

export type MarketingData = {
  heroTitle?: string;
  heroBgImage?: StrapiImage | null;
  cardWebsite?: string;
  cardWebsiteBg?: StrapiImage | null;
  cardWebsiteIcon?: StrapiImage | null;
  cardWebsiteLabel?: string;
  cardOnlineMarketing?: string;
  cardOnlineMarketingBg?: StrapiImage | null;
  socialIcons?: MarketingSocialIcon[];
};

export type MyLogStarAccordionItem = {
  id: number;
  sectionId: string;
  title: string;
  content: string;
  image?: StrapiImage | null;
};

export type MyLogStarData = {
  heroTitle?: string;
  heroDesc?: string;
  youtubeVideoId?: string;
  mediaImage1?: StrapiImage | null;
  mediaImage2?: StrapiImage | null;
  featureTitle?: string;
  featureLogCollectionTitle?: string;
  featureLogCollectionDesc?: string;
  featureLogAvailabilityTitle?: string;
  featureLogAvailabilityDesc?: string;
  accordionItems?: MyLogStarAccordionItem[];
};

/* ── Internal helpers ───────────────────────────────── */

function buildHeaders(): HeadersInit {
  const h: HeadersInit = { "Content-Type": "application/json" };
  if (STRAPI_TOKEN) h["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
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

/* ── API calls ──────────────────────────────────────── */

const POPULATE = "populate[img][fields][0]=url&populate[img][fields][1]=alternativeText&populate[img][fields][2]=width&populate[img][fields][3]=height&populate[img][fields][4]=formats&populate[categories][fields][0]=name&populate[categories][fields][1]=slug&populate[categories][fields][2]=color";

/**
 * Fetch paginated list of blog posts.
 * @param page  1-based page number
 * @param limit items per page
 * @param cateSlug optional category slug filter
 */
export async function getBlogPosts(
  page = 1,
  limit = 9,
  cateSlug?: string
): Promise<{ posts: BlogPost[]; total: number; pageCount: number }> {
  const filters = cateSlug
    ? `&filters[categories][slug][$eq]=${encodeURIComponent(cateSlug)}`
    : "";

  const url = `${STRAPI_URL}/api/blog-posts?${POPULATE}&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${limit}${filters}`;

  try {
    const res = await fetch(url, {
      headers: buildHeaders(),
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`Strapi ${res.status}: ${res.statusText}`);

    const json = await res.json();

    /* Support both Strapi v4 (data[].attributes) and v5 (data[] flat) */
    const isV4 =
      json.data?.[0] && "attributes" in (json.data[0] ?? {});

    const posts: BlogPost[] = (json.data ?? []).map(
      (item: Record<string, unknown>) => {
        const mapped = isV4 ? flattenV4<any>(item as { id: number; attributes: Record<string, unknown> }) : item as any;
        
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
}

/** Fetch a single blog post by slug */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const url = `${STRAPI_URL}/api/blog-posts?${POPULATE}&filters[slug][$eq]=${encodeURIComponent(slug)}`;

  try {
    const res = await fetch(url, {
      headers: buildHeaders(),
      next: { revalidate: 60 },
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
}

/** Fetch all categories */
export async function getBlogCategories(): Promise<StrapiCategory[]> {
  const url = `${STRAPI_URL}/api/categories?fields[0]=name&fields[1]=slug&fields[2]=color&sort=name:asc`;

  try {
    const res = await fetch(url, {
      headers: buildHeaders(),
      next: { revalidate: 300 },
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
}

/** Fetch Homepage Content */
export async function getHomepageData(locale?: string): Promise<HomepageData | null> {
  const localeQuery = locale ? `&locale=${locale}` : "";
  const url = `${STRAPI_URL}/api/homepage?populate[0]=heroBgImage&populate[1]=serviceItems.icon${localeQuery}`;

  try {
    const res = await fetch(url, {
      headers: buildHeaders(),
      cache: 'no-store',
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      // Return null so frontend can fallback to translation JSON
      return null;
    }

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
        title: it.Title || it.title || "", // Fallback to Title because user typed capital T in Strapi
        desc: it.desc || "",
        url: it.url || "",
        icon: it.icon || null,
      })),
    };
  } catch (err) {
    console.error("[Strapi] getHomepageData failed:", err);
    return null;
  }
}

/** Fetch New Release Content */
export async function getNewReleaseData(locale?: string): Promise<NewReleaseData | null> {
  const localeQuery = locale ? `&locale=${locale}` : "";
  const url = `${STRAPI_URL}/api/new-release?populate[0]=heroBgImage&populate[1]=eTaxTopImage&populate[2]=botImage&populate[3]=newsCards.image${localeQuery}`;

  try {
    const res = await fetch(url, {
      headers: buildHeaders(),
      cache: 'no-store',
      next: { revalidate: 0 },
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
}

/** Fetch Company Profile Content */
export async function getCompanyData(locale?: string): Promise<CompanyData | null> {
  const localeQuery = locale ? `&locale=${locale}` : "";
  const url = `${STRAPI_URL}/api/company?populate[0]=heroBgImage&populate[1]=aboutImage${localeQuery}`;

  try {
    const res = await fetch(url, {
      headers: buildHeaders(),
      cache: 'no-store',
      next: { revalidate: 0 },
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
}

/** Fetch Contact Page Content */
export async function getContactData(locale?: string): Promise<ContactData | null> {
  const localeQuery = locale ? `&locale=${locale}` : "";
  const url = `${STRAPI_URL}/api/contact?populate[0]=heroBgImage${localeQuery}`;

  try {
    const res = await fetch(url, {
      headers: buildHeaders(),
      cache: 'no-store',
      next: { revalidate: 0 },
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
}

/** Fetch IT System Page Content */
export async function getItSystemData(locale?: string): Promise<ItSystemData | null> {
  const localeQuery = locale ? `&locale=${locale}` : "";
  const url = `${STRAPI_URL}/api/it-system?populate[0]=heroBgImage&populate[1]=serviceItems.image&populate[2]=features${localeQuery}`;

  try {
    const res = await fetch(url, {
      headers: buildHeaders(),
      cache: 'no-store',
      next: { revalidate: 0 },
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
}

/** Fetch E-Tax Page Content */
export async function getETaxData(locale?: string): Promise<ETaxData | null> {
  const localeQuery = locale ? `&locale=${locale}` : "";
  const url = `${STRAPI_URL}/api/e-tax?populate[0]=heroBgImage&populate[1]=painBgImage&populate[2]=painItems&populate[3]=definitionEtaxIcon&populate[4]=definitionSigIcon&populate[5]=benefits.icon&populate[6]=mechanismDiagram&populate[7]=costItems${localeQuery}`;

  try {
    const res = await fetch(url, {
      headers: buildHeaders(),
      cache: 'no-store',
      next: { revalidate: 0 },
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
}

/** Fetch Marketing Page Content */
export async function getMarketingData(locale?: string): Promise<MarketingData | null> {
  const localeQuery = locale ? `&locale=${locale}` : "";
  const url = `${STRAPI_URL}/api/marketing?populate[0]=heroBgImage&populate[1]=cardWebsiteBg&populate[2]=cardWebsiteIcon&populate[3]=cardOnlineMarketingBg&populate[4]=socialIcons.icon${localeQuery}`;

  try {
    const res = await fetch(url, {
      headers: buildHeaders(),
      cache: 'no-store',
      next: { revalidate: 0 },
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
}

/** Fetch MyLogStar Page Content */
export async function getMyLogStarData(locale?: string): Promise<MyLogStarData | null> {
  const localeQuery = locale ? `&locale=${locale}` : "";
  const url = `${STRAPI_URL}/api/my-log-star?populate[0]=mediaImage1&populate[1]=mediaImage2&populate[2]=accordionItems.image${localeQuery}`;

  try {
    const res = await fetch(url, {
      headers: buildHeaders(),
      cache: 'no-store',
      next: { revalidate: 0 },
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
}






