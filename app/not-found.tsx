import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center justify-center py-32 text-center">
      <p className="font-display text-7xl font-semibold text-[var(--brand)]">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold">Cette bouteille n'existe pas</h1>
      <p className="mt-3 max-w-md text-[var(--muted)]">
        La page demandée est introuvable. Retournez à la cave principale ou explorez nos articles.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Accueil
        </Link>
        <Link href="/blog" className="btn btn-ghost">
          Tous les articles
        </Link>
      </div>
    </div>
  );
}
