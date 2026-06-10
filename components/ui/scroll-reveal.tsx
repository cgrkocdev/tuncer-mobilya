"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/** Hafif fade-in — scale yok, performans odaklı */
export function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerReveal({ children, className }: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06 } },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
