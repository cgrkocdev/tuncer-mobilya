"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { OrderConfirmation } from "@/components/checkout/order-confirmation";
import { CheckoutSteps } from "@/components/checkout/checkout-steps";
import { Button } from "@/components/ui/button";
import type { Order } from "@/types/checkout";

const ORDER_STORAGE_KEY = "tuncer-last-order";

interface OrderConfirmationClientProps {
  orderId: string;
}

export function OrderConfirmationClient({
  orderId,
}: OrderConfirmationClientProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      try {
        const stored = sessionStorage.getItem(ORDER_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as Order;
          if (parsed.id === orderId) {
            setOrder(parsed);
            setLoading(false);
            return;
          }
        }

        const res = await fetch(`/api/orders/${orderId}`);
        const data = await res.json();
        if (data.success && data.order) {
          setOrder(data.order);
        }
      } catch {
        /* ignore */
      }
      setLoading(false);
    }

    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="py-24 text-center text-muted-foreground">
        Sipariş yükleniyor...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-24 text-center">
        <p className="font-serif text-xl">Sipariş bulunamadı.</p>
        <Button className="mt-6" asChild>
          <Link href="/urunler">Alışverişe Dön</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <CheckoutSteps currentStep={3} />
      <OrderConfirmation order={order} />
    </>
  );
}

export function saveOrderToSession(order: Order) {
  sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
}
