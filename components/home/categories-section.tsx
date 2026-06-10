"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { SectionHeader } from "@/components/home/section-header";
import { OptimizedImage } from "@/components/ui/optimized-image";
import {
  ScrollReveal,
  StaggerItem,
  StaggerReveal,
} from "@/components/ui/scroll-reveal";
import { categories } from "@/lib/home-data";
import { cn } from "@/lib/utils";

interface CategoriesSectionProps {
  className?: string;
}

export function CategoriesSection({ className }: CategoriesSectionProps) {
  return (
    <section className={cn("section-premium", className)}>
      <div className="container-premium">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Kategoriler"
            title="Her Oda İçin Özel Koleksiyonlar"
            description="Yaşam alanlarınızı baştan sona tasarlayan, ustalıkla üretilen mobilya serilerimizi keşfedin."
          />
        </ScrollReveal>

        <StaggerReveal className="mt-12 grid grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-2 sm:gap-8 lg:mt-24 lg:grid-cols-4">
          {categories.map((category) => (
            <StaggerItem key={category.id}>
              <Link
                href={category.href}
                className="group card-hover glass-card relative block overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <OptimizedImage
                    src={category.image}
                    alt={category.name}
                    fill
                    quality={68}
                    cinematic
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/40 to-black/10 transition-opacity duration-500 group-hover:from-black/92" />
                </div>

                <div className="on-dark absolute inset-x-0 bottom-0 z-10 p-4 sm:p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-on-image font-serif text-xl lg:text-2xl">
                        {category.name}
                      </h3>
                      <p className="text-on-image-muted mt-2 text-sm">
                        {category.description}
                      </p>
                    </div>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/30 text-white shadow-md backdrop-blur-md transition-colors group-hover:bg-white group-hover:text-primary">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
