'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, CheckCircle2 } from 'lucide-react';
import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';
import { FadeIn } from '@/components/animations/fade-in';
import { SectionLabel } from '@/components/ui/section-label';
import { use } from 'react';

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const gallery = [
    { src: '/projects/pondok/screenshot-home.png', caption: 'Halaman Beranda' },
    { src: '/projects/pondok/screenshot-berita.png', caption: 'Halaman Berita & Artikel' },
    { src: '/projects/pondok/screenshot-admin-dashboard.png', caption: 'Dashboard Admin' },
    { src: '/projects/pondok/screenshot-pendaftaran.png', caption: 'Manajemen Pendaftaran Santri' },
  ];

  const processSteps = [
    'Planning',
    'Wireframing',
    'UI Design',
    'Frontend Development',
    'Backend Development',
    'Testing',
    'Deployment',
  ];

  return (
    <main className="min-h-screen bg-background relative overflow-hidden pt-24 pb-32">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.03] blur-[130px] rounded-full pointer-events-none z-0" />

      <div className="container max-w-5xl mx-auto relative z-10 px-4 md:px-8">

        <div className="mb-12">
          <Link href="/#featured-projects" className="inline-flex items-center gap-2 text-secondary hover:text-accent transition-colors font-inter text-sm group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
          </Link>
        </div>

        {/* Hero */}
        <FadeIn y={20}>
          <div className="mb-8">
            <SectionLabel className="mb-4">{project!.category}</SectionLabel>
            <h1 className="font-clash text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight">
              {project!.title}
            </h1>
            <div className="flex flex-wrap gap-3 mb-8">
              {project!.tags.map(tag => (
                <span key={tag} className="px-4 py-2 text-sm font-inter text-secondary bg-white/5 border border-white/10 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Hero image */}
        <FadeIn delay={0.2} y={30}>
          <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden glass border border-white/10 mb-20 shadow-[0_0_50px_rgba(0,229,255,0.1)] bg-surface">
            <div className="absolute inset-0 flex items-center justify-center text-secondary/30 font-clash text-2xl font-bold z-10">
              {project!.title}
            </div>
            <Image
              src={project!.image}
              alt={project!.title}
              fill
              className="object-cover z-20"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 flex flex-col gap-16">

            <FadeIn>
              <section>
                <h2 className="font-clash text-3xl font-bold text-primary mb-6">Overview</h2>
                <p className="font-inter text-lg text-secondary leading-relaxed">
                  Website Pondok Pesantren dibuat sebagai media informasi resmi agar masyarakat dapat memperoleh informasi pondok secara lebih mudah dan terstruktur.
                </p>
              </section>
            </FadeIn>

            <FadeIn>
              <section>
                <h2 className="font-clash text-3xl font-bold text-primary mb-6">Problem</h2>
                <p className="font-inter text-lg text-secondary leading-relaxed">
                  {project!.challenges}
                </p>
              </section>
            </FadeIn>

            <FadeIn>
              <section>
                <h2 className="font-clash text-3xl font-bold text-primary mb-6">Solution</h2>
                <p className="font-inter text-lg text-secondary leading-relaxed">
                  {project!.solutions}
                </p>
              </section>
            </FadeIn>

            <FadeIn>
              <section>
                <h2 className="font-clash text-3xl font-bold text-primary mb-6">Technology Used</h2>
                <div className="flex flex-wrap gap-3">
                  {project!.tags.map(tag => (
                    <span key={tag} className="px-5 py-2.5 font-inter font-semibold text-sm text-accent bg-accent/10 border border-accent/20 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            </FadeIn>

            <FadeIn>
              <section>
                <h2 className="font-clash text-3xl font-bold text-primary mb-6">Result</h2>
                <p className="font-inter text-lg text-secondary leading-relaxed">
                  {project!.result}
                </p>
              </section>
            </FadeIn>

            <FadeIn>
              <section>
                <h2 className="font-clash text-3xl font-bold text-primary mb-8">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {gallery.map((item, idx) => (
                    <div key={idx} className="group flex flex-col gap-3">
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden glass border border-white/10 bg-surface">
                        <Image
                          src={item.src}
                          alt={item.caption}
                          fill
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <span className="font-inter text-white text-sm font-semibold">{item.caption}</span>
                        </div>
                      </div>
                      <p className="font-inter text-secondary/70 text-sm text-center">{item.caption}</p>
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-10">
            <FadeIn>
              <div className="glass-card p-6 flex flex-col gap-8 sticky top-32">
                <div>
                  <h3 className="font-inter font-bold text-primary uppercase tracking-wider text-sm mb-3 opacity-50">Role</h3>
                  <p className="font-inter font-medium text-secondary">{project!.role}</p>
                </div>

                <div>
                  <h3 className="font-inter font-bold text-primary uppercase tracking-wider text-sm mb-4 opacity-50">Features</h3>
                  <ul className="flex flex-col gap-3">
                    {project!.features?.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 font-inter text-secondary text-sm">
                        <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-inter font-bold text-primary uppercase tracking-wider text-sm mb-4 opacity-50">Development Process</h3>
                  <div className="flex flex-col gap-3">
                    {processSteps.map((step, i) => (
                      <div key={step} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-[10px] text-accent shrink-0 border border-accent/20 font-bold">
                          {i + 1}
                        </div>
                        <span className="font-inter text-secondary text-sm">{step}</span>
                        {i < processSteps.length - 1 && (
                          <div className="absolute left-[22px] w-px bg-white/5" style={{ top: `${(i + 1) * 36 + 12}px`, height: '24px' }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <a
                    href={project!.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-primary text-background font-bold text-sm hover:bg-accent hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300"
                  >
                    Visit Website <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </main>
  );
}
