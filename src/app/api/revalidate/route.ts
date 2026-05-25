import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Map Strapi model UID → Next.js Cache Tags
 */
const MODEL_TAG_MAP: Record<string, string[]> = {
  "api::homepage.homepage": ["homepage"],
  "api::new-release.new-release": ["new-release"],
  "api::company.company": ["company"],
  "api::contact.contact": ["contact"],
  "api::it-system.it-system": ["it-system"],
  "api::e-tax.e-tax": ["e-tax"],
  "api::marketing.marketing": ["marketing"],
  "api::my-log-star.my-log-star": ["my-log-star"],

  // Blog
  "api::blog-post.blog-post": ["blog"],

  // Categories
  "api::category.category": ["category"],
};

/**
 * Fallback tags if uid is not identified
 */
const ALL_TAGS = [
  "homepage",
  "new-release",
  "company",
  "contact",
  "it-system",
  "e-tax",
  "marketing",
  "my-log-star",
  "blog",
  "category"
];

/**
 * POST → Strapi webhook
 */
export async function POST(req: NextRequest) {
  try {
    // ── Verify secret ─────────────────────────────
    const authHeader = req.headers.get("Authorization");
    
    // Check Bearer Token
    if (
      !process.env.REVALIDATE_SECRET ||
      authHeader !== `Bearer ${process.env.REVALIDATE_SECRET}`
    ) {
      // Fallback: Check Query Param for backwards compatibility during migration
      const querySecret = req.nextUrl.searchParams.get("secret");
      if (querySecret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json(
          { message: "Invalid or missing token" },
          { status: 401 }
        );
      }
    }

    // ── Parse webhook body (only for POST) ────────
    let body: any = {};

    if (req.method === "POST") {
      try {
        body = await req.json();
      } catch {
        return NextResponse.json(
          { message: "Invalid JSON body" },
          { status: 400 }
        );
      }
    }

    console.log("[Webhook Body]", body);

    /**
     * Strapi payload examples:
     * body.model = "blog-post"
     * body.uid   = "api::blog-post.blog-post"
     */
    const uid =
      body?.uid ||
      (body?.model
        ? `api::${body.model}.${body.model}`
        : undefined);

    // ── Find tags ───────────────────────────────
    const tags = (uid && MODEL_TAG_MAP[uid]) || ALL_TAGS;

    const revalidated: string[] = [];

    // ── Revalidate normal tags ──────────────────
    for (const tag of tags) {
      try {
        revalidateTag(tag, { expire: 0 });
        revalidated.push(tag);
      } catch (err) {
        console.error(`[Revalidate] Failed tag "${tag}"`, err);
      }
    }

    // ── Dynamic blog slug ────────────────────────
    if (
      uid === "api::blog-post.blog-post" &&
      body?.entry?.slug
    ) {
      const blogTag = `blog-post-${body.entry.slug}`;
      try {
        revalidateTag(blogTag, { expire: 0 });
        revalidated.push(blogTag);
      } catch (err) {
        console.error(`[Revalidate] Failed blog tag "${blogTag}"`, err);
      }
    }

    console.log(`[Revalidated Tags] ${revalidated.join(", ")}`);

    return NextResponse.json({
      revalidated: true,
      tags: revalidated,
      now: Date.now(),
    });
  } catch (err) {
    console.error("[Revalidate Error]", err);
    return NextResponse.json(
      {
        revalidated: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return POST(req);
}