"use client";

import { useRef, type CSSProperties } from "react";
import { FruitThumbnail } from "@/components/ui/FruitThumbnail";
import { gsap, MQ, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import type { Fragrance, FragranceId } from "@/types";

interface PreviewActions {
  show: (index: number, row: HTMLElement, pointerY?: number) => void;
  move: (index: number, row: HTMLElement, pointerY: number) => void;
  hide: () => void;
}

/** One reusable photographic preview for the entire list, with no pointer state renders. */
export function FragranceList({ fragrances, activeId, onSelect }: {
  fragrances: Fragrance[]; activeId: FragranceId; onSelect: (index: number) => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const actions = useRef<PreviewActions | null>(null);
  const count = fragrances.length;

  useGSAP((_context, contextSafe) => {
    const element = preview.current!;
    const photos = gsap.utils.toArray<HTMLElement>("[data-fruit-preview]", element);
    const xTo = gsap.quickTo(element, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(element, "y", { duration: 0.45, ease: "power3.out" });
    const photoTo = photos.map((photo) => gsap.quickTo(photo, "opacity", { duration: 0.22, ease: "power2.out" }));
    const reveal = gsap.fromTo(element, { autoAlpha: 0, scale: 0.82, rotate: -6 }, {
      autoAlpha: 1, scale: 1, rotate: 3, duration: 0.38, ease: "power3.out", paused: true,
    });
    let selected: number | null = null;
    const position = (row: HTMLElement, pointerY?: number) => {
      const rect = row.getBoundingClientRect();
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      // Stay beside the list, outside the row's readable text.
      const x = Math.max(12, rect.left - width - 20);
      const y = Math.max(84, Math.min(innerHeight - height - 12, (pointerY ?? rect.top + rect.height / 2) - height / 2));
      return { x, y };
    };
    const show = contextSafe!((index: number, row: HTMLElement, pointerY?: number) => {
      if (!window.matchMedia(`${MQ.desktop} and ${MQ.finePointer}`).matches) return;
      const point = position(row, pointerY);
      if (selected === null && reveal.progress() < 0.01) {
        xTo(point.x).progress(1);
        yTo(point.y).progress(1);
      } else { xTo(point.x); yTo(point.y); }
      if (selected !== index) photoTo.forEach((to, i) => to(i === index ? 1 : 0));
      selected = index;
      reveal.timeScale(prefersReducedMotion() ? 1000 : 1).play();
    });
    const hide = contextSafe!(() => {
      selected = null;
      reveal.timeScale(prefersReducedMotion() ? 1000 : 1.5).reverse();
    });
    actions.current = {
      show,
      move: (index, row, pointerY) => {
        if (selected === null) show(index, row, pointerY);
        else { const point = position(row, pointerY); xTo(point.x); yTo(point.y); }
      },
      hide,
    };
    window.addEventListener("scroll", hide, { passive: true });
    window.addEventListener("resize", hide);
    return () => {
      window.removeEventListener("scroll", hide);
      window.removeEventListener("resize", hide);
      actions.current = null;
    };
  }, { scope: root, dependencies: [count], revertOnUpdate: true });

  return (
    <div ref={root} className="fragrance-list">
      <ol data-reveal="fade" data-delay="0.1" className="fragrance-list__rows">
        {fragrances.map((fragrance, index) => (
          <li key={fragrance.id}>
            <button type="button" data-fragrance-link={fragrance.id} aria-current={activeId === fragrance.id ? "true" : undefined}
              style={{ "--row-accent": fragrance.palette.deep } as CSSProperties}
              className="fragrance-list__row group" onClick={() => { actions.current?.hide(); onSelect(index); }}
              onPointerEnter={(event) => { if (event.pointerType !== "touch") actions.current?.show(index, event.currentTarget, event.clientY); }}
              onPointerMove={(event) => { if (event.pointerType !== "touch") actions.current?.move(index, event.currentTarget, event.clientY); }}
              onPointerLeave={() => actions.current?.hide()}
              onFocus={(event) => { if (event.currentTarget.matches(":focus-visible")) actions.current?.show(index, event.currentTarget); }}
              onBlur={() => actions.current?.hide()}>
              <FruitThumbnail kind={fragrance.fruitKind} className="h-11 w-11 transition-transform duration-500 group-hover:scale-110 group-focus-visible:scale-110" />
              <span className="fragrance-list__name">{fragrance.name}</span>
              <span className="fragrance-list__fruit">{fragrance.fruit}</span>
              <span aria-hidden className="fragrance-list__arrow">↗</span>
            </button>
          </li>
        ))}
      </ol>
      <div ref={preview} className="fragrance-preview invisible opacity-0" aria-hidden>
        {fragrances.map((fragrance) => (
          <div key={fragrance.id} data-fruit-preview={fragrance.id} className="absolute inset-3 opacity-0">
            <FruitThumbnail kind={fragrance.fruitKind} className="h-full w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
