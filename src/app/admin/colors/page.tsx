'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getColors, deleteColor, BackendColor } from '@/lib/colors';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from './colors.module.css';

import { FaPlus, FaEdit, FaTrash, FaPalette } from 'react-icons/fa';

export default function ColorsPage() {
  const [colors, setColors] = useState<BackendColor[]>([]);
  const [loading, setLoading] = useState(true);
  const { openModal } = useAdminModal();

  const fetchColors = async () => {
    try {
      setLoading(true);
      const data = await getColors();
      setColors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch colors', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColors();
  }, []);

  // DELETE MODAL
  const handleDelete = (id: number) => {
    openModal({
      type: 'warning',
      title: 'Delete Color?',
      message: 'Are you sure you want to delete this color? Products using this color will be affected.',
      confirmText: 'Yes, Delete',
      cancelText: 'Cancel',
      onConfirm: async () => {
        const token = localStorage.getItem('accessToken') || '';
        await deleteColor(id, token);
        setColors(prev => prev.filter(c => c.id !== id));
      }
    });
  };

  return (
    <div className={styles.container}>
      
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Colors</h1>
        <Link href="/admin/colors/new" className={styles.addButton}>
          <FaPlus /> New Color
        </Link>
      </div>

      {/* Table Card */}
      <div className={styles.tableCard}>
        {loading ? (
           <div style={{padding: 50, textAlign: 'center', color: '#666'}}>Loading...</div>
        ) : colors.length === 0 ? (
           <div style={{padding: 60, textAlign: 'center', color: '#666'}}>
             <FaPalette size={40} style={{marginBottom: 10, opacity: 0.3}}/>
             <p>No colors found.</p>
           </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Color Name</th>
                <th>Hex Code</th>
                <th style={{textAlign: 'right'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {colors.map((color) => (
                <tr key={color.id}>
                  <td>
                    <div className={styles.cellContent}>
                      <div 
                        className={styles.colorCircle} 
                        style={{ backgroundColor: color.hexCode }} 
                      />
                      <div className={styles.nameInfo}>
                         <span className={styles.name}>{color.name}</span>
                         <span className={styles.idBadge}>ID: #{color.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={styles.hexBadge}>{color.hexCode}</span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Link href={`/admin/colors/${color.id}`} className={`${styles.actionBtn} ${styles.editBtn}`} title="Edit">
                        <FaEdit />
                      </Link>
                      <button onClick={() => handleDelete(color.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Delete">
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