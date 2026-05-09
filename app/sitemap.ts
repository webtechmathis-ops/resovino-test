import type { MetadataRoute } from "next";
import { categories, site } from "@/lib/site";
import { getAllArticles } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const now = new Date();

  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/blog/`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    ...categories.map((c) => ({
      url: `${site.url}/${c.slug}/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...articles.map((a) => ({
      url: `${site.url}/blog/${a.slug}/`,
      lastModified: new Date(a.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
