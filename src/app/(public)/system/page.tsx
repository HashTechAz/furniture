'use client'; // Client komponenti

import React, { useState, useEffect } from "react";
import SystemHero from "./components/SystemHero/SystemHero";
import SystemAbout from "./components/SystemAbout/SystemAbout";
import Size from "./components/Size/Size";
import ProductSlider from "../../../components/ProductSlider/ProductSlider";
import SystemPalette from "../../../components/Palette/SystemPalette";
import PaletteLeftImage from "../../../components/Palette/PaletteLeftImage/PaletteLeftImage";
import systemPaletteData from "@/mock/system-palette/index.json";

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


const SystemPage = () => {
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted on client before rendering dynamic content
  useEffect(() => {
    setMounted(true);
  }, []);

  const systemPalettes = systemPaletteData.systemPage as PaletteData[];

  const renderPalette = (palette: PaletteData) => {
    if (palette.componentType === 'PaletteLeftImage') {
      const props: React.ComponentProps<typeof PaletteLeftImage> = palette.props;
      return <PaletteLeftImage key={palette.id} {...props} />;
    } else if (palette.componentType === 'SystemPalette') {
      const props: React.ComponentProps<typeof SystemPalette> = palette.props;
      return <SystemPalette key={palette.id} {...props} />;
    }
    return null;
  };

  return (
    <>
      <div
        id='header-trigger'
        style={{ height: 1, backgroundColor: "#2C3587" }}
      />
      <SystemHero title="Environment and quality — Montana's environmental certifications and initiatives" />
      <SystemAbout />
      <Size />
      <ProductSlider
        variant='system'
        titleTop='Montana System inspiration'
        titleBottom=''
      />

      {/* PaletteLeftImage 1 */}
      {mounted && systemPalettes.find(p => p.id === 'systemPaletteLeft1') && renderPalette(systemPalettes.find(p => p.id === 'systemPaletteLeft1')!)}

      {/* SystemPalette */}
      {mounted && systemPalettes.find(p => p.id === 'systemPaletteSystem1') && renderPalette(systemPalettes.find(p => p.id === 'systemPaletteSystem1')!)}

      {/* PaletteLeftImage 2 */}
      {mounted && systemPalettes.find(p => p.id === 'systemPaletteLeft2') && renderPalette(systemPalettes.find(p => p.id === 'systemPaletteLeft2')!)}


      <div style={{ marginBottom: '40px' }}>
        <ProductSlider
          titleTop='Montana System inspiration'
          titleBottom=''
        />
      </div>
    </>
  );
};

export default SystemPage; 