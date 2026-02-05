'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getMessages, deleteMessage, ContactMessage, ContactResponse } from '@/lib/contact';
import styles from './contact.module.css';

export default function ContactListPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // useEffect - Səhifə açılanda və ya 'page' dəyişəndə işə düşür
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('accessToken') || '';
        const data = await getMessages(page, 10, token);
        
        console.log("🔥 API RAW DATA:", data); 

        if (Array.isArray(data)) {
          setMessages(data);
        } 
        // Backend 'messages' qaytarır
        else if ('messages' in (data as ContactResponse)) {
          setMessages((data as ContactResponse).messages);
        }
        else {
          console.error("Format başa düşülmədi. Gələn data:", data);
          setMessages([]);
        }

      } catch (error) {
        console.error('Mesajlar gəlmədi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages(); // Funksiyanı burada çağırırıq
  }, [page]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bu mesajı silmək istədiyinizə əminsiniz?')) return;
    try {
      const token = localStorage.getItem('accessToken') || '';
      await deleteMessage(id, token);
      setMessages(prev => prev.filter(m => m.id !== id));
      alert('Silindi!');
    } catch (error) {
      console.error(error); 
      alert('Silinmədi!');
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    try {
        return new Date(dateString).toLocaleDateString('az-AZ', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    } catch {
        // 'e' -ni sildik ki, xəta verməsin (unused variable)
        return dateString;
    }
  };

  if (loading && messages.length === 0) return <div className={styles.container}>Yüklənir...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gələn Mesajlar ({messages.length})</h1>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Status</th>
            <th>Tarix</th>
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
              <td style={{fontSize: '13px', color: '#666'}}>{formatDate(msg.createdAt)}</td>
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
            <tr><td colSpan={6} style={{textAlign:'center', padding: '20px'}}>Heç bir mesaj yoxdur.</td></tr>
          )}
        </tbody>
      </table>

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
          disabled={messages.length < 10} 
          onClick={() => setPage(p => p + 1)}
        >
          Növbəti &rarr;
        </button>
      </div>
    </div>
  );
}