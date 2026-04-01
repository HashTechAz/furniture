'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaChair, FaThLarge, FaUser, FaFolderOpen, FaInbox, FaLayerGroup, FaPalette, FaCube, FaDoorOpen, FaChevronRight } from 'react-icons/fa';
import styles from './page.module.css';
import AdminDashboardSkeleton from './components/AdminDashboardSkeleton';
import { getCached } from '@/lib/admin-prefetch-cache';

import { getProducts } from '@/lib/products';
import { getCategories } from '@/lib/categories';
import { getDesigners } from '@/lib/designers';
import { getCollections } from '@/lib/collections';
import { getColors } from '@/lib/colors';
import { getMaterials } from '@/lib/materials';
import { getRooms } from '@/lib/rooms';
import { getMessages, type ContactMessage } from '@/lib/contact';

type DashboardCache = {
  products: unknown[];
  categories: unknown[];
  designers: unknown[];
  collections: unknown[];
  colors: unknown[];
  materials: unknown[];
  rooms: unknown[];
  messages: { messages?: ContactMessage[]; totalCount?: number } | ContactMessage[];
};

function fromCache(cached: DashboardCache | null) {
  if (!cached) {
    return {
      stats: { products: 0, categories: 0, designers: 0, collections: 0, colors: 0, materials: 0, rooms: 0, messages: 0 },
      recent: [],
    };
  }
  const pl = Array.isArray(cached.products) ? cached.products : [];
  const cl = Array.isArray(cached.categories) ? cached.categories : [];
  const dl = Array.isArray(cached.designers) ? cached.designers : [];
  const col = Array.isArray(cached.collections) ? cached.collections : [];
  const colors = Array.isArray(cached.colors) ? cached.colors : [];
  const mats = Array.isArray(cached.materials) ? cached.materials : [];
  const rooms = Array.isArray(cached.rooms) ? cached.rooms : [];
  const msg = cached.messages;
  const ml = Array.isArray(msg) ? msg : (msg as { messages?: ContactMessage[] })?.messages ?? [];
  const mc = (msg as { totalCount?: number })?.totalCount ?? ml.length;
  return {
    stats: {
      products: pl.length,
      categories: cl.length,
      designers: dl.length,
      collections: col.length,
      colors: colors.length,
      materials: mats.length,
      rooms: rooms.length,
      messages: mc,
    },
    recent: Array.isArray(ml) ? ml.slice(0, 5) : [],
  };
}

