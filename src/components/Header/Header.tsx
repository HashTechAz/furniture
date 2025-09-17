"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Header.module.css";
import SearchOverlay from "../HeaderSearchOverlay/SearchOverlay";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY || document.documentElement.scrollTop;
      setIsSticky(scrolled > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const isSustainabilityPage = pathname === "/sustainability";
  const isSystemPage = pathname === "/system";

  return (
    <>
      <header
        className={`
          ${styles.header} 
          ${isSticky ? styles.headerSticky : styles.headerDefault} 
          ${isSustainabilityPage ? styles.sustainabilityHeader : ""} 
          ${isSystemPage ? styles.systemHeader : ""}
        `}
      >
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

          <div className={styles.logo}>M. Logo</div>

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

      <SearchOverlay isOpen={isSearchOpen} onClose={toggleSearch} />
    </>
  );
};

export default Header;
