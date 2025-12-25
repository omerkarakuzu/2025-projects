"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Moon,
  Sun,
  Keyboard,
  Map,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { IntroSlide } from "./slides/intro-slide";
import { TableOfContentsSlide } from "./slides/table-of-contents-slide";
import { ProjectSlide } from "./slides/project-slide";
import { CategorySlide } from "./slides/category-slide";
import { FinalSlide } from "./slides/final-slide";
import { ThankYouSlide } from "./slides/thank-you-slide";
import { SearchDialog } from "./search-dialog";
import { KeyboardShortcuts } from "./keyboard-shortcuts";
import { MiniMap } from "./mini-map";

const categories = [
  {
    id: "csp",
    name: "Bimser Synergy CSP",
    description: "Bimser Synergy CSP projeleri",
    icon: "☁️",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    id: "production",
    name: "Üretim (Thingsboard)",
    description: "MES ve Üretim izleme sistemleri",
    icon: "⚙️",
    color: "from-orange-500/20 to-amber-500/20",
    borderColor: "border-orange-500/30",
  },
  {
    id: "web",
    name: "Web Uygulamaları",
    description: "Modern web platformları ve dashboardlar",
    icon: "🌐",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
  },
  {
    id: "mobile",
    name: "Mobil Uygulamalar",
    description: "El terminalleri",
    icon: "📱",
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
  },
];

