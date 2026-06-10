"use client";

import { Instagram, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from "@/hooks/use-cart";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isTransparent?: boolean;
}

export function MobileNav({ isTransparent }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "lg:hidden",
          isTransparent && "text-white hover:bg-white/10 hover:text-white"
        )}
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span className="flex flex-col gap-1.5 p-1">
          <span className="block h-0.5 w-5 rounded-full bg-current" />
          <span className="block h-0.5 w-5 rounded-full bg-current" />
          <span className="block h-0.5 w-3.5 rounded-full bg-current" />
        </span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={cn(
            "fixed inset-y-0 right-0 left-auto top-0 flex h-[100dvh] w-[min(100vw,20rem)] max-w-none translate-x-0 translate-y-0 flex-col rounded-none border-0 border-l border-border/60 p-0 shadow-2xl sm:w-80",
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
            "[&>button.absolute]:hidden"
          )}
        >
          <DialogTitle className="sr-only">Navigasyon menüsü</DialogTitle>

          <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
            <span className="font-serif text-lg">{siteConfig.name}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              aria-label="Kapat"
            >
              <X className="size-5" />
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {siteConfig.navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex min-h-12 items-center rounded-xl px-4 text-base font-medium transition-colors",
                        active
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="space-y-3 border-t border-border/60 p-5">
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link href="/sepet">
                Sepet
                {itemCount > 0 && (
                  <span className="flex size-6 items-center justify-center rounded-full bg-foreground text-xs text-background">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
                <ShoppingBag className="size-4 opacity-50" />
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2" asChild>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="size-4" />
                @ofisburo6
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
