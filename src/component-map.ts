import Hero from '@/components/Hero/Hero';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import NewsSection from '@/components/NewsSection/NewsSection';
import Form from '@/components/Form/Form';
import MiddleBanner from '@/components/MiddleBanner/MiddleBanner';
import SeriesText from '@/app/(public)/productseries/components/SeriesText/SeriesText';
import PaletteLeftImage from '@/components/Palette/PaletteLeftImage/PaletteLeftImage';
import PaletteRightImage from '@/components/Palette/PaletteRightImage/PaletteRightImage';
import Related from '@/app/(public)/sustainability/components/Related/Related';
import Companies from '@/app/(public)/sustainability/components/Companies/Companies';
import HomeVideo from '@/components/HomeVideo/HomeVideo';
import ProductNewsSlider from '@/components/ProductNewsSlider/ProductNewsSlider';
import CenterInfoText from '@/components/CenterInfoText/CenterInfoText';

export const componentMap = {
  Hero,
  ProductSlider,
  NewsSection,
  Related,
  Companies,
  ProductNewsSlider,
  HomeVideo,
  Form,
  MiddleBanner,
  SeriesText,
  PaletteLeftImage,
  PaletteRightImage,
  CenterInfoText,
};

export type ComponentName = keyof typeof componentMap;