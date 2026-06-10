"use client";

import { CreditCard, Landmark, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { saveOrderToSession } from "@/components/checkout/order-confirmation-client";
import { OrderSummary } from "@/components/checkout/order-summary";
import { SecureBadges } from "@/components/checkout/secure-badges";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/hooks/use-cart";
import type { PaymentMethod, PaymentProviderType } from "@/types/checkout";
import { cn } from "@/lib/utils";

const paymentMethods: {
  id: PaymentMethod;
  label: string;
  description: string;
  icon: typeof CreditCard;
}[] = [
  {
    id: "credit_card",
    label: "Kredi / Banka Kartı",
    description: "Visa, Mastercard, Troy",
    icon: CreditCard,
  },
  {
    id: "installment",
    label: "Taksitli Ödeme",
    description: "12 aya varan taksit",
    icon: CreditCard,
  },
  {
    id: "bank_transfer",
    label: "Havale / EFT",
    description: "Banka havalesi ile ödeme",
    icon: Landmark,
  },
];

const providerOptions: {
  id: PaymentProviderType;
  label: string;
  description: string;
}[] = [
  { id: "mock", label: "Demo Ödeme", description: "Test ortamı" },
  { id: "stripe", label: "Stripe", description: "Uluslararası kartlar" },
  { id: "iyzico", label: "Iyzico", description: "Türkiye ödeme altyapısı" },
];

export function CheckoutForm() {
  const router = useRouter();
  const { items, totals, appliedCoupon, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    district: "",
    city: "",
    postalCode: "",
    notes: "",
    paymentMethod: "credit_card" as PaymentMethod,
    paymentProvider: "mock" as PaymentProviderType,
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customer: {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            street: form.street,
            district: form.district,
            city: form.city,
            postalCode: form.postalCode,
            notes: form.notes || undefined,
          },
          paymentMethod: form.paymentMethod,
          paymentProvider: form.paymentProvider,
          couponCode: appliedCoupon?.code,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error ?? "Bir hata oluştu.");
        return;
      }

      if (data.order) saveOrderToSession(data.order);
      clearCart();
      router.push(data.redirectUrl ?? `/siparis-onay/${data.order.id}`);
    } catch {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-serif text-xl">Sepetiniz boş.</p>
        <Button className="mt-6" asChild>
          <Link href="/urunler">Ürünlere Git</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
        <div className="space-y-10">
          <section>
            <h2 className="font-serif text-xl text-foreground">
              İletişim Bilgileri
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">Ad</Label>
                <Input
                  id="firstName"
                  required
                  value={form.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Soyad</Label>
                <Input
                  id="lastName"
                  required
                  value={form.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  placeholder="05XX XXX XX XX"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground">
              Teslimat Adresi
            </h2>
            <div className="mt-6 grid gap-4">
              <div>
                <Label htmlFor="street">Adres</Label>
                <Input
                  id="street"
                  required
                  value={form.street}
                  onChange={(e) => updateField("street", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <Label htmlFor="district">İlçe</Label>
                  <Input
                    id="district"
                    required
                    value={form.district}
                    onChange={(e) => updateField("district", e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="city">Şehir</Label>
                  <Input
                    id="city"
                    required
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Posta Kodu</Label>
                  <Input
                    id="postalCode"
                    required
                    value={form.postalCode}
                    onChange={(e) => updateField("postalCode", e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Sipariş Notu (opsiyonel)</Label>
                <Textarea
                  id="notes"
                  value={form.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                  className="mt-2"
                  placeholder="Teslimat için özel notlarınız..."
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground">
              Ödeme Yöntemi
            </h2>
            <div className="mt-6 space-y-3">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all",
                    form.paymentMethod === method.id
                      ? "border-foreground bg-secondary/50"
                      : "border-border hover:border-foreground/30"
                  )}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={form.paymentMethod === method.id}
                    onChange={() => updateField("paymentMethod", method.id)}
                    className="sr-only"
                  />
                  <method.icon className="size-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{method.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {method.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground">
              Ödeme Altyapısı
            </h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Stripe veya Iyzico entegrasyonuna hazır yapı
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {providerOptions.map((provider) => (
                <label
                  key={provider.id}
                  className={cn(
                    "flex cursor-pointer flex-col rounded-xl border p-4 transition-all",
                    form.paymentProvider === provider.id
                      ? "border-foreground bg-secondary/50"
                      : "border-border hover:border-foreground/30"
                  )}
                >
                  <input
                    type="radio"
                    name="paymentProvider"
                    value={provider.id}
                    checked={form.paymentProvider === provider.id}
                    onChange={() =>
                      updateField("paymentProvider", provider.id)
                    }
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">{provider.label}</span>
                  <span className="mt-1 text-xs text-muted-foreground">
                    {provider.description}
                  </span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <OrderSummary
            items={items}
            totals={totals}
            coupon={appliedCoupon}
            compact
          />

          {error && (
            <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          )}

          <Button size="lg" className="w-full text-sm sm:text-base" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                İşleniyor...
              </>
            ) : (
              `Siparişi Tamamla — ${new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(totals.total)}`
            )}
          </Button>

          <SecureBadges />
        </div>
      </div>
    </form>
  );
}
