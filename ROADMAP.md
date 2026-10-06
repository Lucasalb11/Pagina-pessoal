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
| KaleFi | Done, 8 tests; faucet capped; price refreshed on demand (`/api/price/refresh`), no cron | Testnet market `CBIK…A2IM` | **Live** at kalefi.vercel.app, GitHub-linked; only env needed: `KALEFI_ADMIN_SECRET` (`CRON_SECRET` is now unused) |
| FoxFi | Done, 7 tests, pushed | Devnet `FBC9…tXtb`, mints `DWdS…Uocc` / `Hbx7…Vcz`, faucet `9ZMU…U2gn` | **Live** at foxfi.vercel.app (project `foxfi`, root `app/`, env set) |
| Aegis | Done, pushed, 8 tests; AMM pages hidden (old pools) | **Devnet** `EqmX…R3gL` (size-optimized build, 470 KB) | **Live** at aegis-indol.vercel.app, env points at the new program |
| NexusFi | Reworked: Express backend moved into Next API routes, user-signed relay (passkey), capped mints | Testnet contracts (original deploy) | **Live** at nexusfi-six.vercel.app (project `nexusfi`, root `apps/frontend`); env: 4 contract IDs, `SOROBAN_SECRET_KEY`, `FEE_PAYER_SECRET` (stellar key `nexusfi-fee`) |

### Security review (2026-10-03)

Unauthenticated surface reviewed across the site, the four dapps, Paga no @ and gym. Fix commits
(pushed 2026-10-05): KaleFi `566332a` (faucet capped per account and by total supply, so it can't
drain the market), FoxFi `843334c` and Aegis `4641317` (faucets: user pays fees and rent, server only
co-signs), Blinkpay `5045569` (anti-framing headers; also on the other dapps), gym `9cbf24c` (session
ownership), pay-on-handle (cloned to `portfolio-apps/pay-on-handle`; webhook fails closed, PIX payouts
off, `/api/pix-intent` removed). Still open, on-chain: Paga no @ handle registration is self-asserted
(needs the registry source, which is not on this machine).

### Next steps

1. KaleFi: done 2026-10-05. The GitHub price workflow was replaced by an on-demand refresh (GitHub delays
   schedules by hours, the contract rejects prices older than 1h). Optional cleanup: remove `CRON_SECRET` on Vercel.
2. ~~Devnet SOL~~ and 3. ~~Aegis deploy~~: done 2026-10-06. Built with opt-level z + fat LTO (470 KB,
   2.39 SOL rent instead of 2.98); SOL came from an orphan buffer and the idle FoxFi faucet. Smoke-tested
   on devnet: vault, deposit, agent payment, approval threshold, withdraw.
4. FoxFi: done 2026-10-05 (live at foxfi.vercel.app). Was: create Vercel project with root
   `app/` and env `NEXT_PUBLIC_FOXFI_INPUT_MINT`, `NEXT_PUBLIC_FOXFI_OUTPUT_MINT`,
   `FOXFI_FAUCET_SECRET_KEY` (from `.secrets/faucet.json`).
5. Personal site: set `live` in `data/projects.ts` for each deployed app (no `VERCEL_TOKEN` on the
   site, so discovery falls back to GitHub homepages), take screenshots into `public/projects/`,
   update the notes' "Where it stands".
6. NexusFi: done 2026-10-06 (live on Vercel). Not covered by automated tests: the passkey flow in a real browser.

Helper: `portfolio-apps/tools/cdp-check.mjs <url> [waitMs] [shot.png]` renders a page in headless
Chrome and prints text + console errors (`SCHEME=light FULL=1 WIDTH=390` options).

## Auto-publish (shipped in Phase 1, used by Phase 2)

The site resolves each project's live URL at runtime, so a new deploy shows up without editing this repo:

1. **Vercel API** (`VERCEL_TOKEN`): any Vercel project linked to a `Lucasalb11/*` GitHub repo → its production domain.
2. **GitHub API** fallback: the repo's `homepage` field.
3. Every candidate URL is health-checked; dead links are hidden instead of shown.
4. Repos tagged with the GitHub topic `portfolio` that are not in `data/projects.ts` appear automatically under "More builds".
5. `POST /api/revalidate` (header `x-revalidate-secret: $REVALIDATE_SECRET`) refreshes immediately. Copy `.github/workflow-templates/notify-portfolio.yml` into a project repo to call it after each successful production deploy.
