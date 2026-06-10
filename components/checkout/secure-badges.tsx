import { Lock, ShieldCheck, Truck } from "lucide-react";

import { cn } from "@/lib/utils";

interface SecureBadgesProps {
  className?: string;
}

const badges = [
  { icon: Lock, label: "256-bit SSL", description: "Güvenli bağlantı" },
  { icon: ShieldCheck, label: "Güvenli Ödeme", description: "Korumalı işlem" },
  { icon: Truck, label: "Ücretsiz Montaj", description: "Teslimat dahil" },
];

export function SecureBadges({ className }: SecureBadgesProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-6 rounded-xl border border-border/60 bg-secondary/30 px-6 py-4",
        className
      )}
    >
      {badges.map((badge) => (
        <div key={badge.label} className="flex items-center gap-2">
          <badge.icon className="size-4 text-muted-foreground" />
          <div>
            <p className="text-xs font-medium">{badge.label}</p>
            <p className="text-[10px] text-muted-foreground">
              {badge.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
