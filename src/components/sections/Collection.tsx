"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLanguage, useFragrances } from "@/components/providers/LanguageProvider";
import { FruitThumbnail } from "@/components/ui/FruitThumbnail";
import { FragranceList } from "@/components/ui/FragranceList";
import { FragranceBottle, FruitCutout } from "@/components/ui/Media";
import { PulpaSymbol } from "@/components/ui/PulpaSymbol";
import { Drop, Leaf, Sparkle, Splash } from "@/components/ui/Decor";
import { Button } from "@/components/ui/Button";
import { SHAPE_CLIP } from "@/components/ui/ShapeDefs";
import { useScrollReveals } from "@/hooks/useScrollReveals";
import { EVENTS, smoothScrollTo, spotlightFragrance, type FragranceEventDetail } from "@/lib/events";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { Fragrance } from "@/types";

/** Each fragrance gets its own frame shape — same family, different personality. */
const FRAME: Record<Fragrance["id"], { className: string; style?: CSSProperties }> = {
  sola: { className: "rounded-full" },
  rubra: { className: "", style: { clipPath: SHAPE_CLIP.flower } },
  marea: { className: "rounded-t-full rounded-b-[2.5rem]" },
  vera: { className: "", style: { clipPath: SHAPE_CLIP.blob } },
};

