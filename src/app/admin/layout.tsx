'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './layout.module.css';
import { FaBars, FaBox, FaTags, FaPalette, FaLayerGroup, FaShoppingCart, FaUsers, FaLock, FaSignOutAlt, FaHome } from 'react-icons/fa';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true); 
      } else {
        setIsSidebarOpen(false);
      }
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    } finally {
      localStorage.clear();
      // Cookieləri təmizlə
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      router.push('/login');
    }
  };

  const isActive = (path: string) => pathname === path ? styles.activeLink : '';

  return (
    <div className={styles.adminLayout}>
      
      <aside className={`${styles.sidebar} ${!isSidebarOpen && isMobile ? styles.sidebarClosed : styles.sidebarOpen}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>Mebel Admin</div>
          <button className={styles.sidebarToggle} onClick={() => setIsSidebarOpen(false)}>
            ×
          </button>
        </div>
        
        <nav className={styles.sidebarNav}>
          <Link href="/admin" className={`${styles.navLink} ${isActive('/admin')}`}>
            <FaHome /> Dashboard
          </Link>
          
          <Link href="/admin/categories" className={`${styles.navLink} ${isActive('/admin/categories')}`}>
            <FaTags /> Categories
          </Link>

          <Link href="/admin/products" className={`${styles.navLink} ${isActive('/admin/products')}`}>
            <FaBox /> Products
          </Link>

          <Link href="/admin/colors" className={`${styles.navLink} ${isActive('/admin/colors')}`}>
            <FaPalette /> Colors
          </Link>
          
          <Link href="/admin/series" className={`${styles.navLink} ${isActive('/admin/series')}`}>
            <FaLayerGroup /> Series
          </Link>
          
          <Link href="/admin/orders" className={`${styles.navLink} ${isActive('/admin/orders')}`}>
            <FaShoppingCart /> Orders
          </Link>
          
          <Link href="/admin/users" className={`${styles.navLink} ${isActive('/admin/users')}`}>
            <FaUsers /> Users
          </Link>
          
          <Link href="/admin/change-password" className={`${styles.navLink} ${isActive('/admin/change-password')}`}>
            <FaLock /> Security
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          {user && (
            <div className={styles.userProfile}>
              <div className={styles.userAvatar}>
                {user.email.charAt(0).toUpperCase()}
              </div>
              <div className={styles.userInfo}>
                <span className={styles.userName}>Admin</span>
                <span className={styles.userEmail}>{user.email}</span>
              </div>
            </div>
          )}
          <button onClick={handleLogout} className={styles.logoutButton}>
             <FaSignOutAlt /> Çıxış et
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT Area */}
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <button className={styles.menuButton} onClick={() => setIsSidebarOpen(true)}>
            <FaBars />
          </button>
          <div style={{fontWeight: 600, fontSize: '18px'}}>
            Panel
          </div>
        </header>

        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}