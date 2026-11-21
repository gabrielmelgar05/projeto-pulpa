"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { FRAGRANCES as BASE_FRAGRANCES } from "@/data/fragrances";
import { useLanguage, useFragrances } from "@/components/providers/LanguageProvider";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { PedestalArt } from "@/components/ui/BottleArt";
import { FragranceBottle, FruitCutout } from "@/components/ui/Media";
import { FruitThumbnail } from "@/components/ui/FruitThumbnail";
import { Badge } from "@/components/ui/Badge";
import { Blob, Flower, Leaf, Sparkle, WaveRibbon } from "@/components/ui/Decor";
import { Button } from "@/components/ui/Button";
import { useIntro } from "@/components/providers/SiteProviders";
import { EVENTS, gotoFragrance, smoothScrollTo, type FragranceEventDetail } from "@/lib/events";
import { gsap, MQ, ScrollTrigger, useGSAP, pauseOutsideViewport } from "@/lib/gsap";

const INITIAL = 0;
const AUTOPLAY_SECONDS = 7;
const first = BASE_FRAGRANCES[INITIAL].palette;

/** Initial colour world. GSAP tweens these custom properties on every swap. */
const INITIAL_VARS = {
  "--hero-base": first.base,
  "--hero-deep": first.deep,
  "--hero-soft": first.soft,
  "--hero-glow": first.glow,
  "--hero-ink": first.ink,
} as CSSProperties;

const hiddenUnlessFirst = (i: number) => (i === INITIAL ? undefined : "hidden");

