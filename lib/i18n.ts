export type Lang = "en" | "pt";
export const LANGS: readonly Lang[] = ["en", "pt"] as const;
export const DEFAULT_LANG: Lang = "en";

export function isLang(v: unknown): v is Lang {
  return v === "en" || v === "pt";
}

export interface Dict {
  meta: {
    home: { title: string; description: string };
    work:  { title: string; description: string };
    writing: { title: string; description: string };
    credentials: { title: string; description: string };
    chain: (name: string, blurb: string) => { title: string; description: string };
  };
  nav: {
    work: string;
    writing: string;
    cv: string;
    email: string;
    credentials: string;
    langOther: string;
  };
  home: {
    eyebrow: string;
    role: string;
    roleTags: string;
    thesis: string;
    actions: { email: string; github: string; cv: string };
    now: string;
    nowLabel: string;
    nowBody: (structaLinkOpen: string, structaLinkClose: string, deepDiveLinkOpen: string, deepDiveLinkClose: string) => string;
    work: string;
    workAll: string;
    writing: string;
    writingAll: string;
    writingEmpty: string;
    minRead: string;
    track: string;
    trackRoles: {
      arcos: { period: string; title: string; role: string; body: string };
      indep: { period: string; title: string; body: string };
    };
    fullCv: string;
    credentials: string;
    credentialsProof: string;
    credentialsIntro: string;
    contact: string;
    contactTitle: string;
    contactBody: string;
  };
  work: {
    kicker: string;
    title: string;
    intro: string;
  };
  writing: {
    kicker: string;
    title: string;
    intro: string;
    empty: string;
    minRead: string;
    back: string;
    replyByEmail: string;
    sig: string;
  };
  workDeepDive: {
    back: string;
    ctaTitle: string;
    ctaBody: string;
    deployedLabel: string;
    empty: string;
    githubFallback: string;
  };
  chain: {
    back: string;
    projects: string;
    projectsEmpty: (openList: string, closeList: string, openWriting: string, closeWriting: string) => string;
    credentials: string;
    others: string;
  };
  credentials: {
    kicker: string;
    title: string;
    intro: (soulboundOpen: string, soulboundClose: string, pluginOpen: string, pluginClose: string) => string;
    issued: string;
    minted: string;
    pending: string;
    collection: string;
    mintNote: (mplOpen: string, mplClose: string, scriptOpen: string, scriptClose: string) => string;
  };
  footer: {
    role: string;
    email: string;
    github: string;
    x: string;
    linkedin: string;
    credentials: string;
  };
}

