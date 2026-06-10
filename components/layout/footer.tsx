import Link from "next/link";

import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("border-t border-border/60 bg-card", className)}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="font-serif text-xl tracking-tight text-foreground"
            >
              {siteConfig.name}
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          {siteConfig.footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-foreground">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} {siteConfig.name}. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Gizlilik Politikası
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Kullanım Koşulları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
