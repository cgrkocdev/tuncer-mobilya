import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  trend?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-admin-border bg-admin-card p-6 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-admin-muted">{title}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-admin-foreground">
            {value}
          </p>
          {description && (
            <p className="mt-1 text-xs text-admin-muted">{description}</p>
          )}
          {trend && (
            <p className="mt-2 text-xs font-medium text-emerald-600">{trend}</p>
          )}
        </div>
        <div className="flex size-10 items-center justify-center rounded-lg bg-admin-accent/10">
          <Icon className="size-5 text-admin-accent" />
        </div>
      </div>
    </div>
  );
}
