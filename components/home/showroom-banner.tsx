import { OptimizedImage } from "@/components/ui/optimized-image";
import { scenes } from "@/lib/visual-assets";

/** Statik showroom bandı — parallax yok, performans odaklı */
export function ShowroomBanner() {
  return (
    <section
      className="relative h-[45vh] min-h-[280px] overflow-hidden sm:min-h-[360px] sm:h-[50vh] lg:h-[60vh]"
      aria-label="Premium showroom"
    >
      <OptimizedImage
        src={scenes.showroomWarm}
        alt="Tuncer Mobilya modern interior showroom"
        fill
        sizes="100vw"
        quality={68}
        cinematic
        className="object-cover"
      />
      <div className="cinematic-overlay absolute inset-0" />
      <div className="on-dark relative z-10 flex h-full flex-col items-center justify-center px-4 text-center sm:px-8">
        <p className="text-on-image-muted text-[10px] font-medium uppercase tracking-[0.3em] sm:text-xs sm:tracking-[0.4em]">
          Showroom
        </p>
        <h2 className="text-on-image mt-4 max-w-3xl font-serif text-2xl font-light leading-tight sm:mt-6 sm:text-4xl lg:text-6xl">
          Mekanlarınıza
          <span className="block italic">Işık ve Doku</span>
        </h2>
      </div>
    </section>
  );
}
