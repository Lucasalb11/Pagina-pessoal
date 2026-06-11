import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Cursor-reactive liquid blob field.
 *
 * SVG goo filter (feGaussianBlur + feColorMatrix) over a handful of
 * slow-drifting circles + one circle that follows the cursor.
 * Renders inside a relative parent (absolute inset-0).
 *
 * Cheap: pure SVG/CSS, no canvas raf when reduced-motion or off-screen.
 */
export const LiquidBackground = ({ className = "" }: { className?: string }) => {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (reduce) return;
    const wrap = wrapRef.current;
    const follower = followerRef.current;
    if (!wrap || !follower) return;

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let raf = 0;
    let bounds = wrap.getBoundingClientRect();

    const updateBounds = () => {
      bounds = wrap.getBoundingClientRect();
    };

    const onMove = (e: PointerEvent) => {
      // map global pointer to local SVG coords (0..1000)
      const rect = bounds;
      const xPct = (e.clientX - rect.left) / Math.max(rect.width, 1);
      const yPct = (e.clientY - rect.top) / Math.max(rect.height, 1);
      targetX = Math.max(0, Math.min(1, xPct)) * 1000;
      targetY = Math.max(0, Math.min(1, yPct)) * 600;
    };

    const tick = () => {
      // ease toward target
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      follower.setAttribute("cx", curX.toFixed(1));
      follower.setAttribute("cy", curY.toFixed(1));
      raf = requestAnimationFrame(tick);
    };

    // seed center
    targetX = 500;
    targetY = 300;
    curX = 500;
    curY = 300;

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", updateBounds, { passive: true });
    window.addEventListener("resize", updateBounds);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", updateBounds);
      window.removeEventListener("resize", updateBounds);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        style={{ filter: "url(#liquid-goo)" }}
      >
        <defs>
          <filter id="liquid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 22 -10"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
          <radialGradient id="blob-orange" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(20 95% 56%)" stopOpacity={0.95} />
            <stop offset="100%" stopColor="hsl(20 95% 56%)" stopOpacity={0.4} />
          </radialGradient>
          <radialGradient id="blob-amber" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(35 100% 62%)" stopOpacity={0.85} />
            <stop offset="100%" stopColor="hsl(35 100% 62%)" stopOpacity={0.3} />
          </radialGradient>
          <radialGradient id="blob-cyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(197 91% 56%)" stopOpacity={0.7} />
            <stop offset="100%" stopColor="hsl(197 91% 56%)" stopOpacity={0.2} />
          </radialGradient>
        </defs>

        <g>
          {/* drifting blobs */}
          <circle cx="200" cy="200" r="120" fill="url(#blob-orange)">
            {!reduce && (
              <animate
                attributeName="cx"
                values="200;320;180;260;200"
                dur="22s"
                repeatCount="indefinite"
              />
            )}
            {!reduce && (
              <animate
                attributeName="cy"
                values="200;320;240;180;200"
                dur="26s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          <circle cx="800" cy="400" r="140" fill="url(#blob-amber)">
            {!reduce && (
              <animate
                attributeName="cx"
                values="800;680;820;740;800"
                dur="28s"
                repeatCount="indefinite"
              />
            )}
            {!reduce && (
              <animate
                attributeName="cy"
                values="400;300;420;360;400"
                dur="24s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          <circle cx="500" cy="100" r="90" fill="url(#blob-cyan)">
            {!reduce && (
              <animate
                attributeName="cx"
                values="500;420;560;520;500"
                dur="30s"
                repeatCount="indefinite"
              />
            )}
            {!reduce && (
              <animate
                attributeName="cy"
                values="100;180;140;120;100"
                dur="22s"
                repeatCount="indefinite"
              />
            )}
          </circle>

          {/* cursor follower */}
          <circle ref={followerRef} cx="500" cy="300" r="80" fill="url(#blob-orange)" opacity={0.9} />
        </g>
      </svg>

      {/* fade-to-bg mask so blobs don't bleed past section */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background pointer-events-none" />
    </div>
  );
};

export default LiquidBackground;
