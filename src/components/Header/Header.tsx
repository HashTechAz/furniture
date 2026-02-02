"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

// Components
import SearchOverlay from "../HeaderSearchOverlay/SearchOverlay";
import SeriesContent from "../SeriesContent/SeriesContent";
import ProductsContent from "../ProductsContent/ProductsContent";
import InspirationContent from "../Inspiration/InspirationContent";

// Data & API
import { INSPIRATION_LINKS, SERIES_LINKS, STATIC_PRODUCT_LINKS } from "@/constants/navigation";
import { getCategories, Category } from "@/lib/categories";

const Header: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSeriesOpen, setIsSeriesOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isInspirationOpen, setIsInspirationOpen] = useState(false);
  
  // Mobile States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileSubMenu, setActiveMobileSubMenu] = useState<"inspiration" | "products" | "series" | null>(null);

  // Scroll & UI States
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Data States
  const [categories, setCategories] = useState<Category[]>([]);

  const lastScrollY = useRef(0);
  const pathname = usePathname();

  // --- API DATA FETCHING ---
  useEffect(() => {
    setMounted(true);
    
    // Kateqoriyaları Backend-dən yükləyirik
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories for header:", error);
      }
    };

    fetchCategories();
  }, []);

  // --- SCROLL HANDLING ---
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      if (isMobileMenuOpen || isSearchOpen) return;
      const currentScrollY = window.scrollY;

      // Top detection
      if (currentScrollY === 0 && !isAtTop) {
        setIsExiting(true);
        setTimeout(() => {
            setIsAtTop(true);
            setIsExiting(false);
        }, 400);
      } else if (currentScrollY > 0 && isAtTop) {
        setIsAtTop(false);
      }

      // Hide/Show logic
      const isMobile = window.innerWidth <= 1024;
      if (isMobile) {
        setIsVisible(true);
      } else {
        if (!isAtTop && currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current) {
          setIsVisible(true);
        }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAtTop, isMobileMenuOpen, isSearchOpen, mounted]);

  // --- ROUTE CHANGE HANDLING ---
  useEffect(() => {
    // Səhifə dəyişəndə bütün menyuları bağla
    setIsSeriesOpen(false);
    setIsProductsOpen(false);
    setIsInspirationOpen(false);
    setIsMobileMenuOpen(false);
    setActiveMobileSubMenu(null);
  }, [pathname]);

  // --- NO SCROLL ON BODY WHEN MENU OPEN ---
  useEffect(() => {
    const isAnyMenuOpen = isSeriesOpen || isProductsOpen || isInspirationOpen || isMobileMenuOpen || isSearchOpen;
    document.body.classList.toggle("no-scroll", isAnyMenuOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [isSeriesOpen, isProductsOpen, isInspirationOpen, isMobileMenuOpen, isSearchOpen]);

  // --- RESIZE HANDLING ---
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false);
        setActiveMobileSubMenu(null);
        setIsSearchOpen(false);
        setIsSeriesOpen(false);
        setIsProductsOpen(false);
        setIsInspirationOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- HANDLERS ---
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  const handleDesktopMenuClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    isOpen: boolean
  ) => {
    e.preventDefault();
    // Digər hər şeyi bağla
    setIsInspirationOpen(false);
    setIsProductsOpen(false);
    setIsSeriesOpen(false);

    if (isOpen) {
        setter(false);
    } else {
        // Keçid effekti üçün timeout
        setTimeout(() => setter(true), 100);
    }
  };

  const toggleMobileSubMenu = (menu: "inspiration" | "products" | "series") => {
    setActiveMobileSubMenu(activeMobileSubMenu === menu ? null : menu);
  };

  // Helper for dynamic classes based on route (Cleaned up version)
  const getHeaderClass = () => {
    if (!mounted) return "";
    const p = pathname;
    
    // Xüsusi rəngli headerlər üçün map
    const styleMap: Record<string, string> = {
        "/sustainability": styles.sustainabilityHeader,
        "/system": styles.systemHeader,
        "/about": styles.aboutHeader,
        "/product": styles.productsMainHeader,
        "/colours": styles.coloursHeader,
        "/designers": styles.designersHeader,
        "/productseries": styles.productSeriesHeader,
        "/creative-minds": styles.creativeMindsHeader,
    };
    
    // Dəqiq uyğunluq yoxla
    if (styleMap[p]) return styleMap[p];

    // StartsWith yoxlamaları
    if (p.startsWith("/product/") && p !== "/product") return styles.productDetailsPage; 
    if (p.startsWith("/series") && !p.includes("guarantees") && !p.includes("assembly")) return styles.seriesHeader;
    if (p.includes("colour-inspiration")) return styles.inspiringStylesHeader;
    if (p.includes("creative-minds/")) return styles.creativeMindsHeader; // Alt səhifələr üçün

    return "";
  };

  return (
    <>
      <header
        className={`
          ${styles.header}
          ${!isVisible && !isExiting && !isMobileMenuOpen && !isSearchOpen ? styles.headerHidden : ""} 
          ${isAtTop ? styles.headerAtTop : ""}
          ${isVisible && !isAtTop ? styles.headerVisibleOnScroll : ""}
          ${isExiting ? styles.headerExiting : ""}
          ${(isSeriesOpen || isProductsOpen || isInspirationOpen || isMobileMenuOpen || isSearchOpen) ? styles.headerOverlayOpen : ""}
          ${(isSeriesOpen || isProductsOpen || isInspirationOpen) ? styles.headerMenuContentOpen : ""}
          ${getHeaderClass()}
        `}
      >
        <nav className={styles.navbar}>
          {/* DESKTOP NAV */}
          <div className={`${styles.navigationMenu} ${styles.desktopOnly}`}>
            <ul>
              <li><Link href="#" className={styles.navLinks} onClick={(e) => handleDesktopMenuClick(e, setIsInspirationOpen, isInspirationOpen)}>Inspiration</Link></li>
              <li><Link href="#" className={styles.navLinks} onClick={(e) => handleDesktopMenuClick(e, setIsProductsOpen, isProductsOpen)}>Products</Link></li>
              <li><Link href="#" className={styles.navLinks} onClick={(e) => handleDesktopMenuClick(e, setIsSeriesOpen, isSeriesOpen)}>Series</Link></li>
              <li><Link href="/system" className={styles.navLinks}>Montana System</Link></li>
              <li><Link href="/sustainability" className={styles.navLinks}>Sustainability</Link></li>
            </ul>
          </div>

          {/* MOBILE ACTIONS (Hamburger & Search) */}
          <div className={`${styles.mobileActions} ${styles.mobileOnly}`}>
            <button type="button" className={styles.hamburgerButton} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {isMobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
            <button type="button" className={styles.searchButton} onClick={toggleSearch}>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </div>

          {/* LOGO */}
          <Link href="/" className={styles.logo}>
            <Image src="/images/logo/svlogosparro-01.png" alt="Sparro Logo" className={styles.logoImage} width={100} height={40} priority />
          </Link>

          {/* DESKTOP SEARCH */}
          <div className={styles.navSearch}>
            <div className={styles.desktopOnly}>
              <button type="button" className={`${styles.searchButton} ${isSearchOpen ? styles.searchButtonActive : ""}`} onClick={toggleSearch}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </button>
            </div>
            <div className={styles.mobileOnly} style={{ width: "85px" }}></div>
          </div>
        </nav>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.open : ""}`}>
        <div className={styles.mainNav}>
          <ul>
            {/* 1. INSPIRATION (Static) */}
            <li>
              <div className={styles.mobileNavItem} onClick={() => toggleMobileSubMenu("inspiration")}>
                <span>Inspiration</span>
                <ChevronIcon isOpen={activeMobileSubMenu === "inspiration"} />
              </div>
              <div className={`${styles.mobileSubMenu} ${activeMobileSubMenu === "inspiration" ? styles.subMenuOpen : ""}`}>
                <ul>
                  {INSPIRATION_LINKS.map((link) => (
                    <li key={link.label}><Link href={link.href} onClick={() => setIsMobileMenuOpen(false)}>{link.label}</Link></li>
                  ))}
                </ul>
              </div>
            </li>

            {/* 2. PRODUCTS (Dynamic API Data) */}
            <li>
              <div className={styles.mobileNavItem} onClick={() => toggleMobileSubMenu("products")}>
                <span>Products</span>
                <ChevronIcon isOpen={activeMobileSubMenu === "products"} />
              </div>
              <div className={`${styles.mobileSubMenu} ${activeMobileSubMenu === "products" ? styles.subMenuOpen : ""}`}>
                <ul>
                  {/* Static Links (First) */}
                  {STATIC_PRODUCT_LINKS.map((link) => (
                     <li key={link.label}><Link href={link.href} onClick={() => setIsMobileMenuOpen(false)} style={{fontWeight: 'bold'}}>{link.label}</Link></li>
                  ))}
                  
                  {/* Dynamic API Categories */}
                  <li className={styles.divider} style={{margin: '10px 0', borderTop: '1px solid #eee'}}></li>
                  {categories.length > 0 ? categories.map((cat) => (
                    <li key={cat.id}>
                        {/* URL strukturuna diqqət: /product?CategoryId=2 */}
                        <Link href={`/product?CategoryId=${cat.id}`} onClick={() => setIsMobileMenuOpen(false)}>
                            {cat.name}
                        </Link>
                    </li>
                  )) : (
                    <li style={{color: '#999', fontSize: '12px', paddingLeft: '20px'}}>Yüklənir...</li>
                  )}
                </ul>
              </div>
            </li>

            {/* 3. SERIES (Static) */}
            <li>
              <div className={styles.mobileNavItem} onClick={() => toggleMobileSubMenu("series")}>
                <span>Series</span>
                <ChevronIcon isOpen={activeMobileSubMenu === "series"} />
              </div>
              <div className={`${styles.mobileSubMenu} ${activeMobileSubMenu === "series" ? styles.subMenuOpen : ""}`}>
                <ul>
                   {SERIES_LINKS.map((link) => (
                    <li key={link.label}><Link href={link.href} onClick={() => setIsMobileMenuOpen(false)}>{link.label}</Link></li>
                  ))}
                </ul>
              </div>
            </li>

            {/* Other Static Links */}
            <li><Link href="/system" onClick={() => setIsMobileMenuOpen(false)}>Montana System</Link></li>
            <li><Link href="/sustainability" onClick={() => setIsMobileMenuOpen(false)}>Sustainability</Link></li>
            <li><Link href="/professionals" onClick={() => setIsMobileMenuOpen(false)} className={styles.professionalsLink}>Professionals</Link></li>
          </ul>
        </div>

        {/* Bottom Links */}
        <div className={styles.bottomNavWrapper}>
          <ul className={styles.supportNav}>
            <li><Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Customer support</Link></li>
            <li><Link href="/retailers" onClick={() => setIsMobileMenuOpen(false)}>Find retailers</Link></li>
          </ul>
        </div>
      </div>

      {/* DESKTOP OVERLAYS */}
      <div className={`${styles.seriesOverlay} ${isInspirationOpen ? styles.seriesOverlayOpen : ""}`}>
        {isInspirationOpen && <InspirationContent />}
      </div>
      <div className={`${styles.seriesOverlay} ${isSeriesOpen ? styles.seriesOverlayOpen : ""}`}>
        {isSeriesOpen && <SeriesContent />}
      </div>
      <div className={`${styles.seriesOverlay} ${isProductsOpen ? styles.seriesOverlayOpen : ""}`}>
        {/* Note: ProductsContent component-inə də gələcəkdə "categories" prop-u ötürə bilərik */}
        {isProductsOpen && <ProductsContent />}
      </div>
      
      <SearchOverlay isOpen={isSearchOpen} onClose={toggleSearch} />
    </>
  );
};

// Helper Icon Component
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg className={`${styles.arrowIcon} ${isOpen ? styles.arrowIconOpen : ""}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

export default Header;