function Panel({ fragrance: f, index }: { fragrance: Fragrance; index: number }) {
  const { messages } = useLanguage();
  const mirror = index % 2 === 1;
  const frame = FRAME[f.id];
  const onDark = f.palette.ink !== "#201F1C";

  return (
    <article
      data-panel={index}
      aria-labelledby={`panel-${f.id}`}
      className="relative -mt-10 overflow-hidden rounded-t-[2.5rem] first:mt-0 lg:mt-0 lg:h-full lg:w-screen lg:shrink-0 lg:rounded-none"
      style={{ background: f.palette.base, color: f.palette.ink }}
    >
      <div className="container-x relative grid h-full items-center gap-10 pt-16 pb-20 lg:grid-cols-12 lg:gap-6 lg:py-0 lg:pt-16">
        {/* Stage */}
        <div className={`group relative lg:col-span-6 ${mirror ? "lg:order-2 lg:col-start-7" : ""}`}>
          <div className="relative mx-auto aspect-square w-[min(84vw,30rem)] lg:w-[min(40vw,68svh)]">
            <div
              data-panel-frame
              className={`absolute inset-0 overflow-hidden ${frame.className}`}
              style={{ ...frame.style, background: `radial-gradient(circle at 50% 38%, ${f.palette.glow} 0%, ${f.palette.soft} 38%, ${f.palette.deep} 120%)` }}
            >
              {/* pineapple-symbol pattern, as on the identity's pattern tiles */}
              <div className="absolute inset-[-10%] grid grid-cols-5 place-items-center gap-6 opacity-[0.16]" style={{ color: f.palette.deep }} aria-hidden>
                {Array.from({ length: 25 }, (_, k) => (
                  <PulpaSymbol key={k} className={`h-10 w-auto ${k % 2 ? "rotate-12" : "-rotate-12"}`} />
                ))}
              </div>
            </div>

            <div data-panel-bottle className="absolute inset-x-[14%] bottom-[2%] top-[4%]">
              <FragranceBottle fragrance={f} className="h-full w-full" />
            </div>

            <div data-panel-fruit className={`absolute bottom-[-4%] w-[44%] ${mirror ? "right-[-8%]" : "left-[-8%]"}`}>
              <FruitCutout fragrance={f} className="w-full" />
            </div>

            {/* stickers that pop on hover (always visible on touch) */}
            <span aria-hidden className={`absolute top-[6%] w-[13%] transition-transform delay-75 duration-700 ease-[var(--ease-out-expo)] lg:scale-0 lg:group-hover:scale-100 ${mirror ? "left-[2%]" : "right-[2%]"}`} style={{ color: onDark ? "#F6F1E8" : "#201F1C" }}>
              <Sparkle className="h-auto w-full" />
            </span>
            <span aria-hidden className={`absolute top-[30%] w-[12%] rotate-[-20deg] text-ivory transition-transform delay-150 duration-700 ease-[var(--ease-out-expo)] lg:scale-0 lg:group-hover:scale-100 ${mirror ? "left-[-6%]" : "right-[-6%]"}`}>
              <Drop className="h-auto w-full" />
            </span>
            <span aria-hidden className={`absolute bottom-[22%] w-[16%] transition-transform delay-200 duration-700 ease-[var(--ease-out-expo)] lg:scale-0 lg:group-hover:scale-100 ${mirror ? "left-[-4%]" : "right-[-4%]"}`} style={{ color: f.palette.deep }}>
              {index % 2 ? <Splash className="h-auto w-full" /> : <Leaf className="h-auto w-full" />}
            </span>
          </div>
        </div>

        {/* Copy */}
        <div className={`relative lg:col-span-5 ${mirror ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
          <h3 id={`panel-${f.id}`} data-panel-name className="t-mega text-[clamp(3rem,14.5vw,7rem)] lg:text-[clamp(3rem,min(5.2vw,13svh),6rem)]">
            {f.name}
          </h3>
          <p className="t-heading mt-4 text-[clamp(1.4rem,2.4vw,2.1rem)]">{f.tagline}</p>
          <p className="mt-4 max-w-[44ch] text-[0.98rem] leading-relaxed" style={{ opacity: 0.85 }}>
            {f.description}
          </p>

          <dl className="mt-7 grid grid-cols-3 gap-4 border-t pt-5" style={{ borderColor: "currentColor" }}>
            {(["top", "heart", "base"] as const).map((tier) => (
              <div key={tier}>
                <dt className="t-eyebrow text-[0.62rem]" style={{ opacity: 0.7 }}>
                  {messages.ui[tier]}
                </dt>
                <dd className="mt-2 text-[0.85rem] font-semibold leading-snug">{f.notes[tier].join(", ")}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label={messages.ui.personality}>
            {f.personality.map((p) => (
              <li
                key={p}
                className="rounded-full border px-3.5 py-1.5 text-[0.75rem] font-semibold"
                style={{ borderColor: "currentColor" }}
              >
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button onClick={() => spotlightFragrance(f.id)} variant={onDark ? "light" : "dark"} arrow="right">
              {`${messages.ui.spotlight} ${f.name}`}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Section 03 — The Collection: a horizontal, pinned editorial rail on desktop. */
export function Collection() {
  const { messages, locale } = useLanguage();
  const FRAGRANCES = useFragrances();
  const root = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  useScrollReveals(root);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root.current);
      const mm = gsap.matchMedia();

      mm.add(`${MQ.desktop} and ${MQ.motion}`, () => {
        const pin = pinRef.current!;
        const track = q<HTMLElement>("[data-collection-track]")[0];
        const distance = () => track.scrollWidth - pin.clientWidth;

        const rail = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate(self) {
              const i = Math.round(self.progress * (FRAGRANCES.length - 1));
              if (i !== activeRef.current) {
                activeRef.current = i;
                setActive(i);
              }
              gsap.set(q("[data-rail-progress]"), { scaleX: self.progress });
            },
          },
        });
        stRef.current = rail.scrollTrigger ?? null;

        q<HTMLElement>("[data-panel]").forEach((panel) => {
          const st = { trigger: panel, containerAnimation: rail, start: "left right", end: "right left", scrub: true };
          gsap.fromTo(panel.querySelector("[data-panel-name]"), { xPercent: 6 }, { xPercent: -4, ease: "none", scrollTrigger: st });
          gsap.fromTo(panel.querySelector("[data-panel-bottle]"), { rotate: 4, yPercent: 5 }, { rotate: -3, yPercent: -3, ease: "none", scrollTrigger: st });
          gsap.fromTo(panel.querySelector("[data-panel-frame]"), { rotate: -8, scale: 0.94 }, { rotate: 6, scale: 1.03, ease: "none", scrollTrigger: st });
          gsap.fromTo(panel.querySelector("[data-panel-fruit]"), { xPercent: 14, rotate: 9 }, { xPercent: -10, rotate: -7, ease: "none", scrollTrigger: st });
        });

        return () => {
          stRef.current = null;
        };
      });

      mm.add(`${MQ.mobile} and ${MQ.motion}`, () => {
        q<HTMLElement>("[data-panel]").forEach((panel) => {
          gsap.from(panel.querySelectorAll("[data-panel-bottle], [data-panel-fruit]"), {
            yPercent: 18,
            autoAlpha: 0,
            duration: 1.4,
            stagger: 0.12,
            scrollTrigger: { trigger: panel, start: "top 70%", end: "bottom top", toggleActions: "restart none restart none" },
          });
          gsap.from(panel.querySelector("[data-panel-frame]"), {
            scale: 0.6,
            rotate: -30,
            duration: 1.6,
            scrollTrigger: { trigger: panel, start: "top 75%", end: "bottom top", toggleActions: "restart none restart none" },
          });
        });
      });
      mm.add({ mobile: MQ.mobile, reduced: MQ.reduced }, () => {
        q<HTMLElement>("[data-panel]").forEach((panel, index) => ScrollTrigger.create({
          trigger: panel, start: "top 55%", end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive && index !== activeRef.current) { activeRef.current = index; setActive(index); }
          },
        }));
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // Requests from the hero / final CTA: scroll to a given fragrance panel.
  useEffect(() => {
    const go = (index: number) => {
      const st = stRef.current;
      if (st) {
        smoothScrollTo(st.start + ((st.end - st.start) * index) / (FRAGRANCES.length - 1));
      } else {
        const panel = root.current?.querySelector(`[data-panel="${index}"]`);
        if (panel) smoothScrollTo(panel);
      }
    };
    const onGoto = (e: Event) => {
      const { id } = (e as CustomEvent<FragranceEventDetail>).detail;
      const index = FRAGRANCES.findIndex((f) => f.id === id);
      if (index < 0) return;
      activeRef.current = index;
      setActive(index);
      go(index);
    };
    window.addEventListener(EVENTS.gotoFragrance, onGoto);
    return () => window.removeEventListener(EVENTS.gotoFragrance, onGoto);
  }, [FRAGRANCES]);

  const jump = (index: number) => {
    activeRef.current = index;
    setActive(index);
    window.dispatchEvent(
      new CustomEvent<FragranceEventDetail>(EVENTS.gotoFragrance, { detail: { id: FRAGRANCES[index].id } }),
    );
  };

  return (
    <section id="fragrances" ref={root} tabIndex={-1} aria-labelledby="collection-title" className="relative bg-ivory outline-none">
      <div data-collection-intro className="collection-intro container-x grid gap-10 pt-20 pb-14 sm:pt-28 lg:grid-cols-12 lg:items-end lg:pt-32 lg:pb-20">
        <div className="min-w-0 lg:col-span-7">
          <h2 key={locale} id="collection-title" data-reveal="lines" className="t-display text-[clamp(1.9rem,7.8vw,4.5rem)] lg:text-[clamp(3.2rem,5.1vw,6.5rem)]">
            {messages.collection.first}
            <br />
            <span className="text-rubra">{messages.collection.second}</span>
          </h2>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <p data-reveal="fade" className="text-[1.05rem] leading-relaxed text-charcoal/80">
            {messages.collection.text}
          </p>
          <FragranceList fragrances={FRAGRANCES} activeId={FRAGRANCES[active].id} onSelect={jump} />
        </div>
      </div>

      <div ref={pinRef} data-collection-pin className="relative lg:h-[100svh] lg:overflow-hidden">
        <div data-collection-track className="flex flex-col lg:h-full lg:w-max lg:flex-row">
          {FRAGRANCES.map((f, i) => (
            <Panel key={f.id} fragrance={f} index={i} />
          ))}
        </div>

        {/* Rail HUD (desktop) */}
        <div data-rail-hud className="pointer-events-none absolute inset-x-0 bottom-6 hidden lg:block">
          <div className="container-x flex items-center gap-6">
            <ul className="glass pointer-events-auto flex rounded-full p-1 text-charcoal">
              {FRAGRANCES.map((f, i) => (
                <li key={f.id}>
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={i === active ? "true" : undefined}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 font-display text-[0.7rem] font-bold tracking-[0.16em] transition-colors duration-500 ${
                      i === active ? "bg-charcoal text-ivory" : "hover:bg-charcoal/10"
                    }`}
                  >
                    <FruitThumbnail kind={f.fruitKind} className="h-7 w-7" />{f.name}
                  </button>
                </li>
              ))}
            </ul>
            <span className="glass relative h-1.5 flex-1 overflow-hidden rounded-full" aria-hidden>
              <span data-rail-progress className="absolute inset-0 origin-left scale-x-0 rounded-full bg-charcoal" />
            </span>
            <span className="glass rounded-full px-4 py-2 font-display text-xs font-bold tabular-nums text-charcoal">
              {FRAGRANCES[active].index} / 0{FRAGRANCES.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
