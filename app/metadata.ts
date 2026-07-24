import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.fullName} | Portfolio`,
    template: `%s | ${siteConfig.fullName}`,
  },
  description: siteConfig.description,
  keywords: ['Portfolio', 'Web Developer', 'Frontend Developer', 'UI Design', 'HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Figma', 'Dhaif Muharram'],
  authors: [{ name: siteConfig.fullName, url: siteConfig.url }],
  creator: siteConfig.fullName,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: `${siteConfig.fullName} | Portfolio`,
    description: siteConfig.description,
    siteName: siteConfig.fullName,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${siteConfig.fullName} Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.fullName} | Portfolio`,
    description: siteConfig.description,
    creator: '@twitterhandle', // Could be dynamic from siteConfig
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
