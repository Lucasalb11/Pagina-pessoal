import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "@/lib/github";
import { Github, Plus, Trash2, Eye, EyeOff, Edit, Lock, LogOut, Save, X } from "lucide-react";
import { toast } from "sonner";

const ADMIN_PASSWORD = "blockchain2024"; // Simple password protection

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteProjectId, setDeleteProjectId] = useState<number | null>(null);

  const {
    allProjects,
    customProjects,
    hiddenIds,
    hideProject,
    showProject,
    addCustomProject,
    removeCustomProject,
    updateCustomProject,
  } = useProjects();

  // Check authentication on mount
  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      toast.success("Admin access granted");
    } else {
      toast.error("Invalid password");
      setPassword("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_auth");
    navigate("/");
    toast.success("Logged out");
  };

  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    description: "",
    tech: [],
    github: "",
    homepage: "",
    stars: 0,
    forks: 0,
    language: "",
    topics: [],
    image: "",
  });

  const [techInput, setTechInput] = useState("");

  const handleAddProject = () => {
    if (!newProject.title || !newProject.description || !newProject.github) {
      toast.error("Please fill in title, description, and GitHub URL");
      return;
    }

    const techArray = techInput.split(",").map((t) => t.trim()).filter(Boolean);
    const topicsArray = techArray;

    const project: Project = {
      id: Date.now(), // Simple ID generation
      title: newProject.title,
      description: newProject.description,
      tech: techArray.length > 0 ? techArray : ["Other"],
      github: newProject.github,
      homepage: newProject.homepage || undefined,
      stars: newProject.stars || 0,
      forks: newProject.forks || 0,
      language: newProject.language || null,
      topics: topicsArray,
      image: newProject.image || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addCustomProject(project);
    toast.success("Project added successfully");
    setShowAddDialog(false);
    resetForm();
  };

  const handleUpdateProject = () => {
    if (!editingProject) return;

    const techArray = techInput.split(",").map((t) => t.trim()).filter(Boolean);
    
    updateCustomProject(editingProject.id, {
      ...editingProject,
      tech: techArray.length > 0 ? techArray : editingProject.tech,
      topics: techArray.length > 0 ? techArray : editingProject.topics,
      updatedAt: new Date().toISOString(),
    });

    toast.success("Project updated successfully");
    setEditingProject(null);
    resetForm();
  };

  const handleDeleteProject = (id: number) => {
    removeCustomProject(id);
    toast.success("Project removed");
    setDeleteProjectId(null);
  };

  const resetForm = () => {
    setNewProject({
      title: "",
      description: "",
      tech: [],
      github: "",
      homepage: "",
      stars: 0,
      forks: 0,
      language: "",
      topics: [],
      image: "",
    });
    setTechInput("");
  };

  const openEditDialog = (project: Project) => {
    setEditingProject(project);
    setNewProject({
      title: project.title,
      description: project.description,
      tech: project.tech,
      github: project.github,
      homepage: project.homepage || "",
      stars: project.stars,
      forks: project.forks,
      language: project.language || "",
      topics: project.topics,
      image: project.image || "",
    });
    setTechInput(project.tech.join(", "));
    setShowAddDialog(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="p-8 max-w-md w-full">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Lock className="w-12 h-12 mx-auto text-primary" />
              <h1 className="text-2xl font-bold">Admin Access</h1>
              <p className="text-muted-foreground">Enter password to access admin panel</p>
            </div>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <Button onClick={handleLogin} className="w-full">
                Login
              </Button>
              <Button variant="ghost" onClick={() => navigate("/")} className="w-full">
                Back to Home
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const allProjectsList = [...allProjects, ...customProjects];
  const visibleProjects = allProjectsList.filter((p) => !hiddenIds.includes(p.id));
  const hiddenProjects = allProjectsList.filter((p) => hiddenIds.includes(p.id));

  return (
    <div className="min-h-screen bg-background p-4 py-8">
      <div className="container mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Admin <span className="text-gradient">Panel</span>
            </h1>
            <p className="text-muted-foreground">Manage your portfolio projects</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/")}>
              View Site
            </Button>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-2xl font-bold">{allProjectsList.length}</div>
            <div className="text-sm text-muted-foreground">Total Projects</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">{visibleProjects.length}</div>
            <div className="text-sm text-muted-foreground">Visible</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">{hiddenProjects.length}</div>
            <div className="text-sm text-muted-foreground">Hidden</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">{customProjects.length}</div>
            <div className="text-sm text-muted-foreground">Custom</div>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button onClick={() => { resetForm(); setEditingProject(null); setShowAddDialog(true); }}>
            <Plus className="w-4 h-4 mr-2" />
            Add Custom Project
          </Button>
        </div>

        {/* Visible Projects */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Visible Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleProjects.map((project) => {
              const isCustom = customProjects.some((p) => p.id === project.id);
              return (
                <Card key={project.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{project.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                      </div>
                      {isCustom && <Badge variant="secondary">Custom</Badge>}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t">
                      <div className="flex-1 flex gap-2">
                        {isCustom && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(project)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                        )}
                        {isCustom && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setDeleteProjectId(project.id)}
                              >
                                <Trash2 className="w-3 h-3 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Project?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently remove this custom project. This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteProject(project.id)}
                                  className="bg-destructive text-destructive-foreground"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => hideProject(project.id)}
                        >
                          <EyeOff className="w-3 h-3" />
                        </Button>
                      </div>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Hidden Projects */}
        {hiddenProjects.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Hidden Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hiddenProjects.map((project) => (
                <Card key={project.id} className="p-4 opacity-60">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{project.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => showProject(project.id)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Show
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Add/Edit Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? "Edit Project" : "Add Custom Project"}</DialogTitle>
              <DialogDescription>
                {editingProject ? "Update project details" : "Add a new project to your portfolio"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title *</label>
                <Input
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="Project Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description *</label>
                <Textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Project description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">GitHub URL *</label>
                  <Input
                    value={newProject.github}
                    onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                    placeholder="https://github.com/user/repo"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Homepage URL</label>
                  <Input
                    value={newProject.homepage}
                    onChange={(e) => setNewProject({ ...newProject, homepage: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Language</label>
                  <Input
                    value={newProject.language}
                    onChange={(e) => setNewProject({ ...newProject, language: e.target.value })}
                    placeholder="Solidity, Rust, TypeScript..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Image URL</label>
                  <Input
                    value={newProject.image}
                    onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                    placeholder="https://example.com/image.png"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Stars</label>
                  <Input
                    type="number"
                    value={newProject.stars}
                    onChange={(e) => setNewProject({ ...newProject, stars: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Forks</label>
                  <Input
                    type="number"
                    value={newProject.forks}
                    onChange={(e) => setNewProject({ ...newProject, forks: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Technologies (comma-separated)</label>
                <Input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="Solidity, Hardhat, TypeScript, React..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setShowAddDialog(false); resetForm(); setEditingProject(null); }}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={editingProject ? handleUpdateProject : handleAddProject}>
                <Save className="w-4 h-4 mr-2" />
                {editingProject ? "Update" : "Add"} Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Admin;
