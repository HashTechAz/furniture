import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import '../styles/globals.css';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Montana Furniture - Modern Design Solutions',
  description: 'Discover Montana Furniture\'s innovative design solutions for modern living and working spaces.',
  keywords: 'furniture, modern design, Montana, storage solutions, tables, chairs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}> 
      <body suppressHydrationWarning>
          {children}
      </body>
    </html>
  );
}