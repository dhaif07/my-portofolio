export const COLORS = {
  background: '#050505',
  card: '#111111',
  surface: '#181818',
  border: '#262626',
  primary: '#FFFFFF',
  secondary: '#A0A0A0',
  accent: '#00E5FF',
  success: '#00FF99',
  warning: '#FFC857',
  danger: '#FF5D73',
} as const;

export const ANIMATION = {
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.8,
    verySlow: 1.2,
  },
  ease: {
    smooth: [0.25, 0.46, 0.45, 0.94] as const,
    snappy: [0.77, 0, 0.175, 1] as const,
    expo: [0.16, 1, 0.3, 1] as const,
    spring: { type: 'spring', stiffness: 300, damping: 30 },
    springBounce: { type: 'spring', stiffness: 400, damping: 20 },
  },
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
} as const;

export const BREAKPOINTS = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
} as const;
