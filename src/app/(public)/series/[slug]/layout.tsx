import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = slug.charAt(0).toUpperCase() + slug.slice(1);
  return {
    title: `${name} Series | Sparro`,
    description: `Explore the ${name} series connecting functional design and aesthetics at Sparro.`
  };
}
// Əgər gələcəkdə generateMetadata lazım olsa, bunu Server Component `layout.tsx` içinə qoya bilərik.

export default function SeriesSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