const projects = [
  // CSP Projeleri
  {
    id: 1,
    category: "csp",
    categoryName: "Bimser Synergy CSP",
    title: "İş Kazası Kayıtları Formu",
    description:
      "Bimser Synergy CSP platformunda geliştirilen, işyerlerinde meydana gelen iş kazalarının dijital ortamda kayıt altına alınmasını, raporlanmasını ve analiz edilmesini sağlayan form uygulaması.",
    images: ["/iskazasi1.png", "/iskazasi2.png", "/iskazasi3.png"],
    technologies: ["Bimser CSP", "TypeScript", "C#", "SQL Server"],
    status: "completed" as const,
    highlights: [
      "Detaylı kaza kayıt formu ve dokümantasyon",
      "Kişi bilgileri ve takibi",
      "Bildirim ve raporlama sistemi",
    ],
    challenges: [],
    solutions: [
      "İSG uzmanları ile işbirliği",
      "Workflow tabanlı onay süreci",
      "Anlık SMS ve e-posta bildirimleri",
    ],
    stats: {},
    metrics: {
      "Toplam İş Kazası Kayıtları": 21,
    },
  },
  {
    id: 2,
    category: "csp",
    categoryName: "Bimser Synergy CSP",
    title: "Öneri Sistemi",
    description:
      "Bimser Synergy CSP platformunda geliştirilen öneri sistemi, çalışanların şirkete sunduğu iyileştirme önerilerini (süreç iyileştirme, çalışma ortamı, maliyet, kalite vb.) yöneten ve değerlendirme süreçlerini otomatikleştiren kapsamlı platform.",
    images: ["/oneri1.png", "/oneri2.png"],
    technologies: ["Bimser CSP", "TypeScript", "C#", "SQL Server"],
    status: "completed" as const,
    highlights: [
      "Kullanıcı davranış analizi",
      "Makine öğrenmesi algoritmaları",
      "Gerçek zamanlı öneri üretimi",
      "A/B test desteği",
      "Akış: Öneri → Ön Değerlendirme → Komite Değerlendirme → GM/GMY Değerlendirme → Ödül Aşaması → Ödül Teslim Edildi",
      "Ön Değerlendirme sürecinde GM, GMY ve Komite Bilgilendirmesi",
    ],
    challenges: [
      "Büyük veri işleme performansı",
      "Öneri algoritması doğruluğu",
      "Privacy ve GDPR uyumluluğu",
    ],
    solutions: [
      "Distributed computing mimarisi",
      "Collaborative filtering algoritmaları",
      "Data anonymization teknikleri",
    ],
    stats: {
      duration: "2 Ay",
    },
    metrics: {
      "Toplam Öneri Kayıtları": 181,
    },
  },
  {
    id: 3,
    category: "csp",
    categoryName: "Bimser Synergy CSP",
    title: "Performans Değerlendirme Sistemi",
    description:
      "Bimser Synergy CSP platformunda geliştirilen performans değerlendirme sistemi. Çalışanların hedef ve proje atamalarını yöneten, KPI takibi ve yetkinlik değerlendirmesi yapan kapsamlı bir çözüm.",
    images: ["/pds1.png", "/pds2.png", "/pds3.png"],
    technologies: ["Bimser CSP", "TypeScript", "C#", "SQL"],
    status: "completed" as const,
    highlights: [
      "Hedef belirleme ve takip sistemi",
      "Proje atama ve yönetim",
      "Performans metrikleri analizi",
      "Çalışan değerlendirme süreçleri",
    ],
    challenges: [
      "Karmaşık hedef hiyerarşisi",
      "Çoklu değerlendirme kriterleri",
      "Gerçek zamanlı performans takibi",
    ],
    solutions: [
      "Modüler hedef yapısı",
      "Otomatik değerlendirme algoritmaları",
      "Dashboard tabanlı raporlama",
    ],
    stats: {
      duration: "2 Ay",
    },
    metrics: {
      "Toplam Hedef": 263,
      "Proje Atamaları": 44,
    },
  },
  // {
  //   id: 4,
  //   category: "csp",
  //   categoryName: "Bimser Synergy CSP",
  //   title: "Serverless Uygulama Platformu",
  //   description:
  //     "Geliştiricilerin serverless uygulamalarını kolayca deploy edip yönetebilecekleri, AWS Lambda ve Azure Functions destekli platform.",
  //   images: [
  //     "/serverless-dashboard.jpg",
  //     "/lambda-functions.jpg",
  //     "/api-gateway.jpg",
  //   ],
  //   technologies: [
  //     "AWS Lambda",
  //     "API Gateway",
  //     "DynamoDB",
  //     "CloudFormation",
  //     "Node.js",
  //   ],
  //   link: "https://github.com/example/serverless-platform",
  //   status: "pilot" as const,
  //   highlights: [
  //     "Sıfır sunucu yönetimi",
  //     "Otomatik ölçeklendirme",
  //     "Pay-per-use maliyet modeli",
  //     "Hızlı deployment pipeline",
  //   ],
  //   challenges: [
  //     "Cold start problemi",
  //     "Debugging zorlukları",
  //     "State management",
  //   ],
  //   solutions: [
  //     "Warm pool stratejisi",
  //     "Structured logging ve tracing",
  //     "External state store pattern",
  //   ],
  //   stats: {
  //     duration: "3 Ay",
  //     team: "4 Kişi",
  //     impact: "%90 Altyapı Maliyeti Azalması",
  //   },
  // },

  // Üretim (Thingsboard) Projeleri
  {
    id: 5,
    category: "production",
    categoryName: "Üretim (Thingsboard)",
    title: "Güncel MES Ekranları",
    description:
      "Operatörlerin tablet kullanarak iş emri bilgilerini güncellediği, üretim süreçlerini gerçek zamanlı takip ettiği ve kalite kontrol verilerini girdiği modern MES ekranları.",
    images: [
      "/mes1.png",
      "/mes2.png",
      "/mes3.png",
      "/mes4.png",
      "/mes7.png",
      "/mes5.png",
      "/mes6.png",
      "/mes8.png",
    ],
    technologies: ["ThingsBoard", "MQTT", "PostgreSQL", "Kafka"],
    link: "http://iot.sanel.com.tr:8080/login",
    status: "completed" as const,
    highlights: [
      "Gerçek zamanlı üretim takibi",
      "OEE (Overall Equipment Effectiveness) hesaplama",
      "Predictive maintenance algoritmaları",
      "Enerji tüketimi optimizasyonu",
    ],
    challenges: [
      "Yüksek frekanslı sensör verisi",
      "Veri normalizasyonu",
      "Makine downtime tespiti",
    ],
    solutions: [
      "Time-series veritabanı optimizasyonu",
      "Edge computing ön işleme",
      "ML-based anomaly detection",
    ],
    stats: {
      impact: "İzlenebilir Üretim Süreçleri",
    },
  },
  {
    id: 6,
    category: "production",
    categoryName: "Üretim (Thingsboard)",
    title: "Kanban 3D Hammadde İzleme",
    description:
      "Kanban sistemi ile hammadde stoklarını 3D görselleştirme ile izleyen, stok seviyelerini gerçek zamanlı takip eden izleme platformu.",
    images: ["/kanban1.png"],
    technologies: ["ThingsBoard", "Three.js", "WebGL", "PostgreSQL", "Node.js"],
    link: "http://iot.sanel.com.tr:8080/dashboard/7c8895c0-3c58-11f0-94e5-e5cd796811cb?publicId=cdf38e50-12bb-11ef-bab9-3306577490ba",
    status: "completed" as const,
    highlights: [
      "3D stok görselleştirme",
      "Kanban kartı takibi",
      "Otomatik sipariş önerileri",
      "Gerçek zamanlı stok güncellemeleri",
    ],
    challenges: [
      "3D model optimizasyonu",
      "Real-time data synchronization",
      "Complex kanban logic",
    ],
    solutions: [
      "WebGL rendering optimization",
      "WebSocket real-time updates",
      "Advanced kanban algorithms",
    ],
    stats: {
      impact: "Stok Yönetimi",
    },
  },
  {
    id: 7,
    category: "production",
    categoryName: "Üretim (Thingsboard)",
    title: "Enjeksiyon Hammadde Takip",
    description:
      "Enjeksiyon hammaddelerinin takibi için hammaddenin konulma zamanı, kuruma zamanını ve diğer kritik parametrelerin girildiği kapsamlı takip ekranı.",
    images: ["/enjhammaddet1.png", "/enjhammadde2.png", "/enjhammadde3.png"],
    technologies: ["ThingsBoard", "MSSQL", "NodeRed", "Real-time Monitoring"],
    link: "http://iot.sanel.com.tr:8080/dashboards/251c6310-b323-11f0-9d99-d3d13254c8e7",
    status: "completed" as const,
    highlights: [
      "Hammadde konulma zamanı takibi",
      "Kuruma süreci izleme",
      "Kalite kontrol parametreleri",
      "Otomatik uyarı sistemleri",
    ],
    challenges: [
      "Hammadde kalite takibi",
      "Zamanlama hassasiyeti",
      "Çoklu parametre yönetimi",
    ],
    solutions: [
      "Gerçek zamanlı veri girişi",
      "Otomatik validasyon kontrolleri",
      "Kullanıcı dostu arayüz tasarımı",
    ],
    stats: {
      // duration: "3 Ay",
      // team: "4 Kişi",
      impact: "Hammadde Takip",
    },
  },
  {
    id: 8,
    category: "production",
    categoryName: "Üretim (Thingsboard)",
    title: "Krem Lehim Takip",
    description:
      "Kullanıcıların krem lehim listesine barkod okuyarak giriş yapabildiği, stok takibi ve kullanım izleme sağlayan sistem.",
    images: ["/kremlehim1.png", "/kremlehim2.png", "/kremlehim3.png"],
    technologies: ["ThingsBoard", "Javascript", "MSSQL", "NodeRed"],
    link: "http://iot.sanel.com.tr:8080/dashboard/19402460-a5d0-11f0-848a-b13ab0ce2c0d?publicId=cdf38e50-12bb-11ef-bab9-3306577490ba",
    status: "in-progress" as const,
    highlights: [
      "Barkod okutma ile hızlı giriş",
      "Krem lehim stok takibi",
      "Kullanım izleme ve raporlama",
      "Otomatik uyarı sistemleri",
    ],
    challenges: [
      "Barkod okuma doğruluğu",
      "Stok senkronizasyonu",
      "Kullanıcı dostu arayüz",
    ],
    solutions: [
      "Zebra SDK entegrasyonu",
      "Real-time veri senkronizasyonu",
      "Mobil uyumlu tasarım",
    ],
    stats: {
      impact: "Stok Takip Verimliliği",
    },
  },
  {
    id: 9,
    category: "production",
    categoryName: "Üretim (Thingsboard)",
    title: "Üretim Etiketi Oluşturma",
    description:
      "Operatörlerin tablet üzerinden üretim fişi kaydı atıp, otomatik etiket oluşturabildiği, barkodlu etiket sistemi ile üretim takibini sağlayan kapsamlı platform.",
    images: ["/uretimfisi1.png"],
    technologies: ["ThingsBoard", "Zebra SDK", "NodeRed"],
    link: "http://iot.sanel.com.tr:8080/dashboard/example?publicId=example",
    status: "completed" as const,
    highlights: [
      "Tablet üzerinden üretim fişi kaydı",
      "Otomatik etiket oluşturma",
      "Barkodlu etiket sistemi",
      "Üretim takibi ve raporlama",
    ],
    challenges: [
      "Etiket format standardizasyonu",
      "Barkod okuma doğruluğu",
      "Çoklu cihaz senkronizasyonu",
    ],
    solutions: [
      "Standart etiket şablonları",
      "Zebra SDK entegrasyonu",
      "Real-time veri senkronizasyonu",
    ],
    stats: {
      // impact: "Üretim Takibi Optimizasyonu",
      devreyeAlmaTarihi: "2025/12/16",
    },
    metrics: {
      "Üretim Fişi Kaydı": 45,
    },
  },

  // Web Uygulamaları
  {
    id: 10,
    category: "web",
    categoryName: "Web Uygulamaları",
    title: "Sanel Etik Bildirim Sistemi",
    description:
      "Etik değerlerimize aykırı durumları güvenle bildirebileceğiniz ve takip edebileceğiniz platform.",
    images: ["/etik1.png", "/etik2.png", "/etik3.png"],
    technologies: ["NextJS", "Supabase", "Vercel", "TypeScript"],
    link: "https://etik.sanel.com.tr/",
    status: "completed" as const,
    highlights: [
      "Güvenli bildirim sistemi",
      "Anonim raporlama seçeneği",
      "Gerçek zamanlı takip",
      "Şeffaf süreç yönetimi",
    ],
    challenges: [
      "Gizlilik ve güvenlik öncelikleri",
      "Kullanıcı güveni oluşturma",
      "Düzenleyici uyumluluk",
    ],
    solutions: [
      "End-to-end şifreleme",
      "Anonim kimlik doğrulama",
      "Audit trail sistemi",
    ],
    stats: {
      impact: "Şeffaf Etik Kültür",
    },
  },
  {
    id: 11,
    category: "web",
    categoryName: "Web Uygulamaları",
    title: "Stok Alarm Sistemi",
    description:
      "Kullanıcıların istedikleri ürün kodlarına alarm kurup, stok seviyesi arttığında otomatik e-posta bildirimi aldığı pratik stok takip sistemi.",
    images: ["/stokalarm1.png", "/stokalarm2.png", "/stokalarm3.png"],
    technologies: ["Next.js", "MSSQL", "n8n", "Node.js"],
    link: "https://stokalarm.sanel.com.tr/",
    status: "completed" as const,
    highlights: [
      "Ürün kodu bazlı alarm listesi",
      "Otomatik e-posta bildirimi",
      "Gerçek zamanlı stok takibi",
      "Tahminî tüketim analizi",
      "Entegre sipariş yönetimi",
    ],
    challenges: [
      "Gerçek zamanlı veri senkronizasyonu",
      "False alarm önleme",
      "Çoklu depo yönetimi",
    ],
    solutions: [
      "WebSocket entegrasyonu",
      "Machine learning tabanlı tahminler",
      "Modüler depo yapısı",
    ],
    stats: {
      duration: "2 Hafta",
      impact: "Stok Takibi",
    },
  },
  {
    id: 12,
    category: "web",
    categoryName: "Web Uygulamaları",
    title: "Kimyasal Ürün SKT Bildirim Sistemi",
    description:
      "Kimyasal ürünlerin son kullanma tarihi geçen ve yaklaşanlarını her gün otomatik e-posta ile bildiren akıllı bildirim sistemi.",
    images: ["/kimyasal1.png"],
    technologies: ["n8n", "MSSQL", "Node.js", "SMTP"],
    status: "completed" as const,
    highlights: [
      "Otomatik SKT takibi",
      "Günlük e-posta raporları",
      "Hammadde stok yönetimi",
      "Zamanında müdahale imkanı",
    ],
    challenges: [
      "Veritabanı entegrasyonu",
      "Zamanlama optimizasyonu",
      "E-posta teslimatı güvenilirliği",
    ],
    solutions: [
      "n8n workflow engine",
      "Scheduled task automation",
      "Email delivery monitoring",
    ],
    stats: {
      impact: "Hammadde Güvenliği",
    },
  },
  {
    id: 13,
    category: "web",
    categoryName: "Web Uygulamaları",
    title: "İş Süreci Yönetimi Platformu",
    description:
      "Personel talepleri, izin başvuruları, onay süreçleri ve iş akışlarını dijital ortamda yöneten BPM platformu.",
    images: ["/3d-visualization.jpg"],
    technologies: ["Javascript", "Node.js", "MSSQL"],
    link: "https://github.com/example/bpm-platform",
    status: "pilot" as const,
    highlights: [
      "Dinamik iş akışı tasarımı",
      "Çoklu onay seviyesi",
      "Gerçek zamanlı süreç takibi",
      "Entegre raporlama sistemi",
    ],
    challenges: [
      "Karmaşık iş akışı modelleri",
      "Çok kullanıcılı senkronizasyon",
      "Ölçeklenebilirlik",
    ],
    solutions: [
      "BPMN 2.0 standardı",
      "Event-driven architecture",
      "Microservices yaklaşımı",
    ],
    stats: {
      duration: "Devam Ediyor",
      impact: "Pilot Aşama",
    },
  },

  // Mobil Uygulamalar
  {
    id: 14,
    category: "mobile",
    categoryName: "Mobil Uygulamalar",
    title: "Depo Transfer Uygulaması",
    description:
      "Stok sorgulama, depo içi transfer ve depolar arası transfer işlemlerini kolaylaştıran, FIFO prensibini dikkate alarak akıllı uyarılar veren modern mobil depo yönetim uygulaması.",
    images: [
      "/depotransfer1.jpg",
      "/depotransfer2.jpg",
      "/depotransfer3.jpg",
      "/depotransfer4.jpg",
    ],
    technologies: ["Flutter", "Dart", "SQLite", "REST API", "Barcode Scanner"],
    status: "completed" as const,
    highlights: [
      "Stok sorgulama ve anlık güncelleme",
      "Depo içi ve depolar arası transfer",
      "FIFO prensibi uyarısı",
      "Barkod entegrasyonu",
    ],
    challenges: [
      "FIFO algoritması implementasyonu",
      "Real-time stok senkronizasyonu",
      "Offline transfer desteği",
    ],
    solutions: [
      "Custom FIFO logic",
      "WebSocket real-time updates",
      "Local queue system",
    ],
    stats: {
      duration: "3 Ay",
      impact: "10K+ Transfer İşlemi",
    },
  },
  {
    id: 15,
    category: "mobile",
    categoryName: "Mobil Uygulamalar",
    title: "Depo Sayım Uygulaması",
    description:
      "Zebra android cihazlarıyla barkod okutarak ürün miktarlarını kaydeden, sayım verilerini Dinamo ERP sistemine aktaran mobil depo yönetim uygulaması.",
    images: [
      "/stoksayim1.png",
      "/stoksayim2.png",
      "/stoksayim3.png",
      "/stoksayim4.png",
      "/stoksayim5.png",
      "/stoksayim6.png",
      "/stoksayim7.png",
    ],
    technologies: ["Flutter", "Dart", "SQLite", "Zebra SDK", "REST API"],
    status: "completed" as const,
    highlights: [
      "Zebra cihaz entegrasyonu",
      "Barkod okutma ve miktar girişi",
      "Dinamo ERP sistem entegrasyonu",
      "Offline veri senkronizasyonu",
    ],
    challenges: [
      "Zebra cihaz uyumluluğu",
      "Offline çalışma desteği",
      "Büyük veri seti yönetimi",
    ],
    solutions: [
      "Zebra SDK implementasyonu",
      "Local database caching",
      "Optimized data synchronization",
    ],
    metrics: {
      "Toplam Kayıt": 8443,
      "Aktif Kullanıcı": 10,
    },
    stats: {
      duration: "2 Ay",
      impact: "8.4K+ Sayım Kaydı",
    },
  },
  {
    id: 16,
    category: "mobile",
    categoryName: "Mobil Uygulamalar",
    title: "FULL-IT Doğrulama Uygulaması",
    description:
      "Eksik ürünlerin barkod okutularak sisteme kaydedilmesini sağlayan, envanter tutarlılığını manuel müdahale ile sağlayan mobil doğrulama uygulaması.",
    images: ["/fullit1.png"],
    technologies: [
      "Flutter",
      "Dart",
      "SQLite",
      "REST API",
      "Database Validation",
    ],
    status: "completed" as const,
    highlights: [
      "Veritabanı çakışma tespiti",
      "Otomatik doğrulama algoritması",
      "Sistem entegrasyonu",
      "Gerçek zamanlı bildirimler",
    ],
    challenges: [
      "Veritabanı performans optimizasyonu",
      "Çakışma algoritması tasarımı",
      "Offline senkronizasyon",
    ],
    solutions: [
      "Indexed database queries",
      "Custom validation logic",
      "Background sync mechanism",
    ],
    stats: {
      duration: "30 dk",
      impact: "Veri Tutarlılığı",
    },
  },
  {
    id: 17,
    category: "mobile",
    categoryName: "Mobil Uygulamalar",
    title: "Stok Serileme Uygulaması",
    description:
      "Ürünlerin lot numaralarını parçalayarak benzersiz seri numaraları oluşturan, stok takibini ve envanter yönetimini kolaylaştıran mobil serileme uygulaması.",
    images: [
      "/serileme1.png",
      "/serileme2.png",
      "/serileme3.png",
      "/serileme4.png",
      "/serileme5.png",
      "/serileme6.png",
    ],
    technologies: [
      "Flutter",
      "Dart",
      "SQLite",
      "Barcode Scanner",
      "Algorithm Engine",
    ],
    status: "in-progress" as const,
    highlights: [
      "Lot numarası parçalama algoritması",
      "Otomatik seri numarası üretimi",
      "Barkod entegrasyonu",
      "Gerçek zamanlı senkronizasyon",
    ],
    challenges: [
      "Lot numarası parsing karmaşıklığı",
      "Seri numarası çakışma önleme",
      "Offline serileme desteği",
    ],
    solutions: [
      "Regex tabanlı parsing engine",
      "Unique ID generation algorithm",
      "Local caching system",
    ],
    stats: {
      duration: "Devam Ediyor",
      impact: "Stok Takibi Optimizasyonu",
    },
  },
];

