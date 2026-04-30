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
  createdAt?: string; // Admin paneldən gələn yaranma tarixi
  isNew?: boolean; // Manual olaraq "yeni" olduğunu bildirmək üçün
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
  createdAt,
  isNew = false,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Məhsulun yaranma tarixindən keçən günlərin sayını hesablayırıq
  // 10 gündən az keçibsə, "yeni" hesab edirik
  const isNewProduct = isNew || (createdAt 
    ? (new Date().getTime() - new Date(createdAt).getTime()) / (1000 * 3600 * 24) <= 10
    : false);

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
          {isNewProduct && (
            <div className={styles.newsBadge}>NEWS</div>
          )}
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
          <p className={styles.cardText}>Rəng: {color}</p>
          <p className={styles.cardText}>Ölçülər: {measurements}</p>
          <p className={styles.cardText}>Kolleksiya: {position}</p>

          {price && price !== "0" && (
            <p className={styles.cardPrice}>Qiymət: {price} ₼</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;