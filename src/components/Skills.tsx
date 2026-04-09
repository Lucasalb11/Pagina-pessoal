const SKILL_CATEGORIES = [
  {
    id:     "01",
    title:  "Blockchain & Web3",
    skills: ["Solidity", "Hardhat", "Foundry", "Smart Contracts", "DeFi", "Web3.js", "ethers.js"],
    color:  "primary",
  },
  {
    id:     "02",
    title:  "Rust Ecosystem",
    skills: ["Rust", "Solana", "Anchor", "Soroban", "Stellar", "Cargo"],
    color:  "accent",
  },
  {
    id:     "03",
    title:  "Languages & Frontend",
    skills: ["TypeScript", "JavaScript", "React", "Node.js", "HTML5", "CSS3"],
    color:  "primary",
  },
  {
    id:     "04",
    title:  "Tooling & Focus Areas",
    skills: ["Git", "Linux", "Privacy Tech", "Tokenomics", "On-chain Analytics", "Security Auditing"],
    color:  "accent",
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="flex items-end gap-6 mb-16 relative">
            <span className="section-number select-none absolute -top-4 left-0 leading-none">02</span>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px bg-primary" />
                <span className="font-mono text-xs text-primary tracking-[0.2em] uppercase">Tech Stack</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">
                What I <span className="text-gradient">Build With</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {SKILL_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
              >
                {/* Category header */}
                <div className="flex items-baseline justify-between mb-5">
                  <h3 className="font-semibold text-foreground">{cat.title}</h3>
                  <span className="font-mono text-xs text-muted-foreground">{cat.id}</span>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-md text-xs font-medium border transition-all duration-200 cursor-default
                        ${cat.color === "primary"
                          ? "bg-primary/5 border-primary/15 text-primary/80 hover:bg-primary/15 hover:border-primary/40 hover:text-primary"
                          : "bg-accent/5 border-accent/15 text-accent/80 hover:bg-accent/15 hover:border-accent/40 hover:text-accent"
                        }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Bottom accent line */}
                <div
                  className={`mt-5 h-px w-0 group-hover:w-full transition-all duration-500 ${
                    cat.color === "primary" ? "bg-primary/40" : "bg-accent/40"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
