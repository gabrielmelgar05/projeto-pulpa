# PULPA — Image Generation Guide

This guide lists **every image slot implemented in the website** — exactly **24 images** — with a ready-to-copy prompt (in English) for ChatGPT image generation, and the precise destination path for each file.

> Source of truth in code: [`src/data/assets.ts`](../src/data/assets.ts). Every ID below exists there, and every slot there is documented here.

**Delivery status (2026-11-18):** all 24 images have been generated with ChatGPT and installed at the paths below. The 13 isolated assets retain real alpha transparency. See [`IMAGE_ASSETS_MANIFEST.json`](IMAGE_ASSETS_MANIFEST.json) for the exact prompts used, reference assets, optimized dimensions and checksums. Recommended resolutions below are art-direction targets; the manifest records the delivered dimensions.

[Review all 24 delivered images](image-assets-preview.webp).

**Validation:** asset presence (24/24), WebP decoding, unique file hashes, alpha channels, ESLint and TypeScript all passed. Chromium checks at 320, 390, 768, 1024 and 1440 px found no placeholders, broken images or horizontal overflow. All four fragrance selections passed with reduced motion and with animations; no page errors or failed HTTP responses were recorded. The later UX refinement also passed the production build and expanded browser coverage to seven widths in both languages; see [`UX_REFINEMENT_REPORT.md`](UX_REFINEMENT_REPORT.md). The original image prompts in the manifest remain a historical record of generation. The current wordmark is PULPA without a full stop; original photography is retained and its printed full stops are hidden only at display time by `BrandLabel.tsx`.

---

## How the slots work (read this first — also for Codex)

1. Generate the image with the prompt below.
2. Export it as **WebP** (or PNG/AVIF — then change the extension of `src` in `src/data/assets.ts`).
3. Save it at the **exact path** given in “Destination path”.
4. Rebuild (`npm run build`) or restart `npm run dev`. The server checks which files exist in `/public` (`src/lib/assets.server.ts`) and the slot automatically switches from the designed placeholder to the real image. **No component change is required.**
5. Fine-tune framing in `src/data/assets.ts` only: `position` (CSS object-position), `scale` and `fit`.
6. Run `npm run assets:check` to list which images are still missing.
7. Open the site with `?slots` in the URL (e.g. `http://localhost:3000/?slots`) to outline every slot with its asset ID.

Transparent assets (bottles, fruit cut-outs, pedestal) are separate layers so GSAP can animate them independently — **never merge them into one flattened image**.

---

## Overview table

| Asset ID | File | Component | Section | Path | Ratio | Transparency |
|---|---|---|---|---|---|---|
| `hero-bg-sola` | `hero-bg-sola.webp` | Hero.tsx | 01 · Hero | `public/images/hero/hero-bg-sola.webp` | 16:9 | No |
| `hero-bg-rubra` | `hero-bg-rubra.webp` | Hero.tsx | 01 · Hero | `public/images/hero/hero-bg-rubra.webp` | 16:9 | No |
| `hero-bg-marea` | `hero-bg-marea.webp` | Hero.tsx | 01 · Hero | `public/images/hero/hero-bg-marea.webp` | 16:9 | No |
| `hero-bg-vera` | `hero-bg-vera.webp` | Hero.tsx | 01 · Hero | `public/images/hero/hero-bg-vera.webp` | 16:9 | No |
| `hero-pedestal` | `hero-pedestal.webp` | Hero.tsx | 01 · Hero | `public/images/hero/hero-pedestal.webp` | 2:1 | Yes |
| `fragrance-bottle-sola` | `fragrance-bottle-sola.webp` | ui/Media.tsx | 01 Hero · Collection · Experience (RUBRA) · Final CTA | `public/images/fragrances/fragrance-bottle-sola.webp` | 4:5 | Yes |
| `fragrance-bottle-rubra` | `fragrance-bottle-rubra.webp` | ui/Media.tsx | 01 Hero · Collection · Experience (RUBRA) · Final CTA | `public/images/fragrances/fragrance-bottle-rubra.webp` | 4:5 | Yes |
| `fragrance-bottle-marea` | `fragrance-bottle-marea.webp` | ui/Media.tsx | 01 Hero · Collection · Experience (RUBRA) · Final CTA | `public/images/fragrances/fragrance-bottle-marea.webp` | 4:5 | Yes |
| `fragrance-bottle-vera` | `fragrance-bottle-vera.webp` | ui/Media.tsx | 01 Hero · Collection · Experience (RUBRA) · Final CTA | `public/images/fragrances/fragrance-bottle-vera.webp` | 4:5 | Yes |
| `fruit-cutout-pineapple` | `fruit-cutout-pineapple.webp` | ui/Media.tsx | 01 Hero · 03 Collection | `public/images/fruits/fruit-cutout-pineapple.webp` | 1:1 | Yes |
| `fruit-cutout-pineapple-accent` | `fruit-cutout-pineapple-accent.webp` | ui/Media.tsx | 01 Hero · 03 Collection | `public/images/fruits/fruit-cutout-pineapple-accent.webp` | 1:1 | Yes |
| `fruit-cutout-berries` | `fruit-cutout-berries.webp` | ui/Media.tsx | 01 Hero · 03 Collection · 06 Experience | `public/images/fruits/fruit-cutout-berries.webp` | 1:1 | Yes |
| `fruit-cutout-berries-accent` | `fruit-cutout-berries-accent.webp` | ui/Media.tsx | 01 Hero · 03 Collection · 06 Experience | `public/images/fruits/fruit-cutout-berries-accent.webp` | 1:1 | Yes |
| `fruit-cutout-papaya` | `fruit-cutout-papaya.webp` | ui/Media.tsx | 01 Hero · 03 Collection | `public/images/fruits/fruit-cutout-papaya.webp` | 1:1 | Yes |
| `fruit-cutout-papaya-accent` | `fruit-cutout-papaya-accent.webp` | ui/Media.tsx | 01 Hero · 03 Collection | `public/images/fruits/fruit-cutout-papaya-accent.webp` | 1:1 | Yes |
| `fruit-cutout-apple` | `fruit-cutout-apple.webp` | ui/Media.tsx | 01 Hero · 03 Collection | `public/images/fruits/fruit-cutout-apple.webp` | 1:1 | Yes |
| `fruit-cutout-apple-accent` | `fruit-cutout-apple-accent.webp` | ui/Media.tsx | 01 Hero · 03 Collection | `public/images/fruits/fruit-cutout-apple-accent.webp` | 1:1 | Yes |
| `fruit-universe-pineapple` | `fruit-universe-pineapple.webp` | sections/FruitUniverse.tsx | 02 · The Fruit Universe | `public/images/fruits/fruit-universe-pineapple.webp` | 4:5 | No |
| `fruit-universe-berries` | `fruit-universe-berries.webp` | sections/FruitUniverse.tsx | 02 · The Fruit Universe | `public/images/fruits/fruit-universe-berries.webp` | 4:5 | No |
| `fruit-universe-papaya` | `fruit-universe-papaya.webp` | sections/FruitUniverse.tsx | 02 · The Fruit Universe | `public/images/fruits/fruit-universe-papaya.webp` | 4:5 | No |
| `fruit-universe-apple` | `fruit-universe-apple.webp` | sections/FruitUniverse.tsx | 02 · The Fruit Universe | `public/images/fruits/fruit-universe-apple.webp` | 4:5 | No |
| `philosophy-editorial` | `philosophy-editorial.webp` | sections/Philosophy.tsx | 04 · Our Philosophy | `public/images/editorial/philosophy-editorial.webp` | 4:5 | No |
| `philosophy-detail` | `philosophy-detail.webp` | sections/Philosophy.tsx | 04 · Our Philosophy | `public/images/editorial/philosophy-detail.webp` | 1:1 | No |
| `experience-backdrop` | `experience-backdrop.webp` | sections/Experience.tsx | 05 · The Experience | `public/images/editorial/experience-backdrop.webp` | 16:9 | No |

**Totals:** 24 images — 4 hero backgrounds, 1 pedestal, 4 bottles, 8 fruit cut-outs, 4 fruit macro photos, 2 editorial images, 1 experience backdrop. 13 need a transparent background.

---

## Shared bottle standard (mandatory for all four bottles)

All four bottles must look like **one product family from one brand**. Only the liquid colour and the fragrance name on the label change.

| Property | Standard |
|---|---|
| Shape | Tall rectangular flacon, softly rounded vertical edges, thick clear glass walls, very thick clear base |
| Proportion | ≈ 5 × 9 × 3.5 cm (W × H × D); front view ≈ 2:3 |
| Cap | Matte black cylinder, ≈ 60% of bottle width, ≈ 30% of bottle height, short black collar |
| Glass | Crystal-clear, heavy, visible refraction in the base |
| Label | Printed directly on the glass, warm ivory `#F6F1E8`, centred: pineapple symbol → `PULPA` (wide-tracked sans) → thin rule → fragrance name → `EAU DE PARFUM` |
| Light | Soft key from upper left, fill from right, vertical specular highlight on left edge, thinner one on right edge |
| Camera | Straight front view, bottle-centre height, 85 mm look, no distortion |
| Framing | 4:5 frame, bottle centred, ≈ 88% of frame height, base 4% above bottom edge |
| Liquid | SOLA `#F2CC58` · RUBRA `#BC4358` · MAREA `#F2A16E` · VERA `#A9C77D` |

**Tip for consistency:** generate SOLA first. For RUBRA, MAREA and VERA, attach the approved SOLA image as an extra reference and say: *“Same bottle, same camera, same lighting and same label layout as the attached image — change only the liquid colour to … and the name to …”.*

