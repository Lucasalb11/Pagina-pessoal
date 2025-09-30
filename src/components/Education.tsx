import { Card } from "@/components/ui/card";
import { GraduationCap, BookOpen, Award } from "lucide-react";

const Education = () => {
  const education = [
    {
      icon: GraduationCap,
      title: "UFPE - Universidade Federal de Pernambuco",
      subtitle: "Ciências Econômicas",
      description: "Formação em economia com foco em análise financeira e mercados",
    },
    {
      icon: Award,
      title: "NearX",
      subtitle: "Scale Web3 Developer Program",
      description: "Intensive Web3 development and scaling strategies",
    },
    {
      icon: BookOpen,
      title: "The Rust Programming Language",
      subtitle: "Self-Study & Practice",
      description: "Mastering Rust fundamentals for system-level programming",
    },
  ];

  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Education & <span className="text-gradient">Learning</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Continuous learning and professional development
            </p>
          </div>

          <div className="space-y-6">
            {education.map((item) => (
              <Card
                key={item.title}
                className="p-6 bg-card/50 backdrop-blur border-border hover:border-accent/50 transition-smooth hover:glow-accent group"
              >
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-smooth">
                    <item.icon className="w-7 h-7 text-accent" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-primary font-medium">{item.subtitle}</p>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
