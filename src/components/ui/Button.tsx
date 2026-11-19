"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

type Variant = "dark" | "light" | "glass" | "outline";

const VARIANTS: Record<Variant, string> = {
  dark: "bg-charcoal text-ivory",
  light: "bg-ivory text-charcoal",
  glass: "glass text-charcoal",
  outline: "border border-current text-current bg-transparent",
};

const ARROW_VARIANTS: Record<Variant, string> = {
  dark: "bg-ivory text-charcoal",
  light: "bg-charcoal text-ivory",
  glass: "bg-charcoal text-ivory",
  outline: "bg-current",
};

interface ButtonProps {
  children: string;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: "md" | "lg";
  arrow?: "right" | "down" | "none";
  magnetic?: boolean;
  className?: string;
  ariaLabel?: string;
}

/**
 * Pill button with a rolling label and an arrow bubble.
 * Optional magnetic pull on fine pointers (GSAP quickTo, transform only).
 */
export function Button({
  children,
  href,
  onClick,
  variant = "dark",
  size = "md",
  arrow = "right",
  magnetic = false,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  useGSAP(
    () => {
      if (!magnetic || !ref.current) return;
      const mm = gsap.matchMedia();
      mm.add(`${MQ.finePointer} and ${MQ.motion}`, () => {
        const el = ref.current!;
        const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        };
      });
      return () => mm.revert();
    },
    { dependencies: [magnetic], revertOnUpdate: true },
  );

  const pad = size === "lg" ? "h-14 pl-7 pr-2 text-[0.95rem]" : "h-12 pl-6 pr-1.5 text-sm";
  const bubble = size === "lg" ? "h-10 w-10" : "h-9 w-9";
  const classes = `group relative inline-flex items-center gap-4 rounded-full font-display font-semibold tracking-[0.02em] transition-[background-color,color,box-shadow] duration-500 hover:shadow-[0_12px_30px_-12px_rgba(32,31,28,.45)] ${VARIANTS[variant]} ${pad} ${arrow === "none" ? "pr-6" : ""} ${className}`;

  const content: ReactNode = (
    <>
      <span className="roll">
        <span>{children}</span>
        <span aria-hidden>{children}</span>
      </span>
      {arrow !== "none" && (
        <span
          aria-hidden
          className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full ${bubble} ${ARROW_VARIANTS[variant]}`}
        >
          <ArrowIcon direction={arrow} />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a ref={ref} href={href} onClick={onClick} className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }
  return (
    <button ref={ref} type="button" onClick={onClick} className={classes} aria-label={ariaLabel}>
      {content}
    </button>
  );
}

function ArrowIcon({ direction }: { direction: "right" | "down" }) {
  const rot = direction === "down" ? "rotate-90" : "";
  return (
    <span className={`relative block h-4 w-4 ${rot}`}>
      {[0, 1].map((i) => (
        <svg
          key={i}
          viewBox="0 0 16 16"
          className={`absolute inset-0 h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] ${
            i === 0 ? "group-hover:translate-x-[160%]" : "-translate-x-[160%] group-hover:translate-x-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
        </svg>
      ))}
    </span>
  );
}
