# Lucas de Almeida — Portfolio

Editorial-first personal site for a blockchain engineer. One column, warm paper theme,
live on-chain data from Solana devnet, MDX for essays and project deep-dives.

**Live:** [lucasalmeida.me](https://lucasalmeida.me)

## Stack

| Layer         | Tools                                                      |
| ------------- | ---------------------------------------------------------- |
| Framework     | Next.js 16 (App Router) · React 19 · TypeScript            |
| Styling       | Tailwind CSS v4 (CSS-first tokens) · `@theme` block        |
| Typography    | Instrument Serif · Space Grotesk · Space Mono (next/font)  |
| Content       | MDX (next-mdx-remote-client) · Shiki for code highlight    |
| i18n          | URL segments `/en` and `/pt` · proxy.ts detects language   |
| On-chain      | Solana devnet · MPL Core · Helius RPC                      |
| SEO           | Dynamic sitemap · robots · JSON-LD (Person / WebSite / BlogPosting) · OG image via `next/og` |

## Routes

```
/                            → 307 → /{lang}   (proxy.ts)
/en, /pt                     home
/{lang}/work                 selected work list
/{lang}/work/[slug]          MDX deep-dive per project (Structa etc.)
/{lang}/writing              essay index
/{lang}/writing/[slug]       MDX essay
/{lang}/chain/[slug]         page per ecosystem (Solana / Stellar / Ethereum)
/{lang}/credentials          full soulbound NFT list w/ Solscan links
/api/onchain/latest          Helius-backed live wallet / slot / latest tx
/sitemap.xml, /robots.txt    dynamic
/opengraph-image             1200×630 PNG via next/og
```

## Content

- `content/writing/*.{en,pt}.mdx` — essays. Frontmatter: `title`, `date`, `summary`, `tags`.
- `content/work/*.{en,pt}.mdx` — project deep-dives. Optional frontmatter: `programId`, `network`, `deployedAt`.
- `data/projects.config.ts` — projects and chains (list view registry).
- `data/certs.config.ts` — credentials (source of truth for chip row + `/credentials`).
- `lib/i18n.ts` — dictionary and helpers (`getDict`, `langPath`, `isLang`).

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
npm run start
```

## On-chain credentials

Real soulbound NFTs on Solana devnet, minted via MPL Core with a `PermanentFreezeDelegate`.

```bash
# .env.local must have DEPLOYER_SECRET + SOLANA_DEVNET_RPC + METADATA_BASE_URL
npm run mint         # idempotent: resumes from scripts/.mint-output.json
```

## Environment

`.env.local` (server-only, never exposed to browser):

```
HELIUS_RPC=<devnet URL with api key>
SOLANA_DEVNET_RPC=<same or different devnet RPC>
LUCAS_WALLET=<public key of deployer>
SOLANA_CLUSTER=devnet
CERT_COLLECTION=<MPL Core collection address>
DEPLOYER_SECRET=<base58 keypair for the mint script only>
DEPLOYER_PUBKEY=<sanity check>
METADATA_BASE_URL=https://lucasalmeida.me/metadata
```

## Reach

- [Email](mailto:lucasalb11@gmail.com)
- [GitHub](https://github.com/Lucasalb11)
- [LinkedIn](https://www.linkedin.com/in/lucasalb11/)
