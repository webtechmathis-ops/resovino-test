"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categories } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--fg)] transition hover:bg-[var(--surface-2)] md:hidden"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            className="absolute right-0 top-0 h-full w-[86%] max-w-sm overflow-y-auto p-6"
            style={{ backgroundColor: "var(--bg)", borderLeft: "1px solid var(--border)" }}
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display text-lg font-semibold">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-1" aria-label="Catégories">
              <Link
                href="/blog/"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 font-medium hover:bg-[var(--surface-2)]"
              >
                Tous les articles
              </Link>
              <div className="my-2 h-px bg-[var(--border)]" />
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}/`}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 hover:bg-[var(--surface-2)]"
                >
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-[var(--muted)]">{c.description}</div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
