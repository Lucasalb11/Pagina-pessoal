"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lucasalb11/",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/Lucasalb11",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/11lucasa",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:lucasalb11@gmail.com",
    external: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export function VisitCardStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  const [avatarHover, setAvatarHover] = useState(false);
  const [ctaHover, setCtaHover] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: fine)");
    if (mediaQuery.matches || !pointerQuery.matches) return;

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let rafId = 0;

    const onPointerMove = (e: PointerEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      targetX = ((e.clientX / w) - 0.5) * 2;
      targetY = ((e.clientY / h) - 0.5) * 2;

      if (avatarRef.current) {
        const rect = avatarRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const deg = (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI + 90;
        avatarRef.current.style.setProperty("--rim-angle", `${deg.toFixed(1)}deg`);
      }
    };

    const tick = () => {
      curX += (targetX - curX) * 0.075;
      curY += (targetY - curY) * 0.075;
      stage.style.setProperty("--px", curX.toFixed(4));
      stage.style.setProperty("--py", curY.toFixed(4));
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleBtnMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = (x - rect.width / 2) * 0.18;
    const dy = (y - rect.height / 2) * 0.22;
    btn.style.setProperty("--bx", `${x.toFixed(1)}px`);
    btn.style.setProperty("--by", `${y.toFixed(1)}px`);
    btn.style.transform = `translate3d(${dx.toFixed(2)}px, ${(dy - 1.5).toFixed(2)}px, 0)`;
  };

  const handleBtnLeave = () => {
    setCtaHover(false);
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.transform = "translate3d(0px, 0px, 0)";
  };

  return (
    <div
      ref={stageRef}
      style={{ "--px": "0", "--py": "0" } as React.CSSProperties}
      className="vc-animate-bg relative flex min-h-dvh w-full flex-col justify-between overflow-hidden bg-[#111111] p-5 text-[#F2F0EB] selection:bg-[#FF6B35]/30 selection:text-[#F2F0EB] sm:p-8"
    >
      {/* Anti-Banding SVG Film Grain Overlay */}
      <svg aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.036] mix-blend-overlay">
        <filter id="vc-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#vc-grain)" />
      </svg>

      {/* Deep Atmospheric Ambient Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 38%, rgba(255, 107, 53, 0.08) 0%, rgba(23, 23, 23, 0.45) 48%, rgba(17, 17, 17, 0.98) 100%)",
        }}
      />

      {/* Whisper-Quiet Swiss Editorial Viewport Frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-3 z-10 rounded-[2px] border border-[#F2F0EB]/[0.05] sm:inset-5"
      >
        <span className="absolute -left-px -top-px h-2 w-2 border-l border-t border-[#FF8A3D]/35" />
        <span className="absolute -right-px -top-px h-2 w-2 border-r border-t border-[#FF8A3D]/35" />
        <span className="absolute -bottom-px -left-px h-2 w-2 border-b border-l border-[#FF8A3D]/35" />
        <span className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-[#FF8A3D]/35" />
      </div>

      {/* Top Editorial Telemetry Bar */}
      <header className="relative z-20 flex items-center justify-between px-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#F2F0EB]/35 sm:px-2">
        <span>LUCASALMEIDA.ME</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35]/80 shadow-[0_0_8px_#FF6B35]" />
          <span>RECIFE, BR</span>
        </span>
      </header>

      {/* Central Stage — Optically biased slightly above vertical midpoint */}
      <main className="relative z-20 mx-auto my-auto flex w-full max-w-[560px] flex-col items-center pt-2 pb-6 text-center sm:pt-4 sm:pb-10">
        {/* ============================================================
            SOLAR SYSTEM / LAYERED ORANGE CIRCULAR COMPOSITION
           ============================================================ */}
        <div className="relative flex h-[240px] w-[240px] items-center justify-center sm:h-[290px] sm:w-[290px]">
          {/* Architectural Axis Hairline passing through the Solar Core */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 h-px w-[88vw] max-w-[680px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#F2F0EB]/[0.07] to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 h-[340px] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-[#FF8A3D]/[0.09] to-transparent sm:h-[420px]"
          />

          {/* PLANE 1 (Deep Background, M = -18px): L0 Ambient Corona & Outer Scale Halo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out"
            style={{
              transform: "translate3d(calc(var(--px) * -18px), calc(var(--py) * -18px), 0)",
            }}
          >
            {/* Extended Outer Scale Ring (reaches beyond central composition) */}
            <div
              className="vc-animate-orbit absolute h-[380px] w-[380px] rounded-full border border-[#FF6B35]/[0.07] sm:h-[520px] sm:w-[520px]"
              style={{ animationDelay: "120ms" }}
            />

            {/* L0 Ambient Corona — Multi-stop warm espresso-amber falloff */}
            <div
              className="vc-animate-corona vc-pulse-aura absolute h-[320px] w-[320px] -translate-x-3 -translate-y-3 rounded-full mix-blend-screen transition-transform duration-700 sm:h-[470px] sm:w-[470px]"
              style={{
                transform: ctaHover || avatarHover ? "scale(1.09)" : "scale(1)",
                background:
                  "radial-gradient(circle at 46% 44%, rgba(255, 180, 119, 0.28) 0%, rgba(255, 138, 61, 0.20) 24%, rgba(255, 107, 53, 0.11) 48%, rgba(42, 18, 10, 0.05) 68%, transparent 82%)",
                filter: "blur(32px)",
              }}
            />
          </div>

          {/* PLANE 2 (Mid-Back, M = +10px): L1 Outer Eccentric Meridian & L2 Warm Caustic Disc A */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            style={{
              transform: "translate3d(calc(var(--px) * 10px), calc(var(--py) * 10px), 0)",
            }}
          >
            {/* L2: Warm Caustic Disc A (Eccentric upper-left translucent orange disc) */}
            <div
              className="vc-animate-disc absolute transition-transform duration-700 ease-out"
              style={{
                animationDelay: "140ms",
                transform: avatarHover
                  ? "translate3d(-11px, -8px, 0) scale(1.02)"
                  : "translate3d(-20px, -15px, 0) scale(1)",
              }}
            >
              <div
                className="vc-float-disc-a h-[220px] w-[220px] rounded-full sm:h-[296px] sm:w-[296px]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 107, 53, 0.20) 0%, rgba(255, 138, 61, 0.08) 55%, rgba(255, 180, 119, 0.01) 100%)",
                  border: "1px solid rgba(255, 138, 61, 0.22)",
                  boxShadow: "0 0 50px rgba(255, 107, 53, 0.12)",
                }}
              />
            </div>

            {/* L1: Outer Eccentric Meridian SVG Ring + Secondary Hollow Satellite */}
            <div
              className="vc-animate-orbit absolute translate-x-3 -translate-y-2.5 sm:translate-x-4 sm:-translate-y-3"
              style={{ animationDelay: "220ms" }}
            >
              <svg
                viewBox="0 0 420 420"
                className="vc-spin-cw-78 h-[296px] w-[296px] overflow-visible sm:h-[396px] sm:w-[396px]"
              >
                <defs>
                  <linearGradient id="vc-outer-meridian" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.48" />
                    <stop offset="50%" stopColor="#FFB477" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                <circle
                  cx="210"
                  cy="210"
                  r="198"
                  fill="none"
                  stroke="url(#vc-outer-meridian)"
                  strokeWidth="1"
                  strokeDasharray="6 10"
                />
                {/* Secondary Hollow Satellite at 215 deg */}
                <circle
                  cx="48"
                  cy="324"
                  r="3.5"
                  fill="#111111"
                  stroke="#FF8A3D"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>

          {/* PLANE 4 (Mid-Front, M = +16px): L3 Counter-Offset Disc B & L5 Inner Precision Ring */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            style={{
              transform: "translate3d(calc(var(--px) * 16px), calc(var(--py) * 16px), 0)",
            }}
          >
            {/* L3: Warm Caustic Disc B (Counter-offset lower-right soft peach/orange sphere) */}
            <div
              className="vc-animate-disc absolute transition-transform duration-700 ease-out"
              style={{
                animationDelay: "190ms",
                transform: avatarHover
                  ? "translate3d(12px, 9px, 0) scale(1.03)"
                  : "translate3d(22px, 16px, 0) scale(1)",
              }}
            >
              <div
                className="vc-float-disc-b h-[186px] w-[186px] rounded-full mix-blend-screen sm:h-[246px] sm:w-[246px]"
                style={{
                  background:
                    "radial-gradient(circle at 68% 68%, rgba(255, 180, 119, 0.24) 0%, rgba(255, 138, 61, 0.11) 46%, rgba(255, 107, 53, 0.03) 72%, transparent 100%)",
                  border: "1px solid rgba(255, 180, 119, 0.16)",
                }}
              />
            </div>

            {/* Asymmetric Anisotropic Corona Ring */}
            <div
              className="vc-animate-orbit absolute h-[168px] w-[168px] -translate-y-1.5 rounded-full opacity-80 mix-blend-screen sm:h-[216px] sm:w-[216px]"
              style={{
                animationDelay: "250ms",
                background:
                  "conic-gradient(from 195deg at 50% 50%, rgba(255, 107, 53, 0.04) 0deg, rgba(255, 138, 61, 0.34) 80deg, rgba(255, 180, 119, 0.52) 125deg, rgba(255, 107, 53, 0.08) 215deg, transparent 310deg, rgba(255, 107, 53, 0.04) 360deg)",
                WebkitMaskImage: "radial-gradient(circle, transparent 54%, black 76%, transparent 100%)",
                maskImage: "radial-gradient(circle, transparent 54%, black 76%, transparent 100%)",
                filter: "blur(10px)",
              }}
            />

            {/* L5: Inner Precision Telemetry Ring + Perigee Micro-Node */}
            <div
              className="vc-animate-orbit absolute -translate-x-1.5 translate-y-2 transition-opacity duration-500"
              style={{
                animationDelay: "280ms",
                opacity: ctaHover || avatarHover ? 1 : 0.78,
              }}
            >
              <svg
                viewBox="0 0 220 220"
                className="vc-spin-cw-29 h-[166px] w-[166px] overflow-visible sm:h-[208px] sm:w-[208px]"
              >
                <defs>
                  <linearGradient id="vc-inner-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFB477" stopOpacity="0.72" />
                    <stop offset="55%" stopColor="#FF8A3D" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.08" />
                  </linearGradient>
                </defs>
                <circle
                  cx="110"
                  cy="110"
                  r="102"
                  fill="none"
                  stroke="url(#vc-inner-ring)"
                  strokeWidth="1.1"
                />
                {/* Perigee Micro-Node */}
                <circle cx="47" cy="190" r="2.5" fill="#FFB477" />
              </svg>
            </div>
          </div>

          {/* PLANE 5 (Foreground Satellites, M = +25px): L4 Primary Sweeping Orbital Arc & Glowing Node */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            style={{
              transform: "translate3d(calc(var(--px) * 25px), calc(var(--py) * 25px), 0)",
            }}
          >
            <div
              className="vc-animate-orbit absolute"
              style={{ animationDelay: "340ms" }}
            >
              <svg
                viewBox="0 0 340 340"
                className="vc-spin-ccw-44 h-[244px] w-[244px] overflow-visible sm:h-[324px] sm:w-[324px]"
              >
                <defs>
                  <linearGradient id="vc-primary-arc" x1="0%" y1="0%" x2="100%" y2="85%">
                    <stop offset="0%" stopColor="#FFB477" stopOpacity="0.88" />
                    <stop offset="45%" stopColor="#FF6B35" stopOpacity="0.45" />
                    <stop offset="85%" stopColor="#FF6B35" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Sweeping variable-opacity orbital arc */}
                <circle
                  cx="170"
                  cy="170"
                  r="160"
                  fill="none"
                  stroke="url(#vc-primary-arc)"
                  strokeWidth="1.35"
                  strokeDasharray="240 320"
                  strokeLinecap="round"
                />
                {/* Subtle opposite counter-arc */}
                <circle
                  cx="170"
                  cy="170"
                  r="160"
                  fill="none"
                  stroke="rgba(255, 138, 61, 0.16)"
                  strokeWidth="0.85"
                />
                {/* Primary Glowing Orbital Satellite Node at ~42 deg */}
                <g transform="translate(289, 63)">
                  <circle
                    r="9"
                    fill="rgba(255, 107, 53, 0.22)"
                    className={avatarHover || ctaHover ? "vc-sonar-ping" : ""}
                  />
                  <circle r="6" fill="rgba(255, 138, 61, 0.25)" />
                  <circle r="3.5" fill="#FFB477" />
                </g>
              </svg>
            </div>
          </div>

          {/* PLANE 3 (Focal Anchor, M = +5px): Circular Profile Picture & L6 Rim Halo */}
          <div
            className="vc-animate-avatar relative z-20"
            style={{
              animationDelay: "80ms",
              transform: "translate3d(calc(var(--px) * 5px), calc(var(--py) * 5px), 0)",
            }}
            onPointerEnter={() => setAvatarHover(true)}
            onPointerLeave={() => setAvatarHover(false)}
          >
            {/* Outer Precision Halo Ring (L6) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2 rounded-full border border-[#FFB477]/25 transition-all duration-500 sm:-inset-2.5"
              style={{
                transform: avatarHover || ctaHover ? "scale(1.04)" : "scale(1)",
                borderColor:
                  avatarHover || ctaHover
                    ? "rgba(255, 180, 119, 0.52)"
                    : "rgba(255, 180, 119, 0.22)",
              }}
            />

            {/* Directional Conic Rim & Portrait Crop */}
            <div
              ref={avatarRef}
              className="vc-avatar-ring relative rounded-full"
            >
              <div className="vc-avatar-wrap relative h-[124px] w-[124px] overflow-hidden rounded-full bg-[#171717] sm:h-[146px] sm:w-[146px]">
                <Image
                  src="/lucas-avatar.jpg"
                  alt="Lucas de Almeida"
                  fill
                  priority
                  sizes="(max-width: 640px) 248px, 292px"
                  className="object-cover object-center transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            TYPOGRAPHY & PERSONAL IDENTITY
           ============================================================ */}
        <h1
          className="vc-animate-rise mt-6 bg-gradient-to-b from-[#F2F0EB] via-[#F2F0EB] to-[#F2F0EB]/80 bg-clip-text font-sans text-[32px] font-medium leading-[1.08] tracking-[-0.032em] text-transparent sm:mt-7 sm:text-[42px]"
          style={{ animationDelay: "340ms" }}
        >
          Lucas de Almeida
        </h1>

        <p
          className="vc-animate-rise mt-3 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 font-mono text-[11.5px] uppercase leading-[1.6] tracking-[0.14em] sm:mt-3.5 sm:text-[12.5px]"
          style={{ animationDelay: "430ms" }}
        >
          <span className="text-[#F2F0EB]/78">Computer Engineering</span>
          <span aria-hidden="true" className="font-light text-[#FF6B35]/85 select-none">
            |
          </span>
          <span className="font-medium text-[#FFB477]/95">
            Blockchain, DeFi &amp; Security
          </span>
        </p>

        {/* ============================================================
            NAVIGATION & SOCIAL LINKS
           ============================================================ */}
        <div
          className="vc-animate-rise mt-8 flex flex-col items-center sm:mt-9"
          style={{ animationDelay: "520ms" }}
        >
          {/* Primary CTA: Portfolio */}
          <Link
            ref={btnRef}
            href="/portfolio"
            onPointerEnter={() => setCtaHover(true)}
            onPointerMove={handleBtnMove}
            onPointerLeave={handleBtnLeave}
            className="vc-btn-portfolio group inline-flex items-center gap-3 px-7 py-3.5 font-mono text-[12.5px] uppercase tracking-[0.14em] text-[#111111] sm:px-8 sm:py-3.5 sm:text-[13px]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#111111]/80 transition-transform duration-300 group-hover:scale-125" />
            <span className="font-semibold">Portfolio</span>
            <span className="relative inline-flex h-4 w-4 items-center justify-center overflow-hidden">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-4"
              >
                <path d="M3 8h10" />
                <path d="m9 4 4 4-4 4" />
              </svg>
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute inset-0 m-auto h-3.5 w-3.5 -translate-x-4 transition-transform duration-300 ease-out group-hover:translate-x-0"
              >
                <path d="M3 8h10" />
                <path d="m9 4 4 4-4 4" />
              </svg>
            </span>
          </Link>

          {/* Secondary Social Links */}
          <nav
            aria-label="Social and contact links"
            className="vc-animate-rise mt-6 flex flex-wrap items-center justify-center gap-2 sm:mt-7 sm:gap-2.5"
            style={{ animationDelay: "620ms" }}
          >
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="vc-social-pill inline-flex items-center gap-2 px-3.5 py-2 font-mono text-[11.5px] tracking-[0.06em] sm:px-4 sm:py-2 sm:text-[12px]"
              >
                <span className="text-[#FF8A3D]/85 transition-colors group-hover:text-[#FFB477]">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </main>

      {/* Bottom Peripheral Editorial Metadata */}
      <footer className="relative z-20 flex items-center justify-between px-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#F2F0EB]/28 sm:px-2">
        <span className="hidden sm:inline">SYS // WEB3 · DEFI · SECURITY</span>
        <span className="mx-auto sm:mx-0">UFRPE · COMPUTER ENGINEERING</span>
      </footer>
    </div>
  );
}
