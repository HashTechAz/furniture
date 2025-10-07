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
import SustainabilityGallery from '@/app/(public)/sustainability/components/SustainabilityGallery/SustainabilityGallery';
import FrameColors from '@/components/FrameColors/FrameColors';
import AboutCompany from './app/(public)/about/components/AboutCompany/AboutCompany';
import SystemAbout from './app/(public)/system/components/SystemAbout/SystemAbout';
import ColourClassCard from './components/ColourClassCard/ColourClassCard';
import NewsCard from './components/NewsCard/NewsCard';
import SystemHero from './app/(public)/system/components/SystemHero/SystemHero';
import ComfortCard from './components/ComfortCard/ComfortCard';
import HeroSection from './components/HeroSection/HeroSection';
import InspiringCard from './components/InspiringCard/InspiringCard';

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
  SustainabilityGallery,
  FrameColors,
  AboutCompany,
  SystemAbout,
  ColourClassCard,
  NewsCard,
  SystemHero,
  ComfortCard,
  HeroSection,
  InspiringCard,
};

export type ComponentName = keyof typeof componentMap;