"use client";

import { useState, useEffect } from "react";
import {
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Clock,
  Users,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Rocket,
  Play,
  X,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Project {
  id: number;
  category: string;
  categoryName: string;
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  link?: string;
  status: "completed" | "in-progress" | "pilot";
  highlights: string[];
  challenges: string[];
  solutions: string[];
  stats: {
    duration: string;
    team: string;
    impact: string;
  };
  metrics?: Record<string, number>;
}

interface ProjectSlideProps {
  project: Project;
}

export function ProjectSlide({ project }: ProjectSlideProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animatedMetrics, setAnimatedMetrics] = useState<
    Record<string, number>
  >({});
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [sayimTotal, setSayimTotal] = useState<number | null>(null);
  const [sayimTop10, setSayimTop10] = useState<Array<{
    NOTES: string;
    KayitAdedi: number;
  }> | null>(null);
  const [animatedSayimTotal, setAnimatedSayimTotal] = useState(0);
  const [animatedTop10, setAnimatedTop10] = useState<Array<{
    NOTES: string;
    KayitAdedi: number;
    animatedKayitAdedi: number;
  }> | null>(null);
  const [transferTotal, setTransferTotal] = useState<number | null>(null);
  const [transferTop5, setTransferTop5] = useState<Array<{
    REFTEXT05: string;
    KayitAdedi: number;
  }> | null>(null);
  const [animatedTransferTotal, setAnimatedTransferTotal] = useState(0);
  const [animatedTransferTop5, setAnimatedTransferTop5] = useState<Array<{
    REFTEXT05: string;
    KayitAdedi: number;
    animatedKayitAdedi: number;
  }> | null>(null);

  const [mesTotal, setMesTotal] = useState<number | null>(null);
  const [mesTop10, setMesTop10] = useState<Array<{
    AD: string;
    KayitAdedi: number;
  }> | null>(null);

  const [animatedMesTotal, setAnimatedMesTotal] = useState(0);
  const [animatedMesTop10, setAnimatedMesTop10] = useState<Array<{
    AD: string;
    KayitAdedi: number;
    animatedKayitAdedi: number;
  }> | null>(null);

  const [uretimFisiTotal, setUretimFisiTotal] = useState<number | null>(null);
  const [animatedUretimFisiTotal, setAnimatedUretimFisiTotal] = useState(0);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return {
          label: "Tamamland\u0131",
          icon: CheckCircle2,
          bgColor: "bg-gradient-to-r from-green-500/20 to-emerald-500/20",
          borderColor: "border-green-500/50",
          textColor: "text-green-600 dark:text-green-400",
          iconColor: "text-green-600 dark:text-green-400",
        };
      case "in-progress":
        return {
          label: "Devam Ediyor",
          icon: Play,
          bgColor: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20",
          borderColor: "border-blue-500/50",
          textColor: "text-blue-600 dark:text-blue-400",
          iconColor: "text-blue-600 dark:text-blue-400",
        };
      case "pilot":
        return {
          label: "Pilot",
          icon: Rocket,
          bgColor: "bg-gradient-to-r from-orange-500/20 to-amber-500/20",
          borderColor: "border-orange-500/50",
          textColor: "text-orange-600 dark:text-orange-400",
          iconColor: "text-orange-600 dark:text-orange-400",
        };
      default:
        return {
          label: "Bilinmiyor",
          icon: AlertCircle,
          bgColor: "bg-gray-500/20",
          borderColor: "border-gray-500/50",
          textColor: "text-gray-600 dark:text-gray-400",
          iconColor: "text-gray-600 dark:text-gray-400",
        };
    }
  };

  const statusConfig = getStatusConfig(project.status);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length
    );
  };

  const openImageModal = (index: number) => {
    setModalImageIndex(index);
    setIsImageModalOpen(true);
  };

  const nextModalImage = () => {
    setModalImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevModalImage = () => {
    setModalImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isImageModalOpen) {
        setIsImageModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isImageModalOpen]);

  useEffect(() => {
    if (project.metrics) {
      Object.entries(project.metrics).forEach(([key, targetValue]) => {
        let currentValue = 0;
        const duration = 1000; // 1 saniye
        const steps = 50;
        const increment = targetValue / steps;
        const stepDuration = duration / steps;

        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
          }
          setAnimatedMetrics((prev) => ({
            ...prev,
            [key]: Math.floor(currentValue),
          }));
        }, stepDuration);
      });
    }
  }, [project.metrics]);

  useEffect(() => {
    if (project.title === "Depo Sayım Uygulaması") {
      // Toplam kayıt sayısı için API çağrısı
      fetch("https://nodered.sanel.com.tr:1880/getSayimCount")
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            setSayimTotal(data[0].KayitSayisi);
          }
        })
        .catch((error) => {
          console.error("Sayım toplam API hatası:", error);
          setSayimTotal(8443); // Fallback
        });

      // Top 10 kişi için API çağrısı
      fetch("https://nodered.sanel.com.tr:1880/getSayimCountTOP10")
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            setSayimTop10(data);
          }
        })
        .catch((error) => {
          console.error("Sayım top 10 API hatası:", error);
          setSayimTop10([
            { NOTES: "Emirhan Bedir-HM", KayitAdedi: 1606 },
            { NOTES: "OSMAN PARMAK-HM-SMD", KayitAdedi: 1509 },
            { NOTES: "MELİKE ADAL-KABLOD", KayitAdedi: 1235 },
            { NOTES: "SELÇUK GÜNGÖR-HM", KayitAdedi: 921 },
            { NOTES: "ENDER ÖZTÜRK-HM", KayitAdedi: 704 },
            { NOTES: "AYSU AYDEMİR-HM", KayitAdedi: 591 },
            { NOTES: "Barış Demir-MM", KayitAdedi: 519 },
            { NOTES: "Cemal Ceylan-HM-MKN", KayitAdedi: 335 },
            { NOTES: "ONUR DEMİR-HM", KayitAdedi: 218 },
            { NOTES: "SERHAT KOÇ-MM", KayitAdedi: 213 },
          ]); // Fallback
        });
    }
  }, [project.title]);

  useEffect(() => {
    if (project.title === "Depo Transfer Uygulaması") {
      // Transfer toplam kayıt sayısı için API çağrısı
      fetch("https://nodered.sanel.com.tr:1880/getTotalTransferCount")
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            setTransferTotal(data[0].KayitSayisi);
          }
        })
        .catch((error) => {
          console.error("Transfer toplam API hatası:", error);
          setTransferTotal(10852); // Fallback
        });

      // Transfer top 5 için API çağrısı
      fetch("https://nodered.sanel.com.tr:1880/getTotalTransferCountTOP5")
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            setTransferTop5(data);
          }
        })
        .catch((error) => {
          console.error("Transfer top 5 API hatası:", error);
          setTransferTop5([
            { REFTEXT05: "SEVKİYAT BÖLÜMÜ", KayitAdedi: 4910 },
            { REFTEXT05: "ÖMER CAN ERYILMAZ", KayitAdedi: 2456 },
            { REFTEXT05: "SELÇUK GÜNGÖR", KayitAdedi: 1587 },
            { REFTEXT05: "MEHMET GÜNEŞ", KayitAdedi: 1296 },
            { REFTEXT05: "ONUR DEMİR", KayitAdedi: 266 },
          ]); // Fallback
        });
    }
  }, [project.title]);

  useEffect(() => {
    if (project.title === "Güncel MES Ekranları") {
      // MES toplam kayıt sayısı için API çağrısı
      fetch("https://nodered.sanel.com.tr:1880/getSureTakipCount")
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            setMesTotal(data[0].KayitSayisi);
          }
        })
        .catch((error) => {
          console.error("MES toplam API hatası:", error);
          setMesTotal(75361); // Fallback
        });

      // MES top 10 için API çağrısı
      fetch("https://nodered.sanel.com.tr:1880/getSureTakipCountTOP10")
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            setMesTop10(data);
          }
        })
        .catch((error) => {
          console.error("MES top 10 API hatası:", error);
          setMesTop10([
            { AD: "ADEM AKSU", KayitAdedi: 4154 },
            { AD: "HAKAN TEKŞEN", KayitAdedi: 4120 },
            { AD: "ERKAN AVŞAR", KayitAdedi: 3414 },
            { AD: "İLKAY EM", KayitAdedi: 2819 },
            { AD: "SAMET KALAYCI", KayitAdedi: 2779 },
            { AD: "AYDIN UÇAR", KayitAdedi: 2706 },
            { AD: "DENİZ YAKUT", KayitAdedi: 2234 },
            { AD: "SÜLEYMAN GÜVEN", KayitAdedi: 1915 },
            { AD: "EMRE ALET", KayitAdedi: 1764 },
            { AD: "UĞUR BATMAN", KayitAdedi: 1706 },
          ]); // Fallback
        });
    }
  }, [project.title]);

  useEffect(() => {
    if (project.id === 9) {
      // Üretim Etiketi Oluşturma toplam kayıt sayısı için API çağrısı
      fetch("https://nodered.sanel.com.tr:1880/getUretimFisiCount")
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            setUretimFisiTotal(data[0].KayitSayisi);
          }
        })
        .catch((error) => {
          console.error("Üretim Fişi toplam API hatası:", error);
          setUretimFisiTotal(45); // Fallback
        });
    }
  }, [project.id]);

  // Sayım toplamı animasyonu
  useEffect(() => {
    if (sayimTotal !== null) {
      let currentValue = 0;
      const targetValue = sayimTotal;
      const duration = 1500; // 1.5 saniye
      const steps = 60;
      const stepDuration = duration / steps;
      const stepValue = targetValue / steps;

      const timer = setInterval(() => {
        currentValue += stepValue;
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(timer);
        }
        setAnimatedSayimTotal(Math.floor(currentValue));
      }, stepDuration);
    }
  }, [sayimTotal]);

  // Top 10 animasyonu
  useEffect(() => {
    if (sayimTop10) {
      const animatedData = sayimTop10.map((person) => ({
        ...person,
        animatedKayitAdedi: 0,
      }));
      setAnimatedTop10(animatedData);

      sayimTop10.forEach((person, index) => {
        let currentValue = 0;
        const targetValue = person.KayitAdedi;
        const duration = 1200; // 1.2 saniye
        const steps = 60;
        const stepDuration = duration / steps;
        const stepValue = targetValue / steps;

        setTimeout(() => {
          const timer = setInterval(() => {
            currentValue += stepValue;
            if (currentValue >= targetValue) {
              currentValue = targetValue;
              clearInterval(timer);
            }
            setAnimatedTop10(
              (prev) =>
                prev?.map((p, i) =>
                  i === index
                    ? { ...p, animatedKayitAdedi: Math.floor(currentValue) }
                    : p
                ) || null
            );
          }, stepDuration);
        }, index * 100); // Her kişi için 100ms gecikme
      });
    }
  }, [sayimTop10]);

  // Transfer toplam animasyonu
  useEffect(() => {
    if (transferTotal !== null) {
      let currentValue = 0;
      const targetValue = transferTotal;
      const duration = 1500; // 1.5 saniye
      const steps = 60;
      const stepDuration = duration / steps;
      const stepValue = targetValue / steps;

      const timer = setInterval(() => {
        currentValue += stepValue;
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(timer);
        }
        setAnimatedTransferTotal(Math.floor(currentValue));
      }, stepDuration);
    }
  }, [transferTotal]);

  // Transfer top 5 animasyonu
  useEffect(() => {
    if (transferTop5) {
      const animatedData = transferTop5.map((person) => ({
        ...person,
        animatedKayitAdedi: 0,
      }));
      setAnimatedTransferTop5(animatedData);

      transferTop5.forEach((person, index) => {
        let currentValue = 0;
        const targetValue = person.KayitAdedi;
        const duration = 1200; // 1.2 saniye
        const steps = 60;
        const stepDuration = duration / steps;
        const stepValue = targetValue / steps;

        setTimeout(() => {
          const timer = setInterval(() => {
            currentValue += stepValue;
            if (currentValue >= targetValue) {
              currentValue = targetValue;
              clearInterval(timer);
            }
            setAnimatedTransferTop5(
              (prev) =>
                prev?.map((p, i) =>
                  i === index
                    ? { ...p, animatedKayitAdedi: Math.floor(currentValue) }
                    : p
                ) || null
            );
          }, stepDuration);
        }, index * 100); // Her kişi için 100ms gecikme
      });
    }
  }, [transferTop5]);

  // MES toplamı animasyonu
  useEffect(() => {
    if (mesTotal !== null) {
      let currentValue = 0;
      const targetValue = mesTotal;
      const duration = 1500; // 1.5 saniye
      const steps = 60;
      const stepDuration = duration / steps;
      const stepValue = targetValue / steps;

      const timer = setInterval(() => {
        currentValue += stepValue;
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(timer);
        }
        setAnimatedMesTotal(Math.floor(currentValue));
      }, stepDuration);
    }
  }, [mesTotal]);

  // MES top 10 animasyonu
  useEffect(() => {
    if (mesTop10) {
      const animatedData = mesTop10.map((person) => ({
        ...person,
        animatedKayitAdedi: 0,
      }));
      setAnimatedMesTop10(animatedData);

      mesTop10.forEach((person, index) => {
        let currentValue = 0;
        const targetValue = person.KayitAdedi;
        const duration = 1200; // 1.2 saniye
        const steps = 60;
        const stepDuration = duration / steps;
        const stepValue = targetValue / steps;

        setTimeout(() => {
          const timer = setInterval(() => {
            currentValue += stepValue;
            if (currentValue >= targetValue) {
              currentValue = targetValue;
              clearInterval(timer);
            }
            setAnimatedMesTop10(
              (prev) =>
                prev?.map((p, i) =>
                  i === index
                    ? { ...p, animatedKayitAdedi: Math.floor(currentValue) }
                    : p
                ) || null
            );
          }, stepDuration);
        }, index * 100); // Her kişi için 100ms gecikme
      });
    }
  }, [mesTop10]);

  // Üretim Fişi toplamı animasyonu
  useEffect(() => {
    if (uretimFisiTotal !== null) {
      let currentValue = 0;
      const targetValue = uretimFisiTotal;
      const duration = 1500; // 1.5 saniye
      const steps = 60;
      const stepDuration = duration / steps;
      const stepValue = targetValue / steps;

      const timer = setInterval(() => {
        currentValue += stepValue;
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(timer);
        }
        setAnimatedUretimFisiTotal(Math.floor(currentValue));
      }, stepDuration);
    }
  }, [uretimFisiTotal]);

  return (
    <div className="h-full w-full flex items-center justify-center p-8 lg:p-12 animate-fade-in">
      <div className="max-w-7xl w-full">
        <div className="flex items-center justify-between mb-8 animate-slide-down">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm text-primary border border-primary/30 font-medium rounded-full shadow-lg">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              {project.categoryName}
            </div>

            <div
              className={`inline-flex items-center gap-2 px-4 py-2 ${statusConfig.bgColor} backdrop-blur-sm border ${statusConfig.borderColor} font-medium rounded-full shadow-lg`}
            >
              <statusConfig.icon
                className={`w-4 h-4 ${statusConfig.iconColor}`}
              />
              <span className={statusConfig.textColor}>
                {statusConfig.label}
              </span>
            </div>
          </div>

          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border/50">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">
                {project.stats.duration}
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border/50">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">
                {project.stats.team}
              </span>
            </div>
            {project.stats.devreyeAlmaTarihi && (
              <div className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border/50">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-muted-foreground">
                  Devreye Alma: {project.stats.devreyeAlmaTarihi}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm rounded-full border border-primary/30">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="font-medium text-primary">
                {project.stats.impact}
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Sol taraf - Görsel Galerisi */}
          <div className="space-y-4 animate-slide-left">
            {project.category === "mobile" ? (
              /* Mobil uygulama için telefon çerçevesi */
              <div className="flex justify-center">
                <div className="relative">
                  {/* Telefon çerçevesi */}
                  <div className="w-72 h-[550px] sm:w-80 sm:h-[620px] lg:w-88 lg:h-[690px] bg-gradient-to-b from-slate-800 to-slate-900 rounded-[2rem] lg:rounded-[3rem] border-2 lg:border-4 border-slate-700 shadow-2xl relative overflow-hidden">
                    {/* Telefon ekranı - Ana görsel */}
                    <div
                      className="w-full h-full bg-black rounded-[1.5rem] lg:rounded-[2.5rem] relative overflow-hidden cursor-zoom-in group"
                      onClick={() => openImageModal(currentImageIndex)}
                    >
                      <Image
                        src={
                          project.images[currentImageIndex] ||
                          "/placeholder.svg"
                        }
                        alt={`${project.title} - Görsel ${
                          currentImageIndex + 1
                        }`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>

                      {project.images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              prevImage();
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                          >
                            <ChevronLeft className="w-5 h-5 text-white" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              nextImage();
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                          >
                            <ChevronRight className="w-5 h-5 text-white" />
                          </button>
                        </>
                      )}

                      {project.images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {project.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(index);
                              }}
                              className={`h-1.5 rounded-full transition-all ${
                                index === currentImageIndex
                                  ? "w-8 bg-white"
                                  : "w-1.5 bg-white/50 hover:bg-white/70"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Home indicator */}
                    <div className="absolute bottom-2 lg:bottom-3 left-1/2 -translate-x-1/2 w-20 lg:w-32 h-0.5 lg:h-1 bg-slate-600 rounded-full"></div>
                  </div>
                  {/* Yansıma efekti */}
                  <div className="absolute -bottom-3 lg:-bottom-4 left-3 lg:left-4 right-3 lg:right-4 h-6 lg:h-8 bg-gradient-to-t from-black/20 to-transparent rounded-b-[1.5rem] lg:rounded-b-[2.5rem] blur-sm"></div>
                </div>
              </div>
            ) : (
              /* Normal web/CSP projeleri için standart görsel galerisi */
              <>
                <div
                  className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card group cursor-zoom-in"
                  onClick={() => openImageModal(currentImageIndex)}
                >
                  <Image
                    src={
                      project.images[currentImageIndex] || "/placeholder.svg"
                    }
                    alt={`${project.title} - Görsel ${currentImageIndex + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>

                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>
                    </>
                  )}

                  {project.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {project.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`h-1.5 rounded-full transition-all ${
                            index === currentImageIndex
                              ? "w-8 bg-white"
                              : "w-1.5 bg-white/50 hover:bg-white/70"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {project.metrics && (
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-4 border border-primary/20"
                      >
                        <div className="text-2xl font-bold text-primary mb-1">
                          {project.id === 9 && key === "Üretim Fişi Kaydı"
                            ? animatedUretimFisiTotal.toLocaleString()
                            : animatedMetrics[key]?.toLocaleString() || 0}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {project.images.length > 1 && (
                  <div className="flex gap-3">
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentImageIndex(index);
                          openImageModal(index);
                        }}
                        className={`relative aspect-video w-24 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex
                            ? "border-primary shadow-lg shadow-primary/30"
                            : "border-border/50 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Kanban Bildirim Bilgilendirmesi */}
            {project.id === 6 && (
              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4 mt-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="w-full">
                    <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-2">
                      Otomatik Bildirim Sistemi
                    </h4>
                    <div className="space-y-3">
                      <div className="text-sm text-amber-600 dark:text-amber-400">
                        <span className="font-medium">Gelecek Özellikler:</span>{" "}
                        Belli bir süre hammadde koyulmayan raf için gerekli
                        kişilere mail bildirimi gönderilir.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sağ taraf - Detaylı İçerik */}
          <div className="space-y-6 animate-slide-right">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-balance mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {project.title}
              </h2>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Öneri Sistemi Akışı */}
            {project.title === "Öneri Sistemi" && (
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-5 border border-primary/10">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Öneri Akışı
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary">
                        <span className="text-xs font-bold text-primary">
                          1
                        </span>
                      </div>
                      <span className="text-center text-xs text-muted-foreground">
                        Öneri
                      </span>
                    </div>
                    <div className="flex-1 h-0.5 bg-primary/30 mx-2"></div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary">
                        <span className="text-xs font-bold text-primary">
                          2
                        </span>
                      </div>
                      <span className="text-center text-xs text-muted-foreground">
                        Ön
                        <br />
                        Değerlendirme
                      </span>
                    </div>
                    <div className="flex-1 h-0.5 bg-primary/30 mx-2"></div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary">
                        <span className="text-xs font-bold text-primary">
                          3
                        </span>
                      </div>
                      <span className="text-center text-xs text-muted-foreground">
                        Komite
                        <br />
                        Değerlendirme
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary">
                        <span className="text-xs font-bold text-primary">
                          4
                        </span>
                      </div>
                      <span className="text-center text-xs text-muted-foreground">
                        GM/GMY
                        <br />
                        Değerlendirme
                      </span>
                    </div>
                    <div className="flex-1 h-0.5 bg-primary/30 mx-2"></div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary">
                        <span className="text-xs font-bold text-primary">
                          5
                        </span>
                      </div>
                      <span className="text-center text-xs text-muted-foreground">
                        Ödül
                        <br />
                        Aşaması
                      </span>
                    </div>
                    <div className="flex-1 h-0.5 bg-primary/30 mx-2"></div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary">
                        <span className="text-xs font-bold text-primary">
                          6
                        </span>
                      </div>
                      <span className="text-center text-xs text-muted-foreground">
                        Ödül Teslim
                        <br />
                        Edildi
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-xs text-primary font-medium">
                      💡 Ön Değerlendirme sürecinde GM, GMY ve Komite
                      Bilgilendirmesi
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Depo Sayım Uygulaması İstatistikleri */}
            {project.title === "Depo Sayım Uygulaması" && (
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-5 border border-primary/10">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Sayım İstatistikleri
                  </h3>
                </div>
                <div className="space-y-4">
                  {/* Toplam Kayıt Sayısı */}
                  <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Toplam Sayım Kaydı
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Uygulama üzerinden atılan toplam kayıt sayısı
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {animatedSayimTotal.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Top 10 Kişi */}
                  <div className="bg-secondary/50 rounded-lg p-4 border border-border/50">
                    <p className="text-sm font-medium text-foreground mb-3">
                      En Çok Kayıt Atan Kişiler (Top 10)
                    </p>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {animatedTop10 ? (
                        animatedTop10.map((person, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between py-2 px-3 bg-card/50 rounded border border-border/30"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                                {index + 1}
                              </div>
                              <span className="text-sm text-foreground">
                                {person.NOTES}
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-primary">
                              {person.animatedKayitAdedi.toLocaleString()}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-sm text-muted-foreground">
                            Veriler yükleniyor...
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Depo Transfer Uygulaması İstatistikleri */}
            {project.title === "Depo Transfer Uygulaması" && (
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-5 border border-primary/10">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Transfer İstatistikleri
                  </h3>
                </div>
                <div className="space-y-4">
                  {/* Toplam Transfer Sayısı */}
                  <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Toplam Transfer Kaydı
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Uygulama üzerinden gerçekleştirilen toplam transfer
                          sayısı
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {animatedTransferTotal.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Top 5 Transfer Yapan */}
                  <div className="bg-secondary/50 rounded-lg p-4 border border-border/50">
                    <p className="text-sm font-medium text-foreground mb-3">
                      En Çok Transfer Yapan (Top 5)
                    </p>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {animatedTransferTop5 ? (
                        animatedTransferTop5.map((person, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between py-2 px-3 bg-card/50 rounded border border-border/30"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                                {index + 1}
                              </div>
                              <span className="text-sm text-foreground">
                                {person.REFTEXT05}
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-primary">
                              {person.animatedKayitAdedi.toLocaleString()}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-sm text-muted-foreground">
                            Veriler yükleniyor...
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Güncel MES Ekranları İstatistikleri */}
            {project.title === "Güncel MES Ekranları" && (
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-5 border border-primary/10">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    MES Kullanım İstatistikleri
                  </h3>
                </div>
                <div className="space-y-4">
                  {/* Toplam Süre Takip Kaydı */}
                  <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          2025 Toplam Süre Takip Kaydı
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Operatörlerin tablet kullanarak iş emri bilgilerini
                          güncellediği toplam kayıt sayısı
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {animatedMesTotal.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Top 10 Operatör */}
                  <div className="bg-secondary/50 rounded-lg p-4 border border-border/50">
                    <p className="text-sm font-medium text-foreground mb-3">
                      En Çok Kayıt Giren Operatörler (Top 10)
                    </p>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {animatedMesTop10 ? (
                        animatedMesTop10.map((person, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between py-2 px-3 bg-card/50 rounded border border-border/30"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                                {index + 1}
                              </div>
                              <span className="text-sm text-foreground">
                                {person.AD}
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-primary">
                              {person.animatedKayitAdedi.toLocaleString()}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-sm text-muted-foreground">
                            Veriler yükleniyor...
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-destructive" />
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Zorluklar
                  </h3>
                </div>
                <ul className="space-y-2 text-sm">
                  {project.challenges.map((challenge, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <span className="text-destructive">•</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Çözümler
                  </h3>
                </div>
                <ul className="space-y-2 text-sm">
                  {project.solutions.map((solution, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <span className="text-primary">•</span>
                      <span>{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div> */}

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground text-sm font-medium rounded-lg border border-border/50 hover:scale-105 transition-transform"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.link && project.category !== "mobile" && (
              <Button
                asChild
                size="lg"
                className="group w-full sm:w-auto shadow-lg hover:shadow-primary/20 transition-shadow"
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Projeyi İncele
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
          <div
            className="relative w-full h-full flex items-center justify-center p-8"
            onClick={() => setIsImageModalOpen(false)}
          >
            <img
              src={project.images[modalImageIndex] || "/placeholder.svg"}
              alt={`${project.title} - Görsel ${modalImageIndex + 1}`}
              className="max-w-full max-h-full w-auto h-auto object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {project.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevModalImage();
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-40 shadow-xl"
                >
                  <ChevronLeft className="w-7 h-7 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextModalImage();
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-40 shadow-xl"
                >
                  <ChevronRight className="w-7 h-7 text-white" />
                </button>
              </>
            )}

            {project.images.length > 1 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-40">
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalImageIndex(index);
                    }}
                    className={`h-2.5 rounded-full transition-all ${
                      index === modalImageIndex
                        ? "w-16 bg-white shadow-lg"
                        : "w-2.5 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            )}

            <div
              className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-sm rounded-lg px-5 py-2.5 z-40 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-white text-base font-medium">
                {modalImageIndex + 1} / {project.images.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
