export type Chain = "Solana" | "Stellar" | "Multichain";

export interface Project {
  id: string;
  name: string;
  /** One sentence: what it does, for whom. */
  summary: string;
  chain: Chain;
  /** Where/when it was built. Submissions only — no placements claimed. */
  context: string;
  year: number;
  stack: string[];
  /** GitHub `owner/repo`. Used to resolve the live URL at runtime. */
  repo: string;
  /** Static fallback when neither Vercel nor GitHub report a live URL. */
  live?: string;
  /** Screenshot in /public/projects. Projects without one get a generated cover. */
  image?: string;
  /** Short flow drawn on the generated cover, left to right. */
  flow: string[];
  /** Explorer link for the deployed program / contract, when there is one. */
  onchain?: { label: string; href: string };
  role?: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "aegis",
    name: "Aegis",
    summary:
      "Spending guardrails for AI agents trading on Solana: per-vault daily limits, human approval above a threshold, and a slippage-protected AMM.",
    chain: "Solana",
    context: "Solana Student Hackathon, Fall 2025",
    year: 2025,
    stack: ["Rust", "Anchor", "Pyth", "Next.js"],
    repo: "Lucasalb11/Aegis",
    flow: ["agent", "policy vault", "approval", "swap"],
    featured: true,
  },
  {
    id: "nexusfi",
    name: "NexusFi",
    summary:
      "Credit lines for people without a credit history: Chainlink CRE workflows score on-chain activity, attest reserves, and gate eligibility without putting personal data on-chain.",
    chain: "Multichain",
    context: "Chainlink Convergence Hackathon, 2026",
    year: 2026,
    stack: ["Soroban", "Solidity", "Foundry", "Chainlink CRE"],
    repo: "Lucasalb11/NexusFi",
    image: "/projects/nexusfi.webp",
    flow: ["CRE DON", "attestation", "credit line"],
    onchain: {
      label: "Credit line contract · Stellar testnet",
      href: "https://stellar.expert/explorer/testnet/contract/CAOOW56V4KKK2HNTTXOCL7VXJU7GEFOJLUWCRUYMUNOSHX74TZH7RFJN",
    },
    featured: true,
  },
  {
    id: "structa",
    name: "Structa",
    summary:
      "Fundraising for Brazilian real-estate developments in USDC: investors buy non-transferable cotas, earn pro-rata yield as units sell, and can be refunded if a project stops.",
    chain: "Solana",
    context: "Colosseum Frontier, 2026",
    year: 2026,
    stack: ["Anchor", "SPL Token", "USDC", "NestJS"],
    repo: "Lucasalb11/Structa",
    live: "https://structa-frontend.vercel.app",
    image: "/projects/structa.webp",
    flow: ["investor", "cota mint", "3 vaults", "yield"],
    onchain: {
      label: "Program · Solana devnet",
      href: "https://explorer.solana.com/address/2vEvLqNyMKPx7B6nz1yaKJgNBMV7DeXv17dTYR8T5SSf?cluster=devnet",
    },
    role: "Co-founder · protocol design",
    featured: true,
  },
  {
    id: "paga-no-arroba",
    name: "Paga no @",
    summary:
      "Send SOL or USDC to an Instagram, X or WhatsApp handle. Funds wait in a 7-day escrow until the owner of the handle claims them, or go back to the sender.",
    chain: "Solana",
    context: "Colosseum Frontier · Superteam Brazil, 2026",
    year: 2026,
    stack: ["Anchor", "Privy", "Next.js", "TypeScript SDK"],
    repo: "Lucasalb11/pay-on-handle",
    image: "/projects/paganoarroba.webp",
    flow: ["sender", "escrow PDA", "handle proof", "claim"],
    onchain: {
      label: "Vault program · Solana devnet",
      href: "https://explorer.solana.com/address/EgS854XfeyTkuTKpYzDD3h5kiKMt4h3J37hGaBfuDN4H?cluster=devnet",
    },
    featured: true,
  },
  {
    id: "stellar-pulse",
    name: "Stellar Pulse",
    summary:
      "One dashboard for the Stellar economy — TVL, stablecoins, RWAs, Soroban activity — where every number carries its source or is marked illustrative.",
    chain: "Stellar",
    context: "Independent, 2026",
    year: 2026,
    stack: ["Next.js 16", "Zod", "Reflector", "Horizon"],
    repo: "Lucasalb11/Stellar-pulse",
    image: "/projects/stellarpulse.webp",
    flow: ["upstream", "adapter", "fallback", "cache"],
  },
  {
    id: "foxfi",
    name: "FoxFi",
    summary:
      "Intent-based swaps on Solana: users lock what they want to trade, staked solvers compete to fill it, and settlement enforces the user's minimum.",
    chain: "Solana",
    context: "Independent, 2025",
    year: 2025,
    stack: ["Rust", "Anchor", "TypeScript"],
    repo: "Lucasalb11/FoxFi",
    flow: ["intent", "solvers", "settlement"],
  },
  {
    id: "kalefi",
    name: "KaleFi",
    summary:
      "Borrow USDC against KALE collateral on Stellar, with a health factor checked on every borrow and withdrawal.",
    chain: "Stellar",
    context: "Stellar Build Hackathon, 2025",
    year: 2025,
    stack: ["Rust", "Soroban", "Freighter"],
    repo: "Lucasalb11/KaleFi",
    flow: ["collateral", "health factor", "borrow"],
  },
  {
    id: "blinkpay",
    name: "Blinkpay",
    summary:
      "Payment requests and scheduled charges on Solana in SOL or PYUSD, executable by anyone once they come due.",
    chain: "Solana",
    context: "Independent, 2025",
    year: 2025,
    stack: ["Anchor", "PYUSD", "Next.js"],
    repo: "Lucasalb11/Blinkpay",
    flow: ["request", "schedule", "execute"],
  },
];

export const getProject = (id: string) => PROJECTS.find((p) => p.id === id);
