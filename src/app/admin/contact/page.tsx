'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getMessages, deleteMessage, ContactMessage, ContactResponse } from '@/lib/contact';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from './contact.module.css';

import { FaEnvelope, FaTrash, FaEye, FaInbox } from 'react-icons/fa';

export default function ContactListPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { openModal } = useAdminModal();

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('accessToken') || '';
        const data = await getMessages(page, 10, token);
        
        if (Array.isArray(data)) {
          setMessages(data);
        } else if ('messages' in (data as ContactResponse)) {
          setMessages((data as ContactResponse).messages);
        } else {
          setMessages([]);
        }

      } catch (error) {
        console.error('Mesajlar gəlmədi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
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
    <div className={styles.container}>
      
      <div className={styles.header}>
        <h1 className={styles.title}>Inbox ({messages.length})</h1>
      </div>

      <div className={styles.tableCard}>
        {loading ? (
           <div style={{padding: 50, textAlign: 'center', color: '#666'}}>Loading messages...</div>
        ) : messages.length === 0 ? (
           <div style={{padding: 60, textAlign: 'center', color: '#666'}}>
             <FaInbox size={40} style={{marginBottom: 10, opacity: 0.3}}/>
             <p>No messages found.</p>
           </div>
        ) : (
          <>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Sender</th>
                    <th>Subject</th>
                    <th>Email</th>
                    <th style={{textAlign: 'right'}}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {messages.map((msg) => (
                    <tr key={msg.id} className={!msg.isRead ? styles.unreadRow : ''}>
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
                        <div className={styles.actions}>
                        <Link href={`/admin/contact/${msg.id}`} className={`${styles.actionBtn} ${styles.viewBtn}`} title="View">
                            <FaEye />
                        </Link>
                        <button onClick={() => handleDelete(msg.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Delete">
                            <FaTrash />
                        </button>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination (Table Card-ın içində və ya altında ola bilər) */}
            <div style={{padding: '20px', borderTop: '1px solid #eee'}}>
                 <div className={styles.pagination} style={{marginTop: 0}}>
                    <button 
                        className={styles.pageBtn} 
                        disabled={page === 1} 
                        onClick={() => setPage(p => p - 1)}
                    >
                        &larr; Previous
                    </button>
                    <span style={{fontSize: 14, color: '#666'}}>Page {page}</span>
                    <button 
                        className={styles.pageBtn} 
                        disabled={messages.length < 10} 
                        onClick={() => setPage(p => p + 1)}
                    >
                        Next &rarr;
                    </button>
                </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}