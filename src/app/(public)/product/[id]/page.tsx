
import React from 'react';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

import ProductHero from './components/ProductHero/ProductHero';
import SystemAbout from '@/app/(public)/system/components/SystemAbout/SystemAbout';
import SystemPalette from '@/components/Palette/SystemPalette';
import TrustBadges from '@/components/TrustBadges/TrustBadges';
import ProductNewsSlider from '@/components/ProductNewsSlider/ProductNewsSlider';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import { getProductById } from '@/lib/products'; 

interface ProductDetailsPageProps {
  params: {
    id: string;
  };
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { id } = await params; 
  
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <ProductHero product={product} />
      
      <div className={styles.sliderSection}> <ProductNewsSlider /> </div>
      
      <ProductSlider 
        variant="system" 
        titleTop="Bookcase and shelving inspiration"
        titleBottom=""
      />
      <SystemAbout />
      
      <SystemPalette
        category=""
        title="Find a Montana retailer near you"
        description="The Montana range offers endless possibilities..."
        features={[
          "Montana retailers are trained in Montana products",
          "They are experts in advising you on style...", 
          "They can help you draw up a Montana storage solution..."
        ]}
        buttonText="Go to retailer map"
        buttonLink="/contact"
        imageUrl="https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2023/studio/montana_home_23_24_r03_shadow_monarch_amber_ruby_colourbox_i_noticeboard_hokkaido_monterey_kevi_h.jpg?mode=crop&width=640&height=640"
        backgroundColor="#EFC7C7"
        layout="textLeft"
      />
      <TrustBadges />
    </main>
  );
};

export default ProductDetailsPage;