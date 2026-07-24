'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loading() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 3;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-2xl border border-accent/30 animate-pulse-glow" />
              <div className="absolute inset-2 rounded-xl bg-accent/10 flex items-center justify-center">
                <span className="font-clash font-bold text-accent text-2xl">P</span>
              </div>
            </div>
          </motion.div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative">
              <span
                className="font-clash text-7xl font-bold text-primary tabular-nums"
                style={{ lineHeight: 1 }}
              >
                {Math.min(count, 100)}
              </span>
              <span className="font-inter text-2xl text-secondary absolute -right-6 bottom-2">
                %
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-48 h-px bg-border overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-success"
                animate={{ width: `${Math.min(count, 100)}%` }}
                transition={{ duration: 0.1 }}
                style={{ boxShadow: '0 0 10px rgba(0, 229, 255, 0.5)' }}
              />
            </div>

            <p className="font-inter text-xs text-secondary tracking-widest uppercase">
              Loading experience
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
