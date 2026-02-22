import React from 'react';
import Link from 'next/link';
import styles from './NavbarCategoryCard.module.css';
import Image from 'next/image';
interface NavbarCategoryCardProps {
  imageUrl: string;
  label: string;
  href: string;
  price?: string | number;
  description?: string;
}

const NavbarCategoryCard: React.FC<NavbarCategoryCardProps> = ({ imageUrl, label, href, price, description }) => {
  return (
    <Link href={href} className={styles.cardLink}>
      <div className={styles.imageWrapper}>
        <Image fill src={imageUrl} alt={label ?? ''} className={styles.cardImage} sizes="(max-width: 768px) 100vw, 300px" />
      </div>
      <div className={styles.textWrapper}>
        <h3 className={styles.cardTitle}>{label}</h3>
        {description && <p className={styles.cardDescription}>{description}</p>}
        {price && <p className={styles.cardPrice}>{price} ₼</p>}
      </div>
    </Link>
  );
};

export default NavbarCategoryCard;