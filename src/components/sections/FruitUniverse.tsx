"use client";

import { useRef, type CSSProperties } from "react";
import { useLanguage, useFragrances } from "@/components/providers/LanguageProvider";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { FruitArt } from "@/components/ui/FruitArt";
import { Drop, Flower, Scallop, Sparkle, Squiggle, WaveRibbon } from "@/components/ui/Decor";
import { SHAPE_CLIP } from "@/components/ui/ShapeDefs";
import { useScrollReveals } from "@/hooks/useScrollReveals";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import type { AssetId, FruitKind } from "@/types";

interface Specimen {
  fruit: FruitKind;
  asset: AssetId;
  frame: { className: string; style?: CSSProperties };
  aspect: string;
  offset: string;
  speed: number;
}

const SPECIMENS: Specimen[] = [
  {
    fruit: "pineapple",
    asset: "fruit-universe-pineapple",
    frame: { className: "rounded-t-full rounded-b-[2rem]" },
    aspect: "aspect-[4/5]",
    offset: "lg:mt-0",
    speed: 0.15,
  },
  {
    fruit: "berries",
    asset: "fruit-universe-berries",
    frame: { className: "", style: { clipPath: SHAPE_CLIP.flower } },
    aspect: "aspect-square",
    offset: "mt-12 lg:mt-40",
    speed: -0.2,
  },
  {
    fruit: "papaya",
    asset: "fruit-universe-papaya",
    frame: { className: "rounded-[50%]" },
    aspect: "aspect-[4/5]",
    offset: "lg:mt-16",
    speed: 0.1,
  },
  {
    fruit: "apple",
    asset: "fruit-universe-apple",
    frame: { className: "", style: { clipPath: SHAPE_CLIP.blob } },
    aspect: "aspect-[4/5]",
    offset: "mt-12 lg:mt-52",
    speed: -0.15,
  },
];

const FACTS = [
  { value: "1" },
  { value: "4" },
  { value: "0" },
];

function Pill({ kind, color, className = "" }: { kind: FruitKind; color: string; className?: string }) {
  return (
    <span
      data-reveal="pop"
      aria-hidden
      className={`relative mx-[0.1em] inline-grid h-[0.72em] w-[1.45em] place-items-center overflow-hidden rounded-full align-[0.02em] ${className}`}
      style={{ background: color }}
    >
      <FruitArt kind={kind} className="h-[120%] w-auto overflow-hidden" />
    </span>
  );
}

/** Section 02 — The Fruit Universe: a playful, collage-like specimen board. */
export function FruitUniverse() {
  const { messages, locale } = useLanguage();
  const FRAGRANCES = useFragrances();
  const root = useRef<HTMLElement>(null);
  useScrollReveals(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        // The wave ribbon slowly drifts across the board as you scroll.
        gsap.fromTo(
          "[data-universe-wave]",
          { xPercent: -12, rotate: -4 },
          {
            xPercent: 8,
            rotate: 3,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
        // Tiles open from a soft mask.
        gsap.utils.toArray<HTMLElement>("[data-specimen-media]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.5,
              ease: "expo.inOut",
              scrollTrigger: { trigger: el, start: "top 88%", end: "bottom top", toggleActions: "restart none restart none" },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="universe" aria-labelledby="universe-title" className="relative overflow-hidden bg-ivory pt-28 pb-36 lg:pt-36 lg:pb-48">
      {/* background graphics */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div data-universe-wave className="absolute top-[52%] -left-[10%] w-[120%] text-rubra/90">
          <WaveRibbon className="h-[clamp(5rem,14vw,14rem)] w-full" />
        </div>
        <span data-float className="absolute top-[14%] right-[8%] w-[clamp(2.5rem,5vw,4.5rem)] text-sola">
          <Sparkle className="h-auto w-full" />
        </span>
        <span data-float className="absolute bottom-[8%] left-[6%] w-[clamp(4rem,9vw,8rem)] text-vera">
          <Scallop className="h-auto w-full" />
        </span>
        <span data-float className="absolute right-[4%] bottom-[14%] w-[clamp(3rem,6vw,5rem)] text-marea">
          <Flower className="h-auto w-full" />
        </span>
      </div>

      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <p data-reveal="fade" className="max-w-[30ch] text-[0.95rem] leading-relaxed text-charcoal/75">
            {messages.universe.text}
          </p>
        </div>

        <h2 id="universe-title" className="t-display mt-8 text-[clamp(1.9rem,6.5vw,7rem)]">
          <span key={`${locale}-first`} className="block" data-reveal="lines">
            {messages.universe.lines[0]}
          </span>
          <span key={`${locale}-second`} className="block" data-reveal="lines">
            {messages.universe.lines[1]} <Pill kind="pineapple" color="#F2CC58" />
          </span>
          <span key={`${locale}-third`} className="block text-rubra sm:pl-[10vw]" data-reveal="lines">
            {messages.universe.lines[2]}
          </span>
          <span key={`${locale}-fourth`} className="block text-rubra sm:pl-[10vw]" data-reveal="lines">
            <Pill kind="berries" color="#F4CDD3" /> {messages.universe.lines[3]}
          </span>
        </h2>

        {/* Specimen board */}
        <ul className="relative mt-16 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 lg:mt-24 lg:grid-cols-4 lg:gap-x-10">
          {SPECIMENS.map((s, i) => {
            const f = FRAGRANCES[i];
            return (
              <li key={s.asset} className={`relative ${s.offset}`} data-speed={s.speed}>
                <figure className="group">
                  <div className="relative">
                    <div
                      data-specimen-media
                      className={`relative overflow-hidden ${s.aspect} ${s.frame.className} transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]`}
                      style={s.frame.style}
                    >
                      <ImageSlot id={s.asset} className="absolute inset-0" tone={[f.palette.soft, f.palette.base]} />
                    </div>
                    {/* sticker */}
                    <span
                      data-reveal="pop"
                      data-delay={0.2 + i * 0.1}
                      aria-hidden
                      className={`absolute -bottom-6 grid aspect-square w-[42%] place-items-center rounded-full bg-ivory shadow-[0_14px_30px_-14px_rgba(32,31,28,.45)] ${
                        i % 2 ? "-left-3" : "-right-3"
                      }`}
                    >
                      <span data-float className="block w-[78%]">
                        <FruitArt kind={s.fruit} variant="accent" className="h-auto w-full" />
                      </span>
                    </span>
                    {i === 1 && (
                      <span aria-hidden className="absolute -top-4 right-2 w-10 text-marea" data-reveal="pop">
                        <Drop className="h-auto w-full" />
                      </span>
                    )}
                  </div>
                  <figcaption className="mt-9 pr-2">
                    <span className="mt-2 block font-display text-[clamp(1.1rem,1.6vw,1.5rem)] font-bold">{f.fruit}</span>
                    <span className="mt-1 block text-[0.88rem] leading-snug text-charcoal/70">{messages.universe.specimens[i]}</span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>

        {/* Facts */}
        <dl className="mt-24 grid gap-8 border-t border-charcoal/15 pt-10 sm:grid-cols-3 lg:mt-32">
          {FACTS.map((fact, i) => (
            <div key={fact.value} className="flex items-start gap-5" data-reveal="fade" data-delay={i * 0.1}>
              <dt className="t-mega text-[clamp(4rem,8vw,7rem)] text-rubra">{fact.value}</dt>
              <dd className="pt-2 text-[0.95rem] leading-snug font-semibold text-charcoal/80">
                {messages.universe.facts[i]}
                <Squiggle className="mt-3 h-3 w-16 text-marea" />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
