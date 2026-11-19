"use client";

import { useRef } from "react";
import { useLanguage, useFragrances } from "@/components/providers/LanguageProvider";
import { FragranceBottle } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";
import { Flower, Leaf, Sparkle, Splash, WaveRibbon } from "@/components/ui/Decor";
import { useScrollReveals } from "@/hooks/useScrollReveals";
import { gotoFragrance } from "@/lib/events";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/** Fan layout for the four bottles (rotation in deg, vertical drop in % of height). */
const FAN = [
  { rotate: -14, drop: 14 },
  { rotate: -5, drop: 3 },
  { rotate: 5, drop: 3 },
  { rotate: 14, drop: 14 },
];

/** Section 05 — Final CTA: the closing shot of the campaign, on SOLA yellow. */
export function FinalCta() {
  const { messages, locale } = useLanguage();
  const FRAGRANCES = useFragrances();
  const root = useRef<HTMLElement>(null);
  useScrollReveals(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-fan-bottle]",
          { yPercent: 70, rotate: 0 },
          {
            yPercent: (i) => FAN[i].drop,
            rotate: (i) => FAN[i].rotate,
            ease: "power2.out",
            stagger: 0.06,
            scrollTrigger: { trigger: "[data-fan]", start: "top 95%", end: "bottom 85%", scrub: 0.8 },
          },
        );
      });
      mm.add(MQ.reduced, () => {
        gsap.set("[data-fan-bottle]", { yPercent: (i) => FAN[i].drop, rotate: (i) => FAN[i].rotate });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="cta-title" className="relative z-10 -mt-12 overflow-hidden rounded-t-[2.5rem] bg-sola pt-24 text-charcoal sm:rounded-t-[3.5rem] lg:pt-32">
      {/* graphic language from the identity board */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-[6%] -left-[12%] w-[60%] -rotate-6 text-rubra" data-speed="0.3">
          <WaveRibbon className="h-auto w-full" />
        </div>
        <div className="absolute top-[30%] -right-[14%] w-[48%] rotate-[170deg] text-marea" data-speed="-0.2">
          <WaveRibbon className="h-auto w-full" />
        </div>
        <span data-float className="absolute top-[12%] right-[10%] w-[clamp(3rem,6vw,5.5rem)] text-vera">
          <Leaf className="h-auto w-full" />
        </span>
        <span data-float className="absolute bottom-[38%] left-[6%] w-[clamp(2.5rem,4vw,4rem)] text-ivory">
          <Sparkle className="h-auto w-full" />
        </span>
        <span data-float className="absolute bottom-[44%] right-[8%] w-[clamp(3rem,5vw,5rem)] text-rubra">
          <Flower className="h-auto w-full" />
        </span>
        <span data-float className="absolute top-[46%] left-[14%] hidden w-14 text-rubra sm:block">
          <Splash className="h-auto w-full" />
        </span>
      </div>

      <div className="container-x relative flex flex-col items-center text-center">
        <h2 key={locale} id="cta-title" data-reveal="lines" className="t-mega text-[clamp(2rem,10.8vw,12.5rem)]">
          {messages.cta.first}
          <br />
          {messages.cta.second}
        </h2>
        <p data-reveal="fade" className="mt-6 max-w-[42ch] text-[1.05rem] leading-relaxed text-charcoal/80">
          {messages.cta.text}
        </p>
        <div data-reveal="fade" data-delay="0.1" className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="#fragrances" variant="dark" size="lg" magnetic>
            {messages.ui.exploreAll}
          </Button>
          <Button href="#home" variant="outline" size="lg" arrow="none">
            {messages.ui.backToSpotlight}
          </Button>
        </div>
      </div>

      {/* bottle fan — each bottle jumps to its panel in The Collection */}
      <ul data-fan className="relative mx-auto mt-14 flex max-w-[64rem] items-start justify-center px-[var(--gutter)] lg:mt-20">
        {FRAGRANCES.map((f, i) => (
          <li key={f.id} className="-mx-[2%] w-[27%] sm:w-[24%]" style={{ zIndex: i === 1 || i === 2 ? 2 : 1 }}>
            <div data-fan-bottle style={{ transformOrigin: "50% 100%" }}>
              <button
                type="button"
                onClick={() => gotoFragrance(f.id)}
                aria-label={`${messages.ui.discover} ${f.name} — ${f.fruit}`}
                className="group relative block w-full transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-[8%]"
              >
                <FragranceBottle fragrance={f} className="w-full" decorative />
                <span
                  className="t-eyebrow absolute top-[-1.5rem] left-1/2 -translate-x-1/2 rounded-full px-3 py-1.5 text-[0.6rem] whitespace-nowrap opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                  style={{ background: f.palette.deep, color: "#F6F1E8" }}
                >
                  {f.name} · {f.fruit}
                </span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
