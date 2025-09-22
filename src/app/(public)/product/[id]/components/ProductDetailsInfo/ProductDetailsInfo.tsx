import React from 'react';
import styles from './ProductDetailsInfo.module.css';

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

interface ProductDetailsInfoProps {
  product: Product;
}

const ProductDetailsInfo = ({ product }: ProductDetailsInfoProps) => {
  return (
    <section className={styles.infoSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Product Information</h2>
        
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <h3 className={styles.infoLabel}>Dimensions</h3>
            <p className={styles.infoValue}>{product.measurements}</p>
          </div>
          
          <div className={styles.infoItem}>
            <h3 className={styles.infoLabel}>Color</h3>
            <p className={styles.infoValue}>{product.color}</p>
          </div>
          
          <div className={styles.infoItem}>
            <h3 className={styles.infoLabel}>Position</h3>
            <p className={styles.infoValue}>{product.position}</p>
          </div>
          
          <div className={styles.infoItem}>
            <h3 className={styles.infoLabel}>Material</h3>
            <p className={styles.infoValue}>{product.specifications.material}</p>
          </div>
        </div>
        
        <div className={styles.description}>
          <h3 className={styles.descriptionTitle}>Description</h3>
          <p className={styles.descriptionText}>{product.description}</p>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsInfo;
