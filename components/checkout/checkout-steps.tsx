import Link from "next/link";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface CheckoutStepsProps {
  currentStep: 1 | 2 | 3;
}

const steps = [
  { number: 1, label: "Sepet", href: "/sepet" },
  { number: 2, label: "Ödeme", href: "/odeme" },
  { number: 3, label: "Onay", href: "#" },
];

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <nav className="mb-12 flex items-center justify-center gap-4 sm:gap-8">
      {steps.map((step, index) => {
        const isCompleted = step.number < currentStep;
        const isCurrent = step.number === currentStep;

        return (
          <div key={step.number} className="flex items-center gap-4 sm:gap-8">
            <Link
              href={step.href}
              className={cn(
                "flex items-center gap-2 transition-opacity",
                !isCurrent && !isCompleted && "opacity-40 pointer-events-none"
              )}
            >
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-full text-xs font-medium",
                  isCompleted && "bg-foreground text-background",
                  isCurrent && "border-2 border-foreground text-foreground",
                  !isCompleted && !isCurrent && "border border-border text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="size-4" /> : step.number}
              </span>
              <span
                className={cn(
                  "hidden text-sm sm:inline",
                  isCurrent ? "font-medium text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </Link>
            {index < steps.length - 1 && (
              <div className="h-px w-8 bg-border sm:w-16" />
            )}
          </div>
        );
      })}
    </nav>
  );
}
