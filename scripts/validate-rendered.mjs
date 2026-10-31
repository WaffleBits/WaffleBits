import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(process.argv[2] ?? "dist/index.html", "utf8");

for (const [name, text] of [
  ["name", "Adnan Berik"],
  ["resume asset", 'href="/WaffleBits/assets/AdnanBerik-Resume.pdf"'],
  ["avatar asset", 'href="/WaffleBits/assets/avatar.jpg"'],
  ["email", "adnanberik@hotmail.com"],
  ["LinkedIn", "linkedin.com/in/adnanberik"],
  ["live demo", "wafflebits.github.io/readiness-control-tower"],
  ["player count", "35,225"],
  ["gateway cost", "4.7 ms"],
  ["limiter fix", "counts a request only when it fits"],
  ["experience", 'id="experience"'],
]) {
  assert.equal(html.includes(text), true, `missing rendered ${name}`);
}

assert.equal(html.includes("WaffleBitsassets"), false, "base path welded onto an asset");
assert.equal(html.includes("—"), false, "em dash found in rendered page");
assert.equal(html.includes('id="evidence"'), false, "verification index came back");
assert.equal(html.includes('id="capabilities"'), false, "capabilities section came back");

for (const repository of [
  "secure-gpu-inference-gateway",
  "wafflesonne-tournament",
  "cloud-detection-lab",
  "deterministic-inference-scheduler",
  "triton-kernel-lab",
  "triton-inference-benchmark",
  "readiness-control-tower",
  "heterocore-compiler",
  "market-microstructure-engine",
]) {
  assert.equal(html.includes(repository), true, `missing project link: ${repository}`);
}

console.log(`validated rendered profile (${html.length} bytes)`);
