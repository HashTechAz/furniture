'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './SeriesContent.module.css';
import NavbarCategoryCard from '../NavbarMenuCards/NavbarCategoryCard';
import { getCollections } from '@/lib/collections';

const PLACEHOLDER_IMAGE = 'https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/montana_colourps_amber_camomile_rhubarb_flint_oat.jpg?mode=crop&width=1520&height=2027';

const SeriesContent = () => {
  const [collections, setCollections] = useState<{ id: number; name: string; coverImageUrl?: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCollections()
      .then((data) => setCollections(Array.isArray(data) ? data : []))
      .catch(() => setCollections([]))
      .finally(() => setLoading(false));
  }, []);

  const baseUrl = typeof process !== 'undefined' ? (process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7042') : 'https://localhost:7042';

  return (
    <>
      <section className={styles.seriesCategoryMain}>
        <div className={styles.seriesCategoryText}>
          <h5><Link href="/series/learn-more-about">Learn more about</Link></h5>
          <ul>
            <li>
              <Link href="/series/guarantees">Guarantees</Link>
            </li>
            <li>
              <Link href="/series/assembly">Assembly guides</Link>
            </li>
            <li>
              <Link href="/series/materials-and-care">Materials and care</Link>
            </li>
            <li>
              <Link href="/series/showrooms">Retailers and showrooms</Link>
            </li>
          </ul>
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.gridContainer}>
            {loading ? (
              <div className={styles.loadingState}>Loading...</div>
            ) : collections.length === 0 ? (
              <div className={styles.loadingState}>No collections yet.</div>
            ) : (
              collections.map((collection) => {
                const imageUrl = collection.coverImageUrl
                  ? (collection.coverImageUrl.startsWith('http') ? collection.coverImageUrl : `${baseUrl}${collection.coverImageUrl.startsWith('/') ? '' : '/'}${collection.coverImageUrl}`)
                  : PLACEHOLDER_IMAGE;
                return (
                  <NavbarCategoryCard
                    key={collection.id}
                    href={`/product?collectionId=${collection.id}`}
                    label={collection.name}
                    imageUrl={imageUrl}
                  />
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SeriesContent;
