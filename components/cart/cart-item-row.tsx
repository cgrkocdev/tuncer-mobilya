"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/types/product";

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemRowProps) {
  return (
    <div className="flex gap-3 border-b border-border/60 py-5 last:border-0 sm:gap-4 sm:py-6">
      <Link
        href={`/urunler/${item.slug}`}
        className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted sm:size-28"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="112px"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link
            href={`/urunler/${item.slug}`}
            className="font-serif text-lg text-foreground hover:opacity-70"
          >
            {item.name}
          </Link>
          {(item.selectedColor || item.selectedFabric) && (
            <p className="mt-1 text-xs text-muted-foreground">
              {[item.selectedColor, item.selectedFabric]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}
          <p className="mt-2 text-sm font-medium">
            {formatPrice(item.price)}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 rounded-lg border border-border">
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
              aria-label="Azalt"
            >
              <Minus className="size-3" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
              aria-label="Artır"
            >
              <Plus className="size-3" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-sm font-medium">
              {formatPrice(item.price * item.quantity)}
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-destructive"
              onClick={() => onRemove(item.productId)}
              aria-label="Kaldır"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
