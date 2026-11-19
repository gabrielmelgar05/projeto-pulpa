"use client";

import type { FragranceId } from "@/types";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Tiny cross-section event bus. Sections stay decoupled: the hero, the
 * collection rail and the final CTA talk through window CustomEvents.
 */
export const EVENTS = {
  /** Scroll to a fragrance inside The Collection. */
  gotoFragrance: "pulpa:goto-fragrance",
  /** Put a fragrance in the hero spotlight (scrolls to top). */
  spotlightFragrance: "pulpa:spotlight-fragrance",
} as const;

export type FragranceEventDetail = { id: FragranceId };

export function gotoFragrance(id: FragranceId) {
  window.dispatchEvent(new CustomEvent<FragranceEventDetail>(EVENTS.gotoFragrance, { detail: { id } }));
}

export function spotlightFragrance(id: FragranceId) {
  window.dispatchEvent(
    new CustomEvent<FragranceEventDetail>(EVENTS.spotlightFragrance, { detail: { id } }),
  );
}

/** Smooth scroll to a Y position or element, honouring reduced motion. */
export function smoothScrollTo(target: number | Element | string, onComplete?: () => void) {
  const reduced = prefersReducedMotion();
  const y =
    typeof target === "number"
      ? target
      : typeof target === "string"
        ? document.querySelector(target)
        : target;
  if (y === null) return;
  gsap.to(window, {
    scrollTo: { y, autoKill: true },
    duration: reduced ? 0 : 1.4,
    ease: "power3.inOut",
    overwrite: true,
    onComplete,
  });
}
