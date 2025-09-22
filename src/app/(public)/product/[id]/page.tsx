import React from 'react';
import { notFound } from 'next/navigation';
import ProductDetailsHero from './components/ProductDetailsHero/ProductDetailsHero';
import ProductDetailsInfo from './components/ProductDetailsInfo/ProductDetailsInfo';
import ProductDetailsGallery from './components/ProductDetailsGallery/ProductDetailsGallery';
import ProductDetailsSpecs from './components/ProductDetailsSpecs/ProductDetailsSpecs';
import styles from './page.module.css';
import ProductNewsSlider from '@/components/ProductNewsSlider/ProductNewsSlider';

// Ürün verilerini simüle ediyoruz - gerçek uygulamada API'den gelecek
const getProductData = (id: string) => {
  const products = [
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
    {
      id: 2,
      title: "READ spacious bookshelf",
      color: "Truffle",
      measurements: "W 139.2 x H 215.8 x D 30 cm",
      position: "Plinth H3 cm",
      description: "A spacious and elegant bookshelf designed for modern living spaces. Offers ample storage while maintaining a clean aesthetic.",
      price: "€599",
      images: [
        "https://i.pinimg.com/1200x/00/71/11/0071110882356dcfe138a82494212e1f.jpg",
        "https://i.pinimg.com/1200x/de/13/7e/de137e76fb572bfa0ef489954b703ace.jpg"
      ],
      specifications: {
        material: "Engineered wood",
        finish: "Smooth",
        weight: "45 kg",
        assembly: "Required"
      }
    },
    {
      id: 3,
      title: "LOOM slim bookcase",
      color: "Flint",
      measurements: "W 46.8 x H 215.8 x D 30 cm",
      position: "Plinth H7 cm",
      description: "A slim and versatile bookcase that fits perfectly in narrow spaces. Ideal for apartments and small rooms.",
      price: "€399",
      images: [
        "https://i.pinimg.com/736x/49/ba/28/49ba28369467fcd42fc9a82f12863c4c.jpg",
        "https://b2c.montana-episerver.com/globalassets/ambient-images/product-images/loom/loom_flint_p_h_1.jpg?w=800&h=800&mode=max"
      ],
      specifications: {
        material: "MDF with veneer",
        finish: "Textured",
        weight: "25 kg",
        assembly: "Required"
      }
    },
    {
      id: 4,
      title: "KIMPOP SHOW",
      color: "KIMPOP",
      measurements: "W 69.6 x H 69.6 x D 30 cm",
      position: "Suspension rail",
      description: "A unique and colorful display unit that adds personality to any space. Perfect for showcasing your favorite items.",
      price: "€199",
      images: [
        "https://i.pinimg.com/736x/bd/44/ad/bd44adeb279bea270391d53adf330068.jpg"
      ],
      specifications: {
        material: "Powder-coated steel",
        finish: "Glossy",
        weight: "8 kg",
        assembly: "Required"
      }
    }
  ];

  return products.find(product => product.id === parseInt(id));
};

interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { id } = await params;
  const product = getProductData(id);

  if (!product) {
    notFound();
  }

  return (
    <main className={styles.container}>
      <ProductDetailsHero product={product} />
      <ProductNewsSlider />
      <ProductDetailsInfo product={product} />
      <ProductDetailsGallery product={product} />
      <ProductDetailsSpecs product={product} />
    </main>
  );
};

export default ProductDetailsPage;
