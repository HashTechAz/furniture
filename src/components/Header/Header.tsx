"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Header.module.css";

// Gerekli tüm içerik bileşenlerini import ediyoruz
import SearchOverlay from "../HeaderSearchOverlay/SearchOverlay";
import SeriesContent from "../SeriesContent/SeriesContent";
import ProductsContent from "../ProductsContent/ProductsContent";
import InspirationContent from "../Inspiration/InspirationContent";

const Header: React.FC = () => {
  // State'ler
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSeriesOpen, setIsSeriesOpen] = useState<boolean>(false);
  const [isProductsOpen, setIsProductsOpen] = useState<boolean>(false);
  const [isInspirationOpen, setIsInspirationOpen] = useState<boolean>(false); // Inspiration menüsü için state
  
  // Scroll animasyonu için state'ler
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isAtTop, setIsAtTop] = useState<boolean>(true);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  
  const lastScrollY = useRef<number>(0);
  const pathname = usePathname();
  const isSustainabilityPage = pathname === "/sustainability";
  const isSystemPage = pathname === "/system";

  // Scroll animasyonunu yöneten useEffect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0 && !isAtTop) {
        setIsExiting(true);
        setTimeout(() => {
          setIsAtTop(true);
          setIsExiting(false);
        }, 400); 
      } else if (currentScrollY > 0 && isAtTop) {
        setIsAtTop(false);
      }

      if (!isAtTop) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAtTop]);

  // Arama overlay'ini açıp kapatan fonksiyon
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  // Menülere tıklandığında çalışan merkezi fonksiyon
  const handleMenuClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    isCurrentlyOpen: boolean
  ) => {
    e.preventDefault();

    const closeAllMenus = () => {
      setIsInspirationOpen(false);
      setIsProductsOpen(false);
      setIsSeriesOpen(false);
    };

    // Tıklanan menü zaten açıksa, hepsini kapat
    if (isCurrentlyOpen) {
      closeAllMenus();
      return;
    }

    // Başka bir menü açıksa, önce onu kapat, sonra yenisini küçük bir gecikmeyle aç
    if (isSeriesOpen || isProductsOpen || isInspirationOpen) {
        closeAllMenus();
        setTimeout(() => {
            setter(true);
        }, 100);
    } else {
        // Hiçbir menü açık değilse, tıklananı aç
        setter(true);
    }
  };
  
  // Sayfa (route) değiştiğinde tüm menüleri kapat
  useEffect(() => {
    setIsSeriesOpen(false);
    setIsProductsOpen(false);
    setIsInspirationOpen(false);
  }, [pathname]);

  // Menülerden herhangi biri açıkken body'nin scroll olmasını engelle
  useEffect(() => {
    const isAnyMenuOpen = isSeriesOpen || isProductsOpen || isInspirationOpen;
    document.body.style.overflow = isAnyMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isSeriesOpen, isProductsOpen, isInspirationOpen]);

  return (
    <>
      <header
        className={`
          ${styles.header}
          ${!isVisible && !isExiting ? styles.headerHidden : ''} 
          ${isAtTop ? styles.headerAtTop : ''}
          ${isVisible && !isAtTop ? styles.headerVisibleOnScroll : ''}
          ${isExiting ? styles.headerExiting : ''}
          ${isSeriesOpen || isProductsOpen || isInspirationOpen ? styles.headerOverlayOpen : ""}
          ${isSustainabilityPage ? styles.sustainabilityHeader : ""}
          ${isSystemPage ? styles.systemHeader : ""}
        `}
      >
        <nav className={styles.navbar}>
           <div className={styles.navigationMenu}>
             <ul>
               <li className={styles.navLists}>
                 <Link href="#" className={`${styles.navLinks} ${isInspirationOpen ? styles.active : ''}`} onClick={(e) => handleMenuClick(e, setIsInspirationOpen, isInspirationOpen)}>
                   Inspiration
                 </Link>
               </li>
               <li className={styles.navLists}>
                 <Link href="#" className={`${styles.navLinks} ${isProductsOpen ? styles.active : ''}`} onClick={(e) => handleMenuClick(e, setIsProductsOpen, isProductsOpen)}>
                   Products
                 </Link>
               </li>
               <li className={styles.navLists}>
                 <Link href="#" className={`${styles.navLinks} ${isSeriesOpen ? styles.active : ''}`} onClick={(e) => handleMenuClick(e, setIsSeriesOpen, isSeriesOpen)}>
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
      
      {/* Overlay'ler */}
      <div className={`${styles.seriesOverlay} ${isInspirationOpen ? styles.seriesOverlayOpen : ""}`}>
        {isInspirationOpen && <InspirationContent />}
      </div>
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