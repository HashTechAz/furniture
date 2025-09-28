"use client";

// Dəyişiklik: useState, useEffect əlavə edildi
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './ProductSlider.module.css';
import systemStyles from './ProductSliderSystem.module.css';
import CategoryCard from '../CategoryCard/CategoryCard';

// TypeScript üçün məlumat strukturu
interface SlideData {
  id: number;
  label: string;
  imageUrl: string;
  size?: 'wide' | 'normal' | 'default';
}

// Məhsul məlumatları
const slideData: SlideData[] = [
    { id: 1, label: 'Modern Chair', imageUrl: 'https://profine.pk/wp-content/uploads/2024/12/WhatsApp-Image-2025-03-06-at-2.06.38-PM-1.webp', size: 'wide' },
    { id: 2, label: 'Minimalist Sofa', imageUrl: 'https://www.coxandcox.co.uk/media/catalog/product/a/w/aw16-k-ratchair.png?quality=80&fit=bounds&height=800&width=800', size: 'default' },
    { id: 3, label: 'Modern Chair', imageUrl: 'https://profine.pk/wp-content/uploads/2024/12/WhatsApp-Image-2025-03-06-at-2.06.38-PM-1.webp', size: 'default' },
    { id: 4, label: 'Minimalist Sofa', imageUrl: 'https://www.coxandcox.co.uk/media/catalog/product/a/w/aw16-k-ratchair.png?quality=80&fit=bounds&height=800&width=800', size: 'wide' },
    { id: 5, label: 'Modern Chair', imageUrl: 'https://profine.pk/wp-content/uploads/2024/12/WhatsApp-Image-2025-03-06-at-2.06.38-PM-1.webp', size: 'default' },
    { id: 6, label: 'Minimalist Sofa', imageUrl: 'https://www.coxandcox.co.uk/media/catalog/product/a/w/aw16-k-ratchair.png?quality=80&fit=bounds&height=800&width=800', size: 'default' },
    { id: 7, label: 'Modern Chair', imageUrl: 'https://profine.pk/wp-content/uploads/2024/12/WhatsApp-Image-2025-03-06-at-2.06.38-PM-1.webp', size: 'default' },
    { id: 8, label: 'Minimalist Sofa', imageUrl: 'https://www.coxandcox.co.uk/media/catalog/product/a/w/aw16-k-ratchair.png?quality=80&fit=bounds&height=800&width=800', size: 'default' },
];

interface ProductSliderProps {
  variant?: 'default' | 'system';
  titleTop?: string;
  titleBottom?: string;
}

const ProductSlider: React.FC<ProductSliderProps> = ({ variant = 'default', titleTop, titleBottom }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true });

  // YENİ: Scroll bar üçün state
  const [scrollProgress, setScrollProgress] = useState(0);

  const currentStyles = variant === 'system' ? systemStyles : styles;

  // YENİ: Scroll hadisəsini dinləyən funksiya
  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const progress = emblaApi.scrollProgress();
    setScrollProgress(Math.min(100, Math.max(0, progress * 100)));
  }, [emblaApi]);

  // YENİ: emblaApi hazır olanda scroll event-ini qoşmaq üçün
  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on('scroll', onScroll);
    emblaApi.on('reInit', onScroll);
  }, [emblaApi, onScroll]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className={currentStyles.sliderMain}>
      <div className={currentStyles.container}>
        <div className={currentStyles.sliderTitle}>
          <div className={currentStyles.sliderTitleText}>
            <span>
              {titleTop ?? 'Making room for personality.'} <br />
              {titleBottom ?? '36 modules, 4 depths and 43 colours.'}
            </span>
          </div>
          {/* DƏYİŞİKLİK: Oxları saxlayan div-ə yeni klass əlavə edirik */}
          <div className={currentStyles.desktopNav}>
            <svg
              onClick={scrollPrev}
              xmlns="http://www.w3.org/2000/svg" width="30" height="10" viewBox="0 0 30 10" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ cursor: 'pointer' }}
            >
              <path d="M25 5H5m0 0l4 4m-4-4l4-4" />
            </svg>
            <svg
              onClick={scrollNext}
              xmlns="http://www.w3.org/2000/svg" width="40" height="10" viewBox="0 0 30 10" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ cursor: 'pointer' }}
            >
              <path d="M5 5h20m0 0l-4 4m4-4l-4-4" />
            </svg>
          </div>
        </div>
      </div>

      <div className={currentStyles.embla} ref={emblaRef}>
        <div className={currentStyles.embla__container}>
          {slideData.map((slide) => (
            <div className={currentStyles.embla__slide} key={slide.id}>
              <CategoryCard
                label={slide.label}
                imageUrl={slide.imageUrl}
                variant={variant}
                size={slide.size}
              />
            </div>
          ))}
        </div>
      </div>

      {/* YENİ: Mobil üçün progress bar */}
      <div className={currentStyles.progressBar}>
        <div 
          className={currentStyles.progressBarFill} 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </section>
  );
};

export default ProductSlider;
