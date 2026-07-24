'use client';

import { useRef, MouseEvent, useState } from 'react';
import { Project } from '@/types';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/utils';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  className?: string;
}

export function ProjectCard({ project, onClick, className }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0, -6px, 10px) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0px, 0px) scale3d(1, 1, 1)';
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'group cursor-pointer relative rounded-card overflow-hidden bg-surface border border-border transition-all duration-300 ease-out',
        'hover:shadow-glow hover:border-accent/40',
        className
      )}
      onClick={() => onClick(project)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">
        {/* Placeholder gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface to-background" />
        
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div 
        className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3"
        style={{ transform: 'translateZ(30px)' }}
      >
        <div className="flex flex-wrap gap-2 mb-1">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="bg-background/50 backdrop-blur-sm border-border/50">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-border/50">
              +{project.tags.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-clash text-2xl font-bold text-primary group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="font-inter text-secondary text-sm mt-1 line-clamp-2">
              {project.description}
            </p>
          </div>
          
          <div className={cn(
            'w-10 h-10 rounded-full bg-accent text-background flex items-center justify-center shrink-0 transition-all duration-300',
            isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          )}>
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
