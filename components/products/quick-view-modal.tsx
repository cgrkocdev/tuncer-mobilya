"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { StockBadge } from "@/components/products/stock-badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";

interface QuickViewModalProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickViewModal({
  product,
  open,
  onOpenChange,
}: QuickViewModalProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product.stockStatus === "out_of_stock") return;
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      selectedColor: product.colors[0],
      selectedFabric: product.fabrics[0],
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-0 sm:max-w-4xl">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto md:min-h-[480px]">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="rounded-t-2xl object-cover md:rounded-l-2xl md:rounded-tr-none"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="flex flex-col p-6 md:p-8">
            <DialogHeader className="text-left">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {product.category}
              </p>
              <DialogTitle className="mt-2 text-2xl">{product.name}</DialogTitle>
            </DialogHeader>

            <div className="mt-4 flex items-center gap-3">
              <p className="text-xl font-medium">{formatPrice(product.price)}</p>
              <StockBadge status={product.stockStatus} />
            </div>

            <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-auto flex flex-col gap-3 pt-8">
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stockStatus === "out_of_stock"}
              >
                Sepete Ekle
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href={`/urunler/${product.slug}`}>
                  Detayları Gör
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
