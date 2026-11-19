"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { useEffect, useRef } from "react";
import { FruitArt } from "@/components/ui/FruitArt";
import { Sparkle } from "@/components/ui/Decor";
import { NAV_LINKS, SOCIAL_LINKS, type NavSectionId } from "@/data/site";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

export function MobileMenu({
  open,
  onClose,
  activeId,
}: {
  open: boolean;
  onClose: () => void;
  activeId: NavSectionId;
}) {
  const { messages } = useLanguage();
  const root = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const reduced = prefersReducedMotion();
      if (firstRender.current) {
        firstRender.current = false;
        gsap.set(el, { autoAlpha: 0 });
        return;
      }
      const q = gsap.utils.selector(el);
      if (open) {
        const tl = gsap.timeline();
        tl.set(el, { autoAlpha: 1 })
          .fromTo(
            el,
            { clipPath: "circle(0% at 92% 3%)" },
            { clipPath: "circle(150% at 92% 3%)", duration: reduced ? 0 : 0.9, ease: "expo.inOut" },
          )
          .fromTo(
            q("[data-menu-link]"),
            { yPercent: reduced ? 0 : 110 },
            { yPercent: 0, duration: reduced ? 0 : 1, stagger: 0.07, ease: "expo.out" },
            reduced ? 0 : 0.35,
          )
          .fromTo(
            q("[data-menu-fade]"),
            { autoAlpha: 0, y: reduced ? 0 : 16 },
            { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06 },
            reduced ? 0 : 0.6,
          )
          .fromTo(
            q("[data-menu-sticker]"),
            { scale: reduced ? 1 : 0, rotate: reduced ? 0 : -30 },
            { scale: 1, rotate: 0, duration: 0.9, stagger: 0.08, ease: "back.out(1.7)" },
            reduced ? 0 : 0.5,
          );
        q<HTMLAnchorElement>("[data-menu-link]")[0]?.focus({ preventScroll: true });
      } else {
        gsap.to(el, {
          clipPath: "circle(0% at 92% 3%)",
          duration: reduced ? 0 : 0.7,
          ease: "expo.inOut",
          onComplete: () => {
            gsap.set(el, { autoAlpha: 0 });
          },
        });
      }
    },
    { scope: root, dependencies: [open], revertOnUpdate: true },
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const controls = [
          ...document.querySelectorAll<HTMLElement>('header button, #mobile-menu a[href]'),
        ].filter((element) => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls.at(-1);
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) onClose();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, onClose]);

  return (
    <div
      ref={root}
      id="mobile-menu"
      className="invisible fixed inset-0 z-[65] overflow-y-auto bg-rubra text-ivory opacity-0 lg:hidden"
      data-scroll-lock={open ? "true" : undefined}
      inert={!open}
      aria-label={messages.ui.siteMenu}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative flex min-h-full flex-col justify-between px-[var(--gutter)] pt-28 pb-8">
        <span data-menu-sticker className="pointer-events-none absolute right-[6%] bottom-28 w-24 sm:w-32" aria-hidden>
          <FruitArt kind="pineapple" className="h-full w-full" />
        </span>
        <span data-menu-sticker className="pointer-events-none absolute right-[34%] bottom-52 w-12 text-sola" aria-hidden>
          <Sparkle className="h-full w-full" />
        </span>

        <nav aria-label={messages.ui.mobile}>
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.id} className="overflow-hidden">
                <a
                  href={link.href}
                  data-menu-link
                  onClick={onClose}
                  aria-current={activeId === link.id ? "true" : undefined}
                  className="group flex items-baseline gap-4 py-1"
                >
                  <span className="t-display text-[clamp(1.6rem,6.6vw,4rem)] transition-colors duration-300 group-hover:text-sola group-aria-[current=true]:text-sola">
                    {messages.nav[link.id]}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 space-y-6">
          <a
            data-menu-fade
            href="#fragrances"
            onClick={onClose}
            className="inline-flex h-14 items-center rounded-full bg-ivory px-7 font-display font-semibold text-charcoal"
          >
            {messages.ui.explore}
          </a>
          <ul data-menu-fade className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p data-menu-fade className="t-eyebrow text-ivory/60">
            {messages.tagline}
          </p>
        </div>
      </div>
    </div>
  );
}
