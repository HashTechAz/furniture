"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Header.module.css";

// Bu componentlerin projenizde var olduğunu varsayıyorum
import SearchOverlay from "../HeaderSearchOverlay/SearchOverlay";
import SeriesContent from "../SeriesContent/SeriesContent";
import ProductsContent from "../ProductsContent/ProductsContent";

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSeriesOpen, setIsSeriesOpen] = useState<boolean>(false);
  const [isProductsOpen, setIsProductsOpen] = useState<boolean>(false);
  
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isAtTop, setIsAtTop] = useState<boolean>(true);
  
  // Çıkış animasyonunu yönetmek için yeni state
  const [isExiting, setIsExiting] = useState<boolean>(false);
  
  const lastScrollY = useRef<number>(0);
  const pathname = usePathname();
  const isSustainabilityPage = pathname === "/sustainability";
  const isSystemPage = pathname === "/system";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // EĞER EN TEPEYE ULAŞILDIYSA VE DAHA ÖNCE TEPEDE DEĞİLSEK
      if (currentScrollY === 0 && !isAtTop) {
        setIsExiting(true); // Çıkış animasyonunu başlat
        // Animasyon süresi bittikten sonra durumu sıfırla
        setTimeout(() => {
          setIsAtTop(true);
          setIsExiting(false);
        }, 400); // CSS'deki transition süresiyle aynı olmalı
      } 
      // EĞER TEPEDEYKEN AŞAĞI KAYDIRDIYSAK
      else if (currentScrollY > 0 && isAtTop) {
        setIsAtTop(false);
      }

      // Sadece tepede değilken scroll yönünü kontrol et
      if (!isAtTop) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsVisible(false); // Aşağı scroll -> gizle
        } else if (currentScrollY < lastScrollY.current) {
          setIsVisible(true); // Yukarı scroll -> göster
        }
      } else {
        setIsVisible(true); // Tepedeyken her zaman görünür yap
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAtTop]); // isAtTop'ı dependency array'e ekliyoruz

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const onClickSeries = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isProductsOpen) {
      setIsProductsOpen(false);
      setTimeout(() => setIsSeriesOpen(true), 50);
    } else {
      setIsSeriesOpen(prev => !prev);
    }
  };

  const onClickProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isSeriesOpen) {
      setIsSeriesOpen(false);
      setTimeout(() => setIsProductsOpen(true), 50);
    } else {
      setIsProductsOpen(prev => !prev);
    }
  };
  
  useEffect(() => {
    setIsSeriesOpen(false);
    setIsProductsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = (isSeriesOpen || isProductsOpen) ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isSeriesOpen, isProductsOpen]);

  return (
    <>
      <header
        className={`
          ${styles.header}
          ${!isVisible && !isExiting ? styles.headerHidden : ''} 
          ${isAtTop ? styles.headerAtTop : ''}
          ${isVisible && !isAtTop ? styles.headerVisibleOnScroll : ''}
          ${isExiting ? styles.headerExiting : ''}
          ${isSeriesOpen || isProductsOpen ? styles.headerOverlayOpen : ""}
          ${isSustainabilityPage ? styles.sustainabilityHeader : ""}
          ${isSystemPage ? styles.systemHeader : ""}
        `}
      >
        <nav className={styles.navbar}>
           <div className={styles.navigationMenu}>
             <ul>
               <li className={styles.navLists}>
                 <Link href="/series" className={styles.navLinks}>
                   Inspiration
                 </Link>
               </li>
               <li className={styles.navLists}>
                 <Link
                   href="#"
                   className={`${styles.navLinks} ${isProductsOpen ? styles.active : ''}`}
                   onClick={onClickProducts}
                 >
                   Products
                 </Link>
               </li>
               <li className={styles.navLists}>
                 <Link
                   href="#"
                   className={`${styles.navLinks} ${isSeriesOpen ? styles.active : ''}`}
                   onClick={onClickSeries}
                 >
                   Series
                 </Link>
               </li>
               <li className={styles.navLists}>
                 <Link href="/system" className={styles.navLinks}>
                   Montana System
                 </Link>
               </li>
               <li className={styles.navLists}>
                 <Link href="/sustainability" className={styles.navLinks}>
                   Sustainability
                 </Link>
               </li>
             </ul>
           </div>
           <Link href="/" className={styles.logo}>M. Logo</Link>
           <div className={styles.navSearch}>
             <button type="button" className={styles.searchButton} onClick={toggleSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
             </button>
           </div>
         </nav>
      </header>
      
      <div className={`${styles.seriesOverlay} ${isSeriesOpen ? styles.seriesOverlayOpen : ""}`}>
        {isSeriesOpen && <SeriesContent />}
      </div>
      <div className={`${styles.seriesOverlay} ${isProductsOpen ? styles.seriesOverlayOpen : ""}`}>
        {isProductsOpen && <ProductsContent />}
      </div>
      <SearchOverlay isOpen={isSearchOpen} onClose={toggleSearch} />
    </>
  );
};

export default Header;