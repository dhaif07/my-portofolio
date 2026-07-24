'use client';

import { marqueeSkills } from '@/data/skills';
import { cn } from '@/utils';

export function SkillsMarquee() {
  return (
    <div className="relative flex flex-col gap-4 overflow-hidden py-10 w-full -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="marquee-wrapper">
        <div className="marquee-track gap-4">
          {[...marqueeSkills, ...marqueeSkills, ...marqueeSkills].map((skill, i) => (
            <div
              key={`row1-${i}`}
              className={cn(
                'flex items-center justify-center px-8 py-4 rounded-full border',
                'font-clash text-2xl md:text-4xl font-semibold',
                'bg-surface/50 border-border/50 text-secondary/50',
                'whitespace-nowrap transition-colors duration-300',
                'hover:text-primary hover:border-accent/50 hover:bg-accent/5',
              )}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-track marquee-track-reverse gap-4">
          {[...marqueeSkills.slice().reverse(), ...marqueeSkills.slice().reverse(), ...marqueeSkills.slice().reverse()].map((skill, i) => (
            <div
              key={`row2-${i}`}
              className={cn(
                'flex items-center justify-center px-8 py-4 rounded-full border',
                'font-clash text-2xl md:text-4xl font-semibold',
                'bg-surface/50 border-border/50 text-secondary/50',
                'whitespace-nowrap transition-colors duration-300',
                'hover:text-primary hover:border-success/50 hover:bg-success/5',
              )}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Gradient masks */}
      <div className="absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </div>
  );
}
