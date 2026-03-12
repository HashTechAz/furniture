'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCollections, deleteCollection, BackendCollection } from '@/lib/collections';
import { getCached, setCached } from '@/lib/admin-prefetch-cache';
import AdminTableSkeleton from '../components/AdminTableSkeleton';
import { useAdminModal } from '@/context/admin-modal-context'; // Modal Hook
import styles from './collections.module.css';

import { FaPlus, FaEdit, FaTrash, FaLayerGroup, FaImage } from 'react-icons/fa';

export default function CollectionsPage() {
  const cached = getCached<BackendCollection[]>('collections');
  const [collections, setCollections] = useState<BackendCollection[]>(Array.isArray(cached) ? cached : []);
  const [loading, setLoading] = useState(!cached);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { openModal } = useAdminModal();

  const fetchCollections = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);
      const data = await getCollections();
      const list = Array.isArray(data) ? data : [];
      setCollections(list);
      setCached('collections', list);
    } catch (error) {
      console.error('Failed to fetch collections', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections(!cached);
  }, []);

  // DELETE MODAL
  const handleDelete = (id: number) => {
    openModal({
      type: 'warning',
      title: 'Delete Collection?',
      message: 'Are you sure you want to delete this collection? Products in this collection will be updated.',
      confirmText: 'Yes, Delete',
      cancelText: 'Cancel',
      onConfirm: async () => {
        const token = localStorage.getItem('accessToken') || '';
        await deleteCollection(id, token);
        setCollections(prev => prev.filter(c => c.id !== id));
        setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
      }
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedIds(collections.map(c => c.id));
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
      message: `Seçilmiş ${selectedIds.length} kolleksiyanı silmək istədiyinizə əminsiniz? Bu geriyə alına bilməz.`,
      confirmText: 'Bəli, Sil',
      cancelText: 'Ləğv et',
      onConfirm: async () => {
        const token = localStorage.getItem('accessToken') || '';
        setLoading(true);
        try {
          const results = await Promise.allSettled(
            selectedIds.map(id => deleteCollection(id, token))
          );
          const successIds = results
            .map((r, idx) => r.status === 'fulfilled' ? selectedIds[idx] : null)
            .filter(Boolean) as number[];
          setCollections(prev => prev.filter(item => !successIds.includes(item.id)));
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
      
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Collections</h1>
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
          <Link href="/admin/collections/new" className={styles.addButton}>
            <FaPlus /> New Collection
          </Link>
        </div>
      </div>

      {/* Table Card */}
      <div className={styles.tableCard}>
        {loading ? (
          <AdminTableSkeleton rows={8} />
        ) : collections.length === 0 ? (
           <div style={{padding: 60, textAlign: 'center', color: '#666'}}>
             <FaLayerGroup size={40} style={{marginBottom: 10, opacity: 0.3}}/>
             <p>No collections found.</p>
           </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: 40 }}>
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll} 
                    checked={collections.length > 0 && selectedIds.length === collections.length}
                  />
                </th>
                <th>Collection</th>
                <th>Description</th>
                <th style={{textAlign: 'right'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {collections.map((col) => {
                const imgUrl = getImageUrl(col.coverImageUrl);
                return (
                  <tr key={col.id}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(col.id)}
                        onChange={() => handleSelectOne(col.id)}
                      />
                    </td>
                    <td>
                      <div className={styles.cellContent}>
                        <div className={styles.imageWrapper}>
                          {imgUrl ? (
                            <Image src={imgUrl} alt={col.name} width={60} height={40} className={styles.image} loading="lazy" />
                          ) : (
                            <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc'}}>
                              <FaImage />
                            </div>
                          )}
                        </div>
                        <div className={styles.nameInfo}>
                           <span className={styles.name}>{col.name}</span>
                           <span className={styles.idBadge}>ID: #{col.id}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{color: '#666', maxWidth: 300}}>
                      {col.description ? col.description.substring(0, 60) + (col.description.length > 60 ? '...' : '') : '—'}
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <Link href={`/admin/collections/${col.id}`} className={`${styles.actionBtn} ${styles.editBtn}`} title="Edit">
                          <FaEdit />
                        </Link>
                        <button onClick={() => handleDelete(col.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Delete">
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