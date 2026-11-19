import { useId } from "react";
import { PULPA_SYMBOL_PATHS } from "@/data/brand-symbol";
import type { Fragrance } from "@/types";

/**
 * Vector stand-in for the bottle packshot (same 4:5 frame as the final image).
 * Mirrors the identity's flacon: square heavy glass, black cylindrical cap,
 * ivory label with the official symbol. Replaced automatically by the real
 * `fragrance-bottle-*` image once it exists.
 */
export function BottleArt({ fragrance, className = "" }: { fragrance: Fragrance; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const { base, deep, soft } = fragrance.palette;
  const symbolScale = 40 / 938;
  const symbolX = 200 - (330 + 297) * symbolScale;
  const symbolY = 236 - 146 * symbolScale;

  return (
    <svg viewBox="0 0 400 500" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id={`cap-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#3a3833" />
          <stop offset=".35" stopColor="#1a1917" />
          <stop offset=".7" stopColor="#2d2b27" />
          <stop offset="1" stopColor="#0f0e0d" />
        </linearGradient>
        <linearGradient id={`glass-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor={deep} />
          <stop offset=".22" stopColor={base} />
          <stop offset=".6" stopColor={base} />
          <stop offset=".88" stopColor={soft} stopOpacity=".95" />
          <stop offset="1" stopColor={deep} />
        </linearGradient>
        <linearGradient id={`liquid-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".32" />
          <stop offset=".25" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor={deep} stopOpacity=".35" />
        </linearGradient>
        <radialGradient id={`shadow-${uid}`}>
          <stop offset="0" stopColor="#201F1C" stopOpacity=".38" />
          <stop offset="1" stopColor="#201F1C" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* contact shadow */}
      <ellipse cx="200" cy="482" rx="150" ry="16" fill={`url(#shadow-${uid})`} />

      {/* cap */}
      <rect x="146" y="22" width="108" height="104" rx="10" fill={`url(#cap-${uid})`} />
      <ellipse cx="200" cy="24" rx="54" ry="7" fill="#45423c" />
      <rect x="160" y="36" width="6" height="82" rx="3" fill="#fff" opacity=".12" />
      {/* collar */}
      <rect x="170" y="124" width="60" height="18" rx="3" fill="#2a2925" />
      <rect x="170" y="124" width="60" height="4" fill="#fff" opacity=".12" />

      {/* glass body */}
      <rect x="84" y="140" width="232" height="336" rx="26" fill={`url(#glass-${uid})`} />
      <rect x="98" y="156" width="204" height="296" rx="16" fill={`url(#liquid-${uid})`} />
      <rect x="84" y="140" width="232" height="336" rx="26" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="2" />
      {/* thick glass base */}
      <rect x="92" y="452" width="216" height="18" rx="9" fill="#fff" opacity=".18" />
      {/* specular highlights */}
      <rect x="106" y="166" width="12" height="270" rx="6" fill="#fff" opacity=".42" />
      <rect x="124" y="166" width="4" height="230" rx="2" fill="#fff" opacity=".22" />
      <rect x="292" y="176" width="5" height="250" rx="2.5" fill="#fff" opacity=".3" />

      {/* label */}
      <g transform={`translate(${symbolX} ${symbolY}) scale(${symbolScale})`} fill="#F6F1E8">
        {Object.values(PULPA_SYMBOL_PATHS).map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <text
        x="200"
        y="314"
        textAnchor="middle"
        fill="#F6F1E8"
        style={{ font: "600 19px var(--font-display)", letterSpacing: "0.32em" }}
      >
        PULPA
      </text>
      <line x1="176" y1="332" x2="224" y2="332" stroke="#F6F1E8" strokeOpacity=".6" />
      <text
        x="200"
        y="360"
        textAnchor="middle"
        fill="#F6F1E8"
        style={{ font: "700 16px var(--font-display)", letterSpacing: "0.28em" }}
      >
        {fragrance.name}
      </text>
      <text
        x="200"
        y="382"
        textAnchor="middle"
        fill="#F6F1E8"
        opacity=".85"
        style={{ font: "600 8.5px var(--font-display)", letterSpacing: "0.3em" }}
      >
        EAU DE PARFUM
      </text>
    </svg>
  );
}

/** Stone plinth stand-in for `hero-pedestal` (2:1 frame). */
export function PedestalArt({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 800 400" className={className} aria-hidden focusable="false" preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id={`ped-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#d9cdb8" />
          <stop offset=".45" stopColor="#f1e9dc" />
          <stop offset="1" stopColor="#cbbca4" />
        </linearGradient>
        <linearGradient id={`pedtop-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf7f0" />
          <stop offset="1" stopColor="#e9dfcf" />
        </linearGradient>
      </defs>
      <path d="M40 96 V400 H760 V96 Z" fill={`url(#ped-${uid})`} />
      <ellipse cx="400" cy="96" rx="360" ry="62" fill={`url(#pedtop-${uid})`} />
      <ellipse cx="400" cy="96" rx="360" ry="62" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="2" />
      {[
        [180, 210, 3],
        [520, 170, 2],
        [640, 290, 2.5],
        [300, 330, 2],
        [430, 250, 1.6],
        [110, 300, 2],
        [700, 200, 1.8],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="#a8987e" opacity=".5" />
      ))}
    </svg>
  );
}
