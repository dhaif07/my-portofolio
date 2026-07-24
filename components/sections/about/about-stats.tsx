'use client';

import { Counter } from '@/components/animations/counter';
import { FadeIn } from '@/components/animations/fade-in';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';

const stats = [
  { label: 'Years Learning', value: 3, suffix: '+' },
  { label: 'Projects Created', value: 5, suffix: '+' },
  { label: 'Technologies', value: 6, suffix: '' },
  { label: 'Real Client Project', value: 1, suffix: '' },
];

export function AboutStats() {
  return (
    <StaggerChildren
      stagger={0.15}
      className="grid grid-cols-2 gap-x-8 gap-y-12 pt-12 mt-12 border-t border-border"
    >
      {stats.map((stat, i) => (
        <StaggerItem key={i} className="flex flex-col gap-2">
          <div className="font-clash text-4xl md:text-5xl font-bold text-primary">
            <Counter
              end={stat.value}
              suffix={stat.suffix}
              duration={2000}
            />
          </div>
          <p className="font-inter text-sm text-secondary uppercase tracking-widest">
            {stat.label}
          </p>
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}
