'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getMaterialById, updateMaterial } from '@/lib/materials';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from '../page.module.css';
import { FaSave } from 'react-icons/fa';

export default function EditMaterialPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { openModal } = useAdminModal();
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setInitialLoading(false);
      return;
    }
    const token = localStorage.getItem('accessToken') || '';
    getMaterialById(id, token)
      .then((data) => {
        setFormData({ name: data.name, description: data.description || '' });
      })
      .catch((err) => {
        console.error(err);
        openModal({
          type: 'error',
          title: 'Xəta',
          message: 'Material məlumatları gətirilə bilmədi.',
        });
      })
      .finally(() => setInitialLoading(false));
  }, [id, openModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('accessToken') || '';
    try {
      await updateMaterial(
        id,
        { name: formData.name, description: formData.description },
        token
      );
      openModal({
        type: 'success',
        title: 'Yeniləndi',
        message: 'Material məlumatları yadda saxlanıldı.',
        confirmText: 'Siyahıya keç',
        onConfirm: () => router.push('/admin/materials'),
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
        <h1 className={styles.title}>Edit Material</h1>
        <Link href="/admin/materials" className={styles.cancelBtn}>
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
          <div className={styles.headerActions}>
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              <FaSave /> {loading ? 'Gözləyin...' : 'Yenilə'}
            </button>
            <Link href="/admin/materials" className={styles.cancelBtn}>
              Ləğv et
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
