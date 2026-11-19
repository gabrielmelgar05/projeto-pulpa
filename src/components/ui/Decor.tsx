/**
 * PULPA graphic language — organic 2D shapes from the identity board:
 * waves, scallops, drops, sparkles, leaves. Colour via `currentColor`.
 */

type DecorProps = { className?: string };

export function Sparkle({ className = "" }: DecorProps) {
  return (
    <svg data-decor="sparkle" viewBox="-2 -2 104 104" className={className} aria-hidden fill="currentColor">
      <path d="M50 0C54 34 66 46 100 50 66 54 54 66 50 100 46 66 34 54 0 50 34 46 46 34 50 0Z" />
    </svg>
  );
}

export function Drop({ className = "" }: DecorProps) {
  return (
    <svg data-decor="drop" viewBox="0 0 100 106" className={className} aria-hidden fill="currentColor">
      <path d="M50 4S86 48 86 66a36 36 0 0 1-72 0C14 48 50 4 50 4Z" />
    </svg>
  );
}

export function Splash({ className = "" }: DecorProps) {
  return (
    <svg data-decor="splash" viewBox="0 0 120 120" className={className} aria-hidden fill="currentColor">
      <path d="M58 14S82 50 82 66a24 24 0 0 1-48 0c0-16 24-52 24-52Z" />
      <path d="M22 24s12 16 12 24a12 12 0 0 1-24 0c0-8 12-24 12-24Z" transform="rotate(-22 22 40)" />
      <circle cx="98" cy="38" r="9" />
      <circle cx="96" cy="94" r="6" />
    </svg>
  );
}

export function Leaf({ className = "" }: DecorProps) {
  return (
    <svg data-decor="leaf" viewBox="0 0 100 100" className={className} aria-hidden>
      <path d="M8 92C8 40 46 8 94 6c0 52-34 86-86 86Z" fill="currentColor" />
      <path d="M12 88C36 62 60 36 88 12" stroke="#F6F1E8" strokeOpacity=".55" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Four-lobed flower — echoes the berry shape in the identity board. */
export function Flower({ className = "" }: DecorProps) {
  return (
    <svg data-decor="flower" viewBox="0 0 100 100" className={className} aria-hidden fill="currentColor">
      <circle cx="50" cy="27" r="25" />
      <circle cx="73" cy="50" r="25" />
      <circle cx="50" cy="73" r="25" />
      <circle cx="27" cy="50" r="25" />
      <circle cx="50" cy="50" r="26" />
    </svg>
  );
}

/** Scalloped berry badge (8 lobes). */
export function Scallop({ className = "" }: DecorProps) {
  const lobes = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    return [50 + Math.cos(a) * 30, 50 + Math.sin(a) * 30] as const;
  });
  return (
    <svg data-decor="scallop" viewBox="0 0 100 100" className={className} aria-hidden fill="currentColor">
      <circle cx="50" cy="50" r="34" />
      {lobes.map(([x, y], i) => (
        <circle key={i} cx={x.toFixed(2)} cy={y.toFixed(2)} r="17" />
      ))}
    </svg>
  );
}

export function Blob({ className = "", variant = 0 }: DecorProps & { variant?: 0 | 1 | 2 }) {
  const paths = [
    "M46 4c22-3 44 10 50 32 6 21-4 44-24 54-21 10-48 8-62-10C-4 62 2 38 14 22 22 11 33 6 46 4Z",
    "M54 2c20 4 34 18 40 36 7 22-2 46-22 56S28 100 14 84C0 68-2 42 10 24 20 9 36-2 54 2Z",
    "M30 8C48-2 70 2 84 16s20 38 10 56C84 90 60 100 40 94 18 88 2 70 2 48 2 30 14 16 30 8Z",
  ];
  return (
    <svg data-decor="blob" viewBox="-4 -4 108 108" className={className} aria-hidden fill="currentColor" preserveAspectRatio="xMidYMid meet">
      <path d={paths[variant]} />
    </svg>
  );
}

/** Thick brush-like wave ribbon from the identity's pattern panel. */
export function WaveRibbon({ className = "" }: DecorProps) {
  return (
    <svg viewBox="0 0 400 160" className={className} aria-hidden fill="none" preserveAspectRatio="none" data-decor="wave">
      <path d="M28 108C80 28 126 24 190 78S304 144 372 52" stroke="currentColor" strokeWidth="40" strokeLinecap="round" />
    </svg>
  );
}

export function Squiggle({ className = "" }: DecorProps) {
  return (
    <svg data-decor="squiggle" viewBox="0 0 200 40" className={className} aria-hidden fill="none" stroke="currentColor">
      <path d="M4 20c16-18 32-18 48 0s32 18 48 0 32-18 48 0 32 18 48 0" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

/** Full-width section edge: a soft wave that overlaps the previous section. */
export function WaveEdge({ className = "", flip = false }: DecorProps & { flip?: boolean }) {
  return (
    <svg data-decor="edge"
      viewBox="0 0 1440 120"
      className={className}
      aria-hidden
      fill="currentColor"
      preserveAspectRatio="none"
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <path d="M0 120V64C120 24 260 0 420 18s300 78 470 74 300-74 430-80c50-2 90 4 120 12v96Z" />
    </svg>
  );
}
