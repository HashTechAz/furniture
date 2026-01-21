import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'Montana Furniture - Modern Design Solutions',
  description: 'Discover Montana Furniture\'s innovative design solutions for modern living and working spaces.',
  keywords: 'furniture, modern design, Montana, storage solutions, tables, chairs',
};

// 1. Gecikmə funksiyasını bura əlavə edirik
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// 2. Funksiyanı 'async' edirik
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 3. 3 saniyəlik süni gecikmə (Test üçün)
  await sleep(3000);

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}