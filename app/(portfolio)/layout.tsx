import { SiteHeader } from "@/components/SiteHeader";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh w-full bg-[#111111] text-[#F2F0EB]">
      {/* Anti-Banding SVG Film Grain Overlay */}
      <svg aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.032] mix-blend-overlay">
        <filter id="pf-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#pf-grain)" />
      </svg>

      {/* Subtle Atmospheric Warm Orange Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(255, 107, 53, 0.065) 0%, rgba(23, 23, 23, 0.4) 55%, rgba(17, 17, 17, 0.96) 100%)",
        }}
      />

      {/* Whisper-Quiet Swiss Editorial Viewport Frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-3 z-10 rounded-[2px] border border-[#F2F0EB]/[0.05] sm:inset-5"
      >
        <span className="absolute -left-px -top-px h-2.5 w-2.5 border-l border-t border-[#FF8A3D]/45" />
        <span className="absolute -right-px -top-px h-2.5 w-2.5 border-r border-t border-[#FF8A3D]/45" />
        <span className="absolute -bottom-px -left-px h-2.5 w-2.5 border-b border-l border-[#FF8A3D]/45" />
        <span className="absolute -bottom-px -right-px h-2.5 w-2.5 border-b border-r border-[#FF8A3D]/45" />
      </div>

      <div className="relative z-20 mx-auto max-w-[40rem] px-6 pb-20 pt-9 sm:pt-12">
        <SiteHeader />
        {children}
      </div>
    </div>
  );
}
