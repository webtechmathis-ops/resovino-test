"use client";

import { useMemo, useState } from "react";

export type Pairing = {
  item: string;
  category?: string;
  wine: string;
  appellation?: string;
  why: string;
};

export function PairingFinder({
  pairings,
  label = "un mets ou un vin",
  title = "Trouvez votre accord",
}: {
  pairings: Pairing[];
  label?: string;
  title?: string;
}) {
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const p of pairings) if (p.category) set.add(p.category);
    return Array.from(set);
  }, [pairings]);

  const normalized = q.trim().toLowerCase();

  const filtered = useMemo(() => {
    return pairings.filter((p) => {
      if (activeCat && p.category !== activeCat) return false;
      if (!normalized) return true;
      const hay = `${p.item} ${p.category ?? ""} ${p.wine} ${p.appellation ?? ""} ${p.why}`.toLowerCase();
      return hay.includes(normalized);
    });
  }, [pairings, activeCat, normalized]);

  return (
    <div className="not-prose my-10 surface rounded-2xl p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        <span className="text-xs text-[var(--muted)]">
          {filtered.length} / {pairings.length} accords
        </span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Rechercher</span>
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Filtrer par ${label}…`}
            className="w-full rounded-full border border-[var(--border)] bg-[var(--bg)] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[var(--brand)]"
          />
        </label>
      </div>

      {categories.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCat(null)}
            className={`chip cursor-pointer ${activeCat === null ? "chip-active" : ""}`}
          >
            Toutes
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCat(cat === activeCat ? null : cat)}
              className={`chip cursor-pointer ${activeCat === cat ? "chip-active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="mt-5 overflow-hidden rounded-xl border border-[var(--border)]">
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: "var(--surface-2)" }}>
            <tr className="text-left text-xs uppercase tracking-wider text-[var(--muted)]">
              <th className="px-4 py-3 font-semibold">Mets</th>
              <th className="px-4 py-3 font-semibold">Vin recommandé</th>
              <th className="hidden px-4 py-3 font-semibold md:table-cell">Pourquoi ça marche</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-[var(--muted)]">
                  Aucun accord ne correspond à « {q} ».
                </td>
              </tr>
            )}
            {filtered.map((p, i) => (
              <tr
                key={`${p.item}-${i}`}
                className="border-t border-[var(--border)] align-top"
              >
                <td className="px-4 py-3">
                  <div className="font-medium">{p.item}</div>
                  {p.category && (
                    <div className="mt-0.5 text-xs text-[var(--muted)]">{p.category}</div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-[var(--brand)]">{p.wine}</div>
                  {p.appellation && (
                    <div className="mt-0.5 text-xs text-[var(--muted)]">{p.appellation}</div>
                  )}
                </td>
                <td className="hidden px-4 py-3 text-[var(--muted)] md:table-cell">{p.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-[var(--muted)]">
        Astuce : commencez par votre cépage favori, le mode de cuisson ou la famille de mets.
      </p>
    </div>
  );
}
