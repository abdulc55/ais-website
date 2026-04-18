import type { MetadataRoute } from "next";

/**
 * sitemap.xml route — lists every crawlable URL with metadata hints for priority/freshness.
 * Add new public routes here. /admin and /api are excluded via robots.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://spiffytec.com";
  const lastModified = new Date();

  return [
    {
      url: `${base}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/pricing`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/portfolio`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/portfolio/mike-t-detailing`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // ─── SEO landing pages — city-scoped ───────────────────────────
    {
      url: `${base}/raleigh-web-design`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/cary-web-design`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/durham-web-design`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // ─── SEO landing pages — niche-scoped ──────────────────────────
    {
      url: `${base}/websites-for-mobile-detailers`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/booking-platform-websites`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/how-it-works`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
