import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";

export function TableOfContentsSlide() {
  const contents = [
    {
      title: "Bimser Synergy CSP",
      description: "Bimser Synergy platformu ile yapılan çözümler",
      icon: "☁️",
      projects: [
        "İş Kazası Kayıtları Formu",
        "Öneri Sistemi",
        "Performans Değerlendirme Sistemi",
      ],
    },
    {
      title: "Üretim (Thingsboard)",
      description: "MES ve üretim izleme sistemleri",
      icon: "⚙️",
      projects: [
        "MES Ekranları Güncellemesi",
        "Kanban 3D Hammadde İzleme",
        "Enjeksiyon Hammadde Takip",
        "Krem Lehim Takip",
        "Üretim Etiketi Oluşturma",
      ],
    },
    {
      title: "Web Uygulamaları",
      description: "Modern web platformları",
      icon: "🌐",
      projects: [
        "Etik Bildirim Sistemi",
        "Stok Alarm Sistemi",
        "Kimyasal Ürün SKT Takip",
        "İş Süreçleri Yönetimi Platformu",
      ],
    },
    {
      title: "Mobil Uygulamaları",
      description: "El terminalleri için mobil çözümler",
      icon: "📱",
      projects: [
        "Depo Transfer Uygulaması",
        "Depo Sayım Uygulaması",
        "Full-IT Doğrulama Uygulaması",
        "Stok Serileme Uygulaması",
      ],
    },
  ];

  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-accent/10 via-background to-primary/10">
      <div className="max-w-6xl mx-auto px-8 text-center space-y-12">
        {/* Başlık */}
        <div className="space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm rounded-full border border-primary/30">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">İçindekiler</span>
          </div>
          <h2 className="text-6xl lg:text-7xl font-bold text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Sunum İçeriği
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            2025 yılında geliştirdiğimiz projeler ve çözümler
          </p>
        </div>

        {/* İçerik Grid */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {contents.map((section, index) => (
            <div
              key={section.title}
              className="group p-8 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center text-2xl">
                    {section.icon}
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {section.description}
                  </p>
                  <div className="space-y-2">
                    {section.projects.map((project, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-foreground/80">{project}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Alt Bilgi */}
        <div className="mt-12 pt-8 border-t border-border/30">
          <p className="text-lg text-muted-foreground">
            Toplam <span className="font-semibold text-primary">16 proje</span>{" "}
            • 4 ana kategori
          </p>
        </div>
      </div>
    </div>
  );
}
