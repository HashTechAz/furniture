import React from 'react';
import Link from 'next/link';
import styles from './NavbarCategoryCard.module.css';
import Image from 'next/image'; 
interface NavbarCategoryCardProps {
  imageUrl: string;
  label: string;
  href: string;
}

const NavbarCategoryCard: React.FC<NavbarCategoryCardProps> = ({ imageUrl, label, href }) => {
  return (
    <Link href={href} className={styles.cardLink}>
      <div className={styles.imageWrapper}>
         <Image  fill src={imageUrl} alt={label ?? ""} className={styles.cardImage} />
      </div>
      <h3 className={styles.cardTitle}>{label}</h3>
    </Link>
  );
};

export default NavbarCategoryCard;