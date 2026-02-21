"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./ProductSlider.module.css";
import systemStyles from "./ProductSliderSystem.module.css";
import CategoryCard from "../CategoryCard/CategoryCard";
import { getCategories, Category } from "@/lib/categories";

interface SlideData {
  id: number;
  label: string;
  imageUrl: string;
  size?: "wide" | "normal" | "default";
}

interface ProductSliderProps {
  variant?: "default" | "system";
  titleTop?: string;
  titleBottom?: string;
  slideDataProp?: SlideData[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({
  variant = "default",
  titleTop,
  titleBottom,
  slideDataProp,
}) => {
  const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Yalnız slideDataProp verilməyəndə kateqoriyaları yüklə
    if (!slideDataProp) {
      getCategories()
        .then((data) => setFetchedCategories(Array.isArray(data) ? data : []))
        .catch(console.error);
    }
  }, [slideDataProp]);

  // Əgər kənardan prop olaraq məlumat gəlibsə onu istifadə et, yoxsa API-dən gələn kateqoriyaları
  const currentSlideData: SlideData[] = slideDataProp || fetchedCategories.map((cat, index) => ({
    id: cat.id,
    label: cat.name,
    imageUrl: cat.imageUrl || "/images/placeholder.jpg",
    size: "normal" // Şəkillərin eyni ölçüdə qalması üçün 'normal'
  }));

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true,
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const currentStyles = variant === "system" ? systemStyles : styles;

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const progress = emblaApi.scrollProgress();
    setScrollProgress(Math.min(100, Math.max(0, progress * 100)));
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", onScroll);
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
              {titleTop ?? "Making room for personality."} <br />
              {titleBottom ?? "36 modules, 4 depths and 43 colours."}
            </span>
          </div>
          <div className={currentStyles.desktopNav}>
            <svg
              onClick={scrollPrev}
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="10"
              viewBox="0 0 30 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ cursor: "pointer" }}
            >
              {" "}
              <path d="M25 5H5m0 0l4 4m-4-4l4-4" />{" "}
            </svg>
            <svg
              onClick={scrollNext}
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="10"
              viewBox="0 0 30 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ cursor: "pointer" }}
            >
              {" "}
              <path d="M5 5h20m0 0l-4 4m4-4l-4-4" />{" "}
            </svg>
          </div>
        </div>
      </div>

      <div className={currentStyles.embla} ref={emblaRef}>
        <div className={currentStyles.embla__container}>
          {currentSlideData.map((slide) => (
            <div className={currentStyles.embla__slide} key={slide.id}>
              <CategoryCard
                label={slide.label}
                imageUrl={slide.imageUrl}
                variant={variant}
                size={slide.size as "wide" | "normal" | "default"}
              />
            </div>
          ))}
        </div>
      </div>

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