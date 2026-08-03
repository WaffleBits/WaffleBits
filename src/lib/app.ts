/* Client entry. Everything here is progressive: the page is complete
   and readable before a single line of this runs. */
import { initReveal, initStrips } from "./reveal";
import { initNav } from "./nav";
import { initLedger } from "./ledger";
import { initPipeline } from "./pipeline";
import { initPalette } from "./palette";
import { initSentinel } from "./sentinel";

function init() {
  initReveal();
  initStrips();
  initNav();
  initLedger();
  initSentinel();
  initPipeline();
  initPalette();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
