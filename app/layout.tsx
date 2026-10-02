import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PROFILE, SITE_URL } from "@/data/profile";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const TITLE = "Lucas de Almeida";
const DESCRIPTION =
  "Computer Engineering student at UFRPE, learning to build and secure DeFi protocols. Notes on what I'm studying, building and learning.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s · Lucas de Almeida" },
  description: DESCRIPTION,
  authors: [{ name: PROFILE.name, url: SITE_URL }],
  openGraph: { type: "profile", locale: "en_US", url: SITE_URL, siteName: PROFILE.name, title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", creator: "@11lucasa", title: TITLE, description: DESCRIPTION },
  alternates: { canonical: SITE_URL },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#141414" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  url: SITE_URL,
  image: `${SITE_URL}/portrait.jpg`,
  email: `mailto:${PROFILE.email}`,
  description: PROFILE.headline,
  address: { "@type": "PostalAddress", addressLocality: "Recife", addressRegion: "PE", addressCountry: "BR" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Universidade Federal Rural de Pernambuco" },
  knowsAbout: ["Blockchain", "DeFi", "Smart contract security", "Solidity", "Rust", "Solana"],
  sameAs: [PROFILE.github, PROFILE.linkedin, PROFILE.x],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <div className="mx-auto max-w-[40rem] px-6 pb-20 pt-16 sm:pt-24">{children}</div>
      </body>
    </html>
  );
}
