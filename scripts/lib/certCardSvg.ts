/**
 * Generates a 1024×1024 SVG credential card matching the site's holographic aesthetic.
 * No external font dependencies — uses generic system fonts so it renders in any viewer.
 */

export interface CardInput {
  credentialId: string;
  name: string;
  program: string;
  issuer: string;
  dateIssued: string;
  ecosystem: string;
  description: string;
  attributes: { trait_type: string; value: string }[];
  index: number;
  total: number;
}

const ECOSYSTEM_THEME: Record<string, { primary: string; accent: string; tag: string }> = {
  Solana:   { primary: "#34F198", accent: "#9945FF", tag: "SOL" },
  Stellar:  { primary: "#34F198", accent: "#7AD3FF", tag: "XLM" },
  EVM:      { primary: "#34F198", accent: "#627EEA", tag: "EVM" },
  Academic: { primary: "#34F198", accent: "#E47140", tag: "EDU" },
};

const ISSUER_GLYPHS: Record<string, string> = {
  "Ackee Blockchain":              "AKE",
  "Colosseum":                     "COL",
  "Stellar Development Foundation": "SDF",
  "Solana Foundation":             "SOL",
  "NearX Academy":                 "NRX",
  "DeFiverso":                     "DFV",
  "UFRPE":                         "UFR",
};

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const truncate = (s: string, max: number) => (s.length <= max ? s : s.slice(0, max - 1) + "…");

