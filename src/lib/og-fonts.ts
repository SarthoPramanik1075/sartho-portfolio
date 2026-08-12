import { readFile } from "node:fs/promises";
import { join } from "node:path";

const ASSETS_DIR = join(process.cwd(), "src/app/assets");

let fontsPromise: Promise<
  { name: string; data: ArrayBuffer; style: "normal"; weight: 500 | 600 | 700 }[]
> | null = null;

export function loadOgFonts() {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      readFile(join(ASSETS_DIR, "fraunces-600.ttf")),
      readFile(join(ASSETS_DIR, "fraunces-700.ttf")),
      readFile(join(ASSETS_DIR, "geist-500.ttf")),
    ]).then(([fraunces600, fraunces700, geist500]) => [
      { name: "Fraunces", data: fraunces600.buffer as ArrayBuffer, style: "normal" as const, weight: 600 as const },
      { name: "Fraunces", data: fraunces700.buffer as ArrayBuffer, style: "normal" as const, weight: 700 as const },
      { name: "Geist", data: geist500.buffer as ArrayBuffer, style: "normal" as const, weight: 500 as const },
    ]);
  }
  return fontsPromise;
}
