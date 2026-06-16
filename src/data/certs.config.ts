import { Cpu, Code2, Award, BookOpen, Trophy, GraduationCap, type LucideIcon } from "lucide-react";

export type CertStatus = "MINTED" | "READY_TO_MINT" | "PENDING";
export type CertAttest = "issuer" | "self";

export interface Cert {
  credentialId: string;
  name: string;
  program: string;
  issuer: string;
  dateIssued: string;
  ecosystem?: "Solana" | "Stellar" | "EVM" | "Academic";
  icon: LucideIcon;
  description: string;
  verifyUrl?: string;
  mintAddress?: string;
  status: CertStatus;
  attest: CertAttest;
  attributes?: { trait_type: string; value: string }[];
  featured?: boolean;
}

export const CERTS: Cert[] = [
  {
    credentialId: "ackee-sos-8",
    name: "School of Solana — Season 8",
    program: "Advanced Solana Development",
    issuer: "Ackee Blockchain",
    dateIssued: "2024-12",
    ecosystem: "Solana",
    icon: Cpu,
    description: "Production-grade Solana programs with Rust + Anchor. PDAs, CPIs, token programs, security patterns.",
    verifyUrl: "https://ackee.xyz/school-of-solana",
    mintAddress: "3JnhfWQB7xpYk3Jf4syN5B7VtiWM7oepL49gqDee7vqv",
    status: "MINTED",
    attest: "issuer",
    attributes: [
      { trait_type: "Issuer",  value: "Ackee Blockchain" },
      { trait_type: "Program", value: "School of Solana" },
      { trait_type: "Season",  value: "8" },
      { trait_type: "Stack",   value: "Rust · Anchor · SPL" },
    ],
    featured: true,
  },
  {
    credentialId: "colosseum-frontier",
    name: "Solana Frontier — Colosseum",
    program: "Hackathon",
    issuer: "Colosseum",
    dateIssued: "2025-Q2",
    ecosystem: "Solana",
    icon: Trophy,
    description: "Built Structa.finance: on-chain fundraising for Brazilian real estate, paid in USDC.",
    verifyUrl: "https://colosseum.com/frontier",
    mintAddress: "CqNveXmv4JJzgzY59G6pE3W4NRLKSyyvz1mBo9sh9e1y",
    status: "MINTED",
    attest: "issuer",
    attributes: [
      { trait_type: "Event",   value: "Solana Frontier" },
      { trait_type: "Project", value: "Structa.finance" },
      { trait_type: "Stack",   value: "Anchor · USDC · React" },
    ],
  },
  {
    credentialId: "stellar-build",
    name: "Stellar Build Hackathon",
    program: "Soroban Contracts",
    issuer: "Stellar Development Foundation",
    dateIssued: "2025-08",
    ecosystem: "Stellar",
    icon: Trophy,
    description: "Built KaleFi — collateralized lending on Stellar. Soroban contracts in Rust.",
    verifyUrl: "https://stellar.org",
    mintAddress: "Fpj1KeZJFDp6WSdkGykTxFvS3gsdhhmxh6HWBAt4qAdd",
    status: "MINTED",
    attest: "issuer",
    attributes: [
      { trait_type: "Event",   value: "Stellar Build" },
      { trait_type: "Project", value: "KaleFi" },
      { trait_type: "Stack",   value: "Rust · Soroban" },
    ],
  },
  {
    credentialId: "nearx-rust-wasm",
    name: "NearX — Rust & WebAssembly",
    program: "Rust Programming",
    issuer: "NearX Academy",
    dateIssued: "2024",
    ecosystem: "Solana",
    icon: Code2,
    description: "Hands-on Rust fundamentals for blockchain tooling and WebAssembly targets. Applied to Soroban and Solana.",
    verifyUrl: "https://nearx.com.br",
    mintAddress: "5HxwmTPxGcrDCVEd2qUbJ6hNC4tgNiMjkFeEPV4wFrdK",
    status: "MINTED",
    attest: "issuer",
    attributes: [
      { trait_type: "Issuer",  value: "NearX" },
      { trait_type: "Program", value: "Rust + WASM" },
    ],
  },
  {
    credentialId: "nearx-solidity",
    name: "NearX — Solidity 101",
    program: "EVM Smart Contracts",
    issuer: "NearX Academy",
    dateIssued: "2024",
    ecosystem: "EVM",
    icon: Award,
    description: "Solidity and EVM development. Security patterns, OpenZeppelin standards, Foundry tooling.",
    verifyUrl: "https://nearx.com.br",
    mintAddress: "3n16Avjhw1KNPoteg3J7PhauanHCrbhwEALZd4fEVn2h",
    status: "MINTED",
    attest: "issuer",
    attributes: [
      { trait_type: "Issuer",  value: "NearX" },
      { trait_type: "Program", value: "Solidity 101" },
    ],
  },
  {
    credentialId: "defiverso",
    name: "DeFiverso",
    program: "DeFi Research",
    issuer: "DeFiverso",
    dateIssued: "2024",
    ecosystem: "EVM",
    icon: BookOpen,
    description: "DeFi protocol mechanics, whitepaper analysis, governance forums, on-chain data interpretation.",
    verifyUrl: "https://defiverso.com",
    mintAddress: "CUsh5mBxGfFM94LjWL9YicAff9h13KCWMLUWBwwkSQ5",
    status: "MINTED",
    attest: "issuer",
    attributes: [
      { trait_type: "Issuer", value: "DeFiverso" },
      { trait_type: "Focus",  value: "Protocol research" },
    ],
  },
  {
    credentialId: "ufrpe-compeng",
    name: "BSc Computer Engineering",
    program: "Academic — In Progress",
    issuer: "UFRPE",
    dateIssued: "2026-02",
    ecosystem: "Academic",
    icon: GraduationCap,
    description: "Bachelor's in Computer Engineering at Universidade Federal Rural de Pernambuco — systems, algorithms, computer architecture, applied math.",
    status: "PENDING",
    attest: "issuer",
    attributes: [
      { trait_type: "Institution", value: "UFRPE" },
      { trait_type: "Field",       value: "Computer Engineering" },
      { trait_type: "Status",      value: "In Progress" },
    ],
  },
];

export const PROGRAM_STATS = {
  totalCount: CERTS.length,
  mintedCount: CERTS.filter((c) => c.status === "MINTED").length,
  readyCount: CERTS.filter((c) => c.status === "READY_TO_MINT").length,
};
