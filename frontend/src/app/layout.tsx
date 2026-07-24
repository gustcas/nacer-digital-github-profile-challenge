import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/providers/theme-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'GitHub Profile Viewer | Nacer Digital Challenge',
  description:
    'Full Stack GitHub Profile Viewer built with NestJS and Next.js.',
  authors: [{ name: 'Gustavo Pachacama', url: 'https://github.com/gustcas' }],
  keywords: [
    'GitHub',
    'Profile Viewer',
    'NestJS',
    'Next.js',
    'Full Stack',
    'Nacer Digital',
  ],
  openGraph: {
    title: 'GitHub Profile Viewer | Nacer Digital Challenge',
    description:
      'Full Stack GitHub Profile Viewer built with NestJS and Next.js.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0e14' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
