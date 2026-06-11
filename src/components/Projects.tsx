import { useEffect, useState } from "react";
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  Loader2,
  Code2,
  RefreshCw,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchGitHubRepos, enrichReposWithImages, Project } from "@/lib/github";
import { useProjects } from "@/hooks/useProjects";
import { toast } from "sonner";
import { Reveal } from "@/components/motion/Reveal";

const GITHUB_USERNAME = "Lucasalb11";

/** Curated featured ships — shown first, always. */
const FEATURED: Array<{
  title: string;
  tag: string;
  description: string;
  tech: string[];
  link: string;
  metric: string;
  metricLabel: string;
  context: string;
}> = [
  {
    title: "Structa.finance",
    tag: "Solana Frontier Hackathon",
    description:
      "On-chain structured products platform built on Solana. Programmable yield strategies with transparent risk profiles — bringing TradFi-grade structuring to DeFi.",
    tech: ["Rust", "Anchor", "Solana", "TypeScript", "React"],
    link: "https://github.com/Lucasalb11/structa-finance",
    metric: "Hackathon",
    metricLabel: "Solana Frontier",
    context: "Hackathon build · Rust + Anchor",
  },
];

const MARQUEE_ITEMS = [
  "Solidity", "Rust", "Web3", "DeFi", "Smart Contracts", "Solana", "Anchor",
  "Ethereum", "Foundry", "Soroban", "Stellar", "EVM",
  "TypeScript", "React", "On-Chain Analytics", "Tokenomics",
];

const CATEGORIES = [
  { label: "All",           value: "all" },
  { label: "Blockchain",    value: "blockchain", keywords: ["solidity", "ethereum", "evm", "hardhat", "foundry", "smart-contract", "blockchain", "web3"] },
  { label: "Rust · Solana", value: "solana",     keywords: ["rust", "solana", "anchor", "soroban", "stellar"] },
  { label: "DeFi",          value: "defi",       keywords: ["defi", "protocol", "amm", "swap", "liquidity", "yield", "finance"] },
];

/** Drop noise: undescribed repos, Jupyter notebooks, tutorial dumps. */
const isQualityProject = (p: Project) => {
  if (!p.description || p.description === "No description available") return false;
  const lang = (p.language || "").toLowerCase();
  if (lang === "jupyter notebook" || lang === "html") return false;
  const ttl = p.title.toLowerCase();
  if (/(tutorial|exercise|playground|test|demo|hello)/.test(ttl)) return false;
  return true;
};

const isBlockchainProject = (project: Project) => {
  const kw = [
    "blockchain", "solidity", "smart-contract", "defi", "web3", "ethereum",
    "solana", "stellar", "soroban", "rust", "anchor", "hardhat", "foundry",
  ];
  const t = `${project.title} ${project.description} ${project.tech.join(" ")}`.toLowerCase();
  return kw.some((k) => t.includes(k));
};

