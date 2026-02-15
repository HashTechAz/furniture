'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createRoom } from '@/lib/rooms';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from '../page.module.css';
import { FaSave } from 'react-icons/fa';

export default function NewRoomPage() {
  const router = useRouter();
  const { openModal } = useAdminModal();
  const [formData, setFormData] = useState({ name: '', description: '', imageUrl: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('accessToken') || '';
    try {
      await createRoom({ name: formData.name, description: formData.description, imageUrl: formData.imageUrl || undefined }, token);
      openModal({
        type: 'success',
        title: 'Otaq yaradıldı',
        message: 'Yeni otaq uğurla əlavə edildi.',
        confirmText: 'Siyahıya keç',
        onConfirm: () => router.push('/admin/rooms'),
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Xəta baş verdi';
      openModal({
        type: 'error',
        title: 'Xəta',
        message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>New Room</h1>
        <Link href="/admin/rooms" className={styles.cancelBtn}>
          Geri
        </Link>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Məlumat</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">
              Ad
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="description">
              Təsvir
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={styles.textarea}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="imageUrl">
              Şəkil URL (Series menyuda göstəriləcək)
            </label>
            <input
              id="imageUrl"
              type="url"
              placeholder="https://..."
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className={styles.input}
            />
          </div>
          <div className={styles.headerActions}>
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              <FaSave /> {loading ? 'Gözləyin...' : 'Yadda saxla'}
            </button>
            <Link href="/admin/rooms" className={styles.cancelBtn}>
              Ləğv et
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
