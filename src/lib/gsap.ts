"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 1 });
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** Shared media queries for gsap.matchMedia(). */
export const MQ = {
  desktop: "(min-width: 1024px)",
  mobile: "(max-width: 1023.98px)",
  motion: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
  finePointer: "(hover: hover) and (pointer: fine)",
} as const;

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia(MQ.reduced).matches;
}

/** Continuous decorative motion uses no animation time while off screen. */
export function pauseOutsideViewport(animation: gsap.core.Animation, trigger: Element) {
  animation.paused(!ScrollTrigger.isInViewport(trigger));
  return ScrollTrigger.create({
    trigger, start: "top bottom", end: "bottom top",
    onToggle: (self) => { animation.paused(!self.isActive); },
  });
}

export { gsap, ScrollTrigger, ScrollToPlugin, SplitText, useGSAP };
