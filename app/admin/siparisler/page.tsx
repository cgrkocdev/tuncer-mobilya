import { AdminHeader } from "@/components/admin/admin-header";
import { OrdersTable } from "@/components/admin/orders-table";
import { getAllOrders } from "@/server/orders";

export const metadata = { title: "Siparişler" };

export default function AdminOrdersPage() {
  const orders = getAllOrders();

  return (
    <>
      <AdminHeader
        title="Siparişler"
        description={`${orders.length} sipariş`}
      />
      <div className="flex-1 overflow-y-auto p-8">
        <OrdersTable orders={orders} />
      </div>
    </>
  );
}
