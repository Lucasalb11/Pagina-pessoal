import { Github, Linkedin, Mail, ArrowUpRight, Users, Rocket, Code2 } from "lucide-react";

const CONTACTS = [
  {
    icon:   Github,
    label:  "GitHub",
    handle: "@Lucasalb11",
    href:   "https://github.com/Lucasalb11",
    desc:   "See what I'm building",
  },
  {
    icon:   Linkedin,
    label:  "LinkedIn",
    handle: "Lucas de Almeida",
    href:   "https://www.linkedin.com/in/lucasalb11/",
    desc:   "Let's connect professionally",
  },
  {
    icon:   Mail,
    label:  "Email",
    handle: "lucasalb11@gmail.com",
    href:   "mailto:lucasalb11@gmail.com",
    desc:   "Direct line — I respond fast",
  },
];

const AUDIENCES = [
  {
    icon:  Code2,
    title: "Builders & Hackers",
    body:  "Working on something interesting in DeFi or on-chain tooling? I want to build with you.",
    color: "primary" as const,
  },
  {
    icon:  Rocket,
    title: "Startup Teams",
    body:  "Early-stage team that needs someone who ships code and understands the business layer? Let's talk.",
    color: "accent" as const,
  },
  {
    icon:  Users,
    title: "Hackathon Partners",
    body:  "Looking for a Web3 builder for your next hackathon? I bring both engineering and product thinking.",
    color: "primary" as const,
  },
];

const Contact = () => (
  <section id="contact" className="py-24 relative overflow-hidden">
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="flex items-end gap-6 mb-6 relative">
          <span className="section-number select-none absolute -top-4 left-0 leading-none">06</span>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-primary" />
              <span className="font-mono text-xs text-primary tracking-[0.2em] uppercase">Let's Build</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Got a vision?
              <br />
              <span className="text-gradient">Let's make it real.</span>
            </h2>
          </div>
        </div>

        {/* Sub-headline */}
        <p className="text-muted-foreground text-base md:text-lg max-w-xl mb-12">
          I'm not looking for just any opportunity. I want to work on things that
          actually matter — on-chain products that move capital, create transparency, and
          give power back to builders and users.
        </p>

        {/* Who I want to meet */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {AUDIENCES.map((a) => (
            <div
              key={a.title}
              className={`p-5 rounded-xl bg-card border transition-all duration-300 group hover:scale-[1.01] ${
                a.color === "primary"
                  ? "border-primary/20 hover:border-primary/40"
                  : "border-accent/20 hover:border-accent/40"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                  a.color === "primary"
                    ? "bg-primary/10 group-hover:bg-primary/20"
                    : "bg-accent/10 group-hover:bg-accent/20"
                }`}
              >
                <a.icon className={`w-4 h-4 ${a.color === "primary" ? "text-primary" : "text-accent"}`} />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1.5">{a.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{a.body}</p>
            </div>
          ))}
        </div>

        {/* Contact grid */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">

          {/* Left: contact links */}
          <div className="space-y-4">
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

          {/* Right: CTA box */}
          <div className="p-7 rounded-xl bg-card border border-border">
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                  Available Now
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Ready to ship something great?</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Open to full-time Web3 roles, founding team partnerships, hackathons, and
                  freelance projects where I can bring real impact.
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <a
                  href="https://www.linkedin.com/in/lucasalb11/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-[0_0_30px_hsl(22_100%_55%/0.25)] hover:shadow-[0_0_40px_hsl(22_100%_55%/0.4)] text-sm"
                >
                  Connect on LinkedIn
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="mailto:lucasalb11@gmail.com"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 border border-border text-foreground font-medium rounded-lg hover:border-primary/50 hover:text-primary transition-all duration-200 text-sm"
                >
                  Send an Email
                </a>
              </div>

              <div className="pt-2 space-y-2 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  Remote-friendly · Usually responds within 24h
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Full-time", "Founding Team", "Hackathons", "Freelance"].map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/5 border border-primary/15 text-primary/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
