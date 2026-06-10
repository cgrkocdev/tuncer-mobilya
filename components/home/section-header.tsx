import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-4xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance text-3xl font-light leading-[1.12] text-footer-foreground sm:text-4xl md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-footer-muted sm:mt-8 sm:text-lg md:text-xl lg:mx-auto lg:max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
