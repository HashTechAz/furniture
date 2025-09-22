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
        "https://artist.v2.londondynamics.com/image_by_config/28d24461-579e-4156-99c4-ca336f4369db/001222/31.jpg?feature=CASE%20FINISH:152%20Parsley&feature=FRONT%20FINISH:152%20Parsley&feature=LEG%20FINISH:152%20PARSLEY&feature=BASE%20TYPE:Legs&bgcolour=f5f5f5&height=280&width=280",
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
        "https://i.pinimg.com/1200x/00/71/11/0071110882356dcfe138a82494212e1f.jpg",
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
        "https://i.pinimg.com/736x/49/ba/28/49ba28369467fcd42fc9a82f12863c4c.jpg",
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
        "https://i.pinimg.com/736x/bd/44/ad/bd44adeb279bea270391d53adf330068.jpg",
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
        "https://artist.v2.londondynamics.com/image_by_config/28d24461-579e-4156-99c4-ca336f4369db/001222/31.jpg?feature=CASE%20FINISH:152%20Parsley&feature=FRONT%20FINISH:152%20Parsley&feature=LEG%20FINISH:152%20PARSLEY&feature=BASE%20TYPE:Legs&bgcolour=f5f5f5&height=280&width=280",
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
        "https://i.pinimg.com/1200x/00/71/11/0071110882356dcfe138a82494212e1f.jpg",
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
        "https://i.pinimg.com/736x/49/ba/28/49ba28369467fcd42fc9a82f12863c4c.jpg",
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
        "https://i.pinimg.com/736x/bd/44/ad/bd44adeb279bea270391d53adf330068.jpg",
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