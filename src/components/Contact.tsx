import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";

const Contact = () => {
  const contacts = [
    {
      icon: Github,
      label: "GitHub",
      value: "@Lucasalb11",
      href: "https://github.com/Lucasalb11",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Lucas de Almeida",
      href: "https://www.linkedin.com/in/lucasalb11/",
    },
    {
      icon: Mail,
      label: "Email",
      value: "lucasalb11@gmail.com",
      href: "mailto:lucasalb11@gmail.com",
    },
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Open to collaborations and new opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {contacts.map((contact) => (
              <Card
                key={contact.label}
                className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-smooth hover:glow-primary text-center group"
              >
                <a
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="space-y-4 block"
                >
                  <div className="w-12 h-12 mx-auto rounded-lg gradient-primary flex items-center justify-center group-hover:glow-primary transition-smooth">
                    <contact.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{contact.label}</h3>
                    <p className="text-sm text-muted-foreground">{contact.value}</p>
                  </div>
                </a>
              </Card>
            ))}
          </div>

          <div className="text-center pt-8">
            <p className="text-muted-foreground mb-6">
              Interested in Web3, blockchain development, or DeFi?
            </p>
            <Button variant="hero" size="lg" asChild>
              <a href="https://www.linkedin.com/in/lucasalb11/" target="_blank" rel="noopener noreferrer">
                <Mail className="w-5 h-5" />
                Reach Out on LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
