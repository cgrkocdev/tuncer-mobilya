import { validateCoupon } from "@/lib/coupons";
import { calculateTotals, generateOrderNumber } from "@/lib/checkout";
import { getPaymentProvider } from "@/lib/payment";
import {
  addOrder,
  getOrderById as getStoredOrder,
  getOrders,
} from "@/lib/store/order-store";
import { sendOrderConfirmationEmail } from "@/server/email";
import type {
  CheckoutRequest,
  CheckoutResponse,
  Order,
  OrderItem,
} from "@/types/checkout";

export function getOrderById(orderId: string): Order | undefined {
  return getStoredOrder(orderId);
}

export function getAllOrders(): Order[] {
  return getOrders();
}

export async function processCheckout(
  request: CheckoutRequest
): Promise<CheckoutResponse> {
  if (!request.items.length) {
    return { success: false, error: "Sepetiniz boş." };
  }

  const subtotal = request.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  let coupon;
  if (request.couponCode) {
    const result = validateCoupon(request.couponCode, subtotal);
    if (!result.valid) {
      return { success: false, error: result.message };
    }
    coupon = result.coupon;
  }

  const totals = calculateTotals(request.items, coupon);
  const orderId = `ord_${Date.now()}`;
  const orderNumber = generateOrderNumber();

  const provider = getPaymentProvider(request.paymentProvider);

  const intent = await provider.createIntent({
    amount: totals.total,
    currency: "TRY",
    orderId,
    orderNumber,
    customerEmail: request.customer.email,
    metadata: { paymentMethod: request.paymentMethod },
  });

  const paymentResult = await provider.confirmPayment(intent.id);

  if (!paymentResult.success) {
    return {
      success: false,
      error: paymentResult.error ?? "Ödeme işlemi başarısız.",
    };
  }

  const orderItems: OrderItem[] = request.items.map((item) => ({
    ...item,
    lineTotal: item.price * item.quantity,
  }));

  const order: Order = {
    id: orderId,
    orderNumber,
    status: "paid",
    items: orderItems,
    customer: request.customer,
    paymentMethod: request.paymentMethod,
    paymentProvider: request.paymentProvider,
    transactionId: paymentResult.transactionId,
    coupon,
    totals,
    createdAt: new Date().toISOString(),
    emailSent: false,
  };

  const emailResult = await sendOrderConfirmationEmail(order);
  order.emailSent = emailResult.sent;

  addOrder(order);

  return {
    success: true,
    order,
    redirectUrl: `/siparis-onay/${orderId}`,
  };
}
