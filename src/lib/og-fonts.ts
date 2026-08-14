import { readFile } from "node:fs/promises";
import { join } from "node:path";

const ASSETS_DIR = join(process.cwd(), "src/app/assets");

let fontsPromise: Promise<
  { name: string; data: ArrayBuffer; style: "normal"; weight: 500 | 600 | 700 }[]
> | null = null;

export function loadOgFonts() {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      readFile(join(ASSETS_DIR, "plex-mono-600.ttf")),
      readFile(join(ASSETS_DIR, "plex-mono-700.ttf")),
      readFile(join(ASSETS_DIR, "plex-sans-500.ttf")),
    ]).then(([plexMono600, plexMono700, plexSans500]) => [
      { name: "IBM Plex Mono", data: plexMono600.buffer as ArrayBuffer, style: "normal" as const, weight: 600 as const },
      { name: "IBM Plex Mono", data: plexMono700.buffer as ArrayBuffer, style: "normal" as const, weight: 700 as const },
      { name: "IBM Plex Sans", data: plexSans500.buffer as ArrayBuffer, style: "normal" as const, weight: 500 as const },
    ]);
  }
  return fontsPromise;
}
