import { Badge } from "@/components/ui/badge";

const Skills = () => {
  const skillCategories = [
    {
      title: "Blockchain & Web3",
      skills: ["Solidity", "Hardhat", "Foundry", "Smart Contracts", "DeFi", "Web3.js"],
    },
    {
      title: "Programming Languages",
      skills: ["Rust", "JavaScript", "TypeScript", "HTML5", "CSS3"],
    },
    {
      title: "Tools & Technologies",
      skills: ["Node.js", "Git", "VS Code", "Ubuntu", "Linux"],
    },
    {
      title: "Focus Areas",
      skills: ["Privacy Tech", "Blockchain Analytics", "Tokenomics", "On-chain Analysis"],
    },
  ];

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Tech <span className="text-gradient">Stack</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Technologies and tools I work with
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="space-y-4 p-6 rounded-lg bg-card/30 backdrop-blur border border-border hover:border-primary/30 transition-smooth"
              >
                <h3 className="text-xl font-semibold text-gradient-accent">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-secondary/50 hover:bg-primary/20 hover:border-primary/50 transition-smooth"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
