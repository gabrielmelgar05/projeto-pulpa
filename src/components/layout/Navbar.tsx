"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { NavbarLogo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useIntro } from "@/components/providers/SiteProviders";
import { useActiveSection } from "@/hooks/useActiveSection";
import { NAV_LINKS, type NavSectionId } from "@/data/site";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export function Navbar() {
  const { messages, locale } = useLanguage();
  const header = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Partial<Record<NavSectionId, HTMLAnchorElement | null>>>({});
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [indicator, setIndicator] = useState({ x: 0, w: 0 });
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const active = useActiveSection(SECTION_IDS, "home");
  const { introDone } = useIntro();
  const menuOpenRef = useRef(false);
  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  // Sliding active-link indicator
  useLayoutEffect(() => {
    const measure = () => {
      const el = linkRefs.current[active];
      if (el) setIndicator({ x: el.offsetLeft, w: el.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active, locale, introDone]);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-nav-item]", header.current);
      const mm = gsap.matchMedia();

      // Logo turns ivory over sections marked data-nav-theme="dark".
      // (document-level query: these sections live outside the header scope)
      if (introDone) document.querySelectorAll<HTMLElement>('[data-nav-theme="dark"]').forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 48px",
          end: "bottom 48px",
          onToggle: (self) => setTheme(self.isActive ? "dark" : "light"),
        });
      });

      mm.add(MQ.motion, () => {
        // Hidden until the preloader hands over (the preloader covers the page meanwhile).
        if (!introDone) {
          gsap.set(items, { autoAlpha: 0, y: -36 });
          return;
        }
        gsap.fromTo(items, { autoAlpha: 0, y: -36 }, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.08, ease: "expo.out", delay: 0.15 });

        // Hide on scroll down, reveal on scroll up.
        let hidden = false;
        const st = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate(self) {
            const shouldHide = self.scroll() > 160 && self.direction === 1 && !menuOpenRef.current;
            if (shouldHide === hidden) return;
            hidden = shouldHide;
            gsap.to(bar.current, { yPercent: shouldHide ? -160 : 0, duration: 0.7, ease: "power3.out", overwrite: true });
          },
        });
        return () => st.kill();
      });
      return () => mm.revert();
    },
    { scope: header, dependencies: [introDone], revertOnUpdate: true },
  );

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (menuOpen) gsap.to(bar.current, { yPercent: 0, duration: 0.4, overwrite: true });
  }, [menuOpen]);

  return (
    <>
      <header ref={header} className="pointer-events-none fixed inset-x-0 top-0 z-[70]">
        <div ref={bar} className="container-x flex items-center justify-between gap-3 pt-3 sm:pt-4 lg:pt-5">
          <a
            href="#home"
            data-nav-item
            className={`pointer-events-auto flex h-12 items-center transition-colors duration-500 ${
              theme === "dark" ? "text-ivory" : "text-charcoal"
            }`}
            aria-label={`PULPA — ${messages.ui.backToTop}`}
          >
            <NavbarLogo />
          </a>

          <nav aria-label={messages.ui.primary} data-nav-item className="glass pointer-events-auto relative hidden rounded-full p-1.5 lg:block">
            <ul className="relative flex items-center">
              <li
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 rounded-full bg-charcoal transition-[transform,width] duration-700 ease-[var(--ease-out-expo)]"
                style={{ transform: `translateX(${indicator.x}px)`, width: indicator.w }}
              />
              {NAV_LINKS.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id}>
                    <a
                      ref={(el) => {
                        linkRefs.current[link.id] = el;
                      }}
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={`group relative block rounded-full px-5 py-2.5 font-display text-[0.82rem] font-semibold tracking-[0.04em] transition-colors duration-500 ${
                        isActive ? "text-ivory" : "text-charcoal hover:text-rubra"
                      }`}
                    >
                      <span className="roll">
                        <span>{messages.nav[link.id]}</span>
                        <span aria-hidden>{messages.nav[link.id]}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="pointer-events-auto flex items-center gap-2" data-nav-item>
            <LanguageSelector />
            <span className="hidden xl:block">
              <Button href="#fragrances" variant="dark" magnetic>
                {messages.ui.explore}
              </Button>
            </span>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? messages.ui.closeMenu : messages.ui.openMenu}
              className={`grid h-12 w-12 place-items-center rounded-full transition-colors duration-500 lg:hidden ${
                menuOpen ? "bg-ivory text-charcoal" : "glass text-charcoal"
              }`}
            >
              <span className="relative block h-3 w-5" aria-hidden>
                <span
                  className={`absolute left-0 h-[2px] w-full rounded bg-current transition-transform duration-500 ${
                    menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[2px] rounded bg-current transition-all duration-500 ${
                    menuOpen ? "top-1/2 w-full -translate-y-1/2 -rotate-45" : "top-full w-3/5 -translate-y-full"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} activeId={active} />
    </>
  );
}
