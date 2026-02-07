'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getCategoryById, updateCategory, getCategories, Category } from '@/lib/categories';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from '../page.module.css';

import { FaSave, FaTags, FaLayerGroup } from 'react-icons/fa';

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

  // Dropdown Data
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('accessToken') || '';

        // 1. Bütün kateqoriyaları gətir (Dropdown üçün)
        const allCats = await getCategories();
        setCategories(Array.isArray(allCats) ? allCats : []);

        // 2. Cari kateqoriyanı gətir
        if (id) {
          const data = await getCategoryById(id, token);
          if (data) {
            setName(data.name);
            setDescription(data.description || '');
            setParentCategoryId(data.parentCategoryId || 0);
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
                .filter(cat => cat.id !== Number(id)) // Özünü parent kimi seçə bilməsin
                .map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
              ))}
            </select>
          </div>
        </div>

      </div>
    </form>
  );
}