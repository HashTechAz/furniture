import React from "react";
import styles from "./SustainabilityGallery.module.css";
import Image from "next/image";
// Komponentin qəbul edəcəyi propları təyin edirik
interface GalleryProps {
  images?: [string, string]; // Həmişə iki şəkil linki gözləyir
  layout?: 'default' | 'reversed';
}

const SustainabilityGallery = ({ images, layout = 'default' }: GalleryProps) => {
  // Əgər props ilə şəkillər gəlməyibsə, standart şəkilləri istifadə edirik
  const galleryImages = images || [
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/factory/montana_factory_2022_20_h.jpg?mode=crop&width=1520&height=2027",
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/factory/montana_factory_2022_21_h.jpg?mode=crop&width=1520&height=2027",
  ];

  return (
    // `layout` propuna görə `.reversed` klası əlavə olunur
    <section className={`${styles.susImgBox} ${layout === 'reversed' ? styles.reversed : ''}`}>
      <div className={styles.leftImg}>
        <Image src={galleryImages[0]} alt="Gallery image 1" />
      </div>
      <div className={styles.leftImg}>
        <Image src={galleryImages[1]} alt="Gallery image 2" />
      </div>
    </section>
  );
};

export default SustainabilityGallery;