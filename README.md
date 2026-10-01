# lucasalmeida.me

Personal site of Lucas de Almeida, protocol engineer on Solana and Stellar.

**Live:** [lucasalmeida.me](https://lucasalmeida.me)

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Geist / Geist Mono ·
MDX (next-mdx-remote-client, remark-gfm, Shiki) · Helius RPC for live Solana data.

## Routes

```
/                      home: hero inspector, selected work, findings, experience
/work/[slug]           deep dive per project, each with a "Threat model" section
/credentials           soulbound credential NFTs, verifiable on Solscan
/api/onchain/latest    wallet / slot / credential count (Helius, cached 60s)
/api/revalidate        POST, refreshes project live links (see below)
/sitemap.xml /robots.txt /opengraph-image /llms.txt
```

Old `/en/*` and `/pt/*` URLs redirect permanently (`next.config.ts`).

## Content

- `data/projects.ts` — project registry (summary, stack, repo, image, flow for generated covers).
- `content/work/<id>.mdx` — deep dives.
- `data/profile.ts` — contact, timeline, education, and the findings table.
- `data/certs.config.ts` — credentials (source of truth for the mint pipeline and `/credentials`).

## Live links publish themselves

`lib/portfolio.ts` resolves each project's live URL at request time (cached 1h):

1. Vercel API — any Vercel project linked to a `Lucasalb11/*` repo (`VERCEL_TOKEN`, optional `VERCEL_TEAM_ID`).
2. GitHub — the repo's Website field.
3. `live` in `data/projects.ts`.

A URL is shown only if it answers with a non-error status. Repos tagged with the GitHub topic
`portfolio` that aren't in `data/projects.ts` appear under "More builds".

To refresh immediately after a deploy, copy `.github/workflow-templates/notify-portfolio.yml`
into the project repo and set its `PORTFOLIO_REVALIDATE_SECRET` secret to this site's
`REVALIDATE_SECRET`.

## Environment

Server-only (`.env.local` / Vercel):

```
HELIUS_RPC=           devnet RPC with API key
LUCAS_WALLET=         wallet shown in the hero
SOLANA_CLUSTER=devnet
CERT_COLLECTION=      MPL Core collection address
REVALIDATE_SECRET=    shared with project repos' notify workflow
VERCEL_TOKEN=         optional, read-only token for live-link discovery
VERCEL_TEAM_ID=       optional
GITHUB_TOKEN=         optional, lifts the GitHub API rate limit
DEPLOYER_SECRET=      mint script only
```

## Develop

```bash
npm install
npm run dev
npm run build
npm run mint     # idempotent credential minting (MPL Core, devnet)
```

See `ROADMAP.md` for what's next.
