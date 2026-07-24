'use client';

import { Testimonial } from '@/types';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { cn } from '@/utils';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <div className={cn(
      "glass-card p-8 flex flex-col h-full min-w-[320px] max-w-[400px] shrink-0",
      "hover:border-accent/30 transition-colors duration-300 group",
      className
    )}>
      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={cn(
              "transition-colors duration-300",
              i < testimonial.rating 
                ? "fill-warning text-warning group-hover:fill-accent group-hover:text-accent" 
                : "fill-surface text-border"
            )}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="font-inter text-primary/90 text-lg leading-relaxed mb-8 flex-1">
        "{testimonial.quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4 mt-auto">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border">
          {/* Fallback avatar bg */}
          <div className="absolute inset-0 bg-surface flex items-center justify-center font-clash text-primary text-sm">
            {testimonial.name.charAt(0)}
          </div>
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover relative z-10"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <div>
          <h4 className="font-inter font-semibold text-primary">{testimonial.name}</h4>
          <p className="font-inter text-sm text-secondary">
            {testimonial.role}, <span className="text-primary/70">{testimonial.company}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
