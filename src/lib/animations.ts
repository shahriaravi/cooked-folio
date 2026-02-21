"use client";

import { motion } from "framer-motion";
import { type ReactNode, createElement } from "react";

export const revealVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 80, damping: 20, mass: 0.8 },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 14, scale: 0.98, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
};

export const cardHover = {
  whileHover: {
    y: -3,
    boxShadow: "0 8px 30px -10px rgba(0,0,0,0.15)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  whileTap: { scale: 0.98 },
};

export const viewport = { once: true, margin: "-80px" } as const;

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return createElement(
    motion.div,
    {
      variants: {
        hidden: revealVariants.hidden,
        visible: {
          ...revealVariants.visible,
          transition: {
            ...revealVariants.visible.transition,
            delay,
          },
        },
      },
      initial: "hidden",
      whileInView: "visible",
      viewport,
      className,
    },
    children
  );
}
