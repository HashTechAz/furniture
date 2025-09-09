'use client';

import { useState, useEffect } from 'react';
import styles from './Carousel.module.css';

interface CarouselSlide {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function Carousel({ slides, autoPlay = true, autoPlayInterval = 5000 }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  if (slides.length === 0) return null;

  return (
    <div className={styles.carousel}>
      <div 
        className={styles.carouselContainer}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className={styles.carouselSlide}>
            <div className={styles.carouselImage}>
              {slide.image}
            </div>
            <div className={styles.carouselContent}>
              <h3 className={styles.carouselTitle}>{slide.title}</h3>
              <p className={styles.carouselDescription}>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button 
            className={`${styles.carouselControls} ${styles.prev}`}
            onClick={goToPrevious}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button 
            className={`${styles.carouselControls} ${styles.next}`}
            onClick={goToNext}
            aria-label="Next slide"
          >
            ›
          </button>

          <div className={styles.carouselIndicators}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.carouselIndicator} ${index === currentSlide ? styles.active : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
