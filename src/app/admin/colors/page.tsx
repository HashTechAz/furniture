'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getColors, deleteColor, BackendColor } from '@/lib/colors';
import styles from './colors.module.css';

export default function ColorsPage() {
  const [colors, setColors] = useState<BackendColor[]>([]);
  const [loading, setLoading] = useState(true);

  // Məlumatları gətir
  const fetchColors = async () => {
    try {
      const data = await getColors();
      setColors(data);
    } catch (error) {
      console.error('Failed to fetch colors', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColors();
  }, []);

  // Silmə funksiyası
  const handleDelete = async (id: number) => {
    if (!window.confirm('Bu rəngi silməyə əminsiniz?')) return;

    try {
      const token = localStorage.getItem('accessToken') || '';
      await deleteColor(id, token);
      // Siyahıdan dərhal silirik (UI üçün)
      setColors(prev => prev.filter(c => c.id !== id));
      alert('Rəng silindi!');
    } catch (error: any) {
      alert('Xəta: ' + error.message);
    }
  };

  if (loading) return <div className={styles.container}>Yüklənir...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Rənglər ({colors.length})</h1>
        <Link href="/admin/colors/new" className={styles.addButton}>
          + Yeni Rəng
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Rəng</th>
            <th>Ad</th>
            <th>Hex Kod</th>
            <th>Əməliyyatlar</th>
          </tr>
        </thead>
        <tbody>
          {colors.map((color) => (
            <tr key={color.id}>
              <td>{color.id}</td>
              <td>
                <div 
                  className={styles.colorBox} 
                  style={{ backgroundColor: color.hexCode }} 
                />
              </td>
              <td>{color.name}</td>
              <td>{color.hexCode}</td>
              <td>
                <div className={styles.actions}>
                  <Link href={`/admin/colors/${color.id}`} className={styles.editBtn}>
                    Redaktə
                  </Link>
                  <button 
                    onClick={() => handleDelete(color.id)} 
                    className={styles.deleteBtn}
                  >
                    Sil
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {colors.length === 0 && (
            <tr>
              <td colSpan={5} style={{textAlign: 'center', color: '#888'}}>
                Heç bir rəng tapılmadı.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}