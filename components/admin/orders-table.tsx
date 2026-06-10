import { formatPrice } from "@/lib/format";
import type { Order } from "@/types/checkout";
import { cn } from "@/lib/utils";

interface OrdersTableProps {
  orders: Order[];
}

const statusLabels: Record<string, string> = {
  pending: "Beklemede",
  paid: "Ödendi",
  processing: "Hazırlanıyor",
  shipped: "Kargoda",
  delivered: "Teslim Edildi",
  cancelled: "İptal",
};

const statusStyles: Record<string, string> = {
  paid: "bg-emerald-500/10 text-emerald-600",
  pending: "bg-amber-500/10 text-amber-600",
  processing: "bg-blue-500/10 text-blue-600",
  shipped: "bg-purple-500/10 text-purple-600",
  delivered: "bg-emerald-500/10 text-emerald-600",
  cancelled: "bg-red-500/10 text-red-600",
};

export function OrdersTable({ orders }: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-admin-border py-16 text-center text-admin-muted">
        Henüz sipariş yok.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-admin-border bg-admin-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-admin-border bg-admin-hover/50">
            <th className="px-4 py-3 text-left font-medium text-admin-muted">
              Sipariş No
            </th>
            <th className="hidden px-4 py-3 text-left font-medium text-admin-muted sm:table-cell">
              Müşteri
            </th>
            <th className="px-4 py-3 text-left font-medium text-admin-muted">
              Ürünler
            </th>
            <th className="px-4 py-3 text-left font-medium text-admin-muted">
              Toplam
            </th>
            <th className="px-4 py-3 text-left font-medium text-admin-muted">
              Durum
            </th>
            <th className="hidden px-4 py-3 text-left font-medium text-admin-muted md:table-cell">
              Tarih
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-admin-border last:border-0"
            >
              <td className="px-4 py-3 font-medium text-admin-foreground">
                {order.orderNumber}
              </td>
              <td className="hidden px-4 py-3 sm:table-cell">
                <p className="text-admin-foreground">
                  {order.customer.firstName} {order.customer.lastName}
                </p>
                <p className="text-xs text-admin-muted">
                  {order.customer.email}
                </p>
              </td>
              <td className="px-4 py-3 text-admin-muted">
                {order.items.length} ürün
              </td>
              <td className="px-4 py-3 font-medium">
                {formatPrice(order.totals.total)}
              </td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                    statusStyles[order.status] ?? statusStyles.pending
                  )}
                >
                  {statusLabels[order.status] ?? order.status}
                </span>
              </td>
              <td className="hidden px-4 py-3 text-admin-muted md:table-cell">
                {new Date(order.createdAt).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
