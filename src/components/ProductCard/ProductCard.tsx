import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  imageSrc: string;
  title: string;
  price: string;
}

const ProductCard = ({ imageSrc, title, price }: ProductCardProps) => {
  return (
    <Link href="#" className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img
            src={imageSrc}
            alt={title}
            className={styles.image}
          />
        </div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardPrice}>{price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;