'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getMessageById, ContactMessage } from '@/lib/contact';
import styles from '../contact.module.css';

export default function ContactDetailPage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState<ContactMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<string>('');

  useEffect(() => {
    Promise.resolve(params).then(p => setId(p.id));
  }, [params]);

  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      try {
        const token = localStorage.getItem('accessToken') || '';
        const data = await getMessageById(id, token);
        setMessage(data);
      } catch (error) {
        console.error('Mesaj tapılmadı');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div className={styles.container}>Yüklənir...</div>;
  if (!message) return <div className={styles.container}>Mesaj tapılmadı.</div>;

  return (
    <div className={styles.container}>
      <Link href="/admin/contact" style={{display:'inline-block', marginBottom:'20px'}}>
        ← Geri qayıt
      </Link>
      
      <div className={styles.header}>
        <h1 className={styles.title}>{message.subject}</h1>
      </div>

      <div className={styles.messageCard}>
        <div className={styles.metaInfo}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Göndərən</span>
            <span className={styles.metaValue}>{message.fullName}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Email</span>
            <span className={styles.metaValue}>
                <a href={`mailto:${message.email}`} style={{color: '#2563eb'}}>{message.email}</a>
            </span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Telefon</span>
            <span className={styles.metaValue}>{message.phoneNumber || 'Qeyd olunmayıb'}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Tarix</span>
            {/* Backend tarixi göndərirsə formatlayırıq */}
            <span className={styles.metaValue}>
                {message.createdAt ? new Date(message.createdAt).toLocaleDateString() : 'Bilinmir'}
            </span>
          </div>
        </div>

        <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Mesaj</span>
            <div className={styles.messageBody}>
                {message.message}
            </div>
        </div>
      </div>
    </div>
  );
}