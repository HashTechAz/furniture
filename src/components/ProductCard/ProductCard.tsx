'use client';
import Image from "next/image"; 
import { useState } from "react";
import Link from "next/link";
import styles from "./ProductCard.module.css";

// Kartın alacağı props'ları güncelliyoruz
interface ProductCardProps {
  id?: number;
  imageSrc: string;
  imageSrcHover: string;
  title: string;
  color: string;
  measurements: string; // 'size' yerine 'measurements'
  position: string;
}

const ProductCard = ({ id, imageSrc, imageSrcHover, title, color, measurements, position }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!imageSrc) {
    return null;
  }

  return (
    <Link
      href={id ? `/product/${id}` : "#"}
      className={styles.cardLink}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image
            src={isHovered ? imageSrcHover : imageSrc}
            alt={title}
            className={styles.image}
          />
          <button type="button" className={styles.productButton}>
            Configure product
          </button>
        </div>

        {/* --- DEĞİŞİKLİK BURADA --- */}
        <div className={styles.cardInfo}>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardColor}>Color: {color}</p>
            <p className={styles.cardMeasurements}>Measurements: {measurements}</p>
            <p className={styles.cardPosition}>Position: {position}</p>
        </div>

      </div>
    </Link>
  );
};

export default ProductCard;