'use client';

import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '@/constants';

type Breakpoint = keyof typeof BREAKPOINTS;

export function useMediaQuery(breakpoint: Breakpoint): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query = `(min-width: ${BREAKPOINTS[breakpoint]}px)`;
    const mediaQuery = window.matchMedia(query);

    setMatches(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [breakpoint]);

  return matches;
}

export function useIsMobile(): boolean {
  return !useMediaQuery('md');
}
