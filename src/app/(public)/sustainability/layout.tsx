import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sustainability | Sparro',
  description: 'Discover Sparro\'s sustainability efforts and our commitment to eco-friendly production.',
};

export default function SustainabilityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
