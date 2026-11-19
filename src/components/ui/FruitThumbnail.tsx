import Image from "next/image";
import { FRUIT_THUMBNAILS } from "@/data/assets";
import type { FruitKind } from "@/types";

/** The enclosing control supplies the translated accessible name. */
export function FruitThumbnail({ kind, className = "h-10 w-10" }: { kind: FruitKind; className?: string }) {
  return (
    <span className={`fruit-thumbnail relative inline-flex aspect-square shrink-0 ${className}`} aria-hidden>
      <Image src={FRUIT_THUMBNAILS[kind]} alt="" width={256} height={256} unoptimized
        className="h-full w-full object-contain" draggable={false} />
    </span>
  );
}
