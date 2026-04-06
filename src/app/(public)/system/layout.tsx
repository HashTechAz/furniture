import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'System | Sparro',
  description: 'Explore the modular systems and flexible design configurations by Sparro.',
};

export default function SystemLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
