import { Space_Grotesk, Syne, Inter } from 'next/font/google';

export const satoshi = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-satoshi',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const clashDisplay = Syne({
  subsets: ['latin'],
  variable: '--font-clash',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});
