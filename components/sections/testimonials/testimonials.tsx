'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionLabel } from '@/components/ui/section-label';
import { testimonials } from '@/data/testimonials';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1);

  // Auto-play
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.test-header-anim',
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

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section 
      id="testimonials" 
      ref={sectionRef} 
      className="relative py-[100px] overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/[0.03] blur-[120px] rounded-[100%]" />

      <div className="container relative z-10 max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="test-header-anim mb-6">
            <SectionLabel>TESTIMONIAL</SectionLabel>
          </div>
          <h2 className="test-header-anim font-clash text-4xl md:text-5xl font-bold text-primary">
            Umpan Balik <span className="text-accent">Klien</span>
          </h2>
        </div>

        <div 
          className="relative max-w-3xl mx-auto h-[400px] sm:h-[350px] md:h-[300px] perspective-[1000px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 }
              }}
              className="absolute inset-0 w-full"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -10000) handleNext();
                else if (swipe > 10000) handlePrev();
              }}
            >
              <div className="w-full h-full glass border border-white/10 rounded-[28px] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col items-center text-center">
                <Quote className="text-accent/40 w-12 h-12 mb-6" />
                
                <p className="font-inter text-lg md:text-xl text-primary/90 leading-relaxed mb-8 flex-1">
                  "{currentTestimonial.quote}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20">
                    <Image
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="font-clash font-bold text-primary">{currentTestimonial.name}</h4>
                    <span className="font-inter text-xs text-secondary/80">
                      {currentTestimonial.role} @ {currentTestimonial.company}
                    </span>
                  </div>
                </div>

                <div className="absolute top-8 right-8 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < currentTestimonial.rating ? "text-warning fill-warning" : "text-white/10"} 
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 z-20">
            <button 
              onClick={handlePrev}
              className="p-3 rounded-full glass border border-white/10 text-secondary hover:text-accent hover:border-accent/30 transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 z-20">
            <button 
              onClick={handleNext}
              className="p-3 rounded-full glass border border-white/10 text-secondary hover:text-accent hover:border-accent/30 transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex 
                    ? 'w-6 h-1.5 bg-accent shadow-[0_0_8px_rgba(0,229,255,0.8)]' 
                    : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
