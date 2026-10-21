import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { createServer } from "node:net";
import { dirname, resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const normalizeBase = (value) => {
  assert.equal(typeof value, "string");
  assert.equal(/[?#\\\s]/.test(value), false, `invalid WB_BASE: ${value}`);
  if (value === "root" || value === "/") return "";
  const parts = value.split("/").filter(Boolean);
  assert.ok(parts.length > 0, `invalid WB_BASE: ${value}`);
  return `/${parts.join("/")}`;
};

const getAvailablePort = async () => {
  const server = createServer();
  await new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolveListen);
  });
  const address = server.address();
  assert.ok(address && typeof address === "object");
  const { port } = address;
  await new Promise((resolveClose, reject) =>
    server.close((error) => (error ? reject(error) : resolveClose())),
  );
  return port;
};

const basePath = normalizeBase(process.env.WB_BASE ?? "/WaffleBits");
const pagePath = basePath ? `${basePath}/` : "/";
const manifestPath = `${basePath}/evidence.json`;
const port = await getAvailablePort();
const origin = `http://127.0.0.1:${port}`;
const astroPackagePath = resolve(process.cwd(), "node_modules/astro/package.json");
const astroPackage = JSON.parse(await readFile(astroPackagePath, "utf8"));
const astroBin = typeof astroPackage.bin === "string" ? astroPackage.bin : astroPackage.bin?.astro;
assert.ok(astroBin, "Astro package does not expose its CLI entry point");
const child = spawn(
  process.execPath,
  [resolve(dirname(astroPackagePath), astroBin), "preview", "--host", "127.0.0.1", "--port", String(port), "--strictPort"],
  {
    cwd: process.cwd(),
    env: process.env,
    detached: process.platform !== "win32",
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  },
);

let previewOutput = "";
const appendOutput = (chunk) => {
  previewOutput = `${previewOutput}${chunk}`.slice(-8000);
};
child.stdout.setEncoding("utf8").on("data", appendOutput);
child.stderr.setEncoding("utf8").on("data", appendOutput);
let childExit;
const exited = new Promise((resolveExit) => {
  child.once("exit", (code, signal) => {
    childExit = { code, signal };
    resolveExit(childExit);
  });
});
const spawnError = new Promise((_, reject) => child.once("error", reject));

const stopPreview = async () => {
  if (!child.pid || child.exitCode !== null || child.signalCode !== null) return;
  try {
    if (process.platform === "win32") child.kill("SIGTERM");
    else process.kill(-child.pid, "SIGTERM");
  } catch (error) {
    if (error.code !== "ESRCH") throw error;
  }
  await Promise.race([exited, delay(4000)]);
  if (child.exitCode === null && child.signalCode === null) {
    try {
      if (process.platform === "win32") child.kill("SIGKILL");
      else process.kill(-child.pid, "SIGKILL");
    } catch (error) {
      if (error.code !== "ESRCH") throw error;
    }
    await Promise.race([exited, delay(1000)]);
  }
};

let receivedSignal;
let rejectForSignal;
const interrupted = new Promise((_, reject) => {
  rejectForSignal = reject;
});
const signalHandlers = new Map();
for (const signal of ["SIGINT", "SIGTERM"]) {
  const handler = () => {
    receivedSignal = signal;
    rejectForSignal(new Error(`received ${signal}`));
  };
  signalHandlers.set(signal, handler);
  process.once(signal, handler);
}

const smoke = async () => {
  const deadline = Date.now() + 15_000;
  let ready = false;
  while (Date.now() < deadline) {
    if (childExit) {
      throw new Error(`Astro Preview exited before readiness (${JSON.stringify(childExit)}):\n${previewOutput}`);
    }
    try {
      const response = await fetch(`${origin}/`, { signal: AbortSignal.timeout(500) });
      await response.body?.cancel();
      ready = true;
      break;
    } catch {
      await delay(150);
    }
  }
  assert.equal(ready, true, `Astro Preview did not become ready within 15 seconds:\n${previewOutput}`);

  const pageResponse = await fetch(`${origin}${pagePath}`, { signal: AbortSignal.timeout(5000) });
  assert.equal(pageResponse.status, 200, `page route ${pagePath} returned HTTP ${pageResponse.status}`);
  assert.match(pageResponse.headers.get("content-type") ?? "", /text\/html/i);
  const page = await pageResponse.text();
  assert.match(page, /Adnan Berik/);
  assert.ok(page.includes(`href="${manifestPath}"`), `page does not link to ${manifestPath}`);
  assert.ok(page.includes("generated scheduler invariants"), "page omits the generated scheduler proof");
  assert.ok(page.includes("https://github.com/WaffleBits/deterministic-inference-scheduler/blob/main/tests/scheduler.rs"), "page omits the scheduler test source");
  assert.ok(page.includes("not production traces or performance evidence"), "page omits the synthetic evidence boundary");

  const manifestResponse = await fetch(`${origin}${manifestPath}`, { signal: AbortSignal.timeout(5000) });
  assert.equal(manifestResponse.status, 200, `manifest route ${manifestPath} returned HTTP ${manifestResponse.status}`);
  assert.match(manifestResponse.headers.get("content-type") ?? "", /application\/json/i);
  const manifest = await manifestResponse.json();
  assert.equal(manifest.schema_version, 1);
  assert.equal(manifest.kind, "public-portfolio-evidence");
  assert.equal(manifest.generated_from, "src/data/portfolio.ts");
  assert.equal(manifest.proof.length, 19);
  assert.equal(manifest.capabilities.length, 6);
  assert.equal(manifest.projects.length, 7);
  assert.ok(manifest.proof.some((item) => item.label === "remote-agent cancellation"));
  const schedulerPropertyProof = manifest.proof.find((item) => item.label === "generated scheduler invariants");
  assert.ok(schedulerPropertyProof, "manifest omits the generated scheduler proof");
  assert.equal(
    schedulerPropertyProof.href,
    "https://github.com/WaffleBits/deterministic-inference-scheduler/blob/main/tests/scheduler.rs",
  );
  assert.match(schedulerPropertyProof.statement, /128 bounded generated property cases/i);
  assert.match(schedulerPropertyProof.statement, /synthetic workloads/i);
  assert.match(schedulerPropertyProof.statement, /not production traces or performance evidence/i);

  console.log(
    `preview HTTP smoke passed: ${pagePath} and ${manifestPath} returned 200; ` +
      `${manifest.proof.length} proof / ${manifest.capabilities.length} capabilities / ${manifest.projects.length} projects`,
  );
};

let failure;
try {
  await Promise.race([smoke(), interrupted, spawnError]);
} catch (error) {
  failure = error;
} finally {
  for (const [signal, handler] of signalHandlers) process.removeListener(signal, handler);
  try {
    await stopPreview();
  } catch (error) {
    failure ??= error;
  }
}

if (failure) {
  if (receivedSignal) {
    console.error(`preview HTTP smoke interrupted by ${receivedSignal}`);
    process.exitCode = receivedSignal === "SIGINT" ? 130 : 143;
  } else {
    console.error(failure);
    if (previewOutput) console.error(previewOutput);
    process.exitCode = 1;
  }
}
