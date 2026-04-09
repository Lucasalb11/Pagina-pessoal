import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const CONTACTS = [
  {
    icon:   Github,
    label:  "GitHub",
    handle: "@Lucasalb11",
    href:   "https://github.com/Lucasalb11",
    desc:   "Source code & repositories",
  },
  {
    icon:   Linkedin,
    label:  "LinkedIn",
    handle: "Lucas de Almeida",
    href:   "https://www.linkedin.com/in/lucasalb11/",
    desc:   "Professional network",
  },
  {
    icon:   Mail,
    label:  "Email",
    handle: "lucasalb11@gmail.com",
    href:   "mailto:lucasalb11@gmail.com",
    desc:   "Direct contact",
  },
];

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="flex items-end gap-6 mb-16 relative">
            <span className="section-number select-none absolute -top-4 left-0 leading-none">05</span>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px bg-primary" />
                <span className="font-mono text-xs text-primary tracking-[0.2em] uppercase">Contact</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Let's Build
                <br />
                <span className="text-gradient">Something.</span>
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_360px] gap-12 items-start">
            {/* Left — contact cards */}
            <div className="space-y-4">
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg">
                Open to collaborations in Web3, DeFi, and blockchain infrastructure.
                Reach out via any channel below.
              </p>

              {CONTACTS.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <contact.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold text-foreground">{contact.label}</span>
                      <span className="text-xs text-muted-foreground font-mono">{contact.desc}</span>
                    </div>
                    <p className="text-sm text-primary/80 mt-0.5 truncate">{contact.handle}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0" />
                </a>
              ))}
            </div>

            {/* Right — CTA card */}
            <div className="p-8 rounded-xl bg-card border border-border">
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                    Available for Work
                  </span>
                </div>
                <h3 className="text-xl font-bold">Interested in working together?</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  I'm currently available for freelance projects, audits, and full-time
                  opportunities in the blockchain and Web3 space.
                </p>
                <div className="space-y-3 pt-2">
                  <a
                    href="https://www.linkedin.com/in/lucasalb11/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-[0_0_30px_hsl(22_100%_55%/0.25)] hover:shadow-[0_0_40px_hsl(22_100%_55%/0.4)]"
                  >
                    Connect on LinkedIn
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:lucasalb11@gmail.com"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 border border-border text-foreground font-medium rounded-lg hover:border-primary/50 hover:text-primary transition-all duration-200"
                  >
                    Send an Email
                  </a>
                </div>
                <p className="text-xs text-muted-foreground text-center pt-2">
                  Remote-friendly · Usually responds within 24h
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
