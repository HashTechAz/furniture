'use client';

import React, { useEffect, useState } from 'react';
import AdminTableSkeleton from '../components/AdminTableSkeleton';
import { AdminCheckbox } from '../components/AdminCheckbox';
import Link from 'next/link';
import { getMaterials, deleteMaterial, Material } from '@/lib/materials';
import { getCached, setCached } from '@/lib/admin-prefetch-cache';
import { useAdminModal } from '@/context/admin-modal-context';
import shared from '../components/admin-shared.module.css';
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
      <div className={shared.container}>
        <div className={shared.header}>
          <h1 className={shared.title}>Materials</h1>
          <Link href="/admin/materials/new" className={shared.addButton}>
            <FaPlus /> New Material
          </Link>
        </div>
        <div className={shared.tableCard}>
          <AdminTableSkeleton rows={8} />
        </div>
      </div>
    );
  }

  return (
    <div className={shared.container}>
      <div className={shared.header}>
        <h1 className={shared.title}>Materials</h1>
        <div className={shared.headerActions}>
          {selectedIds.length > 0 && (
            <button onClick={handleBulkDelete} className={`${shared.addButton} ${shared.bulkDeleteBtn}`}>
              <FaTrash /> Seçilmişləri Sil ({selectedIds.length})
            </button>
          )}
          <Link href="/admin/materials/new" className={shared.addButton}>
            <FaPlus /> New Material
          </Link>
        </div>
      </div>

      <div className={shared.tableCard}>
        {materials.length === 0 ? (
          <div className={shared.emptyState}>
            <FaCube size={48} className={shared.emptyStateIcon} />
            <p>Heç bir material tapılmadı.</p>
          </div>
        ) : (
          <table className={shared.table}>
            <thead>
              <tr>
                <th>
                  <AdminCheckbox
                    checked={materials.length > 0 && selectedIds.length === materials.length}
                    onChange={handleSelectAll}
                    indeterminate={selectedIds.length > 0 && selectedIds.length < materials.length}
                    aria-label="Hamısını seç"
                  />
                </th>
                <th>Material</th>
                <th>Description</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((mat) => (
                <tr key={mat.id} className={selectedIds.includes(mat.id) ? shared.selected : ''}>
                  <td>
                    <AdminCheckbox
                      checked={selectedIds.includes(mat.id)}
                      onChange={() => handleSelectOne(mat.id)}
                      aria-label={`Material ${mat.name} seç`}
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
                    <div className={shared.actions}>
                      <Link
                        href={`/admin/materials/${mat.id}`}
                        className={`${shared.actionBtn} ${shared.editBtn}`}
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(mat.id)}
                        className={`${shared.actionBtn} ${shared.deleteBtn}`}
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
