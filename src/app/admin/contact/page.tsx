'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getMessages, deleteMessage, ContactMessage } from '@/lib/contact';
import styles from './contact.module.css';

export default function ContactListPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken') || '';
      // PageSize 10 olsun
      const data = await getMessages(page, 10, token);
      
      // Backend array qaytarırsa birbaşa set edirik
      // Əgər { items: [...] } qaytarırsa: setMessages(data.items)
      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        // Ehtiyat hal üçün (əgər backend formatı fərqlidirsə)
        setMessages((data as any).items || []);
      }
    } catch (error) {
      console.error('Mesajlar gəlmədi:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [page]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bu mesajı silmək istədiyinizə əminsiniz?')) return;
    try {
      const token = localStorage.getItem('accessToken') || '';
      await deleteMessage(id, token);
      setMessages(prev => prev.filter(m => m.id !== id));
    } catch (error) {
      alert('Silinmədi!');
    }
  };

  if (loading && messages.length === 0) return <div className={styles.container}>Yüklənir...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gələn Mesajlar</h1>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Status</th>
            <th>Ad Soyad</th>
            <th>Mövzu</th>
            <th>Email</th>
            <th>Əməliyyat</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg.id} className={!msg.isRead ? styles.unread : ''}>
              <td>
                <span className={`${styles.statusBadge} ${msg.isRead ? styles.read : styles.new}`}>
                  {msg.isRead ? 'Oxunub' : 'YENİ'}
                </span>
              </td>
              <td>{msg.fullName}</td>
              <td>{msg.subject}</td>
              <td>{msg.email}</td>
              <td>
                <div className={styles.actions}>
                  <Link href={`/admin/contact/${msg.id}`} className={styles.viewBtn}>
                    Oxu
                  </Link>
                  <button onClick={() => handleDelete(msg.id)} className={styles.deleteBtn}>
                    Sil
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {messages.length === 0 && (
            <tr><td colSpan={5} style={{textAlign:'center'}}>Heç bir mesaj yoxdur.</td></tr>
          )}
        </tbody>
      </table>

      {/* Sadə Pagination */}
      <div className={styles.pagination}>
        <button 
          className={styles.pageBtn} 
          disabled={page === 1} 
          onClick={() => setPage(p => p - 1)}
        >
          &larr; Əvvəlki
        </button>
        <span style={{alignSelf:'center'}}>Səhifə {page}</span>
        <button 
          className={styles.pageBtn} 
          // Əgər gələn data 10-dan azdırsa deməli son səhifədir
          disabled={messages.length < 10} 
          onClick={() => setPage(p => p + 1)}
        >
          Növbəti &rarr;
        </button>
      </div>
    </div>
  );
}