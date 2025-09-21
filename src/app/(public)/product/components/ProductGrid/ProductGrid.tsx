import React from 'react';
import styles from './ProductGrid.module.css';
import ProductCard from '@/components/ProductCard/ProductCard';

const ProductGrid = () => {
  // Örnek ürün verileri
  const products = [
    { id: 1, title: "SHOW bookcase", color: "New White", size: "W 69.6 x H 69.6 x D 30 cm", image: "https://artist.v2.londondynamics.com/image_by_config/28d24461-579e-4156-99c4-ca336f4369db/001112/31.jpg?feature=CASE%20FINISH:167%20Ruby&feature=BASE%20TYPE:WALL&bgcolour=f5f5f5&height=414&width=414", imageHover: "https://artist.v2.londondynamics.com/image_by_config/28d24461-579e-4156-99c4-ca336f4369db/001114/31.jpg?feature=CASE%20FINISH:158%20Oat&feature=BASE%20TYPE:WALL&bgcolour=f5f5f5&height=414&width=414" },
    { id: 2, title: "READ spacious bookshelf", color: "Truffle", size: "W 139.2 x H 215.8 x D 30 cm", image: "https://artist.v2.londondynamics.com/image_by_config/28d24461-579e-4156-99c4-ca336f4369db/001114/31.jpg?feature=CASE%20FINISH:158%20Oat&feature=BASE%20TYPE:WALL&bgcolour=f5f5f5&height=414&width=414", imageHover: "https://artist.v2.londondynamics.com/image_by_config/28d24461-579e-4156-99c4-ca336f4369db/001112/31.jpg?feature=CASE%20FINISH:167%20Ruby&feature=BASE%20TYPE:WALL&bgcolour=f5f5f5&height=414&width=414" },
    { id: 3, title: "LOOM slim bookcase", color: "Flint", size: "W 46.8 x H 215.8 x D 30 cm", image: "https://b2c.montana-episerver.com/globalassets/inriver/resources/loom_148_1.png?w=800&h=800&mode=max", imageHover: "https://b2c.montana-episerver.com/globalassets/ambient-images/product-images/loom/loom_flint_p_h_1.jpg?w=800&h=800&mode=max" },
    { id: 4, title: "KIMPOP SHOW", color: "KIMPOP", size: "W 69.6 x H 69.6 x D 30 cm", image: "https://b2c.montana-episerver.com/globalassets/inriver/resources/show-kmpop_front.png?w=800&h=800&mode=max", imageHover: "https://b2c.montana-episerver.com/globalassets/ambient-images/product-images/show-kimpop/show-kimpop_p_h_1.jpg?w=800&h=800&mode=max" },
    { id: 5, title: "COMPILE decorative shelf", color: "Mushroom", size: "W 69.6 x H 72.6 x D 30 cm", image: "https://b2c.montana-episerver.com/globalassets/inriver/resources/compile_137_1.png?w=800&h=800&mode=max", imageHover: "https://b2c.montana-episerver.com/globalassets/ambient-images/product-images/compile/compile_mushroom_p_h_1.jpg?w=800&h=800&mode=max" },
    { id: 6, title: "Shelf 1222", color: "Parsley", size: "W 69.6 x H 69.6 x D 30 cm", image: "https://b2c.montana-episerver.com/globalassets/inriver/resources/1222_159_1.png?w=800&h=800&mode=max", imageHover: "https://b2c.montana-episerver.com/globalassets/ambient-images/product-images/1222/1222_parsley_p_h_1.jpg?w=800&h=800&mode=max" },
    { id: 7, title: "RISE bookcase", color: "Ruby", size: "W 104.4 x H 215.8 x D 30 cm", image: "https://b2c.montana-episerver.com/globalassets/inriver/resources/rise_141_1.png?w=800&h=800&mode=max", imageHover: "https://b2c.montana-episerver.com/globalassets/ambient-images/product-images/rise/rise_ruby_p_h_1.jpg?w=800&h=800&mode=max" },
    { id: 8, title: "KEEP bookcase", color: "Hokkaido", size: "W 104.4 x H 215.8 x D 30 cm", image: "https://b2c.montana-episerver.com/globalassets/inriver/resources/keep_139_1.png?w=800&h=800&mode=max", imageHover: "https://b2c.montana-episerver.com/globalassets/ambient-images/product-images/keep/keep_hokkaido_p_h_1.jpg?w=800&h=800&mode=max" }
  ];

  return (
    // Bu dış sarmalayıcı sadece padding için
    <div className={styles.gridContainer}>
      {/* --- DEĞİŞİKLİK BURADA --- */}
      {/* Kartları grid yapısını içeren bu div içine alıyoruz */}
      <div className={styles.grid}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            title={product.title}
            color={product.color}
            size={product.size}
            imageSrc={product.image}
            imageSrcHover={product.imageHover}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;