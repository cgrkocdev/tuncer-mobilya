import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteLayout } from "@/components/layout/site-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site-config";
import { scenes } from "@/lib/visual-assets";

export const metadata = buildPageMetadata({
  title: "Hakkımızda",
  description:
    "1985'ten beri premium mobilya üretimi. Tuncer Mobilya'nın hikayesi, değerleri ve ustalık geleneği.",
  path: "/hakkimizda",
});

const values = [
  {
    title: "Ustalık",
    description:
      "Her parça, deneyimli zanaatkârlarımızın elinden çıkar; detaylarda fark yaratırız.",
  },
  {
    title: "Kalite",
    description:
      "Birinci sınıf malzeme, 5 yıl garanti ve sıkı kalite kontrol standartları.",
  },
  {
    title: "Güven",
    description:
      "40 yılı aşkın deneyim ve binlerce mutlu müşteriyle sektörde güvenilir marka.",
  },
];

const stats = [
  { value: "40+", label: "Yıl Deneyim", shortLabel: "Deneyim" },
  { value: "15K+", label: "Tamamlanan Proje", shortLabel: "Proje" },
  { value: "98%", label: "Müşteri Memnuniyeti", shortLabel: "Memnuniyet" },
];

export default function HakkimizdaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", url: siteConfig.url },
          { name: "Hakkımızda", url: `${siteConfig.url}/hakkimizda` },
        ])}
      />
      <SiteLayout>
        <div className="section-premium container-premium overflow-x-hidden">
          <ScrollReveal>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-xs sm:tracking-[0.35em]">
              Hakkımızda
            </p>
            <h1 className="mt-4 max-w-3xl text-balance font-serif text-3xl font-light leading-[1.15] sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl">
              Nesilden Nesile Ustalık
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg md:text-xl">
              {siteConfig.name}, 1985 yılından bu yana zamansız tasarım ve üstün
              işçilikle yaşam alanlarına değer katıyor.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 items-start gap-10 sm:mt-16 sm:gap-12 lg:mt-24 lg:grid-cols-2 lg:items-center lg:gap-24">
            <ScrollReveal>
              <div className="premium-card relative aspect-[4/5] max-h-[70vh] w-full overflow-hidden rounded-2xl sm:max-h-none sm:rounded-3xl">
                <OptimizedImage
                  src={scenes.craftsmanship}
                  alt="Tuncer Mobilya atölye ve ustalık"
                  fill
                  quality={68}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  cinematic
                  className="object-cover"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div className="space-y-5 text-base leading-[1.8] text-muted-foreground sm:space-y-6 sm:text-lg sm:leading-[1.85]">
                <p>
                  Küçük bir atölyede başlayan yolculuğumuz, bugün İstanbul&apos;un
                  kalbinde premium bir showroom ve modern üretim tesisleriyle devam
                  ediyor. Geleneksel marangozluk bilgisini çağdaş iç mimari anlayışıyla
                  birleştiriyoruz.
                </p>
                <p>
                  Koleksiyonlarımızın yanı sıra özel tasarım projeleriyle otel,
                  rezidans ve kurumsal mekânlara da çözüm üretiyoruz. Her müşterimize
                  kişisel danışmanlık ve proje yönetimi sunuyoruz.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-border/50 pt-8 sm:mt-12 sm:gap-6 sm:pt-12">
                {stats.map((stat) => (
                  <div key={stat.label} className="min-w-0 text-center sm:text-left">
                    <p className="font-serif text-2xl text-foreground sm:text-3xl lg:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-1.5 text-[10px] leading-tight tracking-wide text-muted-foreground uppercase sm:mt-2 sm:text-xs sm:tracking-widest">
                      <span className="sm:hidden">{stat.shortLabel}</span>
                      <span className="hidden sm:inline">{stat.label}</span>
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-5 sm:mt-24 sm:grid-cols-2 sm:gap-6 lg:mt-32 lg:grid-cols-3 lg:gap-8">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.06}>
                <div className="premium-card h-full rounded-2xl p-6 sm:p-8">
                  <h2 className="font-serif text-xl sm:text-2xl">{value.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-16 sm:mt-24">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
              <div className="relative aspect-[3/4] min-h-[320px] sm:aspect-[16/9] sm:min-h-[280px] lg:aspect-[21/9]">
                <OptimizedImage
                  src={scenes.showroomWarm}
                  alt="Tuncer Mobilya showroom"
                  fill
                  quality={68}
                  sizes="100vw"
                  cinematic
                  className="object-cover"
                />
                <div className="cinematic-overlay absolute inset-0" />
                <div className="on-dark absolute inset-0 z-10 flex flex-col items-center justify-center px-4 py-8 text-center sm:px-8">
                  <h2 className="text-on-image text-balance font-serif text-2xl sm:text-3xl md:text-4xl">
                    Showroom&apos;umuzu Ziyaret Edin
                  </h2>
                  <p className="text-on-image-muted mt-3 max-w-lg text-sm sm:mt-4 sm:text-base">
                    Koleksiyonlarımızı yakından görmek ve uzman ekibimizle tanışmak
                    için sizi bekliyoruz.
                  </p>
                  <Button
                    size="lg"
                    className="hover-lift mt-6 w-full max-w-xs border-0 bg-[oklch(0.98_0.01_90)] text-primary hover:bg-[oklch(0.99_0.008_92)] sm:mt-8 sm:w-auto"
                    asChild
                  >
                    <Link href="/iletisim">
                      Randevu Al
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SiteLayout>
    </>
  );
}
