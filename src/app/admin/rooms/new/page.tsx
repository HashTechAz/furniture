'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createRoom, uploadRoomImage, isAllowedRoomImageFile } from '@/lib/rooms';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from '../page.module.css';
import { FaSave, FaCloudUploadAlt, FaTimes } from 'react-icons/fa';

export default function NewRoomPage() {
  const router = useRouter();
  const { openModal } = useAdminModal();
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!isAllowedRoomImageFile(file)) {
      openModal({ type: 'error', title: 'Xəta', message: 'Yalnız .jpg, .jpeg, .png formatlı fayllara icazə verilir.' });
      e.target.value = '';
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    e.target.value = '';
  };

  const removeFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('accessToken') || '';
    try {
      const room = await createRoom({ name: formData.name, description: formData.description }, token);
      if (selectedFile && room?.id) {
        await uploadRoomImage(room.id, selectedFile, token);
      }
      openModal({
        type: 'success',
        title: 'Otaq yaradıldı',
        message: 'Otaq və şəkil (varsa) uğurla yadda saxlanıldı.',
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
        <h1 className={styles.title}>Yeni otaq</h1>
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

          <div className={styles.imageCard}>
            <h2 className={styles.imageCardTitle}><FaCloudUploadAlt /> Şəkil (PC-dən)</h2>
            <p className={styles.label} style={{ marginBottom: 12, color: '#666', fontWeight: 400 }}>
              .jpg, .jpeg və ya .png seçin. İstəyə bağlıdır.
            </p>
            {previewUrl ? (
              <div className={styles.previewWrapper}>
                <img src={previewUrl} alt="Önizləmə" className={styles.previewImage} />
                <button type="button" onClick={removeFile} className={styles.removeImageBtn} title="Şəkli sil">
                  <FaTimes />
                </button>
              </div>
            ) : (
              <label className={styles.uploadArea}>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,image/jpeg,image/jpg,image/png"
                  hidden
                  onChange={handleFileChange}
                />
                <div style={{ fontSize: 28, color: '#ccc', marginBottom: 8 }}><FaCloudUploadAlt /></div>
                <span style={{ fontSize: 13, color: '#666', fontWeight: 500 }}>Şəkil seç</span>
              </label>
            )}
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
