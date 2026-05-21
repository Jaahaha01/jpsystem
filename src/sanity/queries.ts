import { client } from "@/sanity/client";
import type { Language } from "@/i18n/translations";

/* ── Types ── */
export type SanityTextOverride = {
  _id: string;
  title: string;
  page: string;
  position: string;
  contentTh?: string;
  contentEn?: string;
  contentJa?: string;
};

export type SanityImage = {
  _id: string;
  title: string;
  page: string;
  alt?: string;
  image: {
    asset: {
      _ref: string;
      url: string;
    };
  };
};

/* ── Queries ── */

/** Fetch all text overrides for a specific page */
export async function getTextOverrides(page: string): Promise<SanityTextOverride[]> {
  return client.fetch(
    `*[_type == "siteText" && page == $page]{
      _id, title, page, position, contentTh, contentEn, contentJa
    }`,
    { page }
  );
}

/** Fetch all images for a specific page */
export async function getPageImages(page: string): Promise<SanityImage[]> {
  return client.fetch(
    `*[_type == "siteImage" && page == $page]{
      _id, title, page, alt,
      image { asset-> { _ref, url } }
    }`,
    { page }
  );
}

/** Fetch ALL text overrides (for client-side context) */
export async function getAllTextOverrides(): Promise<SanityTextOverride[]> {
  return client.fetch(
    `*[_type == "siteText"]{
      _id, title, page, position, contentTh, contentEn, contentJa
    }`
  );
}

/** Fetch ALL images (for client-side context) */
export async function getAllImages(): Promise<SanityImage[]> {
  return client.fetch(
    `*[_type == "siteImage"]{
      _id, title, page, alt,
      image { asset-> { _ref, url } }
    }`
  );
}

/* ── Helpers ── */

/** Get the correct language content from a Sanity text override */
export function getLocalizedContent(
  item: SanityTextOverride,
  lang: Language
): string | undefined {
  switch (lang) {
    case "th":
      return item.contentTh;
    case "en":
      return item.contentEn;
    case "jp":
      return item.contentJa;
    default:
      return item.contentEn;
  }
}

/** Find a text override by page + position */
export function findOverride(
  overrides: SanityTextOverride[],
  page: string,
  position: string
): SanityTextOverride | undefined {
  return overrides.find((o) => o.page === page && o.position === position);
}
