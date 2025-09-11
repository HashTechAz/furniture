"use client";

import React, { useRef, useState } from 'react';
import styles from './ProductSlider.module.css';
import CategoryCard from '../CategoryCard/CategoryCard';

// TypeScript üçün məlumat strukturu
interface SlideData {
  id: number;
  label: string;
  imageUrl: string;
}

// Məhsul məlumatları
const slideData: SlideData[] = [
    { id: 1, label: 'Modern Chair', imageUrl: '/images/product-1.jpg' },
    { id: 2, label: 'Minimalist Sofa', imageUrl: '/images/product-2.jpg' },
    { id: 3, label: 'Wooden Table', imageUrl: '/images/product-3.jpg' },
    { id: 4, label: 'Tall Bookcase', imageUrl: '/images/product-4.jpg' },
    { id: 5, label: 'Sideboard', imageUrl: '/images/product-5.jpg' },
    { id: 6, label: 'Designer Lamp', imageUrl: '/images/product-6.jpg' },
    { id: 7, label: 'Cozy Armchair', imageUrl: '/images/product-7.jpg' },
];

const ProductSlider: React.FC = () => {
  // Slider-in özünə birbaşa müraciət üçün referans
  const sliderRef = useRef<HTMLDivElement>(null);

  // Maus ilə sürüşdürmə vəziyyətini idarə etmək üçün state-lər
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);

  // --- FUNKSİYALAR ---

  // Oxlara kliklədikdə sürüşmə məsafəsi
  const scrollAmount = 340;

  // Ox ilə sola sürüşdürmə
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  // Ox ilə sağa sürüşdürmə
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  // Maus ilə sürüşdürməyə başlayanda
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    const slider = sliderRef.current;
    setStartX(e.pageX - slider.offsetLeft);
    setScrollLeftStart(slider.scrollLeft);
  };

  // Maus sürüşdürmə sahəsindən kənara çıxanda
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Maus düyməsi buraxıldıqda
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Maus basılı vəziyyətdə hərəkət etdikdə
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const slider = sliderRef.current;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Sürüşdürmə həssaslığı
    slider.scrollLeft = scrollLeftStart - walk;
  };

  return (
    <section className={styles.sliderMain}>
      <div className={styles.container}>
        <div className={styles.sliderTitle}>
          <div className={styles.sliderTitleText}>
            <span>
              Explore the endless possibilities. <br />
              36 modules, 4 depths and 43 colours.
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <svg
              onClick={scrollLeft}
              xmlns="http://www.w3.org/2000/svg" width="30" height="10" viewBox="0 0 30 10" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ cursor: 'pointer' }}
            >
              <path d="M25 5H5m0 0l4 4m-4-4l4-4" />
            </svg>
            <svg
              onClick={scrollRight}
              xmlns="http://www.w3.org/2000/svg" width="40" height="10" viewBox="0 0 30 10" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ cursor: 'pointer' }}
            >
              <path d="M5 5h20m0 0l-4 4m4-4l-4-4" />
            </svg>
          </div>
        </div>
      </div>

      <div
        ref={sliderRef}
        className={`${styles.sliderBoxWrapper} ${isDragging ? styles.dragging : ''}`}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className={styles.sliderBox}>
          {slideData.map((slide) => (
            <CategoryCard
              key={slide.id}
              label={slide.label}
              imageUrl={slide.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;