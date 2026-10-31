/* =============================================================
   Adnan Berik // content model  (single source of truth)
   Real portfolio content. No invented claims.
   Writing rule: every visible line leads with plain language a
   non-specialist understands; deep technical detail lives behind
   the inspect expanders.
   ============================================================= */

export const identity = {
  handle: "adnanberik",
  host: "sentinel",
  name: "Adnan Berik",
  clearance: "TS/SCI",
  location: "Hampton, VA",
  open: "New York, NY / Washington, D.C.",
  role: "Platform security and AI infrastructure",
  tagline: "I protect and run the systems that serve AI models.",
  summary:
    "By day I do cyber defense for the US Air Force (TS/SCI clearance). On my own time I build the software layer that keeps AI model serving secure, measured, and reliable.",
  plain:
    "When a company runs AI models, someone has to control who can use them, watch speed and cost, catch failures before users see them, and prove afterward what happened. That is the layer I build.",
  links: {
    github: "https://github.com/WaffleBits",
    linkedin: "https://www.linkedin.com/in/adnanberik/",
    email: "adnanberik@hotmail.com",
  },
  domains: [
    "AI infrastructure",
    "platform security",
    "inference serving",
    "GPU performance",
    "distributed systems",
    "observability",
    "cyber defense",
  ],
};

export type ServiceEntry = {
  span: string;
  org: string;
  unit: string;
  role: string;
  lines: string[];
};

export const serviceRecord: ServiceEntry[] = [
  {
    span: "2023 / PRESENT", org: "United States Air Force",
    unit: "ACC :: Langley AFB, VA",
    role: "Mission Assurance Technician (Cyber Defense Operations, 1D751B)",
    lines: [
      "Help run 24/7 cyber defense for 26 wings across 15 bases, roughly 27,000 users.",
      "Built a tracking tool that fused 216,000 data points into 4 live dashboards, cutting threat resolution from 5 days to 2.",
      "Helped resolve a NORAD network outage: found a failed $700K circuit and coordinated the enterprise-wide fix.",
      "Led 11 Airmen through 18 cyber tasking orders, hardening 30,000 systems.",
      "Named HQ ACC/A6 Airman of the Year, 2025.",
    ],
  },
];

export const awards = [
  "HQ ACC/A6 Airman of the Year, 2025",
  "HQ ACC/A6 Team of the Year, 2025",
  "HQ ACC/A6 Warfighter Communication Award, 2025",
  "4x Squadron Team of the Quarter",
];

export const certifications = [
  "TS/SCI Security Clearance",
  "CompTIA Security+ :: CompTIA A+",
  "AWS Technical Essentials",
];

export const education = [
  "Western Governors University :: B.S. Cybersecurity & Information Assurance (in progress)",
  "Northern Virginia Community College :: Computer Science coursework (60+ credits)",
];
