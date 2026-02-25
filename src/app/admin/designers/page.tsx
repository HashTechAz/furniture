'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDesigners, deleteDesigner, BackendDesigner } from '@/lib/designers';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from './designers.module.css';

import { FaPlus, FaEdit, FaTrash, FaUserTie, FaUser } from 'react-icons/fa';

export default function DesignersPage() {
  const [designers, setDesigners] = useState<BackendDesigner[]>([]);
  const [loading, setLoading] = useState(true);
  const { openModal } = useAdminModal();

  const fetchDesigners = async () => {
    try {
      setLoading(true);
      const data = await getDesigners();
      setDesigners(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch designers', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesigners();
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
        <h1 className={styles.title}>Designers</h1>
        <Link href="/admin/designers/new" className={styles.addButton}>
          <FaPlus /> New Designer
        </Link>
      </div>

      {/* Table Card */}
      <div className={styles.tableCard}>
        {loading ? (
           <div style={{padding: 50, textAlign: 'center', color: '#666'}}>Loading...</div>
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
                      <div className={styles.cellContent}>
                        <div className={styles.imageWrapper}>
                          {imgUrl ? (
                            <img src={imgUrl} alt={designer.name} className={styles.image} />
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