'use client';

import React, { useState } from 'react';
import styles from './ProductDetailsGallery.module.css';

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

interface ProductDetailsGalleryProps {
  product: Product;
}

const ProductDetailsGallery = ({ product }: ProductDetailsGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (product.images.length <= 1) {
    return null;
  }

  return (
    <section className={styles.gallerySection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Product Gallery</h2>
        
        <div className={styles.gallery}>
          <div className={styles.mainImageContainer}>
            <img
              src={product.images[selectedImageIndex]}
              alt={`${product.title} - View ${selectedImageIndex + 1}`}
              className={styles.mainImage}
            />
          </div>
          
          <div className={styles.thumbnailGrid}>
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`${styles.thumbnail} ${
                  selectedImageIndex === index ? styles.active : ''
                }`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`${product.title} - View ${index + 1}`}
                  className={styles.thumbnailImage}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsGallery;
