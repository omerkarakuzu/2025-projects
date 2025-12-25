"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Map } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Project {
  id: number
  category: string
  title: string
}

interface Category {
  id: string
  name: string
  icon: string
}

interface MiniMapProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentSlide: number
  totalSlides: number
  projects: Project[]
  categories: Category[]
  onNavigate: (index: number) => void
}

export function MiniMap({
  open,
  onOpenChange,
  currentSlide,
  totalSlides,
  projects,
  categories,
  onNavigate,
}: MiniMapProps) {
  const handleNavigate = (index: number) => {
    onNavigate(index)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Map className="h-5 w-5" />
            Sunum Haritası
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6 py-4">
            {/* Intro Slide */}
            <button
              onClick={() => handleNavigate(0)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                currentSlide === 0
                  ? "border-primary bg-primary/10"
                  : "border-border/50 hover:border-primary/50 hover:bg-primary/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl">
                  🎯
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Slide 1</div>
                  <h3 className="font-semibold">Giriş</h3>
                </div>
              </div>
            </button>

            {/* Categories and Projects */}
            {categories.map((category, catIndex) => {
              const categorySlideIndex = catIndex + 1
              const categoryProjects = projects.filter((p) => p.category === category.id)

              return (
                <div key={category.id} className="space-y-2">
                  {/* Category Slide */}
                  <button
                    onClick={() => handleNavigate(categorySlideIndex)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      currentSlide === categorySlideIndex
                        ? "border-primary bg-primary/10"
                        : "border-border/50 hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl">
                        {category.icon}
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Slide {categorySlideIndex + 1}</div>
                        <h3 className="font-semibold">{category.name}</h3>
                      </div>
                    </div>
                  </button>

                  {/* Category Projects */}
                  <div className="ml-8 space-y-2">
                    {categoryProjects.map((project, projIndex) => {
                      const projectSlideIndex = 1 + categories.length + projects.findIndex((p) => p.id === project.id)
                      return (
                        <button
                          key={project.id}
                          onClick={() => handleNavigate(projectSlideIndex)}
                          className={`w-full text-left p-3 rounded-lg border transition-all ${
                            currentSlide === projectSlideIndex
                              ? "border-primary bg-primary/10"
                              : "border-border/50 hover:border-primary/50 hover:bg-primary/5"
                          }`}
                        >
                          <div className="text-xs text-muted-foreground mb-1">Slide {projectSlideIndex + 1}</div>
                          <h4 className="text-sm font-medium">{project.title}</h4>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {/* Final Slide */}
            <button
              onClick={() => handleNavigate(totalSlides - 1)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                currentSlide === totalSlides - 1
                  ? "border-primary bg-primary/10"
                  : "border-border/50 hover:border-primary/50 hover:bg-primary/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl">
                  ✨
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Slide {totalSlides}</div>
                  <h3 className="font-semibold">Kapanış</h3>
                </div>
              </div>
            </button>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
