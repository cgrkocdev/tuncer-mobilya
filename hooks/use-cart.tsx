"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { validateCoupon } from "@/lib/coupons";
import { calculateTotals } from "@/lib/checkout";
import type { AppliedCoupon } from "@/types/checkout";
import type { CartItem } from "@/types/product";

const CART_STORAGE_KEY = "tuncer-cart";
const COUPON_STORAGE_KEY = "tuncer-coupon";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  appliedCoupon: AppliedCoupon | null;
  totals: ReturnType<typeof calculateTotals>;
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(
    null
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) setItems(JSON.parse(storedCart));

      const storedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (storedCoupon) setAppliedCoupon(JSON.parse(storedCoupon));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (appliedCoupon) {
      localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem(COUPON_STORAGE_KEY);
    }
  }, [appliedCoupon, hydrated]);

  const totals = useMemo(
    () => calculateTotals(items, appliedCoupon),
    [items, appliedCoupon]
  );

  const itemCount = totals.itemCount;

  const addToCart = useCallback(
    (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      const qty = item.quantity ?? 1;
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === item.productId);
        if (existing) {
          return prev.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + qty }
              : i
          );
        }
        return [...prev, { ...item, quantity: qty }];
      });
    },
    []
  );

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.productId !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
  }, []);

  const applyCoupon = useCallback(
    (code: string) => {
      const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const result = validateCoupon(code, subtotal);
      if (!result.valid) {
        return { success: false, message: result.message };
      }
      setAppliedCoupon(result.coupon);
      return { success: true, message: result.coupon.description };
    },
    [items]
  );

  const removeCoupon = useCallback(() => setAppliedCoupon(null), []);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        appliedCoupon,
        totals,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
