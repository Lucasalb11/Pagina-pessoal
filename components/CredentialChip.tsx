import type { Cert } from "@/data/certs.config";
import { solscan } from "@/lib/format";

export default function CredentialChip({ cert }: { cert: Cert }) {
  const href = cert.mintAddress ? solscan(cert.mintAddress) : cert.verifyUrl ?? "#";
  const isOnChain = cert.status === "MINTED" && !!cert.mintAddress;

  const short = shortLabel(cert);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={`${cert.name} — ${cert.issuer} (${cert.dateIssued})`}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-mono text-[10px] tracking-[0.14em] uppercase transition-colors ${
        isOnChain
          ? "border-onchain bg-onchain text-[color:var(--color-accent)] hover:border-[color:var(--color-accent)]"
          : "border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-muted-foreground)] hover:border-[color:var(--color-foreground)]/40"
      }`}
    >
      {isOnChain ? <span className="w-1 h-1 rounded-full bg-[color:var(--color-accent)]" aria-hidden /> : null}
      <span>{short}</span>
    </a>
  );
}

function shortLabel(cert: Cert): string {
  const map: Record<string, string> = {
    "ackee-sos-8":        "Ackee · School of Solana S8",
    "colosseum-frontier": "Colosseum · Frontier",
    "stellar-build":      "Stellar · Build",
    "nearx-rust-wasm":    "NearX · Rust + WASM",
    "nearx-solidity":     "NearX · Solidity 101",
    "defiverso":          "DeFiverso · Research",
    "ufrpe-compeng":      "UFRPE · Comp Eng (in progress)",
  };
  return map[cert.credentialId] ?? cert.name;
}
