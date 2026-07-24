'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import type Lenis from 'lenis';
import type { RefObject } from 'react';

interface SmoothScrollContextValue {
  lenisRef: RefObject<Lenis | null>;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useSmoothScroll();

  return (
    <SmoothScrollContext.Provider value={{ lenisRef }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScrollContext(): SmoothScrollContextValue {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error('useSmoothScrollContext must be used within SmoothScrollProvider');
  }
  return context;
}
