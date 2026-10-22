import { readFileSync } from "node:fs";

const workflowPath = ".github/workflows/pages.yml";
const workflow = readFileSync(workflowPath, "utf8");
const references = [...workflow.matchAll(/^\s*uses:\s*([^\s#]+)/gm)];
const problems = [];
let externalCount = 0;

for (const match of references) {
  const reference = match[1];
  if (reference.startsWith("./")) continue;
  externalCount += 1;

  const at = reference.lastIndexOf("@");
  const revision = at === -1 ? "" : reference.slice(at + 1);
  if (!/^[0-9a-f]{40}$/.test(revision)) {
    const line = workflow.slice(0, match.index).split("\n").length;
    problems.push(`${workflowPath}:${line}: ${reference}`);
  }
}

if (externalCount === 0) {
  problems.push(`${workflowPath}: no external action references were found`);
}

if (problems.length > 0) {
  console.error("GitHub Actions must be pinned to full 40-character commit SHAs:");
  for (const problem of problems) console.error(`- ${problem}`);
  process.exitCode = 1;
} else {
  console.log(
    `Verified ${externalCount} external GitHub Actions use full commit SHAs in ${workflowPath}.`,
  );
}
