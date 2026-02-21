import type { Metadata } from 'next';
import { Suspense } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
export const metadata: Metadata = {
  title: 'Montana Furniture - Modern Design Solutions',
  description: 'Discover Montana Furniture\'s innovative design solutions for modern living and working spaces.',
  keywords: 'furniture, modern design, Montana, storage solutions, tables, chairs',
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<div style={{ height: '80px' }}></div>}>
        <Header />
      </Suspense>
      <main>{children}</main>
      <Footer />
    </>
  );
}