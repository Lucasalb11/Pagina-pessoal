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

Status on 2026-10-02. Local clones live in `~/Documents/projects/portfolio-apps/`.

| Project | Code | On-chain | Vercel |
| --- | --- | --- | --- |
| Blinkpay | Done, pushed: SPL redirect + client-time fixes, frontend wired, 9 tests | Devnet `J888…CjjM` | Needs `vercel login` |
| Aegis | Done, committed locally (not pushed): real agent vault, 8 tests, /vault page | Needs ~4.5 devnet SOL to deploy `EqmX…R3gL` | After deploy |
| FoxFi | Done, committed locally (not pushed): auction + settlement rewrite, 7 tests, frontend wired, faucet | Needs ~2.8 devnet SOL, then `scripts/setup-devnet.ts` | After deploy |
| KaleFi | Done, committed locally (not pushed): market rewrite, liquidations, 8 tests, frontend wired | Testnet market `CBIK…A2IM` (live) | Needs `vercel login` + env |
| NexusFi | Not started: Railway app is down | Testnet contracts still there | — |

Blockers that need Lucas:
1. `git push` from each repo (the macOS Keychain prompt blocks pushes from this session).
2. `vercel login`.
3. ~8 devnet SOL at faucet.solana.com for the Aegis and FoxFi deploys.

Vercel env per app:
- Blinkpay: none required (`NEXT_PUBLIC_RPC_ENDPOINT` optional).
- Aegis: `NEXT_PUBLIC_AEGIS_PROGRAM_ID`, `NEXT_PUBLIC_SOLANA_RPC`.
- FoxFi: `NEXT_PUBLIC_FOXFI_INPUT_MINT`, `NEXT_PUBLIC_FOXFI_OUTPUT_MINT`, `FOXFI_FAUCET_SECRET_KEY` (from `scripts/setup-devnet.ts`).
- KaleFi: `KALEFI_ADMIN_SECRET` (`stellar keys show kalefi-admin`), `CRON_SECRET`; repo secrets `KALEFI_APP_URL` and `CRON_SECRET` for the price workflow.
- All: repo secret `PORTFOLIO_REVALIDATE_SECRET` for the notify workflow.

## Auto-publish (shipped in Phase 1, used by Phase 2)

The site resolves each project's live URL at runtime, so a new deploy shows up without editing this repo:

1. **Vercel API** (`VERCEL_TOKEN`): any Vercel project linked to a `Lucasalb11/*` GitHub repo → its production domain.
2. **GitHub API** fallback: the repo's `homepage` field.
3. Every candidate URL is health-checked; dead links are hidden instead of shown.
4. Repos tagged with the GitHub topic `portfolio` that are not in `data/projects.ts` appear automatically under "More builds".
5. `POST /api/revalidate` (header `x-revalidate-secret: $REVALIDATE_SECRET`) refreshes immediately. Copy `.github/workflow-templates/notify-portfolio.yml` into a project repo to call it after each successful production deploy.
