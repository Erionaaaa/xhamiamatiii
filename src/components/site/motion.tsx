import { clsx } from "clsx";
import type React from "react";

export const fadeInUp = {
  initial: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0 },
  viewport: { once: true, amount: 0.2 },
};

export const staggerContainer = {
  animationDelay: "0.05s",
};

type MotionSectionProps = React.HTMLAttributes<HTMLElement>;

export function MotionSection({
  className,
  ...rest
}: MotionSectionProps & { className?: string }) {
  return (
    <section
      className={clsx(className)}
      {...rest}
    />
  );
}

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function MotionCard({
  className,
  ...rest
}: CardProps & { className?: string }) {
  return (
    <div
      className={clsx(
        "group transition-transform duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.01]",
        className,
      )}
      {...rest}
    />
  );
}

