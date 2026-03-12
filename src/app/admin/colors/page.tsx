'use client';

import React, { useEffect, useState } from 'react';
import { getCached, setCached } from '@/lib/admin-prefetch-cache';
import AdminTableSkeleton from '../components/AdminTableSkeleton';
import Link from 'next/link';
import { getColors, deleteColor, BackendColor } from '@/lib/colors';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from './colors.module.css';

import { FaPlus, FaEdit, FaTrash, FaPalette } from 'react-icons/fa';

export default function ColorsPage() {
  const cached = getCached<BackendColor[]>('colors');
  const [colors, setColors] = useState<BackendColor[]>(Array.isArray(cached) ? cached : []);
  const [loading, setLoading] = useState(!cached);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { openModal } = useAdminModal();

  const fetchColors = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);
      const data = await getColors();
      const list = Array.isArray(data) ? data : [];
      setColors(list);
      setCached('colors', list);
    } catch (error) {
      console.error('Failed to fetch colors', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColors(!cached);
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
        setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
      }
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedIds(colors.map(c => c.id));
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
      message: `Seçilmiş ${selectedIds.length} rəngi silmək istədiyinizə əminsiniz? Bu geriyə alına bilməz.`,
      confirmText: 'Bəli, Sil',
      cancelText: 'Ləğv et',
      onConfirm: async () => {
        const token = localStorage.getItem('accessToken') || '';
        setLoading(true);
        try {
          const results = await Promise.allSettled(
            selectedIds.map(id => deleteColor(id, token))
          );
          const successIds = results
            .map((r, idx) => r.status === 'fulfilled' ? selectedIds[idx] : null)
            .filter(Boolean) as number[];
          setColors(prev => prev.filter(item => !successIds.includes(item.id)));
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
    <div className={styles.container}>
      
      <div className={styles.header}>
        <h1 className={styles.title}>Colors</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          {selectedIds.length > 0 && (
            <button 
              onClick={handleBulkDelete} 
              className={styles.addButton} 
              style={{ backgroundColor: '#ef4444', color: 'white' }}
            >
              <FaTrash /> Seçilmişləri Sil ({selectedIds.length})
            </button>
          )}
          <Link href="/admin/colors/new" className={styles.addButton}>
            <FaPlus /> New Color
          </Link>
        </div>
      </div>

      {/* Table Card */}
      <div className={styles.tableCard}>
        {loading ? (
          <AdminTableSkeleton rows={8} />
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
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(color.id)}
                      onChange={() => handleSelectOne(color.id)}
                    />
                  </td>
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