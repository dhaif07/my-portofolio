'use client';

import { TextReveal } from '@/components/animations/text-reveal';
import { FadeIn } from '@/components/animations/fade-in';
import { siteConfig } from '@/config/site';

export function HeroHeading() {
  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <FadeIn delay={0.2} y={20}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light border-accent/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span className="font-inter text-sm text-secondary">
            {siteConfig.availableForWork ? 'Available for new opportunities' : 'Currently not taking new projects'}
          </span>
        </div>
      </FadeIn>

      <TextReveal as="h1" className="font-clash text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight" delay={0.4}>
        Hi, I'm Dhaif Muharram
      </TextReveal>
      <FadeIn delay={0.8} y={15}>
        <span className="font-inter text-sm text-secondary/60 tracking-widest uppercase">
          Fahri Fadhlurrahman Rendy Dhaif Muharram
        </span>
      </FadeIn>

      <FadeIn delay={1.2} y={20}>
        <p className="font-inter text-xl text-secondary max-w-2xl leading-relaxed">
          {siteConfig.description}
        </p>
      </FadeIn>
    </div>
  );
}
