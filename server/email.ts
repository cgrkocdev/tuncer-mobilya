import type { Order } from "@/types/checkout";
import { formatPrice } from "@/lib/format";

export interface EmailResult {
  sent: boolean;
  messageId: string;
  to: string;
}

/**
 * Mock email gönderimi.
 * Gerçek entegrasyon: Resend, SendGrid veya Nodemailer kullanılabilir.
 */
export async function sendOrderConfirmationEmail(
  order: Order
): Promise<EmailResult> {
  const messageId = `email_${order.id}_${Date.now()}`;

  const emailBody = buildOrderEmailHtml(order);

  if (process.env.NODE_ENV === "development") {
    console.log("\n📧 [MOCK EMAIL] Sipariş Onayı");
    console.log(`To: ${order.customer.email}`);
    console.log(`Subject: Siparişiniz Alındı — ${order.orderNumber}`);
    console.log(`Message ID: ${messageId}`);
    console.log("---");
    console.log(emailBody.replace(/<[^>]+>/g, " ").slice(0, 500) + "...");
    console.log("---\n");
  }

  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    sent: true,
    messageId,
    to: order.customer.email,
  };
}

function buildOrderEmailHtml(order: Order): string {
  const itemsHtml = order.items
    .map(
      (item) =>
        `<tr>
          <td>${item.name} x${item.quantity}</td>
          <td style="text-align:right">${formatPrice(item.lineTotal)}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto;">
      <h1 style="font-weight: 300;">Tuncer Mobilya</h1>
      <p>Sayın ${order.customer.firstName} ${order.customer.lastName},</p>
      <p>Siparişiniz başarıyla alındı. Sipariş numaranız: <strong>${order.orderNumber}</strong></p>
      <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
        ${itemsHtml}
        <tr><td colspan="2"><hr/></td></tr>
        <tr><td>Toplam</td><td style="text-align:right"><strong>${formatPrice(order.totals.total)}</strong></td></tr>
      </table>
      <p style="color: #666; font-size: 14px;">Teslimat adresi: ${order.customer.street}, ${order.customer.district}, ${order.customer.city}</p>
      <p style="color: #666; font-size: 14px;">Teşekkür ederiz.</p>
    </div>
  `;
}
