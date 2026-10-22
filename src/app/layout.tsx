import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { fontClassNames } from './fonts';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#090d16' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Evan Pranawa Armansyah - Software Engineer & Cybersecurity Enthusiast',
  description: 'The portfolio of Evan Pranawa Armansyah, a vocational high school student specializing in software engineering (Rekayasa Perangkat Lunak) and cybersecurity. Explore my projects, skills, and journey in the world of technology.',
  keywords: ['Evan Pranawa Armansyah', 'Evan', 'Pranawa', 'Armansyah', 'Portfolio', 'Software Engineer', 'Cybersecurity', 'Rekayasa Perangkat Lunak', 'Web Developer', 'Bogor', 'Indonesia'],
  authors: [{ name: 'Evan Pranawa Armansyah', url: 'https://evanpranawa.my.id' }],
  creator: 'Evan Pranawa Armansyah',
  publisher: 'Evan Pranawa Armansyah',
  metadataBase: new URL('https://evanpranawa.my.id'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Evan Pranawa Armansyah - Software Engineering Student - SysAdmin',
    description: 'Portofolio of Evan Pranawa Armansyah. Showcasing works by Evan',
    url: 'https://evanpranawa.my.id',
    siteName: 'Evan Pranawa Armansyah',
    images: [
      {
        url: '/ev-og.png', // Should be a path to a good OG image
        width: 1200,
        height: 630,
        alt: 'Card of Evan Pranawa Armansyah',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evan Pranawa Armansyah - Software Engineer & Cybersecurity Enthusiast',
    description: 'Explore the portfolio of Evan Pranawa Armansyah, showcasing projects in software engineering and cybersecurity.',
    images: ['/main.webp'], // Should be a path to a good Twitter card image
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
  other: {
    'Google-Extended': 'disallow: /',
    'GPTBot': 'disallow: /',
    'CCBot': 'disallow: /',
    'anthropic-ai': 'disallow: /',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fontClassNames} dark`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#060609] text-white antialiased min-h-screen selection:bg-[#ff2638] selection:text-white">
        {children}
        <Toaster />
      </body>
    </html>
  );
}