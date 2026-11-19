// Lists every image slot declared in src/data/assets.ts and whether its file exists in /public.
// Usage: npm run assets:check
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const source = readFileSync(path.join(root, "src/types/index.ts"), "utf8");
const block = source.slice(source.indexOf("export type AssetId"), source.indexOf("export interface AssetEntry"));
const ids = [...block.matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]);

const folderFor = (id) =>
  id.startsWith("hero-") ? "hero" : id.startsWith("fragrance-") ? "fragrances" : id.startsWith("fruit-") ? "fruits" : "editorial";

let missing = 0;
for (const id of ids) {
  const rel = `public/images/${folderFor(id)}/${id}.webp`;
  const ok = existsSync(path.join(root, rel));
  if (!ok) missing++;
  console.log(`${ok ? "✔" : "·"} ${id.padEnd(32)} ${rel}`);
}
console.log(`\n${ids.length - missing}/${ids.length} images present, ${missing} still using placeholders.`);
