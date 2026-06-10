"use client";

import { cn } from "@/lib/utils";
import { availableColors } from "@/lib/products-data";

interface VariantSelectorProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  type?: "color" | "fabric";
}

export function VariantSelector({
  label,
  options,
  value,
  onChange,
  type = "fabric",
}: VariantSelectorProps) {
  if (options.length === 0) return null;

  return (
    <div>
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}: <span className="text-foreground">{value}</span>
      </p>

      {type === "color" ? (
        <div className="flex flex-wrap gap-2">
          {options.map((option) => {
            const colorData = availableColors.find((c) => c.name === option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => onChange(option)}
                className={cn(
                  "flex size-10 items-center justify-center rounded-full border-2 transition-all",
                  value === option
                    ? "border-foreground scale-110"
                    : "border-transparent hover:scale-105"
                )}
                title={option}
                aria-label={option}
              >
                <span
                  className="size-8 rounded-full border border-black/10"
                  style={{
                    backgroundColor: colorData?.hex ?? "#ccc",
                  }}
                />
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-medium transition-all",
                value === option
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-foreground hover:border-foreground/50"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
