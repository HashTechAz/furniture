import styles from './page.module.css';   
import HeroSection from '@/components/HeroSection/HeroSection';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import Palette from '@/components/Palette/Palette';
import NewsSection from '@/components/NewsSection/NewsSection';

export default function Home() {
  return (
    <>
      <HeroSection/>
      <ProductSlider/>
      <Palette/>
      <NewsSection/>
    </>
  );
}