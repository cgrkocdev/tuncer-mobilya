import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const metadata = {
  title: {
    default: "Admin Panel",
    template: "%s | Admin | Tuncer Mobilya",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-panel flex h-screen overflow-hidden bg-admin-bg font-sans [&_h1]:font-sans [&_h2]:font-sans [&_h3]:font-sans">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
