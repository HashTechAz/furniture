// src/component-map.ts
import Hero from '@/components/Hero/Hero';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import NewsSection from '@/components/NewsSection/NewsSection';
import Form from '@/components/Form/Form';
import MiddleBanner from '@/components/MiddleBanner/MiddleBanner';
import SeriesText from '@/app/(public)/productseries/components/SeriesText/SeriesText';
import PaletteLeftImage from '@/components/Palette/PaletteLeftImage/PaletteLeftImage';
import PaletteRightImage from '@/components/Palette/PaletteRightImage/PaletteRightImage';

// Bütün mümkün komponentləri bura yığın
export const componentMap = {
  Hero,
  ProductSlider,
  NewsSection,
  Form,
  MiddleBanner,
  SeriesText,
  PaletteLeftImage,
  PaletteRightImage,
};

// Bu, TypeScript üçün bir köməkçi tipdir
export type ComponentName = keyof typeof componentMap;