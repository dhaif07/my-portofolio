'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { SectionLabel } from '@/components/ui/section-label';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/projects';
import type { Project } from '@/types';
import { cn } from '@/utils';

gsap.registerPlugin(ScrollTrigger);

function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
          },
        }
      );
    }, cardRef);
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={cardRef} 
      className={cn(
        "flex flex-col lg:flex-row gap-8 lg:gap-16 items-center",
        !isEven && "lg:flex-row-reverse"
      )}
    >
      {/* Image Side */}
      <div className="w-full lg:w-1/2 relative group">
        <Link href={`/projects/${project.id}`}>
          <div className="relative aspect-[16/10] w-full rounded-[24px] overflow-hidden glass border border-white/10 shadow-card cursor-pointer">
            {/* Animated Border Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 via-accent/30 to-accent/0 opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_2s_infinite] transition-opacity duration-500 pointer-events-none z-20" />
            
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 z-0"
            />
            
            {/* Dark Overlay on hover */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 flex flex-col items-center justify-center gap-4">
              <h3 className="font-clash text-2xl font-bold text-primary translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                {project.title}
              </h3>
              <div className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent text-background font-inter font-semibold text-sm -translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                Lihat Detail <ArrowUpRight size={16} />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Content Side */}
      <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 rounded-full border border-accent/20">
            {project.category}
          </span>
          <span className="text-xs font-medium text-secondary/60">{project.year}</span>
        </div>
        
        <h3 className="font-clash text-3xl md:text-4xl font-bold text-primary mb-4">
          {project.title}
        </h3>
        
        <div className="glass border border-white/5 rounded-2xl p-5 mb-6 w-full">
          <p className="font-inter text-secondary/90 text-sm leading-relaxed mb-4">
            {project.longDescription}
          </p>
          
          <div className="grid grid-cols-2 gap-4 text-xs font-inter border-t border-white/5 pt-4">
            <div>
              <span className="block text-secondary/50 uppercase tracking-wider mb-1">Peran</span>
              <span className="text-primary/90 font-medium">{project.role || 'Developer'}</span>
            </div>
            <div>
              <span className="block text-secondary/50 uppercase tracking-wider mb-1">Waktu</span>
              <span className="text-primary/90 font-medium">{project.timeline || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.slice(0, 5).map(tag => (
            <span key={tag} className="px-3 py-1 text-xs font-inter text-secondary bg-white/5 border border-white/10 rounded-full">
              {tag}
            </span>
          ))}
          {project.tags.length > 5 && (
            <span className="px-3 py-1 text-xs font-inter text-secondary bg-white/5 border border-white/10 rounded-full">
              +{project.tags.length - 5}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2 text-xs font-semibold border-white/10 hover:border-accent/50 hover:bg-accent/10">
                Visit Website <ExternalLink size={14} />
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function FeaturedProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const featured = projects.filter(p => p.featured);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.featured-header-anim',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
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
      id="featured-projects" 
      ref={sectionRef} 
      className="relative py-[120px] overflow-hidden"
    >
      <div className="container relative z-10 max-w-6xl mx-auto">
        
        <div className="flex flex-col items-start max-w-2xl mb-20">
          <div className="featured-header-anim mb-6">
            <SectionLabel>KARYA PILIHAN</SectionLabel>
          </div>
          <h2 className="featured-header-anim font-clash text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
            Proyek Terpilih yang Saya <span className="text-accent">Banggakan</span>
          </h2>
          <p className="featured-header-anim font-inter text-secondary/80 text-base leading-relaxed">
            Berikut adalah project nyata yang telah saya kerjakan untuk client. Project ini mencerminkan kemampuan saya dalam mengembangkan website full-stack yang responsif dan dapat digunakan secara langsung oleh masyarakat.
          </p>
        </div>

        <div className="flex flex-col gap-24 lg:gap-32">
          {featured.map((project, index) => (
            <FeaturedProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
