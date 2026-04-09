# Lucas de Almeida — Personal Portfolio

A modern, dark-themed portfolio built with React + TypeScript, showcasing blockchain and Web3 projects with live GitHub integration.

**Live site:** [lucasalmeida.me](https://lucasalmeida.me)

---

## Features

- **Live GitHub sync** — repositories load automatically; README images appear as project previews
- **Auto-refresh** — polls GitHub every 10 minutes for new repos
- **Category filters** — browse by Blockchain, Rust · Solana, DeFi, or view all
- **Responsive design** — optimized for desktop and mobile
- **Dark theme** — purple/green accent palette with subtle animations

## Tech Stack

| Layer | Tools |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Data fetching | TanStack Query |
| Routing | React Router |

## Getting Started

```bash
# Clone
git clone https://github.com/Lucasalb11/Pagina-pessoal.git
cd Pagina-pessoal

# Install
npm install

# Develop
npm run dev       # http://localhost:5173

# Build
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/       # UI sections (Hero, Projects, About, Skills…)
├── hooks/            # useProjects — GitHub + localStorage state
├── lib/
│   └── github.ts     # GitHub API + README image extraction
├── pages/            # Index, Admin, NotFound
└── index.css         # Design tokens, animations
```

## Deployment

Connect the repository to [Vercel](https://vercel.com) or [Netlify](https://netlify.com):

- Build command: `npm run build`
- Output directory: `dist`

## Contact

- GitHub: [Lucasalb11](https://github.com/Lucasalb11)
- LinkedIn: [Lucas de Almeida](https://www.linkedin.com/in/lucasalb11/)
- Website: [lucasalmeida.me](https://lucasalmeida.me)

---

MIT License
