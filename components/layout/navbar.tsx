'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, MessageSquare, Eye } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { cn } from '@/utils';
import { Magnetic } from '../ui/magnetic';
import { Button } from '../ui/button';
import { useSmoothScrollContext } from '@/providers/smooth-scroll-provider';
import { useScrollDirection } from '@/hooks/use-scroll-progress';

const navItems = [
  { label: 'Tentang', href: '#about', id: 'about' },
  { label: 'Proyek', href: '#featured-projects', id: 'featured-projects' },
  { label: 'Keahlian', href: '#skills', id: 'skills' },
  { label: 'Layanan', href: '#services', id: 'services' },
  { label: 'Kontak', href: '#contact', id: 'contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const scrollDirection = useScrollDirection();
  const { lenisRef } = useSmoothScrollContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);

    // IntersectionObserver to track active page sections for the indicator
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: 0.1 }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (lenisRef.current) {
      if (href === '#home') {
        lenisRef.current.scrollTo(0, { duration: 1.5 });
      } else {
        lenisRef.current.scrollTo(href, { offset: -72, duration: 1.2 });
      }
    }
  };

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
          'h-16 md:h-[72px] flex items-center', // Standard heights: 72px desktop / 64px mobile
          isScrolled ? 'glass-light border-border/10 shadow-[0_4px_30px_rgba(0,0,0,0.2)]' : 'bg-transparent',
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: scrollDirection === 'down' && isScrolled && !isOpen ? -100 : 0,
          opacity: 1 
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container flex items-center justify-between w-full">
          {/* Logo - Left */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, '#home')}
            className="font-clash text-2xl font-bold tracking-wider z-50 relative group flex items-center gap-1 nav-fade"
          >
            <span className="text-primary group-hover:text-accent transition-colors duration-300 group-hover:glow-text-accent">
              {siteConfig.name}
            </span>
            <span className="text-accent font-bold">.</span>
          </Link>

          {/* Navigation links - Center */}
          <nav className="hidden lg:flex items-center gap-1 glass-light px-4 py-1.5 rounded-full border border-white/5 nav-fade">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Magnetic key={item.label} strength={10}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      "relative font-inter text-xs tracking-wider uppercase font-semibold px-4 py-2 transition-colors duration-300 ease-out",
                      isActive ? "text-accent" : "text-secondary hover:text-primary"
                    )}
                  >
                    {item.label}
                    {/* Active slider indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-accent rounded-full"
                        transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                      />
                    )}
                  </a>
                </Magnetic>
              );
            })}
          </nav>

          {/* Action Buttons - Right */}
          <div className="hidden lg:flex items-center gap-3 nav-fade">
            <a href="/cv/cv-dhaif-muharram.pdf" target="_blank" rel="noopener noreferrer">
              <Button
                variant="secondary"
                size="sm"
                className="flex items-center gap-1.5 group text-xs tracking-wide uppercase font-semibold border-white/10"
              >
                View CV
                <Eye size={13} />
              </Button>
            </a>
            <a href="/cv/cv-dhaif-muharram.pdf" download="cv-dhaif-muharram.pdf">
              <Button
                variant="secondary"
                size="sm"
                className="flex items-center gap-1.5 group text-xs tracking-wide uppercase font-semibold border-white/10"
              >
                Download CV
                <Download size={13} className="group-hover:translate-y-0.5 transition-transform" />
              </Button>
            </a>
            <Button
              variant="accent"
              size="sm"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="flex items-center gap-1.5 text-xs tracking-wide uppercase font-semibold"
            >
              Talk
              <MessageSquare size={13} />
            </Button>
          </div>

          {/* Mobile Menu Toggle button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden z-50 p-2 text-primary hover:text-accent transition-colors nav-fade"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Nav Overlay Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl flex flex-col justify-center px-8 md:px-16"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ delay: i * 0.08, ease: 'easeOut' }}
                  className={cn(
                    "font-clash text-4xl font-semibold transition-colors duration-300 w-fit",
                    activeSection === item.id ? "text-accent" : "text-secondary hover:text-primary"
                  )}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            {/* Mobile Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-border/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
            >
              <a href="/cv/cv-dhaif-muharram.pdf" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto justify-center gap-2">
                  View CV <Eye size={16} />
                </Button>
              </a>
              <a href="/cv/cv-dhaif-muharram.pdf" download="cv-dhaif-muharram.pdf" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto justify-center gap-2">
                  Download CV <Download size={16} />
                </Button>
              </a>
              <Button 
                variant="accent" 
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full sm:w-auto justify-center gap-2"
              >
                Let's Talk <MessageSquare size={16} />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
