'use client';

import React, { useEffect, useState } from 'react';
import AdminTableSkeleton from '../components/AdminTableSkeleton';
import { AdminCheckbox } from '../components/AdminCheckbox';
import Link from 'next/link';
import { getMessages, deleteMessage, ContactMessage, ContactResponse } from '@/lib/contact';
import { getCached, setCached } from '@/lib/admin-prefetch-cache';
import { useAdminModal } from '@/context/admin-modal-context';
import shared from '../components/admin-shared.module.css';
import styles from './contact.module.css';
import { FaTrash, FaEye, FaInbox } from 'react-icons/fa';

function parseMessages(data: ContactMessage[] | ContactResponse): ContactMessage[] {
  if (Array.isArray(data)) return data;
  if ('messages' in data) return data.messages;
  return [];
}

export default function ContactListPage() {
  const [page, setPage] = useState(1);
  const cached = getCached<ContactMessage[]>('contact');
  const [messages, setMessages] = useState<ContactMessage[]>(Array.isArray(cached) ? cached : []);
  const [loading, setLoading] = useState(!cached);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { openModal } = useAdminModal();

  useEffect(() => {
    const fetchMessages = async (showLoader = true) => {
      if (showLoader) setLoading(true);
      try {
        const token = localStorage.getItem('accessToken') || '';
        const data = await getMessages(page, 10, token);
        const list = parseMessages(data);
        setMessages(list);
        if (page === 1) setCached('contact', list);
      } catch (error) {
        console.error('Mesajlar gəlmədi:', error);
      } finally {
        setLoading(false);
      }
    };

    const hasCached = page === 1 && getCached<ContactMessage[]>('contact');
    fetchMessages(!hasCached);
  }, [page]);

  // DELETE MODAL
  const handleDelete = (id: number) => {
    openModal({
      type: 'warning',
      title: 'Delete Message?',
      message: 'Are you sure you want to delete this message? This action cannot be undone.',
      confirmText: 'Yes, Delete',
      cancelText: 'Cancel',
      onConfirm: async () => {
        const token = localStorage.getItem('accessToken') || '';
        await deleteMessage(id, token);
        setMessages(prev => prev.filter(m => m.id !== id));
        setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
      }
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedIds(messages.map(m => m.id));
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
      message: `Seçilmiş ${selectedIds.length} mesajı silmək istədiyinizə əminsiniz? Bu geriyə alına bilməz.`,
      confirmText: 'Bəli, Sil',
      cancelText: 'Ləğv et',
      onConfirm: async () => {
        const token = localStorage.getItem('accessToken') || '';
        setLoading(true);
        try {
          const results = await Promise.allSettled(
            selectedIds.map(id => deleteMessage(id, token))
          );
          const successIds = results
            .map((r, idx) => r.status === 'fulfilled' ? selectedIds[idx] : null)
            .filter(Boolean) as number[];
          setMessages(prev => prev.filter(item => !successIds.includes(item.id)));
          setSelectedIds([]);
        } catch (error) {
          console.error("Toplu silinmə xətası", error);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    try {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    } catch {
        return dateString;
    }
  };

  return (
    <div className={shared.container}>
      <div className={shared.header}>
        <h1 className={shared.title}>Inbox ({messages.length})</h1>
        {selectedIds.length > 0 && (
          <button onClick={handleBulkDelete} className={`${shared.addButton} ${shared.bulkDeleteBtn}`}>
            <FaTrash /> Seçilmişləri Sil ({selectedIds.length})
          </button>
        )}
      </div>

      <div className={shared.tableCard}>
        {loading ? (
          <AdminTableSkeleton rows={6} />
        ) : messages.length === 0 ? (
          <div className={shared.emptyState}>
            <FaInbox size={48} className={shared.emptyStateIcon} />
            <p>No messages found.</p>
          </div>
        ) : (
          <>
            <table className={shared.table}>
              <thead>
                <tr>
                  <th>
                    <AdminCheckbox
                      checked={messages.length > 0 && selectedIds.length === messages.length}
                      onChange={handleSelectAll}
                      indeterminate={selectedIds.length > 0 && selectedIds.length < messages.length}
                      aria-label="Hamısını seç"
                    />
                  </th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Sender</th>
                  <th>Subject</th>
                  <th>Email</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr
                    key={msg.id}
                    className={`${selectedIds.includes(msg.id) ? shared.selected : ''} ${!msg.isRead ? styles.unreadRow : ''}`}
                  >
                    <td>
                      <AdminCheckbox
                        checked={selectedIds.includes(msg.id)}
                        onChange={() => handleSelectOne(msg.id)}
                        aria-label={`Mesaj ${msg.subject} seç`}
                      />
                    </td>
                    <td>
                        <span className={`${styles.statusBadge} ${!msg.isRead ? styles.statusNew : styles.statusRead}`}>
                        {!msg.isRead ? 'New' : 'Read'}
                        </span>
                    </td>
                    <td style={{color: '#666', fontSize: 13}}>{formatDate(msg.createdAt)}</td>
                    <td style={{fontWeight: 500}}>{msg.fullName}</td>
                    <td>{msg.subject}</td>
                    <td style={{color: '#666'}}>{msg.email}</td>
                    <td>
                      <div className={shared.actions}>
                        <Link href={`/admin/contact/${msg.id}`} className={`${shared.actionBtn} ${shared.viewBtn}`} title="View">
                          <FaEye />
                        </Link>
                        <button onClick={() => handleDelete(msg.id)} className={`${shared.actionBtn} ${shared.deleteBtn}`} title="Delete">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className={shared.pagination}>
              <button
                className={shared.pageBtn}
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
              >
                &larr; Previous
              </button>
              <span style={{ fontSize: 14, color: '#6b7280', fontWeight: 600 }}>Page {page}</span>
              <button
                className={shared.pageBtn}
                disabled={messages.length < 10}
                onClick={() => setPage(p => p + 1)}
              >
                Next &rarr;
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}