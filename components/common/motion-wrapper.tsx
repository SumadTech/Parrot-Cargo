"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { slideUp } from "@/lib/motion";

type MotionWrapperProps = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
};

export function MotionWrapper({
  children,
  className,
  variants = slideUp,
  delay = 0,
}: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}