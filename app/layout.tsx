import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://anthrachitte.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Anthra Chitte | Handcrafted Traditional Wear',
    template: '%s | Anthra Chitte',
  },
  description: 'Elegant, warm, traditional yet clean fashion. Shop Flexifit dresses, Maternity wear, and Sarees with pockets. Heartcrafted in India.',
  keywords: ['sarees', 'traditional wear', 'maternity wear', 'Flexifit', 'handcrafted', 'Anthra Chitte', 'sarees with pockets'],
  icons: [
    { rel: 'icon', url: '/icon.png', type: 'image/png', sizes: '32x32' },
    { rel: 'shortcut icon', url: '/icon.png' },
    { rel: 'apple-touch-icon', url: '/apple-icon.png', sizes: '180x180' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Anthra Chitte',
    title: 'Anthra Chitte | Handcrafted Traditional Wear',
    description: 'Elegant, warm, traditional yet clean fashion. Shop Flexifit dresses, Maternity wear, and Sarees with pockets.',
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'Anthra Chitte' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anthra Chitte | Handcrafted Traditional Wear',
    description: 'Elegant, warm, traditional yet clean fashion. Shop Flexifit, Maternity wear, Sarees with pockets.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#004d4d',
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
