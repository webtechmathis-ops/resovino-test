import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllArticles, getArticleBySlug, getRelatedArticles, getArticleSlugs } from "@/lib/mdx";
import { Mdx } from "@/components/Mdx";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TableOfContents } from "@/components/TableOfContents";
import { ArticleCard } from "@/components/ArticleCard";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { categoryBySlug, site } from "@/lib/site";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}/`,
    image: article.image,
    type: "article",
  });
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const category = categoryBySlug(article.category);
  const related = getRelatedArticles(article, 3);

  const crumbs = [
    { name: "Accueil", href: "/" },
    { name: "Articles", href: "/blog/" },
    ...(category ? [{ name: category.name, href: `/${category.slug}/` }] : []),
    { name: article.title },
  ];

  return (
    <article className="container-page py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd(
              crumbs.map((c) => ({
                name: c.name,
                url: c.href ? `${site.url}${c.href}` : `${site.url}/blog/${article.slug}`,
              })),
            ),
          ),
        }}
      />

      <Breadcrumbs items={crumbs} />

      {/* Hero */}
      <header className="mx-auto mt-6 max-w-3xl text-center">
        {category && (
          <Link
            href={`/${category.slug}/`}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]"
          >
            <span className="gold-rule" /> {category.name}
          </Link>
        )}
        <h1 className="mt-5 font-display text-4xl font-semibold leading-tight md:text-5xl">
          {article.title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-[var(--muted)]">{article.description}</p>
        <div className="mt-6 flex items-center justify-center gap-3 text-xs text-[var(--muted)]">
          <span>{article.author ?? site.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingTime}</span>
        </div>
      </header>

      {article.image && (
        <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl border border-[var(--border)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.image}
            alt={article.imageAlt ?? article.title}
            className="aspect-[16/8] w-full object-cover"
          />
        </div>
      )}

      {/* Body + TOC */}
      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1fr_220px]">
        <div className="prose prose-vino max-w-none">
          <Mdx source={article.content} />
        </div>
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents source={article.content} />
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto mt-24 max-w-6xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold md:text-3xl">À lire ensuite</h2>
            <Link href="/blog/" className="text-sm font-medium text-[var(--brand)] hover:underline">
              Tout voir →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Pre-render at build time only (SSG).
export const dynamicParams = false;
