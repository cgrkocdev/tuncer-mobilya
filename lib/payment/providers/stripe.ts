import type {
  PaymentConfirmResult,
  PaymentIntent,
  PaymentIntentRequest,
  PaymentProvider,
} from "@/lib/payment/types";

/**
 * Stripe entegrasyonu için hazır adapter.
 * Gerçek entegrasyon: STRIPE_SECRET_KEY env değişkeni gerekir.
 *
 * npm install stripe
 * const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
 */
export const stripePaymentProvider: PaymentProvider = {
  name: "stripe",

  async createIntent(request: PaymentIntentRequest): Promise<PaymentIntent> {
    // Stripe PaymentIntent oluşturma noktası
    // const intent = await stripe.paymentIntents.create({...})
    return {
      id: `stripe_pi_${request.orderId}`,
      provider: "stripe",
      amount: request.amount,
      currency: request.currency,
      clientSecret: `pi_mock_secret_${request.orderId}`,
      status: "requires_payment",
    };
  },

  async confirmPayment(intentId: string): Promise<PaymentConfirmResult> {
    // Stripe webhook veya confirmCardPayment sonucu
    return {
      success: true,
      transactionId: `stripe_txn_${intentId}`,
      status: "succeeded",
    };
  },
};
