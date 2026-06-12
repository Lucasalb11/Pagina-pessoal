/**
 * Mints the credential collection + soulbound assets on Solana devnet.
 *
 * Pipeline:
 *  1. Load deployer keypair from DEPLOYER_SECRET (base58, .env.local).
 *  2. Generate SVG artwork + JSON metadata for the collection and each cert.
 *     - Writes files into ./public/metadata/{,images/}.
 *  3. Create an MPL Core Collection with PermanentFreezeDelegate (soulbound).
 *  4. Create one Core Asset per cert inside the collection, owned by deployer.
 *  5. Write scripts/.mint-output.json with addresses for downstream config patching.
 *
 * Usage: npx tsx scripts/mint-credentials.ts
 */

import { config as loadEnv } from "dotenv";
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import bs58 from "bs58";
import {
  createSignerFromKeypair,
  generateSigner,
  publicKey as pk,
  signerIdentity,
  sol,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createCollection,
  create,
  mplCore,
  fetchCollection,
} from "@metaplex-foundation/mpl-core";

import { renderCertCardSvg, renderCollectionSvg } from "./lib/certCardSvg.js";
import { CERTS } from "../src/data/certs.config.js";

// -----------------------------------------------------------------------------
// Setup
// -----------------------------------------------------------------------------
const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
loadEnv({ path: join(repoRoot, ".env.local") });

const RPC = process.env.SOLANA_DEVNET_RPC ?? process.env.VITE_HELIUS_RPC;
const DEPLOYER_SECRET = process.env.DEPLOYER_SECRET;
const METADATA_BASE = process.env.METADATA_BASE_URL ?? "https://lucasalmeida.me/metadata";

if (!RPC) throw new Error("Missing SOLANA_DEVNET_RPC / VITE_HELIUS_RPC in .env.local");
if (!DEPLOYER_SECRET) throw new Error("Missing DEPLOYER_SECRET in .env.local");

const METADATA_DIR = join(repoRoot, "public", "metadata");
const IMAGES_DIR   = join(METADATA_DIR, "images");
mkdirSync(IMAGES_DIR, { recursive: true });

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------
const log = (...args: unknown[]) => console.log("›", ...args);

function decodeSecret(b58: string): Uint8Array {
  const bytes = bs58.decode(b58);
  if (bytes.length !== 64) throw new Error(`Expected 64-byte secret key, got ${bytes.length}`);
  return new Uint8Array(bytes);
}

function writeMetadata(filename: string, payload: object) {
  writeFileSync(join(METADATA_DIR, filename), JSON.stringify(payload, null, 2) + "\n");
}

function writeImage(filename: string, svg: string) {
  writeFileSync(join(IMAGES_DIR, filename), svg);
}

// -----------------------------------------------------------------------------
// Init Umi
// -----------------------------------------------------------------------------
const umi = createUmi(RPC).use(mplCore());
const secret = decodeSecret(DEPLOYER_SECRET);
const keypair = umi.eddsa.createKeypairFromSecretKey(secret);
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(signer));

const expectedPubkey = process.env.DEPLOYER_PUBKEY;
if (expectedPubkey && expectedPubkey !== keypair.publicKey.toString()) {
  throw new Error(
    `Pubkey mismatch — expected ${expectedPubkey}, decoded ${keypair.publicKey.toString()}`,
  );
}
log("Deployer:", keypair.publicKey.toString());

// Sanity balance check
const balance = await umi.rpc.getBalance(keypair.publicKey);
const balanceSol = Number(balance.basisPoints) / 1e9;
log(`Balance: ${balanceSol.toFixed(4)} SOL (devnet)`);
if (balance.basisPoints < sol(0.1).basisPoints) {
  throw new Error("Balance below 0.1 SOL — airdrop more devnet SOL before continuing.");
}

// -----------------------------------------------------------------------------
// 1. Generate & write metadata for collection + each cert
// -----------------------------------------------------------------------------
const mintable = CERTS.filter((c) => c.status === "READY_TO_MINT");
log(`Preparing ${mintable.length} mintable credentials (skipping PENDING/MINTED).`);

// Collection metadata
const collectionSvg = renderCollectionSvg({ totalCount: mintable.length });
writeImage("collection.svg", collectionSvg);
writeMetadata("collection.json", {
  name: "Lucas de Almeida — Credentials",
  symbol: "LDA-CRED",
  description:
    "Soulbound on-chain credentials for Lucas de Almeida. Each asset is a verifiable proof of program completion, hackathon participation, or recognized issuer attestation. Non-transferable by design.",
  image: `${METADATA_BASE}/images/collection.svg`,
  external_url: "https://lucasalmeida.me/#credentials",
  properties: {
    category: "image",
    files: [{ uri: `${METADATA_BASE}/images/collection.svg`, type: "image/svg+xml" }],
  },
});

