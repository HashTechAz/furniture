'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './layout.module.css';

import { 
  FaBars, FaBox, FaTags, FaTag, FaPalette, FaLock, FaSignOutAlt, 
  FaHome, FaPaintBrush, FaFolder, FaEnvelope, FaBuilding, FaCube 
} from 'react-icons/fa';

import { AdminModalProvider } from '@/context/admin-modal-context';

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean | string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`${styles.navLink} ${active === true || active === styles.activeLink ? styles.activeLink : ''}`}
    >
      {children}
    </Link>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<{ email: string } | null>(null);
  
  const router = useRouter();
  const pathname = usePathname();

  // Səhifə Başlıqları
  const getPageTitle = () => {
    if (pathname === '/admin') return 'Dashboard';
    if (pathname.includes('products')) return 'Products';
    if (pathname.includes('categories')) return 'Categories';
    if (pathname.includes('colors')) return 'Colors';
    if (pathname.includes('designers')) return 'Designers';
    if (pathname.includes('collections')) return 'Collections';
    if (pathname.includes('contact')) return 'Inbox';
    if (pathname.includes('rooms')) return 'Rooms';
    if (pathname.includes('materials')) return 'Materials';
    // if (pathname.includes('tags')) return 'Tags';
    if (pathname.includes('change-password')) return 'Security';
    return 'Admin';
  };

  // Logout Funksiyası
  const handleLogout = async () => {
    try {
      // Backend-ə logout sorğusu (varsa)
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (e) { 
      console.error(e); 
    } finally {
      // 1. LocalStorage təmizlə
      localStorage.clear();
      
      // 2. Cookieləri təmizlə
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // 3. Logina at
      router.push('/login');
    }
  };

  // Resize Handler
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // User Load
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

  // User Load

  useEffect(() => {
    const token = document.cookie.includes('accessToken') || localStorage.getItem('user');
    if (!token) router.push('/login');
  }, [router]);

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/') ? styles.activeLink : '';

  return (
    <div className={styles.adminLayout}>
      
      {/* SIDEBAR */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        
        {/* LOGO */}
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <div className={styles.logoBox}>S</div>
            Sparro
          </div>
          
          <button 
             className={styles.menuButton} 
             onClick={() => setIsSidebarOpen(false)} 
             style={{ marginLeft: 'auto' }} 
          >
              ×
          </button>
        </div>
        
        <nav className={styles.sidebarNav} style={{paddingTop: '20px'}}>
          
          <NavLink href="/admin" active={pathname === '/admin'}>
            <FaHome /> Dashboard
          </NavLink>
          <NavLink href="/admin/products" active={isActive('/admin/products')}>
            <FaBox /> Products
          </NavLink>
          <NavLink href="/admin/categories" active={isActive('/admin/categories')}>
            <FaTags /> Categories
          </NavLink>
          <NavLink href="/admin/collections" active={isActive('/admin/collections')}>
            <FaFolder /> Collections
          </NavLink>
          <NavLink href="/admin/designers" active={isActive('/admin/designers')}>
            <FaPaintBrush /> Designers
          </NavLink>
          <NavLink href="/admin/colors" active={isActive('/admin/colors')}>
            <FaPalette /> Colors
          </NavLink>
          <NavLink href="/admin/materials" active={isActive('/admin/materials')}>
            <FaCube /> Materials
          </NavLink>
          <NavLink href="/admin/rooms" active={isActive('/admin/rooms')}>
            <FaBuilding /> Rooms
          </NavLink>
          <NavLink href="/admin/contact" active={isActive('/admin/contact')}>
            <FaEnvelope /> Messages
          </NavLink>
          <NavLink href="/admin/change-password" active={isActive('/admin/change-password')}>
            <FaLock /> Security
          </NavLink>
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
  );
}

import SessionKeepAlive from './components/SessionKeepAlive';

// --- ƏSAS LAYOUT (Wrapper) ---
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminModalProvider>
      <SessionKeepAlive />
      <LayoutContent>{children}</LayoutContent>
    </AdminModalProvider>
  );
}