import { PULPA_SYMBOL_PATHS, PULPA_SYMBOL_VIEWBOX, type PulpaSymbolPiece } from "@/data/brand-symbol";

const ORDER: PulpaSymbolPiece[] = ["leafCenter", "leafLeft", "leafRightBandTop", "bandMiddle", "bandBottom"];

interface PulpaSymbolProps {
  className?: string;
  /** Accessible title. Omit when the symbol is decorative or labelled elsewhere. */
  title?: string;
}

/**
 * The official PULPA. pineapple symbol (vector trace of the supplied logo).
 * Colour follows `currentColor`, so it can be applied in ivory, charcoal or any brand colour.
 * Each piece carries `data-piece` so the preloader can animate it without altering the drawing.
 */
export function PulpaSymbol({ className, title }: PulpaSymbolProps) {
  return (
    <svg
      viewBox={PULPA_SYMBOL_VIEWBOX}
      className={className}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {ORDER.map((piece) => (
        <path key={piece} d={PULPA_SYMBOL_PATHS[piece]} data-piece={piece} />
      ))}
    </svg>
  );
}
