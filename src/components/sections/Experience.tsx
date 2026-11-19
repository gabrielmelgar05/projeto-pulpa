"use client";

import { useRef } from "react";
import { getFragrance } from "@/data/fragrances";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { FragranceBottle, FruitCutout } from "@/components/ui/Media";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Sparkle } from "@/components/ui/Decor";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

const RUBRA = getFragrance("rubra");


/** Bokeh stand-in for the cinematic backdrop photograph. */
function ExperienceBokeh() {
  const dots = [
    [12, 22, 18, 0.5], [78, 18, 24, 0.35], [64, 70, 30, 0.4], [22, 76, 22, 0.45], [88, 58, 14, 0.5],
    [40, 30, 10, 0.6], [52, 88, 16, 0.35], [6, 52, 12, 0.4], [94, 86, 20, 0.3],
  ];
  return (
    <div className="absolute inset-0" style={{ background: "radial-gradient(70% 70% at 50% 55%, #BC4358 0%, #7A2135 55%, #4A1220 100%)" }}>
      {dots.map(([x, y, s, o], i) => (
        <span
          key={i}
          className="absolute rounded-full blur-2xl"
          style={{ left: `${x}%`, top: `${y}%`, width: `${s}vw`, height: `${s}vw`, background: i % 2 ? "#E9879A" : "#F2A16E", opacity: o }}
        />
      ))}
    </div>
  );
}

/**
 * Section 04 — The Experience. A pinned, scroll-scrubbed scene:
 * an arch window opens to full screen, RUBRA rises, berries orbit in,
 * and three sensory chapters play one after another.
 */
export function Experience() {
  const { messages } = useLanguage();
  const CHAPTERS = messages.experience.chapters;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();

      mm.add(
        { desktop: MQ.desktop, mobile: MQ.mobile, motion: MQ.motion },
        (ctx) => {
          const { desktop, motion } = ctx.conditions as { desktop: boolean; motion: boolean };
          if (!motion) return;
          const chapters = q<HTMLElement>("[data-chapter]");
          q("[data-chapters]")[0]?.setAttribute("data-stacked", "true");

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: q("[data-exp-pin]")[0],
              start: "top top",
              end: desktop ? "+=280%" : "+=200%",
              pin: true,
              scrub: 0.9,
            },
          });

          tl.fromTo(
            q("[data-exp-window]"),
            { clipPath: desktop ? "inset(26% 37% 22% 37% round 999px 999px 40px 40px)" : "inset(30% 18% 26% 18% round 999px 999px 32px 32px)" },
            { clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)", duration: 1.2, ease: "power2.inOut" },
            0,
          )
            .fromTo(q("[data-exp-media]"), { scale: 1.3 }, { scale: 1, duration: 1.2, ease: "power2.inOut" }, 0)
            .to(q('[data-exp-line="a"]'), { xPercent: -12, yPercent: -30, autoAlpha: 0, duration: 0.9 }, 0)
            .to(q('[data-exp-line="b"]'), { xPercent: 12, yPercent: 30, autoAlpha: 0, duration: 0.9 }, 0)
            .fromTo(q("[data-exp-bottle]"), { yPercent: 70, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out" }, 0.75)
            .fromTo(
              q("[data-exp-fruit]"),
              { xPercent: (i) => (i ? 120 : -120), rotate: (i) => (i ? 40 : -40), autoAlpha: 0 },
              { xPercent: 0, rotate: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out", stagger: 0.1 },
              0.95,
            )
            .fromTo(q("[data-exp-hud]"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 1.1);

          chapters.forEach((ch, i) => {
            const at = 1.4 + i * 0.9;
            tl.fromTo(ch, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" }, at)
              .to(q(`[data-chapter-dot="${i}"]`), { scaleX: 1, duration: 0.6 }, at);
            if (i < chapters.length - 1) tl.to(ch, { autoAlpha: 0, y: -30, duration: 0.3, ease: "power3.in" }, at + 0.7);
          });
          tl.to({}, { duration: 0.4 });

          return () => q("[data-chapters]")[0]?.removeAttribute("data-stacked");
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="experience" tabIndex={-1} aria-labelledby="experience-title" data-nav-theme="dark" className="relative bg-wine text-ivory outline-none">
      <div data-exp-pin className="relative h-[100svh] min-h-[620px] overflow-hidden">
        {/* window → full-bleed scene */}
        <div data-exp-window className="absolute inset-0 overflow-hidden">
          <div data-exp-media className="absolute inset-0">
            <ImageSlot id="experience-backdrop" className="absolute inset-0" fallback={<ExperienceBokeh />} />
          </div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-wine/50 via-transparent to-wine/70" />
        </div>

        {/* headline */}
        <div className="exp-head pointer-events-none absolute inset-0 flex flex-col justify-between px-[var(--gutter)] pt-[calc(var(--nav-h)+1rem)] pb-[34svh] lg:pb-[12svh]">
          <div className="flex items-start justify-between gap-6">
            <p className="t-eyebrow hidden text-ivory/70 sm:block">{messages.experience.featuring}</p>
          </div>
          <h2 id="experience-title" className="t-mega text-[clamp(1.8rem,9vw,4rem)] lg:text-[clamp(4rem,5.8vw,7.5rem)]">
            <span data-exp-line="a" className="block">{messages.experience.first}</span>
            <span data-exp-line="b" className="block text-right text-rubra-soft">{messages.experience.second}</span>
          </h2>
        </div>

        {/* product */}
        <div data-exp-product className="absolute inset-x-0 bottom-[22svh] flex justify-center lg:bottom-[6svh]">
          <div className="relative aspect-[4/5] h-[min(46svh,62vw)] lg:h-[62svh]">
            <div data-exp-bottle className="absolute inset-0">
              <FragranceBottle fragrance={RUBRA} className="h-full w-full" decorative />
            </div>
            <div data-exp-fruit className="absolute bottom-[-4%] left-[-48%] w-[64%]">
              <FruitCutout fragrance={RUBRA} className="w-full" />
            </div>
            <div data-exp-fruit className="absolute top-[18%] right-[-46%] w-[46%]">
              <FruitCutout fragrance={RUBRA} variant="accent" className="w-full" />
            </div>
            <Sparkle className="absolute -top-[4%] right-[-8%] w-[12%] text-sola" />
          </div>
        </div>

        {/* chapters */}
        <div data-exp-hud className="absolute inset-x-[var(--gutter)] bottom-6 sm:bottom-8 lg:right-auto lg:bottom-12 lg:w-[24rem]">
          <div data-chapter-progress className="mb-4 flex gap-2" aria-hidden>
            {CHAPTERS.map((c, i) => (
              <span key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-ivory/25">
                <span data-chapter-dot={i} className="block h-full origin-left scale-x-0 bg-ivory" />
              </span>
            ))}
          </div>
          <ol data-chapters className="experience-chapters">
            {CHAPTERS.map((c, i) => (
              <li key={i} data-chapter className="glass-dark rounded-[1.5rem] p-5">
                <h3 className="t-heading text-[1.5rem]">{c.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-ivory/80">{c.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
