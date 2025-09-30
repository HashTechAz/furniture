import React from "react";
import SustainabilityHero from "./components/SustainabilityHero/SustainabilityHero";
import SustainabilityGallery from "./components/SustainabilityGallery/SustainabilityGallery";
import SustainabilityCertifications from "./components/SustainabilityCertifications/SustainabilityCertifications";
import SustainabilityHistory from "./components/SustainabilityHistory/SustainabilityHistory";
import FlexImages from "./components/FlexImages/FlexImages";
import Companies from "./components/Companies/Companies";
import Ecolabel from "./components/Ecolabel/Ecolabel";
import PaletteLeftImage from "@/components/Palette/PaletteLeftImage/PaletteLeftImage";
import HomeVideo from "@/components/HomeVideo/HomeVideo";
import PaletteRightImage from "@/components/Palette/PaletteRightImage/PaletteRightImage";
import Related from "./components/Related/Related";

const sustainabilityPaletteData = {
  category: "Sustainability",
  title: "41 water-based colours – a body-mind philosophy",
  description:
    "Every eight years, Montana develops a new colour palette. Our current palette was created in collaboration with colour expert Margrethe Odgaard. Read more about Margrethe's creative process towards a new and more sensual colour palette. ",
  buttonText: "Learn more",
  buttonLink: "/sustainability",
  imageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2023/margrethe-collab/montana_3newcolours_2023_margretheodgaard_05_h.jpg?mode=crop&width=540&height=720",
  backgroundColor: "#EAEFD9",
  imagePosition: {
    width: "370px",
    height: "500px",
    top: "40px",
    left: "0px",
  },
  layout: "textLeft",
} as const;

const page = () => {
  return (
    <>
      <div
        id='header-trigger'
        style={{ height: 1, backgroundColor: "#EAEFD9" }}
      />
      <SustainabilityHero />
      <SustainabilityGallery />
      <SustainabilityCertifications />
      <SustainabilityHistory />
      <FlexImages />
      <Companies />
      <Ecolabel />
      <PaletteLeftImage
        title='Creating good design demands honesty and respect'
        description='Montana Furniture is a family-owned company, established in 1982, leading within storage and furniture for private homes and contemporary office spaces. The company is founded by Peter J. Lassen, who is also the designer of the Montana system.

All Montana modules are designed, developed and made in Denmark. Every day, in a small town on the island of Funen over 140 professionals work hard to uphold the highest standards of processing, painting and assembling – making sure that your Montana furniture will last a lifetime.'
        buttonText='Discover Colour Classes here'
        buttonLink='/collections/summer'
        imageUrl='https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/Colour_Class_header.jpg?mode=crop&width=1080&height=776'
        backgroundColor='#BDD2DA'
        imageSize='large'
      />
      <HomeVideo />
      <PaletteRightImage
        title='41 water-based colours – a body-mind philosophy'
        description="Every eight years, Montana develops a new colour palette. Our current palette was created in collaboration with colour expert Margrethe Odgaard. Read more about Margrethe's creative process towards a new and more sensual colour palette. "
        buttonText='Explore now'
        buttonLink='/news/palette-refresh'
        imageUrl='https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2023/margrethe-collab/montana_3newcolours_2023_margretheodgaard_05_h.jpg?mode=crop&width=540&height=720'
        backgroundColor='#EAEFD9'
      />
      <Related/>
    </>
  );
};

export default page;
