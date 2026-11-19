import { useId, type ReactNode } from "react";
import type { FruitKind } from "@/types";

/**
 * PULPA. illustrated fruit set — flat, refined 2D shapes in brand tones.
 * Used as graphic accents and as stand-ins for the photographic fruit
 * cut-outs until the generated images are added.
 */

type Variant = "primary" | "accent";

interface FruitArtProps {
  kind: FruitKind;
  variant?: Variant;
  className?: string;
}

export function FruitArt({ kind, variant = "primary", className = "" }: FruitArtProps) {
  const uid = useId().replace(/:/g, "");
  const art = ART[kind][variant](uid);
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden focusable="false" overflow="visible">
      {art}
    </svg>
  );
}

/* ── helpers ─────────────────────────────────────────────────── */

function raspberry(cx: number, cy: number, s: number, key: string, calyx = false): ReactNode {
  const rows = [
    { y: -0.55, n: 3 },
    { y: -0.26, n: 4 },
    { y: 0.04, n: 5 },
    { y: 0.34, n: 4 },
    { y: 0.62, n: 3 },
  ];
  const r = s * 0.2;
  const dx = s * 0.33;
  const dots: ReactNode[] = [];
  rows.forEach((row, ri) => {
    for (let i = 0; i < row.n; i++) {
      const x = cx + (i - (row.n - 1) / 2) * dx;
      const y = cy + row.y * s;
      const fill = (i + ri) % 2 ? "#C9506A" : "#BC4358";
      dots.push(
        <g key={`${key}-${ri}-${i}`}>
          <circle cx={x} cy={y} r={r} fill={fill} />
          <circle cx={x - r * 0.32} cy={y - r * 0.36} r={r * 0.3} fill="#F4CDD3" opacity=".75" />
        </g>,
      );
    }
  });
  return (
    <g key={key}>
      <ellipse cx={cx} cy={cy + s * 0.04} rx={s * 0.86} ry={s * 0.92} fill="#7A2135" />
      {dots}
      {calyx && (
        <g fill="#5B7C36">
          {[0, 72, 144, 216, 288].map((a) => (
            <path
              key={a}
              d={`M${cx} ${cy - s * 0.78} q ${s * 0.1} ${-s * 0.22} 0 ${-s * 0.42} q ${-s * 0.1} ${s * 0.2} 0 ${s * 0.42}Z`}
              transform={`rotate(${a - 36} ${cx} ${cy - s * 0.78})`}
            />
          ))}
          <rect x={cx - 2.5} y={cy - s * 1.2} width="5" height={s * 0.42} rx="2.5" fill="#5B7C36" />
        </g>
      )}
    </g>
  );
}

const PAPAYA_SEEDS: [number, number][] = [
  [92, 82], [106, 80], [86, 96], [100, 94], [114, 96], [82, 110], [96, 108], [110, 110], [120, 116],
  [88, 124], [102, 122], [116, 128], [84, 138], [98, 136], [112, 142], [92, 150], [106, 152],
];

/* ── artwork ─────────────────────────────────────────────────── */

