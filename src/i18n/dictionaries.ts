import "server-only";
import { type Locale } from "./config";

// We use dynamic imports to load the dictionaries lazily on the server.
// This ensures that only the requested locale's dictionary is loaded into memory,
// and it never gets shipped to the client JavaScript bundle.
const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  th: () => import("./dictionaries/th.json").then((module) => module.default),
  ja: () => import("./dictionaries/ja.json").then((module) => module.default),
};

export type Dictionary = Awaited<ReturnType<typeof dictionaries["en"]>>;

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  if (!dictionaries[locale]) {
    // Fallback to default if somehow an invalid locale bypasses the middleware
    return dictionaries["th"]() as unknown as Dictionary;
  }
  return dictionaries[locale]() as unknown as Dictionary;
};
