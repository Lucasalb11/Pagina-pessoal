# Lucas de Almeida — Portfolio

Founder/builder brand. Operator turned on-chain builder, building capital for the real economy.

**Live:** [lucasalmeida.me](https://lucasalmeida.me)

## Stack

| Layer        | Tools                                          |
| ------------ | ---------------------------------------------- |
| Framework    | React 18 + Vite + TypeScript                   |
| Styling      | Tailwind CSS                                   |
| Motion       | framer-motion                                  |
| Routing      | React Router                                   |
| i18n         | Custom hook (EN/PT), localStorage-backed       |
| On-chain     | Solana devnet · MPL Core · Umi · Helius RPC    |

## Sections

`Hero → Story → Track Record → Shipped → Pillars → Credentials → Signal → Contact`

Credentials are real soulbound NFTs minted on Solana devnet via MPL Core with a `PermanentFreezeDelegate` plugin.

## Develop

```bash
npm install
npm run dev          # http://localhost:5173
npm run build
npm run preview
```

## Mint credentials (devnet)

```bash
# requires .env.local: DEPLOYER_SECRET, SOLANA_DEVNET_RPC, METADATA_BASE_URL
npx tsx scripts/mint-credentials.ts
```

Idempotent — resumes from `scripts/.mint-output.json`.

## Contact

- GitHub: [Lucasalb11](https://github.com/Lucasalb11)
- LinkedIn: [Lucas de Almeida](https://www.linkedin.com/in/lucasalb11/)
