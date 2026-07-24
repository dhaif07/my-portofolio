'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
import type { Project } from '@/types';
import { cn } from '@/utils';
import { ProjectModal } from './project-modal';

gsap.registerPlugin(ScrollTrigger);

const categories = ['Semua', 'Frontend', 'Backend', 'Mobile', 'UI/UX', 'Full Stack', 'Animation'];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === 'Semua' || project.category === activeCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gallery-header-anim',
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
      id="projects" 
      ref={sectionRef} 
      className="relative py-[80px] min-h-screen"
    >
      <div className="container relative z-10 max-w-7xl mx-auto">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="flex-1">
            <h2 className="gallery-header-anim font-clash text-3xl md:text-4xl font-bold text-primary mb-6">
              Galeri <span className="text-accent">Proyek</span>
            </h2>
            
            {/* Filter Tabs */}
            <div className="gallery-header-anim flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full font-inter text-xs font-semibold tracking-wider uppercase transition-all duration-300",
                    activeCategory === cat 
                      ? "bg-accent text-background shadow-[0_0_15px_rgba(0,229,255,0.4)]" 
                      : "glass border border-white/10 text-secondary hover:text-primary hover:border-accent/30"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="gallery-header-anim relative w-full md:w-64 group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-secondary group-focus-within:text-accent transition-colors">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Cari proyek atau teknologi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 focus:border-accent/50 rounded-full py-2.5 pl-10 pr-4 font-inter text-sm text-primary placeholder:text-secondary/50 outline-none transition-all duration-300 glass"
            />
          </div>
        </div>

        {/* Project Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative flex flex-col aspect-[4/3] rounded-[24px] overflow-hidden glass border border-white/10 cursor-pointer shadow-card hover:shadow-card-hover"
              >
                {/* Border Glow Hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
                
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 z-0"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 z-10" />

                <div className="relative z-20 mt-auto p-6 flex flex-col items-start translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 rounded-full mb-3">
                    {project.category}
                  </span>
                  <h3 className="font-clash text-xl font-bold text-primary mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-inter font-semibold uppercase tracking-wider text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span>Lihat Studi Kasus</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="w-full py-20 flex flex-col items-center justify-center text-secondary">
            <Search size={48} className="mb-4 opacity-20" />
            <p className="font-inter text-lg">Tidak ada proyek yang sesuai dengan pencarian Anda.</p>
          </div>
        )}

      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
