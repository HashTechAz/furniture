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


const ProductHero = ({ product }: ProductHeroProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Renk seçenekleri
  const colorOptions = ['Ruby', 'Darkblue', 'Black', 'White', 'Oak'];
  const baseTypes = ['Wall', 'Floor'];

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroMain}>
        <div className={styles.heroItem}>
          <ul>
            <li>
              <div className={styles.heroItemIcons}></div>
              <span>Colour: 167 Ruby</span>
            </li>
            <li>
              <div className={styles.heroItemIcons}></div>
              <span>Colour: 167 Ruby</span>
            </li>
            <li>
              <div className={styles.heroItemIcons}></div>
              <span>Colour: 167 Ruby</span>
            </li>
            <li>
              <div className={styles.heroItemIcons}></div>
              <span>Colour: 167 Ruby</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;