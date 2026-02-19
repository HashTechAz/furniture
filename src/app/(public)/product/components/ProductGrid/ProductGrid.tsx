"use client";

import React from "react";
import styles from "./ProductGrid.module.css";
import ProductCard from "@/components/ProductCard/ProductCard";
import { FrontendProduct } from "@/lib/products";

interface ProductGridProps {
  products: FrontendProduct[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;
}

const ProductGrid = ({
  products,
  onLoadMore,
  hasMore = false,
  loadingMore = false,
}: ProductGridProps) => {
  const totalItems = products.length;
  const shownItems = products.length;

  if (!products || products.length === 0) {
    return (
      <div className={styles.gridContainer}>
        <div className={styles.noProducts}>
          Hələlik heç bir məhsul tapılmadı.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.gridContainer}>
      <div className={styles.countDisplay}>Show {shownItems} items</div>

      <div className={styles.grid}>
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            color={product.color}
            measurements={product.measurements}
            position={product.position}
            price={product.price}
            imageSrc={product.imageSrc}
            imageSrcHover={product.imageSrcHover}
            priority={index < 8}
          />
        ))}
      </div>

      <div className={styles.paginationControls}>
        <p className={styles.itemCount}>
          Showing {shownItems} out of {totalItems} items
        </p>

        {hasMore && (
          <button
            className={styles.loadMoreButton}
            onClick={onLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;