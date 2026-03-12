'use client';

import React, { useEffect, useState } from 'react';
import AdminTableSkeleton from '../components/AdminTableSkeleton';
import Link from 'next/link';
import { getMaterials, deleteMaterial, Material } from '@/lib/materials';
import { getCached, setCached } from '@/lib/admin-prefetch-cache';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from './page.module.css';
import { FaPlus, FaEdit, FaTrash, FaCube } from 'react-icons/fa';

export default function MaterialsPage() {
  const cached = getCached<Material[]>('materials');
  const [materials, setMaterials] = useState<Material[]>(Array.isArray(cached) ? cached : []);
  const [loading, setLoading] = useState(!cached);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { openModal } = useAdminModal();

  const fetchData = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);
      const data = await getMaterials();
      const list = Array.isArray(data) ? data : [];
      setMaterials(list);
      setCached('materials', list);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(!cached);
  }, []);

  const handleDelete = (id: number) => {
    openModal({
      type: 'warning',
      title: 'Materialı silmək?',
      message: 'Bu materialı silmək istədiyinizə əminsiniz? Bu əməliyyat geri alına bilməz.',
      confirmText: 'Bəli, sil',
      cancelText: 'Ləğv et',
      onConfirm: async () => {
        const token = localStorage.getItem('accessToken') || '';
        await deleteMaterial(id, token);
        setMaterials((prev) => prev.filter((m) => m.id !== id));
        setSelectedIds((prev) => prev.filter(selectedId => selectedId !== id));
      },
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedIds(materials.map(m => m.id));
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
      message: `Seçilmiş ${selectedIds.length} materialı silmək istədiyinizə əminsiniz? Bu geriyə alına bilməz.`,
      confirmText: 'Bəli, Sil',
      cancelText: 'Ləğv et',
      onConfirm: async () => {
        const token = localStorage.getItem('accessToken') || '';
        setLoading(true);
        try {
          const results = await Promise.allSettled(
            selectedIds.map(id => deleteMaterial(id, token))
          );
          const successIds = results
            .map((r, idx) => r.status === 'fulfilled' ? selectedIds[idx] : null)
            .filter(Boolean) as number[];
          setMaterials(prev => prev.filter(item => !successIds.includes(item.id)));
          setSelectedIds([]);
        } catch (error) {
          console.error("Toplu silinmə xətası", error);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Materials</h1>
          <Link href="/admin/materials/new" className={styles.addButton}>
            <FaPlus /> New Material
          </Link>
        </div>
        <div className={styles.tableCard}>
          <AdminTableSkeleton rows={8} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Materials</h1>
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
          <Link href="/admin/materials/new" className={styles.addButton}>
            <FaPlus /> New Material
          </Link>
        </div>
      </div>

      <div className={styles.tableCard}>
        {materials.length === 0 ? (
          <div style={{ padding: 60, textAlign: 'center', color: '#666' }}>
            <FaCube size={40} style={{ marginBottom: 10, opacity: 0.3 }} />
            <p>Heç bir material tapılmadı.</p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: 40 }}>
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll} 
                    checked={materials.length > 0 && selectedIds.length === materials.length}
                  />
                </th>
                <th>Material</th>
                <th>Description</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((mat) => (
                <tr key={mat.id}>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(mat.id)}
                      onChange={() => handleSelectOne(mat.id)}
                    />
                  </td>
                  <td>
                    <div className={styles.cellContent}>
                      <div className={styles.nameInfo}>
                        <span className={styles.name}>{mat.name}</span>
                        <span className={styles.idBadge}>ID: #{mat.id}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: '#666', maxWidth: 300 }}>
                    {mat.description
                      ? mat.description.length > 60
                        ? mat.description.substring(0, 60) + '...'
                        : mat.description
                      : '—'}
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Link
                        href={`/admin/materials/${mat.id}`}
                        className={`${styles.actionBtn} ${styles.editBtn}`}
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(mat.id)}
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                        title="Delete"
                      >
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
