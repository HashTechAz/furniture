'use client'; // Səhifənin client tərəfdə işləməsi üçün əlavə edirik

import React, { useState, useEffect } from 'react'; // useState və useEffect import edirik
import HeroSection from "@/components/HeroSection/HeroSection";
import ProductSlider from "@/components/ProductSlider/ProductSlider";
import NewsSection from "@/components/NewsSection/NewsSection";
import ProductNewsSlider from "@/components/ProductNewsSlider/ProductNewsSlider";
import MiddleBanner from "@/components/MiddleBanner/MiddleBanner";
import TrustBadges from "@/components/TrustBadges/TrustBadges";
import HomeVideo from "@/components/HomeVideo/HomeVideo";
import Form from "@/components/Form/Form";
import PaletteRightImage from "@/components/Palette/PaletteRightImage/PaletteRightImage";
import PaletteLeftImage from "@/components/Palette/PaletteLeftImage/PaletteLeftImage";

// Köhnə bannerData dəyişənlərini burada saxlayırıq, çünki MiddleBanner hələ dinamik deyil
const bannerDataDefault = {
  largeImageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/panton-x-montana/wire/montana_pantonwire_d35_blackred_rosehiptop_h.jpg",
  smallImageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/panton-x-montana/wire/montana_pantonwire_d35_blackred_detail_h.jpg",
  title: "New sizes – New colours",
  description:
    "The Panton Wire system has always been celebrated for its balance of simplicity and elegance. Now, it takes another step forward with thoughtful updates that enhance its versatility and aesthetic appeal.",
  buttonText: "Explore Now",
  buttonLink: "#",
};

const bannerDataReversed = {
  largeImageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/factory/montana_factory_2022_13_h.jpg?mode=crop&width=1520&height=2027",
  smallImageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/factory/montana_factory_2022_07_w.jpg?mode=crop&width=1520&height=1093",
  title: "Environment and quality",
  description:
    "At Montana, we take our environmental responsibilities seriously. Since introducing our own set of environmental accounts in consultation with The Danish Environmental Protection Agency over 25 years ago, we have achieved a number of certifications – most recently the PEFC certification, meaning that most of Montana's MDF products are now made from PEFC certified wood.",
  buttonText: "More about Montana's environmental initiatives",
  buttonLink: "/sofas",
  layout: "imageRight",
  smallImageHeight: "400px",
  textBlockWidth: "40%",
} as const;

// Palette komponentləri üçün gözlənilən prop tiplərini təyin edək
interface PaletteProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  backgroundColor: string;
  imageSize?: 'normal' | 'large' | 'custom';
}

// API-dan gələcək palit məlumatının strukturunu təyin edək
interface PaletteData {
  id: string;
  componentType: 'PaletteRightImage' | 'PaletteLeftImage';
  props: PaletteProps;
}

export default function Home() {
  const [homePalettes, setHomePalettes] = useState<PaletteData[]>([]);
  const [loadingPalettes, setLoadingPalettes] = useState(false);
  const [paletteError, setPaletteError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted on client before rendering dynamic content
  useEffect(() => {
    setMounted(true);
  }, []);

  // Palit məlumatlarını çəkmək üçün useEffect istifadə edirik
  useEffect(() => {
    if (!mounted) return;
    
    const fetchPalettes = async () => {
      try {
        setLoadingPalettes(true);
        setPaletteError(null);
        const response = await fetch('/api/palettes'); // API endpoint-i çağırırıq
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Gələn JSON-un bütün strukturunu alırıq
        const allPaletteData: { homePage?: PaletteData[] } = await response.json();
        // Yalnız 'homePage' hissəsini götürürük (əgər varsa)
        setHomePalettes(allPaletteData.homePage || []);
      } catch (err) {
         if (err instanceof Error) {
            setPaletteError(err.message);
        } else {
            setPaletteError('An unknown error occurred while fetching palettes');
        }
        console.error("Failed to fetch palettes:", err);
      } finally {
        setLoadingPalettes(false);
      }
    };

    fetchPalettes();
  }, [mounted]); // Komponent yüklənəndə bir dəfə çalışır

  // Dinamik Palit Render Funksiyası
  const renderPalette = (palette: PaletteData) => {
    if (palette.componentType === 'PaletteRightImage') {
      return <PaletteRightImage key={palette.id} {...palette.props} />;
    } else if (palette.componentType === 'PaletteLeftImage') {
      return <PaletteLeftImage key={palette.id} {...palette.props} />;
    }
    return null; // Əgər tip uyğun gəlmirsə
  };

  return (
    <>
      <HeroSection />
      <div id="header-trigger" style={{ height: 1 }} />
      <ProductSlider />
      {/* PaletteRightImage 1 */}
      {mounted && (loadingPalettes ? <p>Loading palettes...</p> : paletteError ? <p>Error: {paletteError}</p> :
        homePalettes.find(p => p.id === 'homePaletteRight1') && renderPalette(homePalettes.find(p => p.id === 'homePaletteRight1')!)
      )}
      <NewsSection limit={4} />
      <ProductNewsSlider />
      <div className="hideOnMobile">
        <MiddleBanner {...bannerDataDefault} />
      </div>
      <div className="showOnlyOnMobile">
        <HomeVideo variant="mobile" />
      </div>
      <TrustBadges />
      {/* PaletteRightImage 2 */}
       {mounted && (loadingPalettes ? null : paletteError ? null :
        homePalettes.find(p => p.id === 'homePaletteRight2') && renderPalette(homePalettes.find(p => p.id === 'homePaletteRight2')!)
      )}
      <MiddleBanner {...bannerDataReversed} />
      {/* PaletteLeftImage 1 */}
      {mounted && (loadingPalettes ? null : paletteError ? null :
        homePalettes.find(p => p.id === 'homePaletteLeft1') && renderPalette(homePalettes.find(p => p.id === 'homePaletteLeft1')!)
      )}
      <div className="hideOnMobile">
        <HomeVideo />
      </div>
       {/* PaletteRightImage 3 */}
       {mounted && (loadingPalettes ? null : paletteError ? null :
        homePalettes.find(p => p.id === 'homePaletteRight3') && renderPalette(homePalettes.find(p => p.id === 'homePaletteRight3')!)
      )}
      <Form />
    </>
  );
}