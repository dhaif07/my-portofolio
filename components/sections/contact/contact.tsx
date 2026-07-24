'use client';

import { SectionLabel } from '@/components/ui/section-label';
import { FadeIn } from '@/components/animations/fade-in';
import { ContactForm } from './contact-form';
import { ContactInfo } from './contact-info';

export function ContactSection() {
  return (
    <section id="contact" className="section relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[800px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        <FadeIn y={20} className="mb-16 md:mb-24 text-center">
          <SectionLabel className="mb-6">Get in Touch</SectionLabel>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-6xl mx-auto">
          <FadeIn x={-30}>
            <ContactInfo />
          </FadeIn>
          
          <FadeIn x={30} delay={0.2}>
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
