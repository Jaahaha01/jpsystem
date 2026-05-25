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
  desc: string;
  content?: string | any[];
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

