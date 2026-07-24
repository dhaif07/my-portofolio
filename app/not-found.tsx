'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] bg-accent/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[25vw] h-[25vw] bg-purple-500/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl mx-auto">
        {/* Floating 404 Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative mb-8"
        >
          <motion.h1
            animate={{ y: [-10, 10, -10] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="font-clash font-bold text-[120px] md:text-[200px] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 select-none"
          >
            404
          </motion.h1>
          
          {/* Decorative glowing orb behind 404 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-accent/20 blur-[80px] rounded-full -z-10" />
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-clash text-3xl md:text-5xl font-bold text-primary mb-6">
            Lost in Cyberspace
          </h2>
          
          <p className="font-inter text-secondary text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
            The page you are looking for has been moved, deleted, or possibly never existed. Let's get you back to familiar territory.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button size="lg" className="group relative overflow-hidden bg-accent text-background hover:bg-white transition-all duration-300">
                <span className="relative z-10 flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Back to Home
                </span>
                <div className="absolute inset-0 h-full w-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </Button>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="group px-6 py-3 rounded-btn font-inter font-medium text-secondary hover:text-primary transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />
    </div>
  );
}