### Applying the exact logo

Image models may not reproduce the pineapple symbol perfectly. If so:
1. Generate the bottle with a **blank label area** (add “leave the label area blank, no text” to the prompt), and
2. Composite the official symbol (`public/images/brand/pulpa-symbol.svg`, ivory) and the text in Figma/Photoshop/Photopea, centred on the glass, then export the transparent WebP.

The official symbol is already in the project: `public/images/brand/pulpa-symbol.png` (original) and `pulpa-symbol.svg` (vector trace used by the site).

---

## Reference images to attach

| Ref | What it is | Use for |
|---|---|---|
| Reference 01 | PULPA pineapple symbol (white on transparent) | Bottle labels |
| Reference 02 | Brand moodboard (bottles, palette, packaging, fruit) | Bottles, colours, fruit styling, pedestal |
| Reference 03 | Graphic elements (waves, patterns, stickers) | Colour energy of fruit macros |
| Reference 04 | Glowinn landing page | Hero atmosphere |
| Reference 05 | Perfume video | Cinematic mood (Experience) |

---

## Asset specifications

### 01. `hero-bg-sola`

| Field | Value |
|---|---|
| **1. Asset ID** | `hero-bg-sola` |
| **2. File name** | `hero-bg-sola.webp` |
| **3. Section** | 01 · Hero |
| **4. Purpose** | Full-screen atmospheric background of the hero while SOLA is selected. Cross-fades with the other three backgrounds when the visitor switches fragrance. The bottle, pedestal and fruits are separate layers placed on top, so this image must be EMPTY in the centre. |
| **6. Ratio** | 16:9 |
| **7. Recommended resolution** | 2560 × 1440 px (min 1920 × 1080) |
| **8. Transparency** | No — full-bleed opaque background |
| **9. Placement in layout** | Covers the whole hero viewport with `object-fit: cover` (centre). Adjust `position` in src/data/assets.ts if the glow should sit higher/lower. |
| **10. Destination path** | `public/images/hero/hero-bg-sola.webp` |
| **11. Mobile variant** | Reuse the same file (cropped to the centre on phones). Keep important light/shadow details within the central 40% of the width. |
| **12. Visual restrictions** | No text, no logos, no watermark, no bottle, no pedestal, no people, no hands, no UI elements, no hard objects in the centre. |
| **13. References** | Attach Reference 02 (moodboard) for colour and mood; Reference 04 (Glowinn) for the cinematic hero atmosphere. |
| Component | Hero.tsx → HeroBackdrop layer (`data-hero-bg`) |

**5. Prompt (copy into ChatGPT):**

```text
PULPA is a contemporary, premium perfume brand inspired by fruit (tagline: "Wear your wild side."). Art direction: contemporary luxury meets playful editorial design — vibrant but refined, tropical, fresh and sensual, high-end advertising photography. Brand palette: warm ivory #F6F1E8, charcoal #201F1C, pineapple yellow #F2CC58, red-berry pink-red #BC4358, papaya orange #F2A16E, green-apple green #A9C77D.

Create an empty, cinematic studio backdrop for the hero section of the PULPA website, for the fragrance SOLA (pineapple, mood: vibrant, solar, energetic and bold).
Composition: wide 16:9 seamless studio sweep in tropical sun yellow (#F2CC58), lighter and creamier towards the top (#FBEFC6), slightly deeper towards the bottom corners (#C8921F). A large soft circular glow of warm light in the centre, a little below the middle, as if a spotlight is waiting for a product. Soft, out-of-focus dappled shadows of tropical leaves falling across the upper left and right of the wall (like sunlight through palm leaves), very diffuse and low contrast. A few blurred, out-of-focus pineapple shapes at the extreme left and right edges, heavily defocused (bokeh), suggesting depth.
Keep the whole central area (middle 50% of the width, from 15% to 100% of the height) clean and empty: no objects, no podium, no bottle — a product and a pedestal will be composited there later. Keep the left and right thirds at mid-height calm and low-contrast because large headline text sits there.
Lighting: soft, warm, high-end advertising light, gentle gradients, no harsh shadows. Style: premium fragrance campaign photography, photorealistic, subtle film grain, colour-graded to the PULPA palette.
```

### 02. `hero-bg-rubra`

| Field | Value |
|---|---|
| **1. Asset ID** | `hero-bg-rubra` |
| **2. File name** | `hero-bg-rubra.webp` |
| **3. Section** | 01 · Hero |
| **4. Purpose** | Full-screen atmospheric background of the hero while RUBRA is selected. Cross-fades with the other three backgrounds when the visitor switches fragrance. The bottle, pedestal and fruits are separate layers placed on top, so this image must be EMPTY in the centre. |
| **6. Ratio** | 16:9 |
| **7. Recommended resolution** | 2560 × 1440 px (min 1920 × 1080) |
| **8. Transparency** | No — full-bleed opaque background |
| **9. Placement in layout** | Covers the whole hero viewport with `object-fit: cover` (centre). Adjust `position` in src/data/assets.ts if the glow should sit higher/lower. |
| **10. Destination path** | `public/images/hero/hero-bg-rubra.webp` |
| **11. Mobile variant** | Reuse the same file (cropped to the centre on phones). Keep important light/shadow details within the central 40% of the width. |
| **12. Visual restrictions** | No text, no logos, no watermark, no bottle, no pedestal, no people, no hands, no UI elements, no hard objects in the centre. |
| **13. References** | Attach Reference 02 (moodboard) for colour and mood; Reference 04 (Glowinn) for the cinematic hero atmosphere. |
| Component | Hero.tsx → HeroBackdrop layer (`data-hero-bg`) |

**5. Prompt (copy into ChatGPT):**

```text
PULPA is a contemporary, premium perfume brand inspired by fruit (tagline: "Wear your wild side."). Art direction: contemporary luxury meets playful editorial design — vibrant but refined, tropical, fresh and sensual, high-end advertising photography. Brand palette: warm ivory #F6F1E8, charcoal #201F1C, pineapple yellow #F2CC58, red-berry pink-red #BC4358, papaya orange #F2A16E, green-apple green #A9C77D.

Create an empty, cinematic studio backdrop for the hero section of the PULPA website, for the fragrance RUBRA (red berries (raspberries), mood: intense, passionate, sweet and expressive).
Composition: wide 16:9 seamless studio sweep in rose-red (#BC4358), lighter and creamier towards the top (#F4CDD3), slightly deeper towards the bottom corners (#7A2135). A large soft circular glow of warm light in the centre, a little below the middle, as if a spotlight is waiting for a product. Soft, out-of-focus dappled shadows of tropical leaves falling across the upper left and right of the wall (like sunlight through palm leaves), very diffuse and low contrast. A few blurred, out-of-focus red berries (raspberries) shapes at the extreme left and right edges, heavily defocused (bokeh), suggesting depth.
Keep the whole central area (middle 50% of the width, from 15% to 100% of the height) clean and empty: no objects, no podium, no bottle — a product and a pedestal will be composited there later. Keep the left and right thirds at mid-height calm and low-contrast because large headline text sits there.
Lighting: soft, warm, high-end advertising light, gentle gradients, no harsh shadows. Style: premium fragrance campaign photography, photorealistic, subtle film grain, colour-graded to the PULPA palette.
```

### 03. `hero-bg-marea`

| Field | Value |
|---|---|
| **1. Asset ID** | `hero-bg-marea` |
| **2. File name** | `hero-bg-marea.webp` |
| **3. Section** | 01 · Hero |
| **4. Purpose** | Full-screen atmospheric background of the hero while MAREA is selected. Cross-fades with the other three backgrounds when the visitor switches fragrance. The bottle, pedestal and fruits are separate layers placed on top, so this image must be EMPTY in the centre. |
| **6. Ratio** | 16:9 |
| **7. Recommended resolution** | 2560 × 1440 px (min 1920 × 1080) |
| **8. Transparency** | No — full-bleed opaque background |
| **9. Placement in layout** | Covers the whole hero viewport with `object-fit: cover` (centre). Adjust `position` in src/data/assets.ts if the glow should sit higher/lower. |
| **10. Destination path** | `public/images/hero/hero-bg-marea.webp` |
| **11. Mobile variant** | Reuse the same file (cropped to the centre on phones). Keep important light/shadow details within the central 40% of the width. |
| **12. Visual restrictions** | No text, no logos, no watermark, no bottle, no pedestal, no people, no hands, no UI elements, no hard objects in the centre. |
| **13. References** | Attach Reference 02 (moodboard) for colour and mood; Reference 04 (Glowinn) for the cinematic hero atmosphere. |
| Component | Hero.tsx → HeroBackdrop layer (`data-hero-bg`) |

**5. Prompt (copy into ChatGPT):**

```text
PULPA is a contemporary, premium perfume brand inspired by fruit (tagline: "Wear your wild side."). Art direction: contemporary luxury meets playful editorial design — vibrant but refined, tropical, fresh and sensual, high-end advertising photography. Brand palette: warm ivory #F6F1E8, charcoal #201F1C, pineapple yellow #F2CC58, red-berry pink-red #BC4358, papaya orange #F2A16E, green-apple green #A9C77D.

Create an empty, cinematic studio backdrop for the hero section of the PULPA website, for the fragrance MAREA (papaya, mood: tropical, warm, spontaneous and sensual).
Composition: wide 16:9 seamless studio sweep in warm papaya orange (#F2A16E), lighter and creamier towards the top (#FBDFCB), slightly deeper towards the bottom corners (#C4612F). A large soft circular glow of warm light in the centre, a little below the middle, as if a spotlight is waiting for a product. Soft, out-of-focus dappled shadows of tropical leaves falling across the upper left and right of the wall (like sunlight through palm leaves), very diffuse and low contrast. A few blurred, out-of-focus papaya shapes at the extreme left and right edges, heavily defocused (bokeh), suggesting depth.
Keep the whole central area (middle 50% of the width, from 15% to 100% of the height) clean and empty: no objects, no podium, no bottle — a product and a pedestal will be composited there later. Keep the left and right thirds at mid-height calm and low-contrast because large headline text sits there.
Lighting: soft, warm, high-end advertising light, gentle gradients, no harsh shadows. Style: premium fragrance campaign photography, photorealistic, subtle film grain, colour-graded to the PULPA palette.
```

