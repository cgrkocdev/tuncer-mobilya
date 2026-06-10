"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface NavbarProps {
  className?: string;
  variant?: "default" | "transparent";
}

export function Navbar({ className, variant = "default" }: NavbarProps) {
  const { itemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const isTransparent = variant === "transparent" && !scrolled;

  useEffect(() => {
    if (variant !== "transparent") return;

    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        "pt-[env(safe-area-inset-top)]",
        variant === "transparent"
          ? scrolled
            ? "border-b border-border/60 bg-background/85 shadow-sm backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
          : "sticky border-b border-border/60 bg-background/80 backdrop-blur-xl",
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:h-20 lg:px-8">
        <Link
          href="/"
          className={cn(
            "min-w-0 shrink font-serif text-base tracking-tight transition-opacity hover:opacity-70 sm:text-lg lg:text-2xl",
            isTransparent ? "text-white" : "text-foreground"
          )}
        >
          <span className="truncate">{siteConfig.name}</span>
        </Link>

        <nav
          className="hidden items-center gap-5 lg:flex xl:gap-8"
          aria-label="Ana menü"
        >
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "whitespace-nowrap text-sm font-medium tracking-wide transition-colors",
                isTransparent
                  ? "text-white/75 hover:text-white"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Sepet"
            className={cn(
              "relative size-10 sm:size-9",
              isTransparent &&
                "text-white hover:bg-white/10 hover:text-white"
            )}
            asChild
          >
            <Link href="/sepet">
              <ShoppingBag className="size-4" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
          </Button>
          <MobileNav isTransparent={isTransparent} />
        </div>
      </div>
    </header>
  );
}
