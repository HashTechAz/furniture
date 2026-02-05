'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  FaDollarSign, FaShoppingCart, FaBox, FaEnvelope, 
  FaArrowUp, FaArrowDown, FaChair, FaBolt 
} from 'react-icons/fa';
import styles from './page.module.css';

import { getProducts } from '@/lib/products';
import { getCategories } from '@/lib/categories';
import { getDesigners } from '@/lib/designers';
import { getMessages } from '@/lib/contact';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    designers: 0,
    messages: 0,
    revenue: 14250, 
    orders: 48
  });
  
  const [loading, setLoading] = useState(true);

  // Bu günün tarixi
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('accessToken') || '';
        const [productsData, categoriesData, designersData, messagesData] = await Promise.all([
          getProducts().catch(() => ({ items: [], totalCount: 0 })), 
          getCategories().catch(() => []),
          getDesigners().catch(() => []),
          getMessages(1, 1, token).catch(() => ({ totalCount: 0 })) 
        ]);

        const productCount = (productsData as any).totalCount || (Array.isArray(productsData) ? productsData.length : 0);
        const messageCount = (messagesData as any).totalCount || 0;

        setStats({
          products: productCount,
          categories: Array.isArray(categoriesData) ? categoriesData.length : 0,
          designers: Array.isArray(designersData) ? designersData.length : 0,
          messages: messageCount,
          revenue: 14250, 
          orders: 48
        });
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div style={{padding: '50px', textAlign: 'center', color: '#666'}}>Dashboard Loading...</div>;

  return (
    <div className={styles.container}>
      
      {/* HEADER SECTION (Qara, Mebel Silueti ilə) */}
      <div className={styles.headerSection}>
        <div>
          <h1 className={styles.welcomeTitle}>Welcome back, Admin 👋</h1>
          <p className={styles.subTitle}>Here's the daily overview of your design store.</p>
        </div>
        <div className={styles.dateBadge}>
          📅 {today}
        </div>
      </div>

      {/* STATS GRID (Glass Effect) */}
      <div className={styles.statsGrid}>
        
        {/* REVENUE */}
        <div className={styles.statCard}>
          <div className={styles.cardHeader}>
            <div className={`${styles.iconWrapper} ${styles.green}`}>
              <FaDollarSign />
            </div>
            {/* Trend Badge */}
            <div style={{background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px'}}>
              <FaArrowUp /> 12.5%
            </div>
          </div>
          <div className={styles.statValue}>${stats.revenue.toLocaleString()}</div>
          <div className={styles.statLabel}>Total Revenue</div>
        </div>

        {/* ORDERS */}
        <div className={styles.statCard}>
          <div className={styles.cardHeader}>
            <div className={`${styles.iconWrapper} ${styles.blue}`}>
              <FaShoppingCart />
            </div>
            <div style={{background: '#dbeafe', color: '#1e40af', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px'}}>
              <FaArrowUp /> 8.2%
            </div>
          </div>
          <div className={styles.statValue}>{stats.orders}</div>
          <div className={styles.statLabel}>Total Orders</div>
        </div>

        {/* PRODUCTS */}
        <div className={styles.statCard}>
          <div className={styles.cardHeader}>
            <div className={`${styles.iconWrapper} ${styles.purple}`}>
              <FaChair /> {/* Chair iconu */}
            </div>
          </div>
          <div className={styles.statValue}>{stats.products}</div>
          <div className={styles.statLabel}>Active Products</div>
        </div>

        {/* MESSAGES */}
        <div className={styles.statCard}>
          <div className={styles.cardHeader}>
            <div className={`${styles.iconWrapper} ${styles.orange}`}>
              <FaEnvelope />
            </div>
             {stats.messages > 0 && (
                <div style={{background: '#ffedd5', color: '#c2410c', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700'}}>
                  Action Needed
                </div>
             )}
          </div>
          <div className={styles.statValue}>{stats.messages}</div>
          <div className={styles.statLabel}>New Messages</div>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className={styles.contentGrid}>
        
        {/* RECENT ORDERS TABLE */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>Recent Orders</div>
            <Link href="/admin/orders" className={styles.viewAllBtn}>View All</Link>
          </div>
          
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Order ID</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className={styles.userCell}>
                    <div className={styles.userAvatar}>AH</div>
                    <div>
                      <div style={{fontWeight: 600}}>Ali Huseynov</div>
                      <div style={{fontSize: 11, color: '#888'}}>ali@example.com</div>
                    </div>
                  </div>
                </td>
                <td>#ORD-7352</td>
                <td style={{fontWeight: 700}}>$450.00</td>
                <td><span className={`${styles.status} ${styles.statusCompleted}`}>Completed</span></td>
              </tr>
              <tr>
                <td>
                  <div className={styles.userCell}>
                    <div className={styles.userAvatar} style={{background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'}}>LM</div>
                    <div>
                      <div style={{fontWeight: 600}}>Leyla Mammadova</div>
                      <div style={{fontSize: 11, color: '#888'}}>leyla@example.com</div>
                    </div>
                  </div>
                </td>
                <td>#ORD-7351</td>
                <td style={{fontWeight: 700}}>$1,200.00</td>
                <td><span className={`${styles.status} ${styles.statusProcessing}`}>Processing</span></td>
              </tr>
              <tr>
                <td>
                  <div className={styles.userCell}>
                    <div className={styles.userAvatar} style={{background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'}}>RA</div>
                    <div>
                      <div style={{fontWeight: 600}}>Rasim Aliyev</div>
                      <div style={{fontSize: 11, color: '#888'}}>rasim@example.com</div>
                    </div>
                  </div>
                </td>
                <td>#ORD-7350</td>
                <td style={{fontWeight: 700}}>$85.00</td>
                <td><span className={`${styles.status} ${styles.statusPending}`}>Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ACTIVITY TIMELINE */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>Live Activity</div>
            <FaBolt style={{color: '#f59e0b'}}/>
          </div>
          
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <h4>New Product Added</h4>
                <p>You added "Montana Free 5500" to the catalog.</p>
                <span className={styles.time}>2 hours ago</span>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} style={{borderColor: '#2563eb'}}></div>
              <div className={styles.timelineContent}>
                <h4>Price Updated</h4>
                <p>Updated pricing for "Panton Wire" series.</p>
                <span className={styles.time}>5 hours ago</span>
              </div>
            </div>

             <div className={styles.timelineItem}>
              <div className={styles.timelineDot} style={{borderColor: '#ea580c'}}></div>
              <div className={styles.timelineContent}>
                <h4>New Message</h4>
                <p>Inquiry received from Corporate Client.</p>
                <span className={styles.time}>1 day ago</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}