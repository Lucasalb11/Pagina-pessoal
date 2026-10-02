# Roadmap

## Phase 1 — Personal site redesign (in progress)

- [x] 1. Structa: hub README with architecture + threat model, pushed to github.com/Lucasalb11/Structa
- [x] 2. Read every project README and the contract source for the threat-model sections
- [x] 3. Duotone portrait (`public/portrait-duotone.jpg`) and project screenshots (`public/projects/`)
- [x] 4. Rebuild the site: dark protocol theme, English only, home / work deep-dives / credentials
- [x] 5. Deep-dive per project with a "Threat model" section written from the code
- [x] 6. Auto-publish: live links resolved from Vercel + GitHub, refreshed on every deploy
- [x] 7. Build, visual review, commit

## Phase 2 — Ship the remaining projects

**Paused on 2026-10-02. Resume from "Next steps" below.** Local clones: `~/Documents/projects/portfolio-apps/`.

| Project | Code | On-chain | Vercel |
| --- | --- | --- | --- |
| Personal site | Minimal rewrite, live | — | **Live** at www.lucasalmeida.me (`lucas-portfolio`), env `REVALIDATE_SECRET`, `SOLANA_CLUSTER` set |
| Blinkpay | Done, pushed, 9 tests | Devnet `J888…CjjM` | **Live** at blinkpay-alpha.vercel.app, GitHub-linked, root `blinkpay/frontend` |
| KaleFi | Done, 8 tests; last commit (Next 15.5.27 upgrade) **not pushed** | Testnet market `CBIK…A2IM` | Project `kalefi` created, env `KALEFI_ADMIN_SECRET` + `CRON_SECRET` set; last `vercel --prod` failed with "fetch failed" (network) — retry |
| FoxFi | Done, pushed, 7 tests | Needs ~2.8 devnet SOL | Not created |
| Aegis | Done, pushed, 8 tests | Needs ~4.5 devnet SOL (`EqmX…R3gL`) | Project `aegis` exists and auto-builds; `NEXT_PUBLIC_AEGIS_PROGRAM_ID` must point to the new program after deploy |
| NexusFi | Not started (Railway down) | Testnet contracts exist | — |

### Next steps

1. KaleFi: `git push` (Keychain prompt), then `vercel --prod` from the repo root; link GitHub
   (root `.`) and add GitHub repo secrets `KALEFI_APP_URL` + `CRON_SECRET`
   (value in `KaleFi/.secrets/cron_secret`) so the price workflow runs every 30 min.
2. Get ~8 devnet SOL (faucet.solana.com) to `GfPESpzMYrw1fz4jH58ynpsMYeutXfBzmh2CXYY5Whuk`.
3. Aegis: `anchor deploy --provider.cluster devnet` in `aegis-protocol/program`; set
   `NEXT_PUBLIC_AEGIS_PROGRAM_ID=EqmXtjocXyA8ZL9PVDEyfwfSut4KkRUxg5bmNQwfR3gL` on Vercel; redeploy.
   AMM pages still point at old pools/mints (authority key not available): reseed or hide.
4. FoxFi: `anchor deploy`, `npx ts-node scripts/setup-devnet.ts`, create Vercel project with root
   `app/` and env `NEXT_PUBLIC_FOXFI_INPUT_MINT`, `NEXT_PUBLIC_FOXFI_OUTPUT_MINT`,
   `FOXFI_FAUCET_SECRET_KEY` (from `.secrets/faucet.json`).
5. Personal site: set `live` in `data/projects.ts` for each deployed app (no `VERCEL_TOKEN` on the
   site, so discovery falls back to GitHub homepages), take screenshots into `public/projects/`,
   update the notes' "Where it stands".
6. NexusFi: redeploy or mark offline.

Helper: `portfolio-apps/tools/cdp-check.mjs <url> [waitMs] [shot.png]` renders a page in headless
Chrome and prints text + console errors (`SCHEME=light FULL=1 WIDTH=390` options).

## Auto-publish (shipped in Phase 1, used by Phase 2)

The site resolves each project's live URL at runtime, so a new deploy shows up without editing this repo:

1. **Vercel API** (`VERCEL_TOKEN`): any Vercel project linked to a `Lucasalb11/*` GitHub repo → its production domain.
2. **GitHub API** fallback: the repo's `homepage` field.
3. Every candidate URL is health-checked; dead links are hidden instead of shown.
4. Repos tagged with the GitHub topic `portfolio` that are not in `data/projects.ts` appear automatically under "More builds".
5. `POST /api/revalidate` (header `x-revalidate-secret: $REVALIDATE_SECRET`) refreshes immediately. Copy `.github/workflow-templates/notify-portfolio.yml` into a project repo to call it after each successful production deploy.
