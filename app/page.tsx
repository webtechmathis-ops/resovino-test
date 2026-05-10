import Link from "next/link";
import { categories, site } from "@/lib/site";
import { getAllArticles } from "@/lib/mdx";
import { ArticleCard } from "@/components/ArticleCard";

export default function HomePage() {
  const articles = getAllArticles();
  const featured = articles[0];
  const recent = articles.slice(1, 7);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 60% at 20% 0%, color-mix(in srgb, var(--color-bordeaux-700) 18%, transparent), transparent 60%), radial-gradient(50% 60% at 90% 30%, color-mix(in srgb, var(--color-gold-500) 12%, transparent), transparent 60%)",
          }}
        />
        <div className="container-page py-20 md:py-28">
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
            <span className="gold-rule" /> {site.tagline}
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Comprendre le vin, <br />
            <span className="italic text-[var(--brand)]">sans détour.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
            ResoVino, c'est un guide francophone clair et documenté sur les régions, cépages,
            grands crus et accords mets-vins. Ni snobisme, ni jargon — juste l'essentiel pour
            choisir et déguster mieux.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/blog/" className="btn btn-primary">
              Explorer les articles
            </Link>
            <Link href="/guide-debutant/" className="btn btn-ghost">
              Commencer par le début
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page py-16">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">Par thématique</h2>
            <p className="mt-2 text-[var(--muted)]">Six univers pour explorer le vin à votre rythme.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}/`}
              className="surface group flex flex-col gap-3 rounded-2xl p-6 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="gold-rule" />
              <h3 className="font-display text-xl font-semibold">{c.name}</h3>
              <p className="text-sm text-[var(--muted)]">{c.description}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-[var(--brand)]">
                Découvrir
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent articles */}
      {articles.length > 0 && (
        <section className="container-page py-16">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-semibold md:text-4xl">Derniers articles</h2>
              <p className="mt-2 text-[var(--muted)]">Les nouveautés à lire chez ResoVino.</p>
            </div>
            <Link href="/blog/" className="text-sm font-medium text-[var(--brand)] hover:underline">
              Tout voir →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured && <ArticleCard article={featured} featured />}
            {recent.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}

      {/* Empty state — when no articles yet */}
      {articles.length === 0 && (
        <section className="container-page py-16">
          <div className="surface rounded-2xl p-10 text-center">
            <h2 className="font-display text-2xl font-semibold">Le caveau se remplit…</h2>
            <p className="mx-auto mt-3 max-w-md text-[var(--muted)]">
              Les premiers articles arrivent très vite. En attendant, parcourez les catégories
              ci-dessus.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
