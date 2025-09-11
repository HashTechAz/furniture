import styles from "./page.module.css";
import HeroSection from "@/components/HeroSection/HeroSection";
import ProductSlider from "@/components/ProductSlider/ProductSlider";
import Palette from "@/components/Palette/Palette";
import NewsSection from "@/components/NewsSection/NewsSection";
import ProductNewsSlider from "@/components/ProductNewsSlider/ProductNewsSlider";
import MiddleBanner from "@/components/MiddleBanner/MiddleBanner";
import TrustBadges from "@/components/TrustBadges/TrustBadges";

const originalPaletteData = {
  category: "News",
  title: "Refreshing the Palette",
  description: "The Montana Mini series is now even more versatile with the introduction of an updated colour range. Whether you’re looking to add warmth, make a bold statement, or create a subtle touch of elegance, the new colours empower you to design a space that feels uniquely yours.",
  buttonText: "Explore now",
  buttonLink: "/news/palette-refresh",
  imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-mini/ss25/montana_mini_displayshelf_rosehip_flint_amber_ruby_clay_h.jpg?mode=crop&width=540&height=720",
  backgroundColor: "#CCC6B8",
  // YENİ XÜSUSİYYƏT: Orijinal ölçülər
  imagePosition: {
    width: '370px',
    height: '500px',
    top: '40px',
    left: '0px',
  }
};

const secondPaletteData = {
  category: "",
  title: "Colour Class – Learn to embrace the world of colours within your interior spaces",
  description: "Montana Furniture has teamed up with Color Connaisseur by Céline Hallas to create Colour Class, a unique digital concept designed to empower you to confidently embrace the world of colours within your interior spaces. In each Colour Class, we invite you into homes that embrace vibrant colour schemes, showing how you can use colours to reflect your personality and express your unique style in interior design.",
  buttonText: "Discover Colour Classes here",
  buttonLink: "/collections/summer",
  imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-02/Montana_Colour_Class_2_header_iris_2024.jpg?mode=crop&width=828&height=595",
  backgroundColor: "#BDD2DA",
  // YENİ XÜSUSİYYƏT: İkinci komponent üçün FƏRQLİ ölçülər
  imagePosition: {
    width: '600px',
    height: '450px',
    top: '60px',
    left: '30px',
  }
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductSlider />
      <Palette {...originalPaletteData} />
      <NewsSection />
      <ProductNewsSlider />
      <MiddleBanner />
      <TrustBadges />
      <Palette {...secondPaletteData} />
    </>
  );
}
