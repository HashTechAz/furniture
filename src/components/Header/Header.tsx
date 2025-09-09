'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logo}>
          Montana
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/series" className={styles.navLink}>
                Series
              </Link>
              <div className={styles.dropdown}>
                <ul className={styles.dropdownList}>
                  <li className={styles.dropdownItem}>
                    <Link href="/series/montana-system" className={styles.dropdownLink}>
                      Montana System
                    </Link>
                  </li>
                  <li className={styles.dropdownItem}>
                    <Link href="/series/montana-mini" className={styles.dropdownLink}>
                      Montana Mini
                    </Link>
                  </li>
                  <li className={styles.dropdownItem}>
                    <Link href="/series/panton-wire" className={styles.dropdownLink}>
                      Panton Wire
                    </Link>
                  </li>
                  <li className={styles.dropdownItem}>
                    <Link href="/series/montana-free" className={styles.dropdownLink}>
                      Montana Free
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            <li className={styles.navItem}>
              <Link href="/products" className={styles.navLink}>
                Products
              </Link>
              <div className={styles.dropdown}>
                <ul className={styles.dropdownList}>
                  <li className={styles.dropdownItem}>
                    <Link href="/products/accessories" className={styles.dropdownLink}>
                      Accessories
                    </Link>
                  </li>
                  <li className={styles.dropdownItem}>
                    <Link href="/products/storage" className={styles.dropdownLink}>
                      Storage
                    </Link>
                  </li>
                  <li className={styles.dropdownItem}>
                    <Link href="/products/tables" className={styles.dropdownLink}>
                      Tables
                    </Link>
                  </li>
                  <li className={styles.dropdownItem}>
                    <Link href="/products/chairs" className={styles.dropdownLink}>
                      Chairs
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            <li className={styles.navItem}>
              <Link href="/professionals" className={styles.navLink}>
                Professionals
              </Link>
              <div className={styles.dropdown}>
                <ul className={styles.dropdownList}>
                  <li className={styles.dropdownItem}>
                    <Link href="/professionals/inspiration" className={styles.dropdownLink}>
                      Inspiration
                    </Link>
                  </li>
                  <li className={styles.dropdownItem}>
                    <Link href="/professionals/tools" className={styles.dropdownLink}>
                      Tools
                    </Link>
                  </li>
                  <li className={styles.dropdownItem}>
                    <Link href="/professionals/downloads" className={styles.dropdownLink}>
                      Downloads
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            <li className={styles.navItem}>
              <Link href="/customer-support" className={styles.navLink}>
                Customer Support
              </Link>
            </li>

            <li className={styles.navItem}>
              <Link href="/about" className={styles.navLink}>
                About
              </Link>
            </li>

            <li className={styles.navItem}>
              <Link href="/contact" className={styles.navLink}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.headerActions}>
          <button className={styles.searchButton} aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          <div className={styles.localeSelector}>
            <button className={styles.localeButton}>
              EN-EN
            </button>
            <div className={styles.localeDropdown}>
              <ul className={styles.localeList}>
                <li className={styles.localeItem}>
                  <Link href="/en-en" className={styles.localeLink}>
                    EN-EN
                  </Link>
                </li>
                <li className={styles.localeItem}>
                  <Link href="/en-fi" className={styles.localeLink}>
                    EN-FI
                  </Link>
                </li>
                <li className={styles.localeItem}>
                  <Link href="/en-nl" className={styles.localeLink}>
                    EN-NL
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <button 
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
