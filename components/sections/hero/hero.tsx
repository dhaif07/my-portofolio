'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Briefcase, ChevronDown, Eye } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { Magnetic } from '@/components/ui/magnetic';
import { useSmoothScrollContext } from '@/providers/smooth-scroll-provider';
import Image from 'next/image';
import gsap from 'gsap';
import { cn } from '@/utils';

// Rotating titles
const roles = [
  'Frontend Developer',
  'Web Developer',
  'UI Designer',
  'Full Stack Developer',
];

// Floating badges config
const floatingBadges = [
  { name: 'HTML', className: 'top-[-10px] left-[-30px]', delay: 0.1, duration: 4 },
  { name: 'CSS', className: 'top-[40px] right-[-40px]', delay: 0.3, duration: 5 },
  { name: 'JavaScript', className: 'bottom-[80px] left-[-40px]', delay: 0.5, duration: 6 },
  { name: 'PHP', className: 'top-[160px] left-[-50px]', delay: 0.2, duration: 4.5 },
  { name: 'MySQL', className: 'bottom-[-10px] right-[-20px]', delay: 0.4, duration: 5.5 },
  { name: 'Figma', className: 'bottom-[140px] right-[-45px]', delay: 0.6, duration: 4.8 },
];

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const profileCardRef = useRef<HTMLDivElement>(null);
  const { lenisRef } = useSmoothScrollContext();

  // Scroll animations: scale hero, translate background glow
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  // Title scrolling effect
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // GSAP startup entrance sequence on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo('.nav-fade', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.08 })
        .fromTo('.hero-greeting', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
        .fromTo('.hero-name', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.7')
        .fromTo('.hero-titles', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.8')
        .fromTo('.hero-desc', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.7')
        .fromTo('.hero-btn-fade', { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }, '-=0.7')
        .fromTo('.hero-profile-card', { scale: 0.9, opacity: 0, rotate: -2 }, { scale: 1, opacity: 1, rotate: 0, duration: 1.2 }, '-=0.9')
        .fromTo('.hero-badge-fade', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, stagger: 0.08 }, '-=0.8')
        .fromTo('.hero-scroll-indicator', { y: 20, opacity: 0 }, { y: 0, opacity: 0.6, duration: 0.8 }, '-=0.4');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Handle magnetic tilt on profile card hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = profileCardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = profileCardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const scrollToAbout = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo('#about', { offset: -72, duration: 1.2 });
    }
  };

  return (
    <motion.section
      id="home"
      ref={heroRef}
      style={{ scale: heroScale, opacity: heroOpacity }}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden z-10"
    >
      {/* Background soft glow elements inside Hero */}
      <motion.div 
        style={{ y: glowY }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/[0.03] blur-[130px] rounded-full pointer-events-none z-0" 
      />

      <div className="container relative z-10 flex items-center justify-center w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Column - Headline details */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="hero-greeting font-inter text-sm font-semibold tracking-wider text-accent uppercase mb-4 inline-block">
              Halo Semua
            </span>

            <h1 className="hero-name font-clash text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-primary mb-2">
              Saya Dhaif Muharram
            </h1>
            <p className="hero-name font-inter text-xs text-secondary/50 tracking-[0.3em] uppercase mb-4">
              Fahri Fadhlurrahman Rendy Dhaif Muharram
            </p>

            {/* Title rotations */}
            <div className="hero-titles h-12 md:h-16 overflow-hidden mb-6 flex items-center">
              <span className="font-clash text-2xl md:text-4xl lg:text-5xl font-semibold text-secondary mr-3">
                sebagai
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="font-clash text-2xl md:text-4xl lg:text-5xl font-bold text-accent drop-shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            <p className="hero-desc font-inter text-lg text-secondary max-w-[580px] leading-relaxed mb-10">
              {siteConfig.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 items-center">
              <Magnetic strength={15}>
                <div className="hero-btn-fade">
                  <Button 
                    variant="accent" 
                    size="lg" 
                    onClick={() => lenisRef.current?.scrollTo('#contact', { offset: -72, duration: 1.2 })}
                    className="gap-2 group text-xs tracking-wider uppercase font-semibold"
                  >
                    Hire Me
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Magnetic>

              <Magnetic strength={15}>
                <div className="hero-btn-fade">
                  <a href="/cv/cv-dhaif-muharram.pdf" target="_blank" rel="noopener noreferrer">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="gap-2 group text-xs tracking-wider uppercase font-semibold"
                    >
                      View CV
                      <Eye size={14} />
                    </Button>
                  </a>
                </div>
              </Magnetic>

              <Magnetic strength={15}>
                <div className="hero-btn-fade">
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    onClick={() => lenisRef.current?.scrollTo('#featured-projects', { offset: -72, duration: 1.2 })}
                    className="gap-2 text-xs tracking-wider uppercase font-semibold"
                  >
                    Proyek
                  </Button>
                </div>
              </Magnetic>

              {/* Social icons */}
              <div className="flex items-center gap-2 ml-2">
                <Magnetic strength={20}>
                  <div className="hero-btn-fade">
                    <a
                      href={siteConfig.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full glass border border-white/5 flex items-center justify-center text-secondary hover:text-accent hover:border-accent/30 transition-all duration-300"
                    >
                      <Github size={18} />
                    </a>
                  </div>
                </Magnetic>
                <Magnetic strength={20}>
                  <div className="hero-btn-fade">
                    <a
                      href={siteConfig.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full glass border border-white/5 flex items-center justify-center text-secondary hover:text-accent hover:border-accent/30 transition-all duration-300"
                    >
                      <Linkedin size={18} />
                    </a>
                  </div>
                </Magnetic>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Card and Floating Badges */}
          <div className="lg:col-span-5 relative flex justify-center items-center mt-12 lg:mt-0">
            <motion.div
              ref={profileCardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={cn(
                'hero-profile-card relative w-full max-w-[360px] aspect-[4/5] rounded-[24px]',
                'glass border border-white/10 flex flex-col p-6 shadow-card',
                'transition-all duration-300 ease-out pointer-events-auto'
              )}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Profile Image card container */}
              <div className="relative w-full flex-1 rounded-[16px] overflow-hidden bg-background border border-border/80 group">
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay z-10" />

                {/* Vector fallback vector structure to prevent 404 image load issues */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-surface to-background text-secondary gap-3 p-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <Briefcase size={28} />
                  </div>
                  <span className="font-clash text-lg font-semibold text-primary">{siteConfig.fullName}</span>
                  <span className="font-inter text-xs text-secondary/80">Informatics Student & Web Dev</span>
                </div>

                <Image
                  src="/profile/avatar-1.jpg"
                  alt="Fahri Fadhlurrahman Rendy Dhaif Muharram"
                  fill
                  className="object-cover object-top z-20 group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              {/* Orbital float Badges */}
              {floatingBadges.map((badge) => (
                <motion.div
                  key={badge.name}
                  className={cn(
                    'hero-badge-fade absolute px-4 py-2 rounded-full glass border border-white/10 font-clash text-xs font-bold text-accent/90 shadow-card z-30 pointer-events-none',
                    badge.className
                  )}
                  animate={{
                    y: [0, -12, 0],
                  }}
                  transition={{
                    duration: badge.duration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: badge.delay,
                  }}
                >
                  {badge.name}
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        onClick={scrollToAbout}
        className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-20 flex flex-col items-center gap-1.5 hover:text-accent transition-colors duration-300"
      >
        <span className="font-inter text-[10px] tracking-widest uppercase text-secondary/85">
          Jelajahi
        </span>
        <div className="w-6 h-10 border border-border/80 rounded-full p-1 flex justify-center items-start">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-1 h-2 bg-accent rounded-full"
          />
        </div>
        <ChevronDown size={14} className="animate-bounce" />
      </div>
    </motion.section>
  );
}
