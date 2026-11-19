import { useId } from "react";
import { PulpaSymbol } from "@/components/ui/PulpaSymbol";

/** Circular text badge with the PULPA symbol at its centre. Rotation is driven by GSAP (data-rotate). */
export function RotatingBadge({
  text = "WEAR YOUR WILD SIDE • PULPA PARFUMS • ",
  className = "",
  ringClassName = "",
}: {
  text?: string;
  className?: string;
  ringClassName?: string;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden>
      <svg viewBox="0 0 200 200" className={`absolute inset-0 h-full w-full ${ringClassName}`} data-rotate>
        <defs>
          <path id={`c-${id}`} d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0" />
        </defs>
        <text style={{ font: "700 15px var(--font-display)", letterSpacing: "0.32em" }} fill="currentColor">
          <textPath href={`#c-${id}`}>{text}</textPath>
        </text>
      </svg>
      <PulpaSymbol className="absolute left-1/2 top-1/2 h-[34%] w-auto -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
