'use client';

import { useState } from 'react';
import { ThemeProvider } from '@/providers/theme-provider';
import { SmoothScrollProvider } from '@/providers/smooth-scroll-provider';
import { BackgroundLayers } from './background-layers';
import { LoadingScreen } from './loading-screen';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { CustomCursor } from './cursor';
import { ScrollProgressBar } from './scroll-progress-bar';
import { ScrollToTop } from '../ui/scroll-to-top';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        {/* Loading Screen */}
        <LoadingScreen onComplete={() => setIsLoading(false)} />

        {!isLoading && (
          <>
            {/* 7-Layer Background System */}
            <BackgroundLayers />

            {/* Scroll progress indicator */}
            <ScrollProgressBar />

            {/* Custom cursor */}
            <CustomCursor />

            {/* Navigation */}
            <Navbar />

            {/* Page content */}
            <main id="main-content" className="relative z-10">
              {children}
            </main>

            {/* Footer */}
            <Footer />

            {/* Scroll to Top */}
            <ScrollToTop />
          </>
        )}
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
