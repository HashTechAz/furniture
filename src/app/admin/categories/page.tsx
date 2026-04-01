'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCategories, deleteCategory, Category } from '@/lib/categories';
import { getCached, setCached } from '@/lib/admin-prefetch-cache';
import AdminTableSkeleton from '../components/AdminTableSkeleton';
import { AdminCheckbox } from '../components/AdminCheckbox';
import { useAdminModal } from '@/context/admin-modal-context';
import shared from '../components/admin-shared.module.css';
import styles from './page.module.css';
import { FaPlus, FaEdit, FaTrash, FaTags, FaBoxOpen } from 'react-icons/fa';

export default function AdminCategories() {
  const cached = getCached<Category[]>('categories');
  const [categories, setCategories] = useState<Category[]>(Array.isArray(cached) ? cached : []);
  const [loading, setLoading] = useState(!cached);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { openModal } = useAdminModal();

  const fetchCategories = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);
      const data = await getCategories();
      const list = Array.isArray(data) ? data : [];
      setCategories(list);
      setCached('categories', list);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(!cached);
  }, []);

  // DELETE MODAL
  const handleDelete = (id: number) => {
    openModal({
      type: 'warning',
      title: 'Delete Category?',
      message: 'Are you sure you want to delete this category? This action cannot be undone.',
      confirmText: 'Yes, Delete',
      cancelText: 'Cancel',
      onConfirm: async () => {
        const token = localStorage.getItem('accessToken') || '';
        await deleteCategory(id, token);
        setCategories(prev => prev.filter(c => c.id !== id));
        setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
      }
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedIds(categories.map(c => c.id));
    else setSelectedIds([]);
  };

  const handleSelectOne = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    openModal({
      type: 'warning',
      title: 'Toplu Silinmə',
      message: `Seçilmiş ${selectedIds.length} kateqoriyanı silmək istədiyinizə əminsiniz? Bu geriyə alına bilməz.`,
      confirmText: 'Bəli, Sil',
      cancelText: 'Ləğv et',
      onConfirm: async () => {
        const token = localStorage.getItem('accessToken') || '';
        setLoading(true);
        try {
          const results = await Promise.allSettled(
            selectedIds.map(id => deleteCategory(id, token))
          );
          const successIds = results
            .map((r, idx) => r.status === 'fulfilled' ? selectedIds[idx] : null)
            .filter(Boolean) as number[];
          setCategories(prev => prev.filter(item => !successIds.includes(item.id)));
          setSelectedIds([]);
        } catch (error) {
          console.error("Toplu silinmə xətası", error);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <div className={shared.container}>
      <div className={shared.header}>
        <h1 className={shared.title}>Categories</h1>
        <div className={shared.headerActions}>
          {selectedIds.length > 0 && (
            <button onClick={handleBulkDelete} className={`${shared.addButton} ${shared.bulkDeleteBtn}`}>
              <FaTrash /> Seçilmişləri Sil ({selectedIds.length})
            </button>
          )}
          <Link href="/admin/categories/new" className={shared.addButton}>
            <FaPlus /> Add Category
          </Link>
        </div>
      </div>

      <div className={shared.tableCard}>
        {loading ? (
          <AdminTableSkeleton rows={8} />
        ) : categories.length === 0 ? (
          <div className={shared.emptyState}>
            <FaBoxOpen size={48} className={shared.emptyStateIcon} />
            <p>No categories found.</p>
          </div>
        ) : (
          <table className={shared.table}>
            <thead>
              <tr>
                <th>
                  <AdminCheckbox
                    checked={categories.length > 0 && selectedIds.length === categories.length}
                    onChange={handleSelectAll}
                    indeterminate={selectedIds.length > 0 && selectedIds.length < categories.length}
                    aria-label="Hamısını seç"
                  />
                </th>
                <th>Category</th>
                <th>Description</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className={selectedIds.includes(cat.id) ? shared.selected : ''}>
                  <td>
                    <AdminCheckbox
                      checked={selectedIds.includes(cat.id)}
                      onChange={() => handleSelectOne(cat.id)}
                      aria-label={`Kateqoriya ${cat.name} seç`}
                    />
                  </td>
                  <td>
                    <div className={styles.cellContent}>
                      <div className={styles.imageWrapper}>
                        {cat.imageUrl ? (
                          <Image src={cat.imageUrl} alt={cat.name} width={48} height={48} className={styles.image} loading="lazy" />
                        ) : (
                          <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc'}}>
                            <FaTags />
                          </div>
                        )}
                      </div>
                      <div className={styles.nameInfo}>
                         <span className={styles.name}>{cat.name}</span>
                         <span className={styles.idBadge}>ID: #{cat.id}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{color: '#666', maxWidth: 300}}>
                    {cat.description || '—'}
                  </td>
                  <td>
                    <div className={shared.actions}>
                      <Link href={`/admin/categories/${cat.id}`} className={`${shared.actionBtn} ${shared.editBtn}`} title="Edit">
                        <FaEdit />
                      </Link>
                      <button onClick={() => handleDelete(cat.id)} className={`${shared.actionBtn} ${shared.deleteBtn}`} title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}