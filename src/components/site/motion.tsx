"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import type React from "react";

export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" as const },
  viewport: { once: true, amount: 0.2 },
};

export const staggerContainer = {
  animationDelay: "0.05s",
};

type MotionProps = React.ComponentProps<typeof motion.section>;

export function MotionSection({
  className,
  ...rest
}: MotionProps & { className?: string }) {
  return (
    <motion.section
      className={clsx(className)}
      // Keep content visible on first paint to avoid blank screens if hydration fails.
      initial={false}
      whileInView={fadeInUp.whileInView}
      transition={fadeInUp.transition}
      viewport={fadeInUp.viewport}
      {...rest}
    />
  );
}

type CardProps = React.ComponentProps<typeof motion.div>;

export function MotionCard({
  className,
  ...rest
}: CardProps & { className?: string }) {
  return (
    <motion.div
      className={clsx("group", className)}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      {...rest}
    />
  );
}

