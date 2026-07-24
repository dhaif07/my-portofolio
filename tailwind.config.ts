/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
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
      },
      fontFamily: {
        satoshi: ['var(--font-satoshi)', 'sans-serif'],
        clash: ['var(--font-clash)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        btn: '16px',
        card: '22px',
        img: '24px',
        input: '16px',
        avatar: '9999px',
        badge: '999px',
        modal: '28px',
      },
      maxWidth: {
        container: '1400px',
      },
      spacing: {
        section: '120px',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        shimmer: 'shimmer 2.5s infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        noise: "url('/images/noise.png')",
      },
      boxShadow: {
        glow: '0 0 40px rgba(0, 229, 255, 0.15)',
        'glow-lg': '0 0 80px rgba(0, 229, 255, 0.2)',
        card: '0 4px 40px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 60px rgba(0, 0, 0, 0.6)',
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        xs: '375px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
};