export function Hero() {
  const { messages, locale } = useLanguage();
  const FRAGRANCES = useFragrances();
  const root = useRef<HTMLElement>(null);
  const activeRef = useRef(INITIAL);
  const [active, setActive] = useState(INITIAL);
  const introPlayed = useRef(false);
  const introTl = useRef<gsap.core.Timeline | null>(null);
  const swapTl = useRef<gsap.core.Timeline | null>(null);
  const autoplay = useRef<gsap.core.Tween | null>(null);
  const userTookOver = useRef(false);
  const { introDone } = useIntro();

  const actions = useRef<{ goTo: (next: number, fromUser: boolean) => void; start: () => void } | null>(null);

  useGSAP(
    (_context, contextSafe) => {
      const el = root.current!;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();

      // Only the first fragrance name is "rolled in" on load.
      gsap.set(q(`[data-hero-name-char]:not([data-hero-name-char="${INITIAL}"])`), { yPercent: 110 });

      const syncSelection = () => {
        const current = activeRef.current;
        swapTl.current?.progress(1).kill();
        FRAGRANCES.forEach((fragrance, index) => {
          gsap.set(q(`[data-hero-bg="${index}"], [data-hero-bottle="${index}"], [data-hero-fruit="${index}"], [data-hero-copy="${index}"], [data-hero-name="${index}"]`), { autoAlpha: fragrance.id === FRAGRANCES[current].id ? 1 : 0 });
          gsap.set(q(`[data-hero-name-char="${index}"]`), { yPercent: index === current ? 0 : 110 });
        });
      };
      mm.add(MQ.reduced, syncSelection);
      mm.add(MQ.motion, () => {
        if (!introPlayed.current) {
          /* ── Intro timeline (built paused; played when the preloader hands over) ── */
          const line1 = { chars: q("[data-hero-line1-char]") };
          const words = { chars: q("[data-hero-word-char]") };

          const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
          tl.from(q("[data-hero-halo]"), { scale: 0.55, autoAlpha: 0, duration: 1.8 }, 0)
            .from(q("[data-hero-shape]"), { autoAlpha: 0, scale: 0.8, duration: 1.6, stagger: 0.1 }, 0)
            .from(line1.chars, { yPercent: 115, duration: 1.1, stagger: 0.025 }, 0.15)
            .from(words.chars, { yPercent: 115, rotate: 4, duration: 1.4, stagger: 0.045 }, 0.25)
            .from(q("[data-hero-pedestal]"), { yPercent: 35, autoAlpha: 0, duration: 1.5 }, 0.25)
            .from(q(`[data-hero-bottle="${INITIAL}"]`), { yPercent: 28, autoAlpha: 0, scale: 0.92, duration: 1.7 }, 0.35)
            .from(q("[data-hero-leaf]"), { scale: 0, rotate: -40, duration: 1.3, stagger: 0.08, ease: "back.out(1.6)" }, 0.6)
            .from(
              q(`[data-hero-fruit="${INITIAL}"]`),
              { scale: 0, rotate: -35, autoAlpha: 0, duration: 1.3, stagger: 0.1, ease: "back.out(1.5)" },
              0.7,
            )
            .from(q("[data-hero-sparkle]"), { scale: 0, duration: 1, stagger: 0.07, ease: "back.out(2)" }, 0.9)
            .from(q("[data-hero-card]"), { y: 40, autoAlpha: 0, duration: 1.2, stagger: 0.12 }, 0.8);
          introTl.current = tl;
        } else syncSelection();

        /* ── Idle float on sparkles and fruit layers ── */
        q("[data-hero-sparkle]").forEach((s, i) =>
          pauseOutsideViewport(gsap.to(s, { rotate: 90, scale: 0.8, duration: 2.4 + i * 0.3, yoyo: true, repeat: -1, ease: "sine.inOut" }), el),
        );
        q("[data-float-layer]").forEach((s, i) =>
          pauseOutsideViewport(gsap.to(s, { y: i % 2 ? 12 : -12, duration: 3 + i * 0.4, yoyo: true, repeat: -1, ease: "sine.inOut" }), el),
        );

        return () => {
          introTl.current = null;
        };
      });

      /* ── Desktop: pointer parallax + scroll-out choreography ── */
      mm.add(`${MQ.desktop} and ${MQ.motion}`, () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.8 },
          defaults: { ease: "none" },
        });
        scrollTl
          .to(q('[data-hero-word="left"]'), { xPercent: -18 }, 0)
          .to(q('[data-hero-word="right"]'), { xPercent: 18 }, 0)
          .to(q("[data-hero-scroll-stage]"), { yPercent: 10, scale: 1.06 }, 0)
          .to(q("[data-hero-scroll-fruits]"), { yPercent: -16 }, 0)
          // The intro also animates these cards. Never cache its hidden or
          // intermediate values as the state to restore when scrolling back.
          .fromTo(q("[data-hero-card]"), { y: 0, autoAlpha: 1 }, { y: -60, autoAlpha: 0, immediateRender: false }, 0);

        const layers = q<HTMLElement>("[data-depth]").map((layer) => ({
          depth: Number(layer.dataset.depth),
          x: gsap.quickTo(layer, "x", { duration: 1.2, ease: "power3.out" }),
          y: gsap.quickTo(layer, "y", { duration: 1.2, ease: "power3.out" }),
        }));
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          layers.forEach((l) => {
            l.x(nx * l.depth * 60);
            l.y(ny * l.depth * 40);
          });
        };
        const fine = window.matchMedia(MQ.finePointer).matches;
        if (fine) el.addEventListener("pointermove", onMove);
        return () => el.removeEventListener("pointermove", onMove);
      });

      /* ── Autoplay pauses when the hero leaves the viewport ── */
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          if (self.isActive) autoplay.current?.resume();
          else autoplay.current?.pause();
        },
      });

    /* ── Fragrance swap ─────────────────────────────────────────── */
    const goTo = contextSafe!((next: number, fromUser: boolean) => {
      const prev = activeRef.current;
      if (next === prev) return;
      if (fromUser) stopAutoplay();
      activeRef.current = next;
      setActive(next);

      const el = root.current!;
      const q = gsap.utils.selector(el);
      const reduced = window.matchMedia(MQ.reduced).matches;
      const dir = next > prev ? 1 : -1;
      const p = FRAGRANCES[next].palette;

      swapTl.current?.progress(1).kill();
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, onComplete: () => startAutoplay() });
      swapTl.current = tl;

      tl.to(
        el,
        {
          "--hero-base": p.base,
          "--hero-deep": p.deep,
          "--hero-soft": p.soft,
          "--hero-glow": p.glow,
          "--hero-ink": p.ink,
          duration: reduced ? 0.4 : 1.2,
          ease: "power2.inOut",
        },
        0,
      );
      tl.to(q(`[data-hero-bg="${prev}"]`), { autoAlpha: 0, duration: 1, ease: "power2.inOut" }, 0).fromTo(
        q(`[data-hero-bg="${next}"]`),
        { autoAlpha: 0, scale: reduced ? 1 : 1.08 },
        { autoAlpha: 1, scale: 1, duration: 1.6 },
        0,
      );

      if (reduced) {
        const pick = (i: number) =>
          q(`[data-hero-bottle="${i}"], [data-hero-fruit="${i}"], [data-hero-copy="${i}"], [data-hero-name="${i}"]`);
        tl.to(pick(prev), { autoAlpha: 0, duration: 0.3 }, 0)
          .to(pick(next), { autoAlpha: 1, duration: 0.4 }, 0.2)
          .set(q(`[data-hero-name-char="${next}"]`), { yPercent: 0 }, 0);
        return;
      }

      // Bottle: current leaves with a tilt, new one rises in from the opposite side.
      tl.to(
        q(`[data-hero-bottle="${prev}"]`),
        { xPercent: -26 * dir, yPercent: -6, rotate: -9 * dir, scale: 0.86, autoAlpha: 0, duration: 0.65, ease: "power3.in" },
        0,
      ).fromTo(
        q(`[data-hero-bottle="${next}"]`),
        { xPercent: 26 * dir, yPercent: 14, rotate: 8 * dir, scale: 0.9, autoAlpha: 0 },
        { xPercent: 0, yPercent: 0, rotate: 0, scale: 1, autoAlpha: 1, duration: 1.4 },
        0.45,
      );

      // Fruits: burst outwards, new ones pop in with a playful overshoot.
      tl.to(
        q(`[data-hero-fruit="${prev}"]`),
        { scale: 0.4, rotate: () => gsap.utils.random(-60, 60), autoAlpha: 0, duration: 0.5, stagger: 0.04, ease: "power3.in" },
        0,
      ).fromTo(
        q(`[data-hero-fruit="${next}"]`),
        { scale: 0.2, rotate: () => gsap.utils.random(-50, 50), autoAlpha: 0 },
        { scale: 1, rotate: 0, autoAlpha: 1, duration: 1.2, stagger: 0.08, ease: "back.out(1.6)" },
        0.55,
      );

      // Copy: name characters roll, supporting text cross-fades.
      tl.set(q(`[data-hero-name="${next}"]`), { autoAlpha: 1 }, 0)
        .to(q(`[data-hero-name-char="${prev}"]`), { yPercent: -110, duration: 0.45, stagger: 0.03, ease: "power3.in" }, 0)
        .set(q(`[data-hero-name="${prev}"]`), { autoAlpha: 0 }, 0.7)
        .to(q(`[data-hero-copy="${prev}"]`), { autoAlpha: 0, y: -10, duration: 0.4, ease: "power2.in" }, 0.1)
        .fromTo(q(`[data-hero-copy="${next}"]`), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.5)
        .fromTo(q(`[data-hero-name-char="${next}"]`), { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.04 }, 0.55);

      // Leaves & sparkles give a small "breath".
      tl.fromTo(q("[data-hero-leaf]"), { rotate: 0 }, { rotate: 12 * dir, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0.2);
    });

    const startAutoplay = contextSafe!(() => {
      if (userTookOver.current || window.matchMedia(MQ.reduced).matches) return;
      autoplay.current?.kill();
      const bar = root.current?.querySelector("[data-autoplay-bar]");
      if (!bar) return;
      autoplay.current = gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: AUTOPLAY_SECONDS,
          ease: "none",
          paused: !ScrollTrigger.isInViewport(root.current!),
          onComplete: () => goTo((activeRef.current + 1) % FRAGRANCES.length, false),
        },
      );
    });

    const stopAutoplay = contextSafe!(() => {
      userTookOver.current = true;
      autoplay.current?.kill();
      autoplay.current = null;
      const bar = root.current?.querySelector("[data-autoplay-bar]");
      if (bar) gsap.to(bar, { scaleX: 1, duration: 0.5, ease: "power2.out" });
    });

      actions.current = { goTo, start: startAutoplay };
      return () => { mm.revert(); actions.current = null; autoplay.current?.kill(); swapTl.current?.kill(); };
    },
    { scope: root },
  );

  // Preloader → hero hand-off (runs once)
  useEffect(() => {
    if (!introDone || introPlayed.current) return;
    introPlayed.current = true;
    if (introTl.current) {
      introTl.current.play().then(() => actions.current?.start());
    } else {
      actions.current?.start();
    }
  }, [introDone]);

  // "Show this fragrance in the spotlight" requests from other sections
  useEffect(() => {
    const onSpotlight = (e: Event) => {
      const { id } = (e as CustomEvent<FragranceEventDetail>).detail;
      const index = FRAGRANCES.findIndex((f) => f.id === id);
      if (index < 0) return;
      smoothScrollTo(0, () => actions.current?.goTo(index, true));
    };
    window.addEventListener(EVENTS.spotlightFragrance, onSpotlight);
    return () => window.removeEventListener(EVENTS.spotlightFragrance, onSpotlight);
  }, [FRAGRANCES]);

  const onSwitcherKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const delta = e.key === "ArrowRight" ? 1 : -1;
    const next = (activeRef.current + delta + FRAGRANCES.length) % FRAGRANCES.length;
    actions.current?.goTo(next, true);
    root.current?.querySelector<HTMLButtonElement>(`[data-swatch="${next}"]`)?.focus();
  };

  const current = FRAGRANCES[active];

  return (
    <section
      id="home"
      ref={root}
      tabIndex={-1}
      aria-label={`PULPA — ${messages.tagline}`}
      className="hero relative isolate flex h-[100svh] min-h-[600px] flex-col overflow-hidden text-[var(--hero-ink)] outline-none lg:min-h-[700px]"
      style={INITIAL_VARS}
    >
      {/* ───────────── Backdrop ───────────── */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--hero-soft) -15%, var(--hero-base) 46%, color-mix(in oklab, var(--hero-deep) 70%, var(--hero-base)) 135%)",
          }}
        />
        {FRAGRANCES.map((f, i) => (
          <div key={f.id} data-hero-bg={i} data-hero-initial={hiddenUnlessFirst(i)} className="absolute inset-0">
            <ImageSlot id={f.assets.heroBackground} className="h-full w-full" fallback={<HeroDapple />} />
          </div>
        ))}
        <div className="absolute inset-x-0 top-[22%] bottom-[-20%] flex items-center justify-center">
          <div
            data-hero-halo
            className="aspect-square w-[150vw] max-w-[78rem] shrink-0 rounded-full lg:w-[min(80vw,74rem)]"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, var(--hero-glow) 0%, color-mix(in oklab, var(--hero-glow) 45%, transparent) 34%, transparent 66%)",
            }}
          />
        </div>
        <div data-depth="0.15" className="absolute inset-0 will-change-transform">
          <div data-hero-shape className="absolute -left-[14%] top-[44%] w-[58vw] text-[var(--hero-deep)] opacity-25 lg:-left-[8%] lg:top-[40%] lg:w-[34vw]">
            <Blob variant={1} className="h-auto w-full" />
          </div>
          <div data-hero-shape className="absolute -right-[18%] top-[16%] w-[62vw] text-[var(--hero-soft)] opacity-60 lg:-right-[6%] lg:top-[12%] lg:w-[34vw]">
            <WaveRibbon className="h-auto w-full" />
          </div>
          <div data-hero-shape className="absolute right-[6%] bottom-[20%] hidden w-[9vw] text-[var(--hero-deep)] opacity-30 lg:block">
            <Flower className="h-auto w-full" />
          </div>
        </div>
      </div>

      {/* ───────────── Headline ───────────── */}
      <div className="hero-head container-x relative z-10 flex flex-col items-center pt-[calc(var(--nav-h)+0.25rem)] text-center lg:static lg:pt-[calc(var(--nav-h)+1.25rem)]">
        <h1 className="mt-1 w-full lg:mt-3" data-language={locale} aria-label={messages.tagline}>
          <span data-hero-line1 className="block overflow-hidden pb-[0.06em] font-display text-[clamp(1.15rem,4.6vw,1.6rem)] font-semibold uppercase leading-none tracking-[0.06em] lg:text-[clamp(1.25rem,2vw,2.1rem)]">
            {messages.hero.lead.split("").map((c, i) => <span key={`${locale}-${i}`} data-hero-line1-char className="inline-block">{c === " " ? " " : c}</span>)}
          </span>
          <span className="hero-words t-mega mt-1 flex justify-center gap-[0.22em]">
            <span data-hero-word="left" className="block overflow-hidden pb-[0.05em]">
              {messages.hero.left.split("").map((c, i) => <span key={`${locale}-${i}`} data-hero-word-char className="inline-block">{c}</span>)}
            </span>
            <span data-hero-word="right" className="block overflow-hidden pb-[0.05em]">
              {messages.hero.right.split("").map((c, i) => <span key={`${locale}-${i}`} data-hero-word-char className="inline-block">{c}</span>)}
            </span>
          </span>
        </h1>
      </div>

      {/* ───────────── Stage: pedestal, bottle, fruits ───────────── */}
      <div className="hero-stage relative z-[5] min-h-0 flex-1">
        <div data-hero-scroll-stage className="absolute inset-0">
          <div className="hero-anchor">
            {/* leaves behind */}
            <div data-depth="0.35" className="absolute inset-0 will-change-transform">
              <span data-hero-leaf className="absolute left-[-30%] top-[50%] w-[48%] -rotate-[30deg] text-[var(--hero-deep)] opacity-80">
                <Leaf className="h-auto w-full" />
              </span>
              <span data-hero-leaf className="absolute right-[-26%] top-[56%] w-[40%] rotate-[100deg] text-[var(--hero-deep)] opacity-60">
                <Leaf className="h-auto w-full" />
              </span>
            </div>

            {/* pedestal */}
            <div data-hero-pedestal className="absolute left-[-45%] top-[77%] w-[190%]">
              <ImageSlot id="hero-pedestal" className="aspect-[2/1] w-full" fallback={<PedestalArt className="absolute inset-0 h-full w-full" />} />
            </div>

            {/* bottles (stacked; one visible) */}
            <div data-depth="0.25" className="absolute inset-0 will-change-transform">
              {FRAGRANCES.map((f, i) => (
                <div key={f.id} data-hero-bottle={i} data-hero-initial={hiddenUnlessFirst(i)} className="absolute inset-0">
                  <FragranceBottle fragrance={f} className="h-full w-full" priority={i === INITIAL} decorative={i !== active} />
                </div>
              ))}
            </div>

            {/* fruits (stacked per fragrance, separate depth layers) */}
            <div data-hero-scroll-fruits className="absolute inset-0">
              <div data-depth="-0.5" className="absolute left-[104%] top-[-8%] w-[26%] will-change-transform">
                <div data-float-layer>
                  {FRAGRANCES.map((f, i) => (
                    <div key={f.id} data-hero-fruit={i} data-hero-initial={hiddenUnlessFirst(i)} className="absolute inset-0 aspect-square blur-[2px]">
                      <FruitCutout fragrance={f} variant="accent" className="w-full" />
                    </div>
                  ))}
                  <div className="aspect-square w-full" />
                </div>
              </div>
              <div data-depth="0.9" className="absolute left-[-60%] top-[4%] w-[50%] will-change-transform">
                <div data-float-layer>
                  {FRAGRANCES.map((f, i) => (
                    <div key={f.id} data-hero-fruit={i} data-hero-initial={hiddenUnlessFirst(i)} className="absolute inset-0">
                      <FruitCutout fragrance={f} variant="accent" className="w-full" />
                    </div>
                  ))}
                  <div className="aspect-square w-full" />
                </div>
              </div>
              <div data-depth="1.2" className="absolute left-[74%] top-[48%] w-[72%] will-change-transform">
                {FRAGRANCES.map((f, i) => (
                  <div key={f.id} data-hero-fruit={i} data-hero-initial={hiddenUnlessFirst(i)} className="absolute inset-0">
                    <FruitCutout fragrance={f} variant="primary" className="w-full" />
                  </div>
                ))}
                <div className="aspect-square w-full" />
              </div>

              {/* sparkles */}
              <span data-hero-sparkle className="absolute left-[96%] top-[-2%] w-[11%] text-ivory">
                <Sparkle className="h-auto w-full" />
              </span>
              <span data-hero-sparkle className="absolute left-[-24%] top-[30%] w-[7%] text-charcoal/70">
                <Sparkle className="h-auto w-full" />
              </span>
              <span data-hero-sparkle className="absolute left-[118%] top-[62%] w-[6%] text-ivory">
                <Sparkle className="h-auto w-full" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────── Info + switcher ─────────────
          Mobile/tablet: one compact glass panel under the bottle.
          Desktop: `lg:contents` dissolves the panel into two corner cards. */}
      <div className="hero-info-shell container-x relative z-20 pb-3 sm:pb-5 lg:contents">
        <div className="hero-info-panel glass relative grid gap-3 overflow-hidden rounded-[1.6rem] p-4 text-charcoal sm:grid-cols-[1fr_auto] sm:items-end sm:gap-6 sm:p-5 lg:contents">
          {/* Fragrance info */}
          <div
            data-hero-card
            className="min-w-0 lg:glass lg:absolute lg:bottom-[var(--gutter)] lg:left-[var(--gutter)] lg:z-20 lg:w-[min(23rem,27vw)] lg:rounded-[1.75rem] lg:p-6"
          >
            <div className="hero-info-heading flex items-start justify-between gap-3">
              <div className="grid min-w-0">
                {FRAGRANCES.map((f, i) => (
                  <div
                    key={f.id}
                    data-hero-name={i}
                    data-hero-initial={hiddenUnlessFirst(i)}
                    className="col-start-1 row-start-1 min-w-0"
                    aria-hidden={i !== active}
                  >
                    <p className="hero-info-title-row flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="block overflow-hidden">
                        <span className="t-display block text-[clamp(1.9rem,8.5vw,2.6rem)] lg:text-[clamp(2.2rem,3.2vw,3.2rem)]">
                          {f.name.split("").map((c, ci) => (
                            <span key={ci} data-hero-name-char={i} className="inline-block">
                              {c}
                            </span>
                          ))}
                        </span>
                      </span>
                      <Badge variant="solid"
                        data-hero-copy={i}
                        data-hero-initial={hiddenUnlessFirst(i)}
                        className="hero-fruit-badge"
                        style={{ background: f.palette.base, color: f.palette.ink }}
                      >
                        {f.fruit}
                      </Badge>
                    </p>
                    <div data-hero-copy={i} data-hero-initial={hiddenUnlessFirst(i)}>
                      <p className="mt-2 hidden max-w-[36ch] text-[0.84rem] leading-relaxed text-charcoal/80 sm:block lg:mt-3">
                        {f.description}
                      </p>
                      <p className="hero-info-tagline mt-1 text-[0.8rem] font-semibold text-charcoal/75 sm:hidden">{f.tagline}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="hero-info-counter shrink-0 pt-2 font-display text-sm font-bold tabular-nums sm:hidden" aria-hidden>
                {current.index}
                <span className="text-charcoal/40"> / 0{FRAGRANCES.length}</span>
              </p>
            </div>
            <div className="mt-5 hidden lg:block">
              <Button onClick={() => gotoFragrance(current.id)} variant="dark">
                {`${messages.ui.discover} ${current.name}`}
              </Button>
            </div>
          </div>

          {/* Switcher + discovery progress */}
          <div
            data-hero-card
            className="lg:glass lg:absolute lg:right-[var(--gutter)] lg:bottom-[var(--gutter)] lg:z-20 lg:w-[min(22rem,29vw)] lg:rounded-[1.75rem] lg:p-5 xl:p-6"
          >
            <div className="mb-3 hidden items-center justify-between gap-3 sm:flex">
              <p id="hero-switcher-label" className="t-eyebrow text-[0.62rem] whitespace-nowrap text-charcoal/70">
                {messages.ui.chooseFruit}
              </p>
              <p className="font-display text-sm font-bold tabular-nums" aria-live="polite">
                {current.index}
                <span className="text-charcoal/40"> / 0{FRAGRANCES.length}</span>
              </p>
            </div>
            <div className="hero-info-controls flex items-stretch gap-2">
              <div
                role="group"
                aria-label={messages.ui.chooseFruit}
                className="hero-fruit-options flex flex-1 gap-1.5 sm:gap-2"
                onKeyDown={onSwitcherKey}
              >
                {FRAGRANCES.map((f, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      data-swatch={i}
                      onClick={() => actions.current?.goTo(i, true)}
                      aria-pressed={isActive}
                      aria-label={`${f.name} — ${f.fruit}`}
                      className={`hero-fruit-option group relative flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl px-0.5 py-1.5 transition-colors duration-500 sm:min-w-16 ${
                        isActive ? "bg-charcoal text-ivory" : "hover:bg-charcoal/[0.07]"
                      }`}
                    >
                      <span
                        className="hero-fruit-photo grid h-9 w-9 place-items-center transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110 lg:h-10 lg:w-10"
                        aria-hidden
                      >
                        <FruitThumbnail kind={f.fruitKind} className="h-9 w-9 lg:h-10 lg:w-10" />
                      </span>
                      <span className="font-display text-[0.58rem] font-bold tracking-[0.14em]">{f.name}</span>
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => gotoFragrance(current.id)}
                aria-label={`${messages.ui.discover} ${current.name}`}
                className="hero-info-discover grid w-12 shrink-0 place-items-center rounded-2xl bg-charcoal text-ivory lg:hidden"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4 rotate-90" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                </svg>
              </button>
            </div>
            <div className="hero-info-progress absolute inset-x-0 top-0 lg:static lg:mt-4 lg:flex lg:items-center lg:gap-3">
              <span className="relative block h-[3px] flex-1 overflow-hidden bg-charcoal/10 lg:rounded-full lg:bg-charcoal/15" aria-hidden>
                <span data-autoplay-bar className="absolute inset-0 origin-left scale-x-0 bg-charcoal lg:rounded-full" />
              </span>
              <a href="#fragrances" className="t-eyebrow hidden text-[0.6rem] text-charcoal/70 hover:text-charcoal lg:inline">
                {messages.ui.scroll} ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Soft dappled light (stand-in for the photographic hero background). */
function HeroDapple() {
  return (
    <div
      className="absolute inset-0 opacity-70 mix-blend-soft-light"
      style={{
        background: [
          "radial-gradient(28% 20% at 18% 22%, rgba(255,255,255,.7), transparent 70%)",
          "radial-gradient(22% 16% at 78% 30%, rgba(255,255,255,.55), transparent 70%)",
          "radial-gradient(30% 22% at 64% 78%, rgba(255,255,255,.4), transparent 70%)",
          "radial-gradient(18% 14% at 30% 70%, rgba(0,0,0,.25), transparent 70%)",
          "radial-gradient(24% 18% at 88% 70%, rgba(0,0,0,.2), transparent 70%)",
        ].join(","),
      }}
    />
  );
}
