export const SITE_URL = "https://lucasalmeida.me";

export const PROFILE = {
  name: "Lucas de Almeida",
  email: "lucasalb11@gmail.com",
  github: "https://github.com/Lucasalb11",
  linkedin: "https://www.linkedin.com/in/lucasalb11/",
  x: "https://x.com/11lucasa",
  cv: "/lucas-almeida-cv.pdf",
  location: "Recife, Brazil",
  timezone: "UTC−3",
};

export interface TimelineEntry {
  period: string;
  title: string;
  org?: string;
  body?: string;
}

export const TIMELINE: TimelineEntry[] = [
  {
    period: "2023 — now",
    title: "Independent protocol engineer",
    body:
      "Anchor programs on Solana, Soroban contracts on Stellar, Solidity with Foundry. Eight protocols built end to end, each with a written threat model. Studying smart-contract security through Cyfrin Updraft.",
  },
  {
    period: "2019 — 2025",
    title: "Co-founder & director",
    org: "Arcos Construtora",
    body: "Ran a construction company in Pernambuco: 12 concurrent projects, 100+ people, financing through Caixa Econômica Federal.",
  },
];

export const EDUCATION: TimelineEntry[] = [
  { period: "2026 — now", title: "BSc Computer Engineering", org: "UFRPE" },
  { period: "2024 — 2025", title: "Economics", org: "UFPE" },
];

export interface Finding {
  project: string;
  projectId: string;
  severity: "Critical" | "High" | "Medium";
  title: string;
  status: "Open" | "Fixing";
}

/**
 * Issues found reviewing my own programs. Each one is written up in the
 * project's deep dive and tracked in ROADMAP.md.
 */
export const FINDINGS: Finding[] = [
  {
    project: "Paga no @",
    projectId: "paga-no-arroba",
    severity: "Critical",
    title: "Registry marks a handle verified on any non-empty proof, so whoever registers an unclaimed handle first can claim its escrow.",
    status: "Open",
  },
  {
    project: "Structa",
    projectId: "structa",
    severity: "High",
    title: "A single authority key can withdraw the whole principal vault at any time; no multisig or timelock yet.",
    status: "Open",
  },
  {
    project: "FoxFi",
    projectId: "foxfi",
    severity: "High",
    title: "Settlement pays the user the minimum output instead of the winning quote, and never releases the locked input to the solver.",
    status: "Open",
  },
  {
    project: "KaleFi",
    projectId: "kalefi",
    severity: "High",
    title: "Collateral is priced from an admin-set mock, and there is no liquidation entrypoint.",
    status: "Open",
  },
  {
    project: "Structa",
    projectId: "structa",
    severity: "Medium",
    title: "After a partial principal withdrawal, refunds are first come, first served: late holders can find the burn vault empty.",
    status: "Open",
  },
  {
    project: "Blinkpay",
    projectId: "blinkpay",
    severity: "Medium",
    title: "Creation timestamp is a caller-supplied argument used in PDA seeds, not read from the Clock sysvar.",
    status: "Open",
  },
];
