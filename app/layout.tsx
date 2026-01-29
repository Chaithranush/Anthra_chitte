import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Anthra Chitte | Handcrafted Traditional Wear',
  description: 'Elegant, warm, traditional yet clean fashion. Shop Flexifit dresses, Maternity wear, and Sarees with pockets.',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased text-foreground', playfair.variable, inter.variable)}>
        {children}
      </body>
    </html>
  );
}
