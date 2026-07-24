'use client';

import { useRef, useEffect } from 'react';
import { SectionLabel } from '@/components/ui/section-label';
import { educationData } from '@/data/education';
import type { Education } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function EducationItem({ item, index }: { item: Education; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top 85%',
          },
        }
      );
    }, itemRef);
    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={itemRef} className="relative pl-12 sm:pl-16 group">
      {/* Timeline Dot & Line */}
      <div className="absolute left-0 top-0 bottom-[-40px] w-[2px] bg-white/10 z-0">
        <div className="absolute top-0 w-full h-full bg-gradient-to-b from-accent to-accent/0 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-out" />
      </div>
      <div className="absolute left-[-11px] top-1 w-6 h-6 rounded-full bg-surface border border-accent flex items-center justify-center z-10 shadow-[0_0_10px_rgba(0,229,255,0.2)] group-hover:shadow-[0_0_15px_rgba(0,229,255,0.6)] group-hover:bg-accent/10 transition-all duration-300">
        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
      </div>

      <div className="glass border border-white/5 p-6 md:p-8 rounded-[24px] hover:border-accent/30 hover:shadow-[0_0_30px_rgba(0,229,255,0.05)] transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="font-clash text-2xl font-bold text-primary group-hover:text-accent transition-colors">
              {item.university}
            </h3>
            <div className="flex items-center gap-2 font-inter text-sm text-secondary/80 font-semibold mt-2">
              <GraduationCap size={16} className="text-accent" />
              <span>{item.major}</span>
            </div>
          </div>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-inter text-xs text-secondary/80 whitespace-nowrap h-fit">
            {item.period}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-white/5">
          <div>
            <h4 className="font-inter text-xs uppercase tracking-widest text-secondary/60 font-semibold mb-3">Mata Kuliah Utama</h4>
            <div className="flex flex-wrap gap-2">
              {item.courses.map(course => (
                <span key={course} className="px-2.5 py-1 text-[11px] font-inter text-secondary/90 bg-white/5 border border-white/10 rounded-md">
                  {course}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-inter text-xs uppercase tracking-widest text-secondary/60 font-semibold mb-3">Pencapaian</h4>
            <ul className="space-y-2">
              {item.achievements.map((ach, idx) => (
                <li key={idx} className="flex items-start gap-2 font-inter text-xs text-secondary/80">
                  <span className="text-success mt-0.5">▹</span>
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.edu-header-anim',
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
      id="education" 
      ref={sectionRef} 
      className="relative py-[80px] overflow-hidden"
    >
      <div className="container relative z-10 max-w-4xl mx-auto">
        <div className="flex flex-col items-start mb-16">
          <div className="edu-header-anim mb-6">
            <SectionLabel>PENDIDIKAN</SectionLabel>
          </div>
          <h2 className="edu-header-anim font-clash text-3xl md:text-4xl font-bold text-primary">
            Latar Belakang Akademik
          </h2>
        </div>

        <div className="flex flex-col gap-10">
          {educationData.map((edu, index) => (
            <EducationItem key={edu.id} item={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
