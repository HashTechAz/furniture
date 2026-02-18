"use client";
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
  measurements: string;
  position: string;
  price?: string;
  priority?: boolean;
}

const ProductCard = ({
  id,
  imageSrc,
  imageSrcHover,
  title,
  color,
  measurements,
  position,
  price,
  priority = false,
}: ProductCardProps) => {
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
            fill
            src={isHovered ? imageSrcHover : imageSrc}
            alt={title ?? ""}
            className={styles.image}
            sizes="(max-width: 768px) 260px, (max-width: 1024px) 300px, 350px"
            priority={priority}
          />
          <div className={styles.productButton}>
            Configure product
          </div>
        </div>

        {/* --- DEĞİŞİKLİK BURADA --- */}
        <div className={styles.cardInfo}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardColor}>Color: {color}</p>
          <p className={styles.cardMeasurements}>
            Measurements: {measurements}
          </p>
          <p className={styles.cardPosition}>Position: {position}</p>
          {price != null && price !== '' && (
            <p className={styles.cardPrice}>
              Qiymət: <span className={styles.cardPriceBold}>{price} ₼</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