const en: Dict = {
  meta: {
    home: {
      title: "Lucas de Almeida — Blockchain Engineer · Solana · Web3 Builder",
      description:
        "Blockchain engineer building on-chain capital infrastructure for the Brazilian real economy. Rust on Solana (Anchor) and Stellar (Soroban), Solidity on EVM.",
    },
    work: {
      title: "Work",
      description: "On-chain projects across Solana, Stellar and EVM.",
    },
    writing: {
      title: "Writing",
      description: "Essays on settlement, real-world assets, and building on-chain.",
    },
    credentials: {
      title: "Credentials",
      description: "Soulbound NFTs on Solana devnet — proof of program completion and hackathons.",
    },
    chain: (name, blurb) => ({
      title: name,
      description: blurb,
    }),
  },
  nav: {
    work: "Work",
    writing: "Writing",
    cv: "CV",
    email: "Email",
    credentials: "Credentials",
    langOther: "PT",
  },
  home: {
    eyebrow: "Recife · Brazil · 2026",
    role: "Blockchain engineer.",
    roleTags: "Rust on Solana (Anchor), Rust on Stellar (Soroban), Solidity on EVM (Foundry).",
    thesis:
      "Bringing pieces of the Brazilian real economy on-chain — real-estate financing, merchant settlement, lending against real collateral.",
    actions: { email: "email", github: "github", cv: "cv" },
    now: "Now",
    nowLabel: "currently building",
    nowBody: (a, ac, b, bc) =>
      `${a}Structa.finance${ac} — on-chain fundraising for Brazilian real estate, settled in USDC on Solana. A Brazilian developer raises capital against a real project; investors hold on-chain claims paid out from the underlying cash flows. Built at Solana Frontier; extending it end-to-end for a pilot. The hard part is the issuer side — KYC, custody, and the legal wrapper around the on-chain claim. ${b}deep dive${bc}`,
    work: "Work",
    workAll: "all →",
    writing: "Writing",
    writingAll: "all →",
    writingEmpty: "First essay lands shortly.",
    minRead: "min read",
    track: "Track record",
    trackRoles: {
      arcos: {
        period: "2019 — 2025 · Caruaru, PE",
        title: "Construtora Arcos",
        role: "Founder & Director.",
        body:
          "12 concurrent construction projects, 100+ people on payroll, institutional financing with Caixa Econômica Federal. Started in Minha Casa Minha Vida (federal housing), moved into private residential developments.",
      },
      indep: {
        period: "2023 — now · Independent",
        title: "Smart Contract Engineer & DeFi Researcher",
        body:
          "Full-time on-chain since 2025. Rust · Anchor · Soroban · Solidity · Foundry. Shipping across Solana, Stellar, and EVM. Ackee School of Solana (Season 8); Colosseum Frontier and Stellar Build submissions.",
      },
    },
    fullCv: "full CV",
    credentials: "Credentials",
    credentialsProof: "on-chain proof →",
    credentialsIntro:
      "Each purple chip links to its soulbound NFT on Solana devnet (MPL Core, permanent-freeze) — the credential is minted, not claimed.",
    contact: "Contact",
    contactTitle:
      "Open to founding-team roles, smart-contract engagements, and grant / hackathon partnerships.",
    contactBody:
      "Especially anything touching real-world assets, payments, or lending against real collateral. Email is the fastest way to reach me.",
  },
  work: {
    kicker: "Work",
    title: "Everything I’ve shipped on-chain.",
    intro:
      "Projects across Solana, Stellar and EVM. Rust on Anchor and Soroban; Solidity on Foundry. One pilot in design; the rest are hackathon and research builds from the past year. Everything is open on GitHub.",
  },
  writing: {
    kicker: "Writing",
    title: "Notes on settlement, RWAs, and building on-chain.",
    intro:
      "Short essays about the parts of on-chain work I find worth thinking about — payments, credit, real-world collateral, and the corners of Brazilian infrastructure a chain can actually improve.",
    empty: "Nothing published yet — the first essay is coming shortly.",
    minRead: "min read",
    back: "← writing",
    replyByEmail: "reply by email",
    sig: "Lucas de Almeida · Recife, BR",
  },
  workDeepDive: {
    back: "← work",
    ctaTitle: "Building something in this space?",
    ctaBody:
      "I’m especially open to conversations about real-world assets, on-chain settlement for merchants, and lending against real collateral.",
    deployedLabel: "deployed",
    empty: "Deep-dive coming soon — check the",
    githubFallback: "repository on GitHub",
  },
  chain: {
    back: "← work",
    projects: "Projects",
    projectsEmpty: (a, ac, b, bc) =>
      `No shipped work on this chain yet — check the ${a}full list${ac} or the ${b}writing${bc} for context.`,
    credentials: "Credentials in this ecosystem",
    others: "Other ecosystems",
  },
  credentials: {
    kicker: "Credentials",
    title: "Proof of work, on-chain.",
    intro: (sa, sac, pa, pac) =>
      `Each credential below is a ${sa}soulbound NFT${sac} minted to my wallet on Solana devnet — MPL Core with a ${pa}PermanentFreezeDelegate${pac} plugin, so the credential is issued, not claimed, and can never leave the wallet. Verify any of them directly on Solscan.`,
    issued: "Issued",
    minted: "Minted",
    pending: "Pending",
    collection: "Collection",
    mintNote: (ma, mac, sa, sac) =>
      `All credentials are minted from a single wallet using ${ma}MPL Core${mac}. The mint pipeline lives at ${sa}scripts/mint-credentials.ts${sac} and is idempotent — running it again only mints new entries. Devnet for now; mainnet migration once a credible verifier UI is worth writing.`,
  },
  footer: {
    role: "Recife, BR",
    email: "Email",
    github: "GitHub",
    x: "X",
    linkedin: "LinkedIn",
    credentials: "Credentials",
  },
};

