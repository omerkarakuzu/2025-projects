import { Heart, Sparkles, Users, Code, Target } from "lucide-react";

export function ThankYouSlide() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-accent/10 via-background to-primary/10">
      <div className="max-w-4xl mx-auto px-8 text-center space-y-12">
        {/* Ana başlık */}
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col items-center gap-2">
            <div className="px-8 py-3 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm rounded-full border border-primary/30">
              <span className="text-primary font-bold text-xl">SANEL</span>
            </div>
            <div className="text-center">
              <span className="text-primary/90 font-semibold text-lg">
                BT Departmanı
              </span>
              <span className="text-primary/70 font-medium text-sm block">
                Yazılım Ekibi
              </span>
            </div>
          </div>

          <h1 className="text-7xl lg:text-8xl font-bold text-balance bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Teşekkür Ederiz
          </h1>

          <p className="text-2xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            İlginiz ve desteğiniz için teşekkür ederiz. Geleceğe birlikte adım
            atıyoruz.
          </p>
        </div>

        {/* İkonlar ve mesajlar */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div
            className="space-y-4 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex justify-center">
              <div className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border border-blue-500/30">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Takım Çalışması
            </h3>
            <p className="text-muted-foreground">
              Herkesin katkısı bu başarıyı mümkün kıldı
            </p>
          </div>

          <div
            className="space-y-4 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex justify-center">
              <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30">
                <Code className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Yenilikçilik
            </h3>
            <p className="text-muted-foreground">
              Teknolojiyle geleceği şekillendiriyoruz
            </p>
          </div>

          <div
            className="space-y-4 animate-slide-up"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="flex justify-center">
              <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30">
                <Target className="w-10 h-10 text-purple-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground">Azim</h3>
            <p className="text-muted-foreground">
              Her zorluk bir öğrenme fırsatı
            </p>
          </div>
        </div>

        {/* Alt mesaj */}
        <div className="mt-16 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <p className="text-lg text-muted-foreground font-medium">
              Gelecek projelerde görüşmek üzere!
            </p>
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          </div>

          <div className="text-sm text-muted-foreground/70">
            © 2025 - Dijital Dönüşüm Yolculuğu
          </div>
        </div>
      </div>
    </div>
  );
}
