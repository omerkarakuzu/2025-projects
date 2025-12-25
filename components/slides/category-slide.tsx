"use client";

import { ArrowRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  borderColor: string;
}

interface CategorySlideProps {
  category: Category;
  projectCount: number;
}

export function CategorySlide({ category, projectCount }: CategorySlideProps) {
  return (
    <div className="h-full w-full flex items-center justify-center p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-4 md:gap-8 lg:gap-16">
        {/* Sol taraf - İçerik */}
        <div className="flex-1 text-center space-y-14 order-2 lg:order-1">
          {/* Icon ve başlık */}
          <div className="space-y-8 animate-slide-down relative z-10">
            <div
              className={`inline-flex items-center justify-center w-32 h-32 rounded-3xl bg-gradient-to-br ${category.color} border-4 ${category.borderColor} backdrop-blur-sm animate-float`}
            >
              <span className="text-7xl">{category.icon}</span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-bold text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent relative z-10">
              {category.name}
            </h1>

            <div className="flex flex-col items-center">
              <p
                className="text-2xl lg:text-3xl text-muted-foreground text-balance max-w-2xl mx-auto mt-2 mb-2 relative z-10"
                style={{ background: "rgba(255,255,255,0.01)" }}
              >
                {category.description}
              </p>
            </div>
          </div>

          {/* Proje sayısı */}
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-card/80 backdrop-blur-sm border-2 border-primary/20 rounded-2xl shadow-xl animate-slide-up">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              <span className="text-3xl font-bold text-primary">
                {projectCount}
              </span>
              <span className="text-xl text-muted-foreground">Proje</span>
            </div>
          </div>

          {/* İlerleme talimatı */}
          <div className="pt-8 animate-slide-up animation-delay-300">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <span className="text-sm">Projeleri görmek için devam edin</span>
              <ArrowRight className="w-4 h-4 animate-bounce-x" />
            </div>
          </div>
        </div>

        {/* Sağ taraf - Mobil için özel telefon görseli */}
        {category.id === "mobile" && (
          <div className="flex-1 flex justify-center animate-slide-left animation-delay-500 order-1 lg:order-2">
            <div className="relative">
              {/* Telefon çerçevesi */}
              <div className="w-32 h-[280px] sm:w-40 sm:h-[350px] md:w-48 md:h-[400px] lg:w-64 lg:h-[500px] bg-gradient-to-b from-slate-800 to-slate-900 rounded-[2rem] lg:rounded-[3rem] border-2 lg:border-4 border-slate-700 shadow-2xl relative overflow-hidden">
                {/* Telefon ekranı */}
                <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-[1.5rem] lg:rounded-[2.5rem] flex items-center justify-center">
                  <div className="text-center space-y-2 lg:space-y-4">
                    <div className="w-8 h-8 lg:w-16 lg:h-16 bg-primary/20 rounded-lg lg:rounded-2xl mx-auto flex items-center justify-center">
                      <span className="text-lg lg:text-2xl">📱</span>
                    </div>
                    <div className="space-y-1 lg:space-y-2">
                      <div className="w-16 lg:w-32 h-2 lg:h-3 bg-primary/30 rounded-full mx-auto"></div>
                      <div className="w-12 lg:w-24 h-2 lg:h-3 bg-primary/20 rounded-full mx-auto"></div>
                      <div className="w-14 lg:w-28 h-2 lg:h-3 bg-primary/25 rounded-full mx-auto"></div>
                    </div>
                  </div>
                </div>
                {/* Home indicator */}
                <div className="absolute bottom-1 lg:bottom-2 left-1/2 -translate-x-1/2 w-16 lg:w-32 h-0.5 lg:h-1 bg-slate-600 rounded-full"></div>
              </div>
              {/* Yansıma efekti */}
              <div className="absolute -bottom-2 lg:-bottom-4 left-2 lg:left-4 right-2 lg:right-4 h-4 lg:h-8 bg-gradient-to-t from-black/20 to-transparent rounded-b-[1.5rem] lg:rounded-b-[2.5rem] blur-sm"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
