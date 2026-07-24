'use client';

import { Skill } from '@/types';
import Image from 'next/image';

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <div className="glass-card p-6 flex flex-col gap-4 group hover:border-accent/30 transition-colors duration-300 relative overflow-hidden">
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center p-2.5 border border-border group-hover:border-accent/40 transition-colors duration-300">
          <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100">
            {/* Fallback to initials if icon is missing */}
            <div className="absolute inset-0 flex items-center justify-center font-clash font-bold text-lg text-primary">
              {skill.name.charAt(0)}
            </div>
            <Image
              src={skill.icon}
              alt={skill.name}
              fill
              className="object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
        
        <div className="flex-1">
          <h4 className="font-inter font-semibold text-primary">{skill.name}</h4>
          <p className="font-inter text-xs text-secondary capitalize">{skill.category}</p>
        </div>
      </div>

      <div className="relative z-10 w-full h-1.5 bg-surface rounded-full overflow-hidden mt-2">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent to-success origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"
          style={{ width: `${skill.level}%` }}
        />
        {/* Subtle indicator for static state */}
        <div 
          className="absolute top-0 left-0 h-full bg-border origin-left"
          style={{ width: `${skill.level}%` }}
        />
      </div>
    </div>
  );
}
