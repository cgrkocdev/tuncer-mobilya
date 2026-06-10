"use client";

import Link from "next/link";

import { SectionHeader } from "@/components/home/section-header";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { scenes } from "@/lib/visual-assets";
import { cn } from "@/lib/utils";

interface BrandStorySectionProps {
  className?: string;
}

export function BrandStorySection({ className }: BrandStorySectionProps) {
  return (
    <section className={cn("section-premium", className)}>
      <div className="container-premium">
        <div className="grid items-center gap-12 sm:gap-16 lg:grid-cols-2 lg:gap-32">
          <ScrollReveal>
            <div className="premium-card relative aspect-[4/5] overflow-hidden rounded-3xl">
              <OptimizedImage
                src={scenes.craftsmanship}
                alt="Tuncer Mobilya usta işçilik atölyesi"
                fill
                quality={68}
                sizes="(max-width: 1024px) 100vw, 50vw"
                cinematic
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <SectionHeader
              eyebrow="Hikayemiz"
              title="Nesilden Nesile Ustalık"
              align="left"
              className="mx-0"
            />
            <div className="mt-10 space-y-6 text-base leading-[1.8] text-muted-foreground sm:text-lg">
              <p>
                1985 yılında küçük bir atölyede başlayan yolculuğumuz, bugün
                Türkiye&apos;nin önde gelen premium mobilya markalarından biri
                haline geldi.
              </p>
              <p>
                Geleneksel işçiliği çağdaş tasarımla buluşturuyor, yaşam
                alanlarınıza sadece mobilya değil — bir yaşam tarzı sunuyoruz.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border/50 pt-10 sm:mt-12 sm:gap-8 sm:pt-12">
              {[
                { value: "40+", label: "Yıl Deneyim" },
                { value: "15K+", label: "Proje" },
                { value: "98%", label: "Memnuniyet" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-2xl text-foreground sm:text-3xl lg:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs tracking-widest text-muted-foreground uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <Button variant="outline" size="lg" className="hover-lift mt-12" asChild>
              <Link href="/hakkimizda">Hikayemizi Oku</Link>
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
