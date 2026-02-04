'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createDesigner } from '@/lib/designers';
import styles from '../designers.module.css';

export default function NewDesignerPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Zəhmət olmasa şəkil seçin!");
      return;
    }
    setLoading(true);

    try {
      const token = localStorage.getItem('accessToken') || '';
      await createDesigner(name, biography, file, token);
      alert('✅ Dizayner yaradıldı!');
      router.push('/admin/designers');
      router.refresh();
    } catch (error: any) {
      alert('Xəta: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/admin/designers" style={{marginBottom: '20px', display: 'inline-block'}}>← Geri</Link>
      <h1 className={styles.title} style={{marginBottom: '20px'}}>Yeni Dizayner</h1>

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
            <label className={styles.label}>Şəkil (Mütləqdir)</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Yaradılır...' : 'Yadda Saxla'}
          </button>
        </form>
      </div>
    </div>
  );
}