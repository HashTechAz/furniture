import styles from './page.module.css';   
import HeroSection from '@/components/HeroSection/HeroSection';
import ProductSlider from '@/components/ProductSlider/ProductSlider';

export default function Home() {
  return (
    <>
      <HeroSection/>
      <ProductSlider/>
    </>
  );
}