'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { cn } from '@/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}

export function TextReveal({ children, className, delay = 0, as: Component = 'div' }: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const textElement = textRef.current;
    
    if (!container || !textElement) return;

    // Simple word splitting since GSAP SplitText is a premium plugin
    // We'll create a manual word-level split effect
    const words = children.split(' ');
    
    textElement.innerHTML = '';
    
    words.forEach((word) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.overflow = 'hidden';
      wordSpan.style.verticalAlign = 'top';
      wordSpan.style.paddingRight = '0.25em'; // Space between words
      
      const innerSpan = document.createElement('span');
      innerSpan.style.display = 'inline-block';
      innerSpan.style.transform = 'translateY(100%)';
      innerSpan.textContent = word;
      innerSpan.className = 'word-inner';
      
      wordSpan.appendChild(innerSpan);
      textElement.appendChild(wordSpan);
    });

    const innerElements = textElement.querySelectorAll('.word-inner');

    const ctx = gsap.context(() => {
      gsap.to(innerElements, {
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
        },
        y: '0%',
        duration: 0.8,
        stagger: 0.04,
        ease: 'power4.out',
        delay,
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, [children, delay]);

  const Comp = Component as any;

  return (
    <Comp ref={containerRef} className={cn('relative', className)}>
      <span ref={textRef} className="invisible block">
        {children}
      </span>
    </Comp>
  );
}
