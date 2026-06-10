import { CartPageClient } from "@/components/cart/cart-page-client";
import { CheckoutSteps } from "@/components/checkout/checkout-steps";
import { SiteLayout } from "@/components/layout/site-layout";

export const metadata = {
  title: "Sepet",
  description: "Alışveriş sepetinizi görüntüleyin ve ödemeye geçin.",
};

export default function CartPage() {
  return (
    <SiteLayout>
      <div className="page-container">
        <CheckoutSteps currentStep={1} />
        <CartPageClient />
      </div>
    </SiteLayout>
  );
}
