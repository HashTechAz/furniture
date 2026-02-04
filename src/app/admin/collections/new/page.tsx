'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createCollection } from '@/lib/collections';
import styles from '../collections.module.css';

export default function NewCollectionPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
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
      await createCollection(name, description, file, token);
      alert('✅ Kolleksiya yaradıldı!');
      router.push('/admin/collections');
      router.refresh();
    } catch (error: any) {
      alert('Xəta: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/admin/collections" style={{marginBottom: '20px', display: 'inline-block'}}>← Geri</Link>
      <h1 className={styles.title} style={{marginBottom: '20px'}}>Yeni Kolleksiya</h1>

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
            <label className={styles.label}>Cover Şəkli (Mütləqdir)</label>
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