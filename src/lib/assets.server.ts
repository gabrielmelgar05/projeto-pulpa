import { existsSync } from "node:fs";
import path from "node:path";
import { ASSETS, ASSET_IDS } from "@/data/assets";
import type { AssetId } from "@/types";

/**
 * Returns the IDs of every registered image that physically exists in /public.
 * Runs on the server (at build time for the static page), so slots switch from
 * placeholder to real image automatically once a file is added.
 */
export function getAvailableAssetIds(): AssetId[] {
  const publicDir = path.join(process.cwd(), "public");
  return ASSET_IDS.filter((id) => existsSync(path.join(publicDir, ASSETS[id].src)));
}
