"use client";

import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { PT_ASSET_ALT } from "@/i18n/messages";
import { BrandLabel } from "@/components/ui/BrandLabel";
import type { CSSProperties, ReactNode } from "react";
import { getAsset } from "@/data/assets";
import { useAssetAvailable } from "@/components/providers/SiteProviders";
import { PulpaSymbol } from "@/components/ui/PulpaSymbol";
import type { AssetId } from "@/types";

const POSITIONED = /(^|\s)(absolute|fixed|sticky)(\s|$)/;

interface ImageSlotProps {
  id: AssetId;
  /** Sizing/positioning of the slot box. The slot always fills this box. */
  className?: string;
  style?: CSSProperties;
  /** Rendered while the image file does not exist yet. Defaults to a branded gradient. */
  fallback?: ReactNode;
  /** Colours for the default gradient placeholder. */
  tone?: [string, string];
  /** Override alt (e.g. when the slot is decorative in a given context). */
  alt?: string;
  priority?: boolean;
}

/**
 * A stable, documented image slot.
 * - `data-asset-id` makes every slot discoverable in the DOM (and visible with `?slots`).
 * - When the file listed in src/data/assets.ts exists, renders <Image fill>
 *   with the registry's object-fit / object-position / scale.
 * - Otherwise renders a designed placeholder so the composition never breaks.
 */
export function ImageSlot({ id, className = "", style, fallback, tone, alt, priority }: ImageSlotProps) {
  const { locale, messages } = useLanguage();
  const asset = getAsset(id);
  const localizedAlt = locale === "pt-BR" ? (id.startsWith("fragrance-bottle-") ? `PULPA ${id.split("-").at(-1)?.toUpperCase()} ${messages.ui.bottle}` : PT_ASSET_ALT[id] ?? asset.alt) : asset.alt;
  const available = useAssetAvailable(id);

  return (
    <div
      data-asset-id={id}
      data-asset-state={available ? "ready" : "placeholder"}
      className={`${POSITIONED.test(className) ? "" : "relative "}${className}`}
      style={style}
    >
      {available ? (
        <Image
          src={asset.src}
          alt={alt ?? localizedAlt}
          fill
          sizes={asset.sizes}
          preload={priority ?? asset.priority}
          draggable={false}
          className="select-none"
          style={{
            objectFit: asset.fit,
            objectPosition: asset.position,
            transform: asset.scale !== 1 ? `scale(${asset.scale})` : undefined,
          }}
        />
      ) : (
        (fallback ?? (
          <div
            className="slot-placeholder"
            style={{ "--ph-a": tone?.[0], "--ph-b": tone?.[1] } as CSSProperties}
            aria-hidden
          >
            <PulpaSymbol className="absolute top-1/2 left-1/2 h-[16%] max-h-24 w-auto -translate-x-1/2 -translate-y-1/2 text-ivory opacity-30" />
          </div>
        ))
      )}
      {available && <BrandLabel assetId={id} src={asset.src} />}
      <span className="slot-label" aria-hidden>
        {id}
      </span>
    </div>
  );
}
