import { ExternalLink, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getMapsDirectionsUrl, getMapsEmbedUrl } from "@/lib/maps";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface ContactMapProps {
  className?: string;
}

export function ContactMap({ className }: ContactMapProps) {
  return (
    <div className={cn("premium-card overflow-hidden rounded-2xl", className)}>
      <div className="flex flex-col gap-4 border-b border-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <h2 className="font-serif text-xl text-foreground">Showroom Konumu</h2>
            <p className="mt-1 text-sm text-foreground/75">{siteConfig.address}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="shrink-0" asChild>
          <a
            href={getMapsDirectionsUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Yol Tarifi Al
            <ExternalLink className="size-4" />
          </a>
        </Button>
      </div>
      <iframe
        src={getMapsEmbedUrl()}
        title="Tuncer Mobilya showroom haritası"
        className="h-[280px] w-full border-0 sm:h-[360px] lg:h-[420px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
