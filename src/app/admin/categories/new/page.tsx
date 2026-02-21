'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createCategory, getCategories, Category, uploadCategoryImage } from '@/lib/categories';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from '../page.module.css';

import { FaSave, FaTags, FaLayerGroup, FaImage, FaUpload } from 'react-icons/fa';

export default function NewCategoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const parentIdFromUrl = searchParams.get('parentId');
  const { openModal } = useAdminModal();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState<number>(0);

  // Image
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCats() {
      try {
        const data = await getCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    }
    fetchCats();
  }, []);

  useEffect(() => {
    if (parentIdFromUrl && categories.length > 0) {
      const pid = Number(parentIdFromUrl);
      if (pid && categories.some((c) => c.id === pid)) setParentCategoryId(pid);
    }
  }, [parentIdFromUrl, categories]);

  // SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      openModal({ type: 'error', title: 'Error', message: 'Category Name is required!' });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken') || '';

      const payload = {
        name: name,
        description: description,
        // Əgər 0 seçilibsə null göndər, əks halda ID-ni göndər
        parentCategoryId: parentCategoryId === 0 ? null : parentCategoryId
      };

      const response = await createCategory(payload, token) as { id: number };
      const newCategoryId = response.id; // API creates category and returns it

      // Upload image if selected
      if (imageFile) {
        try {
          await uploadCategoryImage(newCategoryId, imageFile, token);
        } catch (imgError: any) {
          console.error("Image upload failed:", imgError);
          openModal({ type: 'warning', title: 'Kateqoriya Yaradıldı, Şəkil Yüklənmədi', message: 'Kateqoriya uğurla yaradıldı, lakin şəkli yükləmək mümkün olmadı. Zəhmət olmasa kateqoriyanı redaktə edərək şəkli yenidən yükləməyə cəhd edin.', onConfirm: () => router.push('/admin/categories') });
          return;
        }
      }

      openModal({
        type: 'success',
        title: 'Category Created!',
        message: 'New category has been added successfully.',
        confirmText: 'Go to Categories',
        onConfirm: () => router.push('/admin/categories')
      });

    } catch (error: any) {
      console.error(error);
      openModal({ type: 'error', title: 'Failed', message: error.message || 'Could not create category' });
    } finally {
      setLoading(false);
    }
  };

  // IMAGE HANDLER
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>New Category</h1>
        <div className={styles.headerActions}>
          <Link href="/admin/categories" className={styles.cancelBtn}>Cancel</Link>
          <button type="submit" className={styles.saveBtn} disabled={loading}>
            <FaSave /> {loading ? 'Saving...' : 'Save Category'}
          </button>
        </div>
      </div>

      <div className={styles.formGrid}>

        {/* SOL: Əsas Məlumatlar */}
        <div className={styles.card}>
          <div className={styles.cardTitle}><FaTags /> Basic Information</div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Category Name</label>
            <input
              type="text" className={styles.input}
              value={name} onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Living Room" required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              className={styles.textarea}
              value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description..."
            />
          </div>
        </div>

        {/* SAĞ: Təşkilat və Şəkil */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* IMAGE GARD */}
          <div className={styles.card}>
            <div className={styles.cardTitle}><FaImage /> Category Image</div>

            <div style={{ marginBottom: 15, textAlign: 'center' }}>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: '100%', maxWidth: 200, height: 'auto', borderRadius: 8, border: '1px solid #eee' }}
                />
              ) : (
                <div style={{ width: '100%', height: 150, background: '#f5f5f5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                  <FaImage size={40} opacity={0.3} />
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleImageChange}
              style={{ width: '100%', fontSize: 13 }}
            />
            <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
              Şəkil kateqoriya yaradılarkən yüklənəcək.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}><FaLayerGroup /> Organization</div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Parent Category</label>
              <select
                className={styles.input} // input stili ilə eyni olsun
                value={parentCategoryId}
                onChange={(e) => setParentCategoryId(Number(e.target.value))}
              >
                <option value={0}>No Parent (Main Category)</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
                Select "No Parent" if this is a main category.
              </p>
            </div>
          </div>

        </div>
      </div>
    </form>
  );
}