### 04. `hero-bg-vera`

| Field | Value |
|---|---|
| **1. Asset ID** | `hero-bg-vera` |
| **2. File name** | `hero-bg-vera.webp` |
| **3. Section** | 01 · Hero |
| **4. Purpose** | Full-screen atmospheric background of the hero while VERA is selected. Cross-fades with the other three backgrounds when the visitor switches fragrance. The bottle, pedestal and fruits are separate layers placed on top, so this image must be EMPTY in the centre. |
| **6. Ratio** | 16:9 |
| **7. Recommended resolution** | 2560 × 1440 px (min 1920 × 1080) |
| **8. Transparency** | No — full-bleed opaque background |
| **9. Placement in layout** | Covers the whole hero viewport with `object-fit: cover` (centre). Adjust `position` in src/data/assets.ts if the glow should sit higher/lower. |
| **10. Destination path** | `public/images/hero/hero-bg-vera.webp` |
| **11. Mobile variant** | Reuse the same file (cropped to the centre on phones). Keep important light/shadow details within the central 40% of the width. |
| **12. Visual restrictions** | No text, no logos, no watermark, no bottle, no pedestal, no people, no hands, no UI elements, no hard objects in the centre. |
| **13. References** | Attach Reference 02 (moodboard) for colour and mood; Reference 04 (Glowinn) for the cinematic hero atmosphere. |
| Component | Hero.tsx → HeroBackdrop layer (`data-hero-bg`) |

**5. Prompt (copy into ChatGPT):**

```text
PULPA is a contemporary, premium perfume brand inspired by fruit (tagline: "Wear your wild side."). Art direction: contemporary luxury meets playful editorial design — vibrant but refined, tropical, fresh and sensual, high-end advertising photography. Brand palette: warm ivory #F6F1E8, charcoal #201F1C, pineapple yellow #F2CC58, red-berry pink-red #BC4358, papaya orange #F2A16E, green-apple green #A9C77D.

Create an empty, cinematic studio backdrop for the hero section of the PULPA website, for the fragrance VERA (green apple, mood: fresh, unexpected, light and modern).
Composition: wide 16:9 seamless studio sweep in soft green-apple green (#A9C77D), lighter and creamier towards the top (#E4EED2), slightly deeper towards the bottom corners (#5B7C36). A large soft circular glow of warm light in the centre, a little below the middle, as if a spotlight is waiting for a product. Soft, out-of-focus dappled shadows of tropical leaves falling across the upper left and right of the wall (like sunlight through palm leaves), very diffuse and low contrast. A few blurred, out-of-focus green apple shapes at the extreme left and right edges, heavily defocused (bokeh), suggesting depth.
Keep the whole central area (middle 50% of the width, from 15% to 100% of the height) clean and empty: no objects, no podium, no bottle — a product and a pedestal will be composited there later. Keep the left and right thirds at mid-height calm and low-contrast because large headline text sits there.
Lighting: soft, warm, high-end advertising light, gentle gradients, no harsh shadows. Style: premium fragrance campaign photography, photorealistic, subtle film grain, colour-graded to the PULPA palette.
```

### 05. `hero-pedestal`

| Field | Value |
|---|---|
| **1. Asset ID** | `hero-pedestal` |
| **2. File name** | `hero-pedestal.webp` |
| **3. Section** | 01 · Hero |
| **4. Purpose** | The stone plinth the hero bottle stands on. Shared by all four fragrances (it stays while bottles and colours change). |
| **6. Ratio** | 2:1 |
| **7. Recommended resolution** | 2400 × 1200 px |
| **8. Transparency** | Yes — transparent PNG/WebP (alpha) |
| **9. Placement in layout** | Behind the bottle, centred. In code its top ellipse sits at 77% of the bottle box height and it is 190% of the bottle width. The base of the bottle must land on the middle of the top ellipse — keep the top ellipse at ≈ 24% from the top of the image (centre of the ellipse). |
| **10. Destination path** | `public/images/hero/hero-pedestal.webp` |
| **11. Mobile variant** | Reuse the same file. |
| **12. Visual restrictions** | No background, no floor, no shadow outside the object, no text, no logos, no products on top, no plants. |
| **13. References** | Attach Reference 02 (moodboard — the stone plinths under the bottles). |
| Component | Hero.tsx → pedestal layer (`data-hero-pedestal`) |

**5. Prompt (copy into ChatGPT):**

```text
PULPA is a contemporary, premium perfume brand inspired by fruit (tagline: "Wear your wild side."). Art direction: contemporary luxury meets playful editorial design — vibrant but refined, tropical, fresh and sensual, high-end advertising photography. Brand palette: warm ivory #F6F1E8, charcoal #201F1C, pineapple yellow #F2CC58, red-berry pink-red #BC4358, papaya orange #F2A16E, green-apple green #A9C77D.

Product-photography prop on a TRANSPARENT background: a wide, low cylindrical pedestal in warm ivory travertine / honed limestone with fine natural pores and subtle beige veining.
Camera slightly above eye level (about 15°), so the flat circular top surface is visible as a wide ellipse. The pedestal fills about 95% of the frame width. The top ellipse occupies roughly the upper 30% of the frame; the cylinder's side goes straight down and is cut off by the bottom edge of the image (the base is not visible).
Lighting: soft warm key light from the upper left, the top surface brightest, the cylinder side shading gently to the right. Very subtle, realistic contact-shadow area on the top surface where a product will stand (centre of the ellipse), otherwise clean.
Photorealistic, premium, matte stone. Isolated object, fully transparent background (alpha), clean edges.
```

### 06. `fragrance-bottle-sola`

| Field | Value |
|---|---|
| **1. Asset ID** | `fragrance-bottle-sola` |
| **2. File name** | `fragrance-bottle-sola.webp` |
| **3. Section** | 01 Hero · Collection · Experience (RUBRA) · Final CTA |
| **4. Purpose** | The SOLA packshot. One image reused everywhere the bottle appears (hero stage, collection panel, final CTA fan). Must match the other three bottles exactly except for the colour. |
| **6. Ratio** | 4:5 |
| **7. Recommended resolution** | 1600 × 2000 px |
| **8. Transparency** | Yes — transparent PNG/WebP (alpha) |
| **9. Placement in layout** | Rendered inside a 4:5 box with `object-fit: contain; object-position: 50% 100%` (bottom-anchored). In the hero the box is 4:5 and stands on the pedestal; in the collection it sits inside a coloured shape; in the CTA four bottles are fanned. |
| **10. Destination path** | `public/images/fragrances/fragrance-bottle-sola.webp` |
| **11. Mobile variant** | Reuse the same file. |
| **12. Visual restrictions** | No background, no reflections of a studio, no props, no fruit, no hands, no extra text beyond the label, no other brand names, no watermark. Do NOT change the bottle shape, cap or label layout between fragrances. |
| **13. References** | Attach Reference 02 (moodboard — the four bottles in the centre panel) for shape and colour, and Reference 01 (PULPA symbol) for the label symbol. If the generated label symbol is not exact, see “Applying the exact logo” below. |
| Component | ui/Media.tsx → FragranceBottle |

**5. Prompt (copy into ChatGPT):**

```text
PULPA is a contemporary, premium perfume brand inspired by fruit (tagline: "Wear your wild side."). Art direction: contemporary luxury meets playful editorial design — vibrant but refined, tropical, fresh and sensual, high-end advertising photography. Brand palette: warm ivory #F6F1E8, charcoal #201F1C, pineapple yellow #F2CC58, red-berry pink-red #BC4358, papaya orange #F2A16E, green-apple green #A9C77D.

Ultra-realistic luxury perfume packshot of the PULPA "SOLA" eau de parfum, isolated on a TRANSPARENT background.
SHARED BOTTLE DESIGN (identical for all four PULPA fragrances): A tall rectangular flacon in thick, crystal-clear heavy glass (about 5 cm wide x 9 cm tall x 3.5 cm deep, proportion roughly 2:3 seen from the front), with softly rounded vertical edges (≈3 mm radius) and a very thick, clear glass base (≈1 cm) that refracts the liquid. The liquid fills the bottle almost to the shoulder and is tinted in the fragrance colour. A matte black cylindrical cap (diameter ≈ 60% of the bottle width, height ≈ 30% of the bottle height) sits on a short black collar; the cap has a subtle satin highlight on its left side. Centred on the front of the glass, a minimal label printed directly on the glass in warm ivory (#F6F1E8): a small stylised pineapple symbol, below it the wordmark "PULPA" in a wide-tracked geometric sans-serif, a thin rule, the fragrance name, and the words "EAU DE PARFUM" in tiny capitals. Front-facing, perfectly straight packshot, camera at the height of the bottle's centre, 85 mm lens look, no perspective distortion. Soft key light from upper left, gentle fill from the right, a crisp vertical specular highlight on the left edge of the glass and a thinner one on the right edge, light passing through the coloured liquid.
This bottle: liquid colour golden sunny yellow (#F2CC58); label reads "PULPA" / "SOLA" / "EAU DE PARFUM".
Framing: vertical 4:5 frame, bottle perfectly centred horizontally, the bottle occupies about 88% of the frame height, the bottom of the glass base sits about 4% above the bottom edge, a few percent of empty space above the cap. A soft, short contact shadow directly under the base only.
Photorealistic commercial product photography, crisp edges, accurate glass refraction and caustics, high dynamic range, no props.
```

