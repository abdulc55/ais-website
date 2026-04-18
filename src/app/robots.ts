import type { MetadataRoute } from "next";

/**
 * robots.txt route — tells search engine crawlers which URLs they can access.
 * Keep /admin private to avoid leaking the lead scanner into search results.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: "https://spiffytec.com/sitemap.xml",
    host: "https://spiffytec.com",
  };
}
