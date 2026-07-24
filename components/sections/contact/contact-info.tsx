'use client';

import { siteConfig } from '@/config/site';
import { Mail, MapPin, Globe, Github, Linkedin, Instagram, Phone, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/utils';

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Globe,
  instagram: Instagram,
  whatsapp: Phone,
};

export function ContactInfo() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const contactItems = [
    {
      icon: Mail,
      title: 'Email',
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      copyable: true,
      color: 'text-accent',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: siteConfig.location,
      href: null,
      copyable: false,
      color: 'text-warning',
    }
  ];

  const socialLinks = [
    { name: 'linkedin', url: siteConfig.socials.linkedin, icon: Linkedin },
    { name: 'instagram', url: siteConfig.socials.instagram, icon: Instagram },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="font-clash text-3xl md:text-4xl font-bold text-primary mb-4">
          Let's Build Something <span className="text-accent">Amazing</span> Together
        </h3>
        <p className="font-inter text-secondary text-lg leading-relaxed max-w-md">
          Available For: Internship, Freelance, and Collaboration. 
          Let's create something meaningful together!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        {contactItems.map((item) => (
          <div
            key={item.title}
            className="glass-card p-5 flex flex-col gap-3 group relative overflow-hidden"
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* Map Background for Location */}
            {item.title === 'Location' && (
              <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none overflow-hidden">
                <svg className="absolute -right-10 -top-10 w-full h-[150%] text-primary" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18,97,-2.4C97.1,13.2,91.3,28.9,81.7,41.9C72.1,55,58.8,65.4,44.2,73.1C29.6,80.7,13.7,85.6,-1.7,88.6C-17.2,91.5,-32.2,92.5,-45.5,86.2C-58.7,80,-70.2,66.6,-77.7,51.6C-85.2,36.5,-88.7,19.9,-88.4,4C-88.1,-11.9,-84,-26.6,-76.5,-39.6C-68.9,-52.6,-57.8,-63.9,-44.6,-71.8C-31.5,-79.6,-16.2,-84,-0.6,-83.1C15,-82.2,30.5,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
                </svg>
              </div>
            )}

            <div className="flex items-center justify-between z-10">
              <div className={cn("w-10 h-10 rounded-full glass-light border border-border/50 flex items-center justify-center shrink-0", item.color)}>
                <item.icon size={18} />
              </div>
              {item.copyable && (
                <button
                  onClick={() => handleCopy(item.value)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:text-primary hover:bg-white/10 transition-colors"
                  aria-label={`Copy ${item.title}`}
                >
                  {copiedText === item.value ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                </button>
              )}
            </div>
            
            <div className="z-10 mt-1">
              <h4 className="font-inter font-medium text-secondary text-sm mb-1">{item.title}</h4>
              {item.href ? (
                <a href={item.href} target={item.title !== 'Email' ? '_blank' : undefined} rel="noopener noreferrer" className="font-inter font-semibold text-primary text-base md:text-lg hover:text-accent transition-colors block truncate">
                  {item.value}
                </a>
              ) : (
                <p className="font-inter font-semibold text-primary text-base md:text-lg truncate">{item.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h4 className="font-inter font-medium text-secondary text-sm mb-4">Connect on Socials</h4>
        <div className="flex flex-wrap gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card w-12 h-12 flex items-center justify-center text-secondary hover:text-accent hover:border-accent/30 hover:scale-110 hover:-rotate-6 transition-all duration-300"
              aria-label={social.name}
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
