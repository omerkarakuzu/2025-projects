"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Project {
  id: number;
  category: string;
  categoryName: string;
  title: string;
  description: string;
  technologies: string[];
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projects: Project[];
  categories: Category[];
  onNavigate: (index: number) => void;
}

export function SearchDialog({
  open,
  onOpenChange,
  projects,
  categories,
  onNavigate,
}: SearchDialogProps) {
  const [query, setQuery] = useState("");

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(query.toLowerCase())
      )
  );

  const handleNavigate = (projectId: number) => {
    const projectIndex = projects.findIndex((p) => p.id === projectId);
    if (projectIndex !== -1) {
      const slideIndex = 1 + categories.length + projectIndex;
      onNavigate(slideIndex);
      onOpenChange(false);
      setQuery("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[600px] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle>Projelerde Ara</DialogTitle>
        </DialogHeader>
        <div className="px-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Proje adı, açıklama veya teknoloji ara..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>
        </div>
        <ScrollArea className="h-[400px] px-6 pb-6">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {query
                ? "Sonuç bulunamadı"
                : "Aramaya başlamak için yazmaya başlayın"}
            </div>
          ) : (
            <div className="space-y-2 mt-4">
              {filteredProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleNavigate(project.id)}
                  className="w-full text-left p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-muted-foreground mb-1">
                        {project.categoryName}
                      </div>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-xs px-2 py-0.5 text-muted-foreground">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
