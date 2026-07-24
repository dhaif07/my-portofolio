'use client';

import { motion } from 'framer-motion';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-md"
      >
        <div className="w-16 h-16 rounded-2xl bg-danger/10 border border-danger/20 flex items-center justify-center mx-auto mb-6">
          <span className="text-danger text-2xl">!</span>
        </div>

        <h1 className="font-clash text-3xl font-bold text-primary mb-3">
          Something went wrong
        </h1>

        <p className="font-inter text-secondary mb-2">
          {error.message || 'An unexpected error occurred.'}
        </p>

        {error.digest && (
          <p className="font-mono text-xs text-secondary/50 mb-8">Error ID: {error.digest}</p>
        )}

        <button
          onClick={reset}
          className="px-8 py-4 bg-surface border border-border rounded-btn font-inter font-medium text-primary hover:border-accent/30 transition-colors duration-200"
        >
          Try again
        </button>
      </motion.div>
    </div>
  );
}
