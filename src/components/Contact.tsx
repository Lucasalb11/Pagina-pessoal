import { Github, Linkedin, Mail, ArrowUpRight, Users, Rocket, Code2 } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const CONTACTS = [
  {
    icon:   Mail,
    label:  "Email",
    handle: "lucasalb11@gmail.com",
    href:   "mailto:lucasalb11@gmail.com",
    desc:   "Direct line · fast response",
    primary: true,
  },
  {
    icon:   Linkedin,
    label:  "LinkedIn",
    handle: "Lucas de Almeida",
    href:   "https://www.linkedin.com/in/lucasalb11/",
    desc:   "Let's connect professionally",
  },
  {
    icon:   Github,
    label:  "GitHub",
    handle: "@Lucasalb11",
    href:   "https://github.com/Lucasalb11",
    desc:   "See what I'm building",
  },
];

const AUDIENCES = [
  { icon: Code2,  title: "Builders & Hackers", body: "Working on something interesting in DeFi or on-chain tooling? I want to build with you." },
  { icon: Rocket, title: "Startup Teams",      body: "Early-stage team needing someone who ships code AND understands the business layer? Let's talk." },
  { icon: Users,  title: "Hackathon Partners", body: "Looking for a Web3 builder for your next hackathon? Engineering + product thinking." },
];

const Contact = () => (
  <section id="contact" className="py-32 relative overflow-hidden">

    {/* Horizon glow */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1400px] h-[600px] bg-primary/15 rounded-full blur-[160px] pointer-events-none" />
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent" />

    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <Reveal className="mb-16 lg:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-px bg-primary" />
            <span className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase">The Closer</span>
          </div>
        </Reveal>

        {/* Massive closing statement */}
        <Reveal className="mb-20">
          <h2 className="text-display text-6xl sm:text-8xl lg:text-[11rem] xl:text-[14rem] leading-[0.82] tracking-[-0.06em]">
            Let's build<br />
            <span className="font-serif italic font-normal text-gradient">something real.</span>
          </h2>
          <p className="text-base lg:text-xl text-muted-foreground mt-10 max-w-2xl leading-relaxed">
            I'm not looking for just any opportunity. I want to work on things that actually
            matter — products that move capital, create transparency, and give power back to
            builders and users.
          </p>
        </Reveal>

        {/* Audience pills */}
        <Reveal className="mb-20">
          <div className="grid sm:grid-cols-3 gap-4">
            {AUDIENCES.map((a, i) => (
              <div key={a.title} className="group p-6 rounded-3xl border border-border bg-card/40 backdrop-blur-sm hover:border-foreground/30 transition-all">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-10 h-10 rounded-2xl border border-border flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-all">
                    <a.icon className="w-4 h-4 text-foreground/80 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="font-serif italic text-2xl text-muted-foreground/40">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Contact links — list with massive CTA */}
        <Reveal>
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end border-t border-border pt-12">

            <div className="space-y-1">
              <p className="font-mono text-[10px] text-muted-foreground tracking-[0.3em] uppercase mb-4">Reach me</p>
              {CONTACTS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-6 py-4 border-b border-border last:border-b-0 hover:pl-3 transition-all"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <c.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-xl lg:text-2xl text-foreground group-hover:text-primary transition-colors">
                          {c.label}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono hidden sm:inline">{c.desc}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{c.handle}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3 items-start lg:items-end">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-400/30 bg-green-400/5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] text-green-400 font-mono tracking-[0.2em] uppercase">Available Now</span>
              </div>
              <a
                href="mailto:lucasalb11@gmail.com"
                className="group inline-flex items-center gap-2 pl-6 pr-5 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 shadow-[0_0_50px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_80px_hsl(var(--primary)/0.7)]"
              >
                Send an email
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <div className="flex flex-wrap gap-1.5 mt-2 max-w-xs justify-end">
                {["Full-time", "Founding team", "Hackathons", "Freelance"].map((t) => (
                  <span key={t} className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-secondary/60 text-muted-foreground border border-border">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Contact;
