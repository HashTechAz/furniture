'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getCategoryById, updateCategory, deleteCategory, getCategories, Category } from '@/lib/categories';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from '../page.module.css';

import { FaSave, FaTags, FaLayerGroup, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

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

  // SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('accessToken') || '';
      
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

  if (initialLoading) return <div style={{padding: 40, textAlign: 'center'}}>Loading...</div>;

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

        {/* SAĞ: Parent Category */}
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
    </form>
  );
}