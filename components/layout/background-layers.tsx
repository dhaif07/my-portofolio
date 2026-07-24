'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Scene } from '../three/scene';
import { Particles } from '../three/particles';
import { useIsMobile } from '@/hooks/use-media-query';

export function BackgroundLayers() {
  const isMobile = useIsMobile();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for Layer 7 Mouse Glow
  const glowX = useSpring(mouseX, { stiffness: 120, damping: 25, mass: 0.5 });
  const glowY = useSpring(mouseY, { stiffness: 120, damping: 25, mass: 0.5 });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
      
      {/* LAYER 1: Dark Color (Solid #050505 background - mapped in body/CSS) */}
      <div className="absolute inset-0 bg-[#050505] z-0" />

      {/* LAYER 2: Noise Texture (Subtle film grain opacity) */}
      <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-overlay z-[7]" />

      {/* LAYER 3: Animated Grid (Subtle, low opacity, slow moving grid) */}
      <div 
        className="absolute inset-0 bg-grid opacity-[0.08] z-[1]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(38, 38, 38, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(38, 38, 38, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          animation: 'movingGrid 80s linear infinite',
        }}
      />

      {/* LAYER 4: Gradient Mesh (desaturated soft shifting glows) */}
      <div className="absolute inset-0 z-[2] overflow-hidden">
        {/* Soft Blue Mesh Blob */}
        <motion.div
          className="absolute -top-1/4 -left-1/4 w-[70vw] h-[70vw] rounded-full bg-blue-500/3 blur-[140px] mix-blend-screen"
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Soft Cyan Mesh Blob */}
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-[60vw] h-[60vw] rounded-full bg-cyan-500/3 blur-[120px] mix-blend-screen"
          animate={{
            x: [0, -40, 40, 0],
            y: [0, 50, -30, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* LAYER 5: Large Blur Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-accent/[0.015] blur-[180px] rounded-full z-[3]" />

      {/* LAYER 6: Floating Glow */}
      <div className="absolute inset-0 z-[4] overflow-hidden">
        <motion.div
          className="absolute top-1/3 left-1/4 w-[25vw] h-[25vw] rounded-full bg-blue-400/[0.02] blur-[100px]"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, 40, -10, 0],
            scale: [1, 1.15, 0.9, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[30vw] h-[30vw] rounded-full bg-cyan-400/[0.015] blur-[120px]"
          animate={{
            x: [0, -30, 20, 0],
            y: [0, -40, 10, 0],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* LAYER 7: Mouse Glow (desaturated soft cyan radial spot following cursor) */}
      {!isMobile && (
        <motion.div
          className="absolute w-[450px] h-[450px] rounded-full z-[5] -translate-x-1/2 -translate-y-1/2 opacity-60 mix-blend-screen"
          style={{
            left: glowX,
            top: glowY,
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.05) 0%, rgba(0, 229, 255, 0) 70%)',
          }}
        />
      )}

      {/* LAYER 8: Very Small Floating Particles (WebGL background particles) */}
      {!isMobile && (
        <div className="absolute inset-0 z-[6] opacity-[0.25]">
          <Scene className="w-full h-full">
            <Particles count={1000} />
          </Scene>
        </div>
      )}

      <style jsx global>{`
        @keyframes movingGrid {
          0% {
            background-position: 0px 0px;
          }
          100% {
            background-position: 80px 80px;
          }
        }
      `}</style>
    </div>
  );
}
