'use client';

import { useEffect, useRef } from 'react';
import { SectionLabel } from '@/components/ui/section-label';
import { services } from '@/data/services';
import type { Service } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as LucideIcons from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Utility to render Lucide icon by name
const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  const Icon = (LucideIcons as any)[name];
  if (!Icon) return <LucideIcons.HelpCircle className={className} />;
  return <Icon className={className} />;
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
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
    }, cardRef);
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col p-8 rounded-[24px] glass border border-white/5 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-accent/30 hover:shadow-[0_0_40px_rgba(0,229,255,0.08)] overflow-hidden"
    >
      {/* Background Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Large Icon */}
      <div className="w-16 h-16 rounded-2xl glass border border-white/10 flex items-center justify-center mb-6 text-primary group-hover:text-accent transition-colors duration-300 relative z-10">
        <IconComponent name={service.icon} className="w-8 h-8 transition-transform duration-500 group-hover:rotate-[15deg] group-hover:scale-110" />
      </div>

      <h3 className="font-clash text-2xl font-bold text-primary mb-3 relative z-10">
        {service.title}
      </h3>
      
      <p className="font-inter text-secondary/80 text-sm leading-relaxed mb-6 relative z-10 flex-1">
        {service.description}
      </p>

      {/* Feature List */}
      <ul className="space-y-2 mb-8 relative z-10">
        {service.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 font-inter text-xs text-secondary/70">
            <div className="w-1 h-1 rounded-full bg-accent/50" />
            {feature}
          </li>
        ))}
      </ul>

      {/* Action Arrow */}
      <div className="relative z-10 mt-auto flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <span>Jelajahi</span>
        <LucideIcons.ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </div>
  );
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-header',
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
      id="services" 
      ref={sectionRef} 
      className="relative py-[100px] overflow-hidden"
    >
      <div className="container relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col items-start mb-16">
          <div className="service-header mb-6">
            <SectionLabel>LAYANAN</SectionLabel>
          </div>
          <h2 className="service-header font-clash text-4xl md:text-5xl font-bold text-primary max-w-2xl">
            Apa yang Bisa Saya <span className="text-accent">Lakukan</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
