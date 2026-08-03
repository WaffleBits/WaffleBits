/* BASE_URL is "/WaffleBits" in production and "/" locally, and Astro does
   not guarantee the trailing slash. Join through here so a path can never
   weld itself onto the base. */
const BASE = import.meta.env.BASE_URL;

export const asset = (path: string) =>
  `${BASE.endsWith("/") ? BASE : BASE + "/"}${path.replace(/^\//, "")}`;
