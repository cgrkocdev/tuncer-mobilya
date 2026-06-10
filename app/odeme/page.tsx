import { CheckoutForm } from "@/components/checkout/checkout-form";
import { CheckoutSteps } from "@/components/checkout/checkout-steps";
import { SiteLayout } from "@/components/layout/site-layout";

export const metadata = {
  title: "Ödeme",
  description: "Siparişinizi tamamlayın ve güvenli ödeme yapın.",
};

export default function CheckoutPage() {
  return (
    <SiteLayout>
      <div className="page-container">
        <CheckoutSteps currentStep={2} />
        <h1 className="mb-10 font-serif text-3xl font-light text-foreground lg:text-4xl">
          Ödeme
        </h1>
        <CheckoutForm />
      </div>
    </SiteLayout>
  );
}
