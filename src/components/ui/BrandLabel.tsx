import { useId } from "react";
import type { AssetId } from "@/types";

const LABELS: Partial<Record<AssetId, { x: number; y: number; radius: number; offset: number }>> = {
  "fragrance-bottle-sola": { x: 730, y: 886, radius: 10, offset: 22 },
  "fragrance-bottle-rubra": { x: 730, y: 885, radius: 10, offset: 22 },
  "fragrance-bottle-marea": { x: 733, y: 885, radius: 10, offset: 22 },
  "fragrance-bottle-vera": { x: 733, y: 886, radius: 10, offset: 22 },
  "philosophy-editorial": { x: 661, y: 537, radius: 6, offset: 12 },
};

/** Remove only the printed wordmark's old full stop at display time. A tiny
 * SVG window samples adjacent glass from the same photograph. All original
 * image files, bottle geometry, typography and the pineapple stay untouched.
 */
export function BrandLabel({ assetId, src }: { assetId: AssetId; src: string }) {
  const uid = useId().replace(/:/g, "");
  const patch = LABELS[assetId];
  if (!patch) return null;
  return (
    <svg viewBox="0 0 1120 1400" preserveAspectRatio="xMidYMax meet"
      className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
      <defs><clipPath id={`brand-${uid}`}><circle cx={patch.x} cy={patch.y} r={patch.radius} /></clipPath></defs>
      <g clipPath={`url(#brand-${uid})`}>
        <image href={src} x={-patch.offset} width="1120" height="1400" />
      </g>
    </svg>
  );
}
