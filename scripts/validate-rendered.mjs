import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const htmlPath = process.argv[2] ?? "dist/index.html";
const evidencePath = process.argv[3] ?? "dist/evidence.json";
const html = await readFile(htmlPath, "utf8");
const manifest = JSON.parse(await readFile(evidencePath, "utf8"));

for (const [name, text] of [
  ["name", "Adnan Berik"],
  ["resume asset", 'href="/WaffleBits/assets/AdnanBerik-Resume.pdf"'],
  ["avatar asset", 'href="/WaffleBits/assets/avatar.jpg"'],
  ["email", "adnanberik@hotmail.com"],
  ["LinkedIn", "linkedin.com/in/adnanberik"],
  ["live demo", "wafflebits.github.io/readiness-control-tower"],
  ["benchmark evidence", "A single-host synthetic CI fixture runs two authenticated TLS 1.2+ HTTPS agents"],
  ["trend report", "privacy-safe trend report compares ordered saved runs"],
  ["lifecycle evidence", "process-launch to selected HTTP-200 readiness"],
  ["request boundary", "2 HTTPS agents / 8 requests / 0 duplicates"],
  ["verification section", 'id="evidence"'],
  ["verification heading", "Verification index"],
  ["restart evidence", "restart reconciliation"],
  ["controlled readiness", "controlled readiness"],
  ["lifecycle link", "https://github.com/WaffleBits/triton-inference-benchmark/blob/main/lifecycle_qualification.py"],
  ["provenance evidence", "qualification provenance"],
  ["manifest source link", "https://github.com/WaffleBits/triton-inference-benchmark#create-a-content-addressed-qualification-manifest"],
  ["failure-mode drill", "failure-mode drill"],
  ["resilience artifact", "https://github.com/WaffleBits/secure-gpu-inference-gateway/blob/main/artifacts/resilience-drill-evidence.json"],
  ["capacity plan", "capacity plan"],
  ["capacity artifact", "https://github.com/WaffleBits/secure-gpu-inference-gateway/blob/main/artifacts/capacity-plan-evidence.json"],
  ["manifest href", 'href="/WaffleBits/evidence.json"'],
  ["manifest label", "Structured proof, capability, and project records"],
  ["capabilities section", 'id="capabilities"'],
  ["capabilities label", "systems → evidence"],
  ["benchmark repository", "https://github.com/WaffleBits/triton-inference-benchmark"],
  ["gateway repository", "https://github.com/WaffleBits/secure-gpu-inference-gateway"],
  ["scheduler repository", "https://github.com/WaffleBits/deterministic-inference-scheduler"],
  ["experience target", "Experience record"],
]) {
  assert.equal(html.includes(text), true, `missing rendered ${name}`);
}

assert.equal(html.includes("WaffleBitsassets"), false, "base path welded onto an asset");
assert.equal(html.includes("—"), false, "em dash found in rendered page");
assert.equal((html.match(/class="proof__row"/g) ?? []).length, 15, "proof row count changed");
assert.equal((html.match(/class="capability"/g) ?? []).length, 6, "capability row count changed");
for (const repository of [
  "secure-gpu-inference-gateway",
  "deterministic-inference-scheduler",
  "triton-kernel-lab",
  "triton-inference-benchmark",
  "readiness-control-tower",
  "heterocore-compiler",
  "market-microstructure-engine",
]) {
  assert.equal(html.includes(repository), true, `missing project link: ${repository}`);
}

assert.equal(manifest.kind, "public-portfolio-evidence");
assert.equal(manifest.proof.length, 15);
assert.equal(manifest.capabilities.length, 6);
assert.equal(manifest.projects.length, 7);

console.log(`validated rendered profile (${html.length} bytes) and manifest (${manifest.proof.length} proof / ${manifest.capabilities.length} capabilities / ${manifest.projects.length} projects)`);
