import { ThemeToggle } from "@/components/admin/theme-toggle";

interface AdminHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function AdminHeader({ title, description, actions }: AdminHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-admin-border bg-admin-bg px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-admin-foreground">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-admin-muted">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        {actions}
        <ThemeToggle />
      </div>
    </header>
  );
}
