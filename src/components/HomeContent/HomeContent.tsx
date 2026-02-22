// src/components/HomeContent/HomeContent.tsx
'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from "@/components/HeroSection/HeroSection";
import NewsSection from "@/components/NewsSection/NewsSection";
import { FrontendProduct } from "@/lib/products";

// Aşağıda qalan / ağır komponentlər – lazy yüklənir, ilk çəkim yüngülləşir
const ProductSlider = dynamic(() => import('@/components/ProductSlider/ProductSlider'), {
  loading: () => <div className="min-h-[280px] flex items-center justify-center text-gray-400">...</div>,
  ssr: true,
});
const ProductNewsSlider = dynamic(() => import('@/components/ProductNewsSlider/ProductNewsSlider'), {
  loading: () => <div className="min-h-[320px] flex items-center justify-center text-gray-400">...</div>,
  ssr: false,
});
const MiddleBanner = dynamic(() => import('@/components/MiddleBanner/MiddleBanner'), {
  loading: () => <div className="min-h-[200px] bg-gray-100/50 animate-pulse rounded" />,
  ssr: true,
});
const TrustBadges = dynamic(() => import('@/components/TrustBadges/TrustBadges'), {
  loading: () => <div className="min-h-[120px] bg-gray-100/50 animate-pulse rounded" />,
  ssr: true,
});
const HomeVideo = dynamic(() => import('@/components/HomeVideo/HomeVideo'), {
  loading: () => <div className="min-h-[300px] bg-gray-100/50 animate-pulse rounded" />,
  ssr: false,
});
const Form = dynamic(() => import('@/components/Form/Form'), {
  loading: () => <div className="min-h-[200px] bg-gray-100/50 animate-pulse rounded" />,
  ssr: false,
});
const PaletteRightImage = dynamic(() => import('@/components/Palette/PaletteRightImage/PaletteRightImage'), {
  loading: () => <div className="min-h-[320px] bg-gray-100/50 animate-pulse rounded" />,
  ssr: true,
});
const PaletteLeftImage = dynamic(() => import('@/components/Palette/PaletteLeftImage/PaletteLeftImage'), {
  loading: () => <div className="min-h-[320px] bg-gray-100/50 animate-pulse rounded" />,
  ssr: true,
});

// --- PROPS INTERFACE ---
interface HomeContentProps {
  products: FrontendProduct[]; // Serverdən gələn məhsullar
}

import paletteData from "@/mock/home-palette/index.json";

// --- BANNER DATA (Statik) ---
const bannerDataDefault = {
  largeImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/panton-x-montana/wire/montana_pantonwire_d35_blackred_rosehiptop_h.jpg",
  smallImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/panton-x-montana/wire/montana_pantonwire_d35_blackred_detail_h.jpg",
  title: "New sizes – New colours",
  description: "The Panton Wire system has always been celebrated for its balance of simplicity and elegance. Now, it takes another step forward with thoughtful updates that enhance its versatility and aesthetic appeal.",
  buttonText: "Explore Now",
  buttonLink: "#",
};

const bannerDataReversed = {
  largeImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/factory/montana_factory_2022_13_h.jpg?mode=crop&width=1520&height=2027",
  smallImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/factory/montana_factory_2022_07_w.jpg?mode=crop&width=1520&height=1093",
  title: "Environment and quality",
  description: "At Montana, we take our environmental responsibilities seriously...",
  buttonText: "More about Montana's environmental initiatives",
  buttonLink: "/sofas",
  layout: "imageRight",
  smallImageHeight: "400px",
  textBlockWidth: "40%",
} as const;

// --- PALETTE TYPES ---
interface PaletteProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  backgroundColor: string;
  imageSize?: 'normal' | 'large' | 'custom';
}

interface PaletteData {
  id: string;
  componentType: 'PaletteRightImage' | 'PaletteLeftImage';
  props: PaletteProps;
}

// === MAIN COMPONENT ===
const HomeContent = ({ products }: HomeContentProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const homePalettes = paletteData.homePage as PaletteData[];

  const renderPalette = (palette: PaletteData) => {
    if (palette.componentType === 'PaletteRightImage') {
      return <PaletteRightImage key={palette.id} {...palette.props} />;
    } else if (palette.componentType === 'PaletteLeftImage') {
      return <PaletteLeftImage key={palette.id} {...palette.props} />;
    }
    return null;
  };

  return (
    <>
      <HeroSection backgroundImage="/images/home-hero/home-hero.jpg" />
      <div id="header-trigger" style={{ height: 1 }} />

      {/* Product Slider hələlik statik qalır */}
      <ProductSlider />

      {/* Palette 1 */}
      {mounted && homePalettes.find(p => p.id === 'homePaletteRight1') && renderPalette(homePalettes.find(p => p.id === 'homePaletteRight1')!)}

      <NewsSection limit={4} />

      {/* --- DİNAMİK PRODUCT NEWS SLIDER --- */}
      {/* Serverdən gələn 'products' propunu bura ötürürük */}
      <ProductNewsSlider products={products} />

      <div className="hideOnMobile">
        <MiddleBanner {...bannerDataDefault} />
      </div>
      <div className="showOnlyOnMobile">
        <HomeVideo variant="mobile" />
      </div>

      <TrustBadges />

      {/* Palette 2 */}
      {mounted && homePalettes.find(p => p.id === 'homePaletteRight2') && renderPalette(homePalettes.find(p => p.id === 'homePaletteRight2')!)}

      <MiddleBanner {...bannerDataReversed} />

      {/* Palette Left 1 */}
      {mounted && homePalettes.find(p => p.id === 'homePaletteLeft1') && renderPalette(homePalettes.find(p => p.id === 'homePaletteLeft1')!)}

      <div className="hideOnMobile">
        <HomeVideo />
      </div>

      {/* Palette 3 */}
      {mounted && homePalettes.find(p => p.id === 'homePaletteRight3') && renderPalette(homePalettes.find(p => p.id === 'homePaletteRight3')!)}

      <Form />
    </>
  );
}

export default HomeContent;