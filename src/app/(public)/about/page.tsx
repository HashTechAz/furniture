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

const aboutBannerData = {
  largeImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/montana_colourps_azure_oat_rosehip.jpg?mode=crop&width=1520&height=2027",
  smallImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/montana_colourps_amber_camomile_rhubarb_flint_oat.jpg?mode=crop&width=1520&height=2027",
  title: "Endless possibilities with Montana",
  description: "Montana Furniture is based on Peter J. Lassen's philosophy that every one of us has a need for freedom and a natural desire to create our own personal spaces. With Montana you get endless possibilities and freedom to create the look that's just right for you.",
  buttonText: "Learn more about our design",
  buttonLink: "/design",
};

export default function About() {
  const [aboutPalettes, setAboutPalettes] = useState<PaletteData[]>([]);
  const [loadingPalettes, setLoadingPalettes] = useState(false);
  const [paletteError, setPaletteError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted on client before rendering dynamic content
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const fetchPalettes = async () => {
      try {
        setLoadingPalettes(true);
        setPaletteError(null);
        const response = await fetch('/api/palettes');
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }
        const allPaletteData: { aboutPage?: PaletteData[] } = await response.json();
        setAboutPalettes(allPaletteData.aboutPage || []);
      } catch (err) {
         if (err instanceof Error) {
            setPaletteError(err.message);
        } else {
            setPaletteError('An unknown error occurred while fetching palettes');
        }
        console.error("Failed to fetch palettes for about page:", err);
      } finally {
        setLoadingPalettes(false);
      }
    };

    fetchPalettes();
  }, [mounted]);

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
      />
      <AboutCompany/>
      <AboutBigImage/>
      <div className={styles.aboutMiddleBanner}>
        <MiddleBanner {...aboutBannerData} />
      </div>

      {/* PaletteRightImage 1 */}
      {mounted && (
        <>
          {loadingPalettes && <p>Loading palettes...</p>}
          {paletteError && <p>Error loading palettes: {paletteError}</p>}
          {!loadingPalettes && !paletteError &&
            aboutPalettes.find(p => p.id === 'aboutPaletteRight1') && renderPalette(aboutPalettes.find(p => p.id === 'aboutPaletteRight1')!)
          }
        </>
      )}

      <HomeVideo imageUrl="https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2023/location---radiohuset/montana_home_23_24_ruby_hokkaido_iris_cumin_02_h.jpg?mode=crop&width=828&height=1104" />

       {/* PaletteRightImage 2 */}
       {mounted && !loadingPalettes && !paletteError &&
        aboutPalettes.find(p => p.id === 'aboutPaletteRight2') && renderPalette(aboutPalettes.find(p => p.id === 'aboutPaletteRight2')!)
      }

      <ProductSlider />
    </>
  );
}