"use client";

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { FRAGRANCES } from "@/data/fragrances";
import { MESSAGES, PT_FRAGRANCES, type Locale, type Messages } from "@/i18n/messages";
import { ScrollTrigger } from "@/lib/gsap";

const LanguageContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void; messages: Messages } | null>(null);

/** English on every document load, including when browser storage prefers Portuguese.
 * A manual selection lives only in this mounted page. No automatic locale detection.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, updateLocale] = useState<Locale>("en");
  const frame = useRef(0);
  const setLocale = useCallback((next: Locale) => {
    // Pinned scenes use scroll distance as their internal position. Preserve
    // that progress as well as the section offset used by normal document flow.
    const pinned = ScrollTrigger.getAll().find((trigger) => trigger.pin && scrollY >= trigger.start && scrollY < trigger.end);
    const progress = pinned ? (scrollY - pinned.start) / (pinned.end - pinned.start) : 0;
    const anchor = [...document.querySelectorAll<HTMLElement>("main > section, footer")].find((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top <= innerHeight * 0.35 && rect.bottom > innerHeight * 0.35;
    });
    const offset = anchor ? -anchor.getBoundingClientRect().top : 0;
    flushSync(() => updateLocale(next));
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      // All localized useGSAP cleanups, SplitText instances and DOM updates
      // have finished. Refresh once here, never midway through sibling hooks.
      ScrollTrigger.refresh();
      if (pinned?.pin?.isConnected) {
        window.scrollTo({ top: pinned.start + (pinned.end - pinned.start) * progress, behavior: "instant" });
      } else if (anchor) {
        const rect = anchor.getBoundingClientRect();
        const preservedOffset = Math.min(offset, Math.max(0, rect.height - innerHeight * 0.35 - 1));
        window.scrollTo({ top: rect.top + scrollY + preservedOffset, behavior: "instant" });
      }
      ScrollTrigger.update();
    });
  }, []);

  useEffect(() => {
    const onRestore = (event: PageTransitionEvent) => {
      if (event.persisted) setLocale("en");
    };
    window.addEventListener("pageshow", onRestore);
    return () => window.removeEventListener("pageshow", onRestore);
  }, [setLocale]);

  useLayoutEffect(() => {
    document.documentElement.lang = locale;
    document.title = `PULPA Parfums — ${MESSAGES[locale].tagline}`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", MESSAGES[locale].description);
    return () => cancelAnimationFrame(frame.current);
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, messages: MESSAGES[locale] }), [locale, setLocale]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage requires LanguageProvider");
  return context;
}

export function useFragrances() {
  const { locale } = useLanguage();
  return useMemo(() => locale === "en" ? FRAGRANCES : FRAGRANCES.map((f) => ({ ...f, ...PT_FRAGRANCES[f.id] })), [locale]);
}
