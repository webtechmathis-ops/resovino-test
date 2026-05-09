import Link from "next/link";
import type { Article } from "@/lib/mdx";
import { categoryBySlug } from "@/lib/site";

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  const category = categoryBySlug(article.category);
  return (
    <Link
      href={`/blog/${article.slug}`}
      className={`group surface block overflow-hidden rounded-2xl transition hover:-translate-y-0.5 hover:shadow-lg ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      {article.image && (
        <div className={`relative w-full overflow-hidden ${featured ? "aspect-[16/8]" : "aspect-[16/10]"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.image}
            alt={article.imageAlt ?? article.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <div className={`flex flex-col gap-3 p-6 ${featured ? "md:p-8" : ""}`}>
        <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
          {category && <span className="chip">{category.short}</span>}
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingTime}</span>
        </div>
        <h3 className={`font-display font-semibold leading-tight ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
          {article.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
          {article.description}
        </p>
        <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-[var(--brand)]">
          Lire l'article
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
