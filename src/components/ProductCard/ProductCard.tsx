"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import styles from "./ProductCard.module.css";

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

  if (!imageSrc) return null;

  return (
    <Link
      href={id ? `/product/${id}` : "#"}
      className={styles.cardLink}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.card}>
        {/* Şəkil Hissəsi */}
        <div className={styles.imageWrapper}>
          <Image
            fill
            src={isHovered ? imageSrcHover : imageSrc}
            alt={title ?? "Product Image"}
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
          />
          <div className={styles.productButton}>Configure product</div>
        </div>

        {/* Məlumat Hissəsi */}
        <div className={styles.cardInfo}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardText}>Colour: {color}</p>
          <p className={styles.cardText}>Measurements: {measurements}</p>
          <p className={styles.cardText}>Position: {position}</p>

          {price && price !== "0" && (
            <p className={styles.cardPrice}>Displayed model {price} ₼</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;