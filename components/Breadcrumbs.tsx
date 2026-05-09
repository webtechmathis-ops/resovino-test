import Link from "next/link";

export type Crumb = { name: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-xs text-[var(--muted)]">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {it.href && !isLast ? (
                <Link href={it.href} className="hover:text-[var(--fg)]">
                  {it.name}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="text-[var(--fg)]">
                  {it.name}
                </span>
              )}
              {!isLast && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
