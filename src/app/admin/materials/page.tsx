'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getMaterials, deleteMaterial, Material } from '@/lib/materials';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from './page.module.css';
import { FaPlus, FaEdit, FaTrash, FaCube } from 'react-icons/fa';

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const { openModal } = useAdminModal();

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getMaterials();
      setMaterials(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
      },
    });
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div style={{ padding: 50, textAlign: 'center', color: '#666' }}>Yüklənir...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Materials</h1>
        <Link href="/admin/materials/new" className={styles.addButton}>
          <FaPlus /> New Material
        </Link>
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
                <th>Material</th>
                <th>Description</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((mat) => (
                <tr key={mat.id}>
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
