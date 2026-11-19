"use client";

import { ImageSlot } from "@/components/ui/ImageSlot";
import { BottleArt } from "@/components/ui/BottleArt";
import { FruitArt } from "@/components/ui/FruitArt";
import type { Fragrance } from "@/types";

/** Bottle packshot slot (4:5). Falls back to the vector flacon. */
export function FragranceBottle({
  fragrance,
  className = "",
  priority,
  decorative = false,
}: {
  fragrance: Fragrance;
  className?: string;
  priority?: boolean;
  decorative?: boolean;
}) {
  return (
    <ImageSlot
      id={fragrance.assets.bottle}
      className={`aspect-[4/5] ${className}`}
      priority={priority}
      alt={decorative ? "" : undefined}
      fallback={<BottleArt fragrance={fragrance} className="absolute inset-0 h-full w-full" />}
    />
  );
}

/** Fruit cut-out slot (1:1, transparent). Falls back to the illustrated fruit. */
export function FruitCutout({
  fragrance,
  variant = "primary",
  className = "",
}: {
  fragrance: Fragrance;
  variant?: "primary" | "accent";
  className?: string;
}) {
  const id = variant === "primary" ? fragrance.assets.fruit : fragrance.assets.fruitAccent;
  return (
    <ImageSlot
      id={id}
      className={`aspect-square ${className}`}
      alt=""
      fallback={
        <FruitArt kind={fragrance.fruitKind} variant={variant} className="absolute inset-[6%] h-[88%] w-[88%]" />
      }
    />
  );
}
