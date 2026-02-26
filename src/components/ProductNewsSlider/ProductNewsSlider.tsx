// src/components/ProductNewsSlider/ProductNewsSlider.tsx
"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './ProductNewsSlider.module.css';
import ProductCard from '../ProductCard/ProductCard';
import { FrontendProduct, getProducts } from '@/lib/products';
import { getCollections, type BackendCollection } from '@/lib/collections';

interface ProductNewsSliderProps {
  products?: FrontendProduct[];
}

const ProductNewsSlider = ({ products = [] }: ProductNewsSliderProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const [collections, setCollections] = useState<BackendCollection[]>([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(null);
  const [collectionProducts, setCollectionProducts] = useState<FrontendProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCollections().then((data) => {
      setCollections(Array.isArray(data) ? data : []);
    }).catch(() => setCollections([]));
  }, []);

  const displayProducts = selectedCollectionId === null ? products : collectionProducts;
  const selectedCollection = selectedCollectionId != null ? collections.find((c) => c.id === selectedCollectionId) : null;
  const selectedCategoryLabel = selectedCollectionId === null ? 'All' : (selectedCollection?.name ?? 'All');

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const progress = emblaApi.scrollProgress();
    setScrollProgress(Math.min(100, Math.max(0, progress * 100)));
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on('scroll', onScroll);
    emblaApi.on('reInit', onScroll);
  }, [emblaApi, onScroll]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePrevClick = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  }, [emblaApi]);

  const handleNextClick = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  }, [emblaApi]);

  const handleCategorySelect = (collectionId: number | null) => {
    setSelectedCollectionId(collectionId);
    setDropdownOpen(false);
    if (collectionId === null) return;
    setLoading(true);
    getProducts({ collectionId, pageSize: 24 })
      .then((data) => setCollectionProducts(data))
      .catch(() => setCollectionProducts([]))
      .finally(() => setLoading(false));
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className={styles.sliderSection}>
      <div className={styles.sliderHeader}>
        <div className={styles.headerLeft}>
          <h2 className={styles.sectionTitle}>Product News</h2>

          <div className={styles.categoryLinksWrapper} ref={categoryScrollRef}>
            <div className={styles.categoryLinks}>
              <button type="button" className={`${styles.categoryLink} ${selectedCollectionId === null ? styles.categoryLinkActive : ''}`} onClick={() => handleCategorySelect(null)}>
                All
              </button>
              {collections.map((col) => (
                <button type="button" key={col.id} className={`${styles.categoryLink} ${selectedCollectionId === col.id ? styles.categoryLinkActive : ''}`} onClick={() => handleCategorySelect(col.id)}>
                  {col.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.sliderNav}>
          <button onClick={handlePrevClick} className={styles.prevButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="10" viewBox="0 0 30 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.arrow}><path d="M25 5H5m0 0l4 4m-4-4l4-4" /></svg>
          </button>
          <button onClick={handleNextClick} className={styles.nextButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="10" viewBox="0 0 30 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.arrow}><path d="M5 5h20m0 0l-4 4m4-4l-4-4" /></svg>
          </button>
        </div>
      </div>

      <div className={styles.mobileControls}>
        <div className={styles.mobileCategoryDropdown} ref={dropdownRef}>
          <button className={styles.dropdownButton} onClick={() => setDropdownOpen(!isDropdownOpen)}>
            <span>{selectedCategoryLabel}</span>
            <svg className={`${styles.arrowIcon} ${isDropdownOpen ? styles.arrowIconOpen : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <button type="button" onClick={() => handleCategorySelect(null)}>All</button>
              {collections.map((col) => (
                <button type="button" key={col.id} onClick={() => handleCategorySelect(col.id)}>{col.name}</button>
              ))}
            </div>
          )}
        </div>
        <div className={styles.mobileViewAll}>
          <Link href="/product">View all products</Link>
        </div>
      </div>

      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.loaderSpinner} />
        </div>
      ) : (
        <div className={styles.embla} ref={emblaRef}>
          <div className={styles.embla__container}>
            {displayProducts.map((product) => (
              <div className={styles.embla__slide} key={product.id}>
                <ProductCard
                  id={product.id}
                  imageSrc={product.imageSrc}
                  imageSrcHover={product.imageSrcHover}
                  title={product.title}
                  color={product.color}
                  measurements={product.measurements}
                  position={product.position}
                  price={product.price}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.progressBar}>
        <div
          className={styles.progressBarFill}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </section>
  );
};

export default ProductNewsSlider;