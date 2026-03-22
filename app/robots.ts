import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl().replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/checkout", "/login", "/register", "/account", "/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
