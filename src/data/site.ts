export const SITE = {
  name: "PULPA",
  fullName: "PULPA Parfums",
  tagline: "Wear your wild side.",
  description:
    "PULPA is a contemporary fruit-inspired perfumery. Four bold eaux de parfum — SOLA, RUBRA, MAREA and VERA — that turn fruit into expressive, sensory scents.",
  studio: "Aklio Studio",
  year: 2026,
} as const;

export const NAV_LINKS = [
  { id: "home", href: "#home" },
  { id: "fragrances", href: "#fragrances" },
  { id: "story", href: "#story" },
  { id: "experience", href: "#experience" },
] as const;

export type NavSectionId = (typeof NAV_LINKS)[number]["id"];

/** Demonstrative social links (fictional brand — they point to the platforms only). */
export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "TikTok", href: "https://www.tiktok.com/" },
  { label: "Pinterest", href: "https://www.pinterest.com/" },
  { label: "Spotify", href: "https://open.spotify.com/" },
] as const;
