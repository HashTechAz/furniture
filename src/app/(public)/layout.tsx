import type { Metadata } from 'next';


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
    <>{children}</>
  );
}