import type { MetadataRoute } from "next";
import { getPublishedNews, getPublishedWorks } from "@/lib/queries";
import { buildAbsoluteUrl } from "@/lib/seo/metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [works, newsPosts] = await Promise.all([
    getPublishedWorks(),
    getPublishedNews(),
  ]);

  const now = new Date();

  return [
    {
      url: buildAbsoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: buildAbsoluteUrl("/nosotros"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: buildAbsoluteUrl("/obras"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: buildAbsoluteUrl("/funciones"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: buildAbsoluteUrl("/novedades"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: buildAbsoluteUrl("/contacto"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...works.map((work) => ({
      url: buildAbsoluteUrl(`/obras/${work.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: work.featured ? 0.8 : 0.7,
    })),
    ...newsPosts.map((post) => ({
      url: buildAbsoluteUrl(`/novedades/${post.slug}`),
      lastModified: new Date(`${post.publishedAt}T00:00:00-03:00`),
      changeFrequency: "monthly" as const,
      priority: post.featured ? 0.8 : 0.7,
    })),
  ];
}
