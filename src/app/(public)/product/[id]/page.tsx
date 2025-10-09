import React from 'react';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

// Bileşenleri import ediyoruz
import ProductHero from './components/ProductHero/ProductHero';
import SystemAbout from '@/app/(public)/system/components/SystemAbout/SystemAbout';
import SystemPalette from '@/components/Palette/SystemPalette';
import TrustBadges from '@/components/TrustBadges/TrustBadges';
import ProductNewsSlider from '@/components/ProductNewsSlider/ProductNewsSlider';
import ProductSlider from '@/components/ProductSlider/ProductSlider';


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
      color: "Ruby",
      measurements: "W 69.6 x H 69.6 x D 30 cm",
      position: "Legs H12.6 cm",
      description: "A modern and functional shelf that combines style with practicality. Perfect for organizing your space with elegance.",
      price: "€299",
      // --- DƏYİŞİKLİK BURADADIR ---
      images: [
        "https://b2c.montana-episerver.com/globalassets/inriver/product/001112/montana_home19_20_bcstudio_livingroom_system_amber_caribe_iris_masala_oregano_rosehip_parsley_detail02_w.jpg?mode=crop&width=1520&height=1093",
        "https://b2c.montana-episerver.com/globalassets/inriver/product/001112/montana_home19_20_bcstudio_livingroom_system_amber_caribe_iris_masala_oregano_rosehip_parsley_h.jpg?mode=crop&width=1520&height=2027",
        "https://b2c.montana-episerver.com/globalassets/inriver/product/001112/montana_home20_21_rest_shadow_show_whiteoak_parsley_detail_h.jpg?mode=crop&width=1520&height=2027"
      ],
      // --- DƏYİŞİKLİK BİTDİ ---
      specifications: {
        material: "Solid wood",
        finish: "Matte",
        weight: "15 kg",
        assembly: "Required"
      }
    }
  ];

  return products.find(product => product.id === parseInt(id));
};

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

       
      {/* Product Hero */}
      <ProductHero product={product} />

      {/* İlgili Ürünler Slider'ı */}
      <div className={styles.sliderSection}>
        <ProductNewsSlider />
      </div>

      {/* Product Slider System */}
      <ProductSlider 
        variant="system" 
        titleTop="Bookcase and shelving inspiration"
        titleBottom=""
      />

      {/* System About */}
      <SystemAbout />

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