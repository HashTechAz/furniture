'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCollections, deleteCollection, BackendCollection } from '@/lib/collections';
import styles from './collections.module.css';

export default function CollectionsPage() {
  const [collections, setCollections] = useState<BackendCollection[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCollections = async () => {
    try {
      const data = await getCollections();
      setCollections(data);
    } catch (error) {
      console.error('Failed to fetch collections', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bu kolleksiyanı silmək istədiyinizə əminsiniz?')) return;

    try {
      const token = localStorage.getItem('accessToken') || '';
      await deleteCollection(id, token);
      setCollections(prev => prev.filter(c => c.id !== id));
      alert('Silindi!');
    } catch (error: any) {
      alert('Xəta: ' + error.message);
    }
  };

  const getImageUrl = (url: string) => {
    if (!url) return '/placeholder.png';
    if (url.startsWith('http')) return url;
    return `${process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7042'}${url}`;
  };

  if (loading) return <div className={styles.container}>Yüklənir...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Kolleksiyalar ({collections.length})</h1>
        <Link href="/admin/collections/new" className={styles.addButton}>
          + Yeni Kolleksiya
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Kover Şəkli</th>
            <th>Ad</th>
            <th>Təsvir</th>
            <th>Əməliyyatlar</th>
          </tr>
        </thead>
        <tbody>
          {collections.map((col) => (
            <tr key={col.id}>
              <td>{col.id}</td>
              <td>
                <img 
                  src={getImageUrl(col.coverImageUrl)} 
                  alt={col.name} 
                  className={styles.collectionImage}
                />
              </td>
              <td>{col.name}</td>
              <td>{col.description?.substring(0, 50)}...</td>
              <td>
                <div className={styles.actions}>
                  <Link href={`/admin/collections/${col.id}`} className={styles.editBtn}>
                    Redaktə
                  </Link>
                  <button onClick={() => handleDelete(col.id)} className={styles.deleteBtn}>
                    Sil
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {collections.length === 0 && (
            <tr>
              <td colSpan={5} style={{textAlign: 'center', color: '#888'}}>Məlumat yoxdur.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}