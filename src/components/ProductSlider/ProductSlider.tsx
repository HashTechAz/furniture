"use client";

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './ProductSlider.module.css';
import CategoryCard from '../CategoryCard/CategoryCard';

// TypeScript üçün məlumat strukturu
interface SlideData {
  id: number;
  label: string;
  imageUrl: string;
}

// Məhsul məlumatları (yazısız şəkillərlə)
const slideData: SlideData[] = [
    { id: 1, label: 'Modern Chair', imageUrl: 'https://picsum.photos/320/400?random=1' },
    { id: 2, label: 'Minimalist Sofa', imageUrl: 'https://picsum.photos/320/400?random=2' },
    { id: 3, label: 'Wooden Table', imageUrl: 'https://picsum.photos/320/400?random=3' },
    { id: 4, label: 'Tall Bookcase', imageUrl: 'https://picsum.photos/320/400?random=4' },
    { id: 5, label: 'Sideboard', imageUrl: 'https://picsum.photos/320/400?random=5' },
    { id: 6, label: 'Designer Lamp', imageUrl: 'https://picsum.photos/320/400?random=6' },
    { id: 7, label: 'Cozy Armchair', imageUrl: 'https://picsum.photos/320/400?random=7' },
];

const ProductSlider: React.FC = () => {
  // Embla hook-unu çağırırıq.
  // loop: false -> sona çatdıqda başa qayıtmasın.
  // dragFree: true -> mausla sürüşdürəndə fizika-əsaslı ətalət effekti verir.
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true });

  // Oxlar üçün idarəetmə funksiyaları
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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

      {/* Embla Carousel üçün xüsusi struktur */}
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slideData.map((slide) => (
            <div className={styles.embla__slide} key={slide.id}>
              <CategoryCard
                label={slide.label}
                imageUrl={slide.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;