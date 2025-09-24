'use client';

import React, { useState } from 'react';
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

// İkonlar
const ColorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <circle cx="10" cy="10" r="4" fill="currentColor"/>
  </svg>
);

const PositionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="10" width="16" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <rect x="6" y="2" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
);

const GalleryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="7" cy="7" r="1.5" fill="currentColor"/>
    <path d="M2 14L8 8L11 11L18 4" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const ProductHero = ({ product }: ProductHeroProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Renk seçenekleri
  const colorOptions = ['Ruby', 'Darkblue', 'Black', 'White', 'Oak'];
  const baseTypes = ['Wall', 'Floor'];

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        {/* Sol Sidebar */}
        <aside className={styles.leftSidebar}>
          <div className={styles.sidebarItem}>
            <ColorIcon />
            <span className={styles.sidebarText}>Colour: {product.color}</span>
          </div>
          <div className={styles.sidebarItem}>
            <PositionIcon />
            <span className={styles.sidebarText}>Position: {product.position}</span>
          </div>
          <div className={styles.sidebarItem}>
            <GalleryIcon />
            <span className={styles.sidebarText}>Gallery</span>
          </div>
          <div className={styles.scrollIndicator}>
            <span>SCROLL TO VIEW MORE</span>
          </div>
        </aside>

        {/* Orta Alan - Ürün Görseli */}
        <div className={styles.imageSection}>
          <div className={styles.mainImageWrapper}>
            <img 
              src={product.images[selectedImage]} 
              alt={product.title}
              className={styles.mainImage}
            />
          </div>
          <div className={styles.thumbnailList}>
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`View ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Sağ Alan - Ürün Bilgileri */}
        <div className={styles.infoSection}>
          <div className={styles.productHeader}>
            <h1 className={styles.productTitle}>{product.title}</h1>
            <p className={styles.productPrice}>{product.price}</p>
          </div>

          <div className={styles.configurator}>
            {/* Renk Seçimi */}
            <div className={styles.configGroup}>
              <h3 className={styles.configLabel}>Colour</h3>
              <div className={styles.colorGrid}>
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    className={`${styles.colorButton} ${product.color === color ? styles.selected : ''}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Base Type Seçimi */}
            <div className={styles.configGroup}>
              <h3 className={styles.configLabel}>Base type</h3>
              <div className={styles.baseTypeOptions}>
                {baseTypes.map((type) => (
                  <button
                    key={type}
                    className={`${styles.baseButton} ${type === 'Wall' ? styles.selected : ''}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Ölçüler */}
            <div className={styles.configGroup}>
              <h3 className={styles.configLabel}>Measurement</h3>
              <div className={styles.measurementInfo}>
                <p className={styles.measurementText}>{product.measurements}</p>
              </div>
            </div>
          </div>

          {/* Ürün Açıklaması */}
          <div className={styles.productDescription}>
            <p>{product.description}</p>
          </div>

          {/* Aksiyon Butonları */}
          <div className={styles.actionArea}>
            <button className={styles.configureBtn}>Configure</button>
            <button className={styles.addToCartBtn}>Add to cart</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;