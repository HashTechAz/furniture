'use client';

import React, { useEffect, useState } from 'react';
import styles from './InspirationContent.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { getRooms } from '@/lib/rooms';

const PLACEHOLDER_IMAGE = 'https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/montana_colourps_amber_camomile_rhubarb_flint_oat.jpg?mode=crop&width=1520&height=2027';

const SmallInspirationCard = ({ title, imageUrl, href }: { title: string, imageUrl: string, href: string }) => (
  <Link href={href} className={styles.smallCard}>
    <div className={styles.smallCardImageWrapper} style={{ position: "relative" }}>
      <Image fill src={imageUrl} alt={title ?? ""} />
    </div>
    <span className={styles.smallCardTitle}>{title}</span>
  </Link>
);

const InspirationContent = () => {
  const [rooms, setRooms] = useState<{ id: number; name: string; imageUrl?: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRooms()
      .then((data) => setRooms(Array.isArray(data) ? data : []))
      .catch(() => setRooms([]))
      .finally(() => setLoading(false));
  }, []);

  const baseUrl = typeof process !== 'undefined' ? (process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7042') : 'https://localhost:7042';


  const newsLinks = [
    "KIMPOP Limited Editions",
    "Montana Mini – New colours",
    "Panton Wire – New colours and sizes",
    "Paradigm – The new language of lounge"
  ];

  return (
    <section className={styles.inspirationMain}>
      {/* Sol Menü */}
      <div className={styles.inspirationText}>
        <h5><Link href="/creative-minds">Creative Minds</Link></h5>
        <ul>
          <li><Link href="/creative-minds/faebrik">Faebrik</Link></li>
          <li><Link href="/creative-minds/lumikello">Lumikello</Link></li>
          <li><Link href="/creative-minds/swantje">Swantje Hinrichsen</Link></li>
          <li><Link href="/creative-minds/cathrine">Cathrine De Lichtenberg</Link></li>
          <li><Link href="/creative-minds/tekla">Tekla Evelina Severin</Link></li>
          <li><Link href="/creative-minds/celine">Céline Hallas</Link></li>
          <li><Link href="/creative-minds/sarah">Sarah Gottlieb</Link></li>
        </ul>
        <h5><Link href="/colours">Colour inspiration</Link></h5>
        <ul>
          <li><Link href="/colour-inspiration/colour-class">Color Connaisseur & Montana Furniture</Link></li>
          <li><Link href="/colour-inspiration/colours-of-comfort">Colours of comfort</Link></li>
          <li><Link href="/colours">Colours and surfaces</Link></li>
          <li><Link href="/colour-inspiration/inspiring-styles">Inspiring colour styles</Link></li>
        </ul>
        <h5><Link href="/inspiration/find-more-inspiration">Find more inspiration</Link></h5>
        <ul>
          <li><Link href="/inspiration/catalogues">Explore our catalogues</Link></li>
          <li><Link href="#">Follow us on Instagram</Link></li>
        </ul>
      </div>

      {/* Sağ İçerik Alanı */}
      <div className={styles.contentWrapper}>
        <div className={styles.smallCardsGrid}>
          {loading ? (
            <div style={{ padding: '20px' }}>Loading...</div>
          ) : rooms.length === 0 ? (
            <div style={{ padding: '20px' }}>No inspiration rooms yet.</div>
          ) : (
            rooms.map(room => {
              const imageUrl = room.imageUrl
                ? (room.imageUrl.startsWith('http') ? room.imageUrl : `${baseUrl}${room.imageUrl.startsWith('/') ? '' : '/'}${room.imageUrl}`)
                : PLACEHOLDER_IMAGE;
              return (
                <SmallInspirationCard key={room.id} title={room.name} imageUrl={imageUrl} href={`/product?roomsId=${room.id}`} />
              );
            })
          )}
        </div>

        {/* DEĞİŞİKLİK: Büyük kart yerine artık bu liste var */}
        <div className={styles.newsListWrapper}>
          <h5>News from Montana</h5>
          <ul>
            {newsLinks.map((link, index) => (
              <li key={index}>
                <Link href="#">{link}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default InspirationContent;