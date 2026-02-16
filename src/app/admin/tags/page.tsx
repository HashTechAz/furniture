'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getTags, deleteTag, Tag } from '@/lib/tags';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from './page.module.css';
import { FaPlus, FaEdit, FaTrash, FaTag } from 'react-icons/fa';

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const { openModal } = useAdminModal();

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getTags();
      setTags(Array.isArray(data) ? data : []);
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
      title: 'Tagı silmək?',
      message: 'Bu tagı silmək istədiyinizə əminsiniz?',
      confirmText: 'Bəli, sil',
      cancelText: 'Ləğv et',
      onConfirm: async () => {
        const token = localStorage.getItem('accessToken') || '';
        await deleteTag(id, token);
        setTags((prev) => prev.filter((t) => t.id !== id));
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
        <h1 className={styles.title}>Tags</h1>
        <Link href="/admin/tags/new" className={styles.addButton}>
          <FaPlus /> New Tag
        </Link>
      </div>

      <div className={styles.tableCard}>
        {tags.length === 0 ? (
          <div style={{ padding: 60, textAlign: 'center', color: '#666' }}>
            <FaTag size={40} style={{ marginBottom: 10, opacity: 0.3 }} />
            <p>Heç bir tag tapılmadı.</p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Tag</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag) => (
                <tr key={tag.id}>
                  <td>
                    <div className={styles.cellContent}>
                      <div className={styles.nameInfo}>
                        <span className={styles.name}>{tag.tagName}</span>
                        <span className={styles.idBadge}>ID: #{tag.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Link
                        href={`/admin/tags/${tag.id}`}
                        className={`${styles.actionBtn} ${styles.editBtn}`}
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(tag.id)}
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
