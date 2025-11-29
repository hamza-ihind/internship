import './globals.css';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Providers from '@/components/providers/session-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';

const geist = Geist({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'YDE - Youth & Digital Entrepreneurship',
  description:
    "1ère Édition du Colloque International sur l'Entrepreneuriat des Jeunes et le Digital - Vers des modèles d'affaires innovants et globaux en Afrique. 4-5 Novembre 2025, ENCG Agadir.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={geist.className}>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
