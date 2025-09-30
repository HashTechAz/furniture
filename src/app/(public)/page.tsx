import HeroSection from "@/components/HeroSection/HeroSection";
import ProductSlider from "@/components/ProductSlider/ProductSlider";
import NewsSection from "@/components/NewsSection/NewsSection";
import ProductNewsSlider from "@/components/ProductNewsSlider/ProductNewsSlider";
import MiddleBanner from "@/components/MiddleBanner/MiddleBanner";
import TrustBadges from "@/components/TrustBadges/TrustBadges";
import HomeVideo from "@/components/HomeVideo/HomeVideo";
import Form from "@/components/Form/Form";
import PaletteRightImage from "@/components/Palette/PaletteRightImage/PaletteRightImage";
import PaletteLeftImage from "@/components/Palette/PaletteLeftImage/PaletteLeftImage";

// 1. Orijinal MiddleBanner düzülüşü üçün məlumatlar
const bannerDataDefault = {
  largeImageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/panton-x-montana/wire/montana_pantonwire_d35_blackred_rosehiptop_h.jpg",
  smallImageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/panton-x-montana/wire/montana_pantonwire_d35_blackred_detail_h.jpg",
  title: "New sizes – New colours",
  description:
    "The Panton Wire system has always been celebrated for its balance of simplicity and elegance. Now, it takes another step forward with thoughtful updates that enhance its versatility and aesthetic appeal.",
  buttonText: "Explore Now",
  buttonLink: "#",
};

// 2. Tərs düzülüş və fərqli hündürlük üçün məlumatlar
const bannerDataReversed = {
  largeImageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/factory/montana_factory_2022_13_h.jpg?mode=crop&width=1520&height=2027",
  smallImageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/factory/montana_factory_2022_07_w.jpg?mode=crop&width=1520&height=1093",
  title: "Environment and quality",
  description:
    "At Montana, we take our environmental responsibilities seriously. Since introducing our own set of environmental accounts in consultation with The Danish Environmental Protection Agency over 25 years ago, we have achieved a number of certifications – most recently the PEFC certification, meaning that most of Montana's MDF products are now made from PEFC certified wood.",
  buttonText: "More about Montana's environmental initiatives",
  buttonLink: "/sofas",
  layout: "imageRight",
  smallImageHeight: "400px",
  textBlockWidth: "40%", // Hündürlük burada 80vh olaraq təyin edildi
} as const;

export default function Home() {
  return (
    <>
      <HeroSection />
      <div id='header-trigger' style={{ height: 1 }} />
      <ProductSlider />
      <PaletteRightImage
        title='Refreshing the Palette'
        description="The Montana Mini series is now even more versatile with the introduction of an updated colour range. Whether you're looking to add warmth, make a bold statement, or create a subtle touch of elegance, the new colours empower you to design a space that feels uniquely yours."
        buttonText='Explore now'
        buttonLink='/news/palette-refresh'
        imageUrl='https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-mini/ss25/montana_mini_displayshelf_rosehip_flint_amber_ruby_clay_h.jpg?mode=crop&width=540&height=720'
        backgroundColor='#CCC6B8'
      />
      <NewsSection />
      <ProductNewsSlider />
      <div className='hideOnMobile'>
        <MiddleBanner {...bannerDataDefault} />
      </div>
      <div className='showOnlyOnMobile'>
        <HomeVideo variant='mobile' />
      </div>
      <TrustBadges />
      <PaletteRightImage
        title='Colour Class – Learn to embrace the world of colours'
        description='Montana Furniture has teamed up with Color Connaisseur by Céline Hallas to create Colour Class, a unique digital concept designed to empower you to confidently embrace the world of colours within your interior spaces. In each Colour Class, we invite you into homes that embrace vibrant colour schemes, showing how you can use colours to reflect your personality and express your unique style in interior design.'
        buttonText='Discover Colour Classes here'
        buttonLink='/collections/summer'
        imageUrl='https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-02/Montana_Colour_Class_2_header_iris_2024.jpg?mode=crop&width=828&height=595'
        backgroundColor='#BDD2DA'
        imageSize='large'
      />

      <MiddleBanner {...bannerDataReversed} />
      <PaletteLeftImage
        title='Creating good design demands honesty and respect'
        description='Montana Furniture is a family-owned company, established in 1982, leading within storage and furniture for private homes and contemporary office spaces. The company is founded by Peter J. Lassen, who is also the designer of the Montana system.

All Montana modules are designed, developed and made in Denmark. Every day, in a small town on the island of Funen over 140 professionals work hard to uphold the highest standards of processing, painting and assembling – making sure that your Montana furniture will last a lifetime.'
        buttonText='Discover Colour Classes here'
        buttonLink='/collections/summer'
        imageUrl='https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/designer-portraits/montana_peter_joakim_lassen_01.jpg?mode=crop&width=828&height=595'
        backgroundColor='#2C3587'
        imageSize='large'
      />
      <div className='hideOnMobile'>
        <HomeVideo />
      </div>
      <PaletteRightImage
        title='Montana for professionals'
        description='Visit another part of our website designed for professionals within interior design. At Montana we are passionate about helping architects, designers, buyers and project managers develop functional and aesthetic professional environments. Find our sales team, product information and other resources.'
        buttonText='Montana for professionals'
        buttonLink='/collections/summer'
        imageUrl='https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/montana-office/2022/montana_office_canteen_breakoutarea_mosertable_kevi_12mmsystem_h_crop.jpg?mode=crop&width=828&height=595'
        backgroundColor='#263835'
        imageSize='large'
      />
      <Form />
    </>
  );
}
