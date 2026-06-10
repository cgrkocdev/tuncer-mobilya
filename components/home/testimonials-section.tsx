"use client";

import { Star } from "lucide-react";

import { SectionHeader } from "@/components/home/section-header";
import {
  ScrollReveal,
  StaggerItem,
  StaggerReveal,
} from "@/components/ui/scroll-reveal";
import { testimonials } from "@/lib/home-data";
import { cn } from "@/lib/utils";

interface TestimonialsSectionProps {
  className?: string;
}

export function TestimonialsSection({ className }: TestimonialsSectionProps) {
  return (
    <section className={cn("section-premium bg-secondary/40", className)}>
      <div className="container-premium">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Müşteri Yorumları"
            title="Güvenle Tercih Ediliyor"
            description="Binlerce aile ve kurum, yaşam alanlarını Tuncer Mobilya'ya emanet etti."
          />
        </ScrollReveal>

        <StaggerReveal className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2 md:gap-8 lg:mt-20 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <div className="card-hover glass-card flex h-full flex-col rounded-2xl p-8 lg:p-10">
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-foreground text-foreground"
                    />
                  ))}
                </div>

                <blockquote className="mt-6 flex-1 font-serif text-lg leading-relaxed text-foreground lg:text-xl">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="mt-8 border-t border-border/60 pt-6">
                  <p className="text-sm font-medium text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="mt-1 text-xs tracking-wide text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
