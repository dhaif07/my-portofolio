'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { SectionLabel } from '@/components/ui/section-label';
import { Button } from '@/components/ui/button';
import { certificatesData } from '@/data/certificates';
import type { Certificate } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function CertificateCard({ cert, index }: { cert: Certificate; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
          },
        }
      );
    }, cardRef);
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col rounded-[24px] overflow-hidden glass border border-white/10 hover:border-accent/40 hover:shadow-card-hover transition-all duration-500 ease-out hover:-translate-y-2"
    >
      {/* Animated Border Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_2s_infinite] transition-opacity duration-500 pointer-events-none z-20" />
      
      {/* Fallback pattern if image is missing */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface via-background to-background pointer-events-none -z-10" />

      <div className="relative w-full aspect-[4/3] bg-white/5 border-b border-white/5 overflow-hidden">
        <Image
          src={cert.image}
          alt={cert.title}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
        <div className="absolute top-4 right-4 z-20">
          <div className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-success/80 group-hover:text-success transition-colors">
            <ShieldCheck size={16} />
          </div>
        </div>
      </div>

      <div className="p-6 relative z-30 flex flex-col flex-1">
        <h3 className="font-clash text-lg font-bold text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors">
          {cert.title}
        </h3>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <div className="flex flex-col">
            <span className="font-inter text-xs text-secondary/60 uppercase tracking-widest font-semibold mb-1">Penerbit</span>
            <span className="font-inter text-sm text-secondary/90">{cert.issuer}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-inter text-xs text-secondary/60 uppercase tracking-widest font-semibold mb-1">Tanggal</span>
            <span className="font-inter text-sm text-secondary/90">{cert.date}</span>
          </div>
        </div>
        
        {cert.credentialUrl && (
          <div className="mt-6">
            <Button 
              variant="secondary" 
              className="w-full gap-2 text-xs" 
              onClick={() => window.open(cert.credentialUrl, '_blank')}
            >
              Verifikasi Sertifikat <ArrowUpRight size={14} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export function CertificatesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cert-header-anim',
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

  return (
    <section 
      id="certificates" 
      ref={sectionRef} 
      className="relative py-[100px] overflow-hidden"
    >
      <div className="container relative z-10 max-w-6xl mx-auto">
        
        <div className="flex flex-col items-start mb-16">
          <div className="cert-header-anim mb-6">
            <SectionLabel>SERTIFIKAT</SectionLabel>
          </div>
          <h2 className="cert-header-anim font-clash text-4xl md:text-5xl font-bold text-primary max-w-2xl">
            <span className="text-accent">Keahlian</span> Terverifikasi
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {certificatesData.map((cert, index) => (
            <CertificateCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
