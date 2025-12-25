import { Code2 } from "lucide-react";

export function IntroSlide() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-fade-in">
      <div className="max-w-4xl mx-auto px-8 text-center space-y-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border-2 border-primary/20 animate-float">
          <Code2 className="w-10 h-10 text-primary" />
        </div>

        <h1 className="text-6xl font-bold text-balance animate-slide-down">
          2025 Yazılım Uygulamaları
        </h1>

        <p className="text-2xl text-muted-foreground text-balance max-w-2xl mx-auto animate-slide-up">
          Sanel BT yazılım ekibi tarafından geliştirilen uygulamalar
        </p>

        <div className="pt-8 text-muted-foreground animate-slide-up animation-delay-300">
          <p className="text-sm">
            İlerlemek için → tuşunu veya alt taraftaki ok butonlarını kullanın
          </p>
        </div>
      </div>
    </div>
  );
}
