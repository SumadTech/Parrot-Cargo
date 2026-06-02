"use client";

import { motion } from "motion/react";
import { hoverLift, tapScale } from "@/lib/motion";

export function MotionTestCard() {
  return (
    <motion.div
      whileHover={hoverLift}
      whileTap={tapScale}
      className="max-w-md rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm transition-shadow"
    >
      <p className="text-caption-1 text-muted-foreground">Motion Test</p>

      <h2 className="mt-2 text-heading-4 text-heading">
        Smooth Parrot Cargo animation
      </h2>

      <p className="mt-3 text-body-3 text-secondary">
        Hover this card on desktop or tap it on mobile to test professional
        motion interactions.
      </p>
    </motion.div>
  );
}