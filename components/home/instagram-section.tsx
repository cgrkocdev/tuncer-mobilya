"use client";

import { Instagram } from "lucide-react";
import Link from "next/link";

import { SectionHeader } from "@/components/home/section-header";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Button } from "@/components/ui/button";
import {
  ScrollReveal,
  StaggerItem,
  StaggerReveal,
} from "@/components/ui/scroll-reveal";
import { instagramPosts } from "@/lib/home-data";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface InstagramSectionProps {
  className?: string;
}

export function InstagramSection({ className }: InstagramSectionProps) {
  return (
    <section className={cn("section-premium", className)}>
      <div className="container-premium">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-end">
            <SectionHeader
              eyebrow="@ofisburo6"
              title="Instagram'da Bizi Takip Edin"
              description="En yeni koleksiyonlar, showroom görüntüleri ve ilham veren mekanlar."
              align="left"
              className="mx-0"
            />
            <Button variant="outline" className="shrink-0" asChild>
              <Link
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="size-4" />
                Takip Et
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        <StaggerReveal className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
          {instagramPosts.map((post) => (
            <StaggerItem key={post.id}>
              <Link
                href={post.href}
                className="group relative block aspect-square overflow-hidden rounded-xl"
              >
                <OptimizedImage
                  src={post.image}
                  alt="Instagram gönderisi"
                  fill
                  quality={65}
                  cinematic
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                  <Instagram className="size-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
