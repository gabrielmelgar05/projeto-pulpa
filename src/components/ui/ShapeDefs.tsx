/**
 * Shared SVG clip-paths (objectBoundingBox → they stretch to any element).
 * Use with `style={{ clipPath: "url(#clip-flower)" }}` or the SHAPE_CLIP map.
 * Rendered once in the page.
 */
export const SHAPE_CLIP = {
  flower: "url(#clip-flower)",
  blob: "url(#clip-blob)",
  scallop: "url(#clip-scallop)",
  leaf: "url(#clip-leaf)",
} as const;

const scallopLobes = Array.from({ length: 10 }, (_, i) => {
  const a = (i / 10) * Math.PI * 2;
  return [0.5 + Math.cos(a) * 0.36, 0.5 + Math.sin(a) * 0.36] as const;
});

export function ShapeDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
      <defs>
        <clipPath id="clip-flower" clipPathUnits="objectBoundingBox">
          <circle cx="0.5" cy="0.26" r="0.26" />
          <circle cx="0.74" cy="0.5" r="0.26" />
          <circle cx="0.5" cy="0.74" r="0.26" />
          <circle cx="0.26" cy="0.5" r="0.26" />
          <circle cx="0.5" cy="0.5" r="0.3" />
        </clipPath>
        <clipPath id="clip-blob" clipPathUnits="objectBoundingBox">
          <path d="M.46.02C.68-.01.9.12.96.34c.06.22-.04.46-.22.56C.53 1.01.25.99.11.8-.04.6.01.36.13.2.22.09.33.04.46.02Z" />
        </clipPath>
        <clipPath id="clip-scallop" clipPathUnits="objectBoundingBox">
          <circle cx="0.5" cy="0.5" r="0.38" />
          {scallopLobes.map(([x, y], i) => (
            <circle key={i} cx={x.toFixed(4)} cy={y.toFixed(4)} r="0.14" />
          ))}
        </clipPath>
        <clipPath id="clip-leaf" clipPathUnits="objectBoundingBox">
          <path d="M.04.96C.04.42.42.04.96.04.96.58.58.96.04.96Z" />
        </clipPath>
      </defs>
    </svg>
  );
}
