"use client";

import { useEffect, useState } from "react";

/** Tracks which of the given section IDs sits in the middle band of the viewport. */
export function useActiveSection<T extends string>(ids: readonly T[], fallback: T): T {
  const [active, setActive] = useState<T>(fallback);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as T);
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
