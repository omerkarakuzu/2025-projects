import { Smartphone, Globe, Sparkles } from "lucide-react";

export function FinalSlide() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-accent/10 via-background to-primary/10">
      <div className="max-w-5xl mx-auto px-8 text-center space-y-12">
        {/* Başlık */}
        <div className="space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm rounded-full border border-primary/30">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">Yakında Gelecek</span>
          </div>
          <h2 className="text-6xl lg:text-7xl font-bold text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Önümüzdeki Uygulamalar
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            2026 yılı için planlanan ve geliştirilmekte olan projelerimiz
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Mobil Uygulamalar */}
          <div className="space-y-6 animate-slide-left">
            <div className="flex items-center justify-center gap-3">
              <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30">
                <Smartphone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">
                Mobil Uygulamalar
              </h3>
            </div>

            <div className="space-y-4">
              <div className="group p-6 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-foreground group-hover:text-green-600 transition-colors">
                      MPS'e Ürün Toplama
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Kolaylaştırılmış ürün toplama ve MPS entegrasyonu
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Web (MES) Uygulamaları */}
          <div className="space-y-6 animate-slide-right">
            <div className="flex items-center justify-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border border-blue-500/30">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">
                MES Uygulamaları
              </h3>
            </div>

            <div className="space-y-4">
              <div className="group p-6 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-600 transition-colors">
                      Kalite Duvarı (Ford)
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Ford ürünleri için ek kalite kontrol sistemi
                    </p>
                  </div>
                </div>
              </div>

              <div className="group p-6 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-600 transition-colors">
                      MES ile Üretim Fişi Oluşturma
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Bütün bölümler için entegre üretim fişi sistemi
                    </p>
                  </div>
                </div>
              </div>

              <div className="group p-6 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-600 transition-colors">
                      Çoklu MPS İş Başlatma
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Paralel üretim süreçleri yönetimi
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alt mesaj */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm rounded-2xl border border-primary/20">
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            <p className="text-xl font-semibold text-foreground">
              Dijital Dönüşüm Süreci Devam Ediyor
            </p>
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
