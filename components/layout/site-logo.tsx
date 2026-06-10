import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface SiteLogoProps {
  className?: string;
  href?: string;
  imageClassName?: string;
  showName?: boolean;
  variant?: "default" | "light";
}

export function SiteLogo({
  className,
  href = "/",
  imageClassName,
  showName = true,
  variant = "default",
}: SiteLogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex min-w-0 items-center gap-2.5 transition-opacity hover:opacity-80",
        className
      )}
    >
      <Image
        src={siteConfig.logo}
        alt={siteConfig.name}
        width={48}
        height={48}
        priority
        className={cn(
          "size-8 shrink-0 rounded-full object-cover ring-1 ring-border/40 sm:size-10 lg:size-11",
          imageClassName
        )}
      />
      {showName ? (
        <span
          className={cn(
            "truncate font-serif text-sm tracking-tight sm:text-lg lg:text-xl",
            variant === "light" ? "text-white" : "text-inherit"
          )}
        >
          {siteConfig.name}
        </span>
      ) : null}
    </Link>
  );
}
