import { useState, useEffect, useCallback } from "react";
import { Project } from "@/lib/github";

const STORAGE_KEY = "portfolio_projects";
const HIDDEN_PROJECTS_KEY = "portfolio_hidden_projects";
const CUSTOM_PROJECTS_KEY = "portfolio_custom_projects";

/**
 * Hook to manage projects (GitHub + custom + hidden)
 */
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [hiddenIds, setHiddenIds] = useState<Set<number>>(new Set());
  const [customProjects, setCustomProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const storedHidden = localStorage.getItem(HIDDEN_PROJECTS_KEY);
      const storedCustom = localStorage.getItem(CUSTOM_PROJECTS_KEY);

      if (stored) {
        setProjects(JSON.parse(stored));
      }
      if (storedHidden) {
        setHiddenIds(new Set(JSON.parse(storedHidden)));
      }
      if (storedCustom) {
        setCustomProjects(JSON.parse(storedCustom));
      }
    } catch (error) {
      console.error("Error loading projects from localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save to localStorage whenever projects change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
      } catch (error) {
        console.error("Error saving projects to localStorage:", error);
      }
    }
  }, [projects, loading]);

  useEffect(() => {
    try {
      localStorage.setItem(HIDDEN_PROJECTS_KEY, JSON.stringify(Array.from(hiddenIds)));
    } catch (error) {
      console.error("Error saving hidden projects to localStorage:", error);
    }
  }, [hiddenIds]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_PROJECTS_KEY, JSON.stringify(customProjects));
    } catch (error) {
      console.error("Error saving custom projects to localStorage:", error);
    }
  }, [customProjects]);

  const setGitHubProjects = useCallback((newProjects: Project[]) => {
    setProjects(newProjects);
  }, []);

  const hideProject = useCallback((id: number) => {
    setHiddenIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const showProject = useCallback((id: number) => {
    setHiddenIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const addCustomProject = useCallback((project: Project) => {
    setCustomProjects((prev) => [...prev, project]);
  }, []);

  const removeCustomProject = useCallback((id: number) => {
    setCustomProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateCustomProject = useCallback((id: number, updates: Partial<Project>) => {
    setCustomProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  }, []);

  // Get visible projects (GitHub + custom, excluding hidden)
  const visibleProjects = [
    ...customProjects,
    ...projects.filter((p) => !hiddenIds.has(p.id)),
  ].sort((a, b) => {
    // Sort by stars (descending), then by updated date
    if (b.stars !== a.stars) {
      return b.stars - a.stars;
    }
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return {
    projects: visibleProjects,
    allProjects: projects,
    customProjects,
    hiddenIds: Array.from(hiddenIds),
    loading,
    setGitHubProjects,
    hideProject,
    showProject,
    addCustomProject,
    removeCustomProject,
    updateCustomProject,
  };
}

