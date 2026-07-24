'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import type { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-surface/90 backdrop-blur-xl border border-white/10 rounded-[28px] shadow-2xl overflow-hidden flex flex-col z-10"
          >
            {/* Header (Close Button) */}
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={onClose}
                className="p-3 bg-black/50 hover:bg-accent/20 border border-white/10 hover:border-accent/50 text-white rounded-full backdrop-blur-md transition-all duration-300 group"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto overflow-x-hidden flex-1 custom-scrollbar">
              
              {/* Hero Image */}
              <div className="relative w-full h-[300px] md:h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent z-10" />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover z-0"
                  priority
                />
              </div>

              {/* Content Body */}
              <div className="p-6 md:p-12 relative z-20 -mt-20">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 rounded-full border border-accent/20">
                    {project.category}
                  </span>
                  <span className="text-xs font-medium text-secondary/80 bg-white/5 px-3 py-1 rounded-full">
                    {project.year}
                  </span>
                </div>

                <h2 className="font-clash text-4xl md:text-5xl font-bold text-primary mb-6">
                  {project.title}
                </h2>

                <div className="flex flex-wrap gap-4 mb-10">
                  {project.link && (
                    <Button variant="primary" className="gap-2 text-sm" onClick={() => window.open(project.link, '_blank')}>
                      Live Demo <ExternalLink size={16} />
                    </Button>
                  )}
                  {project.github && (
                    <Button variant="secondary" className="gap-2 text-sm" onClick={() => window.open(project.github, '_blank')}>
                      GitHub <Github size={16} />
                    </Button>
                  )}
                </div>

                {/* Case Study Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {/* Left Column (Meta) */}
                  <div className="md:col-span-1 space-y-8">
                    <div>
                      <h4 className="font-inter text-xs uppercase tracking-widest text-secondary/60 font-semibold mb-3">Peran & Waktu</h4>
                      <div className="font-inter text-sm text-primary/90 space-y-1">
                        <p>{project.role || 'Developer'}</p>
                        <p className="text-secondary/80">{project.timeline || 'N/A'}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-inter text-xs uppercase tracking-widest text-secondary/60 font-semibold mb-3">Teknologi</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 text-xs font-inter text-secondary bg-white/5 border border-white/10 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Details) */}
                  <div className="md:col-span-2 space-y-10">
                    <section>
                      <h3 className="font-clash text-2xl font-bold text-primary mb-4 border-b border-white/5 pb-2">Ringkasan</h3>
                      <p className="font-inter text-secondary/90 text-sm md:text-base leading-relaxed">
                        {project.longDescription}
                      </p>
                    </section>

                    {project.features && project.features.length > 0 && (
                      <section>
                        <h3 className="font-clash text-2xl font-bold text-primary mb-4 border-b border-white/5 pb-2">Fitur Utama</h3>
                        <ul className="list-disc list-inside space-y-2 font-inter text-secondary/90 text-sm md:text-base">
                          {project.features.map((feature, idx) => (
                            <li key={idx} className="marker:text-accent">{feature}</li>
                          ))}
                        </ul>
                      </section>
                    )}

                    {project.challenges && (
                      <section>
                        <h3 className="font-clash text-2xl font-bold text-primary mb-4 border-b border-white/5 pb-2">Tantangan</h3>
                        <p className="font-inter text-secondary/90 text-sm md:text-base leading-relaxed">
                          {project.challenges}
                        </p>
                      </section>
                    )}

                    {project.solutions && (
                      <section>
                        <h3 className="font-clash text-2xl font-bold text-primary mb-4 border-b border-white/5 pb-2">Solusi & Arsitektur</h3>
                        <p className="font-inter text-secondary/90 text-sm md:text-base leading-relaxed">
                          {project.solutions}
                        </p>
                      </section>
                    )}

                    {project.result && (
                      <section>
                        <h3 className="font-clash text-2xl font-bold text-primary mb-4 border-b border-white/5 pb-2">Hasil & Dampak</h3>
                        <p className="font-inter text-secondary/90 text-sm md:text-base leading-relaxed">
                          {project.result}
                        </p>
                      </section>
                    )}
                  </div>
                </div>
                
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
