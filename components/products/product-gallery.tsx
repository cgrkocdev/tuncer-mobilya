"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { OptimizedImage } from "@/components/ui/optimized-image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  className?: string;
}

export function ProductGallery({
  images,
  productName,
  className,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index: number) => {
    setActiveIndex((index + images.length) % images.length);
  };

  return (
    <div className={cn("space-y-5", className)}>
      <div className="premium-card relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted lg:aspect-square">
        <OptimizedImage
          key={activeIndex}
          src={images[activeIndex]}
          alt={`${productName} — görsel ${activeIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-500"
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority={activeIndex === 0}
          quality={72}
          cinematic
        />

        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white/90 shadow-lg backdrop-blur-sm sm:left-4"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Önceki görsel"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white/90 shadow-lg backdrop-blur-sm sm:right-4"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Sonraki görsel"
            >
              <ChevronRight className="size-4" />
            </Button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative size-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                index === activeIndex
                  ? "border-foreground"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
              aria-label={`Görsel ${index + 1}`}
            >
              <OptimizedImage
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
