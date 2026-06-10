"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ExternalLink,
  LayoutDashboard,
  Package,
  ShoppingCart,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/urunler", label: "Ürünler", icon: Package },
  { href: "/admin/siparisler", label: "Siparişler", icon: ShoppingCart },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-admin-border bg-admin-sidebar">
      <div className="flex h-16 items-center border-b border-admin-border px-6">
        <Link href="/admin" className="font-serif text-lg tracking-tight">
          {siteConfig.name}
        </Link>
        <span className="ml-2 rounded-md bg-admin-accent/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-admin-accent">
          Admin
        </span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-admin-accent text-white"
                  : "text-admin-muted hover:bg-admin-hover hover:text-admin-foreground"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-admin-border p-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-admin-muted transition-colors hover:bg-admin-hover hover:text-admin-foreground"
        >
          <ExternalLink className="size-4" />
          Mağazayı Görüntüle
        </Link>
      </div>
    </aside>
  );
}
