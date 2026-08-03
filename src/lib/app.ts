/* Client entry. The page is complete and readable before any of it runs. */
import { initReveal, initTrace, initGates } from "./reveal";
import { initNav } from "./nav";

function init() {
  initReveal();
  initTrace();
  initGates();
  initNav();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
