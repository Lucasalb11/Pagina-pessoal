import { forwardRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";

interface MagneticPillProps {
  children: ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
  strength?: number;
  range?: number;
  "data-cursor-label"?: string;
}

const MagneticPill = forwardRef<HTMLAnchorElement, MagneticPillProps>(
  ({ children, className = "", strength = 0.3, range = 140, ...rest }, _ref) => {
    const { ref, x, y } = useMagnetic<HTMLAnchorElement>({ strength, range });
    return (
      <motion.a
        ref={ref}
        style={{ x, y }}
        data-cursor="hover"
        data-magnetic
        className={className}
        {...rest}
      >
        {children}
      </motion.a>
    );
  }
);

MagneticPill.displayName = "MagneticPill";
export default MagneticPill;
