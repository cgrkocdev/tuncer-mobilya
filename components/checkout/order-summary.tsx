import Image from "next/image";

import { formatPrice } from "@/lib/format";
import type { AppliedCoupon, CartTotals } from "@/types/checkout";
import type { CartItem } from "@/types/product";
import { cn } from "@/lib/utils";

interface OrderSummaryProps {
  items: CartItem[];
  totals: CartTotals;
  coupon?: AppliedCoupon | null;
  className?: string;
  compact?: boolean;
}

export function OrderSummary({
  items,
  totals,
  coupon,
  className,
  compact = false,
}: OrderSummaryProps) {
  return (
    <div className={cn("glass-card rounded-2xl p-6 lg:p-8", className)}>
      <h2 className="font-serif text-xl text-foreground">Sipariş Özeti</h2>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.productId} className="flex gap-4">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium">{item.name}</p>
              {!compact && (item.selectedColor || item.selectedFabric) && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {[item.selectedColor, item.selectedFabric]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">
                Adet: {item.quantity}
              </p>
            </div>
            <p className="shrink-0 text-sm font-medium">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3 border-t border-border/60 pt-6 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Ara Toplam</span>
          <span>{formatPrice(totals.subtotal)}</span>
        </div>
        {coupon && totals.discount > 0 && (
          <div className="flex justify-between text-emerald-700">
            <span>İndirim ({coupon.code})</span>
            <span>-{formatPrice(totals.discount)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Kargo</span>
          <span>
            {totals.shipping === 0 ? (
              <span className="text-emerald-700">Ücretsiz</span>
            ) : (
              formatPrice(totals.shipping)
            )}
          </span>
        </div>
        <div className="flex justify-between border-t border-border/60 pt-3 text-base font-medium">
          <span>Toplam</span>
          <span className="font-serif text-xl">{formatPrice(totals.total)}</span>
        </div>
      </div>
    </div>
  );
}
