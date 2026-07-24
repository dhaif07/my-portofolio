'use client';

import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface StaggerChildrenProps {
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
  className?: string;
  once?: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (stagger: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren: 0,
    },
  }),
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function StaggerChildren({
  children,
  stagger = 0.1,
  className,
  once = true,
}: StaggerChildrenProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      variants={containerVariants}
      custom={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