### 07. `fragrance-bottle-rubra`

| Field | Value |
|---|---|
| **1. Asset ID** | `fragrance-bottle-rubra` |
| **2. File name** | `fragrance-bottle-rubra.webp` |
| **3. Section** | 01 Hero · Collection · Experience (RUBRA) · Final CTA |
| **4. Purpose** | The RUBRA packshot. One image reused everywhere the bottle appears (hero stage, collection panel, final CTA fan, experience scene). Must match the other three bottles exactly except for the colour. |
| **6. Ratio** | 4:5 |
| **7. Recommended resolution** | 1600 × 2000 px |
| **8. Transparency** | Yes — transparent PNG/WebP (alpha) |
| **9. Placement in layout** | Rendered inside a 4:5 box with `object-fit: contain; object-position: 50% 100%` (bottom-anchored). In the hero the box is 4:5 and stands on the pedestal; in the collection it sits inside a coloured shape; in the CTA four bottles are fanned. |
| **10. Destination path** | `public/images/fragrances/fragrance-bottle-rubra.webp` |
| **11. Mobile variant** | Reuse the same file. |
| **12. Visual restrictions** | No background, no reflections of a studio, no props, no fruit, no hands, no extra text beyond the label, no other brand names, no watermark. Do NOT change the bottle shape, cap or label layout between fragrances. |
| **13. References** | Attach Reference 02 (moodboard — the four bottles in the centre panel) for shape and colour, and Reference 01 (PULPA symbol) for the label symbol. If the generated label symbol is not exact, see “Applying the exact logo” below. |
| Component | ui/Media.tsx → FragranceBottle |

**5. Prompt (copy into ChatGPT):**

```text
PULPA is a contemporary, premium perfume brand inspired by fruit (tagline: "Wear your wild side."). Art direction: contemporary luxury meets playful editorial design — vibrant but refined, tropical, fresh and sensual, high-end advertising photography. Brand palette: warm ivory #F6F1E8, charcoal #201F1C, pineapple yellow #F2CC58, red-berry pink-red #BC4358, papaya orange #F2A16E, green-apple green #A9C77D.

Ultra-realistic luxury perfume packshot of the PULPA "RUBRA" eau de parfum, isolated on a TRANSPARENT background.
SHARED BOTTLE DESIGN (identical for all four PULPA fragrances): A tall rectangular flacon in thick, crystal-clear heavy glass (about 5 cm wide x 9 cm tall x 3.5 cm deep, proportion roughly 2:3 seen from the front), with softly rounded vertical edges (≈3 mm radius) and a very thick, clear glass base (≈1 cm) that refracts the liquid. The liquid fills the bottle almost to the shoulder and is tinted in the fragrance colour. A matte black cylindrical cap (diameter ≈ 60% of the bottle width, height ≈ 30% of the bottle height) sits on a short black collar; the cap has a subtle satin highlight on its left side. Centred on the front of the glass, a minimal label printed directly on the glass in warm ivory (#F6F1E8): a small stylised pineapple symbol, below it the wordmark "PULPA" in a wide-tracked geometric sans-serif, a thin rule, the fragrance name, and the words "EAU DE PARFUM" in tiny capitals. Front-facing, perfectly straight packshot, camera at the height of the bottle's centre, 85 mm lens look, no perspective distortion. Soft key light from upper left, gentle fill from the right, a crisp vertical specular highlight on the left edge of the glass and a thinner one on the right edge, light passing through the coloured liquid.
This bottle: liquid colour deep rose-red / raspberry (#BC4358); label reads "PULPA" / "RUBRA" / "EAU DE PARFUM".
Framing: vertical 4:5 frame, bottle perfectly centred horizontally, the bottle occupies about 88% of the frame height, the bottom of the glass base sits about 4% above the bottom edge, a few percent of empty space above the cap. A soft, short contact shadow directly under the base only.
Photorealistic commercial product photography, crisp edges, accurate glass refraction and caustics, high dynamic range, no props.
```

### 08. `fragrance-bottle-marea`

| Field | Value |
|---|---|
| **1. Asset ID** | `fragrance-bottle-marea` |
| **2. File name** | `fragrance-bottle-marea.webp` |
| **3. Section** | 01 Hero · Collection · Experience (RUBRA) · Final CTA |
| **4. Purpose** | The MAREA packshot. One image reused everywhere the bottle appears (hero stage, collection panel, final CTA fan). Must match the other three bottles exactly except for the colour. |
| **6. Ratio** | 4:5 |
| **7. Recommended resolution** | 1600 × 2000 px |
| **8. Transparency** | Yes — transparent PNG/WebP (alpha) |
| **9. Placement in layout** | Rendered inside a 4:5 box with `object-fit: contain; object-position: 50% 100%` (bottom-anchored). In the hero the box is 4:5 and stands on the pedestal; in the collection it sits inside a coloured shape; in the CTA four bottles are fanned. |
| **10. Destination path** | `public/images/fragrances/fragrance-bottle-marea.webp` |
| **11. Mobile variant** | Reuse the same file. |
| **12. Visual restrictions** | No background, no reflections of a studio, no props, no fruit, no hands, no extra text beyond the label, no other brand names, no watermark. Do NOT change the bottle shape, cap or label layout between fragrances. |
| **13. References** | Attach Reference 02 (moodboard — the four bottles in the centre panel) for shape and colour, and Reference 01 (PULPA symbol) for the label symbol. If the generated label symbol is not exact, see “Applying the exact logo” below. |
| Component | ui/Media.tsx → FragranceBottle |

**5. Prompt (copy into ChatGPT):**

```text
PULPA is a contemporary, premium perfume brand inspired by fruit (tagline: "Wear your wild side."). Art direction: contemporary luxury meets playful editorial design — vibrant but refined, tropical, fresh and sensual, high-end advertising photography. Brand palette: warm ivory #F6F1E8, charcoal #201F1C, pineapple yellow #F2CC58, red-berry pink-red #BC4358, papaya orange #F2A16E, green-apple green #A9C77D.

Ultra-realistic luxury perfume packshot of the PULPA "MAREA" eau de parfum, isolated on a TRANSPARENT background.
SHARED BOTTLE DESIGN (identical for all four PULPA fragrances): A tall rectangular flacon in thick, crystal-clear heavy glass (about 5 cm wide x 9 cm tall x 3.5 cm deep, proportion roughly 2:3 seen from the front), with softly rounded vertical edges (≈3 mm radius) and a very thick, clear glass base (≈1 cm) that refracts the liquid. The liquid fills the bottle almost to the shoulder and is tinted in the fragrance colour. A matte black cylindrical cap (diameter ≈ 60% of the bottle width, height ≈ 30% of the bottle height) sits on a short black collar; the cap has a subtle satin highlight on its left side. Centred on the front of the glass, a minimal label printed directly on the glass in warm ivory (#F6F1E8): a small stylised pineapple symbol, below it the wordmark "PULPA" in a wide-tracked geometric sans-serif, a thin rule, the fragrance name, and the words "EAU DE PARFUM" in tiny capitals. Front-facing, perfectly straight packshot, camera at the height of the bottle's centre, 85 mm lens look, no perspective distortion. Soft key light from upper left, gentle fill from the right, a crisp vertical specular highlight on the left edge of the glass and a thinner one on the right edge, light passing through the coloured liquid.
This bottle: liquid colour warm papaya orange (#F2A16E); label reads "PULPA" / "MAREA" / "EAU DE PARFUM".
Framing: vertical 4:5 frame, bottle perfectly centred horizontally, the bottle occupies about 88% of the frame height, the bottom of the glass base sits about 4% above the bottom edge, a few percent of empty space above the cap. A soft, short contact shadow directly under the base only.
Photorealistic commercial product photography, crisp edges, accurate glass refraction and caustics, high dynamic range, no props.
```

### 09. `fragrance-bottle-vera`

| Field | Value |
|---|---|
| **1. Asset ID** | `fragrance-bottle-vera` |
| **2. File name** | `fragrance-bottle-vera.webp` |
| **3. Section** | 01 Hero · Collection · Experience (RUBRA) · Final CTA |
| **4. Purpose** | The VERA packshot. One image reused everywhere the bottle appears (hero stage, collection panel, final CTA fan). Must match the other three bottles exactly except for the colour. |
| **6. Ratio** | 4:5 |
| **7. Recommended resolution** | 1600 × 2000 px |
| **8. Transparency** | Yes — transparent PNG/WebP (alpha) |
| **9. Placement in layout** | Rendered inside a 4:5 box with `object-fit: contain; object-position: 50% 100%` (bottom-anchored). In the hero the box is 4:5 and stands on the pedestal; in the collection it sits inside a coloured shape; in the CTA four bottles are fanned. |
| **10. Destination path** | `public/images/fragrances/fragrance-bottle-vera.webp` |
| **11. Mobile variant** | Reuse the same file. |
| **12. Visual restrictions** | No background, no reflections of a studio, no props, no fruit, no hands, no extra text beyond the label, no other brand names, no watermark. Do NOT change the bottle shape, cap or label layout between fragrances. |
| **13. References** | Attach Reference 02 (moodboard — the four bottles in the centre panel) for shape and colour, and Reference 01 (PULPA symbol) for the label symbol. If the generated label symbol is not exact, see “Applying the exact logo” below. |
| Component | ui/Media.tsx → FragranceBottle |

