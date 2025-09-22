import React from 'react';
import styles from './ProductDetailsSpecs.module.css';

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

interface ProductDetailsSpecsProps {
  product: Product;
}

const ProductDetailsSpecs = ({ product }: ProductDetailsSpecsProps) => {
  const specifications = [
    { label: 'Dimensions', value: product.measurements },
    { label: 'Material', value: product.specifications.material },
    { label: 'Finish', value: product.specifications.finish },
    { label: 'Weight', value: product.specifications.weight },
    { label: 'Assembly', value: product.specifications.assembly },
    { label: 'Designer', value: 'Peter J. Lassen' },
    { label: 'Collection', value: 'Shelf' },
    { label: 'Warranty', value: '2 years' },
  ];

  return (
    <section className={styles.specsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Specifications</h2>
        
        <div className={styles.specsTable}>
          {specifications.map((spec, index) => (
            <div key={index} className={styles.specRow}>
              <div className={styles.specLabel}>{spec.label}</div>
              <div className={styles.specValue}>{spec.value}</div>
            </div>
          ))}
        </div>
        
        <div className={styles.additionalInfo}>
          <h3 className={styles.additionalTitle}>Additional Information</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <h4 className={styles.infoItemTitle}>Assembly</h4>
              <p className={styles.infoItemText}>Professional assembly recommended</p>
            </div>
            <div className={styles.infoItem}>
              <h4 className={styles.infoItemTitle}>Sustainability</h4>
              <p className={styles.infoItemText}>Eco-friendly materials and production</p>
            </div>
            <div className={styles.infoItem}>
              <h4 className={styles.infoItemTitle}>Origin</h4>
              <p className={styles.infoItemText}>Made in Europe</p>
            </div>
            <div className={styles.infoItem}>
              <h4 className={styles.infoItemTitle}>Care Instructions</h4>
              <p className={styles.infoItemText}>Clean with dry cloth only</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsSpecs;
