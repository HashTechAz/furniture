'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createColor } from '@/lib/colors';
import styles from '../colors.module.css';

export default function NewColorPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    hexCode: '#000000' // Default qara
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('accessToken') || '';
      await createColor(formData, token);
      alert('✅ Rəng yaradıldı!');
      router.push('/admin/colors');
      router.refresh();
    } catch (error: any) {
      alert('Xəta: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/admin/colors" className={styles.backBtn}>← Geri qayıt</Link>
      <h1 className={styles.title} style={{ marginBottom: '20px' }}>Yeni Rəng Yarat</h1>

      <div className={styles.formCard}>
        <form onSubmit={handleSubmit}>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Rəngin Adı</label>
            <input 
              type="text" 
              className={styles.input} 
              placeholder="Məs: Qırmızı, Space Grey..." 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Rəng Seçimi (Hex)</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="color" 
                className={styles.colorInput}
                style={{ width: '60px' }}
                value={formData.hexCode}
                onChange={(e) => setFormData({...formData, hexCode: e.target.value})}
              />
              <input 
                type="text" 
                className={styles.input} 
                value={formData.hexCode}
                onChange={(e) => setFormData({...formData, hexCode: e.target.value})}
                placeholder="#000000"
                pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Yaradılır...' : 'Yadda Saxla'}
          </button>
        </form>
      </div>
    </div>
  );
}