**5. Prompt (copy into ChatGPT):**

```text
PULPA is a contemporary, premium perfume brand inspired by fruit (tagline: "Wear your wild side."). Art direction: contemporary luxury meets playful editorial design — vibrant but refined, tropical, fresh and sensual, high-end advertising photography. Brand palette: warm ivory #F6F1E8, charcoal #201F1C, pineapple yellow #F2CC58, red-berry pink-red #BC4358, papaya orange #F2A16E, green-apple green #A9C77D.

Ultra-realistic luxury perfume packshot of the PULPA "VERA" eau de parfum, isolated on a TRANSPARENT background.
SHARED BOTTLE DESIGN (identical for all four PULPA fragrances): A tall rectangular flacon in thick, crystal-clear heavy glass (about 5 cm wide x 9 cm tall x 3.5 cm deep, proportion roughly 2:3 seen from the front), with softly rounded vertical edges (≈3 mm radius) and a very thick, clear glass base (≈1 cm) that refracts the liquid. The liquid fills the bottle almost to the shoulder and is tinted in the fragrance colour. A matte black cylindrical cap (diameter ≈ 60% of the bottle width, height ≈ 30% of the bottle height) sits on a short black collar; the cap has a subtle satin highlight on its left side. Centred on the front of the glass, a minimal label printed directly on the glass in warm ivory (#F6F1E8): a small stylised pineapple symbol, below it the wordmark "PULPA" in a wide-tracked geometric sans-serif, a thin rule, the fragrance name, and the words "EAU DE PARFUM" in tiny capitals. Front-facing, perfectly straight packshot, camera at the height of the bottle's centre, 85 mm lens look, no perspective distortion. Soft key light from upper left, gentle fill from the right, a crisp vertical specular highlight on the left edge of the glass and a thinner one on the right edge, light passing through the coloured liquid.
This bottle: liquid colour fresh green-apple green (#A9C77D); label reads "PULPA" / "VERA" / "EAU DE PARFUM".
Framing: vertical 4:5 frame, bottle perfectly centred horizontally, the bottle occupies about 88% of the frame height, the bottom of the glass base sits about 4% above the bottom edge, a few percent of empty space above the cap. A soft, short contact shadow directly under the base only.
Photorealistic commercial product photography, crisp edges, accurate glass refraction and caustics, high dynamic range, no props.
```

### 10. `fruit-cutout-pineapple`

| Field | Value |
|---|---|
| **1. Asset ID** | `fruit-cutout-pineapple` |
| **2. File name** | `fruit-cutout-pineapple.webp` |
| **3. Section** | 01 Hero · 03 Collection |
| **4. Purpose** | Hero-sized cut-out of the pineapple for SOLA. In the hero it sits low beside the bottle (in front of the pedestal); also used beside the bottle in The Collection panel. |
| **6. Ratio** | 1:1 |
| **7. Recommended resolution** | 1600 × 1600 px |
| **8. Transparency** | Yes — transparent PNG/WebP (alpha) |
| **9. Placement in layout** | Hero: right of the bottle, 72% of bottle width, overlapping the pedestal. Collection: 44% of the stage width, bottom corner of the shape. `object-fit: contain`, centred. |
| **10. Destination path** | `public/images/fruits/fruit-cutout-pineapple.webp` |
| **11. Mobile variant** | Reuse the same file. |
| **12. Visual restrictions** | No background, no plate, no table, no shadow on the ground, no bottle, no text, no logos, no hands, no extra fruit of other kinds. |
| **13. References** | Attach Reference 02 (moodboard — the fruit next to each bottle) for styling and colour. |
| Component | ui/Media.tsx → FruitCutout |

**5. Prompt (copy into ChatGPT):**

```text
PULPA is a contemporary, premium perfume brand inspired by fruit (tagline: "Wear your wild side."). Art direction: contemporary luxury meets playful editorial design — vibrant but refined, tropical, fresh and sensual, high-end advertising photography. Brand palette: warm ivory #F6F1E8, charcoal #201F1C, pineapple yellow #F2CC58, red-berry pink-red #BC4358, papaya orange #F2A16E, green-apple green #A9C77D.

High-end food / still-life photography of a whole small ripe pineapple, slightly tilted, golden-yellow skin with a lush green crown, isolated on a TRANSPARENT background, for the fragrance SOLA (colour world #F2CC58).
Composition: the subject centred in a square frame, occupying about 80% of the frame, with a little breathing room on every side so nothing touches the edges. Slight three-quarter angle, dynamic and appetising, as if caught mid-air in a perfume advertisement.
Lighting: soft warm key light from the upper left matching a premium perfume packshot, glossy natural highlights, juicy textures, tiny realistic droplets. Colours saturated but natural, harmonised with tropical sun yellow (#F2CC58).
Photorealistic, razor-sharp focus, clean cut-out edges with natural soft shadows removed (alpha only).
```

### 11. `fruit-cutout-pineapple-accent`

| Field | Value |
|---|---|
| **1. Asset ID** | `fruit-cutout-pineapple-accent` |
| **2. File name** | `fruit-cutout-pineapple-accent.webp` |
| **3. Section** | 01 Hero · 03 Collection |
| **4. Purpose** | Small floating accent for SOLA (hero top-left accent and a small blurred depth copy on the right). |
| **6. Ratio** | 1:1 |
| **7. Recommended resolution** | 1600 × 1600 px |
| **8. Transparency** | Yes — transparent PNG/WebP (alpha) |
| **9. Placement in layout** | Hero: floating above-left of the bottle at 50% of the bottle width, and a 26% blurred copy above-right. `object-fit: contain`, centred. |
| **10. Destination path** | `public/images/fruits/fruit-cutout-pineapple-accent.webp` |
| **11. Mobile variant** | Reuse the same file. |
| **12. Visual restrictions** | No background, no plate, no table, no shadow on the ground, no bottle, no text, no logos, no hands, no extra fruit of other kinds. |
| **13. References** | Attach Reference 02 (moodboard — the fruit next to each bottle) for styling and colour. |
| Component | ui/Media.tsx → FruitCutout |

**5. Prompt (copy into ChatGPT):**

```text
PULPA is a contemporary, premium perfume brand inspired by fruit (tagline: "Wear your wild side."). Art direction: contemporary luxury meets playful editorial design — vibrant but refined, tropical, fresh and sensual, high-end advertising photography. Brand palette: warm ivory #F6F1E8, charcoal #201F1C, pineapple yellow #F2CC58, red-berry pink-red #BC4358, papaya orange #F2A16E, green-apple green #A9C77D.

High-end food / still-life photography of three or four freshly cut juicy pineapple chunks, bright yellow flesh, glistening with juice, loosely grouped, isolated on a TRANSPARENT background, for the fragrance SOLA (colour world #F2CC58).
Composition: the subject centred in a square frame, occupying about 80% of the frame, with a little breathing room on every side so nothing touches the edges. Slight three-quarter angle, dynamic and appetising, as if caught mid-air in a perfume advertisement.
Lighting: soft warm key light from the upper left matching a premium perfume packshot, glossy natural highlights, juicy textures, tiny realistic droplets. Colours saturated but natural, harmonised with tropical sun yellow (#F2CC58).
Photorealistic, razor-sharp focus, clean cut-out edges with natural soft shadows removed (alpha only).
```

### 12. `fruit-cutout-berries`

| Field | Value |
|---|---|
| **1. Asset ID** | `fruit-cutout-berries` |
| **2. File name** | `fruit-cutout-berries.webp` |
| **3. Section** | 01 Hero · 03 Collection · 06 Experience |
| **4. Purpose** | Hero-sized cut-out of the red berries for RUBRA. In the hero it sits low beside the bottle (in front of the pedestal); also used beside the bottle in The Collection panel and in The Experience scene. |
| **6. Ratio** | 1:1 |
| **7. Recommended resolution** | 1600 × 1600 px |
| **8. Transparency** | Yes — transparent PNG/WebP (alpha) |
| **9. Placement in layout** | Hero: right of the bottle, 72% of bottle width, overlapping the pedestal. Collection: 44% of the stage width, bottom corner of the shape. `object-fit: contain`, centred. |
| **10. Destination path** | `public/images/fruits/fruit-cutout-berries.webp` |
| **11. Mobile variant** | Reuse the same file. |
| **12. Visual restrictions** | No background, no plate, no table, no shadow on the ground, no bottle, no text, no logos, no hands, no extra fruit of other kinds. |
| **13. References** | Attach Reference 02 (moodboard — the fruit next to each bottle) for styling and colour. |
| Component | ui/Media.tsx → FruitCutout |

**5. Prompt (copy into ChatGPT):**

```text
PULPA is a contemporary, premium perfume brand inspired by fruit (tagline: "Wear your wild side."). Art direction: contemporary luxury meets playful editorial design — vibrant but refined, tropical, fresh and sensual, high-end advertising photography. Brand palette: warm ivory #F6F1E8, charcoal #201F1C, pineapple yellow #F2CC58, red-berry pink-red #BC4358, papaya orange #F2A16E, green-apple green #A9C77D.

High-end food / still-life photography of a loose cluster of five or six glossy ripe raspberries with two fresh green raspberry leaves, isolated on a TRANSPARENT background, for the fragrance RUBRA (colour world #BC4358).
Composition: the subject centred in a square frame, occupying about 80% of the frame, with a little breathing room on every side so nothing touches the edges. Slight three-quarter angle, dynamic and appetising, as if caught mid-air in a perfume advertisement.
Lighting: soft warm key light from the upper left matching a premium perfume packshot, glossy natural highlights, juicy textures, tiny realistic droplets. Colours saturated but natural, harmonised with rose-red (#BC4358).
Photorealistic, razor-sharp focus, clean cut-out edges with natural soft shadows removed (alpha only).
```

