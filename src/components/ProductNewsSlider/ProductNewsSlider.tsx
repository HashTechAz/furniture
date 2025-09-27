"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './ProductNewsSlider.module.css';
import ProductCard from '../ProductCard/ProductCard';

const products = [
  { id: 1, title: "Lounge Chair", color: "Red and White", size: "W 35.4 x H 35.4 x D 30 cm", image: "https://nuvola.lk/cdn/shop/files/Ivane.jpg?v=1707134316&width=1256", imageHover: "https://cdn.shopify.com/s/files/1/2481/2502/files/T2ALA_media_model_1.jpg?v=1701975504" },
  { id: 2, title: "Lounge Chair", color: "Red and White", size: "W 35.4 x H 35.4 x D 30 cm", image: "https://cdn.shopify.com/s/files/1/2481/2502/files/T2ALA_media_model_1.jpg?v=1701975504", imageHover: "https://nuvola.lk/cdn/shop/files/Ivane.jpg?v=1707134316&width=1256" },
  { id: 3, title: "Lounge Chair", color: "Red and White", size: "W 35.4 x H 35.4 x D 30 cm", image: "https://nuvola.lk/cdn/shop/files/Ivane.jpg?v=1707134316&width=1256", imageHover: "https://cdn.shopify.com/s/files/1/2481/2502/files/T2ALA_media_model_1.jpg?v=1701975504" },
  { id: 4, title: "Lounge Chair", color: "Red and White", size: "W 35.4 x H 35.4 x D 30 cm", image: "https://cdn.shopify.com/s/files/1/2481/2502/files/T2ALA_media_model_1.jpg?v=1701975504", imageHover: "https://nuvola.lk/cdn/shop/files/Ivane.jpg?v=1707134316&width=1256" },
  { id: 5, title: "Lounge Chair", color: "Red and White", size: "W 35.4 x H 35.4 x D 30 cm", image: "https://nuvola.lk/cdn/shop/files/Ivane.jpg?v=1707134316&width=1256", imageHover: "https://cdn.shopify.com/s/files/1/2481/2502/files/T2ALA_media_model_1.jpg?v=1701975504" },
  { id: 6, title: "Lounge Chair", color: "Red and White", size: "W 35.4 x H 35.4 x D 30 cm", image: "https://cdn.shopify.com/s/files/1/2481/2502/files/T2ALA_media_model_1.jpg?v=1701975504", imageHover: "https://nuvola.lk/cdn/shop/files/Ivane.jpg?v=1707134316&width=1256" },
];

const ProductNewsSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = ["All", "KIMPOP", "Limited Editions", "Montana Mini", "Panton Wire", "Montana Free"];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
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
  }, [emblaApi]);

  const handleNextClick = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setDropdownOpen(false);
  };

  return (
    <section className={styles.sliderSection}>
      <div className={styles.sliderHeader}>
        <div className={styles.headerLeft}>
          <h2 className={styles.sectionTitle}>Product News</h2>
          
          <div className={styles.categoryLinks}>
            {categories.map(cat => (
              <a href="#" key={cat} className={styles.categoryLink}>{cat}</a>
            ))}
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
      
      {/* --- YENİ MOBİL KONTROL KONTEYNERİ --- */}
      <div className={styles.mobileControls}>
        <div className={styles.mobileCategoryDropdown} ref={dropdownRef}>
          <button className={styles.dropdownButton} onClick={() => setDropdownOpen(!isDropdownOpen)}>
            <span>{selectedCategory}</span>
            <svg className={`${styles.arrowIcon} ${isDropdownOpen ? styles.arrowIconOpen : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {categories.map(cat => (
                <a href="#" key={cat} onClick={() => handleCategorySelect(cat)}>{cat}</a>
              ))}
            </div>
          )}
        </div>
        <div className={styles.mobileViewAll}>
          <Link href="/product">View all products</Link>
        </div>
      </div>

      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.embla__container}>
          {products.map((product) => (
            <div className={styles.embla__slide} key={product.id}>
              <ProductCard
                id={product.id}
                imageSrc={product.image}
                imageSrcHover={product.imageHover}
                title={product.title}
                color={product.color}
                measurements={product.size}
                position="Standard"
              />
            </div>
          ))}
        </div>
      </div>

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

