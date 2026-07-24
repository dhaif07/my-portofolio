'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useSmoothScrollContext } from '@/providers/smooth-scroll-provider';
import { cn } from '@/utils';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { lenisRef } = useSmoothScrollContext();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-50 p-3 rounded-full glass border border-accent/20 shadow-[0_0_20px_rgba(0,229,255,0.15)]",
        "text-primary hover:text-accent hover:border-accent/50 hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]",
        "transition-all duration-300 hover:-translate-y-1 group",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} className="group-hover:animate-pulse" />
    </button>
  );
}
