'use client'; // Client komponenti

import React, { useState, useEffect } from "react";
import styles from './page.module.css';
import Hero from '@/components/Hero/Hero';
import AboutCompany from './components/AboutCompany/AboutCompany';
import MiddleBanner from '@/components/MiddleBanner/MiddleBanner';
import HomeVideo from '@/components/HomeVideo/HomeVideo';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import AboutBigImage from './components/AboutBigImage/AboutBigImage';
import PaletteRightImage from '@/components/Palette/PaletteRightImage/PaletteRightImage';
import aboutPaletteData from '@/mock/palette/about-palette/index.json';

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
  componentType: 'PaletteRightImage' | 'PaletteLeftImage' | 'SystemPalette';
  props: PaletteProps;
}

import aboutBannerData from '@/mock/middle-banner/about-middle/index.json';

export default function About() {
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted on client before rendering dynamic content
  useEffect(() => {
    setMounted(true);
  }, []);

  const aboutPalettes = aboutPaletteData.aboutPage as PaletteData[];

  const renderPalette = (palette: PaletteData) => {
    // Bu səhifədə yalnız PaletteRightImage var
    if (palette.componentType === 'PaletteRightImage') {
      // PaletteRightImage üçün tip yoxlaması və render
      const props: React.ComponentProps<typeof PaletteRightImage> = palette.props;
      return <PaletteRightImage key={palette.id} {...props} />;
    }
    console.warn(`Unsupported palette component type: ${palette.componentType} for id: ${palette.id}`);
    return null; // Digər tipləri render etmirik
  };


  return (
    <>
      <Hero
        title="About Montana"
        titleSpan="Let's create playful spaces"
        description="The family-owned Montana Furniture has provided generations with personalized storage solutions, since 1982. The Danish high-end furniture company was established by Peter J. Lassen, who also created the modular Montana System. Today, the company is run by Peter's son Joakim Lassen, who is the fifth generation of his family to work with furniture and the great-grandson of manufacturer Fritz Hansen."
        imageUrl="https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/montana-home/2023/location---radiohuset/montana_home_23_24_ruby_hokkaido_iris_cumin_detail_01_w.jpg?mode=crop&width=1080&height=776"
        imageAlt="Montana Company"
        backgroundColor="#2c3587"
        textColor="#ffffff"
        heroClassName={styles.aboutHero}
        imageClassName={styles.aboutHeroImage}
      />
      <AboutCompany />
      <AboutBigImage />
      <div className={styles.aboutMiddleBanner}>
        {/* @ts-ignore */}
        <MiddleBanner {...aboutBannerData.aboutPage[0].props} />
      </div>

      {/* PaletteRightImage 1 */}
      {mounted &&
        aboutPalettes.find(p => p.id === 'aboutPaletteRight1') && renderPalette(aboutPalettes.find(p => p.id === 'aboutPaletteRight1')!)
      }

      <HomeVideo imageUrl="https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2023/location---radiohuset/montana_home_23_24_ruby_hokkaido_iris_cumin_02_h.jpg?mode=crop&width=828&height=1104" />

      {/* PaletteRightImage 2 */}
      {mounted &&
        aboutPalettes.find(p => p.id === 'aboutPaletteRight2') && renderPalette(aboutPalettes.find(p => p.id === 'aboutPaletteRight2')!)
      }

      <ProductSlider />
    </>
  );
}