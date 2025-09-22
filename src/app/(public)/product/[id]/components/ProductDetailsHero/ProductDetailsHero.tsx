'use client';

import React, { useState } from 'react';
import styles from './ProductDetailsHero.module.css';

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

interface ProductDetailsHeroProps {
  product: Product;
}

const ProductDetailsHero = ({ product }: ProductDetailsHeroProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [selectedBaseType, setSelectedBaseType] = useState('wall');

  const availableColors = ['Ruby', 'New White', 'Anthracite', 'Clay', 'Parsley'];
  const baseTypes = [
    { value: 'wall', label: 'Wall' },
    { value: 'legs', label: 'Legs' },
    { value: 'castor', label: 'Castor' }
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.imageGallery}>
        <div className={styles.mainImage}>
          <img
            src={product.images[selectedImageIndex]}
            alt={product.title}
            className={styles.image}
          />
        </div>
        
        {product.images.length > 1 && (
          <div className={styles.thumbnailContainer}>
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`${styles.thumbnail} ${
                  selectedImageIndex === index ? styles.active : ''
                }`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img src={image} alt={`${product.title} view ${index + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.productInfo}>
        <div className={styles.productHeader}>
          <h1 className={styles.title}>{product.title}</h1>
          <div className={styles.priceContainer}>
            <span className={styles.price}>{product.price}</span>
          </div>
        </div>

        <div className={styles.configuration}>
          <div className={styles.configSection}>
            <h3 className={styles.configTitle}>Colour</h3>
            <div className={styles.colorOptions}>
              {availableColors.map((color) => (
                <button
                  key={color}
                  className={`${styles.colorOption} ${
                    selectedColor === color ? styles.selected : ''
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  <span className={styles.colorName}>{color}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.configSection}>
            <h3 className={styles.configTitle}>Base Type</h3>
            <div className={styles.baseTypeOptions}>
              {baseTypes.map((type) => (
                <button
                  key={type.value}
                  className={`${styles.baseTypeOption} ${
                    selectedBaseType === type.value ? styles.selected : ''
                  }`}
                  onClick={() => setSelectedBaseType(type.value)}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.productDetails}>
          <p className={styles.measurements}>{product.measurements}</p>
          <p className={styles.position}>{product.position}</p>
          <p className={styles.description}>{product.description}</p>
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.configureButton}>
            Configure Product
          </button>
          <button className={styles.addToCartButton}>
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsHero;
