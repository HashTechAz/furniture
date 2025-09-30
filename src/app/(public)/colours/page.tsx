import React from "react";
import Hero from "@/components/Hero/Hero";
import ColoursAbout from "./components/ColoursAbout/ColoursAbout";
import ColoursImg from "./components/ColoursImg/ColoursImg";
import ColoursPalette from "./components/ColoursPalette/ColoursPalette";
import ProductSlider from "@/components/ProductSlider/ProductSlider";
import Companies from "../sustainability/components/Companies/Companies";
import Related from "../sustainability/components/Related/Related";
import HomeVideo from "@/components/HomeVideo/HomeVideo";

const ColoursPage = () => {
  return (
    <div>
      <Hero
        title="The Montana Colours"
        titleSpan="A colour palette of 43 poetic colours and veneers"
        description="Colours mean everything. Ambience. Atmosphere. Identity. Colours are paramount in our design. We want to influence and inspire the world of interiors with our take on colours. Bright and light. Dense and deep. There is a colour for any purpose."
        imageUrl="https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/montana-home/2021/montana_home21_22_camomile_iris_amber_pine_pantonova_detail01_w.jpg?mode=crop&width=1080&height=776"
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
      <ColoursPalette />
      <HomeVideo 
        variant='colours'
        imageUrl='https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/colours/montana_colourps_amber_camomile_rhubarb_flint_oat_w.jpg?mode=crop&width=1520&height=1093' 
      />
      <Related />
    </div>
  );
};

export default ColoursPage;
