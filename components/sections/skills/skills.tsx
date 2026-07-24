'use client';

import { useState, useRef, useEffect } from 'react';
import { SectionLabel } from '@/components/ui/section-label';
import { skills, skillCategories } from '@/data/skills';
import type { Skill, SkillCategory } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/utils';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  // Simple fallback for icons if they don't exist, use text initials
  const initials = skill.name.slice(0, 2).toUpperCase();

  return (
    <div
      className="skill-card opacity-0 translate-y-4 group relative flex items-center gap-4 p-4 rounded-xl glass border border-white/5 transition-all duration-300 ease-out hover:scale-105 hover:rotate-2 hover:border-accent/30 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] overflow-hidden"
    >
      {/* Animated Hover Border */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

      {/* Icon Placeholder */}
      <div className="w-12 h-12 shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-clash font-bold text-accent group-hover:bg-accent/10 transition-colors">
        {initials}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-inter font-semibold text-primary truncate">{skill.name}</h4>
        <div className="w-full h-1.5 bg-white/5 rounded-full mt-2 overflow-hidden">
          <div 
            className="h-full bg-accent rounded-full transition-all duration-1000 ease-out w-0 group-hover:opacity-100 opacity-80" 
            style={{ width: `${skill.level}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.skill-header-anim',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Category buttons animation
      gsap.fromTo(
        '.skill-cat-btn',
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.skill-cat-container',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Re-animate skill cards when category changes
  useEffect(() => {
    gsap.fromTo(
      '.skill-card',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out',
        overwrite: true
      }
    );
  }, [activeCategory]);

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="relative py-[100px] overflow-hidden"
    >
      <div className="container relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Description & Categories */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="skill-header-anim mb-6">
              <SectionLabel>SKILLS</SectionLabel>
            </div>
            <h2 className="skill-header-anim font-clash text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
              Technologies I <span className="text-accent">Use</span>
            </h2>
            <p className="skill-header-anim font-inter text-secondary/80 text-base leading-relaxed mb-10">
              I have spent my time learning and mastering various tools and technologies. 
              From designing intuitive interfaces to building reliable backend databases, 
              here is my current tech stack.
            </p>

            <div className="skill-cat-container flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={cn(
                  'skill-cat-btn px-4 py-2 rounded-full font-inter text-xs font-semibold tracking-wider uppercase transition-all duration-300',
                  activeCategory === 'all' 
                    ? 'bg-accent text-background shadow-[0_0_15px_rgba(0,229,255,0.4)]' 
                    : 'glass border border-white/10 text-secondary hover:text-primary hover:border-accent/30'
                )}
              >
                All
              </button>
              {skillCategories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key as SkillCategory)}
                  className={cn(
                    'skill-cat-btn px-4 py-2 rounded-full font-inter text-xs font-semibold tracking-wider uppercase transition-all duration-300',
                    activeCategory === cat.key 
                      ? 'bg-accent text-background shadow-[0_0_15px_rgba(0,229,255,0.4)]' 
                      : 'glass border border-white/10 text-secondary hover:text-primary hover:border-accent/30'
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Interactive Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredSkills.map((skill, index) => (
                <SkillCard key={`${skill.name}-${index}`} skill={skill} index={index} />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
