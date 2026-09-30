import type { APIRoute } from "astro";
import { capability, caseFiles, proof } from "../data/portfolio";

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const topics = (value: string) =>
  value
    .split("/")
    .map((item) => item.trim())
    .filter(Boolean);

const roles = (value: string) =>
  value
    .split(/\s+/)
    .map((item) => item.trim())
    .filter(Boolean);

const manifest = {
  schema_version: 1,
  kind: "public-portfolio-evidence",
  generated_from: "src/data/portfolio.ts",
  scope: "Public project, work-history, and on-page evidence links",
  boundaries: [
    "Entries link to public artifacts or named sections of this profile; they do not assert access to private systems.",
    "Synthetic fixtures, projections, and controlled local measurements remain labelled in their source evidence.",
    "Production-scale operation, enterprise adoption, and production SLOs are not implied where the linked artifact does not demonstrate them.",
  ],
  proof: proof.map((item) => ({
    id: `proof-${slug(item.label)}`,
    kind: item.kind,
    label: item.label,
    statement: item.plain,
    href: item.href,
  })),
  capabilities: capability.map((item) => ({
    code: item.code,
    title: item.title,
    statement: item.plain,
    topics: topics(item.items),
    href: item.href,
    link_label: item.link,
    link_scope: item.external ? "public-artifact" : "profile-section",
  })),
  projects: caseFiles.map((item) => ({
    id: item.id,
    roles: roles(item.roles),
    title: item.title,
    summary: item.plain,
    tags: item.tags,
    problem: item.problem,
    system: item.system,
    evidence: item.evidence,
    impact: item.impact,
    href: item.url,
    ...(item.demo ? { demo: item.demo } : {}),
    ...(item.chart ? { chart: item.chart } : {}),
  })),
};

const body = `${JSON.stringify(manifest, null, 2)}\n`;

export const GET: APIRoute = () =>
  new Response(body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