const Projects = () => {
  const { projects, loading, setGitHubProjects, clearCache } = useProjects();
  const queryClient = useQueryClient();
  const [activeFilter, setActiveFilter] = useState("all");
  const [isEnrichingImages, setIsEnrichingImages] = useState(false);

  const { data: githubRepos, isLoading: isLoadingRepos, refetch } = useQuery<Project[]>({
    queryKey: ["github-repos", GITHUB_USERNAME],
    queryFn: () => fetchGitHubRepos(GITHUB_USERNAME),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
    retry: 2,
  });

  const handleRefresh = async () => {
    clearCache();
    queryClient.invalidateQueries({ queryKey: ["github-repos", GITHUB_USERNAME] });
    await refetch();
    toast.success("Projects refreshed from GitHub");
  };

  useEffect(() => {
    if (!githubRepos || githubRepos.length === 0) return;
    setGitHubProjects(githubRepos);
    setIsEnrichingImages(true);
    enrichReposWithImages(githubRepos, GITHUB_USERNAME)
      .then((enriched) => setGitHubProjects(enriched))
      .catch(() => {})
      .finally(() => setIsEnrichingImages(false));
  }, [githubRepos, setGitHubProjects]);

  const isLoading = loading || isLoadingRepos;

  const qualityProjects = projects.filter(isQualityProject);

  const filteredProjects =
    activeFilter === "all"
      ? qualityProjects
      : qualityProjects.filter((p) => {
          const category = CATEGORIES.find((c) => c.value === activeFilter);
          if (!category || !("keywords" in category)) return false;
          const t = `${p.title} ${p.description} ${p.tech.join(" ")} ${p.topics.join(" ")}`.toLowerCase();
          return (category as { keywords: string[] }).keywords.some((kw) => t.includes(kw));
        });

  return (
    <section id="projects" className="py-32 relative overflow-hidden">

      <div className="absolute top-12 left-4 sm:left-12 section-marker">04</div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto">

          {/* Header */}
          <Reveal className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-primary" />
              <span className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase">Products · Ships</span>
            </div>
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <h2 className="text-display text-5xl sm:text-7xl lg:text-[7rem] leading-[0.9]">
                Things I've<br />
                <span className="font-serif italic font-normal text-muted-foreground/80">shipped.</span>
              </h2>
              <button
                onClick={handleRefresh}
                disabled={isLoading || isEnrichingImages}
                data-cursor="hover"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/60 backdrop-blur text-sm text-foreground hover:border-primary/40 hover:bg-primary/10 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading || isEnrichingImages ? "animate-spin" : ""}`} />
                {isEnrichingImages ? "Enriching…" : "Sync"}
              </button>
            </div>
          </Reveal>

          {/* Featured curated ships */}
          <Reveal className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase">Featured</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
              {FEATURED.map((f) => (
                <a
                  key={f.title}
                  href={f.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-cursor-label={f.title}
                  className="group relative grid sm:grid-cols-[1fr_auto] gap-6 p-6 lg:p-8 rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/[0.08] via-card/60 to-transparent backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all"
                >
                  <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-primary/30 rounded-full blur-[120px] pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-700" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      <span className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase px-2 py-1 bg-primary/10 border border-primary/30 rounded-full">
                        Featured
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground tracking-[0.25em] uppercase">
                        {f.tag}
                      </span>
                    </div>
                    <h3 className="text-display text-3xl lg:text-4xl leading-tight mb-2 group-hover:text-primary transition-colors">
                      {f.title}
                    </h3>
                    <p className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase mb-4">
                      {f.context}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-md">
                      {f.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {f.tech.map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-full text-[10px] font-mono text-foreground/70 bg-secondary/60 border border-border/60">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="relative flex flex-col items-end justify-between gap-4">
                    <ArrowUpRight className="w-5 h-5 text-foreground/60 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    <div className="text-right">
                      <div className="font-display text-xl lg:text-2xl font-bold text-primary leading-none">
                        {f.metric}
                      </div>
                      <div className="mt-1 font-mono text-[9px] tracking-[0.25em] uppercase text-muted-foreground">
                        {f.metricLabel}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>

          {/* Marquee */}
          <div className="relative overflow-hidden border-y border-border py-4 mb-12 -mx-4 sm:-mx-6">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <span key={i} className="mx-8 text-base font-serif italic text-muted-foreground">
                  {item}
                  <span className="ml-8 text-primary">●</span>
                </span>
              ))}
            </div>
          </div>

          {/* Filter pills */}
          <Reveal className="mb-8">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setActiveFilter(cat.value)}
                    data-cursor="hover"
                    className={`px-4 py-2 rounded-full text-sm transition-all border ${
                      activeFilter === cat.value
                        ? "bg-foreground text-background border-foreground"
                        : "bg-card/40 text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-muted-foreground/60">
                More open-source on GitHub
              </p>
            </div>
          </Reveal>

          {/* Content */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">
                No projects found{activeFilter !== "all" ? " in this category" : ""}.
              </p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {filteredProjects.map((project, i) => {
                  const isBlockchain = isBlockchainProject(project);
                  const tilt = i % 3 === 0 ? -1.5 : i % 3 === 1 ? 0 : 1.5;
                  return (
                    <Reveal key={project.id} delay={(i % 6) * 0.05}>
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -8, rotate: 0 }}
                        initial={{ rotate: tilt }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        data-cursor="hover"
                        data-cursor-label={project.title}
                        className="group block h-full relative rounded-3xl overflow-hidden border border-border bg-card/60 backdrop-blur-sm hover:border-primary/40 hover:shadow-[0_30px_60px_-20px_hsl(var(--primary)/0.4),_0_0_0_1px_hsl(var(--primary)/0.15)] transition-shadow duration-500"
                      >
                        <div className="relative w-full aspect-[16/10] overflow-hidden">
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/15 via-background to-accent/10 flex items-center justify-center">
                              <Code2 className="w-12 h-12 text-foreground/20" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

                          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ArrowUpRight className="w-3.5 h-3.5 text-foreground" />
                          </div>

                          {isBlockchain && (
                            <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-primary/90 text-primary-foreground text-[9px] font-mono tracking-wider uppercase">
                              ⬢ Chain
                            </div>
                          )}
                        </div>

                        <div className="p-5 space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="font-display text-lg font-semibold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
                              {project.title}
                            </h3>
                            {project.language && (
                              <span className="shrink-0 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                                {project.language}
                              </span>
                            )}
                          </div>

                          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-1">
                            {project.tech.slice(0, 3).map((t) => (
                              <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded text-foreground/60 bg-secondary/60">
                                {t}
                              </span>
                            ))}
                            {project.tech.length > 3 && (
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-muted-foreground/60">
                                +{project.tech.length - 3}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-border/60">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3" /> {project.stars}
                              </span>
                              <span className="flex items-center gap-1">
                                <GitFork className="w-3 h-3" /> {project.forks}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              {project.homepage && (
                                <span
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    window.open(project.homepage, "_blank");
                                  }}
                                  className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary/40 hover:text-primary text-muted-foreground transition-all cursor-pointer"
                                  aria-label="Live demo"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </span>
                              )}
                              <span className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                                <Github className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.a>
                    </Reveal>
                  );
                })}
              </div>

              <Reveal className="mt-16 text-center">
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card/40 text-foreground font-medium hover:border-primary/50 hover:bg-primary/10 transition-all"
                >
                  <Github className="w-4 h-4" />
                  See all on GitHub
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <p className="text-xs text-muted-foreground mt-4 font-mono tracking-wider">
                  {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"} shown
                  {isEnrichingImages && <span className="ml-2 text-primary/60">· enriching previews…</span>}
                </p>
              </Reveal>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
