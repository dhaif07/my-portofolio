'use client';

import Link from 'next/link';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { SectionLabel } from '@/components/ui/section-label';
import { Button } from '@/components/ui/button';

export default function CVPage() {
  const pdfUrl = '/cv/cv-dhaif-muharram.pdf';

  return (
    <main className="min-h-screen bg-background relative overflow-hidden pt-24 pb-32">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.03] blur-[130px] rounded-full pointer-events-none z-0" />

      <div className="container max-w-5xl mx-auto relative z-10 px-4 md:px-8">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-secondary hover:text-accent transition-colors font-inter text-sm group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
        </div>

        {/* Hero Header */}
        <FadeIn y={20}>
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <SectionLabel className="mb-4">CURRICULUM VITAE</SectionLabel>
              <h1 className="font-clash text-4xl md:text-5xl font-bold text-primary leading-tight">
                Preview <span className="text-accent">CV</span>
              </h1>
            </div>

            {/* Above PDF Buttons */}
            <div className="flex flex-wrap gap-4">
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2 border-white/10 hover:border-accent/40 text-sm font-semibold">
                  Open in New Tab <ExternalLink size={16} />
                </Button>
              </a>
              <a href={pdfUrl} download="cv-dhaif-muharram.pdf">
                <Button variant="accent" className="gap-2 text-sm font-semibold">
                  Download CV <Download size={16} />
                </Button>
              </a>
            </div>
          </div>
        </FadeIn>

        {/* PDF Preview Container */}
        <FadeIn delay={0.2} y={30}>
          <div className="relative w-full rounded-3xl overflow-hidden glass border border-white/10 shadow-[0_0_50px_rgba(0,229,255,0.1)] bg-surface p-2 md:p-4 aspect-[1/1.4] md:aspect-[1/1.3] lg:aspect-[1/1.4] min-h-[500px]">
            <iframe
              src={`${pdfUrl}#toolbar=0`}
              className="w-full h-full rounded-2xl border-0 bg-neutral-900"
              title="CV Fahri Fadhlurrahman Rendy Dhaif Muharram"
            >
              {/* Fallback content for unsupported browsers */}
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <p className="font-inter text-lg text-secondary mb-6">
                  Pratinjau PDF tidak didukung oleh browser Anda.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="gap-2 border-white/10 hover:border-accent/40 font-semibold w-full sm:w-auto justify-center">
                      Open PDF <ExternalLink size={16} />
                    </Button>
                  </a>
                  <a href={pdfUrl} download="cv-dhaif-muharram.pdf">
                    <Button variant="accent" className="gap-2 font-semibold w-full sm:w-auto justify-center">
                      Download PDF <Download size={16} />
                    </Button>
                  </a>
                </div>
              </div>
            </iframe>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
