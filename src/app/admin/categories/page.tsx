'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCategories, deleteCategory, Category } from '@/lib/categories';
import { useAdminModal } from '@/context/admin-modal-context'; 
import styles from './page.module.css'; 
import { FaPlus, FaEdit, FaTrash, FaTags, FaBoxOpen } from 'react-icons/fa';

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { openModal } = useAdminModal();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
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
      }
    });
  };

  return (
    <div className={styles.container}>
      
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Categories</h1>
        <Link href="/admin/categories/new" className={styles.addButton}>
          <FaPlus /> Add Category
        </Link>
      </div>

      {/* Table Card */}
      <div className={styles.tableCard}>
        {loading ? (
           <div style={{padding: 50, textAlign: 'center', color: '#666'}}>Loading...</div>
        ) : categories.length === 0 ? (
           <div style={{padding: 60, textAlign: 'center', color: '#666'}}>
             <FaBoxOpen size={40} style={{marginBottom: 10, opacity: 0.3}}/>
             <p>No categories found.</p>
           </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Category</th>
                <th>Description</th>
                <th style={{textAlign: 'right'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td>
                    <div className={styles.cellContent}>
                      <div className={styles.imageWrapper}>
                        {cat.imageUrl ? (
                          <img src={cat.imageUrl} alt={cat.name} className={styles.image} />
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
                    <div className={styles.actions}>
                      <Link href={`/admin/categories/${cat.id}`} className={`${styles.actionBtn} ${styles.editBtn}`} title="Edit">
                        <FaEdit />
                      </Link>
                      <button onClick={() => handleDelete(cat.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Delete">
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