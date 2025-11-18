import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, ChevronDown, Code2, Shield, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 gradient-subtle opacity-50" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          {/* Badge */}
          <div className="flex justify-center">
            <Badge variant="outline" className="px-4 py-1.5 text-sm border-primary/30 bg-primary/5">
              <Code2 className="w-3 h-3 mr-2" />
              Senior Blockchain Developer
            </Badge>
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              Lucas de <span className="text-gradient">Almeida</span>
            </h1>
            <div className="space-y-3">
              <p className="text-2xl md:text-3xl font-semibold text-foreground/90">
                Senior Blockchain & Smart Contract Developer
              </p>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Specializing in <span className="text-primary font-medium">Solidity</span>, <span className="text-primary font-medium">Rust</span>, and <span className="text-primary font-medium">Web3</span> infrastructure
              </p>
            </div>
          </div>
          
          {/* Expertise badges */}
          <div className="flex flex-wrap gap-3 justify-center pt-4">
            <Badge variant="secondary" className="px-4 py-1.5">
              <Shield className="w-3 h-3 mr-2" />
              Smart Contracts
            </Badge>
            <Badge variant="secondary" className="px-4 py-1.5">
              <Zap className="w-3 h-3 mr-2" />
              DeFi Protocols
            </Badge>
            <Badge variant="secondary" className="px-4 py-1.5">
              <Code2 className="w-3 h-3 mr-2" />
              Security Auditing
            </Badge>
          </div>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed pt-4">
            Building secure, scalable, and privacy-focused blockchain solutions. Expert in EVM (Solidity + Hardhat/Foundry), 
            Solana (Rust + Anchor), and Soroban (Stellar). Passionate about decentralized finance, tokenomics, and on-chain analytics.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center pt-6">
            <Button variant="default" size="lg" className="px-8" asChild>
              <a href="#projects">
                View Portfolio
              </a>
            </Button>
            <Button variant="outline" size="lg" className="px-8" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
          
          <div className="flex gap-4 justify-center pt-6">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-12 w-12 hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-smooth"
              asChild
            >
              <a href="https://github.com/Lucasalb11" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-12 w-12 hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-smooth"
              asChild
            >
              <a href="https://www.linkedin.com/in/lucasalb11/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-12 w-12 hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-smooth"
              asChild
            >
              <a href="#contact" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
