"use client";

import Link from "next/link";
import { categories } from "@/lib/site";

export function CategoryFilter({ active }: { active?: string }) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-2"
      role="tablist"
      aria-label="Filtres par catégorie"
    >
      <Link
        href="/blog"
        role="tab"
        aria-selected={!active}
        className={`chip whitespace-nowrap ${!active ? "chip-active" : ""}`}
      >
        Tous
      </Link>
      {categories.map((c) => (
        <Link
          key={c.slug}
          href={`/${c.slug}`}
          role="tab"
          aria-selected={active === c.slug}
          className={`chip whitespace-nowrap ${active === c.slug ? "chip-active" : ""}`}
        >
          {c.name}
        </Link>
      ))}
    </div>
  );
}
