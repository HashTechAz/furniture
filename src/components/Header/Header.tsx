"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import SearchOverlay from "../HeaderSearchOverlay/SearchOverlay";
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [triggerSlide, setTriggerSlide] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById('header-trigger');

    if ('IntersectionObserver' in window && sentinel) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          setShowSticky(!entry.isIntersecting);
        },
        { root: null, threshold: 0, rootMargin: '0px' }
      );
      observer.observe(sentinel);
      return () => observer.disconnect();
    }

    // Fallback: pixel threshold
    const handleScroll = () => {
      const scrolled = window.scrollY || document.documentElement.scrollTop;
      setShowSticky(scrolled > 1);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!showSticky) return;
    setTriggerSlide(true);
    const id = requestAnimationFrame(() => {
      const id2 = requestAnimationFrame(() => setTriggerSlide(false));
      return () => cancelAnimationFrame(id2);
    });
    return () => cancelAnimationFrame(id);
  }, [showSticky]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <header className={`${styles.header} ${showSticky ? styles.headerSticky : ''} ${showSticky && triggerSlide ? styles.headerSlideFromTop : ''}`}>
        <nav className={styles.navbar}>
          <div className={styles.navigationMenu}>
            <ul>
              <li className={styles.navLists}>
                <Link href="/series" className={styles.navLinks}>
                  Series
                </Link>
              </li>
              <li className={styles.navLists}>
                <Link href="/products" className={styles.navLinks}>
                  Products
                </Link>
              </li>
              <li className={styles.navLists}>
                <Link href="/about" className={styles.navLinks}>
                  About
                </Link>
              </li>
              <li className={styles.navLists}>
                <Link href="/customer-support" className={styles.navLinks}>
                  Customer Support
                </Link>
              </li>
              <li className={styles.navLists}>
                <Link href="/professionals" className={styles.navLinks}>
                  Professionals
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.logo}>M. Logo</div>

          <div className={styles.navSearch}>
            <button type="button" title="mebel"  className={styles.searchButton} onClick={toggleSearch}>
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
      <SearchOverlay isOpen={isSearchOpen} onClose={toggleSearch} />
    </>
  );
};

export default Header;