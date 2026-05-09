import { getAllArticles } from "@/lib/mdx";
import { categories, site } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const articles = getAllArticles();
  const lines: string[] = [];

  lines.push(`# ${site.name}`);
  lines.push("");
  lines.push(`> ${site.description}`);
  lines.push("");
  lines.push(`Site: ${site.url}`);
  lines.push(`Langue: français`);
  lines.push("");
  lines.push("## Catégories");
  for (const c of categories) {
    lines.push(`- [${c.name}](${site.url}/${c.slug}) — ${c.description}`);
  }
  lines.push("");
  lines.push("## Articles");
  for (const a of articles) {
    lines.push(`- [${a.title}](${site.url}/blog/${a.slug}) — ${a.description}`);
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
