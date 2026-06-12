/** Cinematic film-grain overlay. Pure CSS — no animation cost. */
const Grain = () => (
  <div className="pointer-events-none fixed inset-0 z-[5] grain" aria-hidden />
);

export default Grain;
