import { useSpotlight } from "@/hooks/useSpotlight";

/**
 * The full-viewport masking layer that paints the dark canvas everywhere
 * EXCEPT the small radius around the cursor — letting the emerald "reveal"
 * layer underneath show through.
 *
 * Mount once at the root.
 */
const SpotlightLayer = () => {
  useSpotlight();
  return <div className="spot-mask" aria-hidden />;
};

export default SpotlightLayer;
