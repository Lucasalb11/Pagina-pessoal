export type Chain = "Solana" | "Stellar" | "Multichain";

/**
 * Learning projects from hackathons and self-study. None of them are running
 * products; the wording here should never suggest otherwise.
 */
export interface Project {
  id: string;
  name: string;
  /** One plain sentence: what I tried to build. */
  summary: string;
  chain: Chain;
  /** Where it came from: hackathon name or "self-study". */
  context: string;
  year: number;
  stack: string[];
  /** GitHub `owner/repo`. Used to resolve a demo link at runtime. */
  repo: string;
  /** Static fallback demo URL when neither Vercel nor GitHub report one. */
  live?: string;
  /** Screenshot in /public/projects, shown on the notes page. */
  image?: string;
  onchain?: { label: string; href: string };
  /** Where the demo runs, when it isn't the chain's test network. */
  network?: string;
  role?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "paga-no-arroba",
    name: "Paga no @",
    summary: "Sending crypto to a social handle instead of a wallet address, held in escrow until the owner claims it.",
    chain: "Solana",
    context: "Colosseum Frontier hackathon",
    year: 2026,
    stack: ["Anchor", "Privy", "Next.js"],
    repo: "Lucasalb11/pay-on-handle",
    image: "/projects/paganoarroba.webp",
    onchain: {
      label: "Vault program on devnet",
      href: "https://explorer.solana.com/address/EgS854XfeyTkuTKpYzDD3h5kiKMt4h3J37hGaBfuDN4H?cluster=devnet",
    },
  },
  {
    id: "structa",
    name: "Structa",
    summary: "Tokenized funding for real-estate developments, with payouts tied to the stages of a project.",
    chain: "Solana",
    context: "Colosseum Frontier hackathon, with Eduardo Manczenko",
    year: 2026,
    stack: ["Anchor", "SPL Token", "USDC"],
    repo: "Lucasalb11/Structa",
    live: "https://structa-frontend.vercel.app",
    image: "/projects/structa.webp",
    onchain: {
      label: "Program on devnet",
      href: "https://explorer.solana.com/address/2vEvLqNyMKPx7B6nz1yaKJgNBMV7DeXv17dTYR8T5SSf?cluster=devnet",
    },
    role: "Co-founder, product and protocol design",
  },
  {
    id: "nexusfi",
    name: "NexusFi",
    summary: "Exploring Chainlink's Runtime Environment for risk monitoring and cross-chain financial integrations.",
    chain: "Multichain",
    context: "Chainlink Convergence hackathon",
    year: 2026,
    stack: ["Chainlink CRE", "Soroban", "Solidity"],
    repo: "Lucasalb11/NexusFi",
    live: "https://nexusfi-six.vercel.app",
    image: "/projects/nexusfi.webp",
  },
  {
    id: "stellar-pulse",
    name: "Stellar Pulse",
    summary: "A dashboard for the Stellar economy where every number shows where it came from.",
    chain: "Stellar",
    context: "Self-study",
    year: 2026,
    stack: ["Next.js", "Zod", "Horizon"],
    repo: "Lucasalb11/Stellar-pulse",
    network: "reads Stellar mainnet, read-only",
    image: "/projects/stellarpulse.webp",
  },
  {
    id: "aegis",
    name: "Aegis",
    summary: "Spending limits for an AI agent's wallet: small payments go through, large ones wait for a human.",
    chain: "Solana",
    context: "Solana Student Hackathon",
    year: 2025,
    stack: ["Rust", "Anchor"],
    repo: "Lucasalb11/Aegis",
    live: "https://aegis-indol.vercel.app",
  },
  {
    id: "blinkpay",
    name: "Blinkpay",
    summary: "Payment links on Solana: create a request, share it, get paid in SOL or USDC.",
    chain: "Solana",
    context: "Self-study",
    year: 2025,
    stack: ["Anchor", "Next.js"],
    repo: "Lucasalb11/Blinkpay",
    live: "https://blinkpay-alpha.vercel.app",
  },
  {
    id: "foxfi",
    name: "FoxFi",
    summary: "An intent-based swap where solvers compete to fill a user's order.",
    chain: "Solana",
    context: "Self-study",
    year: 2025,
    stack: ["Rust", "Anchor"],
    repo: "Lucasalb11/FoxFi",
    live: "https://foxfi.vercel.app",
  },
  {
    id: "kalefi",
    name: "KaleFi",
    summary: "Borrowing USDC against KALE collateral on Stellar.",
    chain: "Stellar",
    context: "Stellar Build hackathon",
    year: 2025,
    stack: ["Rust", "Soroban"],
    repo: "Lucasalb11/KaleFi",
    live: "https://kalefi.vercel.app",
  },
];

export const getProject = (id: string) => PROJECTS.find((p) => p.id === id);
