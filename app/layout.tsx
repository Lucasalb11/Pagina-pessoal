import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL, PROFILE } from "@/data/profile";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const TITLE = "Lucas de Almeida — Protocol Engineer · Solana · Stellar";
const DESCRIPTION =
  "Protocol engineer building on Solana (Anchor) and Stellar (Soroban), with a threat model for everything I ship. Open to full-time remote roles.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s · Lucas de Almeida" },
  description: DESCRIPTION,
  keywords: [
    "protocol engineer",
    "smart contract engineer",
    "Solana developer",
    "Anchor",
    "Rust",
    "Soroban",
    "Stellar",
    "Solidity",
    "Foundry",
    "smart contract security",
    "DeFi engineer",
    "remote blockchain engineer",
    "Lucas de Almeida",
  ],
  authors: [{ name: PROFILE.name, url: SITE_URL }],
  creator: PROFILE.name,
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SITE_URL,
    siteName: PROFILE.name,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@11lucasa",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  alternates: { canonical: SITE_URL },
};

export const viewport: Viewport = {
  themeColor: "#0a0f0d",
  colorScheme: "dark",
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#lucas`,
  name: PROFILE.name,
  url: SITE_URL,
  image: `${SITE_URL}/portrait-duotone.jpg`,
  email: `mailto:${PROFILE.email}`,
  jobTitle: "Protocol Engineer",
  description: DESCRIPTION,
  address: { "@type": "PostalAddress", addressLocality: "Recife", addressRegion: "PE", addressCountry: "BR" },
  knowsLanguage: ["Portuguese", "English"],
  knowsAbout: ["Solana", "Anchor", "Rust", "Soroban", "Stellar", "Solidity", "Foundry", "Smart contract security", "DeFi"],
  alumniOf: [
    { "@type": "EducationalOrganization", name: "Ackee Blockchain — School of Solana" },
    { "@type": "CollegeOrUniversity", name: "Universidade Federal Rural de Pernambuco" },
    { "@type": "CollegeOrUniversity", name: "Universidade Federal de Pernambuco" },
  ],
  sameAs: [PROFILE.github, PROFILE.linkedin, PROFILE.x],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
      </head>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--color-mint)] focus:px-3 focus:py-2 focus:text-[var(--color-ink)]"
        >
          Skip to content
        </a>
        <SiteHeader />
        <div id="main">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
