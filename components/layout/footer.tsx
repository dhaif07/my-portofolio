'use client';

import { siteConfig } from '@/config/site';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';
import { Magnetic } from '../ui/magnetic';
import { useSmoothScrollContext } from '@/providers/smooth-scroll-provider';

const footerSocials = [
  { name: 'Github', url: siteConfig.socials.github, icon: Github },
  { name: 'LinkedIn', url: siteConfig.socials.linkedin, icon: Linkedin },
  { name: 'Instagram', url: siteConfig.socials.instagram, icon: Instagram },
  { name: 'Email', url: `mailto:${siteConfig.email}`, icon: Mail },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { lenisRef } = useSmoothScrollContext();

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.5 });
    }
  };

  return (
    <footer className="bg-background relative overflow-hidden">
      {/* Glass Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
      
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-3xl h-64 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container relative z-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Column 1: Logo & Description */}
          <div className="flex flex-col items-start gap-4">
            <button
              onClick={scrollToTop}
              className="font-clash text-2xl font-bold tracking-wider group text-left flex items-center gap-1"
            >
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent text-sm">DM</span>
              </div>
              <span className="text-primary group-hover:text-accent transition-colors duration-300 ml-2">
                {siteConfig.fullName}
              </span>
            </button>
            <p className="font-inter text-secondary max-w-xs mt-2 text-sm leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-clash font-semibold text-primary mb-2">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {siteConfig.nav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-inter text-sm text-secondary hover:text-accent w-fit transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Social Media */}
          <div className="flex flex-col gap-4">
            <h4 className="font-clash font-semibold text-primary mb-2">Social Media</h4>
            <div className="flex flex-col gap-3">
              {footerSocials.map((platform) => {
                return (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-inter text-sm text-secondary hover:text-accent w-fit transition-colors duration-200 flex items-center gap-2 group"
                    aria-label={platform.name}
                  >
                    <platform.icon size={16} className="group-hover:scale-110 transition-transform" />
                    {platform.name}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/30">
          <p className="font-inter text-sm text-secondary/60">
            © {currentYear} {siteConfig.fullName}. All rights reserved.
          </p>
          <p className="font-inter text-sm text-secondary/60 mt-2 md:mt-0">
            Crafted with <span className="text-danger">♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