export function PresentationView() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideKey, setSlideKey] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(false);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );

  const totalSlides = 1 + 1 + categories.length + projects.length + 1 + 1;

  const filteredProjects =
    selectedTechnologies.length > 0
      ? projects.filter((project) =>
          selectedTechnologies.some((tech) =>
            project.technologies.includes(tech)
          )
        )
      : projects;

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
      setSlideKey((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setSlideKey((prev) => prev + 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setSlideKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip all shortcuts if search dialog is open and an input is focused
      if (showSearch && document.activeElement?.tagName === "INPUT") {
        return; // Don't handle any keyboard shortcuts
      }

      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "Home") {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToSlide(totalSlides - 1);
      } else if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(true);
      } else if (e.key === "?") {
        e.preventDefault();
        setShowKeyboard(!showKeyboard);
      } else if (e.key === "m") {
        e.preventDefault();
        setShowMiniMap(!showMiniMap);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, showKeyboard, showMiniMap]);

  const renderSlide = () => {
    if (currentSlide === 0) {
      return <IntroSlide key={slideKey} />;
    }

    if (currentSlide === 1) {
      return <TableOfContentsSlide key={slideKey} />;
    }

    let slideIndex = 2; // Start after intro and table of contents

    for (
      let categoryIndex = 0;
      categoryIndex < categories.length;
      categoryIndex++
    ) {
      const category = categories[categoryIndex];
      const categoryProjects = filteredProjects.filter(
        (p) => p.category === category.id
      );

      // Category slide
      if (currentSlide === slideIndex) {
        return (
          <CategorySlide
            key={slideKey}
            category={category}
            projectCount={categoryProjects.length}
          />
        );
      }
      slideIndex++;

      // Category projects
      for (
        let projectIndex = 0;
        projectIndex < categoryProjects.length;
        projectIndex++
      ) {
        if (currentSlide === slideIndex) {
          return (
            <ProjectSlide
              key={slideKey}
              project={categoryProjects[projectIndex]}
            />
          );
        }
        slideIndex++;
      }
    }

    // Final slide
    if (currentSlide === slideIndex) {
      return <FinalSlide key={slideKey} />;
    }
    slideIndex++;

    // Thank you slide
    if (currentSlide === slideIndex) {
      return <ThankYouSlide key={slideKey} />;
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden relative">
      {/* Dot Pattern Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          color: "hsl(var(--primary) / 0.15)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />

      <div className="fixed top-4 right-4 flex items-center gap-2 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowSearch(true)}
          className="rounded-full bg-card/90 backdrop-blur-md border-border/50 hover:bg-card"
          title="Arama (Ctrl+K)"
        >
          <Search className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowMiniMap(!showMiniMap)}
          className="rounded-full bg-card/90 backdrop-blur-md border-border/50 hover:bg-card"
          title="Mini Map (M)"
        >
          <Map className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowKeyboard(!showKeyboard)}
          className="rounded-full bg-card/90 backdrop-blur-md border-border/50 hover:bg-card"
          title="Klavye Kısayolları (?)"
        >
          <Keyboard className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsDark(!isDark)}
          className="rounded-full bg-card/90 backdrop-blur-md border-border/50 hover:bg-card"
          title="Tema (T)"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      <div className="h-full w-full relative z-10">{renderSlide()}</div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-card/90 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-border/50 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="rounded-full hover:bg-primary/10 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-primary shadow-lg shadow-primary/30"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className="rounded-full hover:bg-primary/10 transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        <div className="ml-2 px-3 py-1 text-sm text-muted-foreground">
          {currentSlide + 1} / {totalSlides}
        </div>
      </div>

      <SearchDialog
        open={showSearch}
        onOpenChange={setShowSearch}
        projects={projects}
        categories={categories}
        onNavigate={goToSlide}
      />

      <KeyboardShortcuts open={showKeyboard} onOpenChange={setShowKeyboard} />

      <MiniMap
        open={showMiniMap}
        onOpenChange={setShowMiniMap}
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        projects={projects}
        categories={categories}
        onNavigate={goToSlide}
      />
    </div>
  );
}
