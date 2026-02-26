import type { Metadata } from 'next';
import { Poppins, Playfair_Display, Cinzel, Bebas_Neue } from 'next/font/google';
import './globals.css';

// Əsas şriftlər – ilk çəkimdə (critical)
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  preload: true,
});

const playfairDisplay = Playfair_Display({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  preload: true,
});

// İkinci dərəcəli şriftlər – display: optional ilə bloklamır, lazım olanda gəlir
const cinzel = Cinzel({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'optional',
  variable: '--font-cinzel',
  preload: false,
});

const bebasNeue = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  display: 'optional',
  variable: '--font-bebas',
  preload: false,
});

export const metadata: Metadata = {
  title: 'Montana Furniture - Modern Design Solutions',
  description: 'Discover Montana Furniture\'s innovative design solutions for modern living and working spaces.',
  keywords: 'furniture, modern design, Montana, storage solutions, tables, chairs',
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://furniture.hashtech.az';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfairDisplay.variable} ${cinzel.variable} ${bebasNeue.variable}`}>
      <head>
        {/* API-ə ilk sorğudan əvvəl bağlantı hazırlayır – gecikmə azalır */}
        <link rel="preconnect" href={apiUrl} />
      </head>
      <body suppressHydrationWarning>
          {children}
      </body>
    </html>
  );
}