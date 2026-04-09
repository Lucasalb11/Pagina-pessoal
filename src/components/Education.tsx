import { GraduationCap, BookOpen, Award } from "lucide-react";

const EDUCATION = [
  {
    icon:        GraduationCap,
    institution: "UFPE",
    title:       "Universidade Federal de Pernambuco",
    subtitle:    "Ciências Econômicas",
    description: "Formação em economia com foco em análise financeira e mercados. Base quantitativa aplicada ao desenvolvimento de protocolos DeFi.",
    tag:         "Degree",
    tagColor:    "primary",
  },
  {
    icon:        Award,
    institution: "NearX",
    title:       "NearX Academy",
    subtitle:    "Scale Web3 Developer Program",
    description: "Intensive Web3 development program covering scaling strategies, DeFi architecture, and modern smart contract patterns.",
    tag:         "Program",
    tagColor:    "accent",
  },
  {
    icon:        BookOpen,
    institution: "Self",
    title:       "The Rust Programming Language",
    subtitle:    "Self-Study & Practice",
    description: "Mastering Rust fundamentals for system-level programming, applied to Solana/Anchor development and blockchain tooling.",
    tag:         "Self-study",
    tagColor:    "primary",
  },
];

const Education = () => {
  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="flex items-end gap-6 mb-16 relative">
            <span className="section-number select-none absolute -top-4 left-0 leading-none">04</span>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px bg-primary" />
                <span className="font-mono text-xs text-primary tracking-[0.2em] uppercase">Education</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">
                Learning &{" "}
                <span className="text-gradient">Growth</span>
              </h2>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />

            <div className="space-y-6">
              {EDUCATION.map((item, index) => (
                <div key={item.title} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-8 w-5 h-5 rounded-full bg-card border-2 border-primary hidden md:flex items-center justify-center z-10 group-hover:bg-primary transition-colors duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:bg-primary-foreground transition-colors duration-300" />
                  </div>

                  <div className="md:ml-20 p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300 border-l-2 border-l-primary/30 hover:border-l-primary">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        {/* Icon */}
                        <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>

                        {/* Text */}
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-foreground">{item.title}</h3>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-wider
                                ${item.tagColor === "primary"
                                  ? "bg-primary/10 text-primary border border-primary/20"
                                  : "bg-accent/10 text-accent border border-accent/20"
                                }`}
                            >
                              {item.tag}
                            </span>
                          </div>
                          <p className="text-primary text-sm font-medium">{item.subtitle}</p>
                          <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                        </div>
                      </div>

                      {/* Institution code */}
                      <span className="font-mono text-3xl font-bold text-foreground/5 select-none shrink-0 self-end sm:self-start">
                        {item.institution}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
