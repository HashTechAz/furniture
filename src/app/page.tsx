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
  description: "The Montana Mini series is now even more versatile...",
  buttonText: "Explore now",
  buttonLink: "/news/palette-refresh",
  imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-mini/ss25/montana_mini_displayshelf_rosehip_flint_amber_ruby_clay_h.jpg?mode=crop&width=540&height=720",
  backgroundColor: "#CCC6B8",
  imagePosition: {
    width: '370px',
    height: '500px',
    top: '40px',
    left: '0px',
  },
  layout: 'textLeft',
} as const; // <-- DÜZƏLİŞ BURADADIR

const secondPaletteData = {
  category: "",
  title: "Colour Class – Learn to embrace...",
  description: "Montana Furniture has teamed up with Color Connaisseur...",
  buttonText: "Discover Colour Classes here",
  buttonLink: "/collections/summer",
  imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-02/Montana_Colour_Class_2_header_iris_2024.jpg?mode=crop&width=828&height=595",
  backgroundColor: "#BDD2DA",
  imagePosition: {
    width: '600px',
    height: '450px',
    top: '60px',
    left: '30px',
  }
};



// 1. Orijinal MiddleBanner düzülüşü üçün məlumatlar
const bannerDataDefault = {
  largeImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/panton-x-montana/wire/montana_pantonwire_d35_blackred_rosehiptop_h.jpg",
  smallImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/panton-x-montana/wire/montana_pantonwire_d35_blackred_detail_h.jpg",
  title: "New sizes – New colours",
  description: "The Panton Wire system has always been celebrated for its balance of simplicity and elegance. Now, it takes another step forward with thoughtful updates that enhance its versatility and aesthetic appeal.",
  buttonText: "Explore Now",
  buttonLink: "#",
};

// 2. Tərs düzülüş və fərqli hündürlük üçün məlumatlar
const bannerDataReversed = {
  largeImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/factory/montana_factory_2022_13_h.jpg?mode=crop&width=1520&height=2027",
  smallImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/factory/montana_factory_2022_07_w.jpg?mode=crop&width=1520&height=1093",
  title: "Environment and quality",
  description: "At Montana, we take our environmental responsibilities seriously. Since introducing our own set of environmental accounts in consultation with The Danish Environmental Protection Agency over 25 years ago, we have achieved a number of certifications – most recently the PEFC certification, meaning that most of Montana's MDF products are now made from PEFC certified wood.",
  buttonText: "More about Montana's environmental initiatives",
  buttonLink: "/sofas",
  layout: 'imageRight',
  smallImageHeight: '400px',
  textBlockWidth: '40%', // Hündürlük burada 80vh olaraq təyin edildi
} as const;

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductSlider />
      <Palette {...originalPaletteData} />
      <NewsSection />
      <ProductNewsSlider />
      <MiddleBanner {... bannerDataDefault} />
      <TrustBadges />
      <Palette {...secondPaletteData} />
      <MiddleBanner {... bannerDataReversed} />
    </>
  );
}
