'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getDesigners, deleteDesigner, BackendDesigner } from '@/lib/designers';
import { getCached, setCached } from '@/lib/admin-prefetch-cache';
import AdminTableSkeleton from '../components/AdminTableSkeleton';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from './designers.module.css';

import { FaPlus, FaEdit, FaTrash, FaUserTie, FaUser } from 'react-icons/fa';

export default function DesignersPage() {
  const cached = getCached<BackendDesigner[]>('designers');
  const [designers, setDesigners] = useState<BackendDesigner[]>(Array.isArray(cached) ? cached : []);
  const [loading, setLoading] = useState(!cached);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { openModal } = useAdminModal();

  const fetchDesigners = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);
      const data = await getDesigners();
      const list = Array.isArray(data) ? data : [];
      setDesigners(list);
      setCached('designers', list);
    } catch (error) {
      console.error('Failed to fetch designers', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesigners(!cached);
  }, []);

  // DELETE MODAL
  const handleDelete = (id: number) => {
    openModal({
      type: 'warning',
      title: 'Delete Designer?',
      message: 'Are you sure you want to delete this designer? This action cannot be undone.',
      confirmText: 'Yes, Delete',
      cancelText: 'Cancel',
      onConfirm: async () => {
        const token = localStorage.getItem('accessToken') || '';
        await deleteDesigner(id, token);
        setDesigners(prev => prev.filter(d => d.id !== id));
        setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
      }
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedIds(designers.map(d => d.id));
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
      message: `Seçilmiş ${selectedIds.length} dizayneri silmək istədiyinizə əminsiniz? Bu geriyə alına bilməz.`,
      confirmText: 'Bəli, Sil',
      cancelText: 'Ləğv et',
      onConfirm: async () => {
        const token = localStorage.getItem('accessToken') || '';
        setLoading(true);
        try {
          const results = await Promise.allSettled(
            selectedIds.map(id => deleteDesigner(id, token))
          );
          const successIds = results
            .map((r, idx) => r.status === 'fulfilled' ? selectedIds[idx] : null)
            .filter(Boolean) as number[];
          setDesigners(prev => prev.filter(item => !successIds.includes(item.id)));
          setSelectedIds([]);
        } catch (error) {
          console.error("Toplu silinmə xətası", error);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const getImageUrl = (url: string) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `${process.env.NEXT_PUBLIC_API_URL || 'https://furniture.hashtech.az'}${url}`;
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.header}>
        <h1 className={styles.title}>Designers</h1>
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
          <Link href="/admin/designers/new" className={styles.addButton}>
            <FaPlus /> New Designer
          </Link>
        </div>
      </div>

      {/* Table Card */}
      <div className={styles.tableCard}>
        {loading ? (
          <AdminTableSkeleton rows={8} />
        ) : designers.length === 0 ? (
           <div style={{padding: 60, textAlign: 'center', color: '#666'}}>
             <FaUserTie size={40} style={{marginBottom: 10, opacity: 0.3}}/>
             <p>No designers found.</p>
           </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Designer</th>
                <th>Biography</th>
                <th style={{textAlign: 'right'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {designers.map((designer) => {
                const imgUrl = getImageUrl(designer.imageUrl);
                return (
                  <tr key={designer.id}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(designer.id)}
                        onChange={() => handleSelectOne(designer.id)}
                      />
                    </td>
                    <td>
                      <div className={styles.cellContent}>
                        <div className={styles.imageWrapper}>
                          {imgUrl ? (
                            <Image src={imgUrl} alt={designer.name} width={48} height={48} className={styles.image} loading="lazy" />
                          ) : (
                            <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc'}}>
                              <FaUser />
                            </div>
                          )}
                        </div>
                        <div className={styles.nameInfo}>
                           <span className={styles.name}>{designer.name}</span>
                           <span className={styles.idBadge}>ID: #{designer.id}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{color: '#666', maxWidth: 300}}>
                      {designer.biography ? designer.biography.substring(0, 60) + (designer.biography.length > 60 ? '...' : '') : '—'}
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <Link href={`/admin/designers/${designer.id}`} className={`${styles.actionBtn} ${styles.editBtn}`} title="Edit">
                          <FaEdit />
                        </Link>
                        <button onClick={() => handleDelete(designer.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Delete">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}