'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './layout.module.css';
import { FaBars } from 'react-icons/fa';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  interface AdminUser { email: string }
  const [user, setUser] = useState<AdminUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Get user info from token (in a real app, you'd verify the token)
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('admin-token='))
      ?.split('=')[1];
    
    if (token) {
      // In a real app, you'd decode and verify the token
      setUser({ email: 'admin@montanafurniture.com' });
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className={styles.adminLayout}>
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2>Admin Panel</h2>
          <button
            className={styles.sidebarToggle}
            onClick={() => setIsSidebarOpen(false)}
          >
            ×
          </button>
        </div>
        
        <nav className={styles.sidebarNav}>
          <Link href="/admin" className={styles.navLink}>
            Dashboard
          </Link>
          <Link href="/admin/categories" className={styles.navLink}>
            Categories
          </Link>
          <Link href="/admin/products" className={styles.navLink}>
            Products
          </Link>
          <Link href="/admin/series" className={styles.navLink}>
            Series
          </Link>
          <Link href="/admin/orders" className={styles.navLink}>
            Orders
          </Link>
          <Link href="/admin/users" className={styles.navLink}>
            Users
          </Link>
        </nav>
        <div style={{width:"100%",display:'flex',justifyContent:"center"}}>
          <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
        </div>
      </div>

      <div className={styles.mainContent}>
        <header className={styles.header}>
        
          
          <div className={styles.headerActions}>
             <button title='side' onClick={() => setIsSidebarOpen(!isSidebarOpen)} className=''>
              <FaBars/>
              </button>
            <span className={styles.userEmail}>{user?.email}</span>
          
          </div>
        </header>

        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
