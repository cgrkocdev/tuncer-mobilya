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
    description: "Her parça, deneyimli zanaatkârlarımızın elinden çıkar; detaylarda fark yaratırız.",
  },
  {
    title: "Kalite",
    description: "Birinci sınıf malzeme, 5 yıl garanti ve sıkı kalite kontrol standartları.",
  },
  {
    title: "Güven",
    description: "40 yılı aşkın deneyim ve binlerce mutlu müşteriyle sektörde güvenilir marka.",
  },
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
        <div className="section-premium container-premium">
          <ScrollReveal>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
              Hakkımızda
            </p>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">
              Nesilden Nesile Ustalık
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {siteConfig.name}, 1985 yılından bu yana zamansız tasarım ve üstün
              işçilikle yaşam alanlarına değer katıyor.
            </p>
          </ScrollReveal>

          <div className="mt-24 grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <ScrollReveal>
              <div className="premium-card relative aspect-[4/5] overflow-hidden rounded-3xl">
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
              <div className="space-y-6 text-base leading-[1.85] text-muted-foreground sm:text-lg">
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
              <div className="mt-12 grid grid-cols-3 gap-8 border-t border-border/50 pt-12">
                {[
                  { value: "40+", label: "Yıl Deneyim" },
                  { value: "15K+", label: "Tamamlanan Proje" },
                  { value: "98%", label: "Müşteri Memnuniyeti" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-serif text-3xl text-foreground lg:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs tracking-widest text-muted-foreground uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-32 grid gap-8 md:grid-cols-3">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.06}>
                <div className="premium-card h-full rounded-2xl p-8">
                  <h2 className="font-serif text-2xl">{value.title}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-24">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="relative aspect-[21/9] min-h-[280px]">
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
                <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
                  <h2 className="font-serif text-3xl text-white sm:text-4xl">
                    Showroom&apos;umuzu Ziyaret Edin
                  </h2>
                  <p className="mt-4 max-w-lg text-white/75">
                    Koleksiyonlarımızı yakından görmek ve uzman ekibimizle tanışmak
                    için sizi bekliyoruz.
                  </p>
                  <Button
                    size="lg"
                    className="hover-lift mt-8 border-0 bg-white text-black hover:bg-white/95"
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
