import { CheckCircle2, Mail, Package } from "lucide-react";
import Link from "next/link";

import { OrderSummary } from "@/components/checkout/order-summary";
import { SecureBadges } from "@/components/checkout/secure-badges";
import { Button } from "@/components/ui/button";
import type { Order } from "@/types/checkout";

interface OrderConfirmationProps {
  order: Order;
}

export function OrderConfirmation({ order }: OrderConfirmationProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-50">
        <CheckCircle2 className="size-8 text-emerald-600" />
      </div>

      <h1 className="mt-6 font-serif text-3xl font-light text-foreground">
        Siparişiniz Alındı
      </h1>
      <p className="mt-3 text-muted-foreground">
        Teşekkür ederiz! Sipariş numaranız:{" "}
        <strong className="text-foreground">{order.orderNumber}</strong>
      </p>

      {order.emailSent && (
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
          <Mail className="size-4" />
          Onay e-postası {order.customer.email} adresine gönderildi
        </div>
      )}

      <div className="mt-10 text-left">
        <OrderSummary
          items={order.items}
          totals={order.totals}
          coupon={order.coupon}
        />
      </div>

      <div className="mt-8 rounded-xl border border-border/60 bg-secondary/30 p-6 text-left text-sm">
        <div className="flex items-start gap-3">
          <Package className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
          <div>
            <p className="font-medium">Teslimat Bilgileri</p>
            <p className="mt-2 text-muted-foreground">
              {order.customer.firstName} {order.customer.lastName}
              <br />
              {order.customer.street}
              <br />
              {order.customer.district}, {order.customer.city}{" "}
              {order.customer.postalCode}
            </p>
            <p className="mt-3 text-muted-foreground">
              Tahmini teslimat: 5-10 iş günü
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <SecureBadges />
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button size="lg" asChild>
          <Link href="/urunler">Alışverişe Devam Et</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/">Ana Sayfa</Link>
        </Button>
      </div>
    </div>
  );
}
