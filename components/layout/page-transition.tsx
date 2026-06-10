"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (pathname.startsWith("/admin") || reduced) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="min-h-0 flex-1"
    >
      {children}
    </motion.div>
  );
}
