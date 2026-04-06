import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Sparro',
  description: 'Learn more about Sparro, our history, and our commitment to premium sustainable design.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
