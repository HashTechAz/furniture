"use client"; // "Load more" düyməsi gələcəkdə işləsin deyə client component edirik

import React from "react";
import styles from "./ProductGrid.module.css";
import ProductCard from "@/components/ProductCard/ProductCard";
import { FrontendProduct } from "@/lib/products"; // Yaratdığımız tipi import edirik

interface ProductGridProps {
  products: FrontendProduct[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  // --- STATİK DATANI SİLDİK ---
  // Artıq datanı yuxarıdan (props-dan) alırıq

  const totalItems = products.length; // Real say
  const shownItems = products.length; // Hələlik hamısını göstəririk

  // Əgər məhsul yoxdursa
  if (!products || products.length === 0) {
    return (
      <div className={styles.gridContainer}>
         <div className={styles.noProducts} style={{textAlign: 'center', padding: '50px'}}>
            Hələlik heç bir məhsul tapılmadı.
         </div>
      </div>
    );
  }

  return (
    <div className={styles.gridContainer}>
      <div className={styles.countDisplay}>Show {shownItems} items</div>

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            color={product.color}
            measurements={product.measurements}
            position={product.position}
            imageSrc={product.imageSrc}       // Mapper-də adını 'imageSrc' qoymuşduq
            imageSrcHover={product.imageSrcHover} // Mapper-də adını 'imageSrcHover' qoymuşduq
          />
        ))}
      </div>

      <div className={styles.paginationControls}>
        <p className={styles.itemCount}>
          Showing {shownItems} out of {totalItems} items
        </p>
        
        {/* Backend pagination hələ yoxdur deyə bu düyməni sadəcə vizual saxlayırıq */}
        {/* <button className={styles.loadMoreButton}>
             Show more
        </button> 
        */}
      </div>
    </div>
  );
};

export default ProductGrid;