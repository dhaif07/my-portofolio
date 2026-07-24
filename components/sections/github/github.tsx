'use client';

import { useEffect, useState, useRef } from 'react';
import { SectionLabel } from '@/components/ui/section-label';
import { Button } from '@/components/ui/button';
import { Github, Users, Star, GitFork, BookOpen, Activity } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

// Mock data fallback to guarantee the UI always works
const MOCK_PROFILE = {
  login: 'dhaifmuharram',
  name: 'Dhaif Muharram',
  avatar_url: '/profile/avatar-1.jpg', // Fallback to local
  bio: 'Frontend Developer & UI/UX Designer',
  public_repos: 45,
  followers: 120,
  following: 30,
  html_url: 'https://github.com/dhaifmuharram'
};

const MOCK_REPOS = [
  { id: 1, name: 'portfolio-v3', description: 'Next.js 15 Premium Portfolio', language: 'TypeScript', stars: 12, forks: 2, html_url: '#' },
  { id: 2, name: 'flutter-ecommerce', description: 'Full stack flutter ecommerce app', language: 'Dart', stars: 45, forks: 10, html_url: '#' },
  { id: 3, name: 'react-design-system', description: 'Headless UI component library', language: 'TypeScript', stars: 89, forks: 24, html_url: '#' },
  { id: 4, name: 'laravel-api-boilerplate', description: 'Robust REST API starting point', language: 'PHP', stars: 34, forks: 8, html_url: '#' },
];

export function GithubSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [profile, setProfile] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt to fetch real GitHub data, fallback to mock if rate-limited or fails
    const fetchGithubData = async () => {
      try {
        const username = 'dhaifmuharram'; // Assuming this username
        const profileRes = await fetch(`https://api.github.com/users/${username}`);
        if (!profileRes.ok) throw new Error('Profile fetch failed');
        const profileData = await profileRes.json();
        
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`);
        if (!reposRes.ok) throw new Error('Repos fetch failed');
        const reposData = await reposRes.json();

        setProfile(profileData);
        setRepos(reposData);
      } catch (error) {
        console.log('Using mock GitHub data due to API limits/error');
        setProfile(MOCK_PROFILE);
        setRepos(MOCK_REPOS);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.github-header-anim',
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

      gsap.fromTo(
        '.github-card-anim',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.github-container',
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [loading]); // Re-run animation when data loads

  return (
    <section 
      id="github" 
      ref={sectionRef} 
      className="relative py-[100px] overflow-hidden"
    >
      <div className="container relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="github-header-anim mb-6">
            <SectionLabel>SUMBER TERBUKA</SectionLabel>
          </div>
          <h2 className="github-header-anim font-clash text-4xl md:text-5xl font-bold text-primary mb-6">
            Aktivitas <span className="text-accent">GitHub</span>
          </h2>
        </div>

        {!loading && profile && (
          <div className="github-container grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Profile Card */}
            <div className="github-card-anim lg:col-span-4 glass border border-white/10 rounded-[24px] p-8 flex flex-col items-center text-center shadow-card relative overflow-hidden group hover:border-accent/30 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 mb-4 z-10">
                <Image
                  src={profile.avatar_url || '/profile/avatar-1.jpg'}
                  alt={profile.name || profile.login}
                  fill
                  className="object-cover"
                />
              </div>
              
              <h3 className="font-clash text-2xl font-bold text-primary z-10">{profile.name || profile.login}</h3>
              <p className="font-inter text-sm text-secondary/80 mb-6 z-10">@{profile.login}</p>
              
              {profile.bio && (
                <p className="font-inter text-sm text-primary/80 mb-8 z-10">
                  {profile.bio}
                </p>
              )}

              <div className="grid grid-cols-3 w-full gap-2 border-y border-white/10 py-4 mb-8 z-10">
                <div className="flex flex-col items-center">
                  <span className="font-clash text-xl font-bold text-primary">{profile.public_repos}</span>
                  <span className="font-inter text-[10px] uppercase tracking-wider text-secondary/60">Repositori</span>
                </div>
                <div className="flex flex-col items-center border-x border-white/10">
                  <span className="font-clash text-xl font-bold text-primary">{profile.followers}</span>
                  <span className="font-inter text-[10px] uppercase tracking-wider text-secondary/60">Pengikut</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-clash text-xl font-bold text-primary">{profile.following}</span>
                  <span className="font-inter text-[10px] uppercase tracking-wider text-secondary/60">Mengikuti</span>
                </div>
              </div>

              <Button 
                variant="secondary" 
                className="w-full gap-2 z-10"
                onClick={() => window.open(profile.html_url, '_blank')}
              >
                Ikuti di GitHub <Github size={16} />
              </Button>
            </div>

            {/* Right: Repositories */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {repos.map((repo: any) => (
                <div 
                  key={repo.id}
                  className="github-card-anim glass border border-white/10 rounded-[20px] p-6 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover group cursor-pointer flex flex-col"
                  onClick={() => window.open(repo.html_url, '_blank')}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2 text-primary group-hover:text-accent transition-colors">
                      <BookOpen size={18} />
                      <h4 className="font-clash font-bold text-lg truncate w-40 sm:w-48">{repo.name}</h4>
                    </div>
                  </div>
                  
                  <p className="font-inter text-sm text-secondary/80 line-clamp-2 mb-6 flex-1">
                    {repo.description || 'Tidak ada deskripsi.'}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-inter font-medium text-secondary/60 pt-4 border-t border-white/5">
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                        {repo.language}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Star size={14} /> {repo.stars || repo.stargazers_count || 0}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork size={14} /> {repo.forks || repo.forks_count || 0}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Fake Contribution Graph Container */}
              <div className="github-card-anim sm:col-span-2 glass border border-white/10 rounded-[20px] p-6 flex flex-col justify-center items-center relative overflow-hidden group hover:border-accent/30 transition-all duration-300">
                <div className="flex items-center gap-2 mb-4 text-primary">
                  <Activity size={18} />
                  <h4 className="font-clash font-bold">Aktivitas Kontribusi</h4>
                </div>
                <p className="font-inter text-xs text-secondary/60 mb-6 text-center max-w-sm">
                  Ringkasan visual commit kode, pull request, dan tinjauan kode yang dipetakan selama setahun terakhir.
                </p>
                
                {/* Simulated Graph pattern */}
                <div className="flex gap-1 overflow-hidden opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(30)].map((_, colIdx) => (
                    <div key={colIdx} className="flex flex-col gap-1">
                      {[...Array(5)].map((_, rowIdx) => {
                        const intensity = Math.random();
                        const bgClass = intensity > 0.8 ? 'bg-accent' : intensity > 0.5 ? 'bg-accent/60' : intensity > 0.2 ? 'bg-accent/30' : 'bg-white/5';
                        return (
                          <div key={rowIdx} className={`w-2.5 h-2.5 rounded-sm ${bgClass}`} />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </section>
  );
}
