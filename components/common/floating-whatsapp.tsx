"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa6";

type FloatingWhatsAppProps = {
  phone?: string;
  message?: string;
  className?: string;
};

export function FloatingWhatsApp({
  phone = "252613212221",
  message = "Hello Parrot Cargo, I need logistics support.",
  className,
}: FloatingWhatsAppProps) {
  const shouldReduceMotion = useReducedMotion();

  const whatsappHref = `https://wa.me/${phone}?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <motion.a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Parrot Cargo on WhatsApp"
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8, y: 16 }}
      animate={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 1,
              scale: 1,
              y: 0,
            }
      }
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group fixed bottom-5 inset-e-5 z-40 grid size-16 place-items-center rounded-full bg-secondary/5 outline-none sm:bottom-7 sm:inset-e-7 sm:size-20",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      {!shouldReduceMotion ? (
        <>
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 z-0 rounded-full bg-secondary/15"
            animate={{
              scale: [1, 1.28, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />

          <motion.span
            aria-hidden="true"
            className="absolute inset-2 z-0 rounded-full bg-green-200 sm:inset-3"
            animate={{
              scale: [1, 1.18, 1],
              opacity: [0.7, 0.2, 0.7],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.25,
            }}
          />
        </>
      ) : null}

      <span className="relative z-10 grid size-12 place-items-center rounded-full bg-green-500 text-secondary-foreground shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-hover:bg-orange-normal-hover sm:size-14">
        <FaWhatsapp className="size-7 sm:size-8" aria-hidden="true" />
      </span>

      <motion.span
        aria-hidden="true"
        className="absolute end-1.5 top-2 z-20 size-4 rounded-full border-2 border-background bg-green-500 sm:end-3 sm:top-2 sm:size-4"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.18, 1],
              }
        }
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.a>
  );
}