'use client';

import { useRef, useEffect } from 'react';
import { marqueeSkills } from '@/data/skills';
import { cn } from '@/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Split skills into two arrays for the two rows
const row1 = marqueeSkills.slice(0, Math.ceil(marqueeSkills.length / 2));
const row2 = marqueeSkills.slice(Math.ceil(marqueeSkills.length / 2));

function MarqueeRow({ items, direction = 'left', speed = 'normal' }: { items: string[], direction?: 'left' | 'right', speed?: 'normal' | 'fast' | 'slow' }) {
  const durationClass = speed === 'fast' ? 'duration-[30s]' : speed === 'slow' ? 'duration-[50s]' : 'duration-[40s]';
  const animClass = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse';

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="relative flex overflow-hidden group w-full py-4">
      <div className={cn("flex whitespace-nowrap min-w-max", animClass, durationClass, "group-hover:[animation-play-state:paused]")}>
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center justify-center mx-4 sm:mx-6 md:mx-8 px-6 py-4 glass border border-white/5 rounded-2xl cursor-default transition-all duration-300 ease-out hover:border-accent/50 hover:bg-accent/5 hover:scale-110 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,229,255,0.2)]"
          >
            <span className="font-clash text-2xl md:text-3xl lg:text-4xl font-bold text-white/30 grayscale transition-all duration-300 group-hover:grayscale-0 hover:text-accent drop-shadow-md">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="tech-stack" 
      ref={sectionRef} 
      className="relative py-[80px] overflow-hidden bg-background/50 border-y border-white/5"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-gradient-to-r from-transparent via-accent/5 to-transparent blur-[100px] pointer-events-none" />
      
      {/* Gradient Masks for seamless fade at edges */}
      <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="relative z-0 flex flex-col gap-6 md:gap-8 transform -rotate-2 scale-105">
        <MarqueeRow items={row1} direction="left" speed="normal" />
        <MarqueeRow items={row2} direction="right" speed="slow" />
      </div>
    </section>
  );
}
