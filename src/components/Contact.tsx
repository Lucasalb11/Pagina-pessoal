import { Github, Linkedin, Mail, ArrowUpRight, Twitter } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { useLang } from "@/hooks/useLang";

const CONTACTS = [
  { icon: Mail,     label: "EMAIL",    handle: "lucasalb11@gmail.com",                 href: "mailto:lucasalb11@gmail.com" },
  { icon: Linkedin, label: "LINKEDIN", handle: "lucasalb11",                           href: "https://www.linkedin.com/in/lucasalb11/" },
  { icon: Twitter,  label: "X",        handle: "@Lucasalb11",                          href: "https://x.com/Lucasalb11" },
  { icon: Github,   label: "GITHUB",   handle: "@Lucasalb11",                          href: "https://github.com/Lucasalb11" },
];

const Contact = () => {
  const { t } = useLang();
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1400px] h-[600px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-[1100px] mx-auto">
          <Reveal className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-primary" />
              <span className="font-code text-[10px] text-primary tracking-[0.3em] uppercase">
                {t("contact.kicker")}
              </span>
            </div>
            <h2 className="text-display text-3xl sm:text-4xl lg:text-[3.5rem] leading-[1.1] max-w-3xl mb-6">
              {t("contact.title")}
            </h2>
            <p className="max-w-[640px] text-base sm:text-[17px] leading-relaxed text-foreground/80">
              {t("contact.body")}
            </p>
          </Reveal>

          <Reveal>
            <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end border-t border-border pt-10">
              <div>
                <p className="font-code text-[10px] text-muted-foreground tracking-[0.3em] uppercase mb-4">
                  Reach
                </p>
                <div>
                  {CONTACTS.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target={c.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      data-cursor-label={c.label}
                      className="group flex items-center justify-between gap-6 py-3 border-b border-border/60 last:border-b-0 hover:pl-3 transition-all"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <c.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                        <div className="min-w-0">
                          <div className="font-display text-base lg:text-lg text-foreground group-hover:text-primary transition-colors">
                            {c.label}
                          </div>
                          <p className="font-code text-xs text-muted-foreground">{c.handle}</p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 items-start lg:items-end">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-code text-[10px] text-primary tracking-[0.22em] uppercase">
                    {t("contact.status")}
                  </span>
                </span>
                <a
                  href="mailto:lucasalb11@gmail.com"
                  data-cursor="hover"
                  data-cursor-label="lucasalb11@gmail.com"
                  className="group inline-flex items-center gap-2 pl-6 pr-5 py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-all duration-300 shadow-[0_0_50px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_80px_hsl(var(--primary)/0.7)]"
                >
                  Send an email
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <p className="font-code text-[10px] tracking-[0.22em] uppercase text-muted-foreground mt-2">
                  {t("contact.signoff")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
