import type { Metadata } from "next";
import { getAllArticles } from "@/lib/mdx";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Tous les articles",
  description: `Tous les articles de ${site.name} : guides, régions viticoles, cépages, accords mets-vins, grands crus, vins du monde.`,
  path: "/blog",
});

export default function BlogPage() {
  const articles = getAllArticles();
  return (
    <div className="container-page py-12">
      <Breadcrumbs items={[{ name: "Accueil", href: "/" }, { name: "Articles" }]} />
      <header className="mt-6 mb-10 max-w-3xl">
        <h1 className="font-display text-4xl font-semibold md:text-5xl">Tous les articles</h1>
        <p className="mt-3 text-lg text-[var(--muted)]">
          {articles.length === 0
            ? "Pas encore d'articles — la cave se remplit."
            : `${articles.length} article${articles.length > 1 ? "s" : ""} pour comprendre, choisir, déguster.`}
        </p>
      </header>

      <div className="mb-10">
        <CategoryFilter />
      </div>

      {articles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      ) : (
        <div className="surface rounded-2xl p-10 text-center text-[var(--muted)]">
          Bientôt en ligne.
        </div>
      )}
    </div>
  );
}
