import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Grain from "@/components/system/Grain";
import { Reveal } from "@/components/motion/Reveal";
import { getChainBySlug, getProjectsForChain, type Ship } from "@/data/projects.config";

const STATUS_STYLES: Record<Ship["status"], string> = {
  LIVE:  "bg-primary/10 text-primary border-primary/30",
  BUILT: "bg-onchain text-onchain border-onchain",
  WIP:   "bg-secondary/60 text-muted-foreground border-border",
};

const ChainProjects = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const chain = getChainBySlug(slug);

  if (!chain) {
    return (
      <div className="min-h-screen relative">
        <Grain />
        <Navbar />
        <section className="pt-40 pb-32 container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="font-code text-[10px] text-primary tracking-[0.3em] uppercase mb-4">404 · CHAIN</p>
            <h1 className="text-display text-4xl sm:text-5xl lg:text-6xl leading-[0.95] mb-6">
              Unknown chain.
            </h1>
            <p className="text-muted-foreground mb-8">No chain matches "{slug}".</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:border-foreground/40 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const projects = getProjectsForChain(chain);

  return (
    <div className="min-h-screen relative">
      <Grain />
      <Navbar />

      <section className="pt-32 sm:pt-36 pb-20 relative overflow-hidden">
        <div className="absolute top-12 right-4 sm:right-12 section-marker">{chain.id}</div>
        <div className="absolute -top-20 -right-20 w-[520px] h-[520px] bg-primary/12 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-[1100px] mx-auto">
            <Reveal className="mb-10">
              <Link
                to="/#shipped"
                className="inline-flex items-center gap-2 font-code text-[10px] tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="w-3 h-3" />
                Back to all builds
              </Link>

              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <span className="w-12 h-px bg-primary" />
                <span className="font-code text-[10px] text-primary tracking-[0.3em] uppercase">
                  CHAIN · {chain.id}
                </span>
                <span className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full border border-primary/30 bg-primary/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-code text-[9px] tracking-[0.22em] uppercase text-primary">
                    {projects.length} {projects.length === 1 ? "PROJECT" : "PROJECTS"}
                  </span>
                </span>
              </div>

              <h1 className="text-display text-4xl sm:text-5xl lg:text-[5rem] leading-[0.95] mb-6">
                {chain.name}.
              </h1>
              <p className="font-serif italic text-lg lg:text-xl text-muted-foreground max-w-2xl leading-snug mb-3">
                {chain.focus}
              </p>
              <p className="text-sm sm:text-base text-muted-foreground/90 max-w-2xl leading-relaxed">
                {chain.blurb}
              </p>
            </Reveal>

            {projects.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4 lg:gap-5 mt-12">
                {projects.map((s, i) => (
                  <Reveal key={s.id} delay={(i % 2) * 0.06}>
                    <motion.a
                      href={s.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 220, damping: 22 }}
                      className="group block h-full p-6 rounded-3xl border border-border bg-surface/50 backdrop-blur-sm hover:border-foreground/30 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <span className={`font-code text-[9px] tracking-[0.22em] uppercase px-2 py-0.5 rounded-full border ${STATUS_STYLES[s.status]}`}>
                          {s.status}
                        </span>
                        <span className="font-code text-[9px] text-muted-foreground tracking-[0.22em] uppercase">
                          {s.ecosystem}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl leading-tight mb-2 group-hover:text-primary transition-colors">
                        {s.name}
                      </h3>
                      <p className="font-serif italic text-sm text-foreground/80 mb-3">
                        {s.tagline}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {s.body}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {s.stack.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded-full font-code text-[9px] text-foreground/60 bg-secondary/50 border border-border/50">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-border/60">
                        <div>
                          <div className="font-display text-base text-foreground">{s.metric}</div>
                          <div className="font-code text-[9px] text-muted-foreground tracking-[0.18em] uppercase">{s.metricLabel}</div>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </motion.a>
                  </Reveal>
                ))}
              </div>
            ) : (
              <Reveal className="mt-12">
                <div className="p-8 rounded-3xl border border-dashed border-border bg-surface/40">
                  <p className="font-code text-[10px] text-primary tracking-[0.3em] uppercase mb-3">
                    NO SHIPS YET — IN THE QUEUE
                  </p>
                  <p className="font-serif italic text-xl text-foreground/90 mb-2">
                    Builds for {chain.name} are next on the bench.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                    The portfolio rotates as I ship. If you want to collaborate on something for {chain.name}, the contact section is the fastest way in.
                  </p>
                  <Link
                    to="/#contact"
                    className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors"
                  >
                    Get in touch
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>
            )}

            <Reveal className="mt-14 flex items-center justify-between gap-4 flex-wrap">
              <a
                href="https://github.com/Lucasalb11"
                target="_blank"
                rel="noopener noreferrer"
                className="link-bracket inline-flex items-center gap-2 font-code text-[11px] tracking-[0.22em] uppercase text-foreground hover:text-primary transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                MORE ON GITHUB
              </a>
              <Link
                to="/#shipped"
                className="inline-flex items-center gap-2 font-code text-[11px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                ALL CHAINS
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ChainProjects;
