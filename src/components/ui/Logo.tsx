import { PulpaSymbol } from "@/components/ui/PulpaSymbol";

/**
 * Horizontal lock-up: symbol + "PULPA" wordmark.
 * Symbol and wordmark share one colour (currentColor) and one weight, so they
 * read as a single mark — the wordmark's heavy, rounded geometry echoes the
 * symbol's solid curves; its cap height matches the pineapple's body.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`pulpa-logo ${className}`}>
      <PulpaSymbol className="pulpa-logo__symbol" />
      <Wordmark className="pulpa-logo__wordmark" />
    </span>
  );
}

/** The "PULPA" wordmark — heavy geometric sans set tight, to match the symbol's weight. */
export function Wordmark({ className = "", split = false }: { className?: string; split?: boolean }) {
  if (!split) return <span className={`t-wordmark leading-none ${className}`}>PULPA</span>;
  return (
    <span className={`t-wordmark inline-flex leading-none ${className}`} aria-label="PULPA">
      {"PULPA".split("").map((c, i) => (
        <span key={i} data-wordmark-char aria-hidden className="inline-block">
          {c}
        </span>
      ))}
    </span>
  );
}
