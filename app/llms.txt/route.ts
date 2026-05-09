import { getAllArticles } from "@/lib/mdx";
import { categories, site } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const articles = getAllArticles();
  const lines: string[] = [];

  lines.push(`# ${site.name} — Blog vin francophone`);
  lines.push("");
  lines.push(
    "> Guide complet sur le vin : régions, cépages, accords mets-vins, grands crus, œnologie pour débutants.",
  );
  lines.push("");
  lines.push("## Articles essentiels");
  lines.push("");
  for (const a of articles) {
    lines.push(`- [${a.title}](${site.url}/blog/${a.slug}/) : ${a.description}`);
  }
  lines.push("");
  lines.push("## Catégories");
  lines.push("");
  for (const c of categories) {
    lines.push(`- ${c.name} : ${site.url}/${c.slug}/`);
  }
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
