import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Sparro',
  description: 'Get in touch with Sparro. We are here to help with your inquiries about our premium furniture.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
