import { useState } from "react";
import Link from "next/link";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  imageSrc: string;
  imageSrcHover: string;
  title: string;
  color: string;
  size: string;
}

const ProductCard = ({ imageSrc, imageSrcHover, title, color, size }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!imageSrc) {
    return null;
  }

  return (
    <Link
      href="#"
      className={styles.cardLink}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img
            src={isHovered ? imageSrcHover : imageSrc}
            alt={title}
            className={styles.image}
          />
          <a href="#" className={styles.productButton}>
            Quick view
          </a>
        </div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDetails}>
          <span className={styles.cardColor}>{color}</span> / <span className={styles.cardSize}>{size}</span>
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;