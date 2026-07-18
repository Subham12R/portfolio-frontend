import type { NextConfig } from "next";

const ONE_YEAR = 60 * 60 * 24 * 365;
const ONE_DAY = 60 * 60 * 24;
const ONE_HOUR = 60 * 60;

const nextConfig: NextConfig = {
  images: {
    // CDN-cache optimized Next/Image variants for 30 days
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.microlink.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-b5cc14cdfc9a459bbb6c1cc637db4ffa.r2.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },

  /**
   * CDN / browser cache headers (Vercel edge + any reverse proxy).
   * Hashed assets → immutable long cache.
   * Public media/fonts → long cache.
   * HTML is controlled by page `revalidate` / ISR, not fixed here.
   */
  async headers() {
    const immutable = [
      {
        key: "Cache-Control",
        value: `public, max-age=${ONE_YEAR}, immutable`,
      },
    ];

    const longLived = [
      {
        key: "Cache-Control",
        value: `public, max-age=${ONE_DAY * 7}, s-maxage=${ONE_DAY * 30}, stale-while-revalidate=${ONE_DAY}`,
      },
    ];

    // Shared by HTML document responses at the edge (supplements ISR)
    const htmlCdn = [
      {
        key: "Cache-Control",
        value: `public, s-maxage=${ONE_HOUR}, stale-while-revalidate=${ONE_DAY}`,
      },
      {
        key: "CDN-Cache-Control",
        value: `public, s-maxage=${ONE_HOUR}, stale-while-revalidate=${ONE_DAY}`,
      },
      {
        key: "Vercel-CDN-Cache-Control",
        value: `public, s-maxage=${ONE_HOUR}, stale-while-revalidate=${ONE_DAY}`,
      },
    ];

    return [
      // Next build output (content-hashed)
      { source: "/_next/static/:path*", headers: immutable },

      // Local public assets
      { source: "/fonts/:path*", headers: immutable },
      { source: "/images/:path*", headers: longLived },
      { source: "/sprites/:path*", headers: longLived },
      {
        source: "/:path*\\.(ico|png|jpg|jpeg|gif|webp|avif|svg|mp4|webm|woff|woff2|ttf|otf|pdf)",
        headers: longLived,
      },

      // Marketing / content pages — CDN may serve stale while revalidating
      { source: "/", headers: htmlCdn },
      { source: "/projects", headers: htmlCdn },
      { source: "/projects/:path*", headers: htmlCdn },
      { source: "/blog", headers: htmlCdn },
      { source: "/blog/:path*", headers: htmlCdn },
      { source: "/casestudy", headers: htmlCdn },
      { source: "/hackathons", headers: htmlCdn },
      { source: "/photography", headers: htmlCdn },
    ];
  },
};

export default nextConfig;
