'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createTag } from '@/lib/tags';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from '../page.module.css';
import { FaSave } from 'react-icons/fa';

export default function NewTagPage() {
  const router = useRouter();
  const { openModal } = useAdminModal();
  const [tagName, setTagName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('accessToken') || '';
    try {
      await createTag(
        { tagName: tagName.trim() },
        token
      );
      openModal({
        type: 'success',
        title: 'Tag yaradıldı',
        message: 'Yeni tag uğurla əlavə edildi.',
        confirmText: 'Siyahıya keç',
        onConfirm: () => router.push('/admin/tags'),
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Xəta baş verdi';
      openModal({ type: 'error', title: 'Xəta', message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>New Tag</h1>
        <Link href="/admin/tags" className={styles.cancelBtn}>
          Geri
        </Link>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Məlumat</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="tagName">
              Tag adı
            </label>
            <input
              id="tagName"
              type="text"
              required
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              className={styles.input}
              placeholder="Məs: Shelving systems"
            />
          </div>
          <div className={styles.headerActions}>
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              <FaSave /> {loading ? 'Gözləyin...' : 'Yadda saxla'}
            </button>
            <Link href="/admin/tags" className={styles.cancelBtn}>
              Ləğv et
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
