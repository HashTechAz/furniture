'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getDesigners, deleteDesigner, BackendDesigner } from '@/lib/designers';
import styles from './designers.module.css';

export default function DesignersPage() {
  const [designers, setDesigners] = useState<BackendDesigner[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDesigners = async () => {
    try {
      const data = await getDesigners();
      setDesigners(data);
    } catch (error) {
      console.error('Failed to fetch designers', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesigners();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bu dizayneri silmək istədiyinizə əminsiniz?')) return;

    try {
      const token = localStorage.getItem('accessToken') || '';
      await deleteDesigner(id, token);
      setDesigners(prev => prev.filter(d => d.id !== id));
      alert('Silindi!');
    } catch (error: any) {
      alert('Xəta: ' + error.message);
    }
  };

  // Şəkil URL-ni düzəltmək üçün (Backend tam URL vermirsə)
  const getImageUrl = (url: string) => {
    if (!url) return '/placeholder.png';
    if (url.startsWith('http')) return url;
    return `${process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7042'}${url}`;
  };

  if (loading) return <div className={styles.container}>Yüklənir...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dizaynerlər ({designers.length})</h1>
        <Link href="/admin/designers/new" className={styles.addButton}>
          + Yeni Dizayner
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Şəkil</th>
            <th>Ad Soyad</th>
            <th>Haqqında</th>
            <th>Əməliyyatlar</th>
          </tr>
        </thead>
        <tbody>
          {designers.map((designer) => (
            <tr key={designer.id}>
              <td>{designer.id}</td>
              <td>
                <img 
                  src={getImageUrl(designer.imageUrl)} 
                  alt={designer.name} 
                  className={styles.designerImage}
                />
              </td>
              <td>{designer.name}</td>
              <td>{designer.biography?.substring(0, 50)}...</td>
              <td>
                <div className={styles.actions}>
                  <Link href={`/admin/designers/${designer.id}`} className={styles.editBtn}>
                    Redaktə
                  </Link>
                  <button onClick={() => handleDelete(designer.id)} className={styles.deleteBtn}>
                    Sil
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {designers.length === 0 && (
            <tr>
              <td colSpan={5} style={{textAlign: 'center', color: '#888'}}>Məlumat yoxdur.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}