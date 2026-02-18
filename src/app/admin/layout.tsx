'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './layout.module.css';

import { 
  FaBars, FaBox, FaTags, FaTag, FaPalette, FaLock, FaSignOutAlt, 
  FaHome, FaPaintBrush, FaFolder, FaEnvelope, FaBuilding, FaCube 
} from 'react-icons/fa';

import { AdminModalProvider, useAdminModal } from '@/context/admin-modal-context';
import { getTokenExpiryMs } from '@/lib/auth';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<{ email: string } | null>(null);
  
  const router = useRouter();
  const pathname = usePathname();
  const { openModal } = useAdminModal();

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

  // *** TOKEN YOXLAMASI VƏ INTERCEPTOR DİNLƏYİCİSİ ***
  useEffect(() => {
    // 1. Token ümumiyyətlə varmı?
    const token = document.cookie.includes('accessToken') || localStorage.getItem('user');
    if (!token) {
      router.push('/login');
    }

    // 2. "auth-error" hadisəsini dinlə (api-client.ts göndərir)
    const handleAuthError = () => {
      openModal({
        type: 'error',
        title: 'Sessiya Bitdi 🔒',
        message: 'Təhlükəsizlik səbəbilə sessiyanızın vaxtı bitib. Zəhmət olmasa yenidən daxil olun.',
        confirmText: 'Daxil ol',
        onConfirm: () => {
           handleLogout(); // Yuxarıdakı logout funksiyasını çağırırıq
        },
        cancelText: '' // Cancel düyməsini gizlədirik ki, məcbur çıxsın
      });
    };

    window.addEventListener('auth-error', handleAuthError);

    return () => {
      window.removeEventListener('auth-error', handleAuthError);
    };
  }, [router, openModal]);

  // *** PROAKTİV TOKEN YENİLƏMƏ (15 dəq bitməzdən əvvəl refresh) ***
  useEffect(() => {
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (!accessToken) return;

    const expiryMs = getTokenExpiryMs(accessToken);
    const now = Date.now();
    const twoMinutes = 2 * 60 * 1000;

    const scheduleRefresh = (delayMs: number): (() => void) => {
      if (delayMs <= 0) return () => {};
      const t = setTimeout(async () => {
        try {
          const res = await fetch('/api/admin/refresh', { method: 'POST', credentials: 'include' });
          if (res.ok) {
            const data = await res.json();
            if (data.accessToken) {
              localStorage.setItem('accessToken', data.accessToken);
              if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
            }
            const nextExp = getTokenExpiryMs(data.accessToken);
            if (nextExp != null) scheduleRefresh(nextExp - Date.now() - twoMinutes);
          }
        } catch {
          // Səssiz uğursuz; 401 olanda auth-error ilə idarə olunacaq
        }
      }, delayMs);
      return () => clearTimeout(t);
    };

    if (expiryMs == null) return;
    const delay = expiryMs - now - twoMinutes;
    if (delay <= 0) {
      fetch('/api/admin/refresh', { method: 'POST', credentials: 'include' })
        .then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            if (data.accessToken) {
              localStorage.setItem('accessToken', data.accessToken);
              if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
            }
          }
        })
        .catch(() => {});
      return;
    }
    return scheduleRefresh(delay);
  }, []);

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

          <Link href="/admin/materials" className={`${styles.navLink} ${isActive('/admin/materials')}`}>
            <FaCube /> Materials
          </Link>

          {/* Tags — commentə alınıb
          <Link href="/admin/tags" className={`${styles.navLink} ${isActive('/admin/tags')}`}>
            <FaTag /> Tags
          </Link>
          */}

          <Link href="/admin/rooms" className={`${styles.navLink} ${isActive('/admin/rooms')}`}>
            <FaBuilding /> Rooms
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
  );
}

// --- ƏSAS LAYOUT (Wrapper) ---
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminModalProvider>
      <LayoutContent>{children}</LayoutContent>
    </AdminModalProvider>
  );
}