'use client';

import { useEffect, useRef } from 'react';
import { SectionLabel } from '@/components/ui/section-label';
import { statistics } from '@/data/statistics';
import type { Statistic } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function StatCard({ stat, index }: { stat: Statistic; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate card reveal
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
          },
        }
      );

      // Animate counter
      if (numberRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
          },
          onUpdate: () => {
            if (numberRef.current) {
              numberRef.current.innerText = Math.floor(obj.val).toString();
            }
          },
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, [index, stat.value]);

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col items-center justify-center p-8 rounded-[22px] glass border border-white/5 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:border-accent/30 hover:shadow-[0_0_30px_rgba(0,229,255,0.1)]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="relative z-10 flex items-baseline gap-1 font-clash font-bold text-4xl md:text-5xl text-primary mb-2 group-hover:text-accent transition-colors duration-300">
        {stat.prefix && <span>{stat.prefix}</span>}
        {stat.suffix === '∞' ? (
          <span className="text-accent">∞</span>
        ) : (
          <>
            <span ref={numberRef}>0</span>
            {stat.suffix && <span className="text-accent">{stat.suffix}</span>}
          </>
        )}
      </div>
      
      <p className="relative z-10 font-inter text-sm text-secondary/80 font-medium tracking-wide uppercase text-center">
        {stat.label}
      </p>
    </div>
  );
}

export function StatisticsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stat-header',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="statistics" 
      ref={sectionRef} 
      className="relative py-[80px] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="stat-header mb-6">
            <SectionLabel>STATISTICS</SectionLabel>
          </div>
          <h2 className="stat-header font-clash text-3xl md:text-4xl lg:text-5xl font-bold text-primary max-w-2xl">
            Numbers That Represent My <span className="text-accent">Journey</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {statistics.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
