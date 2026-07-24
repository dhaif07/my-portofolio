'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, MapPin, Briefcase, Clock } from 'lucide-react';
import { SectionLabel } from '@/components/ui/section-label';
import { cn } from '@/utils';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Responsive Web Design',
  'Modern JavaScript',
  'Clean Code',
  'REST API',
  'Website Performance',
  'UI/UX Design',
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);

  // Parallax for the photo
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  
  const photoY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Photo animation
      gsap.fromTo(
        '.about-photo',
        { opacity: 0, scale: 0.9, rotate: -2, filter: 'blur(10px)' },
        {
          opacity: 1,
          scale: 1,
          rotate: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Info badges stagger
      gsap.fromTo(
        '.about-info-badge',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-photo-container',
            start: 'top 70%',
          },
        }
      );

      // Paragraph fade up and blur
      gsap.fromTo(
        '.about-text-content',
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-text-container',
            start: 'top 75%',
          },
        }
      );

      // Features stagger
      gsap.fromTo(
        '.about-feature',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-features-grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageCardRef.current) return;
    const rect = imageCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    imageCardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!imageCardRef.current) return;
    imageCardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative py-[120px] overflow-hidden"
    >
      <div className="container relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column - Photo & Info */}
          <div className="about-photo-container flex flex-col items-center lg:items-start gap-8">
            <motion.div
              ref={imageCardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ y: photoY }}
              className="about-photo relative w-full max-w-[420px] aspect-[4/5] rounded-[24px] glass border border-white/10 p-4 shadow-card transition-transform duration-300 ease-out"
            >
              <div className="relative w-full h-full rounded-[16px] overflow-hidden group">
                <div className="absolute inset-0 bg-accent/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-10 z-10" />
                <Image
                  src="/profile/avatar-1.jpg"
                  alt="Fahri Fadhlurrahman Rendy Dhaif Muharram"
                  fill
                  className="object-cover object-top z-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 border border-white/10 rounded-[16px] z-20 pointer-events-none" />
              </div>
              
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-accent/20 to-transparent blur-xl -z-10 rounded-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>

            {/* Quick Information */}
            <div className="w-full max-w-[420px] grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="about-info-badge glass border border-white/10 rounded-xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin size={16} />
                </div>
                <div>
                  <div className="text-[10px] text-secondary/60 uppercase tracking-wider font-semibold">Location</div>
                  <div className="text-sm font-medium text-primary">Indonesia</div>
                </div>
              </div>
              
              <div className="about-info-badge glass border border-white/10 rounded-xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <Briefcase size={16} />
                </div>
                <div>
                  <div className="text-[10px] text-secondary/60 uppercase tracking-wider font-semibold">Role</div>
                  <div className="text-sm font-medium text-primary line-clamp-1">Frontend Dev</div>
                </div>
              </div>

              <div className="about-info-badge sm:col-span-2 glass border border-white/10 rounded-xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success">
                  <Clock size={16} />
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] text-secondary/60 uppercase tracking-wider font-semibold">Available for</div>
                    <div className="text-sm font-medium text-primary">Internship / Freelance / Collab</div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="about-text-container flex flex-col justify-center">
            <div className="mb-8">
              <SectionLabel>ABOUT ME</SectionLabel>
            </div>
            
            <h2 className="about-text-content font-clash text-4xl md:text-5xl font-bold text-primary mb-6 leading-[1.1]">
              Membangun <span className="text-accent">Website</span> yang Bermanfaat.
            </h2>
            
            <div className="about-text-content space-y-4 font-inter text-secondary/90 text-base md:text-lg leading-relaxed mb-10">
              <p>
                Halo, saya Dhaif — mahasiswa Teknik Informatika yang memiliki minat dalam pengembangan website modern, responsif, dan mudah digunakan.
              </p>
              <p>
                Selama kurang lebih tiga tahun saya mempelajari web development melalui berbagai project pribadi dan project akademik. Saya menikmati proses mengubah ide menjadi website yang nyata dan dapat digunakan oleh banyak orang.
              </p>
              <p>
                Saat ini fokus pada Frontend Development, UI Design dengan Figma, serta mempelajari backend menggunakan PHP dan MySQL. Target saya adalah menjadi Full Stack Web Developer profesional.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="font-clash text-xl font-semibold text-primary mb-4">Currently Learning</h3>
            </div>
            <div className="about-features-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <div key={idx} className="about-feature flex items-center gap-3 group">
                  <div className="w-6 h-6 rounded-full glass border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent/10 group-hover:scale-110 transition-all duration-300">
                    <CheckCircle2 size={12} className="group-hover:drop-shadow-[0_0_5px_rgba(0,229,255,0.8)]" />
                  </div>
                  <span className="font-inter text-sm font-medium text-primary/80 group-hover:text-primary transition-colors">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
