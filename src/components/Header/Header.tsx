"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import SearchOverlay from "../HeaderSearchOverlay/SearchOverlay";
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <header className={styles.header}>
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
            <button className={styles.searchButton} onClick={toggleSearch}>
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