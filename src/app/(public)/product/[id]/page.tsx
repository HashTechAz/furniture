import React from 'react';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

// Bileşenleri import ediyoruz
import ProductDetailsGallery from './components/ProductDetailsGallery/ProductDetailsGallery';
import ProductDetailsInfo from './components/ProductDetailsInfo/ProductDetailsInfo';
import ProductDetailsSpecs from './components/ProductDetailsSpecs/ProductDetailsSpecs';
import SystemPalette from '@/components/Palette/SystemPalette';
import TrustBadges from '@/components/TrustBadges/TrustBadges';
import ProductNewsSlider from '@/components/ProductNewsSlider/ProductNewsSlider';

// Ürün verilerini ve tipini ayrı bir dosyaya taşımak daha iyi bir pratiktir,
// ama şimdilik burada tutabiliriz.
export interface Product {
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

const getProductData = (id: string): Product | undefined => {
  const products: Product[] = [
    {
      id: 1,
      title: "Shelf 1323",
      color: "Darkblue",
      measurements: "W 69.6 x H 69.6 x D 30 cm",
      position: "Legs H12.6 cm",
      description: "A modern and functional shelf that combines style with practicality. Perfect for organizing your space with elegance.",
      price: "€299",
      images: [
        "https://artist.v2.londondynamics.com/image_by_config/28d24461-579e-4156-99c4-ca336f4369db/001222/31.jpg?feature=CASE%20FINISH:152%20Parsley&feature=FRONT%20FINISH:152%20Parsley&feature=LEG%20FINISH:152%20PARSLEY&feature=BASE%20TYPE:Legs&bgcolour=f5f5f5&height=280&width=280",
        "https://artist.v2.londondynamics.com/image_by_config/28d24461-579e-4156-99c4-ca336f4369db/001223/31.jpg?feature=CASE%20FINISH:168%20Clay&feature=FRONT%20FINISH:168%20Clay&feature=BASE%20TYPE:Castor&bgcolour=f5f5f5&height=280&width=280"
      ],
      specifications: {
        material: "Solid wood",
        finish: "Matte",
        weight: "15 kg",
        assembly: "Required"
      }
    },
    // Diğer ürünlerin buraya eklenebilir...
  ];

  return products.find(product => product.id === parseInt(id));
};

// params tipi düzeltildi
interface ProductDetailsPageProps {
  params: {
    id: string;
  };
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { id } = await params;
  const product = getProductData(id);

  if (!product) {
    notFound();
  }

  return (
    <main>

       
      {/* Galeri ve Bilgi Bölümü yan yana */}
      <div className={styles.mainContent}>
        <div className={styles.galleryWrapper}>
          <ProductDetailsGallery product={product} />
        </div>
        <div className={styles.infoWrapper}>
          <ProductDetailsInfo product={product} />
        </div>
      </div>

      {/* İlgili Ürünler Slider'ı */}
      <div className={styles.sliderSection}>
        <ProductNewsSlider />
      </div>

     

     

      {/* System Palette */}
      <SystemPalette
        category=""
        title="Find a Montana retailer near you"
        description="The Montana range offers endless possibilities and therefore we can only show a limited range online. If you have not found what you are looking for, or just want more inspiration and advice, visit your nearest Montana retailer. "
        features={[
          "Montana retailers are trained in Montana products",
          "They are experts in advising you on style, colours and interior design for the home or office environments", 
          "They can help you draw up a Montana storage solution, so you can get exactly the design you want"
        ]}
        buttonText="Go to retailer map"
        buttonLink="/contact"
        imageUrl="https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2023/studio/montana_home_23_24_r03_shadow_monarch_amber_ruby_colourbox_i_noticeboard_hokkaido_monterey_kevi_h.jpg?mode=crop&width=640&height=640"
        backgroundColor="#EFC7C7"
        layout="textLeft"
      />

      {/* Trust Badges */}
      <TrustBadges />

      
    </main>
  );
};

export default ProductDetailsPage;