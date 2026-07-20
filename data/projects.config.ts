export type Ecosystem = "Solana" | "Stellar" | "EVM";

export interface Ship {
  id: string;
  name: string;
  tagline: string;
  body: string;
  stack: string[];
  ecosystem: Ecosystem;
  status: "LIVE" | "BUILT" | "WIP";
  metric: string;
  metricLabel: string;
  github?: string;
  live?: string;
  /**
   * Optional preview image of the project's site. Drop a PNG/JPG into
   * src/assets/projects/ and reference it with an `@/assets/...` import,
   * or use an absolute URL. Falls back to a styled gradient placeholder.
   */
  image?: string;
  featured?: boolean;
}

export const SHIPS: Ship[] = [
  {
    id: "structa",
    name: "Structa.finance",
    tagline: "On-chain fundraising for Brazilian real estate, settled in USDC.",
    body:
      "A Brazilian developer raises capital against a real project; investors hold on-chain claims paid out in USDC from the underlying cash flows. Built at Solana Frontier; currently in pilot design. Code open on GitHub.",
    stack: ["Anchor", "USDC", "React", "RWA"],
    ecosystem: "Solana",
    status: "WIP",
    metric: "RWA",
    metricLabel: "Solana · Pilot",
    github: "https://github.com/Lucasalb11/Structa",
    featured: true,
  },
  {
    id: "kalefi",
    name: "KaleFi",
    tagline: "Collateralized lending on Stellar Soroban.",
    body:
      "Lend against on-chain collateral with transparent liquidations. Rust contracts on Soroban. Stellar Build Hackathon submission.",
    stack: ["Rust", "Soroban", "Stellar"],
    ecosystem: "Stellar",
    status: "BUILT",
    metric: "Soroban",
    metricLabel: "Stellar Build",
    github: "https://github.com/Lucasalb11/KaleFi",
  },
  {
    id: "aegis",
    name: "Aegis",
    tagline: "Yield aggregation across Solana DeFi.",
    body:
      "Aggregator routing one deposit across multiple Solana DeFi strategies. WIP — exploring how to surface per-strategy risk on-chain instead of off-chain dashboards.",
    stack: ["Anchor", "SPL", "TypeScript"],
    ecosystem: "Solana",
    status: "WIP",
    metric: "Multi-vault",
    metricLabel: "Aggregator",
    github: "https://github.com/Lucasalb11/Aegis",
  },
  {
    id: "blinkpay",
    name: "Blinkpay",
    tagline: "Solana Blinks for real merchant payments.",
    body:
      "Single-action payment links that settle in USDC on Solana. Built for the Brazilian SMB layer that runs on Pix today.",
    stack: ["Solana Blinks", "USDC", "Next.js"],
    ecosystem: "Solana",
    status: "WIP",
    metric: "Blinks",
    metricLabel: "Payments",
    github: "https://github.com/Lucasalb11/Blinkpay",
  },
];

export interface ChainMeta {
  slug: string;
  id: string;
  name: string;
  focus: string;
  ecosystem: Ecosystem;
  blurb: string;
}

export const CHAINS: ChainMeta[] = [
  {
    slug: "solana",
    id: "SOL",
    name: "Solana",
    focus: "Programs · Anchor · MPL Core",
    ecosystem: "Solana",
    blurb:
      "Anchor programs, MPL Core mints, USDC settlement. Where most of my on-chain work lives today — School of Solana Season 8, Solana Frontier hackathon, devnet deployments.",
  },
  {
    slug: "stellar",
    id: "XLM",
    name: "Stellar",
    focus: "Soroban · Contracts",
    ecosystem: "Stellar",
    blurb:
      "Soroban Rust contracts and Stellar payments. Build hackathon submissions and lending primitives targeting the global remittance corridor.",
  },
  {
    slug: "ethereum",
    id: "ETH",
    name: "Ethereum",
    focus: "Solidity · Foundry",
    ecosystem: "EVM",
    blurb:
      "Solidity fundamentals, Solidity 101 cert, Foundry testing. EVM is where I prototype primitives before porting them to where they ship.",
  },
];

export const getChainBySlug = (slug: string) =>
  CHAINS.find((c) => c.slug === slug.toLowerCase());

export const getProjectsForChain = (chain: ChainMeta) =>
  SHIPS.filter((s) => s.ecosystem === chain.ecosystem);