### 13. `fruit-cutout-berries-accent`

| Field | Value |
|---|---|
| **1. Asset ID** | `fruit-cutout-berries-accent` |
| **2. File name** | `fruit-cutout-berries-accent.webp` |
| **3. Section** | 01 Hero · 03 Collection · 06 Experience |
| **4. Purpose** | Small floating accent for RUBRA (hero top-left accent and a small blurred depth copy on the right; also floats in The Experience scene). |
| **6. Ratio** | 1:1 |
| **7. Recommended resolution** | 1600 × 1600 px |
| **8. Transparency** | Yes — transparent PNG/WebP (alpha) |
| **9. Placement in layout** | Hero: floating above-left of the bottle at 50% of the bottle width, and a 26% blurred copy above-right. `object-fit: contain`, centred. |
| **10. Destination path** | `public/images/fruits/fruit-cutout-berries-accent.webp` |
| **11. Mobile variant** | Reuse the same file. |
| **12. Visual restrictions** | No background, no plate, no table, no shadow on the ground, no bottle, no text, no logos, no hands, no extra fruit of other kinds. |
| **13. References** | Attach Reference 02 (moodboard — the fruit next to each bottle) for styling and colour. |
| Component | ui/Media.tsx → FruitCutout |

**5. Prompt (copy into ChatGPT):**

```text
PULPA is a contemporary, premium perfume brand inspired by fruit (tagline: "Wear your wild side."). Art direction: contemporary luxury meets playful editorial design — vibrant but refined, tropical, fresh and sensual, high-end advertising photography. Brand palette: warm ivory #F6F1E8, charcoal #201F1C, pineapple yellow #F2CC58, red-berry pink-red #BC4358, papaya orange #F2A16E, green-apple green #A9C77D.

High-end food / still-life photography of two or three single glossy raspberries floating, slightly apart from each other, isolated on a TRANSPARENT background, for the fragrance RUBRA (colour world #BC4358).
Composition: the subject centred in a square frame, occupying about 80% of the frame, with a little breathing room on every side so nothing touches the edges. Slight three-quarter angle, dynamic and appetising, as if caught mid-air in a perfume advertisement.
Lighting: soft warm key light from the upper left matching a premium perfume packshot, glossy natural highlights, juicy textures, tiny realistic droplets. Colours saturated but natural, harmonised with rose-red (#BC4358).
Photorealistic, razor-sharp focus, clean cut-out edges with natural soft shadows removed (alpha only).
```

### 14. `fruit-cutout-papaya`

| Field | Value |
|---|---|
| **1. Asset ID** | `fruit-cutout-papaya` |
| **2. File name** | `fruit-cutout-papaya.webp` |
| **3. Section** | 01 Hero · 03 Collection |
| **4. Purpose** | Hero-sized cut-out of the papaya for MAREA. In the hero it sits low beside the bottle (in front of the pedestal); also used beside the bottle in The Collection panel. |
| **6. Ratio** | 1:1 |
| **7. Recommended resolution** | 1600 × 1600 px |
| **8. Transparency** | Yes — transparent PNG/WebP (alpha) |
| **9. Placement in layout** | Hero: right of the bottle, 72% of bottle width, overlapping the pedestal. Collection: 44% of the stage width, bottom corner of the shape. `object-fit: contain`, centred. |
| **10. Destination path** | `public/images/fruits/fruit-cutout-papaya.webp` |
| **11. Mobile variant** | Reuse the same file. |
| **12. Visual restrictions** | No background, no plate, no table, no shadow on the ground, no bottle, no text, no logos, no hands, no extra fruit of other kinds. |
| **13. References** | Attach Reference 02 (moodboard — the fruit next to each bottle) for styling and colour. |
| Component | ui/Media.tsx → FruitCutout |

**5. Prompt (copy into ChatGPT):**

```text
PULPA is a contemporary, premium perfume brand inspired by fruit (tagline: "Wear your wild side."). Art direction: contemporary luxury meets playful editorial design — vibrant but refined, tropical, fresh and sensual, high-end advertising photography. Brand palette: warm ivory #F6F1E8, charcoal #201F1C, pineapple yellow #F2CC58, red-berry pink-red #BC4358, papaya orange #F2A16E, green-apple green #A9C77D.

High-end food / still-life photography of half of a ripe papaya cut lengthwise, vivid orange flesh with a cavity full of glossy black seeds, green-yellow skin, isolated on a TRANSPARENT background, for the fragrance MAREA (colour world #F2A16E).
Composition: the subject centred in a square frame, occupying about 80% of the frame, with a little breathing room on every side so nothing touches the edges. Slight three-quarter angle, dynamic and appetising, as if caught mid-air in a perfume advertisement.
Lighting: soft warm key light from the upper left matching a premium perfume packshot, glossy natural highlights, juicy textures, tiny realistic droplets. Colours saturated but natural, harmonised with warm papaya orange (#F2A16E).
Photorealistic, razor-sharp focus, clean cut-out edges with natural soft shadows removed (alpha only).
```

### 15. `fruit-cutout-papaya-accent`

| Field | Value |
|---|---|
| **1. Asset ID** | `fruit-cutout-papaya-accent` |
| **2. File name** | `fruit-cutout-papaya-accent.webp` |
| **3. Section** | 01 Hero · 03 Collection |
| **4. Purpose** | Small floating accent for MAREA (hero top-left accent and a small blurred depth copy on the right). |
| **6. Ratio** | 1:1 |
| **7. Recommended resolution** | 1600 × 1600 px |
| **8. Transparency** | Yes — transparent PNG/WebP (alpha) |
| **9. Placement in layout** | Hero: floating above-left of the bottle at 50% of the bottle width, and a 26% blurred copy above-right. `object-fit: contain`, centred. |
| **10. Destination path** | `public/images/fruits/fruit-cutout-papaya-accent.webp` |
| **11. Mobile variant** | Reuse the same file. |
| **12. Visual restrictions** | No background, no plate, no table, no shadow on the ground, no bottle, no text, no logos, no hands, no extra fruit of other kinds. |
| **13. References** | Attach Reference 02 (moodboard — the fruit next to each bottle) for styling and colour. |
| Component | ui/Media.tsx → FruitCutout |

**5. Prompt (copy into ChatGPT):**

```text
PULPA is a contemporary, premium perfume brand inspired by fruit (tagline: "Wear your wild side."). Art direction: contemporary luxury meets playful editorial design — vibrant but refined, tropical, fresh and sensual, high-end advertising photography. Brand palette: warm ivory #F6F1E8, charcoal #201F1C, pineapple yellow #F2CC58, red-berry pink-red #BC4358, papaya orange #F2A16E, green-apple green #A9C77D.

High-end food / still-life photography of a crescent-shaped slice of papaya with a few black seeds, isolated on a TRANSPARENT background, for the fragrance MAREA (colour world #F2A16E).
Composition: the subject centred in a square frame, occupying about 80% of the frame, with a little breathing room on every side so nothing touches the edges. Slight three-quarter angle, dynamic and appetising, as if caught mid-air in a perfume advertisement.
Lighting: soft warm key light from the upper left matching a premium perfume packshot, glossy natural highlights, juicy textures, tiny realistic droplets. Colours saturated but natural, harmonised with warm papaya orange (#F2A16E).
Photorealistic, razor-sharp focus, clean cut-out edges with natural soft shadows removed (alpha only).
```

### 16. `fruit-cutout-apple`

| Field | Value |
|---|---|
| **1. Asset ID** | `fruit-cutout-apple` |
| **2. File name** | `fruit-cutout-apple.webp` |
| **3. Section** | 01 Hero · 03 Collection |
| **4. Purpose** | Hero-sized cut-out of the green apple for VERA. In the hero it sits low beside the bottle (in front of the pedestal); also used beside the bottle in The Collection panel. |
| **6. Ratio** | 1:1 |
| **7. Recommended resolution** | 1600 × 1600 px |
| **8. Transparency** | Yes — transparent PNG/WebP (alpha) |
| **9. Placement in layout** | Hero: right of the bottle, 72% of bottle width, overlapping the pedestal. Collection: 44% of the stage width, bottom corner of the shape. `object-fit: contain`, centred. |
| **10. Destination path** | `public/images/fruits/fruit-cutout-apple.webp` |
| **11. Mobile variant** | Reuse the same file. |
| **12. Visual restrictions** | No background, no plate, no table, no shadow on the ground, no bottle, no text, no logos, no hands, no extra fruit of other kinds. |
| **13. References** | Attach Reference 02 (moodboard — the fruit next to each bottle) for styling and colour. |
| Component | ui/Media.tsx → FruitCutout |

**5. Prompt (copy into ChatGPT):**

