import React from 'react';
import styles from './ProductHero.module.css';

const ProductHero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          All Products
        </h1>
      </div>
    </section>
  );
};

export default ProductHero;