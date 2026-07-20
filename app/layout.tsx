import type { Metadata } from "next";
import { Instrument_Serif, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const SITE_URL = "https://lucasalmeida.me";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lucas de Almeida — Blockchain Engineer · Solana · Web3 Builder",
    template: "%s · Lucas de Almeida",
  },
  description:
    "Blockchain engineer building on-chain capital infrastructure for the Brazilian real economy. Rust on Solana (Anchor) and Stellar (Soroban), Solidity on EVM (Foundry). Ackee School of Solana, Season 8.",
  keywords: [
    "blockchain engineer",
    "Solana developer",
    "smart contract engineer",
    "Rust blockchain",
    "Anchor",
    "Solidity",
    "Foundry",
    "Soroban",
    "Stellar",
    "DeFi engineer",
    "real-world assets",
    "USDC settlement",
    "Lucas de Almeida",
    "founding engineer Web3",
    "Recife blockchain",
    "LATAM blockchain",
  ],
  authors: [{ name: "Lucas de Almeida", url: SITE_URL }],
  creator: "Lucas de Almeida",
  openGraph: {
    type: "profile",
    locale: "en_US",
    alternateLocale: "pt_BR",
    url: SITE_URL,
    siteName: "Lucas de Almeida",
    title: "Lucas de Almeida — Blockchain Engineer · Solana · Web3 Builder",
    description:
      "Operator turned on-chain builder. Seven years running a 100-person real-economy business — now writing smart contracts across Solana, Stellar and EVM.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@11lucasa",
    creator: "@11lucasa",
    title: "Lucas de Almeida — Blockchain Engineer",
    description:
      "Operator turned on-chain builder. Rust · Anchor · Solidity · Soroban. Open to founding teams and builder partnerships.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#lucas`,
  name: "Lucas de Almeida",
  givenName: "Lucas",
  familyName: "de Almeida",
  url: SITE_URL,
  image: `${SITE_URL}/lucas-portrait.jpg`,
  email: "mailto:lucasalb11@gmail.com",
  jobTitle: "Blockchain Engineer",
  description:
    "Blockchain engineer building on-chain capital infrastructure for the Brazilian real economy.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Recife",
    addressRegion: "PE",
    addressCountry: "BR",
  },
  nationality: "Brazilian",
  knowsLanguage: ["Portuguese", "English"],
  knowsAbout: [
    "Smart Contract Development",
    "Solana",
    "Rust",
    "Anchor",
    "Solidity",
    "Foundry",
    "Soroban",
    "Stellar",
    "USDC settlement",
    "Real-world assets",
    "SPL Tokens",
    "PDAs",
    "CPIs",
  ],
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "Ackee — School of Solana",
      url: "https://ackee.xyz/solana/school-of-solana/",
    },
    { "@type": "EducationalOrganization", name: "NearX Academy" },
    {
      "@type": "EducationalOrganization",
      name: "Universidade Federal Rural de Pernambuco (UFRPE)",
      url: "https://ufrpe.br/",
    },
  ],
  sameAs: [
    "https://github.com/Lucasalb11",
    "https://www.linkedin.com/in/lucasalb11/",
    "https://x.com/11lucasa",
  ],
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SITE_URL,
  name: "Lucas de Almeida — Blockchain Engineer",
  publisher: { "@id": `${SITE_URL}/#lucas` },
  inLanguage: ["en", "pt-BR"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="theme-color" content="#f4efe4" />
        <meta name="geo.region" content="BR-PE" />
        <meta name="geo.placename" content="Recife" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
