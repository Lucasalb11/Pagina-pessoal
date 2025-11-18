import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Star, GitFork, Loader2, Code2, Shield, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchGitHubRepos } from "@/lib/github";
import { useProjects } from "@/hooks/useProjects";
import { useEffect } from "react";

const GITHUB_USERNAME = "Lucasalb11";

const Projects = () => {
  const { projects, loading, setGitHubProjects } = useProjects();

  // Fetch GitHub repositories
  const { data: githubRepos, isLoading: isLoadingRepos } = useQuery({
    queryKey: ["github-repos", GITHUB_USERNAME],
    queryFn: () => fetchGitHubRepos(GITHUB_USERNAME),
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
  });

  // Update projects when GitHub repos are fetched
  useEffect(() => {
    if (githubRepos) {
      setGitHubProjects(githubRepos);
    }
  }, [githubRepos, setGitHubProjects]);

  const isLoading = loading || isLoadingRepos;

  // Helper to detect blockchain-related projects
  const isBlockchainProject = (project: typeof projects[0]) => {
    const blockchainKeywords = ['blockchain', 'solidity', 'smart-contract', 'defi', 'web3', 'ethereum', 'solana', 'stellar', 'soroban', 'rust', 'anchor', 'hardhat', 'foundry'];
    const searchText = `${project.title} ${project.description} ${project.tech.join(' ')}`.toLowerCase();
    return blockchainKeywords.some(keyword => searchText.includes(keyword));
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Code2 className="w-8 h-8 text-primary" />
              <h2 className="text-4xl md:text-5xl font-bold">
                Featured <span className="text-gradient">Projects</span>
              </h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Blockchain & Web3 projects, smart contracts, and open-source contributions. 
              Building secure, decentralized solutions across multiple chains.
            </p>
            <div className="flex items-center justify-center gap-4 pt-2">
              <Badge variant="outline" className="bg-primary/5 border-primary/30">
                <Shield className="w-3 h-3 mr-1" />
                Security Audited
              </Badge>
              <Badge variant="outline" className="bg-accent/5 border-accent/30">
                <Zap className="w-3 h-3 mr-1" />
                Production Ready
              </Badge>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No projects found.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => {
                  const isBlockchain = isBlockchainProject(project);
                  return (
                    <Card
                      key={project.id}
                      className={`p-6 bg-card/60 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 hover:glow-primary group h-full flex flex-col relative overflow-hidden ${
                        isBlockchain ? 'ring-1 ring-primary/20' : ''
                      }`}
                    >
                      {/* Blockchain indicator */}
                      {isBlockchain && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 text-xs">
                            <Shield className="w-3 h-3 mr-1" />
                            Blockchain
                          </Badge>
                        </div>
                      )}
                      
                      <div className="space-y-4 flex-1 flex flex-col">
                        {project.image ? (
                          <div className="w-full h-48 rounded-lg overflow-hidden bg-muted relative group-hover:scale-105 transition-transform duration-300">
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-48 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <Code2 className="w-16 h-16 text-primary/30" />
                          </div>
                        )}
                        
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-xl font-bold group-hover:text-gradient transition-smooth flex-1">
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
                        
                        <div className="flex flex-wrap gap-2">
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
                            <Badge variant="outline" className="text-xs">
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
                                <a href={project.homepage} target="_blank" rel="noopener noreferrer" aria-label="Visit homepage">
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
                              <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="View on GitHub">
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

              <div className="text-center space-y-4 pt-4">
                <Button variant="outline" size="lg" className="hover:bg-primary/10 hover:border-primary/50" asChild>
                  <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 mr-2" />
                    View All Projects on GitHub
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground">
                  {projects.length} {projects.length === 1 ? 'project' : 'projects'} displayed
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
