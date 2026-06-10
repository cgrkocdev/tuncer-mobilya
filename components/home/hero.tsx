"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { showroomImages } from "@/lib/images";
import { cn } from "@/lib/utils";

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      ref={ref}
      className={cn(
        "relative h-[100svh] w-full overflow-hidden bg-neutral-900",
        className
      )}
      aria-label="Tuncer Mobilya ana vitrin"
    >
      {reduced ? (
        <div className="absolute inset-0">
          <OptimizedImage
            src={showroomImages.hero}
            alt="Tuncer Mobilya lüks mobilya showroom"
            fill
            priority
            sizes="100vw"
            quality={70}
            cinematic
            className="object-cover"
          />
        </div>
      ) : (
        <motion.div style={{ y: imageY }} className="absolute inset-[-8%]">
          <OptimizedImage
            src={showroomImages.hero}
            alt="Tuncer Mobilya lüks mobilya showroom"
            fill
            priority
            sizes="100vw"
            quality={70}
            cinematic
            className="object-cover"
          />
        </motion.div>
      )}

      <div className="cinematic-overlay-hero absolute inset-0" />

      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center sm:px-8 lg:px-16">
        <p className="animate-fade-up mb-5 text-[10px] font-medium uppercase tracking-[0.35em] text-white/60 sm:mb-8 sm:text-xs sm:tracking-[0.45em]">
          1985&apos;ten Beri
        </p>

        <h1 className="animate-fade-up-delay font-serif text-4xl font-light tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[5.5rem] lg:leading-[1.05] xl:text-[6.25rem]">
          Tuncer Mobilya
        </h1>

        <p className="animate-fade-up-delay-2 mt-5 max-w-2xl text-balance text-base font-light tracking-wide text-white/75 sm:mt-8 sm:text-lg md:text-xl lg:text-2xl">
          Zamansız Tasarımlar, Usta İşçilik
        </p>

        <div className="animate-fade-up-delay-3 mt-8 flex w-full max-w-md flex-col items-stretch gap-3 px-2 sm:mt-14 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-5">
          <Button
            size="lg"
            className="hover-lift w-full border-0 bg-white px-8 text-base text-black shadow-xl hover:bg-white/95 sm:min-w-[220px] sm:w-auto"
            asChild
          >
            <Link href="/urunler">
              Koleksiyonu Keşfet
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="hover-lift w-full border-white/25 bg-white/8 px-8 text-base text-white backdrop-blur-md hover:bg-white/15 hover:text-white sm:min-w-[220px] sm:w-auto"
            asChild
          >
            <Link href="/urunler">Özel Teklif Al</Link>
          </Button>
        </div>

        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:bottom-14 sm:flex">
          <span className="text-[10px] uppercase tracking-[0.35em] text-white/40">
            Keşfet
          </span>
          <div className="scroll-hint h-12 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
