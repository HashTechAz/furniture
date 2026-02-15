'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaChair, FaThLarge, FaUser, FaFolderOpen, FaInbox } from 'react-icons/fa';
import styles from './page.module.css';

import { getProducts } from '@/lib/products';
import { getCategories } from '@/lib/categories';
import { getDesigners } from '@/lib/designers';
import { getCollections } from '@/lib/collections';
import { getMessages, type ContactMessage } from '@/lib/contact';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    designers: 0,
    collections: 0,
    messages: 0,
  });
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('accessToken') || '';
        const [productsData, categoriesData, designersData, collectionsData, messagesData] =
          await Promise.all([
            getProducts({ pageSize: 100 }).catch(() => []),
            getCategories().catch(() => []),
            getDesigners().catch(() => []),
            getCollections().catch(() => []),
            getMessages(1, 5, token).catch(() => ({ messages: [], totalCount: 0 })),
          ]);

        const productList = Array.isArray(productsData) ? productsData : [];
        const categoriesList = Array.isArray(categoriesData) ? categoriesData : [];
        const designersList = Array.isArray(designersData) ? designersData : [];
        const collectionsList = Array.isArray(collectionsData) ? collectionsData : [];

        const msgRes = messagesData as { messages?: ContactMessage[]; totalCount?: number };
        const messagesList = msgRes.messages ?? (Array.isArray(messagesData) ? messagesData : []);
        const messageCount = msgRes.totalCount ?? messagesList.length;

        setStats({
          products: productList.length,
          categories: categoriesList.length,
          designers: designersList.length,
          collections: collectionsList.length,
          messages: messageCount,
        });
        setRecentMessages(Array.isArray(messagesList) ? messagesList.slice(0, 5) : []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div style={{ padding: '50px', textAlign: 'center', color: '#666' }}>
        Dashboard Loading...
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <div>
          <h1 className={styles.welcomeTitle}>Welcome back, Admin 👋</h1>
          <p className={styles.subTitle}>Here&apos;s the daily overview of your design store.</p>
        </div>
        <div className={styles.dateBadge}>📅 {today}</div>
      </div>

      {/* Yalnız real statistikalar (API-dan) */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.cardHeader}>
            <div className={`${styles.iconWrapper} ${styles.purple}`}>
              <FaChair />
            </div>
          </div>
          <div className={styles.statValue}>{stats.products}</div>
          <div className={styles.statLabel}>Active Products</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.cardHeader}>
            <div className={`${styles.iconWrapper} ${styles.blue}`}>
              <FaThLarge />
            </div>
          </div>
          <div className={styles.statValue}>{stats.categories}</div>
          <div className={styles.statLabel}>Categories</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.cardHeader}>
            <div className={`${styles.iconWrapper} ${styles.green}`}>
              <FaUser />
            </div>
          </div>
          <div className={styles.statValue}>{stats.designers}</div>
          <div className={styles.statLabel}>Designers</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.cardHeader}>
            <div className={`${styles.iconWrapper} ${styles.orange}`}>
              <FaEnvelope />
            </div>
            {stats.messages > 0 && (
              <div
                style={{
                  background: '#ffedd5',
                  color: '#c2410c',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '700',
                }}
              >
                Action Needed
              </div>
            )}
          </div>
          <div className={styles.statValue}>{stats.messages}</div>
          <div className={styles.statLabel}>New Messages</div>
        </div>
      </div>

      {/* Real məlumatlar: Son mesajlar + Kataloq keçidlər */}
      <div className={styles.contentGrid}>
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>Recent Messages</div>
            <Link href="/admin/contact" className={styles.viewAllBtn}>
              View All
            </Link>
          </div>
          {recentMessages.length === 0 ? (
            <p className={styles.emptyHint}>No messages yet.</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentMessages.map((msg) => (
                  <tr key={msg.id}>
                    <td>
                      <div className={styles.userCell}>
                        <div className={styles.userAvatar}>
                          {(msg.fullName || msg.email || '?').slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600 }}>{msg.fullName || '—'}</div>
                          <div style={{ fontSize: 11, color: '#888' }}>{msg.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{msg.subject || '—'}</td>
                    <td>
                      {msg.createdAt
                        ? new Date(msg.createdAt).toLocaleDateString()
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>Catalog</div>
            <FaFolderOpen style={{ color: '#6366f1' }} />
          </div>
          <div className={styles.quickLinks}>
            <Link href="/admin/categories" className={styles.quickLink}>
              <FaThLarge /> Categories ({stats.categories})
            </Link>
            <Link href="/admin/designers" className={styles.quickLink}>
              <FaUser /> Designers ({stats.designers})
            </Link>
            <Link href="/admin/collections" className={styles.quickLink}>
              <FaFolderOpen /> Collections ({stats.collections})
            </Link>
            <Link href="/admin/products" className={styles.quickLink}>
              <FaChair /> Products ({stats.products})
            </Link>
            <Link href="/admin/contact" className={styles.quickLink}>
              <FaInbox /> Messages ({stats.messages})
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}