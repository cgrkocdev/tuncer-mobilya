import { OrderConfirmationClient } from "@/components/checkout/order-confirmation-client";
import { SiteLayout } from "@/components/layout/site-layout";

interface OrderConfirmationPageProps {
  params: Promise<{ orderId: string }>;
}

export default async function OrderConfirmationPage({
  params,
}: OrderConfirmationPageProps) {
  const { orderId } = await params;

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <OrderConfirmationClient orderId={orderId} />
      </div>
    </SiteLayout>
  );
}
