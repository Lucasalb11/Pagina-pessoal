# Roadmap

## Phase 1 — Personal site redesign (in progress)

- [x] 1. Structa: hub README with architecture + threat model, pushed to github.com/Lucasalb11/Structa
- [x] 2. Read every project README and the contract source for the threat-model sections
- [x] 3. Duotone portrait (`public/portrait-duotone.jpg`) and project screenshots (`public/projects/`)
- [x] 4. Rebuild the site: dark protocol theme, English only, home / work deep-dives / credentials
- [x] 5. Deep-dive per project with a "Threat model" section written from the code
- [x] 6. Auto-publish: live links resolved from Vercel + GitHub, refreshed on every deploy
- [x] 7. Build, visual review, commit

## Phase 2 — Ship the remaining projects (after Phase 1)

Goal: every project on the site has a working live demo on Vercel.

| Project | Repo | What's missing | Target |
| --- | --- | --- | --- |
| Aegis | Lucasalb11/Aegis | Vercel deployment deleted (404). Program lists vault/Jupiter instructions in `instructions/` that are not exported from `lib.rs`; only pool + tokenomics are callable. Wire the vault policy instructions, redeploy program to devnet, redeploy frontend. | Vercel |
| Blinkpay | Lucasalb11/Blinkpay | Vercel deployment deleted (404). `current_time` is a client-supplied instruction arg used in PDA seeds/`created_at`; replace with `Clock`. Redeploy frontend from `blinkpay/frontend`. | Vercel |
| KaleFi | Lucasalb11/KaleFi | No deployment. Repo nested as `KaleFi/KaleFi/Kalefi` — flatten. Mock price oracle (`set_mock_price`) → Reflector. Pages Router app; deploy to Vercel with Stellar testnet contract IDs. | Vercel |
| FoxFi | Lucasalb11/FoxFi | No deployment, no frontend live. Settlement pays `min_output_amount`, not the solver's quoted output; input vault is never released to the solver. Fix settlement, deploy program to devnet, deploy `app/`. | Vercel |
| NexusFi | Lucasalb11/NexusFi | Railway domain returns 404. Redeploy (Railway or move frontend to Vercel). | Vercel / Railway |

For each project:
1. Clone, install, build locally; fix build errors.
2. Fix the correctness issues listed above; run tests.
3. Deploy program/contracts to devnet/testnet where relevant.
4. `vercel link` + `vercel --prod`; connect the GitHub repo so every push deploys.
5. Add the deploy hook workflow (below) to the repo.
6. Take a fresh screenshot into `public/projects/<id>.webp` and drop the generated cover.

## Auto-publish (shipped in Phase 1, used by Phase 2)

The site resolves each project's live URL at runtime, so a new deploy shows up without editing this repo:

1. **Vercel API** (`VERCEL_TOKEN`): any Vercel project linked to a `Lucasalb11/*` GitHub repo → its production domain.
2. **GitHub API** fallback: the repo's `homepage` field.
3. Every candidate URL is health-checked; dead links are hidden instead of shown.
4. Repos tagged with the GitHub topic `portfolio` that are not in `data/projects.ts` appear automatically under "More builds".
5. `POST /api/revalidate` (header `x-revalidate-secret: $REVALIDATE_SECRET`) refreshes immediately. Copy `.github/workflow-templates/notify-portfolio.yml` into a project repo to call it after each successful production deploy.
