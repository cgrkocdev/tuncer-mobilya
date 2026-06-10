import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

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
  title: "Özel Tasarım Mobilya",
  description:
    "Mekanınıza özel mobilya tasarımı. Keşif, 3D görselleştirme, üretim ve montaj — Tuncer Mobilya ile baştan sona premium süreç.",
  path: "/ozel-tasarim",
});

const steps = [
  {
    step: "01",
    title: "Keşif & Danışmanlık",
    description:
      "Showroom ziyareti veya yerinde keşif ile ihtiyaçlarınızı, ölçülerinizi ve stil tercihlerinizi birlikte belirliyoruz.",
  },
  {
    step: "02",
    title: "Tasarım & Malzeme Seçimi",
    description:
      "İç mimari ekibimiz 3D görselleştirme ile projenizi hayata geçiriyor; kumaş, ahşap ve aksesuar seçimlerini sizinle yapıyoruz.",
  },
  {
    step: "03",
    title: "Üretim & Kalite Kontrol",
    description:
      "Atölyemizde el işçiliği ve modern üretim teknikleriyle mobilyalarınız üretilir; her parça kalite kontrolünden geçer.",
  },
  {
    step: "04",
    title: "Teslimat & Montaj",
    description:
      "Ücretsiz teslimat ve profesyonel montaj ekibimizle mobilyalarınız yaşam alanınıza kusursuz şekilde yerleştirilir.",
  },
];

export default function OzelTasarimPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", url: siteConfig.url },
          { name: "Özel Tasarım", url: `${siteConfig.url}/ozel-tasarim` },
        ])}
      />
      <SiteLayout>
        <section className="relative flex min-h-[50vh] items-end overflow-hidden">
          <OptimizedImage
            src={scenes.showroomHero}
            alt="Özel tasarım mobilya showroom"
            fill
            priority
            quality={70}
            sizes="100vw"
            cinematic
            className="object-cover"
          />
          <div className="cinematic-overlay absolute inset-0" />
          <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 sm:px-8 sm:pb-16 lg:px-16 lg:pb-24">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-white/60">
              Özel Tasarım
            </p>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-light text-white sm:text-5xl lg:text-6xl">
              Mekanınıza Özel, Size Özel
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/75">
              Standart koleksiyonun ötesinde; ölçünüze, zevkinize ve yaşam tarzınıza
              uygun mobilyalar tasarlıyoruz.
            </p>
          </div>
        </section>

        <div className="section-premium container-premium">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-3xl font-light sm:text-4xl">
                Tasarım Sürecimiz
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                İlk görüşmeden teslimata kadar şeffaf, profesyonel ve kişiye özel bir
                deneyim sunuyoruz.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-20 grid gap-8 md:grid-cols-2">
            {steps.map((item, index) => (
              <ScrollReveal key={item.step} delay={index * 0.06}>
                <div className="premium-card h-full rounded-2xl p-8 lg:p-10">
                  <span className="font-serif text-4xl text-muted-foreground/40">
                    {item.step}
                  </span>
                  <h3 className="mt-4 font-serif text-2xl">{item.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-24">
            <div className="premium-card rounded-3xl p-10 lg:p-16">
              <h2 className="font-serif text-3xl font-light">Neler Tasarlıyoruz?</h2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Oturma odası komple çözümler",
                  "Yemek odası & mutfak mobilyaları",
                  "Yatak odası gardırop sistemleri",
                  "Ofis & çalışma alanları",
                  "TV üniteleri & duvar panelleri",
                  "Özel ölçü konsol ve vitrinler",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button size="lg" className="hover-lift mt-12" asChild>
                <Link href="/iletisim">
                  Ücretsiz Keşif Talep Et
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </SiteLayout>
    </>
  );
}
