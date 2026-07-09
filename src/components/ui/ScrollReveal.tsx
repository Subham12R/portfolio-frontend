"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  stagger?: number;
  start?: string; // Kept for backwards compatibility
  className?: string;
}

const containerVariants = (stagger: number): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.05,
    },
  },
});

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 15, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.8,
    },
  },
};

export function ScrollReveal({
  children,
  stagger = 0.08,
  className = "w-full flex flex-col",
}: ScrollRevealProps) {
  const childrenArray = React.Children.toArray(children);

  return (
    <motion.div
      variants={containerVariants(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className={className}
    >
      {childrenArray.map((child, index) => (
        <motion.div key={index} variants={itemVariants} className="w-full">
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