const ART: Record<FruitKind, Record<Variant, (uid: string) => ReactNode>> = {
  pineapple: {
    primary: (uid) => (
      <g transform="rotate(-10 100 110)">
        <defs>
          <linearGradient id={`pa-${uid}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#F9DE85" />
            <stop offset=".5" stopColor="#F2CC58" />
            <stop offset="1" stopColor="#D49A2C" />
          </linearGradient>
          <clipPath id={`pc-${uid}`}>
            <ellipse cx="100" cy="134" rx="48" ry="58" />
          </clipPath>
        </defs>
        <path d="M100 80 C88 60 80 40 76 20 C90 38 98 56 104 76Z" fill="#7FA552" />
        <path d="M100 80 C112 60 120 40 124 20 C110 38 102 56 96 76Z" fill="#7FA552" />
        <path d="M98 82 C80 64 66 50 50 44 C70 46 88 58 102 78Z" fill="#5B7C36" />
        <path d="M102 82 C120 64 134 50 150 44 C130 46 112 58 98 78Z" fill="#5B7C36" />
        <path d="M96 86 C78 78 60 74 44 78 C62 66 84 68 100 80Z" fill="#A9C77D" />
        <path d="M104 86 C122 78 140 74 156 78 C138 66 116 68 100 80Z" fill="#A9C77D" />
        <path d="M100 82 C92 56 94 30 100 6 C106 30 108 56 100 82Z" fill="#4C6A2C" />
        <ellipse cx="100" cy="134" rx="48" ry="58" fill={`url(#pa-${uid})`} />
        <g clipPath={`url(#pc-${uid})`} stroke="#C8921F" strokeWidth="2.4" strokeOpacity=".75" fill="none">
          {Array.from({ length: 11 }, (_, i) => (
            <g key={i}>
              <line x1={i * 18 - 20} y1="70" x2={i * 18 + 70} y2="200" />
              <line x1={i * 18 + 20} y1="70" x2={i * 18 - 70} y2="200" />
            </g>
          ))}
        </g>
        <g clipPath={`url(#pc-${uid})`} fill="#B7801A">
          {Array.from({ length: 6 }, (_, r) =>
            Array.from({ length: 7 }, (_, c) => (
              <circle key={`${r}-${c}`} cx={46 + c * 18 + (r % 2) * 9} cy={88 + r * 19.5} r="2.2" />
            )),
          )}
        </g>
        <ellipse cx="80" cy="114" rx="11" ry="26" fill="#fff" opacity=".28" transform="rotate(-14 80 114)" />
      </g>
    ),
    accent: () => (
      <g>
        {[
          { x: 40, y: 64, r: -18, s: 1 },
          { x: 104, y: 40, r: 14, s: 0.86 },
          { x: 92, y: 112, r: 32, s: 1.08 },
        ].map((c, i) => (
          <g key={i} transform={`translate(${c.x} ${c.y}) rotate(${c.r} 28 26) scale(${c.s})`}>
            <rect width="58" height="52" rx="12" fill="#E7B54B" />
            <rect x="4" y="4" width="50" height="38" rx="10" fill="#F7D978" />
            <path d="M12 14 H46 M12 24 H46 M12 34 H40" stroke="#F2CC58" strokeWidth="3" strokeLinecap="round" />
            <rect x="8" y="7" width="14" height="5" rx="2.5" fill="#fff" opacity=".45" />
          </g>
        ))}
      </g>
    ),
  },
  berries: {
    primary: () => (
      <g>
        <path d="M60 70 C50 40 70 18 104 20 C100 44 86 64 60 70Z" fill="#5B7C36" />
        <path d="M70 66 C86 46 92 32 100 22" stroke="#A9C77D" strokeWidth="2" fill="none" />
        <path d="M150 64 C176 50 186 30 176 12 C152 18 140 40 150 64Z" fill="#7FA552" />
        {raspberry(128, 106, 30, "b2", true)}
        {raspberry(76, 120, 34, "b1", true)}
        {raspberry(114, 152, 32, "b3")}
      </g>
    ),
    accent: () => (
      <g>
        {raspberry(100, 112, 50, "a1", true)}
      </g>
    ),
  },
  papaya: {
    primary: (uid) => (
      <g transform="rotate(-22 100 104)">
        <defs>
          <linearGradient id={`ps-${uid}`} x1="0" x2="1">
            <stop offset="0" stopColor="#8DAE5A" />
            <stop offset=".5" stopColor="#D8B54A" />
            <stop offset="1" stopColor="#E99A4A" />
          </linearGradient>
          <radialGradient id={`pf-${uid}`} cx=".45" cy=".42" r=".7">
            <stop offset="0" stopColor="#FFC79C" />
            <stop offset=".55" stopColor="#F2A16E" />
            <stop offset="1" stopColor="#E3773D" />
          </radialGradient>
        </defs>
        <path d="M100 14 C152 14 176 76 172 120 C168 168 138 192 100 192 C62 192 32 168 28 120 C24 76 48 14 100 14Z" fill={`url(#ps-${uid})`} />
        <path d="M100 24 C144 24 164 80 161 120 C158 162 132 182 100 182 C68 182 42 162 39 120 C36 80 56 24 100 24Z" fill={`url(#pf-${uid})`} />
        <path d="M100 62 C124 62 136 96 134 124 C132 150 118 166 100 166 C82 166 68 150 66 124 C64 96 76 62 100 62Z" fill="#C4612F" />
        {PAPAYA_SEEDS.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="6.2" fill="#201F1C" />
            <circle cx={x - 2} cy={y - 2.2} r="1.8" fill="#fff" opacity=".55" />
          </g>
        ))}
        <path d="M60 60 C70 44 84 36 96 34" stroke="#fff" strokeOpacity=".4" strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
    ),
    accent: () => (
      <g transform="rotate(-8 100 100)">
        <path d="M18 96 C40 150 160 150 182 96 C150 118 50 118 18 96Z" fill="#B9B04E" />
        <path d="M26 98 C50 140 150 140 174 98 C146 112 54 112 26 98Z" fill="#F2A16E" />
        <path d="M44 104 C70 116 130 116 156 104" stroke="#C4612F" strokeWidth="9" strokeLinecap="round" fill="none" />
        {[56, 72, 88, 104, 120, 136].map((x, i) => (
          <circle key={x} cx={x + 2} cy={108 + (i % 2 ? 2 : 0)} r="4.4" fill="#201F1C" />
        ))}
        <path d="M60 128 C90 134 120 132 142 124" stroke="#FFD2AE" strokeOpacity=".7" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>
    ),
  },
  apple: {
    primary: (uid) => (
      <g>
        <defs>
          <radialGradient id={`ap-${uid}`} cx=".38" cy=".38" r=".75">
            <stop offset="0" stopColor="#D6EAA8" />
            <stop offset=".5" stopColor="#A9C77D" />
            <stop offset="1" stopColor="#6E9442" />
          </radialGradient>
        </defs>
        <path d="M100 58 C82 44 40 46 34 92 C28 140 62 186 90 182 C96 181 104 181 110 182 C138 186 172 140 166 92 C160 46 118 44 100 58Z" fill={`url(#ap-${uid})`} />
        <path d="M100 62 C100 46 104 34 112 24" stroke="#6B4A2B" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        <path d="M110 40 C122 20 148 18 164 28 C150 44 126 50 110 40Z" fill="#5B7C36" />
        <path d="M114 39 C130 34 146 30 160 29" stroke="#A9C77D" strokeWidth="1.8" fill="none" />
        <ellipse cx="66" cy="94" rx="12" ry="22" fill="#fff" opacity=".35" transform="rotate(18 66 94)" />
        <circle cx="76" cy="66" r="4" fill="#fff" opacity=".45" />
      </g>
    ),
    accent: () => (
      <g transform="rotate(12 100 100)">
        <path d="M100 52 C84 40 46 42 40 84 C34 128 64 168 90 164 C96 163 104 163 110 164 C136 168 166 128 160 84 C154 42 116 40 100 52Z" fill="#8DB35B" />
        <path d="M100 60 C86 50 52 52 48 86 C44 124 70 156 92 154 C97 153 103 153 108 154 C130 156 156 124 152 86 C148 52 114 50 100 60Z" fill="#F4F0CF" />
        <path d="M100 82 L108 100 L126 104 L110 114 L114 132 L100 122 L86 132 L90 114 L74 104 L92 100Z" fill="#E6DFB0" />
        <path d="M95 102 C92 96 94 90 98 88 C101 94 100 100 95 102Z" fill="#4A2E1A" />
        <path d="M105 102 C108 96 106 90 102 88 C99 94 100 100 105 102Z" fill="#4A2E1A" />
      </g>
    ),
  },
};
