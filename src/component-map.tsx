import dynamic from 'next/dynamic';

const Loading = () => (
  <div className="w-full py-10 flex justify-center items-center text-gray-400">
    Loading...
  </div>
);

import Hero from '@/components/Hero/Hero';
import HeroSection from '@/components/HeroSection/HeroSection';
import SystemHero from '@/app/(public)/system/components/SystemHero/SystemHero';
import NewsSection from '@/components/NewsSection/NewsSection';
import CenterInfoText from '@/components/CenterInfoText/CenterInfoText';
import SeriesText from '@/app/(public)/productseries/components/SeriesText/SeriesText';
import Related from '@/app/(public)/sustainability/components/Related/Related';
import MiddleBanner from '@/components/MiddleBanner/MiddleBanner';
import NewsCard from '@/components/NewsCard/NewsCard';
import ColourClassCard from '@/components/ColourClassCard/ColourClassCard';
import ComfortCard from '@/components/ComfortCard/ComfortCard';
import InspiringCard from '@/components/InspiringCard/InspiringCard';
import Catalogues from '@/components/Catalogues/Catalogues';
import SeriesAbout from '@/components/SeriesAbout/SeriesAbout';
import TrustBadges from '@/components/TrustBadges/TrustBadges';
import AssemblyList from '@/components/AssemblyList/AssemblyList';
import AboutCompany from '@/app/(public)/about/components/AboutCompany/AboutCompany';
import SystemAbout from '@/app/(public)/system/components/SystemAbout/SystemAbout';
import Companies from '@/app/(public)/sustainability/components/Companies/Companies';
import SustainabilityGallery from '@/app/(public)/sustainability/components/SustainabilityGallery/SustainabilityGallery';
import FrameColors from '@/components/FrameColors/FrameColors';
import PaletteLeftImage from '@/components/Palette/PaletteLeftImage/PaletteLeftImage';
import PaletteRightImage from '@/components/Palette/PaletteRightImage/PaletteRightImage';

const ProductSlider = dynamic(() => import('@/components/ProductSlider/ProductSlider'), { 
  loading: Loading,
  ssr: true 
});

const ProductNewsSlider = dynamic(() => import('@/components/ProductNewsSlider/ProductNewsSlider'), { 
  loading: Loading,
  ssr: true
});

const HomeVideo = dynamic(() => import('@/components/HomeVideo/HomeVideo'), { 
  loading: Loading 
});

const Form = dynamic(() => import('@/components/Form/Form'), { 
  loading: Loading 
});

export const componentMap = {
  Hero,
  HeroSection,
  SystemHero,
  NewsSection,
  CenterInfoText,
  SeriesText,
  Related,
  MiddleBanner,
  NewsCard,
  ColourClassCard,
  ComfortCard,
  InspiringCard,
  Catalogues,
  SeriesAbout,
  TrustBadges,
  AssemblyList,
  AboutCompany,
  SystemAbout,
  Companies,
  SustainabilityGallery,
  FrameColors,
  PaletteLeftImage,
  PaletteRightImage,
  ProductSlider,
  ProductNewsSlider,
  HomeVideo,
  Form,
};

export type ComponentName = keyof typeof componentMap;