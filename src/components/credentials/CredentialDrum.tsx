import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { CERTS } from "@/data/certs.config";
import CredentialCard from "./CredentialCard";

/**
 * Cylindrical drum of credential cards. Scroll-pinned scene.
 * Falls back to a regular responsive grid on reduced-motion or small screens.
 */
const CredentialDrum = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  if (reduce) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CERTS.map((c) => (
          <div key={c.credentialId}>
            <CredentialCard cert={c} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Mobile / tablet — straight grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-5">
        {CERTS.map((c) => (
          <div key={c.credentialId}>
            <CredentialCard cert={c} />
          </div>
        ))}
      </div>

      {/* Desktop — perspective drum that subtly counter-rotates on scroll */}
      <div ref={ref} className="hidden lg:block">
        <motion.div
          style={{ perspective: 1800 }}
          className="grid grid-cols-4 gap-6 items-stretch"
        >
          {CERTS.map((c, i) => {
            const offset = (i - (CERTS.length - 1) / 2) * 5; // tilt away from center
            return (
              <motion.div
                key={c.credentialId}
                style={{ rotateY: rotate, translateZ: 0 }}
                className="transform-gpu"
              >
                <div style={{ transform: `rotateY(${offset}deg)`, transformStyle: "preserve-3d" }}>
                  <CredentialCard cert={c} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </>
  );
};

export default CredentialDrum;
