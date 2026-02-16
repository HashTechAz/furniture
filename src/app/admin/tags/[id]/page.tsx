'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getTagById, updateTag } from '@/lib/tags';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from '../page.module.css';
import { FaSave } from 'react-icons/fa';

export default function EditTagPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { openModal } = useAdminModal();
  const [tagName, setTagName] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setInitialLoading(false);
      return;
    }
    const token = localStorage.getItem('accessToken') || '';
    getTagById(id, token)
      .then((data) => {
        setTagName(data.tagName);
      })
      .catch((err) => {
        console.error(err);
        openModal({
          type: 'error',
          title: 'Xəta',
          message: 'Tag məlumatları gətirilə bilmədi.',
        });
      })
      .finally(() => setInitialLoading(false));
  }, [id, openModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('accessToken') || '';
    try {
      await updateTag(
        id,
        { tagName: tagName.trim() },
        token
      );
      openModal({
        type: 'success',
        title: 'Yeniləndi',
        message: 'Tag məlumatları yadda saxlanıldı.',
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

  if (initialLoading) {
    return (
      <div className={styles.container}>
        <div style={{ padding: 50, textAlign: 'center', color: '#666' }}>Yüklənir...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Edit Tag</h1>
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
            />
          </div>
          <div className={styles.headerActions}>
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              <FaSave /> {loading ? 'Gözləyin...' : 'Yenilə'}
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
