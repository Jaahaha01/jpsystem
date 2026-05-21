import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats — AVIF is ~50% smaller than JPEG, WebP ~30% smaller
    formats: ["image/avif", "image/webp"],

    // Restrict generated sizes so Next.js doesn't create too many variants
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],

    // Aggressive quality — visually identical at 75 but much smaller files
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache

    // Configured qualities to support optimized custom quality sizes
    qualities: [30, 50, 60, 65, 75],

    // Allow Vercel Blob + Sanity CDN + Local Strapi images
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "*.blob.vercel-storage.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "127.0.0.1" },
      { protocol: "https", hostname: "*.media.strapiapp.com" },
    ],
    // Allow Next.js to fetch from localhost (avoids upstream image resolved to private ip)
    dangerouslyAllowSVG: true,
  },

  // Enable gzip/brotli compression headers
  compress: true,

  // Experimental performance features
  experimental: {
    // Enable optimized CSS loading
    optimizeCss: true,
  },
};

export default nextConfig;