export function renderCertCardSvg(input: CardInput): string {
  const theme = ECOSYSTEM_THEME[input.ecosystem] ?? ECOSYSTEM_THEME.Solana;
  const glyph = ISSUER_GLYPHS[input.issuer] ?? input.issuer.slice(0, 3).toUpperCase();
  const serial = `${String(input.index).padStart(2, "0")} / ${String(input.total).padStart(2, "0")}`;
  const name = escape(input.name);
  const issuer = escape(input.issuer.toUpperCase());
  const program = escape(input.program.toUpperCase());
  const date = escape(input.dateIssued);
  const eco = escape(input.ecosystem.toUpperCase());

  // Wrap long titles to two lines manually (rough heuristic)
  const titleWords = name.split(" ");
  let line1 = "";
  let line2 = "";
  for (const w of titleWords) {
    if ((line1 + " " + w).trim().length <= 22) line1 = (line1 + " " + w).trim();
    else line2 = (line2 + " " + w).trim();
  }
  if (!line2 && line1.length > 22) {
    const idx = line1.lastIndexOf(" ", 22);
    if (idx > 0) {
      line2 = line1.slice(idx + 1);
      line1 = line1.slice(0, idx);
    }
  }
  line1 = truncate(line1, 28);
  line2 = truncate(line2, 28);

  const attrs = input.attributes.slice(0, 4);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <defs>
    <!-- Holographic conic border -->
    <linearGradient id="holo" x1="0" y1="0" x2="1024" y2="1024" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${theme.primary}" stop-opacity="0.85"/>
      <stop offset="50%" stop-color="${theme.accent}" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="${theme.primary}" stop-opacity="0.85"/>
    </linearGradient>
    <!-- Center halo -->
    <radialGradient id="halo" cx="512" cy="420" r="520" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${theme.primary}" stop-opacity="0.22"/>
      <stop offset="40%" stop-color="${theme.accent}" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#080808" stop-opacity="0"/>
    </radialGradient>
    <!-- Card surface -->
    <linearGradient id="surface" x1="0" y1="0" x2="0" y2="1024" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0f0f0f"/>
      <stop offset="100%" stop-color="#070707"/>
    </linearGradient>
    <!-- Dot pattern -->
    <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.2" fill="#ffffff" fill-opacity="0.04"/>
    </pattern>
    <!-- Issuer glyph shadow -->
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="14" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1024" height="1024" fill="#050505"/>
  <rect width="1024" height="1024" fill="url(#dots)"/>
  <rect width="1024" height="1024" fill="url(#halo)"/>

  <!-- Card body with rounded holo border -->
  <rect x="24" y="24" width="976" height="976" rx="48" fill="url(#surface)" stroke="url(#holo)" stroke-width="2.5"/>
  <rect x="32" y="32" width="960" height="960" rx="42" fill="none" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>

  <!-- Top status row -->
  <g font-family="ui-monospace, Menlo, Consolas, monospace" font-size="22" letter-spacing="4">
    <rect x="72" y="76" width="280" height="46" rx="23" fill="${theme.primary}" fill-opacity="0.10" stroke="${theme.primary}" stroke-opacity="0.55"/>
    <circle cx="100" cy="99" r="6" fill="${theme.primary}"/>
    <text x="120" y="107" fill="${theme.primary}">ON-CHAIN CRED</text>
    <text x="952" y="107" fill="#9a9a9a" text-anchor="end">${eco}</text>
  </g>

  <!-- Issuer glyph badge -->
  <g transform="translate(412, 200)">
    <rect width="200" height="200" rx="36" fill="#0c0c0c" stroke="${theme.accent}" stroke-opacity="0.55" stroke-width="2"/>
    <rect x="6" y="6" width="188" height="188" rx="30" fill="none" stroke="${theme.primary}" stroke-opacity="0.18" stroke-width="1"/>
    <text x="100" y="120" fill="${theme.primary}" font-family="system-ui, -apple-system, Helvetica, Arial, sans-serif" font-size="78" font-weight="700" text-anchor="middle" letter-spacing="-3" filter="url(#glow)">${escape(glyph)}</text>
    <text x="100" y="162" fill="#9a9a9a" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="14" text-anchor="middle" letter-spacing="3">ISSUER</text>
  </g>

  <!-- Title -->
  <g font-family="system-ui, -apple-system, Helvetica, Arial, sans-serif" font-weight="500" text-anchor="middle" letter-spacing="-2.5" fill="#fafafa">
    <text x="512" y="490" font-size="${line2 ? 66 : 78}">${line1}</text>
    ${line2 ? `<text x="512" y="566" font-size="66">${line2}</text>` : ""}
  </g>

  <!-- Program -->
  <text x="512" y="${line2 ? 612 : 540}" text-anchor="middle" fill="${theme.primary}" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="20" letter-spacing="5">${program}</text>

  <!-- Issuer caps -->
  <text x="512" y="${line2 ? 656 : 584}" text-anchor="middle" fill="#9a9a9a" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="22" letter-spacing="6">${issuer}</text>

  <!-- Attributes strip -->
  <g font-family="ui-monospace, Menlo, Consolas, monospace" font-size="18" letter-spacing="3">
    ${attrs.map((a, i) => {
      const y = 730 + i * 42;
      return `
    <line x1="120" y1="${y - 22}" x2="904" y2="${y - 22}" stroke="#ffffff" stroke-opacity="0.05"/>
    <text x="120" y="${y}" fill="#9a9a9a">${escape(a.trait_type.toUpperCase())}</text>
    <text x="904" y="${y}" fill="#fafafa" text-anchor="end" font-family="system-ui, -apple-system, Helvetica, Arial, sans-serif" letter-spacing="-0.5">${escape(a.value)}</text>`;
    }).join("")}
    <line x1="120" y1="${730 + attrs.length * 42 - 22}" x2="904" y2="${730 + attrs.length * 42 - 22}" stroke="#ffffff" stroke-opacity="0.05"/>
  </g>

  <!-- Bottom bar: date · soulbound · serial -->
  <g font-family="ui-monospace, Menlo, Consolas, monospace" font-size="22" letter-spacing="5">
    <text x="72" y="956" fill="#9a9a9a">${date}</text>
    <g transform="translate(512, 938)">
      <rect x="-130" y="0" width="260" height="40" rx="20" fill="${theme.accent}" fill-opacity="0.12" stroke="${theme.accent}" stroke-opacity="0.55"/>
      <text x="0" y="27" fill="${theme.accent}" text-anchor="middle">◇ SOULBOUND</text>
    </g>
    <text x="952" y="956" fill="#9a9a9a" text-anchor="end">${serial}</text>
  </g>

  <!-- Top-left chain dot -->
  <g transform="translate(56, 56)" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="14" letter-spacing="2">
    <circle cx="0" cy="0" r="6" fill="${theme.accent}"/>
    <text x="14" y="5" fill="${theme.accent}">${escape(theme.tag)}</text>
  </g>

  <!-- Lucas signature corner -->
  <text x="56" y="996" fill="#5a5a5a" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="14" letter-spacing="4">LUCAS DE ALMEIDA · LDA.ON-CHAIN</text>
</svg>
`;
}

export function renderCollectionSvg(opts: { totalCount: number }): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <defs>
    <linearGradient id="holo" x1="0" y1="0" x2="1024" y2="1024" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#34F198" stop-opacity="0.85"/>
      <stop offset="50%" stop-color="#9945FF" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="#34F198" stop-opacity="0.85"/>
    </linearGradient>
    <radialGradient id="halo" cx="512" cy="512" r="520" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#34F198" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#080808" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.2" fill="#ffffff" fill-opacity="0.04"/>
    </pattern>
    <filter id="glow"><feGaussianBlur stdDeviation="18"/></filter>
  </defs>
  <rect width="1024" height="1024" fill="#050505"/>
  <rect width="1024" height="1024" fill="url(#dots)"/>
  <rect width="1024" height="1024" fill="url(#halo)"/>
  <rect x="24" y="24" width="976" height="976" rx="48" fill="#0a0a0a" stroke="url(#holo)" stroke-width="3"/>
  <text x="512" y="430" text-anchor="middle" fill="#fafafa" font-family="system-ui, -apple-system, Helvetica, Arial, sans-serif" font-size="120" letter-spacing="-6" font-weight="500">LDA</text>
  <text x="512" y="540" text-anchor="middle" fill="#9945FF" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="22" letter-spacing="8">CREDENTIALS · ON-CHAIN</text>
  <text x="512" y="640" text-anchor="middle" fill="#34F198" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="18" letter-spacing="6">${opts.totalCount} SOULBOUND</text>
  <text x="512" y="900" text-anchor="middle" fill="#5a5a5a" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="14" letter-spacing="4">LUCAS DE ALMEIDA · COLLECTION</text>
</svg>
`;
}
