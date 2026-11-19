export type FragranceId = "sola" | "rubra" | "marea" | "vera";

export type FruitKind = "pineapple" | "berries" | "papaya" | "apple";

/** Colour tokens for one fragrance world. */
export interface FragrancePalette {
  /** Brand colour from the identity (main fill). */
  base: string;
  /** Darker tone for shapes, depth and outlines. */
  deep: string;
  /** Pale tint for soft backgrounds. */
  soft: string;
  /** Light bloom used behind the bottle. */
  glow: string;
  /** Text colour that reads on `base`. */
  ink: string;
}

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Fragrance {
  id: FragranceId;
  index: string;
  name: string;
  fruit: string;
  fruitKind: FruitKind;
  mood: string;
  personality: string[];
  tagline: string;
  description: string;
  notes: FragranceNotes;
  palette: FragrancePalette;
  /** Asset IDs from src/data/assets.ts */
  assets: {
    bottle: AssetId;
    fruit: AssetId;
    fruitAccent: AssetId;
    heroBackground: AssetId;
  };
}

/** Every image slot in the website. Must match src/data/assets.ts and docs/IMAGE_GENERATION_GUIDE.md */
export type AssetId =
  | "hero-bg-sola"
  | "hero-bg-rubra"
  | "hero-bg-marea"
  | "hero-bg-vera"
  | "hero-pedestal"
  | "fragrance-bottle-sola"
  | "fragrance-bottle-rubra"
  | "fragrance-bottle-marea"
  | "fragrance-bottle-vera"
  | "fruit-cutout-pineapple"
  | "fruit-cutout-pineapple-accent"
  | "fruit-cutout-berries"
  | "fruit-cutout-berries-accent"
  | "fruit-cutout-papaya"
  | "fruit-cutout-papaya-accent"
  | "fruit-cutout-apple"
  | "fruit-cutout-apple-accent"
  | "fruit-universe-pineapple"
  | "fruit-universe-berries"
  | "fruit-universe-papaya"
  | "fruit-universe-apple"
  | "philosophy-editorial"
  | "philosophy-detail"
  | "experience-backdrop";

export interface AssetEntry {
  id: AssetId;
  /** Public path, e.g. /images/hero/hero-bg-sola.webp */
  src: string;
  /** Accessible description. Empty string = decorative. */
  alt: string;
  /** Intrinsic aspect ratio of the generated file (width / height). */
  ratio: number;
  /** Transparent PNG/WebP cut-out vs. full-bleed photograph. */
  transparent: boolean;
  /** CSS object-fit applied when the real image renders. */
  fit: "cover" | "contain";
  /** CSS object-position, tweak after generating. */
  position: string;
  /** Extra scale applied to the real image (1 = none). */
  scale: number;
  /** `sizes` attribute for next/image. */
  sizes: string;
  /** Load eagerly (above-the-fold). */
  priority?: boolean;
  section: string;
  component: string;
}
