'use client';

import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/fade-in';
import { ArrowRight, Download, Eye } from 'lucide-react';
import { useSmoothScrollContext } from '@/providers/smooth-scroll-provider';

export function HeroCTA() {
  const { lenisRef } = useSmoothScrollContext();

  const scrollToProjects = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo('#featured-projects', { offset: -80, duration: 1.2 });
    }
  };

  const scrollToContact = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo('#contact', { offset: -80, duration: 1.2 });
    }
  };

  return (
    <FadeIn delay={1.4} y={20} className="flex flex-wrap items-center gap-4 mt-10">
      <Button variant="accent" size="lg" onClick={scrollToContact} className="group gap-2">
        HIRE ME
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>

      <a href="/cv/cv-dhaif-muharram.pdf" target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="lg" className="group gap-2 border-white/10 hover:border-accent/40">
          VIEW CV
          <Eye className="w-4 h-4" />
        </Button>
      </a>

      <Button variant="outline" size="lg" onClick={scrollToProjects} className="group border-white/10 hover:border-accent/40">
        PROYEK
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </FadeIn>
  );
}
