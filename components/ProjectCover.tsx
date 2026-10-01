import type { Project } from "@/data/projects";

/**
 * Generated cover for projects without a live screenshot: the protocol's core
 * flow drawn as a small diagram. Replaced by a screenshot once the project is
 * deployed (see ROADMAP.md, phase 2).
 */
export default function ProjectCover({ project, live }: { project: Project; live: boolean }) {
  const steps = project.flow;
  const W = 640;
  const H = 400;
  const boxW = 128;
  const boxH = 44;
  const gap = (W - 80 - steps.length * boxW) / Math.max(steps.length - 1, 1);
  const y = 214;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`${project.name}: ${steps.join(", then ")}`}
      className="h-full w-full"
    >
      <defs>
        <pattern id={`grid-${project.id}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="#1a2420" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="#0f1613" />
      <rect width={W} height={H} fill={`url(#grid-${project.id})`} />
      <text x="40" y="96" fill="#e4eee8" fontSize="40" fontWeight="600" letterSpacing="-1" fontFamily="var(--font-geist), system-ui, sans-serif">
        {project.name}
      </text>
      <text x="40" y="128" fill="#6f807a" fontSize="15" fontFamily="var(--font-geist-mono), ui-monospace, monospace">
        {project.chain.toLowerCase()} · {project.stack[0].toLowerCase()}
      </text>
      {steps.map((step, i) => {
        const x = 40 + i * (boxW + gap);
        const last = i === steps.length - 1;
        return (
          <g key={step}>
            <rect
              x={x}
              y={y}
              width={boxW}
              height={boxH}
              rx="6"
              fill={last ? "#14241d" : "#141d19"}
              stroke={last ? "#5fcf9c" : "#2c3b35"}
            />
            <text
              x={x + boxW / 2}
              y={y + boxH / 2 + 5}
              textAnchor="middle"
              fill={last ? "#9df2c9" : "#a3b3ac"}
              fontSize="14"
              fontFamily="var(--font-geist-mono), ui-monospace, monospace"
            >
              {step}
            </text>
            {!last ? (
              <path
                d={`M${x + boxW + 6} ${y + boxH / 2} H${x + boxW + gap - 6}`}
                stroke="#2c3b35"
                strokeWidth="1.5"
              />
            ) : null}
          </g>
        );
      })}
      {!live ? (
        <text x="40" y="350" fill="#f0b865" fontSize="13" fontFamily="var(--font-geist-mono), ui-monospace, monospace">
          demo redeploy in progress
        </text>
      ) : null}
    </svg>
  );
}
