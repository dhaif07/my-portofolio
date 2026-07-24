'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let start = 0;
    const end = 100;
    const duration = 2000; // 2 seconds loader
    const incrementTime = Math.floor(duration / end);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) {
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 800); // Allow exit animations to finish
        }, 300);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505] select-none overflow-hidden"
          exit={{
            y: '-100vh',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Subtle central glow */}
          <div className="absolute w-[300px] h-[300px] bg-accent/10 blur-[100px] rounded-full pointer-events-none" />

          <motion.div 
            className="container max-w-lg flex flex-col items-center gap-12 z-10 px-8"
            exit={{
              scale: 1.08,
              filter: 'blur(8px)',
              opacity: 0,
              transition: { duration: 0.5, ease: 'easeIn' }
            }}
          >
            {/* Logo reveal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex items-center gap-1"
            >
              <h2 className="font-clash text-3xl md:text-4xl font-bold tracking-wider text-primary">
                {siteConfig.name}
              </h2>
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
            </motion.div>

            {/* Counter */}
            <div className="overflow-hidden h-24 flex items-center justify-center">
              <motion.div
                key={count}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="font-clash text-7xl md:text-8xl font-bold tracking-tighter text-primary"
              >
                {String(count).padStart(3, '0')}
              </motion.div>
            </div>

            {/* Loading Bar */}
            <div className="w-full h-[2px] bg-border/50 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent to-success"
                style={{ width: `${count}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Subtext info */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.5 }}
              className="font-inter text-xs tracking-widest text-secondary uppercase"
            >
              Initializing Experience
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
