"use client";

import { useRef } from "react";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/data/site";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";

const COLORS = ["#F2CC58", "#BC4358", "#F2A16E", "#A9C77D", "#F6F1E8"];

export function Footer() {
  const root = useRef<HTMLElement>(null);
  const { messages } = useLanguage();
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ.reduced, () => {
      root.current!.querySelector<HTMLElement>("[data-footer-wordmark]")!.dataset.colorMotion = "reduced";
    });
    mm.add(MQ.motion, () => {
      const letters = gsap.utils.toArray<HTMLElement>("[data-footer-letter]", root.current);
      gsap.set(letters, { color: "#F6F1E8" });
      const wordmark = root.current!.querySelector<HTMLElement>("[data-footer-wordmark]")!;
      const sequence = gsap.timeline({ paused: true, repeat: -1, repeatRefresh: true });
      let previousOrder = "";
      for (let round = 0; round < 12; round++) {
        const order = gsap.utils.shuffle([0, 1, 2, 3, 4]);
        if (order.join("") === previousOrder) order.push(order.shift()!);
        previousOrder = order.join("");
        order.forEach((index, step) => sequence.to(letters[index], {
          color: () => {
            const current = String(gsap.getProperty(letters[index], "color"));
            const options = COLORS.filter((color) => gsap.utils.splitColor(color).slice(0, 3).join(",") !== gsap.utils.splitColor(current).slice(0, 3).join(","));
            return gsap.utils.random(options);
          },
          duration: 1.25, ease: "sine.inOut",
        }, round * 4.2 + step * 0.36));
      }
      sequence.to({}, { duration: 1.2 });
      const sync = (visible: boolean) => {
        sequence.paused(!visible);
        wordmark.dataset.colorMotion = visible ? "running" : "paused";
      };
      ScrollTrigger.create({
        trigger: wordmark, start: "top bottom", end: "bottom top",
        onToggle: (self) => sync(self.isActive),
        onRefresh: (self) => sync(self.isActive),
      });
      sync(ScrollTrigger.isInViewport(wordmark));
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <footer ref={root} data-nav-theme="dark" className="relative -mt-16 overflow-hidden rounded-t-[2.5rem] bg-charcoal pt-32 pb-8 text-ivory sm:rounded-t-[3.5rem]">
      <div className="container-x grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
        <div className="sm:col-span-2 lg:col-span-5">
          <Logo className="pulpa-logo--footer" />
          <p className="t-heading mt-8 text-[clamp(1.8rem,3vw,2.6rem)]">{messages.tagline}</p>
          <p className="mt-4 max-w-[40ch] text-[0.92rem] leading-relaxed text-ivory/65">{messages.footer}</p>
        </div>
        <nav aria-label={messages.ui.footer} className="lg:col-span-2 lg:col-start-7">
          <p className="t-eyebrow text-ivory/50">{messages.ui.navigate}</p>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.id}><a href={link.href} className="font-display font-semibold transition-colors duration-300 hover:text-sola">
                {messages.nav[link.id]}
              </a></li>
            ))}
          </ul>
        </nav>
        <div className="lg:col-span-2">
          <p className="t-eyebrow text-ivory/50">{messages.ui.follow}</p>
          <ul className="mt-5 space-y-3">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}><a href={social.href} target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-display font-semibold transition-colors duration-300 hover:text-rubra-soft">
                {social.label}<span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </a></li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <p className="t-eyebrow text-ivory/50">{messages.ui.credits}</p>
          <p className="mt-5 font-display font-semibold">{messages.ui.concept} {SITE.studio}</p>
          <a href="#home" className="t-eyebrow mt-6 inline-flex items-center gap-2 text-sola hover:text-ivory">{messages.ui.backToTop} ↑</a>
        </div>
      </div>
      <p data-footer-wordmark aria-hidden className="t-wordmark mt-20 flex justify-center px-[var(--gutter)] text-[clamp(3.2rem,14vw,17rem)] leading-[0.8] select-none">
        {"PULPA".split("").map((letter, index) => <span key={index} data-footer-letter className="inline-block">{letter}</span>)}
      </p>
      <div className="container-x mt-10 flex flex-col gap-3 border-t border-ivory/15 pt-6 text-[0.78rem] text-ivory/55 sm:flex-row sm:justify-between">
        <p>© {SITE.year} {SITE.fullName}. {messages.ui.disclaimer}</p>
        <p>{messages.ui.concept} {SITE.studio}</p>
      </div>
    </footer>
  );
}
