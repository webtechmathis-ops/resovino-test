export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="img"
    >
      {/* Stylised wine glass + droplet */}
      <defs>
        <linearGradient id="rv-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-bordeaux-500)" />
          <stop offset="100%" stopColor="var(--color-bordeaux-800)" />
        </linearGradient>
      </defs>
      <path
        d="M9 4h14l-1.2 8.4a6.8 6.8 0 0 1-13.6 0L7 4h2z"
        fill="url(#rv-grad)"
      />
      <path d="M13 22h6v2h-2v4h-2v-4h-2v-2z" fill="var(--color-bordeaux-700)" />
      <circle cx="16" cy="11" r="1.6" fill="var(--color-gold-500)" />
    </svg>
  );
}
