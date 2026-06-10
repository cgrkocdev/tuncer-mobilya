"use client";

import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

import { CartItemRow } from "@/components/cart/cart-item-row";
import { CouponInput } from "@/components/checkout/coupon-input";
import { OrderSummary } from "@/components/checkout/order-summary";
import { SecureBadges } from "@/components/checkout/secure-badges";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

export function CartPageClient() {
  const { items, totals, appliedCoupon, updateQuantity, removeFromCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-secondary">
          <ShoppingBag className="size-8 text-muted-foreground" />
        </div>
        <h1 className="mt-6 font-serif text-2xl text-foreground">
          Sepetiniz Boş
        </h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Henüz sepetinize ürün eklemediniz. Koleksiyonlarımızı keşfedin.
        </p>
        <Button size="lg" className="mt-8" asChild>
          <Link href="/urunler">
            Alışverişe Başla
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
      <div>
        <h1 className="font-serif text-3xl font-light text-foreground lg:text-4xl">
          Sepetim
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {totals.itemCount} ürün
        </p>

        <div className="mt-8">
          {items.map((item) => (
            <CartItemRow
              key={item.productId}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </div>

        <div className="mt-8 lg:hidden">
          <CouponInput />
        </div>
      </div>

      <div className="space-y-6">
        <div className="hidden lg:block">
          <CouponInput />
        </div>

        <OrderSummary
          items={items}
          totals={totals}
          coupon={appliedCoupon}
        />

        <Button size="lg" className="w-full" asChild>
          <Link href="/odeme">
            Ödemeye Geç
            <ArrowRight className="size-4" />
          </Link>
        </Button>

        <Button variant="outline" className="w-full" asChild>
          <Link href="/urunler">Alışverişe Devam Et</Link>
        </Button>

        <SecureBadges />
      </div>
    </div>
  );
}
