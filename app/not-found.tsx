import Link from "next/link";
import { categories } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="font-display text-7xl font-semibold text-[var(--brand)]">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold">Cette bouteille n'existe pas</h1>
      <p className="mt-3 mx-auto max-w-md text-[var(--muted)]">
        La page demandée est introuvable. Retournez à la cave principale ou explorez les
        catégories ci-dessous.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Accueil
        </Link>
        <Link href="/blog/" className="btn btn-ghost">
          Tous les articles
        </Link>
      </div>
      <div className="mt-14">
        <h2 className="font-display text-xl font-semibold">Explorer par catégorie</h2>
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-3xl mx-auto">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/${c.slug}/`}
                className="block rounded-xl border border-[var(--border)] px-4 py-3 text-left transition hover:border-[var(--brand)] hover:bg-[var(--surface-2)]"
              >
                <div className="font-display font-semibold">{c.name}</div>
                <div className="mt-1 text-sm text-[var(--muted)]">{c.description}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
