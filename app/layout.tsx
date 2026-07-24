import type { Metadata } from 'next';
import { satoshi, clashDisplay, inter } from './fonts';
import { ClientLayout } from '@/components/layout/client-layout';
import { siteMetadata } from './metadata';
import './globals.css';

export const metadata: Metadata = siteMetadata;

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${clashDisplay.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-primary antialiased overflow-x-hidden">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
