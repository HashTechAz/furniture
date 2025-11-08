'use client'; // Client komponenti olduğunu bildiririk

import React, { useState, useEffect } from "react"; // useState, useEffect əlavə edirik
import SustainabilityHero from "./components/SustainabilityHero/SustainabilityHero";
import SustainabilityGallery from "./components/SustainabilityGallery/SustainabilityGallery";
import SustainabilityCertifications from "./components/SustainabilityCertifications/SustainabilityCertifications";
import SustainabilityHistory from "./components/SustainabilityHistory/SustainabilityHistory";
import FlexImages from "./components/FlexImages/FlexImages";
import Companies from "./components/Companies/Companies";
import Ecolabel from "./components/Ecolabel/Ecolabel";
import PaletteLeftImage from "@/components/Palette/PaletteLeftImage/PaletteLeftImage";
import HomeVideo from "@/components/HomeVideo/HomeVideo";
import PaletteRightImage from "@/components/Palette/PaletteRightImage/PaletteRightImage";
import Related from "./components/Related/Related";


interface PaletteProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  backgroundColor: string;
  imageSize?: 'normal' | 'large' | 'custom';
  category?: string;
  description2?: string;
  features?: string[];
  layout?: 'textLeft' | 'textRight';
  variant?: 'default' | 'third';
  imagePosition?: {
    width: string;
    height: string;
    top: string;
    left?: string;
    right?: string;
  };
}

interface PaletteData {
  id: string;
  componentType: 'PaletteRightImage' | 'PaletteLeftImage' | 'SystemPalette'; 
  props: PaletteProps;
}

const SustainabilityPage = () => { 
  const [sustainabilityPalettes, setSustainabilityPalettes] = useState<PaletteData[]>([]);
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
          throw new Error('Network response was not ok');
        }
        const allPaletteData: { sustainabilityPage?: PaletteData[] } = await response.json();
        setSustainabilityPalettes(allPaletteData.sustainabilityPage || []); // sustainabilityPage hissəsini alırıq
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
  }, [mounted]);

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
      <div
        id='header-trigger'
        style={{ height: 1, backgroundColor: "#EAEFD9" }}
      />
      <SustainabilityHero />
      <SustainabilityGallery />
      <SustainabilityCertifications />
      <SustainabilityHistory />
      <FlexImages />
      <Companies />
      <Ecolabel />

      {/* PaletteLeftImage */}
      {mounted && (loadingPalettes ? <p>Loading palettes...</p> : paletteError ? <p>Error: {paletteError}</p> :
        sustainabilityPalettes.find(p => p.id === 'sustainabilityPaletteLeft1') && renderPalette(sustainabilityPalettes.find(p => p.id === 'sustainabilityPaletteLeft1')!)
      )}

      <HomeVideo />

      {/* PaletteRightImage */}
      {mounted && (loadingPalettes ? null : paletteError ? null :
        sustainabilityPalettes.find(p => p.id === 'sustainabilityPaletteRight1') && renderPalette(sustainabilityPalettes.find(p => p.id === 'sustainabilityPaletteRight1')!)
      )}

      <Related/>
    </>
  );
};

export default SustainabilityPage; // Komponent adını dəyişdiririk