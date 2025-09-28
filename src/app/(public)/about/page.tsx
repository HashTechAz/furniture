import styles from './page.module.css';
import Hero from '@/components/Hero/Hero';
import AboutCompany from './components/AboutCompany/AboutCompany';
import MiddleBanner from '@/components/MiddleBanner/MiddleBanner';
import Palette from '@/components/Palette/Palette';
import HomeVideo from '@/components/HomeVideo/HomeVideo';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import AboutBigImage from './components/AboutBigImage/AboutBigImage';

// About sayfası için banner verisi
const aboutBannerData = {
  largeImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/montana_colourps_azure_oat_rosehip.jpg?mode=crop&width=1520&height=2027",
  smallImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/montana_colourps_amber_camomile_rhubarb_flint_oat.jpg?mode=crop&width=1520&height=2027",
  title: "Endless possibilities with Montana",
  description: "Montana Furniture is based on Peter J. Lassen's philosophy that every one of us has a need for freedom and a natural desire to create our own personal spaces. With Montana you get endless possibilities and freedom to create the look that's just right for you.",
  buttonText: "Learn more about our design",
  buttonLink: "/design",
};

// About sayfası için palette verisi
const aboutPaletteData = {
  category: "About Montana",
  title: "A poetic range of 41 Montana colours",
  description: "Montana’s functional and flexible system is featured in a range of 41 poetic and complex colours developed in close collaboration with the award-winning Danish designer and colour expert Margrethe Odgaard. Colours mean everything. Ambience. Atmosphere. Identity. Colours are paramount in our design. We want to influence and inspire the world of interiors with our take on colours. Bright and light. Dense and deep. There is a colour for any purpose.",
  buttonText: "Discover our history",
  buttonLink: "/history",
  imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/designer-portraits/montana_margretheodgaard_newcolours2019_01_s.jpg?mode=crop&width=640&height=640",
  backgroundColor: "#EFC7C7",
  imagePosition: {
    width: '370px',
    height: '500px',
    top: '40px',
    left: '0px',
  },
  layout: 'textLeft',
} as const;

export default function About() {
  return (
    <>
      <Hero
        title="About Montana"
        titleSpan="Let's create playful spaces"
        description="The family-owned Montana Furniture has provided generations with personalized storage solutions, since 1982. The Danish high-end furniture company was established by Peter J. Lassen, who also created the modular Montana System. Today, the company is run by Peter's son Joakim Lassen, who is the fifth generation of his family to work with furniture and the great-grandson of manufacturer Fritz Hansen."
        imageUrl="https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/montana-home/2023/location---radiohuset/montana_home_23_24_ruby_hokkaido_iris_cumin_detail_01_w.jpg?mode=crop&width=1080&height=776"
        imageAlt="Montana Company"
        backgroundColor="#2c3587"
        textColor="#ffffff"
      />
      <AboutCompany/>
      <AboutBigImage/>
      <MiddleBanner {...aboutBannerData} />
      <Palette {...aboutPaletteData} />
      <HomeVideo imageUrl="https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2023/location---radiohuset/montana_home_23_24_ruby_hokkaido_iris_cumin_02_h.jpg?mode=crop&width=828&height=1104" />
      <ProductSlider />
    </>
  );
}
