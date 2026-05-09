import type { ReactNode } from "react";

export function KeyTakeaway({
  title = "À retenir",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside
      className="not-prose my-8 rounded-2xl p-5 sm:p-6"
      style={{
        backgroundColor: "color-mix(in srgb, var(--accent) 8%, var(--surface))",
        borderLeft: "3px solid var(--accent)",
      }}
    >
      <p className="mb-2 font-display text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
        {title}
      </p>
      <div className="text-sm leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:my-2 [&>ul]:pl-5 [&>ul>li]:list-disc [&>ul>li]:mb-1">
        {children}
      </div>
    </aside>
  );
}
