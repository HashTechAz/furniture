"use client";

import React, { useState } from "react";
import styles from "./ProductHero.module.css";

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
  const colorOptions = ["Ruby", "Darkblue", "Black", "White", "Oak"];
  const baseTypes = ["Wall", "Floor"];

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroMain}>
        <div className={styles.heroItem}>
          <ul>
            <li>
              <div className={styles.heroItemIcons}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="#167"
                    stroke="#333"
                    strokeWidth="1.5"
                  />
                  <circle cx="12" cy="12" r="6" fill="#fff" />
                </svg>
              </div>
              <span>Colour: 167 Ruby</span>
            </li>
            <li>
              <div className={styles.heroItemIcons}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="12"
                    rx="2"
                    fill="none"
                    stroke="#333"
                    strokeWidth="2"
                  />
                  <path
                    d="M7 6V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"
                    stroke="#333"
                    strokeWidth="2"
                  />
                  <path d="M12 10v4" stroke="#333" strokeWidth="2" />
                  <path d="M9 12h6" stroke="#333" strokeWidth="2" />
                </svg>
              </div>
              <span>Position: Suspension Rail</span>
            </li>
            <li>
              <div className={styles.heroItemIcons}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 3v18" stroke="#333" strokeWidth="2" />
                  <path d="M3 3h18" stroke="#333" strokeWidth="2" />
                  <path d="M3 6h4" stroke="#333" strokeWidth="2" />
                  <path d="M3 9h4" stroke="#333" strokeWidth="2" />
                  <path d="M3 12h4" stroke="#333" strokeWidth="2" />
                  <path d="M3 15h4" stroke="#333" strokeWidth="2" />
                  <path d="M3 18h4" stroke="#333" strokeWidth="2" />
                  <path d="M9 3v4" stroke="#333" strokeWidth="2" />
                  <path d="M12 3v4" stroke="#333" strokeWidth="2" />
                  <path d="M15 3v4" stroke="#333" strokeWidth="2" />
                  <path d="M18 3v4" stroke="#333" strokeWidth="2" />
                </svg>
              </div>
              <span>Depth: Depth 38 cm</span>
            </li>
            <li>
              <div className={styles.heroItemIcons}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="2"
                    fill="none"
                    stroke="#333"
                    strokeWidth="2"
                  />
                  <circle cx="8.5" cy="8.5" r="1.5" fill="#333" />
                  <path d="M21 15l-5-5L5 21" stroke="#333" strokeWidth="2" />
                </svg>
              </div>
              <span>Gallery</span>
            </li>
          </ul>
        </div>

        <div className={styles.heroProductImage}>
          <img src={product.images[selectedImage]} alt={product.title} />
        </div>

        <div className={styles.heroProductDescription}>
          <h2>Shelf 1112 (SHOW)</h2>
          <div className={styles.tabList}>
            <span>Description</span>
            <span>Specifications</span>
          </div>
          <p>
            The 13 open bookcase (SHOW) provides the perfect storage as a
            bookcase for the living room, a storage box for the hallway or
            chi...
          </p>
          <p>Designer: Peter J. Lassen</p>

          <div className={styles.tabMore}>
            <span>Read More</span>
            <span>See downloads</span>
          </div>
          <a href="#" className={styles.heroButton}>
            Find Montana Store
          </a>
          <div className={styles.productInfo}>
            <div className={styles.infoRow}>
              <span>10 year guarantee</span>
              <span>EU Ecolabel certified</span>
            </div>
            <div className={styles.infoRow}>
              <span>Danish production</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
