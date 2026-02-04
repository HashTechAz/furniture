'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCollectionById, updateCollection } from '@/lib/collections';
import styles from '../collections.module.css';

export default function EditCollectionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  // ID-ni həll etmək
  const [id, setId] = useState<string>('');
  useEffect(() => {
    Promise.resolve(params).then(p => setId(p.id));
  }, [params]);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken') || undefined;
        const data = await getCollectionById(id, token);
        setName(data.name);
        setDescription(data.description || '');
        setCurrentImage(data.coverImageUrl); 
      } catch (error) {
        console.error(error);
        alert('Kolleksiya tapılmadı və ya icazə yoxdur.');
        router.push('/admin/collections');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('accessToken') || '';
      await updateCollection(id, name, description, file, token);
      alert('✅ Kolleksiya yeniləndi!');
      router.push('/admin/collections');
      router.refresh();
    } catch (error: any) {
      alert('Xəta: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getFullImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7042'}${url}`;
  };

  if (loading) return <div className={styles.container}>Yüklənir...</div>;

  return (
    <div className={styles.container}>
      <Link href="/admin/collections" style={{marginBottom: '20px', display: 'inline-block'}}>← Geri</Link>
      <h1 className={styles.title} style={{marginBottom: '20px'}}>Kolleksiyanı Yenilə</h1>

      <div className={styles.formCard}>
        <form onSubmit={handleSubmit}>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Ad</label>
            <input 
              type="text" 
              className={styles.input} 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Təsvir</label>
            <textarea 
              className={styles.textarea} 
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Mövcud Cover Şəkli</label>
            {currentImage && (
              <img 
                src={getFullImageUrl(currentImage)} 
                alt="Current" 
                style={{width: '150px', height: '100px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px'}} 
              />
            )}
            <br />
            <label className={styles.label}>Yeni Şəkil (Dəyişmək istəyirsinizsə seçin)</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Yenilənir...' : 'Yadda Saxla'}
          </button>
        </form>
      </div>
    </div>
  );
}