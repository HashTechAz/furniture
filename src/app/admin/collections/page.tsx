'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCollections, deleteCollection, BackendCollection } from '@/lib/collections';
import { useAdminModal } from '@/context/admin-modal-context'; // Modal Hook
import styles from './collections.module.css';

import { FaPlus, FaEdit, FaTrash, FaLayerGroup, FaImage } from 'react-icons/fa';

export default function CollectionsPage() {
  const [collections, setCollections] = useState<BackendCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const { openModal } = useAdminModal();

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const data = await getCollections();
      setCollections(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch collections', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
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
        <Link href="/admin/collections/new" className={styles.addButton}>
          <FaPlus /> New Collection
        </Link>
      </div>

      {/* Table Card */}
      <div className={styles.tableCard}>
        {loading ? (
           <div style={{padding: 50, textAlign: 'center', color: '#666'}}>Loading...</div>
        ) : collections.length === 0 ? (
           <div style={{padding: 60, textAlign: 'center', color: '#666'}}>
             <FaLayerGroup size={40} style={{marginBottom: 10, opacity: 0.3}}/>
             <p>No collections found.</p>
           </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
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
                      <div className={styles.cellContent}>
                        <div className={styles.imageWrapper}>
                          {imgUrl ? (
                            <img src={imgUrl} alt={col.name} className={styles.image} />
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