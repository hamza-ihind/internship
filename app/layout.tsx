import { Metadata } from 'next';
import './globals.css';
import { Geist } from 'next/font/google';
import { ThemeProvider } from '@/lib/theme-provider';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Moroccan Internship Platform',
  description: 'Find, filter, and apply for internships in Morocco',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} min-h-dvh bg-white text-primary`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
