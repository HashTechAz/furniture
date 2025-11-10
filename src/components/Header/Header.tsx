"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";
import SearchOverlay from "../HeaderSearchOverlay/SearchOverlay";
import SeriesContent from "../SeriesContent/SeriesContent";
import ProductsContent from "../ProductsContent/ProductsContent";
import InspirationContent from "../Inspiration/InspirationContent";

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSeriesOpen, setIsSeriesOpen] = useState<boolean>(false);
  const [isProductsOpen, setIsProductsOpen] = useState<boolean>(false);
  const [isInspirationOpen, setIsInspirationOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const [isMobileInspirationOpen, setIsMobileInspirationOpen] =
    useState<boolean>(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] =
    useState<boolean>(false);
  const [isMobileSeriesOpen, setIsMobileSeriesOpen] = useState<boolean>(false);

  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isAtTop, setIsAtTop] = useState<boolean>(true);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const lastScrollY = useRef<number>(0);
  const pathname = usePathname();

  // Ensure component is mounted on client before using pathname-dependent logic
  useEffect(() => {
    setMounted(true);
  }, []);
  const isSustainabilityPage = pathname === "/sustainability";
  const isSystemPage = pathname === "/system";
  const isAboutPage = pathname === "/about";
  const isProductPage = pathname.startsWith("/product");
  const isProductsMainPage = pathname === "/product";
  const isProductDetailsPage =
    pathname.startsWith("/product/") && pathname !== "/product";
  const isColoursPage = pathname === "/colours";
  const isDesignersPage = pathname === "/designers";
  const isProductSeriesPage = pathname === "/productseries";
  const isCreativeMindsPage = pathname === "/creative-minds";
  const isFaebrikPage = pathname === "/creative-minds/faebrik";
  const isSeriesPage = pathname.startsWith("/series");
  const isGuaranteesPage = pathname === "/series/guarantees";
  const isAssemblyPage = pathname === "/series/assembly";
  const isLumikelloPage = pathname === "/creative-minds/lumikello";
  const isSwantjePage = pathname === "/creative-minds/swantje";
  const isCathrinePage = pathname === "/creative-minds/cathrine";
  const isTeklaPage = pathname === "/creative-minds/tekla";
  const isCelinePage = pathname === "/creative-minds/celine";
  const isSarahPage = pathname === "/creative-minds/sarah";
  const isColourClassPage = pathname === "/colour-inspiration/colour-class";
  const isColoursOfComfortPage =
    pathname === "/colour-inspiration/colours-of-comfort";
  const isInspiringStylesPage =
    pathname === "/colour-inspiration/inspiring-styles";

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      if (isMobileMenuOpen || isSearchOpen) return;
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

      // Mobile'da (1024px ve altı) header her zaman görünür olsun
      const isMobile = window.innerWidth <= 1024;

      if (isMobile) {
        setIsVisible(true);
      } else {
        // Desktop davranışı
        if (!isAtTop) {
          if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY.current) {
            setIsVisible(true);
          }
        } else {
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAtTop, isMobileMenuOpen, isSearchOpen, mounted]);

  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

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

    if (isCurrentlyOpen) {
      closeAllMenus();
      return;
    }
    if (isSeriesOpen || isProductsOpen || isInspirationOpen) {
      closeAllMenus();
      setTimeout(() => setter(true), 100);
    } else {
      setter(true);
    }
  };

  useEffect(() => {
    setIsSeriesOpen(false);
    setIsProductsOpen(false);
    setIsInspirationOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const isAnyMenuOpen =
      isSeriesOpen ||
      isProductsOpen ||
      isInspirationOpen ||
      isMobileMenuOpen ||
      isSearchOpen;
    if (isAnyMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [
    isSeriesOpen,
    isProductsOpen,
    isInspirationOpen,
    isMobileMenuOpen,
    isSearchOpen,
  ]);

  // Hide mobile menu when screen is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false);
        setIsMobileInspirationOpen(false);
        setIsMobileProductsOpen(false);
        setIsMobileSeriesOpen(false);

        setIsSearchOpen(false);
        setIsSeriesOpen(false);
        setIsProductsOpen(false);
        setIsInspirationOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const inspirationSubLinks = [
    { label: "Creative Minds", href: "/creative-minds" },
    { label: "Faebrik", href: "/creative-minds/faebrik" },
    { label: "Lumikello", href: "/creative-minds/lumikello" },
    { label: "Swantje Hinrichsen", href: "/creative-minds/swantje" },
    { label: "Cathrine De Lichtenberg", href: "/creative-minds/cathrine" },
    { label: "Tekla Evelina Severin", href: "/creative-minds/tekla" },
    { label: "Céline Hallas", href: "/creative-minds/celine" },
    { label: "Sarah Gottlieb", href: "/creative-minds/sarah" },
    { label: "Colour inspiration", href: "/colours" },
    {
      label: "Color Connaisseur & Montana Furniture",
      href: "/colour-inspiration/colour-class",
    },
    {
      label: "Colours of comfort",
      href: "/colour-inspiration/colours-of-comfort",
    },
    { label: "Colours and surfaces", href: "/colours" },
    {
      label: "Inspiring colour styles",
      href: "/colour-inspiration/inspiring-styles",
    },
    {
      label: "Find more inspiration",
      href: "/inspiration/find-more-inspiration",
    },
    { label: "Explore our catalogues", href: "/inspiration/catalogues" },
  ];

  const productsSubLinks = [
    { label: "View all products", href: "/product" },
    { label: "Shelving systems", href: "/product/shelving" },
    { label: "Bookcases", href: "/product/bookcases" },
    { label: "Tables & Chairs", href: "/product/tables-chairs" },
    { label: "About Montana", href: "/about" },
    { label: "Customize your solution", href: "/system" },
    { label: "41 colors & 2 veneers", href: "/colours" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Designers", href: "/designers" },
    { label: "Product Series", href: "/productseries" },
    { label: "Montana Selection", href: "/product" },
    { label: "Montana Mini", href: "/product" },
    { label: "Montana Mega", href: "/product" },
    { label: "Kevi Chairs", href: "/product" },
    { label: "All product series", href: "/product" },
  ];

  const seriesSubLinks = [
    { label: "View all series", href: "/series" },
    { label: "Montana System", href: "/series/montana-system" },
    { label: "Montana Mini", href: "/series/montana-mini" },
    { label: "Panton Wire", href: "/series/panton-wire" },
    { label: "Learn more about", href: "/series/learn-more-about" },
    { label: "Guarantees", href: "/series/guarantees" },
    { label: "Assembly guides", href: "/series/assembly" },
    { label: "Materials and care", href: "/series/materials-and-care" },
    { label: "Retailers and showrooms", href: "/series/showrooms" },
  ];

  const toggleMobileSubMenu = (menu: "inspiration" | "products" | "series") => {
    setIsMobileInspirationOpen(
      menu === "inspiration" ? !isMobileInspirationOpen : false
    );
    setIsMobileProductsOpen(
      menu === "products" ? !isMobileProductsOpen : false
    );
    setIsMobileSeriesOpen(menu === "series" ? !isMobileSeriesOpen : false);
  };

  return (
    <>
      <header
        className={`
          ${styles.header}
          ${
            !isVisible && !isExiting && !isMobileMenuOpen && !isSearchOpen
              ? styles.headerHidden
              : ""
          } 
          ${isAtTop ? styles.headerAtTop : ""}
          ${isVisible && !isAtTop ? styles.headerVisibleOnScroll : ""}
          ${isExiting ? styles.headerExiting : ""}
          ${
            isSeriesOpen ||
            isProductsOpen ||
            isInspirationOpen ||
            isMobileMenuOpen ||
            isSearchOpen
              ? styles.headerOverlayOpen
              : ""
          }
          ${
            isSeriesOpen || isProductsOpen || isInspirationOpen
              ? styles.headerMenuContentOpen
              : ""
          }
          ${isSustainabilityPage ? styles.sustainabilityHeader : ""}
          ${isSystemPage ? styles.systemHeader : ""}
          ${isAboutPage ? styles.aboutHeader : ""}
          ${isProductsMainPage ? styles.productsMainHeader : ""}
          ${
            isProductPage && !isProductsMainPage
              ? styles.productDetailsHeader
              : ""
          }
          ${isProductDetailsPage ? styles.productDetailsPage : ""}
          ${isColoursPage ? styles.coloursHeader : ""}
          ${isDesignersPage ? styles.designersHeader : ""}
          ${isProductSeriesPage ? styles.productSeriesHeader : ""}
          ${isCreativeMindsPage ? styles.creativeMindsHeader : ""}
          ${isFaebrikPage ? styles.faebrikHeader : ""}
          ${isLumikelloPage ? styles.lumikelloHeader : ""}
          ${isSwantjePage ? styles.swantjeHeader : ""}
          ${isCathrinePage ? styles.cathrineHeader : ""}
          ${isTeklaPage ? styles.teklaHeader : ""}
          ${isCelinePage ? styles.celineHeader : ""}
          ${isSarahPage ? styles.sarahHeader : ""}
          ${isColourClassPage ? styles.colourClassHeader : ""}
          ${isColoursOfComfortPage ? styles.coloursOfComfortHeader : ""}
          ${isInspiringStylesPage ? styles.inspiringStylesHeader : ""}
          ${isGuaranteesPage ? styles.guaranteesHeader : ""}
          ${isAssemblyPage ? styles.assemblyHeader : ""}
          ${
            isSeriesPage && !isGuaranteesPage && !isAssemblyPage
              ? styles.seriesHeader
              : ""
          }
        `}
      >
        <nav className={styles.navbar}>
          <div className={`${styles.navigationMenu} ${styles.desktopOnly}`}>
            <ul>
              <li>
                <Link
                  href='#'
                  className={`${styles.navLinks}`}
                  onClick={(e) =>
                    handleMenuClick(e, setIsInspirationOpen, isInspirationOpen)
                  }
                >
                  Inspiration
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className={`${styles.navLinks}`}
                  onClick={(e) =>
                    handleMenuClick(e, setIsProductsOpen, isProductsOpen)
                  }
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className={`${styles.navLinks}`}
                  onClick={(e) =>
                    handleMenuClick(e, setIsSeriesOpen, isSeriesOpen)
                  }
                >
                  Series
                </Link>
              </li>
              <li>
                <Link href='/system' className={styles.navLinks}>
                  Montana System
                </Link>
              </li>
              <li>
                <Link href='/sustainability' className={styles.navLinks}>
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          <div className={`${styles.mobileActions} ${styles.mobileOnly}`}>
            <button
              type='button'
              className={styles.hamburgerButton}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label='Toggle menu'
            >
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d={isMobileMenuOpen ? "M18 6L6 18" : "M4 6h16"}
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d={isMobileMenuOpen ? "M6 6l12 12" : "M4 12h16"}
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                {!isMobileMenuOpen && (
                  <path
                    d='M4 18h16'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                )}
              </svg>
            </button>
            <button
              title='mebel'
              type='button'
              className={`${styles.searchButton} ${
                isSearchOpen ? styles.searchButtonActive : ""
              }`}
              onClick={toggleSearch}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <circle cx='11' cy='11' r='8'></circle>
                <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
              </svg>
            </button>
          </div>

          <Link href='/' className={styles.logo}>
            <Image
              fill
              src='/images/logo/svlogosparro-01.png'
              alt='Sparro Logo'
              className={styles.logoImage}
              sizes='100px' 
              priority 
            />
          </Link>

          <div className={styles.navSearch}>
            <div className={styles.desktopOnly}>
              <button
                title='mebel'
                type='button'
                className={`${styles.searchButton} ${
                  isSearchOpen ? styles.searchButtonActive : ""
                }`}
                onClick={toggleSearch}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <circle cx='11' cy='11' r='8'></circle>
                  <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
                </svg>
              </button>
            </div>
            <div className={styles.mobileOnly} style={{ width: "85px" }}></div>
          </div>
        </nav>
      </header>

      <div
        className={`${styles.mobileMenuOverlay} ${
          isMobileMenuOpen ? styles.open : ""
        }`}
      >
        <div className={styles.mainNav}>
          <ul>
            {/* === INSPIRATION DROPDOWN === */}
            <li>
              <div
                className={styles.mobileNavItem}
                onClick={() => toggleMobileSubMenu("inspiration")}
              >
                <span>Inspiration</span>
                <svg
                  className={`${styles.arrowIcon} ${
                    isMobileInspirationOpen ? styles.arrowIconOpen : ""
                  }`}
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <polyline points='6 9 12 15 18 9'></polyline>
                </svg>
              </div>
              <div
                className={`${styles.mobileSubMenu} ${
                  isMobileInspirationOpen ? styles.subMenuOpen : ""
                }`}
              >
                <ul>
                  {inspirationSubLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} onClick={handleMobileLinkClick}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* === PRODUCTS DROPDOWN === */}
            <li>
              <div
                className={styles.mobileNavItem}
                onClick={() => toggleMobileSubMenu("products")}
              >
                <span>Products</span>
                <svg
                  className={`${styles.arrowIcon} ${
                    isMobileProductsOpen ? styles.arrowIconOpen : ""
                  }`}
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <polyline points='6 9 12 15 18 9'></polyline>
                </svg>
              </div>
              <div
                className={`${styles.mobileSubMenu} ${
                  isMobileProductsOpen ? styles.subMenuOpen : ""
                }`}
              >
                <ul>
                  {productsSubLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} onClick={handleMobileLinkClick}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* === SERIES DROPDOWN === */}
            <li>
              <div
                className={styles.mobileNavItem}
                onClick={() => toggleMobileSubMenu("series")}
              >
                <span>Series</span>
                <svg
                  className={`${styles.arrowIcon} ${
                    isMobileSeriesOpen ? styles.arrowIconOpen : ""
                  }`}
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <polyline points='6 9 12 15 18 9'></polyline>
                </svg>
              </div>
              <div
                className={`${styles.mobileSubMenu} ${
                  isMobileSeriesOpen ? styles.subMenuOpen : ""
                }`}
              >
                <ul>
                  {seriesSubLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} onClick={handleMobileLinkClick}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* === NORMAL LINKS === */}
            <li>
              <Link href='/system' onClick={handleMobileLinkClick}>
                Montana System
              </Link>
            </li>
            <li>
              <Link href='/sustainability' onClick={handleMobileLinkClick}>
                Sustainability
              </Link>
            </li>
            <li>
              <Link
                href='/professionals'
                onClick={handleMobileLinkClick}
                className={styles.professionalsLink}
              >
                Professionals
              </Link>
            </li>
          </ul>
        </div>

        {/* === BOTTOM NAV LINKS === */}
        <div className={styles.bottomNavWrapper}>
          <ul className={styles.supportNav}>
            <li>
              <Link href='/contact' onClick={handleMobileLinkClick}>
                Customer support
              </Link>
            </li>
            <li>
              <Link href='/retailers' onClick={handleMobileLinkClick}>
                Find retailers
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`${styles.seriesOverlay} ${
          isInspirationOpen ? styles.seriesOverlayOpen : ""
        }`}
      >
        {isInspirationOpen && <InspirationContent />}
      </div>
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
