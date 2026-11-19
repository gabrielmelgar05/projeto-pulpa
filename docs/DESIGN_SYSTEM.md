# PULPA. — Design System

**Direction:** Contemporary Luxury × Playful Editorial × Organic Illustration × Creative Motion.
Colour is the protagonist. Ivory breathing space and charcoal type keep it premium, not childish.

Tokens live in [`src/app/globals.css`](../src/app/globals.css) (`@theme`) and are available as Tailwind utilities (`bg-sola`, `text-rubra-soft`, …).

---

## 1. Palette

| Token | Hex | Role |
|---|---|---|
| `ivory` | `#F6F1E8` | Page background, light text on colour |
| `ivory-deep` | `#ECE4D6` | Subtle surfaces |
| `charcoal` | `#201F1C` | Primary text, dark buttons, footer |
| `charcoal-soft` | `#4A4740` | Secondary text |
| `wine` | `#4A1220` | The Experience (only "dark" moment — still red, never grey/black) |

Fragrance worlds (each has `base` from the identity + derived tones, defined in [`src/data/fragrances.ts`](../src/data/fragrances.ts)):

| Fragrance | base | deep | soft | glow | ink (text on base) |
|---|---|---|---|---|---|
| SOLA · Pineapple | `#F2CC58` | `#C8921F` | `#FBEFC6` | `#FFF6D2` | charcoal |
| RUBRA · Red Berries | `#BC4358` | `#7A2135` | `#F4CDD3` | `#E9879A` | ivory |
| MAREA · Papaya | `#F2A16E` | `#C4612F` | `#FBDFCB` | `#FFD9BC` | charcoal |
| VERA · Green Apple | `#A9C77D` | `#5B7C36` | `#E4EED2` | `#EAF6CF` | charcoal |

Rules
- One dominant colour per section; others appear as accents (stickers, pills, ribbons).
- Text on RUBRA uses ivory; on SOLA / MAREA / VERA uses charcoal (WCAG AA for large and body text).
- The hero animates CSS custom properties (`--hero-base`, `--hero-deep`, `--hero-soft`, `--hero-glow`, `--hero-ink`) — never hard-code hero colours.

Section rhythm: Hero (fragrance colour) → Marquee (rubra + sola ribbons) → Collection (ivory → four colour panels) → Fruit Universe (ivory + colour tiles) → Philosophy (marea) → Experience (wine) → Final CTA (sola) → Footer (charcoal).

---

## 2. Typography — sans-serif only

| Family | Use | Loaded via |
|---|---|---|
| **Syne** 500–800 | Display, headlines, wordmark, labels, buttons | `next/font/google` → `--font-syne` → `font-display` |
| **Manrope** 400–700 | Body copy, descriptions | `next/font/google` → `--font-manrope` → `font-sans` |

No serif font is used anywhere (no italics-as-luxury trick).

### Type utilities

| Utility | Spec | Used for |
|---|---|---|
| `t-mega` | Syne 800, line-height .82, tracking −0.045em, uppercase | Hero "WILD SIDE.", CTA, panel names |
| `t-display` | Syne 800, line-height .88, tracking −0.035em, uppercase | Section headlines |
| `t-heading` | Syne 700, line-height .95, tracking −0.025em | Taglines, sub-headings |
| `t-eyebrow` | Syne 600, .72rem, tracking .24em, uppercase | Labels, section indexes |
| `t-wordmark` | Syne 800, tracking .04em, uppercase | "PULPA." wordmark |
| `text-outline` | 1.5px stroke, transparent fill | Giant collection numerals |

### Scale (fluid, `clamp`)

| Level | Mobile → Desktop |
|---|---|
| Hero words | 1.9rem / 9.6vw → min(9.4vw, 16svh), max 12.5rem |
| Mega CTA | 3rem → 12.5rem |
| Section display | 2–2.4rem → 5.6–7rem |
| Panel name | 3rem / 14.5vw → min(6.8vw, 15svh) |
| Heading | 1.35rem → 2.6rem |
| Body | 0.9–1.05rem, line-height 1.6 |
| Eyebrow | 0.6–0.72rem |

**Rule:** a display line must always fit its column at every breakpoint (the masked reveal clips anything wider). Check 320 / 390 / 768 / 1024 / 1440.

---

## 3. Logo

- Symbol: the official pineapple, vector-traced 1:1 from the supplied PNG → [`src/data/brand-symbol.ts`](../src/data/brand-symbol.ts). **Never redraw these paths.** It is split into 5 pieces only for animation.
- Lock-up ([`Logo.tsx`](../src/components/ui/Logo.tsx)): symbol + "PULPA." in **one colour** (`currentColor`), heavy Syne 800 so the wordmark carries the same weight as the symbol's solid curves; the cap height aligns with the pineapple body.
- The logo floats freely in the header (no pill/button container). It turns ivory automatically over sections marked `data-nav-theme="dark"`.
- Allowed colours: charcoal, ivory, or a brand colour.

