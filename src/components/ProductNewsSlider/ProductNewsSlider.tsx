"use client";

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './ProductNewsSlider.module.css';
import ProductCard from '../ProductCard/ProductCard';

// 1. GÜNCELLEME: Her ürüne bir 'imageHover' özelliği eklendi.
const products = [
  { id: 1, title: "Lounge Chair", color: "Red and White", size: "W 35.4 x H 35.4 x D 30 cm", image: "https://nuvola.lk/cdn/shop/files/Ivane.jpg?v=1707134316&width=1256", imageHover: "https://cdn.shopify.com/s/files/1/2481/2502/files/T2ALA_media_model_1.jpg?v=1701975504" },
  { id: 2, title: "Lounge Chair", color: "Red and White", size: "W 35.4 x H 35.4 x D 30 cm", image: "https://cdn.shopify.com/s/files/1/2481/2502/files/T2ALA_media_model_1.jpg?v=1701975504", imageHover: "https://nuvola.lk/cdn/shop/files/Ivane.jpg?v=1707134316&width=1256" },
  { id: 3, title: "Lounge Chair", color: "Red and White", size: "W 35.4 x H 35.4 x D 30 cm", image: "https://nuvola.lk/cdn/shop/files/Ivane.jpg?v=1707134316&width=1256", imageHover: "https://cdn.shopify.com/s/files/1/2481/2502/files/T2ALA_media_model_1.jpg?v=1701975504" },
  { id: 4, title: "Lounge Chair", color: "Red and White", size: "W 35.4 x H 35.4 x D 30 cm", image: "https://cdn.shopify.com/s/files/1/2481/2502/files/T2ALA_media_model_1.jpg?v=1701975504", imageHover: "https://nuvola.lk/cdn/shop/files/Ivane.jpg?v=1707134316&width=1256" },
  { id: 5, title: "Lounge Chair", color: "Red and White", size: "W 35.4 x H 35.4 x D 30 cm", image: "https://nuvola.lk/cdn/shop/files/Ivane.jpg?v=1707134316&width=1256", imageHover: "https://cdn.shopify.com/s/files/1/2481/2502/files/T2ALA_media_model_1.jpg?v=1701975504" },
  { id: 6, title: "Lounge Chair", color: "Red and White", size: "W 35.4 x H 35.4 x D 30 cm", image: "https://cdn.shopify.com/s/files/1/2481/2502/files/T2ALA_media_model_1.jpg?v=1701975504", imageHover: "https://nuvola.lk/cdn/shop/files/Ivane.jpg?v=1707134316&width=1256" },
  { id: 7, title: "Lounge Chair", color: "Red and White", size: "W 35.4 x H 35.4 x D 30 cm", image: "https://nuvola.lk/cdn/shop/files/Ivane.jpg?v=1707134316&width=1256", imageHover: "https://cdn.shopify.com/s/files/1/2481/2502/files/T2ALA_media_model_1.jpg?v=1701975504" },
  { id: 8, title: "Lounge Chair", color: "Red and White", size: "W 35.4 x H 35.4 x D 30 cm", image: "https://cdn.shopify.com/s/files/1/2481/2502/files/T2ALA_media_model_1.jpg?v=1701975504", imageHover: "https://nuvola.lk/cdn/shop/files/Ivane.jpg?v=1707134316&width=1256" },
  { id: 9, title: "Lounge Chair", color: "Red and White", size: "W 35.4 x H 35.4 x D 30 cm", image: "https://nuvola.lk/cdn/shop/files/Ivane.jpg?v=1707134316&width=1256", imageHover: "https://cdn.shopify.com/s/files/1/2481/2502/files/T2ALA_media_model_1.jpg?v=1701975504" },
  { id: 10, title: "Lounge Chair", color: "Red and White", size: "W 35.4 x H 35.4 x D 30 cm", image: "https://cdn.shopify.com/s/files/1/2481/2502/files/T2ALA_media_model_1.jpg?v=1701975504", imageHover: "https://nuvola.lk/cdn/shop/files/Ivane.jpg?v=1707134316&width=1256" },
];

const ProductNewsSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true });

  const handlePrevClick = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const handleNextClick = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className={styles.sliderSection}>
      <div className={styles.sliderHeader}>
        <div className={styles.headerLeft}>
          <h2 className={styles.sectionTitle}>Product News</h2>
          <div className={styles.categoryLinks}>
            <a href="#" className={styles.categoryLink}>All</a>
            <a href="#" className={styles.categoryLink}>KIMPOP</a>
            <a href="#" className={styles.categoryLink}>Limited Editions</a>
            <a href="#" className={styles.categoryLink}>Montana Mini</a>
            <a href="#" className={styles.categoryLink}>Panton Wire</a>
            <a href="#" className={styles.categoryLink}>Montana Free</a>
          </div>
        </div>
        <div className={styles.sliderNav}>
          <button onClick={handlePrevClick} className={styles.prevButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg" width="30" height="10" viewBox="0 0 30 10" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              className={styles.arrow}
            >
              <path d="M25 5H5m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
          <button onClick={handleNextClick} className={styles.nextButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg" width="30" height="10" viewBox="0 0 30 10" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              className={styles.arrow}
            >
              <path d="M5 5h20m0 0l-4 4m4-4l-4-4" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.embla__container}>
          {products.map((product) => (
            <div className={styles.embla__slide} key={product.id}>
              <ProductCard
                imageSrc={product.image}
                // 2. GÜNCELLEME: imageSrcHover prop'u buraya eklendi.
                imageSrcHover={product.imageHover}
                title={product.title}
                color={product.color}
                size={product.size}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductNewsSlider;