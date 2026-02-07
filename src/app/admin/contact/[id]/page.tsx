'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { getMessageById, ContactMessage } from '@/lib/contact';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from '../contact.module.css';

import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaCalendarAlt } from 'react-icons/fa';

export default function ContactDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [message, setMessage] = useState<ContactMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const { openModal } = useAdminModal();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      try {
        const token = localStorage.getItem('accessToken') || '';
        const data = await getMessageById(id, token);
        setMessage(data);
      } catch (error) {
        console.error('Mesaj tapılmadı');
        openModal({ type: 'error', title: 'Error', message: 'Message not found.' });
        router.push('/admin/contact');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id, router]);

  if (loading) return <div style={{padding: 40, textAlign: 'center'}}>Loading...</div>;
  if (!message) return null;

  return (
    <div className={styles.container}>
      <Link href="/admin/contact" className={styles.backLink}>
        <FaArrowLeft /> Back to Inbox
      </Link>
      
      <div className={styles.detailCard}>
        <div className={styles.detailHeader}>
           <h1 className={styles.detailTitle}>{message.subject}</h1>
           <span className={`${styles.statusBadge} ${!message.isRead ? styles.statusNew : styles.statusRead}`}>
                {!message.isRead ? 'Unread' : 'Read'}
           </span>
        </div>

        <div className={styles.metaInfo}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}><FaUser style={{marginRight: 5}}/> Sender</span>
            <span className={styles.metaValue}>{message.fullName}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}><FaEnvelope style={{marginRight: 5}}/> Email</span>
            <span className={styles.metaValue}>
                <a href={`mailto:${message.email}`} style={{color: '#2563eb', textDecoration: 'none'}}>{message.email}</a>
            </span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}><FaPhone style={{marginRight: 5}}/> Phone</span>
            <span className={styles.metaValue}>{message.phoneNumber || '—'}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}><FaCalendarAlt style={{marginRight: 5}}/> Date</span>
            <span className={styles.metaValue}>
                {message.createdAt ? new Date(message.createdAt).toLocaleString() : '—'}
            </span>
          </div>
        </div>

        <div>
            <span className={styles.metaLabel}>Message Body</span>
            <div className={styles.messageBody}>
                {message.message}
            </div>
        </div>
      </div>
    </div>
  );
}