---

## 4. Spacing & layout

| Token | Value |
|---|---|
| `--gutter` | `clamp(1rem, 3.2vw, 2.5rem)` — horizontal page padding |
| `--nav-h` | `5.5rem` — space reserved under the header |
| `container-x` | max-width 96rem + gutter |
| Section padding | `pt-20/28 → pt-32/36`, `pb-28 → pb-40/48` |
| Grid | 12 columns on `lg`, single column / 2 columns below |
| Radii | Cards 1.5–1.75rem · Section tops 2.5rem → 3.5rem · Pills `rounded-full` |

Sections overlap the previous one with a rounded top (`-mt-12 rounded-t-[3.5rem]`) — the "peel" transition from the reference video.

Breakpoints: Tailwind defaults (`sm` 640, `md` 768, `lg` 1024, `xl` 1280). Desktop compositions (absolute hero geometry, pinned rail, corner cards) start at `lg`.

---

## 5. Components

| Component | File | Notes |
|---|---|---|
| `Button` | `ui/Button.tsx` | Pill, rolling label, arrow bubble; variants `dark / light / glass / outline`; optional magnetic hover (fine pointers only) |
| `ImageSlot` | `ui/ImageSlot.tsx` | Every image. Placeholder until the file exists; `data-asset-id`; reads fit/position/scale from the registry |
| `FragranceBottle` / `FruitCutout` | `ui/Media.tsx` | Slots with on-brand vector fallbacks |
| `BottleArt` / `PedestalArt` | `ui/BottleArt.tsx` | Vector stand-ins with the real label + symbol |
| `FruitArt` | `ui/FruitArt.tsx` | Illustrated pineapple / berries / papaya / apple (primary + accent) |
| `Decor` | `ui/Decor.tsx` | Sparkle, Drop, Splash, Leaf, Flower, Scallop, Blob, WaveRibbon, Squiggle, WaveEdge |
| `ShapeDefs` | `ui/ShapeDefs.tsx` | Shared clip-paths: flower, blob, scallop, leaf |
| `RotatingBadge` | `ui/RotatingBadge.tsx` | Circular text + symbol |
| `Eyebrow` | `ui/Eyebrow.tsx` | "02 — Section name" |
| Surfaces | `glass`, `glass-dark` utilities | Frosted ivory / wine |

Interaction states: every link/button has `cursor: pointer` (global rule), visible `:focus-visible` outline, hover feedback (roll, colour, scale or lift).

---

## 6. Motion (GSAP 3 + ScrollTrigger + SplitText + ScrollToPlugin)

Setup: [`src/lib/gsap.ts`](../src/lib/gsap.ts) registers plugins once and defines shared media queries (`MQ`). Every animation lives in `useGSAP` (automatic cleanup) and inside `gsap.matchMedia()` so it is reverted on breakpoint change and **disabled under `prefers-reduced-motion`**.

| Moment | What happens |
|---|---|
| Preloader | Symbol mask reveal → body bands wrap in → leaves sprout → breath → wordmark rises → counter → RUBRA/SOLA/MAREA/VERA curtains peel away. Waits for fonts + load (max 4.5s), failsafe 8s, short version on repeat visits |
| Hero intro | Halo, eyebrow, char-by-char headline, pedestal, bottle, leaves, fruits, sparkles, cards (≈2s, starts while the last curtain lifts) |
| Fragrance swap | Colour vars tween, background cross-fade, bottle exit/enter with tilt, fruits burst/pop (back ease), name chars roll, copy cross-fades. Autoplay every 7s until the visitor interacts; pauses off-screen |
| Hero parallax | Pointer depth layers (`data-depth`), scroll-out: words part, stage sinks |
| Marquee | Two opposite infinite loops, speed boosted by scroll velocity |
| Collection | Pinned horizontal rail (desktop); per-panel parallax via `containerAnimation`; HUD progress |
| Fruit Universe | Masked line reveals, pills pop, tiles open with clip-path, stickers float, ribbon drifts |
| Philosophy | Reading reveal (words go from 16% to 100% opacity on scroll), parallax images, rotating badge |
| Experience | Pinned scrub: arch window → full bleed, headline fades apart, bottle rises, berries orbit in, 3 chapters |
| Final CTA | Four bottles rise into a fan (scrub) |

Declarative helpers ([`hooks/useScrollReveals.ts`](../src/hooks/useScrollReveals.ts)): `data-reveal="lines|chars|fade|pop|words-scrub"`, `data-speed`, `data-rotate`, `data-float`, `data-delay`.

Performance rules: animate `transform`, `opacity`, `clip-path` and CSS variables only; never animate an element whose CSS also sets `transform` (wrap it instead); separate wrappers for intro / swap / pointer / scroll motion; `will-change` only on parallax layers.

Easing: `expo.out` (entrances), `power3.in` (exits), `expo.inOut` (masks/curtains), `back.out(1.5–1.8)` (playful pops), `none` (scrub).
