"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Header.module.css";
import SearchOverlay from "../HeaderSearchOverlay/SearchOverlay";
import SeriesContent from "../SeriesContent/SeriesContent";
import ProductsContent from "../ProductsContent/ProductsContent";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isSeriesOpen, setIsSeriesOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const pathname = usePathname();

  const isSustainabilityPage = pathname === "/sustainability";
  const isSystemPage = pathname === "/system";
  const stickyThreshold = isSustainabilityPage || isSystemPage ? 5 : 200;

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY || document.documentElement.scrollTop;
      setIsSticky(scrolled > stickyThreshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [stickyThreshold]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const onClickSeries = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsSeriesOpen((prev) => !prev);
  };

  const onClickProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsProductsOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsSeriesOpen(false);
    setIsProductsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isSeriesOpen || isProductsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSeriesOpen, isProductsOpen]);

  return (
    <>
      <header
        className={`
          ${styles.header} 
          ${isSticky ? styles.headerSticky : styles.headerDefault} 
          ${isSustainabilityPage ? styles.sustainabilityHeader : ""} 
          ${isSystemPage ? styles.systemHeader : ""}
          ${isSeriesOpen ? styles.headerOverlayOpen : ""}
          ${isProductsOpen ? styles.headerOverlayOpen : ""}
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
                  className={styles.navLinks}
                  onClick={onClickProducts}
                >
                  Products
                </Link>
              </li>
              <li className={styles.navLists}>
                <Link
                  href="#"
                  className={styles.navLinks}
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
            <button
              type="button"
              className={styles.searchButton}
              onClick={toggleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`${styles.seriesOverlay} ${
          isSeriesOpen ? styles.seriesOverlayOpen : ""
        }`}
      >
        {isSeriesOpen && <SeriesContent />} 
      </div>

      <div
        className={`${styles.seriesOverlay} ${
          isProductsOpen ? styles.seriesOverlayOpen : ""
        }`}
      >
        {isProductsOpen && <ProductsContent />} 
      </div>

      <SearchOverlay isOpen={isSearchOpen} onClose={toggleSearch} />
    </>
  );
};

export default Header;
