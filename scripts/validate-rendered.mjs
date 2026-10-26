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
  ["release-gate scope", "These checked fixtures are synthetic; no model deployment or rollback is executed."],
  ["release validation contract", "https://github.com/WaffleBits/deterministic-inference-scheduler/blob/main/docs/RELEASE_VALIDATION.md"],
  ["safe release fixture", "https://github.com/WaffleBits/deterministic-inference-scheduler/blob/main/fixtures/release_gate_safe.json"],
  ["rollback release fixture", "https://github.com/WaffleBits/deterministic-inference-scheduler/blob/main/fixtures/release_gate_bad.json"],
  ["benchmark evidence", "A single-host synthetic CI fixture runs two authenticated TLS 1.2+ HTTPS agents"],
  ["trend report", "privacy-safe trend report compares ordered saved runs"],
  ["lifecycle evidence", "process-launch to selected HTTP-200 readiness"],
  ["request boundary", "2 HTTPS agents / 8 requests / 0 duplicates"],
  ["verification section", 'id="evidence"'],
  ["verification heading", "Verification index"],
  ["restart evidence", "restart reconciliation"],
  ["controlled readiness", "controlled readiness"],
  ["lifecycle link", "https://github.com/WaffleBits/triton-inference-benchmark/blob/main/lifecycle_qualification.py"],
  ["lifecycle cancellation", "lifecycle cancellation"],
  ["cancellation fixture", "https://github.com/WaffleBits/triton-inference-benchmark/blob/main/tests/run_lifecycle_signal_fixture.py"],
  ["cancellation evidence boundary", "single-host process-cleanup evidence; remote cancellation is covered by a separate authenticated loopback protocol test, not production-network evidence"],
  ["remote-agent cancellation", "remote-agent cancellation"],
  ["remote cancellation fixture", "https://github.com/WaffleBits/triton-inference-benchmark/blob/main/tests/run_remote_agent_cancellation_fixture.py"],
  ["remote cancellation boundary", "not interrupted-work recovery or production-network behavior"],
  ["provenance evidence", "qualification provenance"],
  ["manifest source link", "https://github.com/WaffleBits/triton-inference-benchmark#create-a-content-addressed-qualification-manifest"],
  ["failure-mode drill", "failure-mode drill"],
  ["resilience artifact", "https://github.com/WaffleBits/secure-gpu-inference-gateway/blob/main/artifacts/resilience-drill-evidence.json"],
  ["capacity plan", "capacity plan"],
  ["capacity artifact", "https://github.com/WaffleBits/secure-gpu-inference-gateway/blob/main/artifacts/capacity-plan-evidence.json"],
  ["stream usage validation", "stream usage validation"],
  ["stream token boundary", "Text chunks and output bytes are not treated as tokens"],
  ["stream usage test", "https://github.com/WaffleBits/triton-inference-benchmark/blob/main/tests/test_openai_streaming.py"],
  ["generated scheduler invariants", "generated scheduler invariants"],
  ["scheduler property-test scope", "128 bounded generated property cases"],
  ["scheduler property-test source", "https://github.com/WaffleBits/deterministic-inference-scheduler/blob/main/tests/scheduler.rs"],
  ["scheduler synthetic boundary", "not production traces or performance evidence"],
  ["scheduler priority aging", "priority-aging admission"],
  ["scheduler aging behavior", "admits an older low-priority request at tick 4"],
  ["scheduler aging evidence boundary", "not production fairness, production traffic, or a performance result"],
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
assert.equal((html.match(/class="proof__row"/g) ?? []).length, 20, "proof row count changed");
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
assert.equal(manifest.proof.length, 20);
assert.equal(manifest.capabilities.length, 6);
assert.equal(manifest.projects.length, 7);

console.log(`validated rendered profile (${html.length} bytes) and manifest (${manifest.proof.length} proof / ${manifest.capabilities.length} capabilities / ${manifest.projects.length} projects)`);
