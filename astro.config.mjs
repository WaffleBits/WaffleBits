import { defineConfig } from "astro/config";

// Project page served at https://wafflebits.github.io/WaffleBits/
// WB_BASE lets a local preview build at root ("/"); production uses "/WaffleBits".
export default defineConfig({
  site: "https://wafflebits.github.io",
  base: process.env.WB_BASE === "root" ? "/" : (process.env.WB_BASE ?? "/WaffleBits"),
  trailingSlash: "ignore",
  build: { assets: "_astro" },
  devToolbar: { enabled: false },
});
