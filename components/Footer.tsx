import Link from "next/link";
import { categories, site } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer
      className="mt-24"
      style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--surface-2)" }}
    >
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo />
            <span className="font-display text-xl font-semibold">{site.name}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--muted)]">
            {site.description}
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider">
            Explorer
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.slice(0, 4).map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`} className="text-[var(--muted)] hover:text-[var(--fg)]">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider">
            Plus
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.slice(4).map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`} className="text-[var(--muted)] hover:text-[var(--fg)]">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/blog" className="text-[var(--muted)] hover:text-[var(--fg)]">
                Tous les articles
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider">
            Ressources
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/feed.xml" className="text-[var(--muted)] hover:text-[var(--fg)]">
                Flux RSS
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" className="text-[var(--muted)] hover:text-[var(--fg)]">
                Sitemap
              </Link>
            </li>
            <li>
              <Link href="/llms.txt" className="text-[var(--muted)] hover:text-[var(--fg)]">
                llms.txt
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="container-page flex flex-col items-start justify-between gap-3 border-t py-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center"
        style={{ borderColor: "var(--border)" }}
      >
        <p>
          © {new Date().getFullYear()} {site.name}. La vigne se cultive, le vin se partage.
        </p>
        <p>L'abus d'alcool est dangereux pour la santé. À consommer avec modération.</p>
      </div>
    </footer>
  );
}
