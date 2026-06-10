import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PageTransition } from "@/components/layout/page-transition";
import { cn } from "@/lib/utils";

interface SiteLayoutProps {
  children: React.ReactNode;
  className?: string;
  navVariant?: "default" | "transparent";
  mainClassName?: string;
}

export function SiteLayout({
  children,
  className,
  navVariant = "default",
  mainClassName,
}: SiteLayoutProps) {
  return (
    <div className={cn("flex min-h-screen flex-col", className)}>
      <Navbar variant={navVariant} />
      <main
        className={cn(
          "flex min-h-0 flex-1 flex-col",
          navVariant !== "transparent" && "pt-14 sm:pt-16 lg:pt-20",
          mainClassName
        )}
      >
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}
