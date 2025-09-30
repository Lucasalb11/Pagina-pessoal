import { Card } from "@/components/ui/card";
import { Code2, Shield, TrendingUp, Lightbulb } from "lucide-react";
import profileImage from "@/assets/profile.jpeg";

const About = () => {
  const focuses = [
    {
      icon: Code2,
      title: "Smart Contracts",
      description: "Solidity, Hardhat, Foundry development",
    },
    {
      icon: Shield,
      title: "Privacy-First",
      description: "Privacy-preserving Web3 solutions",
    },
    {
      icon: TrendingUp,
      title: "DeFi",
      description: "Decentralized finance protocols",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Blockchain explorers & analytics",
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/30 shadow-elegant glow-primary">
                <img 
                  src={profileImage} 
                  alt="Lucas de Almeida" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              About <span className="text-gradient">Me</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Passionate about building the future of decentralized technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {focuses.map((focus) => (
              <Card
                key={focus.title}
                className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-smooth hover:glow-primary group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center group-hover:glow-primary transition-smooth">
                    <focus.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{focus.title}</h3>
                    <p className="text-muted-foreground text-sm">{focus.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-8 bg-card/50 backdrop-blur border-border">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gradient-accent">Currently Learning</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">▹</span>
                  <span>Blockchain interoperability and cross-chain solutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">▹</span>
                  <span>Privacy-preserving Web3 technologies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">▹</span>
                  <span>Scaling strategies and tokenomics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">▹</span>
                  <span>Rust for smart contracts and system-level blockchain tools</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
