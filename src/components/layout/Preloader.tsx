"use client";

import { useRef, useState } from "react";
import { PulpaSymbol } from "@/components/ui/PulpaSymbol";
import { useIntro } from "@/components/providers/SiteProviders";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

type State = "active" | "leaving" | "done";
const CURTAINS = ["bg-rubra", "bg-sola", "bg-marea", "bg-vera"] as const;

function openingReady(signal: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    const finish = () => {
      clearTimeout(timeout);
      signal.removeEventListener("abort", finish);
      resolve();
    };
    const timeout = window.setTimeout(finish, 2500);
    signal.addEventListener("abort", finish, { once: true });
    const images = [...document.querySelectorAll<HTMLImageElement>(
      '#home [data-asset-id="hero-bg-sola"] img, #home [data-asset-id="fragrance-bottle-sola"] img, #home [data-asset-id="hero-pedestal"] img',
    )];
    Promise.all([document.fonts.ready, ...images.map((image) => image.decode().catch(() => undefined))]).then(finish);
  });
}

/** One owned timeline: assemble, breathe while needed, then peel into the hero. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("active");
  const { completeIntro } = useIntro();
  const { messages } = useLanguage();

  useGSAP(() => {
    const element = root.current;
    if (!element) return;
    const q = gsap.utils.selector(element);
    const mark = q<HTMLElement>("[data-preloader-symbol]")[0];
    const controller = new AbortController();
    const ready = openingReady(controller.signal);
    const reduced = prefersReducedMotion();
    let alive = true;
    let handedOver = false;
    let finished = false;
    let breathing: gsap.core.Tween | undefined;
    document.documentElement.dataset.intro = "active";

    const handOver = () => {
      if (!alive || handedOver) return;
      handedOver = true;
      delete document.documentElement.dataset.intro;
      setState("leaving");
      completeIntro();
    };
    const finish = () => {
      if (!alive || finished) return;
      finished = true;
      clearTimeout(failsafe);
      breathing?.kill();
      handOver();
      setState("done");
    };
    const failsafe = window.setTimeout(finish, 6000);
    const sequence = gsap.timeline({ paused: true, onComplete: finish });
    if (reduced) {
      sequence.fromTo(mark, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 });
    } else {
      sequence.fromTo(mark,
        { autoAlpha: 0, scale: 0.68, y: 28, rotate: -8, clipPath: "inset(0% 0% 100% 0% round 10%)" },
        { autoAlpha: 1, scale: 1, y: 0, rotate: 0, clipPath: "inset(0% 0% 0% 0% round 0%)", duration: 0.9, ease: "power3.out" }, 0)
        // SVG units are deliberately large enough to be visible at a 150–190px mark.
        .fromTo(q("[data-piece]"), { y: 150, scale: 0.84, opacity: 0, transformOrigin: "50% 50%" },
          { y: 0, scale: 1, opacity: 1, duration: 0.82, stagger: 0.055, ease: "power3.out" }, 0.08)
        .to(mark, { scale: 1.065, rotate: 1.2, duration: 0.46, ease: "sine.inOut" }, 1.08);
    }

    sequence.addPause("prepared", () => {
      element.dataset.preloaderPhase = "waiting";
      if (!reduced) breathing = gsap.to(mark, {
        scale: 1.025, rotate: -0.7, duration: 0.65, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      ready.then(() => {
        if (!alive || finished) return;
        breathing?.kill();
        element.dataset.preloaderPhase = "exiting";
        sequence.play();
      });
    });
    if (reduced) {
      sequence.call(handOver).to(element, { autoAlpha: 0, duration: 0.2 });
    } else {
      sequence.to(mark, { scale: 1.22, rotate: 0, y: -16, autoAlpha: 0, duration: 0.55, ease: "power2.in" }, "prepared")
        .to(q("[data-curtain]"), { yPercent: -128, duration: 0.95, stagger: 0.08, ease: "power3.inOut" }, "prepared+=0.2")
        .call(handOver, [], "prepared+=0.58");
    }
    // Let the other layout effects finish before starting the animation clock.
    // Starting inside this layout effect can consume the entrance before paint.
    const startupFrame = requestAnimationFrame(() => sequence.play(0));

    return () => {
      alive = false;
      controller.abort();
      cancelAnimationFrame(startupFrame);
      clearTimeout(failsafe);
      breathing?.kill();
      sequence.kill();
      delete document.documentElement.dataset.intro;
    };
  }, { scope: root });

  if (state === "done") return null;
  return (
    <div ref={root} className="preloader fixed inset-0 z-[100]" data-state={state} data-preloader-phase="entering"
      role="status" aria-live="polite" aria-busy={state === "active"}>
      <span className="sr-only">{messages.ui.loading}</span>
      {CURTAINS.map((color, index) => (
        <div key={color} data-curtain aria-hidden className={`absolute inset-0 ${color}`} style={{ zIndex: 5 - index }}>
          <span className={`absolute -left-[20%] top-full h-[18svh] w-[140%] rounded-b-[50%] ${color}`} />
        </div>
      ))}
      <div className="absolute inset-0 z-10 grid place-items-center text-white" aria-hidden>
        <div data-preloader-symbol className="invisible opacity-0">
          <PulpaSymbol className="h-[clamp(132px,22vw,190px)] w-auto overflow-visible" />
        </div>
      </div>
    </div>
  );
}
