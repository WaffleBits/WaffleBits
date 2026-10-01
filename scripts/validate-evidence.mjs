import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const path = process.argv[2] ?? "dist/evidence.json";
const raw = await readFile(path, "utf8");
const manifest = JSON.parse(raw);

assert.equal(manifest.schema_version, 1);
assert.equal(manifest.kind, "public-portfolio-evidence");
assert.equal(manifest.generated_from, "src/data/portfolio.ts");
assert.equal(manifest.scope, "Public project, work-history, and on-page evidence links");
assert.deepEqual(Object.keys(manifest).sort(), [
  "boundaries",
  "capabilities",
  "generated_from",
  "kind",
  "projects",
  "proof",
  "schema_version",
  "scope",
].sort());
assert.equal(manifest.boundaries.length, 3);
assert.equal(manifest.proof.length, 14);
assert.equal(manifest.capabilities.length, 6);
assert.equal(manifest.projects.length, 7);

const publicHref = (href) =>
  href.startsWith("#") ||
  href.startsWith("https://github.com/WaffleBits/") ||
  href.startsWith("https://wafflebits.github.io/");

const proofIds = new Set();
for (const item of manifest.proof) {
  assert.match(item.id, /^proof-[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.equal(proofIds.has(item.id), false, `duplicate proof id: ${item.id}`);
  proofIds.add(item.id);
  assert.ok(["interactive", "measured", "deterministic", "operational", "verified", "research"].includes(item.kind));
  assert.ok(item.label.length > 0);
  assert.ok(item.statement.length > 0);
  assert.equal(publicHref(item.href), true, `non-public proof link: ${item.href}`);
}

const resilienceProof = manifest.proof.find((item) => item.label === "failure-mode drill");
assert.ok(resilienceProof, "missing failure-mode drill proof");
assert.equal(
  resilienceProof.href,
  "https://github.com/WaffleBits/secure-gpu-inference-gateway/blob/main/artifacts/resilience-drill-evidence.json",
);
assert.match(resilienceProof.statement, /synthetic gateway drill/i);
assert.match(resilienceProof.statement, /mitigation, rollback, and recovery thresholds/i);

const capabilityCodes = new Set();
for (const item of manifest.capabilities) {
  assert.match(item.code, /^[A-Z]+$/);
  assert.equal(capabilityCodes.has(item.code), false, `duplicate capability code: ${item.code}`);
  capabilityCodes.add(item.code);
  assert.ok(item.title.length > 0);
  assert.ok(item.statement.length > 0);
  assert.ok(Array.isArray(item.topics) && item.topics.length > 0);
  assert.ok(item.topics.every((topic) => topic.length > 0));
  assert.ok(item.link_label.length > 0);
  assert.ok(["public-artifact", "profile-section"].includes(item.link_scope));
  assert.equal(publicHref(item.href), true, `non-public capability link: ${item.href}`);
}

const projectIds = new Set();
for (const item of manifest.projects) {
  assert.match(item.id, /^CF-[0-9]{2}$/);
  assert.equal(projectIds.has(item.id), false, `duplicate project id: ${item.id}`);
  projectIds.add(item.id);
  assert.ok(Array.isArray(item.roles) && item.roles.length > 0);
  assert.ok(item.roles.every((role) => /^[a-z]+$/.test(role)));
  assert.ok(item.title.length > 0);
  assert.ok(item.summary.length > 0);
  assert.ok(Array.isArray(item.tags) && item.tags.length > 0);
  assert.ok(item.tags.every((tag) => tag.length > 0));
  const expectedProjectKeys = ["evidence", "href", "id", "impact", "problem", "roles", "summary", "system", "tags", "title"];
  for (const optionalField of ["demo", "chart"]) {
    if (item[optionalField] !== undefined) expectedProjectKeys.push(optionalField);
  }
  assert.deepEqual(Object.keys(item).sort(), expectedProjectKeys.sort(), `${item.id} schema changed`);
  for (const field of ["problem", "system", "evidence", "impact"]) {
    assert.ok(item[field].length > 0, `${item.id} missing ${field}`);
  }
  assert.equal(item.href.startsWith("https://github.com/WaffleBits/"), true, `non-public project link: ${item.href}`);
  for (const field of ["demo", "chart"]) {
    if (item[field] !== undefined) {
      assert.equal(publicHref(item[field]), true, `non-public project ${field}: ${item[field]}`);
    }
  }
}

// The manifest is shareable evidence metadata, not a request or credential log.
assert.doesNotMatch(raw, /(?:authorization\s*:\s*bearer|bearer\s+[a-z0-9._-]{16,}|api[_-]?key|password\s*[:=]|-----begin)/i);
assert.doesNotMatch(raw, /(?:^|["' ])(?:\/home\/|[A-Z]:\\)/);
assert.doesNotMatch(raw, /adnanberik@hotmail\.com/i);

console.log(`validated ${manifest.proof.length} proof items, ${manifest.capabilities.length} capabilities, and ${manifest.projects.length} projects in ${path}`);
