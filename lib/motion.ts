import type { Variants } from "motion/react";

export const defaultTransition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
} as const;

export const fastTransition = {
  duration: 0.25,
  ease: [0.22, 1, 0.36, 1],
} as const;

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: defaultTransition,
  },
};

export const slideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

export const slideDown: Variants = {
  hidden: {
    opacity: 0,
    y: -16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: defaultTransition,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

export const mobileMenuMotion: Variants = {
  closed: {
    opacity: 0,
    y: -8,
    transition: fastTransition,
  },
  open: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

export const hoverLift = {
  y: -4,
  transition: fastTransition,
};

export const tapScale = {
  scale: 0.98,
};