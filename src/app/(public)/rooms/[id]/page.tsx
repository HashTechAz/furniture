import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/product?roomsId=${encodeURIComponent(id)}`);
}
