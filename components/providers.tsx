"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/hooks/use-cart";
import { WishlistProvider } from "@/hooks/use-wishlist";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}