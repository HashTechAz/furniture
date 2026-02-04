'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getColorById, updateColor } from '@/lib/colors';
import styles from '../colors.module.css';

export default function EditColorPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', hexCode: '' });
  const [loading, setLoading] = useState(true);

  // 1. Parametri həll edirik (Promise problemi olmasın deyə)
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    const unwrapParams = async () => {
      const p = await params;
      setResolvedParams(p);
    };
    unwrapParams();
  }, [params]);

  // 2. Datanı gətiririk
  useEffect(() => {
    if (!resolvedParams?.id) return;

    const fetchColor = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const data = await getColorById(resolvedParams.id, token || undefined);
        setFormData({ name: data.name, hexCode: data.hexCode });
      } catch (error) {
        console.error('Color not found', error);
        alert('Rəng tapılmadı');
        router.push('/admin/colors');
      } finally {
        setLoading(false);
      }
    };

    fetchColor();
  }, [resolvedParams]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolvedParams?.id) return;

    try {
      const token = localStorage.getItem('accessToken') || '';
      await updateColor(resolvedParams.id, formData, token);
      alert('✅ Rəng yeniləndi!');
      router.push('/admin/colors');
      router.refresh();
    } catch (error: any) {
      alert('Xəta: ' + error.message);
    }
  };

  if (loading) return <div className={styles.container}>Yüklənir...</div>;

  return (
    <div className={styles.container}>
      <Link href="/admin/colors" className={styles.backBtn}>← Geri qayıt</Link>
      <h1 className={styles.title} style={{ marginBottom: '20px' }}>Rəngi Redaktə Et</h1>

      <div className={styles.formCard}>
        <form onSubmit={handleUpdate}>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Rəngin Adı</label>
            <input 
              type="text" 
              className={styles.input} 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Rəng Kodu</label>
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
                pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Yadda Saxla (Update)
          </button>
        </form>
      </div>
    </div>
  );
}