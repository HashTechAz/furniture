import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colours | Sparro",
  description:
    "Explore Colours at Sparro. Discover premium and sustainable designs.",
};

import React from "react";
import Hero from "@/components/Hero/Hero";
import ColoursAbout from "./components/ColoursAbout/ColoursAbout";
import ColoursImg from "./components/ColoursImg/ColoursImg";
import ColoursPalette from "./components/ColoursPalette/ColoursPalette";
import ProductSlider from "@/components/ProductSlider/ProductSlider";
import Companies from "../sustainability/components/Companies/Companies";
import Related from "../sustainability/components/Related/Related";
import HomeVideo from "@/components/HomeVideo/HomeVideo";
import PaletteLeftImage from "@/components/Palette/PaletteLeftImage/PaletteLeftImage";
import PaletteRightImage from "@/components/Palette/PaletteRightImage/PaletteRightImage";

const ColoursPage = () => {
  return (
    <div>
      <Hero
        title="The Montana Colours"
        titleSpan="A colour palette of 43 poetic colours and veneers"
        description="Colours mean everything. Ambience. Atmosphere. Identity. Colours are paramount in our design. We want to influence and inspire the world of interiors with our take on colours. Bright and light. Dense and deep. There is a colour for any purpose."
        imageUrl="/images/palette/Monochromes modulares Regalsystem mit Dekorobjekten.webp"
        imageAlt="Montana Colours Palette"
        backgroundColor="#EEECDD"
        textColor="#333"
      />
      <ColoursAbout />
      <ColoursImg />
      <ColoursPalette />
      <ProductSlider />
      <Companies />
      <ProductSlider />
      <PaletteLeftImage
        title="Paint your walls in a Montana colour "
        description="Refresh your walls with Montana colours. Pair wall hues with your furniture for a soothing, cohesive look, or choose contrasting shades for a more dynamic interior style. Our carefully curated palette features a range of colours that work well together, allowing you to design a home that is uniquely yours. Get an overview of the RAL/NCS codes for painting in all of our 41 lacquer colours here."
        buttonText="Discover Colour Classes here"
        buttonLink="/collections/summer"
        imageUrl="/images/palette/Minimalist Monochrome Entryway.webp"
        backgroundColor="#B48451"
        imageSize="large"
      />
      <HomeVideo
        variant="colours"
        imageUrl="/images/palette/montana_colourps_amber_camomile_rhubarb_flint_oat_bw.webp"
      />
      <PaletteLeftImage
        title="Eco-friendly colours"
        description="Since 2007, we have exclusively used water-based lacquer colours, which neither smell nor contain solvents. In addition, Montana recently achieved the EU Ecolabel, making the company among the first furniture manufacturers in Europe. The EU Ecolabel includes the entire Montana System, the CO16 and the Montana Free Shelving System. Montana is also awarded the Indoor Climate label by the Danish Technological Institute."
        buttonText="Read more about environment and quality"
        buttonLink="/collections/summer"
        imageUrl="/images/palette/montana_factory_2022_06_h_black_white.webp"
        backgroundColor="#BDD2DA"
      />
      <PaletteRightImage
        title="Replenishment guarantee"
        description="If you need to replenish your Montana colour, we guarantee a delivery within 24 hours. All of our 41 lacquer colours are available for delivery, and we are committed to providing you with the highest quality of service."
        buttonText="Discover Colour Classes here"
        buttonLink="/collections/summer"
        imageUrl="/images/palette/montana_margretheodgaard_newcolours2019_01_s_black_white.webp"
        backgroundColor="#BDD2DA"
        imageSize="custom"
      />
      <Related />
    </div>
  );
};

export default ColoursPage;
