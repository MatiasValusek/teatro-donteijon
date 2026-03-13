import type { MetadataRoute } from "next";
import { buildAbsoluteUrl, seoSite } from "@/lib/seo/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
    ],
    sitemap: buildAbsoluteUrl("/sitemap.xml"),
    host: seoSite.url,
  };
}
