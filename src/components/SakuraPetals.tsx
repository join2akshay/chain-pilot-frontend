import { useMemo } from "react";

interface Props {
  count?: number;
  className?: string;
}

export function SakuraPetals({ count = 24, className = "" }: Props) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        // Petals originate from the left (tree area) and drift to the right.
        const top = 5 + Math.random() * 80; // vertical start within hero
        const startLeft = -5 + Math.random() * 25; // start on left side
        const delay = Math.random() * 14;
        const duration = 9 + Math.random() * 16; // varied speeds → parallax
        const drift = -80 + (Math.random() - 0.5) * 160; // vertical sway
        const size = 6 + Math.random() * 16;
        const rotate = Math.random() * 360;
        const opacity = 0.45 + Math.random() * 0.5;
        const blur = Math.random() < 0.35 ? 1.2 : 0; // motion-blur depth
        return { i, top, startLeft, delay, duration, drift, size, rotate, opacity, blur };
      }),
    [count],
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {petals.map((p) => (
        <span
          key={p.i}
          className="petal"
          style={{
            top: `${p.top}%`,
            left: `${p.startLeft}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            filter: p.blur ? `blur(${p.blur}px) drop-shadow(0 0 6px oklch(0.85 0.18 340 / 0.6))` : undefined,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ["--rot" as string]: `${p.rotate}deg`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}