```text
PULPA is a contemporary, premium perfume brand inspired by fruit (tagline: "Wear your wild side."). Art direction: contemporary luxury meets playful editorial design — vibrant but refined, tropical, fresh and sensual, high-end advertising photography. Brand palette: warm ivory #F6F1E8, charcoal #201F1C, pineapple yellow #F2CC58, red-berry pink-red #BC4358, papaya orange #F2A16E, green-apple green #A9C77D.

High-end food / still-life photography of a whole crisp green apple with a short stem and one fresh leaf, a few tiny water droplets on the skin, isolated on a TRANSPARENT background, for the fragrance VERA (colour world #A9C77D).
Composition: the subject centred in a square frame, occupying about 80% of the frame, with a little breathing room on every side so nothing touches the edges. Slight three-quarter angle, dynamic and appetising, as if caught mid-air in a perfume advertisement.
Lighting: soft warm key light from the upper left matching a premium perfume packshot, glossy natural highlights, juicy textures, tiny realistic droplets. Colours saturated but natural, harmonised with soft green-apple green (#A9C77D).
Photorealistic, razor-sharp focus, clean cut-out edges with natural soft shadows removed (alpha only).
```

### 17. `fruit-cutout-apple-accent`

| Field | Value |
|---|---|
| **1. Asset ID** | `fruit-cutout-apple-accent` |
| **2. File name** | `fruit-cutout-apple-accent.webp` |
| **3. Section** | 01 Hero · 03 Collection |
| **4. Purpose** | Small floating accent for VERA (hero top-left accent and a small blurred depth copy on the right). |
| **6. Ratio** | 1:1 |
| **7. Recommended resolution** | 1600 × 1600 px |
| **8. Transparency** | Yes — transparent PNG/WebP (alpha) |
| **9. Placement in layout** | Hero: floating above-left of the bottle at 50% of the bottle width, and a 26% blurred copy above-right. `object-fit: contain`, centred. |
| **10. Destination path** | `public/images/fruits/fruit-cutout-apple-accent.webp` |
| **11. Mobile variant** | Reuse the same file. |
| **12. Visual restrictions** | No background, no plate, no table, no shadow on the ground, no bottle, no text, no logos, no hands, no extra fruit of other kinds. |
| **13. References** | Attach Reference 02 (moodboard — the fruit next to each bottle) for styling and colour. |
| Component | ui/Media.tsx → FruitCutout |

**5. Prompt (copy into ChatGPT):**

```text
PULPA is a contemporary, premium perfume brand inspired by fruit (tagline: "Wear your wild side."). Art direction: contemporary luxury meets playful editorial design — vibrant but refined, tropical, fresh and sensual, high-end advertising photography. Brand palette: warm ivory #F6F1E8, charcoal #201F1C, pineapple yellow #F2CC58, red-berry pink-red #BC4358, papaya orange #F2A16E, green-apple green #A9C77D.

High-end food / still-life photography of a thin horizontal cross-section slice of green apple showing the pale flesh and the star-shaped core with two seeds, isolated on a TRANSPARENT background, for the fragrance VERA (colour world #A9C77D).
Composition: the subject centred in a square frame, occupying about 80% of the frame, with a little breathing room on every side so nothing touches the edges. Slight three-quarter angle, dynamic and appetising, as if caught mid-air in a perfume advertisement.
Lighting: soft warm key light from the upper left matching a premium perfume packshot, glossy natural highlights, juicy textures, tiny realistic droplets. Colours saturated but natural, harmonised with soft green-apple green (#A9C77D).
Photorealistic, razor-sharp focus, clean cut-out edges with natural soft shadows removed (alpha only).
```

### 18. `fruit-universe-pineapple`

| Field | Value |
|---|---|
| **1. Asset ID** | `fruit-universe-pineapple` |
| **2. File name** | `fruit-universe-pineapple.webp` |
| **3. Section** | 02 · The Fruit Universe |
| **4. Purpose** | Macro “specimen” photograph of pineapple shown inside an organic mask (arch). Communicates the sensory, vibrant side of the brand. |
| **6. Ratio** | 4:5 |
| **7. Recommended resolution** | 1600 × 2000 px |
| **8. Transparency** | No — full-bleed photograph |
| **9. Placement in layout** | Fills its tile with `object-fit: cover` (centre). Tiles are 4:5 except Red Berries (1:1 flower mask). Adjust `position` in src/data/assets.ts if needed. |
| **10. Destination path** | `public/images/fruits/fruit-universe-pineapple.webp` |
| **11. Mobile variant** | Reuse the same file (tiles become a 2-column grid). |
| **12. Visual restrictions** | No text, no logos, no bottle, no hands, no plates or cutlery, no watermark. |
| **13. References** | Attach Reference 03 (graphic elements) for colour energy and Reference 02 (the fruit macro strip “THE FRUITS”). |
| Component | sections/FruitUniverse.tsx → specimen tile |

**5. Prompt (copy into ChatGPT):**

```text
PULPA is a contemporary, premium perfume brand inspired by fruit (tagline: "Wear your wild side."). Art direction: contemporary luxury meets playful editorial design — vibrant but refined, tropical, fresh and sensual, high-end advertising photography. Brand palette: warm ivory #F6F1E8, charcoal #201F1C, pineapple yellow #F2CC58, red-berry pink-red #BC4358, papaya orange #F2A16E, green-apple green #A9C77D.

Extreme close-up macro photograph of pineapple for the PULPA "Fruit Universe" section: the textured golden skin and cut juicy flesh of a pineapple, diamond-patterned rind.
Composition: vertical 4:5, the subject fills the frame edge to edge (no empty background), with the most interesting detail in the centre because the image will be cropped by a rounded organic mask — keep the centre 70% visually rich and the corners expendable.
Lighting: soft warm directional light from the upper left, juicy highlights, shallow depth of field, tiny droplets. Colour-graded to tropical sun yellow (#F2CC58) with hints of warm ivory.
Style: editorial, sensual, premium advertising macro photography, photorealistic, subtle grain.
```

### 19. `fruit-universe-berries`

| Field | Value |
|---|---|
| **1. Asset ID** | `fruit-universe-berries` |
| **2. File name** | `fruit-universe-berries.webp` |
| **3. Section** | 02 · The Fruit Universe |
| **4. Purpose** | Macro “specimen” photograph of red berries shown inside an organic mask (four-lobed flower (square crop)). Communicates the sensory, vibrant side of the brand. |
| **6. Ratio** | 4:5 |
| **7. Recommended resolution** | 1600 × 2000 px |
| **8. Transparency** | No — full-bleed photograph |
| **9. Placement in layout** | Fills its tile with `object-fit: cover` (centre). Tiles are 4:5 except Red Berries (1:1 flower mask). Adjust `position` in src/data/assets.ts if needed. |
| **10. Destination path** | `public/images/fruits/fruit-universe-berries.webp` |
| **11. Mobile variant** | Reuse the same file (tiles become a 2-column grid). |
| **12. Visual restrictions** | No text, no logos, no bottle, no hands, no plates or cutlery, no watermark. |
| **13. References** | Attach Reference 03 (graphic elements) for colour energy and Reference 02 (the fruit macro strip “THE FRUITS”). |
| Component | sections/FruitUniverse.tsx → specimen tile |

**5. Prompt (copy into ChatGPT):**

```text
PULPA is a contemporary, premium perfume brand inspired by fruit (tagline: "Wear your wild side."). Art direction: contemporary luxury meets playful editorial design — vibrant but refined, tropical, fresh and sensual, high-end advertising photography. Brand palette: warm ivory #F6F1E8, charcoal #201F1C, pineapple yellow #F2CC58, red-berry pink-red #BC4358, papaya orange #F2A16E, green-apple green #A9C77D.

Extreme close-up macro photograph of red berries for the PULPA "Fruit Universe" section: glossy ripe raspberries, every drupelet visible, a drop of juice.
Composition: vertical 4:5, the subject fills the frame edge to edge (no empty background), with the most interesting detail in the centre because the image will be cropped by a rounded organic mask — keep the centre 70% visually rich and the corners expendable.
Lighting: soft warm directional light from the upper left, juicy highlights, shallow depth of field, tiny droplets. Colour-graded to rose-red (#BC4358) with hints of warm ivory.
Style: editorial, sensual, premium advertising macro photography, photorealistic, subtle grain.
```

### 20. `fruit-universe-papaya`

| Field | Value |
|---|---|
| **1. Asset ID** | `fruit-universe-papaya` |
| **2. File name** | `fruit-universe-papaya.webp` |
| **3. Section** | 02 · The Fruit Universe |
| **4. Purpose** | Macro “specimen” photograph of papaya shown inside an organic mask (oval). Communicates the sensory, vibrant side of the brand. |
| **6. Ratio** | 4:5 |
| **7. Recommended resolution** | 1600 × 2000 px |
| **8. Transparency** | No — full-bleed photograph |
| **9. Placement in layout** | Fills its tile with `object-fit: cover` (centre). Tiles are 4:5 except Red Berries (1:1 flower mask). Adjust `position` in src/data/assets.ts if needed. |
| **10. Destination path** | `public/images/fruits/fruit-universe-papaya.webp` |
| **11. Mobile variant** | Reuse the same file (tiles become a 2-column grid). |
| **12. Visual restrictions** | No text, no logos, no bottle, no hands, no plates or cutlery, no watermark. |
| **13. References** | Attach Reference 03 (graphic elements) for colour energy and Reference 02 (the fruit macro strip “THE FRUITS”). |
| Component | sections/FruitUniverse.tsx → specimen tile |

**5. Prompt (copy into ChatGPT):**

