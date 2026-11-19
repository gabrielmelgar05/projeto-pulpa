"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AssetId } from "@/types";
import { ScrollTrigger } from "@/lib/gsap";
import { smoothScrollTo } from "@/lib/events";
import { LanguageProvider } from "@/components/providers/LanguageProvider";

/* ── Assets: which image files exist ─────────────────────────── */
const AssetContext = createContext<ReadonlySet<AssetId>>(new Set());

export function useAssetAvailable(id: AssetId): boolean {
  return useContext(AssetContext).has(id);
}

/* ── Intro: preloader → hero hand-off ─────────────────────────── */
interface IntroState {
  introDone: boolean;
  completeIntro: () => void;
}
const IntroContext = createContext<IntroState>({ introDone: false, completeIntro: () => {} });

export function useIntro() {
  return useContext(IntroContext);
}

export function SiteProviders({
  availableAssets,
  children,
}: {
  availableAssets: AssetId[];
  children: ReactNode;
}) {
  const assetSet = useMemo(() => new Set(availableAssets), [availableAssets]);
  const [introDone, setIntroDone] = useState(false);
  const completeIntro = useCallback(() => setIntroDone(true), []);
  const intro = useMemo(() => ({ introDone, completeIntro }), [introDone, completeIntro]);

  // `?slots` in the URL outlines every image slot with its asset ID.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("slots")) {
      document.documentElement.dataset.showSlots = "true";
    }
  }, []);

  // Smooth in-page anchor navigation (works with pinned ScrollTrigger sections).
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      smoothScrollTo(target, () => {
        history.replaceState(null, "", hash);
        if (target instanceof HTMLElement) target.focus({ preventScroll: true });
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Late font metrics change text heights → recompute pinned sections once.
  useEffect(() => {
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (introDone) ScrollTrigger.refresh();
  }, [introDone]);

  return (
    <LanguageProvider>
      <AssetContext.Provider value={assetSet}>
        <IntroContext.Provider value={intro}>{children}</IntroContext.Provider>
      </AssetContext.Provider>
    </LanguageProvider>
  );
}
