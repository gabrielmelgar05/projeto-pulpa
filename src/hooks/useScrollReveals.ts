"use client";

import type { RefObject } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { gsap, MQ, ScrollTrigger, SplitText, useGSAP, pauseOutsideViewport } from "@/lib/gsap";

/** Reveals restart on entry in either direction and reset only after the whole
 * section has left the viewport. Localized split targets have locale keys so
 * old SplitText instances clean up detached nodes, not the new translation.
 */
export function useScrollReveals(scope: RefObject<HTMLElement | null>) {
  const { locale } = useLanguage();
  useGSAP(() => {
    const root = scope.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const q = gsap.utils.selector(root);
      const reveals = new Map<HTMLElement, gsap.core.Tween>();
      const replay = (animation: gsap.core.Tween, element: HTMLElement, start: string) => {
        reveals.set(element, animation);
        ScrollTrigger.create({
          animation, trigger: element, start, end: "bottom top",
          toggleActions: "restart none restart none",
        });
        return animation;
      };
      q<HTMLElement>('[data-reveal="lines"], [data-reveal="chars"]').forEach((element) => {
        const chars = element.dataset.reveal === "chars";
        SplitText.create(element, {
          type: chars ? "lines,chars" : "lines", mask: "lines", linesClass: "split-line", autoSplit: true,
          onSplit(self) {
            return replay(gsap.from(chars ? self.chars : self.lines, {
              paused: true, yPercent: 115, rotate: chars ? 6 : 0,
              duration: chars ? 1.1 : 1.3, stagger: chars ? 0.025 : 0.09, ease: "expo.out",
            }), element, "top 88%");
          },
        });
      });
      q<HTMLElement>('[data-reveal="fade"], [data-reveal="pop"]').forEach((element) => {
        const pop = element.dataset.reveal === "pop";
        replay(gsap.from(element, {
          paused: true, ...(pop ? { scale: 0, rotate: gsap.utils.random(-25, 25) } : { autoAlpha: 0, y: 28 }),
          duration: 1.1, ease: pop ? "back.out(1.8)" : "power3.out", delay: Number(element.dataset.delay ?? 0),
        }), element, pop ? "top 92%" : "top 90%");
      });
      q<HTMLElement>('[data-reveal="words-scrub"]').forEach((element) => {
        SplitText.create(element, {
          type: "words", autoSplit: true,
          onSplit(self) {
            return gsap.fromTo(self.words, { opacity: 0.16 }, {
              opacity: 1, ease: "none", stagger: 0.12,
              scrollTrigger: { trigger: element, start: "top 78%", end: "bottom 42%", scrub: 0.6 },
            });
          },
        });
      });
      ScrollTrigger.create({
        trigger: root, start: "top bottom", end: "bottom top",
        onLeave: () => reveals.forEach((animation) => animation.pause(0)),
        onLeaveBack: () => reveals.forEach((animation) => animation.pause(0)),
      });
      q<HTMLElement>("[data-speed]").forEach((element) => {
        const speed = Number(element.dataset.speed);
        gsap.fromTo(element, { yPercent: speed * 40 }, {
          yPercent: speed * -40, ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
      q<SVGElement>("[data-rotate]").forEach((element) => {
        pauseOutsideViewport(gsap.to(element, {
          rotate: 360, duration: 22, ease: "none", repeat: -1, transformOrigin: "50% 50%",
        }), root);
      });
      q<HTMLElement>("[data-float]").forEach((element, index) => {
        pauseOutsideViewport(gsap.to(element, {
          y: gsap.utils.random(-14, -6), rotate: `+=${gsap.utils.random(-8, 8)}`,
          duration: gsap.utils.random(2.6, 3.8), ease: "sine.inOut", yoyo: true, repeat: -1, delay: index * 0.2,
        }), root);
      });
    });
    return () => mm.revert();
  }, { scope, dependencies: [locale], revertOnUpdate: true });
}
