'use client';

import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-media-query';
import { cn } from '@/utils';

export function CustomCursor() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  // States for cursor styles
  const [hoverType, setHoverType] = useState<'default' | 'button' | 'link' | 'card' | 'image' | 'project'>('default');
  const [label, setLabel] = useState('');
  const [isClicking, setIsClicking] = useState(false);

  // DOM Refs for requestAnimationFrame positioning
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Animation values
  const targetPos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    if (isMobile) return;

    // Track target mouse position
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Global delegation for hover types
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const projectCard = target.closest('.project-card');
      const button = target.closest('button, .btn, [role="button"]');
      const link = target.closest('a, [role="link"]');
      const card = target.closest('.glass-card, .card, .timeline-item');
      const img = target.closest('img, .rounded-img');

      if (projectCard) {
        setHoverType('project');
        setLabel('View Project');
      } else if (button) {
        setHoverType('button');
      } else if (link) {
        setHoverType('link');
      } else if (img) {
        setHoverType('image');
      } else if (card) {
        setHoverType('card');
      } else {
        setHoverType('default');
        setLabel('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    // High performance animation loop (60FPS)
    let animationFrameId: number;

    const updatePosition = () => {
      // Dot follows faster (lerp = 0.25)
      dotPos.current.x += (targetPos.current.x - dotPos.current.x) * 0.25;
      dotPos.current.y += (targetPos.current.y - dotPos.current.y) * 0.25;

      // Ring trails with more elasticity (lerp = 0.08)
      ringPos.current.x += (targetPos.current.x - ringPos.current.x) * 0.08;
      ringPos.current.y += (targetPos.current.y - ringPos.current.y) * 0.08;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  if (isMobile || !mounted) return null;

  return (
    <>
      {/* 1. Inner Dot */}
      <div
        ref={dotRef}
        className={cn(
          'fixed left-0 top-0 w-2 h-2 bg-accent rounded-full z-[99999] pointer-events-none mix-blend-difference transition-transform duration-200',
          isClicking && 'scale-75'
        )}
      />

      {/* 2. Outer Ring + Accent Glow */}
      <div
        ref={ringRef}
        className={cn(
          'fixed left-0 top-0 w-8 h-8 border border-accent/50 rounded-full z-[99998] pointer-events-none flex items-center justify-center transition-all duration-300 ease-out',
          
          // Hover styles matching the PART 3 spec
          hoverType === 'button' && 'w-14 h-14 border-accent bg-accent/5 shadow-[0_0_20px_rgba(0,229,255,0.3)]',
          hoverType === 'link' && 'w-16 h-8 rounded-full border-accent bg-accent/5 scale-x-125 scale-y-75',
          hoverType === 'image' && 'w-16 h-16 border-accent scale-125 bg-accent/5',
          hoverType === 'card' && 'w-10 h-10 border-accent/30',
          hoverType === 'project' && 'w-24 h-24 border-accent bg-accent/10 backdrop-blur-xs shadow-[0_0_25px_rgba(0,229,255,0.25)]',
          
          isClicking && 'scale-90 opacity-70'
        )}
      >
        {/* "View Project" label text inside ring on project cards */}
        {hoverType === 'project' && label && (
          <span className="text-[10px] font-clash font-bold tracking-widest text-accent uppercase text-center animate-fade-in">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
