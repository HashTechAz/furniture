'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getRoomById, updateRoom, uploadRoomImage, deleteRoomImage, isAllowedRoomImageFile } from '@/lib/rooms';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from '../page.module.css';
import { FaSave, FaCloudUploadAlt, FaTrash } from 'react-icons/fa';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7042';

export default function EditRoomPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { openModal } = useAdminModal();
  const [formData, setFormData] = useState({ name: '', description: '', imageUrl: '' });
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const refetchRoom = () => {
    if (!id) return;
    const token = localStorage.getItem('accessToken') || '';
    getRoomById(id, token).then((data) => {
      setFormData({ name: data.name, description: data.description || '', imageUrl: data.imageUrl || '' });
    });
  };

  useEffect(() => {
    if (!id) {
      setInitialLoading(false);
      return;
    }
    const token = localStorage.getItem('accessToken') || '';
    getRoomById(id, token)
      .then((data) => {
        setFormData({ name: data.name, description: data.description || '', imageUrl: data.imageUrl || '' });
      })
      .catch((err) => {
        console.error(err);
        openModal({
          type: 'error',
          title: 'Xəta',
          message: 'Otaq məlumatları gətirilə bilmədi.',
        });
      })
      .finally(() => {
        setInitialLoading(false);
      });
  }, [id, openModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('accessToken') || '';
    try {
      await updateRoom(id, { name: formData.name, description: formData.description }, token);
      openModal({
        type: 'success',
        title: 'Yeniləndi',
        message: 'Otaq məlumatları yadda saxlanıldı.',
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

  const getFullImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${BASE_URL}${url}`;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !id) return;
    if (!isAllowedRoomImageFile(file)) {
      openModal({ type: 'error', title: 'Xəta', message: 'Yalnız .jpg, .jpeg, .png formatlı fayllara icazə verilir.' });
      e.target.value = '';
      return;
    }
    setImageLoading(true);
    const token = localStorage.getItem('accessToken') || '';
    try {
      await uploadRoomImage(Number(id), file, token);
      refetchRoom();
      openModal({ type: 'success', title: 'Şəkil yükləndi', message: 'Otaq şəkli uğurla əlavə edildi.' });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Şəkil yüklənə bilmədi';
      openModal({ type: 'error', title: 'Xəta', message });
    } finally {
      setImageLoading(false);
      e.target.value = '';
    }
  };

  const handleDeleteImage = async () => {
    if (!id || !formData.imageUrl) return;
    setImageLoading(true);
    const token = localStorage.getItem('accessToken') || '';
    try {
      await deleteRoomImage(id, token);
      refetchRoom();
      openModal({ type: 'success', title: 'Şəkil silindi', message: 'Otaq şəkli silindi.' });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Şəkil silinə bilmədi';
      openModal({ type: 'error', title: 'Xəta', message });
    } finally {
      setImageLoading(false);
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
        <h1 className={styles.title}>Edit Room</h1>
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
            <h2 className={styles.imageCardTitle}><FaCloudUploadAlt /> Otaq şəkli (PC-dən yüklə)</h2>
            {formData.imageUrl ? (
              <>
                <div className={styles.previewWrapper}>
                  <img src={getFullImageUrl(formData.imageUrl)} alt={formData.name} className={styles.previewImage} />
                  <button
                    type="button"
                    className={styles.removeImageBtn}
                    onClick={handleDeleteImage}
                    disabled={imageLoading}
                    title="Şəkli sil"
                  >
                    <FaTrash />
                  </button>
                </div>
                <p className={styles.label} style={{ marginTop: 0 }}>Cari şəkil. Yenisini yükləmək üçün aşağıdakı sahəyə klik edib fayl seçin (köhnə avtomatik silinəcək).</p>
              </>
            ) : (
              <p className={styles.label} style={{ marginBottom: 12 }}>Otağın şəkli yoxdur. Aşağıya klik edib .jpg, .jpeg və ya .png fayl seçin.</p>
            )}
            <label className={styles.uploadArea} style={{ pointerEvents: imageLoading ? 'none' : undefined }}>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,image/jpeg,image/jpg,image/png"
                hidden
                onChange={handleImageUpload}
              />
              <div style={{ fontSize: 28, color: '#ccc', marginBottom: 8 }}><FaCloudUploadAlt /></div>
              <span style={{ fontSize: 13, color: '#666', fontWeight: 500 }}>
                {imageLoading ? 'Yüklənir...' : formData.imageUrl ? 'Başqa şəkil seç' : 'Şəkil seç (PC-dən)'}
              </span>
            </label>
            {formData.imageUrl && (
              <div className={styles.imageActions} style={{ marginTop: 12 }}>
                <button
                  type="button"
                  className={`${styles.imageBtn} ${styles.imageBtnDanger}`}
                  disabled={imageLoading}
                  onClick={handleDeleteImage}
                >
                  <FaTrash /> Şəkli sil
                </button>
              </div>
            )}
          </div>

          <div className={styles.headerActions}>
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              <FaSave /> {loading ? 'Gözləyin...' : 'Yenilə'}
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
