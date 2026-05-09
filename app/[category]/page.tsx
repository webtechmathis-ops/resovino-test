import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, categoryBySlug, type CategorySlug } from "@/lib/site";
import { getArticlesByCategory } from "@/lib/mdx";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

type Props = { params: { category: string } };

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const c = categoryBySlug(params.category);
  if (!c) return {};
  return buildMetadata({
    title: c.name,
    description: `${c.name} — ${c.description}`,
    path: `/${c.slug}`,
  });
}

export default function CategoryPage({ params }: Props) {
  const category = categoryBySlug(params.category);
  if (!category) notFound();
  const articles = getArticlesByCategory(category.slug as CategorySlug);

  return (
    <div className="container-page py-12">
      <Breadcrumbs
        items={[
          { name: "Accueil", href: "/" },
          { name: "Articles", href: "/blog" },
          { name: category.name },
        ]}
      />
      <header className="mt-6 mb-10 max-w-3xl">
        <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
          <span className="gold-rule" /> Catégorie
        </p>
        <h1 className="font-display text-4xl font-semibold md:text-5xl">{category.name}</h1>
        <p className="mt-3 text-lg text-[var(--muted)]">{category.description}</p>
      </header>

      <div className="mb-10">
        <CategoryFilter active={category.slug} />
      </div>

      {articles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      ) : (
        <div className="surface rounded-2xl p-10 text-center text-[var(--muted)]">
          Cette catégorie se remplit. Les articles arrivent.
        </div>
      )}
    </div>
  );
}

export const dynamicParams = false;
