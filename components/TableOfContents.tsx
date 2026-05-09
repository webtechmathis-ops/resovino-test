"use client";

import { useEffect, useState } from "react";

type Heading = { id: string; text: string; level: number };

export function TableOfContents({ source }: { source: string }) {
  const headings = extractHeadings(source);
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="Sommaire" className="text-sm">
      <p className="mb-3 font-display text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
        Sommaire
      </p>
      <ul className="space-y-1.5 border-l border-[var(--border)]">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? 16 : 0 }}>
            <a
              href={`#${h.id}`}
              className={`-ml-px block border-l-2 py-1 pl-3 transition ${
                activeId === h.id
                  ? "border-[var(--accent)] text-[var(--fg)]"
                  : "border-transparent text-[var(--muted)] hover:text-[var(--fg)]"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function extractHeadings(source: string): Heading[] {
  const re = /^(#{2,3})\s+(.+?)\s*$/gm;
  const out: Heading[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(source)) !== null) {
    const level = m[1].length;
    const text = m[2].replace(/[`*_]/g, "").trim();
    const id = slugify(text);
    out.push({ id, text, level });
  }
  return out;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
