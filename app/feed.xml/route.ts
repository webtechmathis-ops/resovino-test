import RSS from "rss";
import { getAllArticles } from "@/lib/mdx";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const feed = new RSS({
    title: site.name,
    description: site.description,
    site_url: site.url,
    feed_url: `${site.url}/feed.xml`,
    language: "fr",
    pubDate: new Date(),
    copyright: `© ${new Date().getFullYear()} ${site.name}`,
  });

  for (const a of getAllArticles()) {
    feed.item({
      title: a.title,
      description: a.description,
      url: `${site.url}/blog/${a.slug}`,
      guid: `${site.url}/blog/${a.slug}`,
      categories: a.keywords ?? [a.category],
      author: a.author ?? site.author,
      date: new Date(a.date),
    });
  }

  return new Response(feed.xml({ indent: true }), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