```text
PULPA is a contemporary, premium perfume brand inspired by fruit (tagline: "Wear your wild side."). Art direction: contemporary luxury meets playful editorial design — vibrant but refined, tropical, fresh and sensual, high-end advertising photography. Brand palette: warm ivory #F6F1E8, charcoal #201F1C, pineapple yellow #F2CC58, red-berry pink-red #BC4358, papaya orange #F2A16E, green-apple green #A9C77D.

Extreme close-up macro photograph of papaya for the PULPA "Fruit Universe" section: the vivid orange flesh and glistening black seeds of a halved papaya.
Composition: vertical 4:5, the subject fills the frame edge to edge (no empty background), with the most interesting detail in the centre because the image will be cropped by a rounded organic mask — keep the centre 70% visually rich and the corners expendable.
Lighting: soft warm directional light from the upper left, juicy highlights, shallow depth of field, tiny droplets. Colour-graded to warm papaya orange (#F2A16E) with hints of warm ivory.
Style: editorial, sensual, premium advertising macro photography, photorealistic, subtle grain.
```

### 21. `fruit-universe-apple`

| Field | Value |
|---|---|
| **1. Asset ID** | `fruit-universe-apple` |
| **2. File name** | `fruit-universe-apple.webp` |
| **3. Section** | 02 · The Fruit Universe |
| **4. Purpose** | Macro “specimen” photograph of green apple shown inside an organic mask (organic blob). Communicates the sensory, vibrant side of the brand. |
| **6. Ratio** | 4:5 |
| **7. Recommended resolution** | 1600 × 2000 px |
| **8. Transparency** | No — full-bleed photograph |
| **9. Placement in layout** | Fills its tile with `object-fit: cover` (centre). Tiles are 4:5 except Red Berries (1:1 flower mask). Adjust `position` in src/data/assets.ts if needed. |
| **10. Destination path** | `public/images/fruits/fruit-universe-apple.webp` |
| **11. Mobile variant** | Reuse the same file (tiles become a 2-column grid). |
| **12. Visual restrictions** | No text, no logos, no bottle, no hands, no plates or cutlery, no watermark. |
| **13. References** | Attach Reference 03 (graphic elements) for colour energy and Reference 02 (the fruit macro strip “THE FRUITS”). |
| Component | sections/FruitUniverse.tsx → specimen tile |

**5. Prompt (copy into ChatGPT):**

```text
PULPA is a contemporary, premium perfume brand inspired by fruit (tagline: "Wear your wild side."). Art direction: contemporary luxury meets playful editorial design — vibrant but refined, tropical, fresh and sensual, high-end advertising photography. Brand palette: warm ivory #F6F1E8, charcoal #201F1C, pineapple yellow #F2CC58, red-berry pink-red #BC4358, papaya orange #F2A16E, green-apple green #A9C77D.

Extreme close-up macro photograph of green apple for the PULPA "Fruit Universe" section: the cold, dewy skin of a green apple with a fresh bite or slice showing crisp pale flesh.
Composition: vertical 4:5, the subject fills the frame edge to edge (no empty background), with the most interesting detail in the centre because the image will be cropped by a rounded organic mask — keep the centre 70% visually rich and the corners expendable.
Lighting: soft warm directional light from the upper left, juicy highlights, shallow depth of field, tiny droplets. Colour-graded to soft green-apple green (#A9C77D) with hints of warm ivory.
Style: editorial, sensual, premium advertising macro photography, photorealistic, subtle grain.
```

### 22. `philosophy-editorial`

| Field | Value |
|---|---|
| **1. Asset ID** | `philosophy-editorial` |
| **2. File name** | `philosophy-editorial.webp` |
| **3. Section** | 04 · Our Philosophy |
| **4. Purpose** | Large editorial image of the asymmetric philosophy spread — the brand's playful, rule-breaking personality. |
| **6. Ratio** | 4:5 |
| **7. Recommended resolution** | 1600 × 2000 px |
| **8. Transparency** | No |
| **9. Placement in layout** | Right column, 4:5, rounded corners (large top-right radius). `object-fit: cover`, position 50% 40%. |
| **10. Destination path** | `public/images/editorial/philosophy-editorial.webp` |
| **11. Mobile variant** | Reuse the same file. |
| **12. Visual restrictions** | No visible face, no text other than the bottle label, no other brands, no watermark, no cluttered background. |
| **13. References** | Attach Reference 02 (moodboard) for the bottle and colours and Reference 01 for the label symbol. |
| Component | sections/Philosophy.tsx |

**5. Prompt (copy into ChatGPT):**

```text
PULPA is a contemporary, premium perfume brand inspired by fruit (tagline: "Wear your wild side."). Art direction: contemporary luxury meets playful editorial design — vibrant but refined, tropical, fresh and sensual, high-end advertising photography. Brand palette: warm ivory #F6F1E8, charcoal #201F1C, pineapple yellow #F2CC58, red-berry pink-red #BC4358, papaya orange #F2A16E, green-apple green #A9C77D.

Editorial still-life photograph for the PULPA "Our Philosophy" section: a hand with a natural manicure holding a PULPA RUBRA perfume bottle (heavy clear square glass, rose-red liquid #BC4358, matte black cylindrical cap, minimal ivory printed label) among playful, unexpected arrangements of cut tropical fruit — half a papaya, pineapple wedges, raspberries, a green-apple slice — arranged on a warm ivory surface with bold sculptural shadows.
Composition: vertical 4:5, the bottle and hand in the upper-middle area, fruit spilling towards the bottom; keep the top-right corner a little calmer (a circular badge overlaps it). Slight top-down angle.
Lighting: hard, sunny late-afternoon light from the upper left with crisp graphic shadows, saturated colours, contemporary fashion still-life (playful but luxurious).
Photorealistic, premium magazine quality.
```

### 23. `philosophy-detail`

| Field | Value |
|---|---|
| **1. Asset ID** | `philosophy-detail` |
| **2. File name** | `philosophy-detail.webp` |
| **3. Section** | 04 · Our Philosophy |
| **4. Purpose** | Small circular detail overlapping the main editorial image — sensorial texture. |
| **6. Ratio** | 1:1 |
| **7. Recommended resolution** | 1400 × 1400 px |
| **8. Transparency** | No |
| **9. Placement in layout** | Circular crop (rounded-full) with an orange ring, overlapping the bottom-left of the editorial image. `object-fit: cover`, centred. |
| **10. Destination path** | `public/images/editorial/philosophy-detail.webp` |
| **11. Mobile variant** | Reuse the same file. |
| **12. Visual restrictions** | No text, no logos, no hands, no watermark. |
| **13. References** | Attach Reference 02 for colour. |
| Component | sections/Philosophy.tsx |

**5. Prompt (copy into ChatGPT):**

```text
PULPA is a contemporary, premium perfume brand inspired by fruit (tagline: "Wear your wild side."). Art direction: contemporary luxury meets playful editorial design — vibrant but refined, tropical, fresh and sensual, high-end advertising photography. Brand palette: warm ivory #F6F1E8, charcoal #201F1C, pineapple yellow #F2CC58, red-berry pink-red #BC4358, papaya orange #F2A16E, green-apple green #A9C77D.

Macro detail photograph: drops of golden pineapple juice and tiny bubbles sliding down the surface of thick, clear perfume glass tinted sunny yellow (#F2CC58), with a sliver of fresh pineapple flesh blurred in the background.
Composition: square, the most interesting texture in the centre because the image is cropped to a circle; edges can be soft and out of focus.
Lighting: warm backlight through the glass, glowing yellows and soft ivory highlights. Photorealistic macro, shallow depth of field.
```

### 24. `experience-backdrop`

| Field | Value |
|---|---|
| **1. Asset ID** | `experience-backdrop` |
| **2. File name** | `experience-backdrop.webp` |
| **3. Section** | 05 · The Experience |
| **4. Purpose** | The cinematic scene revealed when the arch window expands to full screen. The RUBRA bottle and berry cut-outs are composited on top, so the centre must stay free of products. |
| **6. Ratio** | 16:9 |
| **7. Recommended resolution** | 2560 × 1440 px |
| **8. Transparency** | No |
| **9. Placement in layout** | Full-bleed inside the pinned section, `object-fit: cover`, centred. It is first seen through a small arch and scales from 1.3 to 1. |
| **10. Destination path** | `public/images/editorial/experience-backdrop.webp` |
| **11. Mobile variant** | Reuse the same file (centre crop). Keep key light in the central 40% of the width. |
| **12. Visual restrictions** | No bottle, no text, no logos, no people, no watermark. |
| **13. References** | Attach Reference 02 for the RUBRA colour world and Reference 05 (video) for the cinematic mood. |
| Component | sections/Experience.tsx (`data-exp-media`) |

**5. Prompt (copy into ChatGPT):**

```text
PULPA is a contemporary, premium perfume brand inspired by fruit (tagline: "Wear your wild side."). Art direction: contemporary luxury meets playful editorial design — vibrant but refined, tropical, fresh and sensual, high-end advertising photography. Brand palette: warm ivory #F6F1E8, charcoal #201F1C, pineapple yellow #F2CC58, red-berry pink-red #BC4358, papaya orange #F2A16E, green-apple green #A9C77D.

Cinematic, moody perfume-campaign scene for RUBRA (red berries): a dark wine-red set (#4A1220 to #7A2135) with glossy raspberries and blackberry leaves scattered in the foreground corners and on the floor, heavily out of focus, glowing berry-pink bokeh lights (#E9879A) and a warm papaya-orange rim light (#F2A16E) in the background, soft haze. A soft pool of light in the centre-bottom where a product will be placed later.
Composition: wide 16:9. Keep the central third (from 25% to 95% of the height) clean and darker so a bottle can be composited there; keep the top-left and top-right areas calm for large headline text.
Lighting: low-key, sensual, theatrical, rich reds, high-end fragrance film still, photorealistic, subtle grain.
```
