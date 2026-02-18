import React from 'react';
import Link from 'next/link';
import { getRoomById, getRooms } from '@/lib/rooms';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  try {
    const rooms = await getRooms();
    return (rooms || []).map((r) => ({ id: String(r.id) }));
  } catch {
    return [];
  }
}

export default async function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let room;
  try {
    room = await getRoomById(id);
  } catch {
    notFound();
  }
  if (!room) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7042';
  const imageUrl = room.imageUrl
    ? room.imageUrl.startsWith('http')
      ? room.imageUrl
      : `${baseUrl}${room.imageUrl.startsWith('/') ? '' : '/'}${room.imageUrl}`
    : null;

  return (
    <main className={styles.container}>
      <nav className={styles.breadcrumb}>
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/product">Products</Link>
        <span>/</span>
        <span>{room.name}</span>
      </nav>
      <section className={styles.hero}>
        {imageUrl && (
          <div className={styles.imageWrap}>
            <img src={imageUrl} alt={room.name} className={styles.image} />
          </div>
        )}
        <div className={styles.content}>
          <h1 className={styles.title}>{room.name}</h1>
          {room.description && <p className={styles.description}>{room.description}</p>}
          <Link href="/product" className={styles.cta}>
            View products
          </Link>
        </div>
      </section>
    </main>
  );
}
