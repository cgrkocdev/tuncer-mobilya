"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { SectionHeader } from "@/components/home/section-header";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import {
  ScrollReveal,
  StaggerItem,
  StaggerReveal,
} from "@/components/ui/scroll-reveal";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

interface FeaturedProductsSectionProps {
  products: Product[];
  className?: string;
}

export function FeaturedProductsSection({
  products,
  className,
}: FeaturedProductsSectionProps) {
  return (
    <section
      className={cn(
        "section-premium border-y border-border/60 bg-secondary/80",
        className
      )}
    >
      <div className="container-premium">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-end">
            <SectionHeader
              eyebrow="Öne Çıkanlar"
              title="Seçkin Parçalar"
              description="En çok tercih edilen, el işçiliğiyle öne çıkan mobilyalarımız."
              align="left"
              className="mx-0"
            />
            <Button variant="outline" className="shrink-0" asChild>
              <Link href="/urunler">
                Tümünü Gör
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        <StaggerReveal className="mt-10 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {products.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
