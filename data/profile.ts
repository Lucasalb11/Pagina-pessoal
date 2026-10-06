export const SITE_URL = "https://lucasalmeida.me";

export const PROFILE = {
  name: "Lucas de Almeida",
  headline: "Computer Engineering student focused on Blockchain & DeFi security",
  email: "lucasalb11@gmail.com",
  github: "https://github.com/Lucasalb11",
  linkedin: "https://www.linkedin.com/in/lucasalb11/",
  x: "https://x.com/11lucasa",
  cv: "/lucas-almeida-cv.pdf",
  location: "Recife, Brazil",
};

/** When NOW was last reviewed. Shown on the page so a stale list is visible as stale. */
export const NOW_UPDATED = "October 2026";

/** What I'm working through right now. Keep it honest and current. */
export const NOW: { label: string; text: string }[] = [
  {
    label: "Studying",
    text: "Computer Engineering at UFRPE, building a stronger foundation in programming, systems, and computer science.",
  },
  {
    label: "Security",
    text: "Going deeper into smart-contract security and cybersecurity fundamentals through Cyfrin Updraft and TryHackMe.",
  },
  { label: "Building", text: "Exploring DeFi and protocol engineering through Solana, Rust, Anchor, and Solidity." },
  {
    label: "Learning",
    text: "Revisiting earlier blockchain projects, understanding what went wrong, and documenting the lessons behind them.",
  },
];

export interface PathEntry {
  period: string;
  text: string;
}

export const PATH: PathEntry[] = [
  { period: "2026 —", text: "Computer Engineering, UFRPE." },
  { period: "2023 —", text: "Web3: hackathons, communities and small projects on Solana, Stellar and Ethereum." },
  {
    period: "2019 — 2025",
    text: "Real estate at Arcos: construction, development, sales and operations, coordinating teams of 100+ people.",
  },
  { period: "2019 — 2020", text: "Economics, UNICAP." },
];
