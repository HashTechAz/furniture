import React from 'react';
import styles from './ProductHero.module.css';

interface ProductHeroProps {
  title?: string;
}

const ProductHero = ({ title = 'All Products' }: ProductHeroProps) => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;