import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Star, GitFork, Loader2, Code2, Shield, Zap, RefreshCw } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchGitHubRepos, enrichReposWithImages, Project } from "@/lib/github";
import { useProjects } from "@/hooks/useProjects";
import { toast } from "sonner";

const GITHUB_USERNAME = "Lucasalb11";

const MARQUEE_ITEMS = [
  "Solidity", "Rust", "Web3", "DeFi", "Smart Contracts", "Solana", "Anchor",
  "Ethereum", "Foundry", "Hardhat", "Soroban", "Stellar", "EVM",
  "TypeScript", "React", "Node.js", "On-Chain Analytics", "Tokenomics",
];

const CATEGORIES = [
  { label: "All", value: "all" },
  {
    label: "Blockchain",
    value: "blockchain",
    keywords: ["solidity", "ethereum", "evm", "hardhat", "foundry", "smart-contract", "blockchain", "web3"],
  },
  {
    label: "Rust · Solana",
    value: "solana",
    keywords: ["rust", "solana", "anchor", "soroban", "stellar"],
  },
  {
    label: "DeFi",
    value: "defi",
    keywords: ["defi", "protocol", "amm", "swap", "liquidity", "yield", "finance"],
  },
];

const isBlockchainProject = (project: Project) => {
  const blockchainKeywords = [
    "blockchain", "solidity", "smart-contract", "defi", "web3", "ethereum",
    "solana", "stellar", "soroban", "rust", "anchor", "hardhat", "foundry",
  ];
  const searchText = `${project.title} ${project.description} ${project.tech.join(" ")}`.toLowerCase();
  return blockchainKeywords.some((kw) => searchText.includes(kw));
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

    // Show repos immediately, then enrich with images in background
    setGitHubProjects(githubRepos);
    setIsEnrichingImages(true);

    enrichReposWithImages(githubRepos, GITHUB_USERNAME)
      .then((enriched) => {
        setGitHubProjects(enriched);
      })
      .catch(() => {
        // Images failed — keep repos without images
      })
      .finally(() => setIsEnrichingImages(false));
  }, [githubRepos, setGitHubProjects]);

  const isLoading = loading || isLoadingRepos;

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => {
          const category = CATEGORIES.find((c) => c.value === activeFilter);
          if (!category || !("keywords" in category)) return false;
          const searchText =
            `${p.title} ${p.description} ${p.tech.join(" ")} ${p.topics.join(" ")}`.toLowerCase();
          return (category as { keywords: string[] }).keywords.some((kw) => searchText.includes(kw));
        });

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto space-y-10">

          {/* Header */}
          <div className="relative mb-2">
            <span className="section-number select-none absolute -top-4 left-0 leading-none">04</span>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px bg-primary" />
                <span className="font-mono text-xs text-primary tracking-[0.2em] uppercase">Products & Open Source</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold">
                    Things I've{" "}
                    <span className="text-gradient">Shipped</span>
                  </h2>
                  <p className="text-muted-foreground text-sm mt-2 max-w-lg">
                    Real products, tools, and experiments — built to solve actual problems
                    on-chain. Not just code exercises.
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge variant="outline" className="bg-primary/5 border-primary/30">
                    <Shield className="w-3 h-3 mr-1" />
                    Open Source
                  </Badge>
                  <Badge variant="outline" className="bg-accent/5 border-accent/20 text-accent">
                    <Zap className="w-3 h-3 mr-1" />
                    Live Builds
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRefresh}
                    disabled={isLoading || isEnrichingImages}
                    className="bg-background/50 hover:bg-primary/10 hover:border-primary/50"
                  >
                    <RefreshCw className={`w-3 h-3 mr-1 ${isLoading || isEnrichingImages ? "animate-spin" : ""}`} />
                    {isEnrichingImages ? "Loading images…" : "Refresh"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Marquee strip */}
          <div className="relative overflow-hidden border-y border-primary/20 py-3 bg-primary/5 -mx-4">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <span key={i} className="mx-6 text-sm text-primary/70 font-mono tracking-wide">
                  {item}{" "}
                  <span className="text-primary/30 mx-1">·</span>
                </span>
              ))}
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap justify-center">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat.value}
                variant={activeFilter === cat.value ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(cat.value)}
                className={
                  activeFilter === cat.value
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-primary/10 hover:border-primary/50"
                }
              >
                {cat.label}
              </Button>
            ))}
          </div>

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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => {
                  const isBlockchain = isBlockchainProject(project);
                  return (
                    <Card
                      key={project.id}
                      className={`bg-card/60 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 hover:glow-primary group h-full flex flex-col relative overflow-hidden ${
                        isBlockchain ? "ring-1 ring-primary/20" : ""
                      }`}
                    >
                      {/* Blockchain badge */}
                      {isBlockchain && (
                        <div className="absolute top-3 right-3 z-20">
                          <Badge
                            variant="secondary"
                            className="bg-primary/20 text-primary border-primary/30 text-xs"
                          >
                            <Shield className="w-3 h-3 mr-1" />
                            Blockchain
                          </Badge>
                        </div>
                      )}

                      {/* Image section with hover overlay */}
                      <div className="relative w-full h-48 overflow-hidden shrink-0">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <Code2 className="w-16 h-16 text-primary/30" />
                          </div>
                        )}

                        {/* Hover overlay with action buttons */}
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                          <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg" asChild>
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="View source code"
                            >
                              <Github className="w-4 h-4 mr-1.5" />
                              Code
                            </a>
                          </Button>
                          {project.homepage && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/30 hover:bg-white/10 text-white shadow-lg"
                              asChild
                            >
                              <a
                                href={project.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="View live demo"
                              >
                                <ExternalLink className="w-4 h-4 mr-1.5" />
                                Demo
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="p-6 space-y-4 flex-1 flex flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-lg font-bold group-hover:text-gradient transition-smooth flex-1 leading-tight">
                            {project.title}
                          </h3>
                          {project.language && (
                            <Badge variant="secondary" className="text-xs shrink-0 bg-secondary/80">
                              {project.language}
                            </Badge>
                          )}
                        </div>

                        <p className="text-muted-foreground text-sm line-clamp-3 flex-1 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.slice(0, 4).map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="text-xs bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 transition-colors"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.tech.length > 4 && (
                            <Badge variant="outline" className="text-xs text-muted-foreground">
                              +{project.tech.length - 4}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1 hover:text-primary transition-colors">
                              <Star className="w-4 h-4" />
                              <span className="font-medium">{project.stars}</span>
                            </div>
                            <div className="flex items-center gap-1 hover:text-primary transition-colors">
                              <GitFork className="w-4 h-4" />
                              <span className="font-medium">{project.forks}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {project.homepage && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-primary/10 hover:text-primary"
                                asChild
                              >
                                <a
                                  href={project.homepage}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="Visit homepage"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover:bg-primary/10 hover:border-primary/50 hover:text-primary"
                              asChild
                            >
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="View on GitHub"
                              >
                                <Github className="w-4 h-4" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div className="text-center space-y-3 pt-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:bg-primary/10 hover:border-primary/50"
                  asChild
                >
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    View All Projects on GitHub
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground">
                  {filteredProjects.length}{" "}
                  {filteredProjects.length === 1 ? "project" : "projects"} displayed
                  {isEnrichingImages && (
                    <span className="ml-2 text-primary/50">· loading preview images…</span>
                  )}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
