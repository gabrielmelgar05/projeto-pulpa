import type { Fragrance, FragranceId } from "@/types";

/**
 * THE COLLECTION
 * --------------
 * Single source of truth for the four fragrances. Every section (hero
 * switcher, collection rail, final CTA) reads from this array, so adding,
 * reordering or editing a fragrance only happens here.
 *
 * `palette.base` comes straight from the brand identity. The other tones are
 * derived for depth, soft backgrounds and readable text.
 */
export const FRAGRANCES: Fragrance[] = [
  {
    id: "sola",
    index: "01",
    name: "SOLA",
    fruit: "Pineapple",
    fruitKind: "pineapple",
    mood: "Solar & electric",
    personality: ["Vibrant", "Solar", "Energetic", "Bold"],
    tagline: "Sunlight you can wear.",
    description:
      "Golden pineapple cracked open under a midday sun. Bright, fizzy and impossible to ignore — SOLA is pure energy on skin.",
    notes: {
      top: ["Pineapple", "Bergamot", "Pink pepper"],
      heart: ["Coconut water", "Neroli"],
      base: ["Ambrette", "Sun-warmed woods"],
    },
    palette: {
      base: "#F2CC58",
      deep: "#C8921F",
      soft: "#FBEFC6",
      glow: "#FFF6D2",
      ink: "#201F1C",
    },
    assets: {
      bottle: "fragrance-bottle-sola",
      fruit: "fruit-cutout-pineapple",
      fruitAccent: "fruit-cutout-pineapple-accent",
      heroBackground: "hero-bg-sola",
    },
  },
  {
    id: "rubra",
    index: "02",
    name: "RUBRA",
    fruit: "Red Berries",
    fruitKind: "berries",
    mood: "Intense & magnetic",
    personality: ["Intense", "Passionate", "Sweet", "Expressive"],
    tagline: "Crushed berries, racing heart.",
    description:
      "A handful of raspberries crushed between the fingers. Juicy, deep and a little dangerous — RUBRA is the scent of a crush.",
    notes: {
      top: ["Raspberry", "Red currant", "Pink pepper"],
      heart: ["Wild rose", "Blackberry leaf"],
      base: ["Vanilla absolute", "Soft musk"],
    },
    palette: {
      base: "#BC4358",
      deep: "#7A2135",
      soft: "#F4CDD3",
      glow: "#E9879A",
      ink: "#F6F1E8",
    },
    assets: {
      bottle: "fragrance-bottle-rubra",
      fruit: "fruit-cutout-berries",
      fruitAccent: "fruit-cutout-berries-accent",
      heroBackground: "hero-bg-rubra",
    },
  },
  {
    id: "marea",
    index: "03",
    name: "MAREA",
    fruit: "Papaya",
    fruitKind: "papaya",
    mood: "Warm & sensual",
    personality: ["Tropical", "Warm", "Spontaneous", "Sensual"],
    tagline: "Golden hour, bottled.",
    description:
      "Sliced papaya, salt on the skin and a sunset that refuses to end. MAREA is slow, warm and wonderfully spontaneous.",
    notes: {
      top: ["Papaya", "Mandarin", "Sea salt"],
      heart: ["Frangipani", "Apricot"],
      base: ["Tonka bean", "Driftwood"],
    },
    palette: {
      base: "#F2A16E",
      deep: "#C4612F",
      soft: "#FBDFCB",
      glow: "#FFD9BC",
      ink: "#201F1C",
    },
    assets: {
      bottle: "fragrance-bottle-marea",
      fruit: "fruit-cutout-papaya",
      fruitAccent: "fruit-cutout-papaya-accent",
      heroBackground: "hero-bg-marea",
    },
  },
  {
    id: "vera",
    index: "04",
    name: "VERA",
    fruit: "Green Apple",
    fruitKind: "apple",
    mood: "Crisp & unexpected",
    personality: ["Fresh", "Unexpected", "Light", "Modern"],
    tagline: "The first bite, forever.",
    description:
      "That sharp, cold crunch of a green apple — then something you didn't see coming. VERA is fresh, light and quietly rebellious.",
    notes: {
      top: ["Green apple", "Lime zest", "Mint"],
      heart: ["Fig leaf", "White tea"],
      base: ["Vetiver", "Clean musk"],
    },
    palette: {
      base: "#A9C77D",
      deep: "#5B7C36",
      soft: "#E4EED2",
      glow: "#EAF6CF",
      ink: "#201F1C",
    },
    assets: {
      bottle: "fragrance-bottle-vera",
      fruit: "fruit-cutout-apple",
      fruitAccent: "fruit-cutout-apple-accent",
      heroBackground: "hero-bg-vera",
    },
  },
];

export const FRAGRANCE_MAP = Object.fromEntries(FRAGRANCES.map((f) => [f.id, f])) as Record<
  FragranceId,
  Fragrance
>;

export function getFragrance(id: FragranceId): Fragrance {
  return FRAGRANCE_MAP[id];
}
