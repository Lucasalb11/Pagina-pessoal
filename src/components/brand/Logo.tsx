import { motion, useReducedMotion } from "framer-motion";

type LogoVariant = "lockup" | "mark" | "stacked";

interface LogoProps {
  variant?: LogoVariant;
  /** Size of the mark in px */
  size?: number;
  className?: string;
  /** Click handler (e.g., scroll to top) */
  onClick?: () => void;
  /** Accessible label */
  label?: string;
}

/**
 * Lucas de Almeida — brand mark
 *
 * The mark encodes the operator → on-chain pivot:
 *  · Squared block frame with a cut corner — signals a settlement block, not a generic Web3 hex.
 *  · Negative-space "L" glyph — Lucas / Ledger.
 *  · A signal diamond sits in the cut corner — the "on-chain node" the operator now plugs into.
 *  · A faint dashed trace links the L's terminus to the node — settlement path.
 *
 * Wordmark uses a tight monospace lockup with a thin divider rule for an executive-document feel.
 */
export const Logo = ({
  variant = "lockup",
  size = 28,
  className = "",
  onClick,
  label = "Lucas de Almeida — home",
}: LogoProps) => {
  const reduce = useReducedMotion();
  const Tag = onClick ? "button" : "div";

  const Mark = (
    <span
      className="relative inline-flex shrink-0"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="lda-holo" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.9} />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity={0.85} />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.9} />
          </linearGradient>
          <linearGradient id="lda-fill" x1="0" y1="32" x2="32" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>

        {/* Outer container — squared block with cut corner (top-right) */}
        <motion.path
          d="M 3 4 L 24 4 L 28 8 L 28 28 L 3 28 Z"
          stroke="hsl(var(--foreground))"
          strokeOpacity={0.4}
          strokeWidth={1.2}
          strokeLinejoin="miter"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Holographic frame on hover */}
        <motion.path
          d="M 3 4 L 24 4 L 28 8 L 28 28 L 3 28 Z"
          stroke="url(#lda-holo)"
          strokeWidth={1.4}
          strokeLinejoin="miter"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Faint dashed trace — settlement path from L terminus to node */}
        <motion.path
          d="M 21 22 L 26 7"
          stroke="hsl(var(--primary))"
          strokeOpacity={0.35}
          strokeWidth={0.8}
          strokeDasharray="1.5 1.5"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />

        {/* Inner L glyph — bold negative space, solid fill */}
        <motion.path
          d="M 8 9 L 12 9 L 12 22 L 21 22 L 21 25 L 8 25 Z"
          fill="hsl(var(--foreground))"
          initial={reduce ? false : { opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* L glyph — primary accent overlay on hover */}
        <motion.path
          d="M 8 9 L 12 9 L 12 22 L 21 22 L 21 25 L 8 25 Z"
          fill="url(#lda-fill)"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Cut-corner triangle — primary fill, the "block cut" signal */}
        <motion.path
          d="M 24 4 L 28 8 L 24 8 Z"
          fill="hsl(var(--primary))"
          fillOpacity={0.7}
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 0.4, delay: 1.0, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transformOrigin: "26px 6px" }}
        />

        {/* Settlement node — small diamond inside the cut corner */}
        <motion.rect
          x={24.5}
          y={4.5}
          width={2.5}
          height={2.5}
          fill="hsl(var(--primary))"
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, delay: 1.15, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            filter: "drop-shadow(0 0 4px hsl(var(--primary) / 0.8))",
            transformOrigin: "25.75px 5.75px",
          }}
        />

        {/* Bottom baseline tick — anchors the mark as a "block" */}
        <motion.line
          x1={3}
          y1={28}
          x2={28}
          y2={28}
          stroke="hsl(var(--primary))"
          strokeOpacity={0.6}
          strokeWidth={1.2}
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        />
      </svg>

      {/* Pulse halo on hover */}
      <span className="pointer-events-none absolute -inset-1 rounded-md bg-primary/0 group-hover:bg-primary/8 blur-md transition-all duration-500" />
    </span>
  );

  const Wordmark = (
    <span className="flex items-center gap-2 leading-none">
      <span className="font-mono font-bold text-[13px] sm:text-sm tracking-[0.22em] text-foreground">
        LDA
      </span>
      <span className="hidden sm:inline-block w-px h-3 bg-foreground/25" />
      <span className="hidden sm:inline font-mono text-[9px] tracking-[0.32em] uppercase text-muted-foreground">
        on-chain
      </span>
    </span>
  );

  const Stacked = (
    <span className="flex flex-col gap-0.5 leading-none">
      <span className="font-mono font-bold text-[12px] tracking-[0.22em] text-foreground">
        LDA
      </span>
      <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-muted-foreground">
        on-chain
      </span>
    </span>
  );

  return (
    <Tag
      onClick={onClick}
      aria-label={label}
      className={`group inline-flex items-center gap-2.5 ${onClick ? "cursor-pointer" : ""} ${className}`}
      data-cursor="hover"
    >
      {Mark}
      {variant === "lockup" && Wordmark}
      {variant === "stacked" && Stacked}
    </Tag>
  );
};

export default Logo;
