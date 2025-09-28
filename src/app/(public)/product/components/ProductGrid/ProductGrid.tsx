import React from "react";
import styles from "./ProductGrid.module.css";
import ProductCard from "@/components/ProductCard/ProductCard";

const ProductGrid = () => {
  // Senin sağladığın orijinal ürün verileri
  const products = [
    {
      id: 1,
      title: "Shelf 1323",
      color: "Darkblue",
      measurements: "W 69.6 x H 69.6 x D 30 cm",
      position: "Legs H12.6 cm",
      image:
        "https://artist.v2.londondynamics.com/image_by_config/28d24461-579e-4156-99c4-ca336f4369db/001241/1.jpg?feature=CASE%20FINISH:154%20Azure&feature=BASE%20TYPE:WALL&bgcolour=f5f5f5&height=1080&width=1080",
      imageHover:
        "https://artist.v2.londondynamics.com/image_by_config/28d24461-579e-4156-99c4-ca336f4369db/001223/31.jpg?feature=CASE%20FINISH:168%20Clay&feature=FRONT%20FINISH:168%20Clay&feature=BASE%20TYPE:Castor&bgcolour=f5f5f5&height=280&width=280",
    },
    {
      id: 2,
      title: "READ spacious bookshelf",
      color: "Truffle",
      measurements: "W 139.2 x H 215.8 x D 30 cm",
      position: "Plinth H3 cm",
      image:
        "https://artist.v2.londondynamics.com/image_by_config/28d24461-579e-4156-99c4-ca336f4369db/001220/1.jpg?feature=CASE%20FINISH:159%20Camomile&feature=BASE%20TYPE:WALL&feature=FRONT%20FINISH:159%20Camomile&bgcolour=f5f5f5&height=1080&width=1080",
      imageHover:
        "https://i.pinimg.com/1200x/de/13/7e/de137e76fb572bfa0ef489954b703ace.jpg",
    },
    {
      id: 3,
      title: "LOOM slim bookcase",
      color: "Flint",
      measurements: "W 46.8 x H 215.8 x D 30 cm",
      position: "Plinth H7 cm",
      image:
        "https://artist.v2.londondynamics.com/image_by_config/28d24461-579e-4156-99c4-ca336f4369db/001261/1.jpg?feature=CASE%20FINISH:162%20Hokkaido&feature=BASE%20TYPE:WALL&bgcolour=f5f5f5&height=1080&width=1080",
      imageHover:
        "https://b2c.montana-episerver.com/globalassets/ambient-images/product-images/loom/loom_flint_p_h_1.jpg?w=800&h=800&mode=max",
    },
    {
      id: 4,
      title: "KIMPOP SHOW",
      color: "KIMPOP",
      measurements: "W 69.6 x H 69.6 x D 30 cm",
      position: "Suspension rail",
      image:
        "https://artist.v2.londondynamics.com/image_by_config/28d24461-579e-4156-99c4-ca336f4369db/001324/1.jpg?feature=CASE%20FINISH:36%20Coal&feature=BASE%20TYPE:WALL&feature=FRONT%20FINISH:36%20Coal&bgcolour=f5f5f5&height=1080&width=1080",
      imageHover:
        "https://i.pinimg.com/736x/bd/44/ad/bd44adeb279bea270391d53adf330068.jpg",
    },
    {
      id: 5,
      title: "Shelf 1323",
      color: "Darkblue",
      measurements: "W 69.6 x H 69.6 x D 30 cm",
      position: "Legs H12.6 cm",
      image:
        "https://artist.v2.londondynamics.com/image_by_config/28d24461-579e-4156-99c4-ca336f4369db/001627/1.jpg?feature=CASE%20FINISH:158%20Oat&feature=BASE%20TYPE:WALL&feature=FRONT%20FINISH:158%20Oat&bgcolour=f5f5f5&height=1080&width=1080",
      imageHover:
        "https://artist.v2.londondynamics.com/image_by_config/28d24461-579e-4156-99c4-ca336f4369db/001223/31.jpg?feature=CASE%20FINISH:168%20Clay&feature=FRONT%20FINISH:168%20Clay&feature=BASE%20TYPE:Castor&bgcolour=f5f5f5&height=280&width=280",
    },
    {
      id: 6,
      title: "READ spacious bookshelf",
      color: "Truffle",
      measurements: "W 139.2 x H 215.8 x D 30 cm",
      position: "Plinth H3 cm",
      image:
        "https://artist.v2.londondynamics.com/image_by_config/28d24461-579e-4156-99c4-ca336f4369db/007112/1.jpg?feature=CASE%20FINISH:166%20Acacia&feature=BASE%20TYPE:WALL&bgcolour=f5f5f5&height=1080&width=1080",
      imageHover:
        "https://i.pinimg.com/1200x/de/13/7e/de137e76fb572bfa0ef489954b703ace.jpg",
    },
    {
      id: 7,
      title: "LOOM slim bookcase",
      color: "Flint",
      measurements: "W 46.8 x H 215.8 x D 30 cm",
      position: "Plinth H7 cm",
      image:
        "https://artist.v2.londondynamics.com/image_by_config/28d24461-579e-4156-99c4-ca336f4369db/0000read/1.jpg?feature=CASE%20FINISH:141%20Truffle&feature=BASE%20TYPE:PLINTH%20H7&bgcolour=f5f5f5&height=1080&width=1080",
      imageHover:
        "https://b2c.montana-episerver.com/globalassets/ambient-images/product-images/loom/loom_flint_p_h_1.jpg?w=800&h=800&mode=max",
    },
    {
      id: 8,
      title: "KIMPOP SHOW",
      color: "KIMPOP",
      measurements: "W 69.6 x H 69.6 x D 30 cm",
      position: "Suspension rail",
      image:
        "https://artist.v2.londondynamics.com/image_by_config/28d24461-579e-4156-99c4-ca336f4369db/001343/1.jpg?feature=CASE%20FINISH:141%20Truffle&feature=BASE%20TYPE:WALL&feature=FRONT%20FINISH:141%20Truffle&bgcolour=f5f5f5&height=1080&width=1080",
      imageHover:
        "https://i.pinimg.com/736x/bd/44/ad/bd44adeb279bea270391d53adf330068.jpg",
    },
  ];

  // Dinamik sayılar için değişkenler
  const totalItems = 118;
  const shownItems = products.length;
  const remainingItems = totalItems - shownItems;

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
            imageSrc={product.image}
            imageSrcHover={product.imageHover}
          />
        ))}
      </div>

      {/* Yeni eklenen pagination bölümü */}
      <div className={styles.paginationControls}>
        <p className={styles.itemCount}>
          Showing {shownItems} out of {totalItems} items
        </p>
        
        {remainingItems > 0 && (
          <button className={styles.loadMoreButton}>
            Show {remainingItems} more
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;