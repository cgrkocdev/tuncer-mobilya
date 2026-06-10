"use client";

import { useState } from "react";
import { Tag, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

interface CouponInputProps {
  className?: string;
}

export function CouponInput({ className }: CouponInputProps) {
  const { appliedCoupon, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleApply = () => {
    if (!code.trim()) return;
    const result = applyCoupon(code);
    if (result.success) {
      setMessage(result.message);
      setError(false);
      setCode("");
    } else {
      setMessage(result.message);
      setError(true);
    }
  };

  if (appliedCoupon) {
    return (
      <div
        className={cn(
          "flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3",
          className
        )}
      >
        <div className="flex items-center gap-2">
          <Tag className="size-4 text-emerald-700" />
          <span className="text-sm font-medium text-emerald-800">
            {appliedCoupon.code} — {appliedCoupon.description}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            removeCoupon();
            setMessage("");
          }}
          className="text-emerald-700 hover:text-emerald-900"
          aria-label="Kuponu kaldır"
        >
          <X className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex gap-2">
        <Input
          placeholder="Kupon kodu"
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setMessage("");
            setError(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleApply()}
        />
        <Button variant="outline" onClick={handleApply} className="shrink-0">
          Uygula
        </Button>
      </div>
      {message && (
        <p
          className={cn(
            "text-xs",
            error ? "text-destructive" : "text-emerald-700"
          )}
        >
          {message}
        </p>
      )}
      <p className="text-[10px] text-muted-foreground">
        Deneyin: TUNCER10, LUXURY15, WELCOME500
      </p>
    </div>
  );
}
