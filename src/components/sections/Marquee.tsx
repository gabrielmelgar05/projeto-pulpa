"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Fragment, useRef } from "react";
import { PulpaSymbol } from "@/components/ui/PulpaSymbol";
import { FruitArt } from "@/components/ui/FruitArt";
import { Sparkle } from "@/components/ui/Decor";
import { FRAGRANCES } from "@/data/fragrances";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";



function Band({ inverse = false }: { inverse?: boolean }) {
  const { messages } = useLanguage();
  const PHRASES = messages.marquee;
  // Content is duplicated once so the loop can wrap seamlessly at -50%.
  const items = [0, 1, 2, 3];
  return (
    <div data-marquee-track className="flex w-max items-center will-change-transform">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
          {items.map((i) => (
            <Fragment key={i}>
              <span className="t-display px-[0.35em] text-[clamp(2.6rem,7vw,6.5rem)] leading-none">
                {PHRASES[(i + (inverse ? 1 : 0)) % 2]}
              </span>
              {inverse ? (
                <Sparkle className="h-[clamp(1.6rem,3.5vw,3rem)] w-auto shrink-0 text-sola" />
              ) : i % 2 ? (
                <PulpaSymbol className="h-[clamp(2.4rem,5vw,4.5rem)] w-auto shrink-0 text-rubra" />
              ) : (
                <span className="grid h-[clamp(3rem,6vw,5.5rem)] w-[clamp(3rem,6vw,5.5rem)] shrink-0 place-items-center rounded-full bg-ivory">
                  <FruitArt kind={FRAGRANCES[i % 4].fruitKind} className="h-[72%] w-[72%]" />
                </span>
              )}
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Section 02 — two crossing ribbons of type, looping in opposite directions. */
export function Marquee() {
  const { messages, locale } = useLanguage();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const tracks = gsap.utils.toArray<HTMLElement>("[data-marquee-track]", root.current);
        const loops = tracks.map((track, i) =>
          gsap.fromTo(
            track,
            { xPercent: i % 2 ? -50 : 0 },
            { xPercent: i % 2 ? 0 : -50, duration: 38, ease: "none", repeat: -1 },
          ),
        );
        // Scroll velocity briefly speeds the ribbons up.
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate(self) {
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 600, 4);
            loops.forEach((l) => {
              gsap.to(l, { timeScale: boost, duration: 0.2, overwrite: true });
              gsap.to(l, { timeScale: 1, duration: 1.2, delay: 0.2, ease: "power2.out" });
            });
          },
          onToggle(self) {
            loops.forEach((l) => (self.isActive ? l.resume() : l.pause()));
          },
        });
        loops.forEach((loop) => loop.paused(!ScrollTrigger.isInViewport(root.current!)));
        return () => st.kill();
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [locale], revertOnUpdate: true },
  );

  return (
    <section
      ref={root}
      aria-label={messages.marquee.join(" — ")}
      className="relative z-10 -mt-6 overflow-hidden py-14 sm:py-20"
    >
      <div className="relative -rotate-[2.5deg] scale-x-[1.06] bg-rubra py-4 text-ivory sm:py-5">
        <Band inverse />
      </div>
      <div className="relative -mt-8 rotate-[1.8deg] scale-x-[1.06] bg-sola py-4 text-charcoal shadow-[0_24px_50px_-28px_rgba(32,31,28,.5)] sm:-mt-10 sm:py-5">
        <Band />
      </div>
    </section>
  );
}