// Per-cert metadata
const total = mintable.length;
mintable.forEach((cert, i) => {
  const svg = renderCertCardSvg({
    credentialId: cert.credentialId,
    name:         cert.name,
    program:      cert.program,
    issuer:       cert.issuer,
    dateIssued:   cert.dateIssued,
    ecosystem:    cert.ecosystem ?? "Solana",
    description:  cert.description,
    attributes:   cert.attributes ?? [],
    index:        i + 1,
    total,
  });
  writeImage(`${cert.credentialId}.svg`, svg);

  writeMetadata(`${cert.credentialId}.json`, {
    name: cert.name,
    symbol: "LDA-CRED",
    description: cert.description,
    image: `${METADATA_BASE}/images/${cert.credentialId}.svg`,
    external_url: cert.verifyUrl ?? "https://lucasalmeida.me/#credentials",
    attributes: [
      { trait_type: "Program",   value: cert.program },
      { trait_type: "Issuer",    value: cert.issuer },
      { trait_type: "Date",      value: cert.dateIssued },
      { trait_type: "Ecosystem", value: cert.ecosystem ?? "Solana" },
      { trait_type: "Attest",    value: cert.attest === "issuer" ? "Issuer-attested" : "Self-attested" },
      { trait_type: "Soulbound", value: "true" },
      ...(cert.attributes ?? []),
    ],
    properties: {
      category: "image",
      files: [{ uri: `${METADATA_BASE}/images/${cert.credentialId}.svg`, type: "image/svg+xml" }],
      creators: [{ address: keypair.publicKey.toString(), share: 100 }],
    },
  });
});
log(`Wrote ${mintable.length} cert metadata files + collection metadata to public/metadata/`);

// -----------------------------------------------------------------------------
// 2. Idempotent state: skip steps already done
// -----------------------------------------------------------------------------
const outputPath = join(repoRoot, "scripts", ".mint-output.json");
type Output = {
  cluster: "devnet";
  collectionAddress?: string;
  collectionUri: string;
  assets: Record<string, { mintAddress: string; uri: string }>;
};
const prior: Partial<Output> = existsSync(outputPath)
  ? JSON.parse(readFileSync(outputPath, "utf8"))
  : {};
const output: Output = {
  cluster: "devnet",
  collectionAddress: prior.collectionAddress,
  collectionUri: `${METADATA_BASE}/collection.json`,
  assets: prior.assets ?? {},
};

// -----------------------------------------------------------------------------
// 3. Create collection (with PermanentFreezeDelegate → soulbound)
// -----------------------------------------------------------------------------
let collectionAddress = output.collectionAddress;

if (!collectionAddress) {
  const collectionSigner = generateSigner(umi);
  log("Creating collection mint:", collectionSigner.publicKey.toString());
  await createCollection(umi, {
    collection: collectionSigner,
    name: "Lucas de Almeida — Credentials",
    uri:  `${METADATA_BASE}/collection.json`,
    plugins: [
      { type: "PermanentFreezeDelegate", frozen: true },
    ],
  }).sendAndConfirm(umi, { confirm: { commitment: "confirmed" } });

  collectionAddress = collectionSigner.publicKey.toString();
  output.collectionAddress = collectionAddress;
  writeFileSync(outputPath, JSON.stringify(output, null, 2));
  log("Collection created:", collectionAddress);
} else {
  log("Collection already exists:", collectionAddress);
}

// Verify collection is fetchable (retry — RPC may lag behind confirmation)
async function fetchCollectionWithRetry(addr: string, attempts = 8, delayMs = 1500) {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fetchCollection(umi, pk(addr));
    } catch (err) {
      lastErr = err;
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw lastErr;
}
const collection = await fetchCollectionWithRetry(collectionAddress);
log("Collection name on-chain:", collection.name);

// -----------------------------------------------------------------------------
// 4. Mint each cert as a Core Asset in the collection
// -----------------------------------------------------------------------------
for (const cert of mintable) {
  if (output.assets[cert.credentialId]) {
    log(`Skip ${cert.credentialId} (already minted: ${output.assets[cert.credentialId].mintAddress})`);
    continue;
  }
  const assetSigner = generateSigner(umi);
  log(`Mint ${cert.credentialId} → ${assetSigner.publicKey.toString()}`);
  await create(umi, {
    asset: assetSigner,
    collection,
    name: cert.name,
    uri:  `${METADATA_BASE}/${cert.credentialId}.json`,
  }).sendAndConfirm(umi, { confirm: { commitment: "confirmed" } });

  output.assets[cert.credentialId] = {
    mintAddress: assetSigner.publicKey.toString(),
    uri:         `${METADATA_BASE}/${cert.credentialId}.json`,
  };
  writeFileSync(outputPath, JSON.stringify(output, null, 2));
}

log("");
log("=== DONE ===");
log("Cluster:    ", output.cluster);
log("Collection: ", output.collectionAddress);
log("Assets:     ", Object.keys(output.assets).length);
log("Output:     ", outputPath);
log("");
log("Next steps:");
log(" 1. Set VITE_CERT_COLLECTION in .env.local to:", output.collectionAddress);
log(" 2. Update src/data/certs.config.ts with mintAddress + status: 'MINTED' for each cert.");
