'use client';

import React from 'react';
import styles from './ProductHero.module.css';

interface Product {
  id: number;
  title: string;
  color: string;
  measurements: string;
  position: string;
  description: string;
  price: string;
  images: string[];
  specifications: {
    material: string;
    finish: string;
    weight: string;
    assembly: string;
  };
}

interface ProductHeroProps {
  product: Product;
}

const ProductHero = ({ product }: ProductHeroProps) => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <img
            src={product.images[0]}
            alt={product.title}
            className={styles.heroImage}
          />
        </div>
        
        <div className={styles.contentSection}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.price}>{product.price}</p>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.details}>
            <p className={styles.measurements}>{product.measurements}</p>
            <p className={styles.position}>{product.position}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