const pt: Dict = {
  meta: {
    home: {
      title: "Lucas de Almeida — Engenheiro Blockchain · Solana · Web3 Builder",
      description:
        "Engenheiro blockchain construindo infraestrutura de capital on-chain para a economia real brasileira. Rust em Solana (Anchor) e Stellar (Soroban), Solidity em EVM.",
    },
    work: {
      title: "Trabalho",
      description: "Projetos on-chain em Solana, Stellar e EVM.",
    },
    writing: {
      title: "Escrita",
      description: "Ensaios sobre liquidação, RWA e construir on-chain.",
    },
    credentials: {
      title: "Credenciais",
      description: "NFTs soulbound em Solana devnet — prova de programas e hackathons.",
    },
    chain: (name, blurb) => ({
      title: name,
      description: blurb,
    }),
  },
  nav: {
    work: "Trabalho",
    writing: "Escrita",
    cv: "CV",
    email: "E-mail",
    credentials: "Credenciais",
    langOther: "EN",
  },
  home: {
    eyebrow: "Recife · Brasil · 2026",
    role: "Engenheiro blockchain.",
    roleTags: "Rust em Solana (Anchor), Rust em Stellar (Soroban), Solidity em EVM (Foundry).",
    thesis:
      "Trazendo pedaços da economia real brasileira pra on-chain — captação imobiliária, liquidação pra comerciante, crédito contra garantia real.",
    actions: { email: "e-mail", github: "github", cv: "cv" },
    now: "Agora",
    nowLabel: "construindo",
    nowBody: (a, ac, b, bc) =>
      `${a}Structa.finance${ac} — captação on-chain pra imóveis brasileiros, liquidada em USDC na Solana. Um construtor brasileiro capta contra um empreendimento real; investidores carregam títulos on-chain pagos a partir do fluxo de caixa da obra. Construído na Solana Frontier; estendendo o desenho ponta a ponta pra um piloto. A parte difícil é o lado do emissor — KYC, custódia e o envelope jurídico em volta do título on-chain. ${b}deep dive${bc}`,
    work: "Trabalho",
    workAll: "tudo →",
    writing: "Escrita",
    writingAll: "tudo →",
    writingEmpty: "O primeiro ensaio sai em breve.",
    minRead: "min de leitura",
    track: "Trajetória",
    trackRoles: {
      arcos: {
        period: "2019 — 2025 · Caruaru, PE",
        title: "Construtora Arcos",
        role: "Fundador & Diretor.",
        body:
          "Doze obras em paralelo, mais de 100 funcionários na folha, captação institucional via Caixa Econômica Federal. Começou construindo unidades pro Minha Casa Minha Vida; migrou pra obras residenciais particulares.",
      },
      indep: {
        period: "2023 — presente · Independente",
        title: "Engenheiro de Contratos Inteligentes & Pesquisador DeFi",
        body:
          "Full-time on-chain desde 2025. Rust · Anchor · Soroban · Solidity · Foundry. Entregando em Solana, Stellar e EVM. Ackee School of Solana (Season 8); submissões na Colosseum Frontier e Stellar Build.",
      },
    },
    fullCv: "CV completo",
    credentials: "Credenciais",
    credentialsProof: "prova on-chain →",
    credentialsIntro:
      "Cada chip roxo linka pro NFT soulbound na Solana devnet (MPL Core, congelamento permanente) — a credencial é emitida, não pleiteada.",
    contact: "Contato",
    contactTitle:
      "Aberto a founding team, engenharia de contratos inteligentes e parcerias em grant / hackathon.",
    contactBody:
      "Especialmente qualquer coisa que toque ativos do mundo real, pagamentos ou crédito contra garantia real. E-mail é o jeito mais rápido de me alcançar.",
  },
  work: {
    kicker: "Trabalho",
    title: "Tudo que entreguei on-chain.",
    intro:
      "Projetos em Solana, Stellar e EVM. Rust em Anchor e Soroban; Solidity em Foundry. Um piloto em desenho; os outros são builds de hackathon e pesquisa do último ano. Tudo aberto no GitHub.",
  },
  writing: {
    kicker: "Escrita",
    title: "Notas sobre liquidação, RWA e construir on-chain.",
    intro:
      "Ensaios curtos sobre as partes do trabalho on-chain que eu acho que vale a pena pensar — pagamentos, crédito, garantia real, e os cantos da infraestrutura brasileira que uma chain de fato consegue melhorar.",
    empty: "Nada publicado ainda — o primeiro ensaio vem em breve.",
    minRead: "min de leitura",
    back: "← escrita",
    replyByEmail: "responder por e-mail",
    sig: "Lucas de Almeida · Recife, BR",
  },
  workDeepDive: {
    back: "← trabalho",
    ctaTitle: "Construindo algo nesse espaço?",
    ctaBody:
      "Estou especialmente aberto a conversas sobre ativos do mundo real, liquidação on-chain pra comerciante e crédito contra garantia real.",
    deployedLabel: "deployado",
    empty: "Deep-dive em breve — enquanto isso, veja o",
    githubFallback: "repositório no GitHub",
  },
  chain: {
    back: "← trabalho",
    projects: "Projetos",
    projectsEmpty: (a, ac, b, bc) =>
      `Nada entregue nessa chain ainda — veja a ${a}lista completa${ac} ou os ${b}ensaios${bc} pra contexto.`,
    credentials: "Credenciais nesse ecossistema",
    others: "Outros ecossistemas",
  },
  credentials: {
    kicker: "Credenciais",
    title: "Prova de trabalho, on-chain.",
    intro: (sa, sac, pa, pac) =>
      `Cada credencial abaixo é um ${sa}NFT soulbound${sac} cunhado pra minha carteira na Solana devnet — MPL Core com plugin ${pa}PermanentFreezeDelegate${pac}, então a credencial é emitida, não pleiteada, e nunca sai da carteira. Verifique qualquer uma direto no Solscan.`,
    issued: "Emitidas",
    minted: "Cunhadas",
    pending: "Pendentes",
    collection: "Coleção",
    mintNote: (ma, mac, sa, sac) =>
      `Todas as credenciais são cunhadas de uma única carteira usando ${ma}MPL Core${mac}. A pipeline de mint fica em ${sa}scripts/mint-credentials.ts${sac} e é idempotente — rodar de novo só cunha entradas novas. Devnet por enquanto; migração pra mainnet quando fizer sentido escrever uma UI de verificação decente.`,
  },
  footer: {
    role: "Recife, BR",
    email: "E-mail",
    github: "GitHub",
    x: "X",
    linkedin: "LinkedIn",
    credentials: "Credenciais",
  },
};

export const dicts: Record<Lang, Dict> = { en, pt };

export function getDict(lang: Lang): Dict {
  return dicts[lang];
}

/** Build a path prefixed with the current language. */
export function langPath(lang: Lang, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${lang}${clean}`;
}
