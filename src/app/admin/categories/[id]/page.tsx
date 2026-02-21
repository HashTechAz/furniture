'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getCategoryById, updateCategory, deleteCategory, getCategories, Category, uploadCategoryImage, deleteCategoryImage } from '@/lib/categories';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from '../page.module.css';

import { FaSave, FaTags, FaLayerGroup, FaEdit, FaTrash, FaPlus, FaCloudUploadAlt, FaTimes } from 'react-icons/fa';

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { openModal } = useAdminModal();

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState<number>(0);

  // Dropdown Data + Alt kateqoriyalar
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Category[]>([]);

  // Image
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('accessToken') || '';

        const allCats = await getCategories();
        setCategories(Array.isArray(allCats) ? allCats : []);

        if (id) {
          const data = await getCategoryById(id, token);
          if (data) {
            setName(data.name);
            setDescription(data.description || '');
            setParentCategoryId(data.parentCategoryId || 0);
            setImageUrl(data.imageUrl || null);
            const subs = Array.isArray(data.subCategories) && data.subCategories.length > 0
              ? data.subCategories
              : (Array.isArray(allCats) ? allCats.filter((c) => c.parentCategoryId === Number(id)) : []);
            setSubCategories(subs);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setInitialLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('accessToken') || '';

      if (imageFile) {
        await uploadCategoryImage(id, imageFile, token);
        const updated = await getCategoryById(id, token);
        setImageUrl(updated.imageUrl || null);
        setImageFile(null);
        setImagePreview(null);
      }

      const payload = {
        name: name,
        description: description,
        parentCategoryId: parentCategoryId === 0 ? null : parentCategoryId
      };
      await updateCategory(id, payload, token);

      openModal({
        type: 'success',
        title: 'Updated Successfully!',
        message: 'Category details have been saved.',
        confirmText: 'Back to List',
        onConfirm: () => router.push('/admin/categories')
      });
    } catch (error: any) {
      openModal({ type: 'error', title: 'Error', message: error.message || 'Failed to update' });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeNewFile = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImageDelete = () => {
    openModal({
      type: 'warning',
      title: 'Şəkli sil',
      message: 'Bu kateqoriyanın şəklini silmək istədiyinizə əminsiniz?',
      confirmText: 'Bəli, sil',
      cancelText: 'Ləğv et',
      onConfirm: async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem('accessToken') || '';
          await deleteCategoryImage(id, token);
          setImageUrl(null);
        } catch (err: any) {
          openModal({ type: 'error', title: 'Xəta', message: err.message || 'Şəkil silinə bilmədi.' });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleDeleteSub = (subId: number, subName: string) => {
    openModal({
      type: 'warning',
      title: 'Kateqoriyanı sil',
      message: `"${subName}" silinsin? Bu geri alına bilməz.`,
      confirmText: 'Sil',
      cancelText: 'Ləğv et',
      onConfirm: async () => {
        const token = localStorage.getItem('accessToken') || '';
        await deleteCategory(subId, token);
        setSubCategories((prev) => prev.filter((c) => c.id !== subId));
      },
    });
  };

  if (initialLoading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Edit Category</h1>
        <div className={styles.headerActions}>
          <Link href="/admin/categories" className={styles.cancelBtn}>Cancel</Link>
          <button type="submit" className={styles.saveBtn} disabled={loading}>
            <FaSave /> {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className={styles.formGrid}>

        {/* SOL: Məlumatlar */}
        <div className={styles.card}>
          <div className={styles.cardTitle}><FaTags /> Basic Information</div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Name</label>
            <input type="text" className={styles.input} value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea className={styles.textarea} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>

        {/* SAĞ: Təşkilat və Şəkil */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* IMAGE CARD — eyni UI designers/collections ilə */}
          <div className={styles.card}>
            <div className={styles.cardTitle}><FaCloudUploadAlt /> Category Image</div>

            {imagePreview ? (
              <div className={styles.previewWrapper}>
                <img src={imagePreview} alt="New" className={styles.previewImage} />
                <button type="button" onClick={removeNewFile} className={styles.removeImageBtn} title="Cancel"><FaTimes /></button>
              </div>
            ) : (
              <>
                {imageUrl && (
                  <div className={styles.previewWrapper} style={{ marginBottom: 15, borderStyle: 'solid' }}>
                    <img src={imageUrl} alt="Current" className={styles.previewImage} />
                    <span style={{ position: 'absolute', bottom: 5, left: 5, background: '#111', color: '#fff', fontSize: 10, padding: '2px 6px', borderRadius: 4 }}>Current</span>
                    <button type="button" onClick={handleImageDelete} className={styles.removeImageBtn} title="Remove image" style={{ background: 'rgba(239, 68, 68, 0.9)', color: '#fff' }}><FaTrash size={12} /></button>
                  </div>
                )}
                <label className={styles.uploadArea}>
                  <input type="file" accept="image/png,image/jpeg,image/jpg" hidden onChange={handleFileChange} />
                  <div style={{ fontSize: 28, color: '#ccc', marginBottom: 8 }}><FaCloudUploadAlt /></div>
                  <span style={{ fontSize: 13, color: '#666', fontWeight: 500 }}>
                    {imageUrl ? 'Change Image' : 'Upload Image'}
                  </span>
                </label>
              </>
            )}
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}><FaLayerGroup /> Organization</div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Parent Category</label>
              <select
                className={styles.input}
                value={parentCategoryId}
                onChange={(e) => setParentCategoryId(Number(e.target.value))}
              >
                <option value={0}>No Parent (Main Category)</option>
                {categories
                  .filter(cat => cat.id !== Number(id))
                  .map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className={styles.formGroup} style={{ marginTop: 24 }}>
              <label className={styles.label}>Alt kateqoriyalar</label>
              {subCategories.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {subCategories.map((sub) => (
                    <li
                      key={sub.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        background: '#f9fafb',
                        borderRadius: 8,
                        marginBottom: 8,
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>{sub.name}</span>
                      <span style={{ display: 'flex', gap: 8 }}>
                        <Link
                          href={`/admin/categories/${sub.id}`}
                          style={{
                            padding: '6px 10px',
                            background: '#111',
                            color: '#fff',
                            borderRadius: 6,
                            fontSize: 12,
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <FaEdit size={12} /> Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteSub(sub.id, sub.name)}
                          style={{
                            padding: '6px 10px',
                            background: '#dc2626',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 6,
                            fontSize: 12,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <FaTrash size={12} /> Sil
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontSize: 13, color: '#666', marginBottom: 10 }}>Alt kateqoriya yoxdur.</p>
              )}
              <Link
                href={`/admin/categories/new?parentId=${id}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  marginTop: 4,
                  fontSize: 13,
                  color: '#111',
                  fontWeight: 600,
                }}
              >
                <FaPlus size={12} /> Yeni alt kateqoriya
              </Link>
            </div>
          </div>

        </div>
      </div>
    </form>
  );
}