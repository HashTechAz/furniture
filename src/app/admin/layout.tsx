'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './layout.module.css';

import { 
  FaBars, FaBox, FaTags, FaPalette, FaLock, FaSignOutAlt, 
  FaHome, FaPaintBrush, FaFolder, FaEnvelope 
} from 'react-icons/fa';

import { AdminModalProvider } from '@/context/admin-modal-context';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<{ email: string } | null>(null);
  
  const router = useRouter();
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === '/admin') return 'Dashboard';
    if (pathname.includes('products')) return 'Products';
    if (pathname.includes('categories')) return 'Categories';
    if (pathname.includes('colors')) return 'Colors';
    if (pathname.includes('designers')) return 'Designers';
    if (pathname.includes('collections')) return 'Collections';
    if (pathname.includes('contact')) return 'Inbox';
    return 'Admin';
  };

  useEffect(() => {
    // Window obyektini yalnız useEffect daxilində (yəni Client tərəfdə) istifadə edirik
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };

    // İlk yüklənmədə yoxlamaq (ancaq client-də)
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (e) { console.error(e); } 
    finally {
      localStorage.clear();
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      router.push('/login');
    }
  };

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/') ? styles.activeLink : '';

  return (
    <AdminModalProvider>
    <div className={styles.adminLayout}>
      
      {/* SIDEBAR */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        
        {/* LOGO: Sparro */}
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <div className={styles.logoBox}>S</div>
            Sparro
          </div>
          
          {/* DÜZƏLİŞ EDİLƏN HİSSƏ BURADIR: */}
          <button 
             className={styles.menuButton} 
             onClick={() => setIsSidebarOpen(false)} 
             style={{ marginLeft: 'auto' }} 
             // window.innerWidth yoxlanışını sildik, CSS bunu həll edəcək
          >
             ×
          </button>
        </div>
        
        <nav className={styles.sidebarNav} style={{paddingTop: '20px'}}>
          
          <Link href="/admin" className={`${styles.navLink} ${pathname === '/admin' ? styles.activeLink : ''}`}>
            <FaHome /> Dashboard
          </Link>
          
          <Link href="/admin/products" className={`${styles.navLink} ${isActive('/admin/products')}`}>
            <FaBox /> Products
          </Link>

          <Link href="/admin/categories" className={`${styles.navLink} ${isActive('/admin/categories')}`}>
            <FaTags /> Categories
          </Link>

          <Link href="/admin/collections" className={`${styles.navLink} ${isActive('/admin/collections')}`}>
            <FaFolder /> Collections
          </Link>

          <Link href="/admin/designers" className={`${styles.navLink} ${isActive('/admin/designers')}`}>
            <FaPaintBrush /> Designers
          </Link>

          <Link href="/admin/colors" className={`${styles.navLink} ${isActive('/admin/colors')}`}>
            <FaPalette /> Colors
          </Link>

          <Link href="/admin/contact" className={`${styles.navLink} ${isActive('/admin/contact')}`}>
            <FaEnvelope /> Messages
          </Link>

          <Link href="/admin/change-password" className={`${styles.navLink} ${isActive('/admin/change-password')}`}>
            <FaLock /> Security
          </Link>
        </nav>

        {/* SIDEBAR FOOTER */}
        <div className={styles.sidebarFooter}>
          {user && (
            <div className={styles.userProfile}>
              <div className={styles.userAvatar}>
                {user.email.charAt(0).toUpperCase()}
              </div>
              <div className={styles.userInfo}>
                <span className={styles.userName}>Admin</span>
                <span className={styles.userEmail} title={user.email}>
                  {user.email}
                </span>
              </div>
            </div>
          )}
          <button onClick={handleLogout} className={styles.logoutButton}>
             <FaSignOutAlt /> Log Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className={styles.mainContent}>
        
        <header className={styles.header}>
            <button className={styles.menuButton} onClick={() => setIsSidebarOpen(true)}>
              <FaBars />
            </button>
            <h2 className={styles.pageTitle}>{getPageTitle()}</h2>
        </header>

        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
    </AdminModalProvider>
  );
}