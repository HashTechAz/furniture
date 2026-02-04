'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getDesignerById, updateDesigner } from '@/lib/designers';
import styles from '../designers.module.css';

export default function EditDesignerPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');
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
        // DÜZƏLİŞ: Tokeni alıb funksiyaya göndəririk
        const token = localStorage.getItem('accessToken') || undefined;
        const data = await getDesignerById(id, token);
        
        setName(data.name);
        setBiography(data.biography || '');
        setCurrentImage(data.imageUrl);
      } catch (error) {
        console.error("Dizayner tapılmadı:", error); // Konsolda xətanı görmək üçün
        alert('Dizayner tapılmadı və ya icazəniz yoxdur.');
        router.push('/admin/designers');
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
      // File null ola bilər (əgər dəyişmirsə)
      await updateDesigner(id, name, biography, file, token);
      alert('✅ Dizayner yeniləndi!');
      router.push('/admin/designers');
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
      <Link href="/admin/designers" style={{marginBottom: '20px', display: 'inline-block'}}>← Geri</Link>
      <h1 className={styles.title} style={{marginBottom: '20px'}}>Dizayneri Yenilə</h1>

      <div className={styles.formCard}>
        <form onSubmit={handleSubmit}>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Ad Soyad</label>
            <input 
              type="text" 
              className={styles.input} 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Haqqında (Bio)</label>
            <textarea 
              className={styles.textarea} 
              rows={4}
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Mövcud Şəkil</label>
            {currentImage && (
              <img 
                src={getFullImageUrl(currentImage)} 
                alt="Current" 
                style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px'}} 
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