# PULPA Parfums — Creative One-Page Website

> **Wear your wild side.** A concept website for PULPA, a fictional contemporary perfumery inspired by fruit.
> Concept & Website by **Aklio Studio** (portfolio project — no real products are sold).

Four eaux de parfum — **SOLA** (pineapple), **RUBRA** (red berries), **MAREA** (papaya), **VERA** (green apple) — presented through an editorial, colour-driven, GSAP-animated one-page experience.

## Stack

- **Next.js 16** (App Router, static prerender) · **React 19** · **TypeScript**
- **Tailwind CSS 4** (tokens in `src/app/globals.css`)
- **GSAP 3.15** — ScrollTrigger, SplitText, ScrollToPlugin — with `@gsap/react` (`useGSAP`)
- Fonts: **Syne** + **Manrope** via `next/font` (sans-serif only)
- No other runtime dependencies

## Sections

| # | Section | Anchor |
|---|---|---|
| — | Animated logo preloader | — |
| 01 | Hero — fragrance switcher, bottle on pedestal, fruits, parallax | `#home` |
| 02 | Marquee — crossing ribbons "Fruit-fueled fragrances — Wear your wild side" | — |
| 03 | The Collection — pinned horizontal editorial rail (stacked on mobile) | `#fragrances` |
| 04 | The Fruit Universe — specimen board with organic masks and stickers | `#universe` |
| 05 | Our Philosophy — asymmetric editorial spread | `#story` |
| 06 | The Experience — pinned cinematic RUBRA scene | `#experience` |
| 07 | Final CTA — "Find your fruity side." with a bottle fan | — |
| 08 | Footer | — |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build (static)
npm run start      # serve the build
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run assets:check  # which images exist / are still placeholders
```

Requires Node 20+.

## Project structure

```text
pulpa-parfums/
├── docs/
│   ├── IMAGE_GENERATION_GUIDE.md   # 24 image prompts + exact paths
│   └── DESIGN_SYSTEM.md            # palette, type, spacing, components, motion
├── public/images/
│   ├── brand/        # official symbol (png + vector svg)
│   ├── hero/         # hero backgrounds + pedestal
│   ├── fragrances/   # 4 bottle packshots
│   ├── fruits/       # fruit cut-outs + macro photos
│   └── editorial/    # philosophy + experience images
├── scripts/check-assets.mjs
└── src/
    ├── app/                  # layout, page, globals.css, icon.svg
    ├── components/
    │   ├── layout/           # Preloader, Navbar, MobileMenu, Footer
    │   ├── providers/        # SiteProviders (assets, intro hand-off, anchor scrolling)
    │   ├── sections/         # Hero, Marquee, Collection, FruitUniverse, Philosophy, Experience, FinalCta
    │   └── ui/               # Button, ImageSlot, Media, BottleArt, FruitArt, Decor, Logo, …
    ├── data/                 # fragrances.ts, assets.ts, site.ts, brand-symbol.ts
    ├── hooks/                # useScrollReveals, useActiveSection
    ├── lib/                  # gsap setup, events bus, assets.server
    └── types/
```

## Languages and UX refinements

Every document starts in **English**, even if the browser or storage previously preferred Portuguese. Use the compact **EN / PT** header selector to translate the current page without a reload. The current section and fragrance are preserved; reloading starts in English again. Messages live in `src/i18n/messages.ts`.

The symbol-only preloader, repeatable scroll reveals, fruit controls, animated footer wordmark, white favicon and responsive updates are documented in [`docs/UX_REFINEMENT_REPORT.md`](docs/UX_REFINEMENT_REPORT.md).

The subsequent preloader repair, campaign compositions, photographic selectors, shared fruit preview and automatic footer colour cycle are documented in [`docs/PREMIUM_REFINEMENT_REPORT.md`](docs/PREMIUM_REFINEMENT_REPORT.md).

## Replacing the images

All **24 photography assets are included** in `public/images/`: four matching branded bottle packshots, four hero backgrounds, a stone pedestal, eight transparent fruit layers, four fruit macros and three editorial images. They were generated with ChatGPT using the official PULPA symbol and the project's art direction, then optimized to WebP (about 4.9 MB total, with alpha preserved in all 13 transparent assets).

The exact generation prompts, reference assets, dimensions and file hashes are recorded in [`docs/IMAGE_ASSETS_MANIFEST.json`](docs/IMAGE_ASSETS_MANIFEST.json). See the [complete image contact sheet](docs/image-assets-preview.webp) to review the collection. Components pick up these files through the central registry; designed placeholders remain available when a file is missing.

Four transparent 256×256 WebP derivatives in `public/images/fruits/thumbnails/` supply the hero selector, collection list, floating preview and rail controls. Their paths are centralized in `FRUIT_THUMBNAILS` in `src/data/assets.ts`; the original photographs are preserved.

To replace an image in the future:

1. Generate each image with the prompts in [`docs/IMAGE_GENERATION_GUIDE.md`](docs/IMAGE_GENERATION_GUIDE.md).
2. Save it at the path listed there (e.g. `public/images/fragrances/fragrance-bottle-sola.webp`).
3. Restart `npm run dev` or rebuild. Slots detect the file automatically (`src/lib/assets.server.ts`) — no component edits.
4. Tweak framing in [`src/data/assets.ts`](src/data/assets.ts): `position`, `scale`, `fit`, `alt`.
5. Visit `/?slots` to outline every slot with its ID. `npm run assets:check` lists what is missing.

To use PNG/AVIF instead of WebP, change the extension of that entry's `src` in `src/data/assets.ts` (and in `scripts/check-assets.mjs` if you rely on it).

## Editing the collection

Default English fragrance content lives in [`src/data/fragrances.ts`](src/data/fragrances.ts): name, fruit, tagline, description, notes, personality, palette and the asset IDs it uses. The hero switcher, collection rail, final CTA and colours all read from it.

To add a fragrance: add an entry, add its `AssetId`s to `src/types/index.ts`, register them in `src/data/assets.ts`, document them in the image guide, and (if it is a new fruit) add a `FruitKind`, a photographic thumbnail in `FRUIT_THUMBNAILS` and its decorative illustration in `src/components/ui/FruitArt.tsx`.

## Accessibility & motion

- Semantic landmarks, labelled sections, real HTML headlines, keyboard-operable switcher (arrow keys), focus-visible styles, `cursor: pointer` on every interactive element.
- `prefers-reduced-motion`: preloader becomes a short fade, no pinning/parallax/autoplay, swaps cross-fade.
- The preloader waits for opening images and fonts concurrently with its symbol animation (2.5s resource timeout, 6s JS failsafe, CSS failsafe and `<noscript>` rule) and locks scroll only while active.

---

Concept & Website by Aklio Studio. PULPA is a fictional brand.
