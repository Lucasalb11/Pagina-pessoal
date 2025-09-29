import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "crud-e",
      description: "A Rust-based CRUD application demonstrating efficient data management and system-level programming capabilities.",
      tech: ["Rust", "Systems Programming"],
      github: "https://github.com/Lucasalb11/crud-e",
      stars: 1,
    },
    {
      title: "Jogo de Adivinhação",
      description: "An interactive guessing game built with Rust, showcasing fundamental programming concepts and user interaction.",
      tech: ["Rust", "CLI"],
      github: "https://github.com/Lucasalb11/jogo_de_adivinhacao",
    },
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Some of my recent work and contributions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card
                key={project.title}
                className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-smooth hover:glow-primary group"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold group-hover:text-gradient transition-smooth">
                      {project.title}
                    </h3>
                    {project.stars && (
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <span>⭐</span>
                        <span>{project.stars}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com/Lucasalb11" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
                View All Projects on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
