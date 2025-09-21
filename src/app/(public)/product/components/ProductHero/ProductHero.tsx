import React from 'react';
import styles from './ProductHero.module.css';

const ProductHero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Ripply
        </h1>
        <p className={styles.description}>
          The Ripply shelving unit is a new take on the classic Montana shelf. A ripple effect on the back panel adds a vibrant and playful expression.
        </p>
      </div>
    </section>
  );
};

export default ProductHero;