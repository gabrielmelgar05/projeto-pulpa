import type { AssetEntry, AssetId, FruitKind } from "@/types";

/**
 * CENTRAL IMAGE REGISTRY
 * ----------------------
 * Every image on the website is declared here, once.
 * Components only reference an `AssetId`; they never hard-code paths.
 *
 * How placeholders work:
 *   At build/request time `getAvailableAssetIds()` (src/lib/assets.server.ts)
 *   checks whether each `src` exists inside /public. If the file exists the
 *   real image renders; if not, the designed placeholder renders instead.
 *   => To add an image: drop the file at its `src` path. No code change needed.
 *
 * Fine-tuning after generation: adjust `position`, `scale` or `fit` here.
 * Full documentation: docs/IMAGE_GENERATION_GUIDE.md
 */

const HERO_BG_SIZES = "100vw";
const BOTTLE_SIZES = "(min-width: 1024px) 34vw, 70vw";
const CUTOUT_SIZES = "(min-width: 1024px) 22vw, 40vw";

function heroBackground(id: AssetId): AssetEntry {
  return {
    id,
    src: `/images/hero/${id}.webp`,
    alt: "",
    ratio: 16 / 9,
    transparent: false,
    fit: "cover",
    position: "50% 50%",
    scale: 1,
    sizes: HERO_BG_SIZES,
    priority: id === "hero-bg-sola",
    section: "Hero",
    component: "HeroBackdrop",
  };
}

function bottle(id: AssetId, name: string): AssetEntry {
  return {
    id,
    src: `/images/fragrances/${id}.webp`,
    alt: `PULPA ${name} eau de parfum bottle`,
    ratio: 4 / 5,
    transparent: true,
    fit: "contain",
    position: "50% 100%",
    scale: 1,
    sizes: BOTTLE_SIZES,
    priority: id === "fragrance-bottle-sola",
    section: "Hero · Collection · Experience · Final CTA",
    component: "FragranceBottle",
  };
}

function cutout(id: AssetId, alt: string): AssetEntry {
  return {
    id,
    src: `/images/fruits/${id}.webp`,
    alt,
    ratio: 1,
    transparent: true,
    fit: "contain",
    position: "50% 50%",
    scale: 1,
    sizes: CUTOUT_SIZES,
    section: "Hero · Collection · Experience",
    component: "ImageSlot (fruit layer)",
  };
}

function universe(id: AssetId, alt: string): AssetEntry {
  return {
    id,
    src: `/images/fruits/${id}.webp`,
    alt,
    ratio: 4 / 5,
    transparent: false,
    fit: "cover",
    position: "50% 50%",
    scale: 1,
    sizes: "(min-width: 1024px) 28vw, 80vw",
    section: "The Fruit Universe",
    component: "FruitUniverse",
  };
}

export const ASSETS: Record<AssetId, AssetEntry> = {
  // ── Hero backgrounds (one per fragrance world, cross-faded) ──
  "hero-bg-sola": heroBackground("hero-bg-sola"),
  "hero-bg-rubra": heroBackground("hero-bg-rubra"),
  "hero-bg-marea": heroBackground("hero-bg-marea"),
  "hero-bg-vera": heroBackground("hero-bg-vera"),

  "hero-pedestal": {
    id: "hero-pedestal",
    src: "/images/hero/hero-pedestal.webp",
    alt: "",
    ratio: 2 / 1,
    transparent: true,
    fit: "contain",
    position: "50% 100%",
    scale: 1,
    sizes: "(min-width: 1024px) 40vw, 90vw",
    priority: true,
    section: "Hero",
    component: "Hero",
  },

  // ── Bottles (shared everywhere — one consistent packshot per fragrance) ──
  "fragrance-bottle-sola": bottle("fragrance-bottle-sola", "SOLA"),
  "fragrance-bottle-rubra": bottle("fragrance-bottle-rubra", "RUBRA"),
  "fragrance-bottle-marea": bottle("fragrance-bottle-marea", "MAREA"),
  "fragrance-bottle-vera": bottle("fragrance-bottle-vera", "VERA"),

  // ── Fruit cut-outs (separate layers so GSAP can animate them) ──
  "fruit-cutout-pineapple": cutout("fruit-cutout-pineapple", "Fresh pineapple with a green crown"),
  "fruit-cutout-pineapple-accent": cutout("fruit-cutout-pineapple-accent", ""),
  "fruit-cutout-berries": cutout("fruit-cutout-berries", "Cluster of ripe raspberries"),
  "fruit-cutout-berries-accent": cutout("fruit-cutout-berries-accent", ""),
  "fruit-cutout-papaya": cutout("fruit-cutout-papaya", "Halved papaya with black seeds"),
  "fruit-cutout-papaya-accent": cutout("fruit-cutout-papaya-accent", ""),
  "fruit-cutout-apple": cutout("fruit-cutout-apple", "Crisp green apple with a fresh leaf"),
  "fruit-cutout-apple-accent": cutout("fruit-cutout-apple-accent", ""),

  // ── The Fruit Universe ──
  "fruit-universe-pineapple": universe("fruit-universe-pineapple", "Macro photograph of pineapple skin and golden flesh"),
  "fruit-universe-berries": universe("fruit-universe-berries", "Macro photograph of glossy raspberries"),
  "fruit-universe-papaya": universe("fruit-universe-papaya", "Macro photograph of papaya flesh and seeds"),
  "fruit-universe-apple": universe("fruit-universe-apple", "Macro photograph of a dew-covered green apple"),

  // ── Our Philosophy ──
  "philosophy-editorial": {
    id: "philosophy-editorial",
    src: "/images/editorial/philosophy-editorial.webp",
    alt: "Editorial still life: a hand holding a PULPA bottle among cut tropical fruit",
    ratio: 4 / 5,
    transparent: false,
    fit: "cover",
    position: "50% 40%",
    scale: 1,
    sizes: "(min-width: 1024px) 38vw, 90vw",
    section: "Our Philosophy",
    component: "Philosophy",
  },
  "philosophy-detail": {
    id: "philosophy-detail",
    src: "/images/editorial/philosophy-detail.webp",
    alt: "Close-up of fruit juice droplets on perfume glass",
    ratio: 1,
    transparent: false,
    fit: "cover",
    position: "50% 50%",
    scale: 1,
    sizes: "(min-width: 1024px) 18vw, 45vw",
    section: "Our Philosophy",
    component: "Philosophy",
  },

  // ── The Experience ──
  "experience-backdrop": {
    id: "experience-backdrop",
    src: "/images/editorial/experience-backdrop.webp",
    alt: "",
    ratio: 16 / 9,
    transparent: false,
    fit: "cover",
    position: "50% 50%",
    scale: 1,
    sizes: "100vw",
    section: "The Experience",
    component: "Experience",
  },
};

export const ASSET_IDS = Object.keys(ASSETS) as AssetId[];

export function getAsset(id: AssetId): AssetEntry {
  return ASSETS[id];
}

/** Small photographic derivatives of the original transparent fruit layers. */
export const FRUIT_THUMBNAILS: Record<FruitKind, string> = {
  pineapple: "/images/fruits/thumbnails/pineapple.webp",
  berries: "/images/fruits/thumbnails/berries.webp",
  papaya: "/images/fruits/thumbnails/papaya.webp",
  apple: "/images/fruits/thumbnails/apple.webp",
};