export default function AdminDashboard() {
  const cached = getCached<DashboardCache>('dashboard');
  const { stats: initStats, recent: initRecent } = fromCache(cached);

  const [stats, setStats] = useState(initStats);
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>(initRecent);
  const [loading, setLoading] = useState(!cached);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    async function fetchData(showLoader: boolean) {
      if (showLoader) setLoading(true);
      try {
        const token = localStorage.getItem('accessToken') || '';
        const [
          productsData,
          categoriesData,
          designersData,
          collectionsData,
          colorsData,
          materialsData,
          roomsData,
          messagesData,
        ] = await Promise.all([
          getProducts({ pageSize: 100 }).catch(() => []),
          getCategories().catch(() => []),
          getDesigners().catch(() => []),
          getCollections().catch(() => []),
          getColors().catch(() => []),
          getMaterials().catch(() => []),
          getRooms(token).catch(() => []),
          getMessages(1, 5, token).catch(() => ({ messages: [], totalCount: 0 })),
        ]);

        const pl = Array.isArray(productsData) ? productsData : [];
        const cl = Array.isArray(categoriesData) ? categoriesData : [];
        const dl = Array.isArray(designersData) ? designersData : [];
        const col = Array.isArray(collectionsData) ? collectionsData : [];
        const colors = Array.isArray(colorsData) ? colorsData : [];
        const mats = Array.isArray(materialsData) ? materialsData : [];
        const rooms = Array.isArray(roomsData) ? roomsData : [];

        const msgRes = messagesData as { messages?: ContactMessage[]; totalCount?: number };
        const ml = msgRes.messages ?? (Array.isArray(messagesData) ? messagesData : []);
        const mc = msgRes.totalCount ?? ml.length;

        setStats({
          products: pl.length,
          categories: cl.length,
          designers: dl.length,
          collections: col.length,
          colors: colors.length,
          materials: mats.length,
          rooms: rooms.length,
          messages: mc,
        });
        setRecentMessages(Array.isArray(ml) ? ml.slice(0, 5) : []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData(!cached);
  }, []);

  if (loading) return <AdminDashboardSkeleton />;

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <div>
          <h1 className={styles.welcomeTitle}>Welcome back, Admin 👋</h1>
          <p className={styles.subTitle}>Here&apos;s the daily overview of your design store.</p>
        </div>
        <div className={styles.dateBadge}>📅 {today}</div>
      </div>

      {/* Real statistikalar (API-dan) - Sətir 1 */}
      <div className={styles.statsGrid}>
        <Link href="/admin/products" className={styles.statCard}>
          <div className={styles.cardHeader}>
            <div className={`${styles.iconWrapper} ${styles.purple}`}>
              <FaChair />
            </div>
          </div>
          <div className={styles.statValue}>{stats.products}</div>
          <div className={styles.statLabel}>Active Products</div>
          <div className={styles.cardFooter}>
            <span>View</span>
            <FaChevronRight />
          </div>
        </Link>

        <Link href="/admin/categories" className={styles.statCard}>
          <div className={styles.cardHeader}>
            <div className={`${styles.iconWrapper} ${styles.blue}`}>
              <FaThLarge />
            </div>
          </div>
          <div className={styles.statValue}>{stats.categories}</div>
          <div className={styles.statLabel}>Categories</div>
          <div className={styles.cardFooter}>
            <span>View</span>
            <FaChevronRight />
          </div>
        </Link>

        <Link href="/admin/designers" className={styles.statCard}>
          <div className={styles.cardHeader}>
            <div className={`${styles.iconWrapper} ${styles.green}`}>
              <FaUser />
            </div>
          </div>
          <div className={styles.statValue}>{stats.designers}</div>
          <div className={styles.statLabel}>Designers</div>
          <div className={styles.cardFooter}>
            <span>View</span>
            <FaChevronRight />
          </div>
        </Link>

        <Link href="/admin/contact" className={styles.statCard}>
          <div className={styles.cardHeader}>
            <div className={`${styles.iconWrapper} ${styles.orange}`}>
              <FaEnvelope />
            </div>
            {stats.messages > 0 && (
              <div className={styles.actionBadge}>
                Action Needed
              </div>
            )}
          </div>
          <div className={styles.statValue}>{stats.messages}</div>
          <div className={styles.statLabel}>New Messages</div>
          <div className={styles.cardFooter}>
            <span>View</span>
            <FaChevronRight />
          </div>
        </Link>
      </div>

      {/* Sətir 2: Collections, Colors, Materials, Rooms */}
      <div className={styles.statsGrid}>
        <Link href="/admin/collections" className={styles.statCard}>
          <div className={styles.cardHeader}>
            <div className={`${styles.iconWrapper} ${styles.teal}`}>
              <FaLayerGroup />
            </div>
          </div>
          <div className={styles.statValue}>{stats.collections}</div>
          <div className={styles.statLabel}>Collections</div>
          <div className={styles.cardFooter}>
            <span>View</span>
            <FaChevronRight />
          </div>
        </Link>

        <Link href="/admin/colors" className={styles.statCard}>
          <div className={styles.cardHeader}>
            <div className={`${styles.iconWrapper} ${styles.rose}`}>
              <FaPalette />
            </div>
          </div>
          <div className={styles.statValue}>{stats.colors}</div>
          <div className={styles.statLabel}>Colors</div>
          <div className={styles.cardFooter}>
            <span>View</span>
            <FaChevronRight />
          </div>
        </Link>

        <Link href="/admin/materials" className={styles.statCard}>
          <div className={styles.cardHeader}>
            <div className={`${styles.iconWrapper} ${styles.amber}`}>
              <FaCube />
            </div>
          </div>
          <div className={styles.statValue}>{stats.materials}</div>
          <div className={styles.statLabel}>Materials</div>
          <div className={styles.cardFooter}>
            <span>View</span>
            <FaChevronRight />
          </div>
        </Link>

        <Link href="/admin/rooms" className={styles.statCard}>
          <div className={styles.cardHeader}>
            <div className={`${styles.iconWrapper} ${styles.indigo}`}>
              <FaDoorOpen />
            </div>
          </div>
          <div className={styles.statValue}>{stats.rooms}</div>
          <div className={styles.statLabel}>Rooms</div>
          <div className={styles.cardFooter}>
            <span>View</span>
            <FaChevronRight />
          </div>
        </Link>
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
            <Link href="/admin/products" className={styles.quickLink}>
              <FaChair /> Products ({stats.products})
            </Link>
            <Link href="/admin/categories" className={styles.quickLink}>
              <FaThLarge /> Categories ({stats.categories})
            </Link>
            <Link href="/admin/designers" className={styles.quickLink}>
              <FaUser /> Designers ({stats.designers})
            </Link>
            <Link href="/admin/collections" className={styles.quickLink}>
              <FaLayerGroup /> Collections ({stats.collections})
            </Link>
            <Link href="/admin/colors" className={styles.quickLink}>
              <FaPalette /> Colors ({stats.colors})
            </Link>
            <Link href="/admin/materials" className={styles.quickLink}>
              <FaCube /> Materials ({stats.materials})
            </Link>
            <Link href="/admin/rooms" className={styles.quickLink}>
              <FaDoorOpen /> Rooms ({stats.rooms})
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